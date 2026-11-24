import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { FaqTranslation } from '../entities/faq-translation.entity';

@Injectable()
export class FaqTranslationRepository {
  constructor(
    @InjectRepository(FaqTranslation)
    private readonly repo: Repository<FaqTranslation>,
  ) {}

  private getRepo(manager?: EntityManager): Repository<FaqTranslation> {
    return manager ? manager.getRepository(FaqTranslation) : this.repo;
  }

  create(dto: Partial<FaqTranslation>): FaqTranslation {
    return this.repo.create(dto);
  }

  async save(translation: FaqTranslation, manager?: EntityManager): Promise<FaqTranslation> {
    return this.getRepo(manager).save(translation);
  }

  async saveMany(translations: FaqTranslation[], manager?: EntityManager): Promise<FaqTranslation[]> {
    return this.getRepo(manager).save(translations);
  }
}
