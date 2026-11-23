import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, QueryFailedError } from 'typeorm';
import { LangCode } from '../../common/enums/lang.enum';
import { PaginatedResponse } from '../../common/response/api-response';
import { normalizePagination } from '../../common/utils/pagination.util';
import { generateViSlug, generateZhSlug } from '../../common/utils/slug.util';
import { LegalServiceRepository } from '../legal-services/repositories/legal-service.repository';
import { LegalServiceMapper } from '../legal-services/mapper/legal-service.mapper';
import { CreatePracticeAreaDto } from './dto/request/create-practice-area.dto';
import { PracticeAreaQueryDto } from './dto/request/practice-area-query.dto';
import { ReorderPracticeAreaDto } from './dto/request/reorder-practice-area.dto';
import { UpdatePracticeAreaDto } from './dto/request/update-practice-area.dto';
import { UpsertPracticeAreaTranslationDto } from './dto/request/upsert-practice-area-translation.dto';
import { PracticeAreaAdminDto } from './dto/response/practice-area-admin.dto';
import {
  PracticeAreaDetailPublicDto,
  PracticeAreaPublicDto,
} from './dto/response/practice-area-public.dto';
import {
  PracticeAreaHasLawyersException,
  PracticeAreaHasServicesException,
  PracticeAreaNotFoundException,
  PracticeAreaSlugAlreadyExistsException,
} from './exceptions/practice-area.exception';
import { PracticeAreaMapper } from './mapper/practice-area.mapper';
import { PRACTICE_AREA_UNIQUE_VIOLATION } from './practice-areas.constant';
import { PracticeAreaRepository } from './repositories/practice-area.repository';
import { PracticeAreaTranslationRepository } from './repositories/practice-area-translation.repository';

