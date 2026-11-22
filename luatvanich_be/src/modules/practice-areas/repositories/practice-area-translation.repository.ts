import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { PracticeAreaTranslation } from '../entities/practice-area-translation.entity';

@Injectable()
export class PracticeAreaTranslationRepository extends Repository<PracticeAreaTranslation> {
  constructor(dataSource: DataSource) {
    super(PracticeAreaTranslation, dataSource.manager);
  }

  findBySlug(slug: string, manager: EntityManager) {
    return manager.findOneBy(PracticeAreaTranslation, { slug });
  }
}
