import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LawyerTranslation } from '../entities/lawyer-translation.entity';

@Injectable()
export class LawyerTranslationRepository {
  constructor(
    @InjectRepository(LawyerTranslation)
    private readonly repo: Repository<LawyerTranslation>,
  ) {}

  async upsert(data: Partial<LawyerTranslation>): Promise<LawyerTranslation> {
    return this.repo.save(this.repo.create(data));
  }

  async isSlugTaken(slug: string, excludeLawyerId?: string): Promise<boolean> {
    const qb = this.repo
      .createQueryBuilder('lt')
      .where('lt.slug = :slug', { slug });

    if (excludeLawyerId) {
      qb.andWhere('lt.lawyerId != :excludeLawyerId', { excludeLawyerId });
    }

    const count = await qb.getCount();
    return count > 0;
  }
}
