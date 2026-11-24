import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Faq } from '../entities/faq.entity';

@Injectable()
export class FaqRepository {
  constructor(
    @InjectRepository(Faq)
    private readonly repo: Repository<Faq>,
  ) {}

  private getRepo(manager?: EntityManager): Repository<Faq> {
    return manager ? manager.getRepository(Faq) : this.repo;
  }

  async findAllActive(manager?: EntityManager): Promise<Faq[]> {
    return this.getRepo(manager).find({
      where: { isActive: true },
      relations: ['translations'],
      order: { displayOrder: 'ASC', createdAt: 'DESC' },
    });
  }

  async findAll(manager?: EntityManager): Promise<Faq[]> {
    return this.getRepo(manager).find({
      relations: ['translations'],
      order: { displayOrder: 'ASC', createdAt: 'DESC' },
    });
  }

  async findById(id: string, manager?: EntityManager): Promise<Faq | null> {
    return this.getRepo(manager).findOne({
      where: { id },
      relations: ['translations'],
    });
  }

  create(dto: Partial<Faq>): Faq {
    return this.repo.create(dto);
  }

  async save(faq: Faq, manager?: EntityManager): Promise<Faq> {
    return this.getRepo(manager).save(faq);
  }

  async softDelete(id: string, manager?: EntityManager): Promise<void> {
    await this.getRepo(manager).softDelete(id);
  }
}
