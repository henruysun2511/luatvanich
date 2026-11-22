import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Office } from '../entities/office.entity';
import { OfficeQueryDto } from '../dto/request/office-query.dto';
import { ContentStatus } from '../../../common/enums/content-status.enum';
import { normalizePagination } from '../../../common/utils/pagination.util';

@Injectable()
export class OfficeRepository {
  constructor(
    @InjectRepository(Office)
    private readonly repo: Repository<Office>,
  ) {}

  create(data: Partial<Office>): Office {
    return this.repo.create(data);
  }

  async save(entity: Office): Promise<Office> {
    return this.repo.save(entity);
  }

  async findById(id: string): Promise<Office | null> {
    return this.repo.findOne({ where: { id }, relations: ['translations'] });
  }

  async findByCode(code: string): Promise<Office | null> {
    return this.repo.findOne({ where: { code }, relations: ['translations'] });
  }

  /**
   * Danh sách văn phòng công khai: status = published, sắp xếp ưu tiên headquarters, sau đó displayOrder
   */
  async findPublishedPublic(): Promise<Office[]> {
    return this.repo
      .createQueryBuilder('o')
      .leftJoinAndSelect('o.translations', 't')
      .where('o.status = :status', { status: ContentStatus.PUBLISHED })
      .orderBy('o.isHeadquarters', 'DESC')
      .addOrderBy('o.displayOrder', 'ASC')
      .addOrderBy('o.createdAt', 'ASC')
      .getMany();
  }

  /**
   * Danh sách cho Admin: hỗ trợ phân trang, lọc status, isHeadquarters, tìm kiếm
   */
  async findPaginatedAdmin(query: OfficeQueryDto): Promise<[Office[], number]> {
    const { limit, skip } = normalizePagination(query);
    const qb = this.repo.createQueryBuilder('o').leftJoinAndSelect('o.translations', 't');

    if (query.status) {
      qb.andWhere('o.status = :status', { status: query.status });
    }

    if (query.isHeadquarters !== undefined) {
      qb.andWhere('o.isHeadquarters = :isHeadquarters', { isHeadquarters: query.isHeadquarters });
    }

    if (query.q) {
      qb.andWhere(
        '(LOWER(o.code) LIKE LOWER(:q) OR LOWER(t.name) LIKE LOWER(:q) OR LOWER(t.address) LIKE LOWER(:q))',
        { q: `%${query.q.trim()}%` },
      );
    }

    qb.orderBy('o.isHeadquarters', 'DESC')
      .addOrderBy('o.displayOrder', 'ASC')
      .addOrderBy('o.createdAt', 'DESC');

    qb.skip(skip).take(limit);

    return qb.getManyAndCount();
  }

  async updateOrder(id: string, displayOrder: number): Promise<void> {
    await this.repo.update(id, { displayOrder });
  }

  async softDelete(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }
}
