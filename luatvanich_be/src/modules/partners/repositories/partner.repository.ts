import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Partner } from '../entities/partner.entity';

@Injectable()
export class PartnerRepository {
  constructor(
    @InjectRepository(Partner)
    private readonly repo: Repository<Partner>,
  ) {}

  private getRepo(manager?: EntityManager): Repository<Partner> {
    return manager ? manager.getRepository(Partner) : this.repo;
  }

  async findAllActive(manager?: EntityManager): Promise<Partner[]> {
    return this.getRepo(manager).find({
      where: { isActive: true },
      order: { displayOrder: 'ASC', createdAt: 'DESC' },
    });
  }

  async findAll(manager?: EntityManager): Promise<Partner[]> {
    return this.getRepo(manager).find({
      order: { displayOrder: 'ASC', createdAt: 'DESC' },
    });
  }

  async findById(id: string, manager?: EntityManager): Promise<Partner | null> {
    return this.getRepo(manager).findOne({ where: { id } });
  }

  async save(partner: Partner, manager?: EntityManager): Promise<Partner> {
    return this.getRepo(manager).save(partner);
  }

  create(dto: Partial<Partner>): Partner {
    return this.repo.create(dto);
  }

  async count(manager?: EntityManager): Promise<number> {
    return this.getRepo(manager).count();
  }

  async softDelete(id: string, manager?: EntityManager): Promise<void> {
    await this.getRepo(manager).softDelete(id);
  }
}
