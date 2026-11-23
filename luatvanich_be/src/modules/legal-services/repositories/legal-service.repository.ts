import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { PracticeArea } from '../../practice-areas/entities/practice-area.entity';
import { LegalService } from '../entities/legal-service.entity';
import { LegalServiceQueryDto } from '../dto/request/legal-service-query.dto';
import { ContentStatus } from '../../../common/enums/content-status.enum';
import { normalizePagination } from '../../../common/utils/pagination.util';

@Injectable()
export class LegalServiceRepository {
  constructor(
    @InjectRepository(LegalService)
    private readonly repo: Repository<LegalService>,
  ) {}

  create(data: Partial<LegalService>): LegalService {
    return this.repo.create(data);
  }

  async save(entity: LegalService, assignedAreaId?: string): Promise<LegalService> {
    if (!assignedAreaId) return this.repo.save(entity);
    return this.repo.manager.transaction(async (manager) => {
      const area = await manager.findOne(PracticeArea, {
        where: { id: assignedAreaId },
        lock: { mode: 'pessimistic_read' },
      });
      if (!area) throw new BadRequestException('Lĩnh vực pháp lý không tồn tại hoặc đã bị xóa');
      return manager.save(LegalService, entity);
    });
  }

  async findById(id: string): Promise<LegalService | null> {
    return this.repo.findOne({ where: { id }, relations: ['translations'] });
  }

  /**
   * Danh sách cho Admin: hỗ trợ lọc theo status, practiceAreaId, từ khóa.
   */
  async findPaginatedAdmin(query: LegalServiceQueryDto): Promise<[LegalService[], number]> {
    const { page, limit, skip } = normalizePagination(query);
    const qb = this.repo.createQueryBuilder('s').leftJoinAndSelect('s.translations', 't');

    if (query.status) qb.andWhere('s.status = :status', { status: query.status });
    if (query.practiceAreaId) qb.andWhere('s.practiceAreaId = :practiceAreaId', { practiceAreaId: query.practiceAreaId });
    if (query.isFeatured !== undefined) qb.andWhere('s.isFeatured = :isFeatured', { isFeatured: query.isFeatured });
    if (query.q) {
      qb.andWhere(
        '(LOWER(t.title) LIKE LOWER(:q) OR LOWER(t.excerpt) LIKE LOWER(:q))',
        { q: `%${query.q.trim()}%` },
      );
    }

    qb.orderBy('s.displayOrder', 'ASC').addOrderBy('s.createdAt', 'DESC');
    qb.skip(skip).take(limit);

    return qb.getManyAndCount();
  }

  /**
   * Danh sách cho Public: chỉ lấy status = published.
   */
  async findPublished(query: LegalServiceQueryDto): Promise<[LegalService[], number]> {
    const { page, limit, skip } = normalizePagination(query);
    const qb = this.repo
      .createQueryBuilder('s')
      .leftJoinAndSelect('s.translations', 't')
      .where('s.status = :status', { status: ContentStatus.PUBLISHED });

    if (query.practiceAreaId) qb.andWhere('s.practiceAreaId = :practiceAreaId', { practiceAreaId: query.practiceAreaId });
    if (query.isFeatured !== undefined) qb.andWhere('s.isFeatured = :isFeatured', { isFeatured: query.isFeatured });

    qb.orderBy('s.displayOrder', 'ASC').skip(skip).take(limit);

    return qb.getManyAndCount();
  }

  /**
   * Tìm theo slug trong bảng translations.
   */
  async findBySlug(slug: string): Promise<LegalService | null> {
    return this.repo
      .createQueryBuilder('s')
      .innerJoinAndSelect('s.translations', 't', 't.slug = :slug', { slug })
      .leftJoinAndSelect('s.translations', 'all_t')
      .where('s.status = :status', { status: ContentStatus.PUBLISHED })
      .getOne();
  }

  /**
   * Reorder: cập nhật displayOrder cho danh sách id.
   */
  async reorder(ids: string[]): Promise<void> {
    await Promise.all(
      ids.map((id, index) => this.repo.update(id, { displayOrder: index })),
    );
  }

  async softDelete(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }

  /**
   * Lấy danh sách dịch vụ pháp lý đã xuất bản theo lĩnh vực chuyên môn
   */
  async findPublishedByPracticeArea(practiceAreaId: string): Promise<LegalService[]> {
    return this.repo.find({
      where: { practiceAreaId, status: ContentStatus.PUBLISHED },
      relations: { translations: true },
      order: { displayOrder: 'ASC', id: 'ASC' },
    });
  }

  /**
   * Đếm số lượng dịch vụ thuộc một lĩnh vực chuyên môn
   */
  async countByPracticeArea(practiceAreaId: string, manager?: EntityManager): Promise<number> {
    const targetRepo = manager ? manager.getRepository(LegalService) : this.repo;
    return targetRepo.count({ where: { practiceAreaId } });
  }
}
