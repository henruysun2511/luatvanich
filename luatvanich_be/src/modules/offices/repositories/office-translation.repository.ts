import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfficeTranslation } from '../entities/office-translation.entity';
import { LangCode } from '../../../common/enums/lang.enum';

@Injectable()
export class OfficeTranslationRepository {
  constructor(
    @InjectRepository(OfficeTranslation)
    private readonly repo: Repository<OfficeTranslation>,
  ) {}

  async findByOfficeAndLang(officeId: string, lang: LangCode): Promise<OfficeTranslation | null> {
    return this.repo.findOne({ where: { officeId, languageCode: lang } });
  }

  async findAllByOffice(officeId: string): Promise<OfficeTranslation[]> {
    return this.repo.find({ where: { officeId } });
  }

  async upsert(data: Partial<OfficeTranslation>): Promise<OfficeTranslation> {
    const existing = await this.findByOfficeAndLang(data.officeId!, data.languageCode as LangCode);
    if (existing) {
      Object.assign(existing, data);
      existing.updatedAt = new Date();
      return this.repo.save(existing);
    }
    return this.repo.save(this.repo.create(data));
  }

  async delete(officeId: string, lang: LangCode): Promise<void> {
    await this.repo.delete({ officeId, languageCode: lang });
  }
}
