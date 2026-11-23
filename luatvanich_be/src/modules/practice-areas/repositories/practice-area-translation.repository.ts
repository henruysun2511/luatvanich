import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { PracticeAreaTranslation } from '../entities/practice-area-translation.entity';
import { LangCode } from '../../../common/enums/lang.enum';

@Injectable()
export class PracticeAreaTranslationRepository {
  constructor(
    @InjectRepository(PracticeAreaTranslation)
    private readonly repo: Repository<PracticeAreaTranslation>,
  ) {}

  private getRepo(manager?: EntityManager): Repository<PracticeAreaTranslation> {
    return manager ? manager.getRepository(PracticeAreaTranslation) : this.repo;
  }

  findBySlug(slug: string, manager?: EntityManager): Promise<PracticeAreaTranslation | null> {
    return this.getRepo(manager).findOneBy({ slug });
  }

  findByKey(
    practiceAreaId: string,
    languageCode: LangCode,
    manager?: EntityManager,
  ): Promise<PracticeAreaTranslation | null> {
    return this.getRepo(manager).findOneBy({ practiceAreaId, languageCode });
  }

  create(data: Partial<PracticeAreaTranslation>): PracticeAreaTranslation {
    return this.repo.create(data);
  }

  async save(
    entity: PracticeAreaTranslation,
    manager?: EntityManager,
  ): Promise<PracticeAreaTranslation> {
    return this.getRepo(manager).save(entity);
  }
}
