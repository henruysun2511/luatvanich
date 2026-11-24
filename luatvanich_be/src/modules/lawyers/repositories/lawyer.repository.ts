import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Lawyer } from '../entities/lawyer.entity';
import { LawyerQueryDto } from '../dto/request/lawyer-query.dto';
import { ContentStatus } from '../../../common/enums/content-status.enum';
import { normalizePagination } from '../../../common/utils/pagination.util';

@Injectable()
export class LawyerRepository {
  constructor(
    @InjectRepository(Lawyer)
    private readonly repo: Repository<Lawyer>,
  ) {}

  create(data: Partial<Lawyer>): Lawyer {
    return this.repo.create(data);
  }

  async save(entity: Lawyer): Promise<Lawyer> {
    return this.repo.save(entity);
  }

  async findById(id: string, manager?: EntityManager): Promise<Lawyer | null> {
    const targetRepo = manager ? manager.getRepository(Lawyer) : this.repo;
    return targetRepo.findOne({
      where: { id },
      relations: [
        'translations',
        'office',
        'office.translations',
        'practiceAreas',
        'practiceAreas.practiceArea',
        'practiceAreas.practiceArea.translations',
        'languages',
        'credentials',
        'credentials.translations',
      ],
    });
  }

  async findPaginatedAdmin(query: LawyerQueryDto): Promise<[Lawyer[], number]> {
    const { page, limit, skip } = normalizePagination(query);
    const qb = this.repo
      .createQueryBuilder('l')
      .leftJoinAndSelect('l.translations', 't')
      .leftJoinAndSelect('l.office', 'o')
      .leftJoinAndSelect('o.translations', 'ot')
      .leftJoinAndSelect('l.practiceAreas', 'lpa')
      .leftJoinAndSelect('lpa.practiceArea', 'pa')
      .leftJoinAndSelect('pa.translations', 'pat')
      .leftJoinAndSelect('l.languages', 'lang')
      .leftJoinAndSelect('l.credentials', 'c')
      .leftJoinAndSelect('c.translations', 'ct');

    if (query.status) {
      qb.andWhere('l.status = :status', { status: query.status });
    }
    if (query.teamGroup) {
      qb.andWhere('l.teamGroup = :teamGroup', { teamGroup: query.teamGroup });
    }
    if (query.officeId) {
      qb.andWhere('l.officeId = :officeId', { officeId: query.officeId });
    }
    if (query.practiceAreaId) {
      qb.andWhere('lpa.practiceAreaId = :practiceAreaId', {
        practiceAreaId: query.practiceAreaId,
      });
    }
    if (query.isFeatured !== undefined) {
      qb.andWhere('l.isFeatured = :isFeatured', { isFeatured: query.isFeatured });
    }
    if (query.q) {
      qb.andWhere(
        '(LOWER(t.fullName) LIKE LOWER(:q) OR LOWER(t.latinName) LIKE LOWER(:q) OR LOWER(l.email) LIKE LOWER(:q) OR LOWER(l.licenseNumber) LIKE LOWER(:q))',
        { q: `%${query.q.trim()}%` },
      );
    }

    qb.orderBy('l.displayOrder', 'ASC').addOrderBy('l.createdAt', 'DESC');
    qb.skip(skip).take(limit);

    return qb.getManyAndCount();
  }

  async findPublished(query: LawyerQueryDto): Promise<[Lawyer[], number]> {
    const { page, limit, skip } = normalizePagination(query);
    const qb = this.repo
      .createQueryBuilder('l')
      .leftJoinAndSelect('l.translations', 't')
      .leftJoinAndSelect('l.office', 'o')
      .leftJoinAndSelect('o.translations', 'ot')
      .leftJoinAndSelect('l.practiceAreas', 'lpa')
      .leftJoinAndSelect('lpa.practiceArea', 'pa')
      .leftJoinAndSelect('pa.translations', 'pat')
      .leftJoinAndSelect('l.languages', 'lang')
      .where('l.status = :status', { status: ContentStatus.PUBLISHED });

    if (query.teamGroup) {
      qb.andWhere('l.teamGroup = :teamGroup', { teamGroup: query.teamGroup });
    }
    if (query.officeId) {
      qb.andWhere('l.officeId = :officeId', { officeId: query.officeId });
    }
    if (query.practiceAreaId) {
      qb.andWhere('lpa.practiceAreaId = :practiceAreaId', {
        practiceAreaId: query.practiceAreaId,
      });
    }
    if (query.isFeatured !== undefined) {
      qb.andWhere('l.isFeatured = :isFeatured', { isFeatured: query.isFeatured });
    }

    qb.orderBy('l.displayOrder', 'ASC').addOrderBy('l.createdAt', 'DESC');
    qb.skip(skip).take(limit);

    return qb.getManyAndCount();
  }

  async findBySlug(slug: string): Promise<Lawyer | null> {
    return this.repo
      .createQueryBuilder('l')
      .innerJoinAndSelect('l.translations', 't', 't.slug = :slug', { slug })
      .leftJoinAndSelect('l.translations', 'all_t')
      .leftJoinAndSelect('l.office', 'o')
      .leftJoinAndSelect('o.translations', 'ot')
      .leftJoinAndSelect('l.practiceAreas', 'lpa')
      .leftJoinAndSelect('lpa.practiceArea', 'pa')
      .leftJoinAndSelect('pa.translations', 'pat')
      .leftJoinAndSelect('l.languages', 'lang')
      .leftJoinAndSelect('l.credentials', 'c')
      .leftJoinAndSelect('c.translations', 'ct')
      .where('l.status = :status', { status: ContentStatus.PUBLISHED })
      .getOne();
  }

  async reorder(ids: string[]): Promise<void> {
    await Promise.all(
      ids.map((id, index) => this.repo.update(id, { displayOrder: index })),
    );
  }

  async softDelete(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }
}
