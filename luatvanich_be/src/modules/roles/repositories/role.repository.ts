import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleRepository {
  constructor(@InjectRepository(Role) private readonly repo: Repository<Role>) {}

  async findById(id: string): Promise<Role | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findByCode(code: string): Promise<Role | null> {
    return this.repo.findOne({ where: { code: code.toLowerCase() } });
  }

  async findByIdOrCode(idOrCode: string): Promise<Role | null> {
    const clean = idOrCode.trim();
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(clean);
    if (isUuid) {
      const byId = await this.findById(clean);
      if (byId) return byId;
    }
    return this.findByCode(clean.toLowerCase());
  }

  async findAll(): Promise<Role[]> {
    return this.repo.find({ order: { createdAt: 'ASC' } });
  }
}