@Injectable()
export class PracticeAreasService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly areaRepo: PracticeAreaRepository,
    private readonly translationRepo: PracticeAreaTranslationRepository,
    private readonly legalServiceRepo: LegalServiceRepository,
    private readonly mapper: PracticeAreaMapper,
    private readonly serviceMapper: LegalServiceMapper,
  ) {}

  /**
   * Danh sách lĩnh vực công khai (đã xuất bản)
   */
  async findAllPublic(lang: LangCode, featured?: boolean): Promise<PracticeAreaPublicDto[]> {
    const list = await this.areaRepo.findPublicList(lang, featured);
    return list.map((area) => this.mapper.toPublicDto(area, lang));
  }

  /**
   * Chi tiết lĩnh vực theo slug và danh sách dịch vụ trực thuộc
   */
  async findBySlug(slug: string, lang: LangCode): Promise<PracticeAreaDetailPublicDto> {
    const area = await this.areaRepo.findBySlugAndLang(slug, lang);
    if (!area) throw new PracticeAreaNotFoundException(slug);

    const services = await this.legalServiceRepo.findPublishedByPracticeArea(area.id);

    return {
      ...this.mapper.toPublicDto(area, lang),
      servicesCount: services.length,
      services: this.serviceMapper.toPublicResponseList(services, lang),
    };
  }

  /**
   * Danh sách lĩnh vực quản trị (phân trang, lọc, tìm kiếm)
   */
  async findAllAdmin(query: PracticeAreaQueryDto): Promise<PaginatedResponse<PracticeAreaAdminDto>> {
    const { page, limit } = normalizePagination(query);
    const [list, total] = await this.areaRepo.findAdminList(query);
    const items = list.map((area) => this.mapper.toAdminDto(area));
    return PaginatedResponse.of(items, total, page, limit);
  }

  /**
   * Chi tiết lĩnh vực quản trị theo ID
   */
  async findByIdAdmin(id: string, manager?: EntityManager): Promise<PracticeAreaAdminDto> {
    const area = await this.areaRepo.findWithTranslations(id, manager);
    if (!area) throw new PracticeAreaNotFoundException(id);
    return this.mapper.toAdminDto(area);
  }

  /**
   * Tạo mới lĩnh vực kèm bản dịch song ngữ
   */
  async create(dto: CreatePracticeAreaDto): Promise<PracticeAreaAdminDto> {
    return this.dataSource.transaction(async (manager) => {
      const { translations, ...fields } = dto;
      const area = await this.areaRepo.save(
        this.areaRepo.create(fields),
        manager,
      );

      for (const translation of translations) {
        await this.saveTranslation(manager, area.id, translation);
      }

      return this.findByIdAdmin(area.id, manager);
    });
  }

  /**
   * Cập nhật thông tin lĩnh vực và bản dịch
   */
  async update(id: string, dto: UpdatePracticeAreaDto): Promise<PracticeAreaAdminDto> {
    return this.dataSource.transaction(async (manager) => {
      const area = await this.areaRepo.findByIdWithLock(id, manager);
      if (!area) throw new PracticeAreaNotFoundException(id);

      const { translations, ...fields } = dto;

      if (Object.keys(fields).length > 0) {
        await this.areaRepo.update(id, fields, manager);
      }

      for (const translation of translations ?? []) {
        await this.saveTranslation(manager, area.id, translation);
      }

      return this.findByIdAdmin(id, manager);
    });
  }

  /**
   * Sắp xếp lại thứ tự hiển thị (kéo thả)
   */
  async reorder(dto: ReorderPracticeAreaDto): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      for (let index = 0; index < dto.ids.length; index++) {
        const id = dto.ids[index];
        const result = await this.areaRepo.updateOrder(id, index + 1, manager);
        if (!result.affected) throw new PracticeAreaNotFoundException(id);
      }
    });
  }

  /**
   * Xóa mềm lĩnh vực (soft delete có kiểm tra ràng buộc)
   */
  async delete(id: string): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const area = await this.areaRepo.findByIdWithLock(id, manager);
      if (!area) throw new PracticeAreaNotFoundException(id);

      // 1. Kiểm tra nếu còn dịch vụ pháp lý trực thuộc -> Chặn xóa
      const serviceCount = await this.legalServiceRepo.countByPracticeArea(id, manager);
      if (serviceCount > 0) {
        throw new PracticeAreaHasServicesException(serviceCount);
      }

      // 2. Kiểm tra nếu còn luật sư liên kết -> Chặn xóa
      if (await this.areaRepo.hasLinkedLawyers(id, manager)) {
        throw new PracticeAreaHasLawyersException();
      }

      // 3. Thực hiện xóa mềm
      await this.areaRepo.softDelete(id, manager);
    });
  }

  /**
   * Lưu hoặc cập nhật bản dịch với cơ chế sinh slug tự động
   */
  private async saveTranslation(
    manager: EntityManager,
    practiceAreaId: string,
    input: UpsertPracticeAreaTranslationDto,
  ): Promise<void> {
    const current = await this.translationRepo.findByKey(
      practiceAreaId,
      input.languageCode,
      manager,
    );

    const generateSlug =
      input.languageCode === LangCode.VI ? generateViSlug : generateZhSlug;
    const generated =
      generateSlug(input.name).slice(0, 220).replace(/-+$/, '') ||
      `linh-vuc-${practiceAreaId}-${input.languageCode.toLowerCase()}`;
    const slug = input.slug?.trim() || current?.slug || generated;

    const match = await this.translationRepo.findBySlug(slug, manager);
    if (
      match &&
      (match.practiceAreaId !== practiceAreaId || match.languageCode !== input.languageCode)
    ) {
      throw new PracticeAreaSlugAlreadyExistsException(slug);
    }

    try {
      const entity = this.translationRepo.create({
        ...current,
        ...input,
        practiceAreaId,
        languageCode: input.languageCode,
        slug,
        updatedAt: new Date(),
      });
      await this.translationRepo.save(entity, manager);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error.driverError as any)?.code === PRACTICE_AREA_UNIQUE_VIOLATION
      ) {
        throw new PracticeAreaSlugAlreadyExistsException(slug);
      }
      throw error;
    }
  }
}
