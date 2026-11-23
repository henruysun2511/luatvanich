import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, QueryFailedError } from 'typeorm';
import { ContentStatus } from '../../common/enums/content-status.enum';
import { LangCode } from '../../common/enums/lang.enum';
import { PaginatedResponse } from '../../common/response/api-response';
import { normalizePagination } from '../../common/utils/pagination.util';
import { generateViSlug, generateZhSlug } from '../../common/utils/slug.util';
import { LegalService } from '../legal-services/entities/legal-service.entity';
import { LegalServiceMapper } from '../legal-services/mapper/legal-service.mapper';
import { CreatePracticeAreaDto } from './dto/request/create-practice-area.dto';
import { PracticeAreaQueryDto } from './dto/request/practice-area-query.dto';
import { PracticeAreaOrderItemDto } from './dto/request/reorder-practice-area.dto';
import { UpdatePracticeAreaDto } from './dto/request/update-practice-area.dto';
import { UpsertPracticeAreaTranslationDto } from './dto/request/upsert-practice-area-translation.dto';
import {
  PracticeAreaAdminDto,
} from './dto/response/practice-area-admin.dto';
import {
  PracticeAreaDetailPublicDto,
  PracticeAreaPublicDto,
} from './dto/response/practice-area-public.dto';
import { PracticeArea } from './entities/practice-area.entity';
import { PracticeAreaTranslation } from './entities/practice-area-translation.entity';
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
    private readonly areas: PracticeAreaRepository,
    private readonly translations: PracticeAreaTranslationRepository,
    private readonly mapper: PracticeAreaMapper,
    private readonly serviceMapper: LegalServiceMapper,
  ) {}

  /**
   * Danh sách lĩnh vực công khai (đã xuất bản)
   */
  async findAllPublic(lang: LangCode, featured?: boolean): Promise<PracticeAreaPublicDto[]> {
    const list = await this.areas.findPublicList(lang, featured);
    return list.map((area) => this.mapper.toPublicDto(area, lang));
  }

  /**
   * Chi tiết lĩnh vực theo slug và danh sách dịch vụ trực thuộc
   */
  async findBySlug(slug: string, lang: LangCode): Promise<PracticeAreaDetailPublicDto> {
    const area = await this.areas.findBySlugAndLang(slug, lang);
    if (!area) throw new PracticeAreaNotFoundException(slug);

    const services = await this.dataSource.getRepository(LegalService).find({
      where: { practiceAreaId: area.id, status: ContentStatus.PUBLISHED },
      relations: { translations: true },
      order: { displayOrder: 'ASC', id: 'ASC' },
    });

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
    const [list, total] = await this.areas.findAdminList(query);
    const items = list.map((area) => this.mapper.toAdminDto(area));
    return PaginatedResponse.of(items, total, page, limit);
  }

  /**
   * Chi tiết lĩnh vực quản trị theo ID
   */
  async findByIdAdmin(id: string, manager?: EntityManager): Promise<PracticeAreaAdminDto> {
    const area = await this.areas.findWithTranslations(id, manager);
    if (!area) throw new PracticeAreaNotFoundException(id);
    return this.mapper.toAdminDto(area);
  }

  /**
   * Tạo mới lĩnh vực kèm bản dịch song ngữ
   */
  async create(dto: CreatePracticeAreaDto): Promise<PracticeAreaAdminDto> {
    return this.dataSource.transaction(async (manager) => {
      const { translations, ...fields } = dto;
      const area = await manager.save(
        PracticeArea,
        manager.create(PracticeArea, fields),
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
      const area = await this.lockArea(manager, id);
      const { translations, ...fields } = dto;

      if (Object.keys(fields).length > 0) {
        await manager.update(PracticeArea, id, fields);
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
  async reorder(items: PracticeAreaOrderItemDto[]): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const ordered = [...items].sort((a, b) =>
        a.id.toLowerCase().localeCompare(b.id.toLowerCase()),
      );
      for (const { id, displayOrder } of ordered) {
        const result = await this.areas.updateOrder(id, displayOrder, manager);
        if (!result.affected) throw new PracticeAreaNotFoundException(id);
      }
    });
  }

  /**
   * Xóa mềm lĩnh vực (soft delete có kiểm tra ràng buộc)
   */
  async delete(id: string): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      await this.lockArea(manager, id);

      // 1. Kiểm tra nếu còn dịch vụ pháp lý trực thuộc -> Chặn xóa
      const serviceCount = await manager.countBy(LegalService, { practiceAreaId: id });
      if (serviceCount > 0) {
        throw new PracticeAreaHasServicesException(serviceCount);
      }

      // 2. Kiểm tra nếu còn luật sư liên kết -> Chặn xóa
      if (await this.hasLinkedLawyers(manager, id)) {
        throw new PracticeAreaHasLawyersException();
      }

      // 3. Thực hiện xóa mềm
      await this.areas.softDelete(id, manager);
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
    const key = { practiceAreaId, languageCode: input.languageCode };
    const current = await manager.findOneBy(PracticeAreaTranslation, key);

    const generateSlug =
      input.languageCode === LangCode.VI ? generateViSlug : generateZhSlug;
    const generated =
      generateSlug(input.name).slice(0, 220).replace(/-+$/, '') ||
      `linh-vuc-${practiceAreaId}-${input.languageCode.toLowerCase()}`;
    const slug = input.slug ?? current?.slug ?? generated;

    const match = await this.translations.findBySlug(slug, manager);
    if (
      match &&
      (match.practiceAreaId !== practiceAreaId || match.languageCode !== input.languageCode)
    ) {
      throw new PracticeAreaSlugAlreadyExistsException(slug);
    }

    try {
      await manager.save(
        PracticeAreaTranslation,
        manager.create(PracticeAreaTranslation, {
          ...current,
          ...input,
          ...key,
          slug,
          updatedAt: new Date(),
        }),
      );
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

  private async lockArea(manager: EntityManager, id: string): Promise<PracticeArea> {
    const area = await manager.findOne(PracticeArea, {
      where: { id },
      lock: { mode: 'pessimistic_write' },
    });
    if (!area) throw new PracticeAreaNotFoundException(id);
    return area;
  }

  private async hasLinkedLawyers(manager: EntityManager, id: string): Promise<boolean> {
    const [relation] = await manager.query(
      "SELECT to_regclass('lawyer_practice_areas') AS junction",
    );
    if (!relation?.junction) return false;

    const [linked] = await manager.query(
      `
      SELECT EXISTS (
        SELECT 1 FROM lawyer_practice_areas link
        JOIN lawyers lawyer ON lawyer.id = link.lawyer_id
        WHERE link.practice_area_id = $1 AND lawyer.deleted_at IS NULL
      ) AS present
    `,
      [id],
    );
    return Boolean(linked?.present);
  }
}
