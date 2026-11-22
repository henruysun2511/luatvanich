import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, IsNull, Repository } from 'typeorm';
import { ContentStatus } from '../../../common/enums/content-status.enum';
import { LangCode } from '../../../common/enums/lang.enum';
import { normalizePagination } from '../../../common/utils/pagination.util';
import { PracticeAreaQueryDto } from '../dto/request/practice-area-query.dto';
import { PracticeArea } from '../entities/practice-area.entity';

export type PracticeAreaWithCount = PracticeArea & { servicesCount: number };

@Injectable()
export class PracticeAreaRepository extends Repository<PracticeArea> {
  constructor(dataSource: DataSource) {
    super(PracticeArea, dataSource.manager);
  }

  private withTranslations(publicOnly = false, manager = this.manager) {
    return manager.createQueryBuilder(PracticeArea, 'area')
      .leftJoinAndSelect('area.translations', 'translation')
      .loadRelationCountAndMap('area.servicesCount', 'area.services', 'service', (query) => {
        if (publicOnly) query.andWhere('service.status = :status', { status: ContentStatus.PUBLISHED });
        return query;
      });
  }

  findWithTranslations(id: string, manager?: EntityManager) {
    return this.withTranslations(false, manager).where('area.id = :id', { id }).getOne() as Promise<PracticeAreaWithCount | null>;
  }

  findBySlugAndLang(slug: string, lang: LangCode) {
    return this.withTranslations(true)
      .innerJoin('area.translations', 'matched', 'matched.slug = :slug', { slug })
      .where('area.status = :status', { status: ContentStatus.PUBLISHED })
      .andWhere(`(matched.languageCode = :lang OR NOT EXISTS (
        SELECT 1 FROM practice_area_translations localized
        WHERE localized.practice_area_id = area.id AND localized.language_code = :lang
      ))`, { lang })
      .getOne() as Promise<PracticeAreaWithCount | null>;
  }

  findPublicList(lang: LangCode, isFeatured?: boolean) {
    const query = this.withTranslations(true)
      .where('area.status = :status', { status: ContentStatus.PUBLISHED })
      .andWhere('(translation.languageCode = :lang OR translation.languageCode IN (:...fallback))', {
        lang,
        fallback: Object.values(LangCode).filter((language) => language !== lang),
      });
    if (isFeatured !== undefined) query.andWhere('area.isFeatured = :isFeatured', { isFeatured });
    return query.orderBy('area.displayOrder', 'ASC').addOrderBy('area.id', 'ASC')
      .getMany() as Promise<PracticeAreaWithCount[]>;
  }

  findAdminList(filters: PracticeAreaQueryDto) {
    const { skip, limit } = normalizePagination(filters);
    const query = this.withTranslations();
    if (filters.status !== undefined) query.andWhere('area.status = :status', { status: filters.status });
    if (filters.isFeatured !== undefined) query.andWhere('area.isFeatured = :isFeatured', { isFeatured: filters.isFeatured });
    const search = (filters.search ?? filters.q)?.trim();
    if (search) {
      const term = search.replace(/[!%_]/g, (character) => '!' + character);
      query.andWhere(`EXISTS (
        SELECT 1 FROM practice_area_translations searched
        WHERE searched.practice_area_id = area.id
          AND (searched.name ILIKE :search ESCAPE '!' OR searched.slug ILIKE :search ESCAPE '!')
      )`, { search: '%' + term + '%' });
    }
    return query.orderBy('area.displayOrder', 'ASC')
      .addOrderBy('area.createdAt', filters.sortOrder ?? 'DESC').addOrderBy('area.id', 'ASC')
      .skip(skip).take(limit).getManyAndCount() as Promise<[PracticeAreaWithCount[], number]>;
  }

  updateOrder(id: string, displayOrder: number, manager: EntityManager) {
    return manager.update(PracticeArea, { id, deletedAt: IsNull() }, { displayOrder });
  }
}
