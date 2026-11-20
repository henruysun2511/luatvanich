import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LegalServiceTranslation } from '../entities/legal-service-translation.entity';
import { LangCode } from '../../../common/enums/lang.enum';

@Injectable()
export class LegalServiceTranslationRepository {
  constructor(
    @InjectRepository(LegalServiceTranslation)
    private readonly repo: Repository<LegalServiceTranslation>,
  ) {}

  async findByServiceAndLang(serviceId: string, lang: LangCode): Promise<LegalServiceTranslation | null> {
    return this.repo.findOne({ where: { serviceId, languageCode: lang } });
  }

  async findAllByService(serviceId: string): Promise<LegalServiceTranslation[]> {
    return this.repo.find({ where: { serviceId } });
  }

  async isSlugTaken(slug: string, excludeServiceId?: string): Promise<boolean> {
    const qb = this.repo.createQueryBuilder('t').where('t.slug = :slug', { slug });
    if (excludeServiceId) qb.andWhere('t.serviceId != :excludeServiceId', { excludeServiceId });
    return (await qb.getCount()) > 0;
  }

  async upsert(data: Partial<LegalServiceTranslation>): Promise<LegalServiceTranslation> {
    const existing = await this.findByServiceAndLang(data.serviceId!, data.languageCode as LangCode);
    if (existing) {
      Object.assign(existing, data);
      existing.updatedAt = new Date();
      return this.repo.save(existing);
    }
    return this.repo.save(this.repo.create(data));
  }

  async delete(serviceId: string, lang: LangCode): Promise<void> {
    await this.repo.delete({ serviceId, languageCode: lang });
  }
}
