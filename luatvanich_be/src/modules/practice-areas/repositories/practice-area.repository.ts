import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, IsNull, Repository, SelectQueryBuilder } from 'typeorm';
import { ContentStatus } from '../../../common/enums/content-status.enum';
import { LangCode } from '../../../common/enums/lang.enum';
import { normalizePagination } from '../../../common/utils/pagination.util';
import { PracticeAreaQueryDto } from '../dto/request/practice-area-query.dto';
import { PracticeArea } from '../entities/practice-area.entity';

export type PracticeAreaWithCount = PracticeArea & { servicesCount: number };

@Injectable()
export class PracticeAreaRepository {
  constructor(
    @InjectRepository(PracticeArea)
    private readonly repo: Repository<PracticeArea>,
  ) {}

  private withTranslations(
    publicOnly = false,
    manager?: EntityManager,
  ): SelectQueryBuilder<PracticeArea> {
    const targetRepo = manager ? manager.getRepository(PracticeArea) : this.repo;
    return targetRepo
      .createQueryBuilder('area')
      .leftJoinAndSelect('area.translations', 'translation')
      .loadRelationCountAndMap('area.servicesCount', 'area.services', 'service', (query) => {
        if (publicOnly) {
          query.andWhere('service.status = :status', { status: ContentStatus.PUBLISHED });
        }
        return query;
      });
  }

  async findWithTranslations(
    id: string,
    manager?: EntityManager,
  ): Promise<PracticeAreaWithCount | null> {
    return this.withTranslations(false, manager)
      .where('area.id = :id', { id })
      .getOne() as Promise<PracticeAreaWithCount | null>;
  }

  async findBySlugAndLang(
    slug: string,
    lang: LangCode,
  ): Promise<PracticeAreaWithCount | null> {
    return this.withTranslations(true)
      .innerJoin('area.translations', 'matched', 'matched.slug = :slug', { slug })
      .where('area.status = :status', { status: ContentStatus.PUBLISHED })
      .andWhere(
        `(matched.languageCode = :lang OR NOT EXISTS (
          SELECT 1 FROM practice_area_translations localized
          WHERE localized.practice_area_id = area.id AND localized.language_code = :lang
        ))`,
        { lang },
      )
      .getOne() as Promise<PracticeAreaWithCount | null>;
  }

  async findPublicList(
    lang: LangCode,
    isFeatured?: boolean,
  ): Promise<PracticeAreaWithCount[]> {
    const query = this.withTranslations(true)
      .where('area.status = :status', { status: ContentStatus.PUBLISHED })
      .andWhere(
        '(translation.languageCode = :lang OR translation.languageCode IN (:...fallback))',
        {
          lang,
          fallback: Object.values(LangCode).filter((language) => language !== lang),
        },
      );

    if (isFeatured !== undefined) {
      query.andWhere('area.isFeatured = :isFeatured', { isFeatured });
    }

    return query
      .orderBy('area.displayOrder', 'ASC')
      .addOrderBy('area.id', 'ASC')
      .getMany() as Promise<PracticeAreaWithCount[]>;
  }

  async findAdminList(
    filters: PracticeAreaQueryDto,
  ): Promise<[PracticeAreaWithCount[], number]> {
    const { skip, limit } = normalizePagination(filters);
    const query = this.withTranslations();

    if (filters.status !== undefined) {
      query.andWhere('area.status = :status', { status: filters.status });
    }

    if (filters.isFeatured !== undefined) {
      query.andWhere('area.isFeatured = :isFeatured', { isFeatured: filters.isFeatured });
    }

    const search = (filters.search ?? filters.q)?.trim();
    if (search) {
      const term = search.replace(/[!%_]/g, (char) => '!' + char);
      query.andWhere(
        `EXISTS (
          SELECT 1 FROM practice_area_translations searched
          WHERE searched.practice_area_id = area.id
            AND (searched.name ILIKE :search ESCAPE '!' OR searched.slug ILIKE :search ESCAPE '!')
        )`,
        { search: '%' + term + '%' },
      );
    }

    return query
      .orderBy('area.displayOrder', 'ASC')
      .addOrderBy('area.createdAt', filters.sortOrder ?? 'DESC')
      .addOrderBy('area.id', 'ASC')
      .skip(skip)
      .take(limit)
      .getManyAndCount() as Promise<[PracticeAreaWithCount[], number]>;
  }

  async updateOrder(
    id: string,
    displayOrder: number,
    manager?: EntityManager,
  ) {
    const targetRepo = manager ? manager.getRepository(PracticeArea) : this.repo;
    return targetRepo.update({ id, deletedAt: IsNull() }, { displayOrder });
  }

  create(data: Partial<PracticeArea>): PracticeArea {
    return this.repo.create(data);
  }

  async save(entity: PracticeArea, manager?: EntityManager): Promise<PracticeArea> {
    const targetRepo = manager ? manager.getRepository(PracticeArea) : this.repo;
    return targetRepo.save(entity);
  }

  async softDelete(id: string, manager?: EntityManager) {
    const targetRepo = manager ? manager.getRepository(PracticeArea) : this.repo;
    return targetRepo.softDelete(id);
  }
}
