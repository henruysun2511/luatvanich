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
import { PracticeAreaDetailPublicDto } from './dto/response/practice-area-public.dto';
import { PracticeArea } from './entities/practice-area.entity';
import { PracticeAreaTranslation } from './entities/practice-area-translation.entity';
import {
  PracticeAreaHasLawyersException, PracticeAreaHasServicesException, PracticeAreaNotFoundException,
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

  async findAllPublic(lang: LangCode, featured?: boolean) {
    const areas = await this.areas.findPublicList(lang, featured);
    return areas.map((area) => this.mapper.toPublicDto(area, lang));
  }

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

  async findAllAdmin(query: PracticeAreaQueryDto) {
    const { page, limit } = normalizePagination(query);
    const [areas, total] = await this.areas.findAdminList(query);
    return PaginatedResponse.of(areas.map((area) => this.mapper.toAdminDto(area)), total, page, limit);
  }

  async findByIdAdmin(id: string, manager?: EntityManager) {
    const area = await this.areas.findWithTranslations(id, manager);
    if (!area) throw new PracticeAreaNotFoundException(id);
    return this.mapper.toAdminDto(area);
  }

  async create(dto: CreatePracticeAreaDto) {
    return this.dataSource.transaction(async (manager) => {
      const { translations, ...fields } = dto;
      const area = await manager.save(PracticeArea, manager.create(PracticeArea, fields));
      for (const translation of translations) await this.saveTranslation(manager, area.id, translation);
      return this.findByIdAdmin(area.id, manager);
    });
  }

  async update(id: string, dto: UpdatePracticeAreaDto) {
    return this.dataSource.transaction(async (manager) => {
      const area = await this.lockArea(manager, id);
      const { translations, ...fields } = dto;
      await manager.update(PracticeArea, id, fields);
      for (const translation of translations ?? []) await this.saveTranslation(manager, area.id, translation);
      return this.findByIdAdmin(id, manager);
    });
  }

  private async saveTranslation(manager: EntityManager, practiceAreaId: string, input: UpsertPracticeAreaTranslationDto) {
    const key = { practiceAreaId, languageCode: input.languageCode };
    const current = await manager.findOneBy(PracticeAreaTranslation, key);
    const generateSlug = input.languageCode === LangCode.VI ? generateViSlug : generateZhSlug;
    const generated = generateSlug(input.name).slice(0, 220).replace(/-+$/, '') || 'linh-vuc-' + practiceAreaId + '-' + input.languageCode.toLowerCase();
    const slug = input.slug ?? current?.slug ?? generated;
    const match = await this.translations.findBySlug(slug, manager);
    if (match && (match.practiceAreaId !== practiceAreaId || match.languageCode !== input.languageCode)) {
      throw new PracticeAreaSlugAlreadyExistsException(slug);
    }
    try {
      await manager.save(PracticeAreaTranslation, manager.create(PracticeAreaTranslation, {
        ...current, ...input, ...key, slug, updatedAt: new Date(),
      }));
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === PRACTICE_AREA_UNIQUE_VIOLATION) {
        throw new PracticeAreaSlugAlreadyExistsException(slug);
      }
      throw error;
    }
  }

  async reorder(items: PracticeAreaOrderItemDto[]) {
    await this.dataSource.transaction(async (manager) => {
      const ordered = [...items].sort((left, right) => left.id.toLowerCase().localeCompare(right.id.toLowerCase()));
      for (const { id, displayOrder } of ordered) {
        const result = await this.areas.updateOrder(id, displayOrder, manager);
        if (!result.affected) throw new PracticeAreaNotFoundException(id);
      }
    });
  }

  async delete(id: string) {
    await this.dataSource.transaction(async (manager) => {
      await this.lockArea(manager, id);
      const count = await manager.countBy(LegalService, { practiceAreaId: id });
      if (count) throw new PracticeAreaHasServicesException(count);
      if (await this.hasLinkedLawyers(manager, id)) throw new PracticeAreaHasLawyersException();
      await manager.softDelete(PracticeArea, id);
    });
  }

  private async lockArea(manager: EntityManager, id: string) {
    const area = await manager.findOne(PracticeArea, {
      where: { id },
      lock: { mode: 'pessimistic_write' },
    });
    if (!area) throw new PracticeAreaNotFoundException(id);
    return area;
  }

  private async hasLinkedLawyers(manager: EntityManager, id: string): Promise<boolean> {
    // The lawyer-to-area junction is installed separately from the practice area tables.
    const [relation] = await manager.query("SELECT to_regclass('lawyer_practice_areas') AS junction");
    if (!relation.junction) return false;
    const [linked] = await manager.query(`
      SELECT EXISTS (
        SELECT 1 FROM lawyer_practice_areas link
        JOIN lawyers lawyer ON lawyer.id = link.lawyer_id
        WHERE link.practice_area_id = $1 AND lawyer.deleted_at IS NULL
      ) AS present
    `, [id]);
    return linked.present;
  }
}
