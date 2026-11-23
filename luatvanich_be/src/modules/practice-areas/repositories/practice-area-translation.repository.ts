import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { PracticeAreaTranslation } from '../entities/practice-area-translation.entity';

@Injectable()
export class PracticeAreaTranslationRepository {
  constructor(
    @InjectRepository(PracticeAreaTranslation)
    private readonly repo: Repository<PracticeAreaTranslation>,
  ) {}

  findBySlug(slug: string, manager?: EntityManager): Promise<PracticeAreaTranslation | null> {
    const targetRepo = manager ? manager.getRepository(PracticeAreaTranslation) : this.repo;
    return targetRepo.findOneBy({ slug });
  }

  create(data: Partial<PracticeAreaTranslation>): PracticeAreaTranslation {
    return this.repo.create(data);
  }

  async save(
    entity: PracticeAreaTranslation,
    manager?: EntityManager,
  ): Promise<PracticeAreaTranslation> {
    const targetRepo = manager ? manager.getRepository(PracticeAreaTranslation) : this.repo;
    return targetRepo.save(entity);
  }
}
