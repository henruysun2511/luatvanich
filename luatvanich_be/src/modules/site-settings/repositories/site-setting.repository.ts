import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { SiteSetting } from '../entities/site-setting.entity';

@Injectable()
export class SiteSettingRepository {
  constructor(
    @InjectRepository(SiteSetting)
    private readonly repo: Repository<SiteSetting>,
  ) {}

  private getRepo(manager?: EntityManager): Repository<SiteSetting> {
    return manager ? manager.getRepository(SiteSetting) : this.repo;
  }

  async count(manager?: EntityManager): Promise<number> {
    return this.getRepo(manager).count();
  }

  async findPublic(manager?: EntityManager): Promise<SiteSetting[]> {
    return this.getRepo(manager).find({ where: { isPublic: true } });
  }

  async findAll(manager?: EntityManager): Promise<SiteSetting[]> {
    return this.getRepo(manager).find();
  }

  async findByKey(key: string, manager?: EntityManager): Promise<SiteSetting | null> {
    return this.getRepo(manager).findOne({ where: { key } });
  }

  create(dto: Partial<SiteSetting>): SiteSetting {
    return this.repo.create(dto);
  }

  async save(setting: SiteSetting, manager?: EntityManager): Promise<SiteSetting> {
    return this.getRepo(manager).save(setting);
  }
}
