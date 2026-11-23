import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ConsultationRequest } from '../entities/consultation-request.entity';
import { ConsultationQueryDto } from '../dto/request/consultation-query.dto';
import { LeadStatus } from '../enums/lead-status.enum';

@Injectable()
export class ConsultationRequestRepository {
  constructor(
    @InjectRepository(ConsultationRequest)
    private readonly repo: Repository<ConsultationRequest>,
  ) {}

  async createAndSave(data: Partial<ConsultationRequest>): Promise<ConsultationRequest> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findById(id: string): Promise<ConsultationRequest | null> {
    return this.repo.findOne({
      where: { id },
      relations: [
        'practiceArea',
        'practiceArea.translations',
        'lawyer',
        'lawyer.translations',
        'assignedUser',
        'attachments',
        'notes',
        'notes.author',
      ],
      order: {
        notes: {
          createdAt: 'DESC',
        },
      },
    });
  }

  async findWithFilters(query: ConsultationQueryDto): Promise<{ items: ConsultationRequest[]; total: number }> {
    const qb = this.repo
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.practiceArea', 'pa')
      .leftJoinAndSelect('pa.translations', 'pat')
      .leftJoinAndSelect('c.lawyer', 'l')
      .leftJoinAndSelect('l.translations', 'lt')
      .leftJoinAndSelect('c.assignedUser', 'u')
      .leftJoinAndSelect('c.attachments', 'att')
      .leftJoinAndSelect('c.notes', 'n');

    if (query.q) {
      qb.andWhere(
        '(c.fullName ILIKE :q OR c.phone ILIKE :q OR c.email ILIKE :q OR c.companyName ILIKE :q OR c.content ILIKE :q)',
        { q: `%${query.q}%` },
      );
    }

    if (query.status) {
      qb.andWhere('c.status = :status', { status: query.status });
    }

    if (query.contactChannel) {
      qb.andWhere('c.contactChannel = :channel', { channel: query.contactChannel });
    }

    if (query.practiceAreaId) {
      qb.andWhere('c.practiceAreaId = :paId', { paId: query.practiceAreaId });
    }

    if (query.lawyerId) {
      qb.andWhere('c.lawyerId = :lawyerId', { lawyerId: query.lawyerId });
    }

    if (query.assignedUserId) {
      qb.andWhere('c.assignedUserId = :userId', { userId: query.assignedUserId });
    }

    if (query.fromDate) {
      qb.andWhere('c.createdAt >= :fromDate', { fromDate: new Date(query.fromDate) });
    }

    if (query.toDate) {
      qb.andWhere('c.createdAt <= :toDate', { toDate: new Date(query.toDate) });
    }

    qb.orderBy('c.createdAt', 'DESC');

    const page = query.page || 1;
    const limit = query.limit || 20;
    qb.skip((page - 1) * limit).take(limit);

    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  async updateStatus(id: string, status: LeadStatus): Promise<void> {
    await this.repo.update(id, { status });
  }

  async updateStatusBulk(ids: string[], status: LeadStatus): Promise<void> {
    if (ids.length === 0) return;
    await this.repo.update({ id: In(ids) }, { status });
  }

  async assignUser(id: string, assignedUserId: string | null): Promise<void> {
    await this.repo.update(id, { assignedUserId });
  }

  async softDelete(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }
}
