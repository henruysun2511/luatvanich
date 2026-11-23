import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { DataSource, EntityManager, IsNull, SelectQueryBuilder } from 'typeorm';
import { DEFAULT_LANG, LangCode } from '../../common/enums/lang.enum';
import { PaginatedResponse } from '../../common/response/api-response';
import { normalizePagination } from '../../common/utils/pagination.util';
import { generateViSlug, generateZhSlug } from '../../common/utils/slug.util';
import { Lawyer } from './lawyer.entity';
import { LawyerTranslation } from './lawyer-translation.entity';
import { LawyerLanguage } from './lawyer-language.entity';
import { LawyerCredential } from './lawyer-credential.entity';
import { LawyerCredentialTranslation } from './lawyer-credential-translation.entity';
import { LawyerStatus } from './lawyer.enums';
import {
  CreateCredentialDto, CreateLawyerDto, LawyerLanguageDto, LawyerQueryDto,
  LawyerTranslationDto, UpdateCredentialDto, UpdateLawyerDto,
} from './lawyers.dto';

@Injectable()
export class LawyersService {
  constructor(private readonly db: DataSource) {}

  private query() {
    return this.db.getRepository(Lawyer).createQueryBuilder('lawyer')
      .leftJoinAndSelect('lawyer.translations', 'translation')
      .leftJoinAndSelect('lawyer.languages', 'language');
  }

  private async paginate(query: SelectQueryBuilder<Lawyer>, filters: LawyerQueryDto) {
    const { page, limit, skip } = normalizePagination(filters);
    if (filters.group) query.andWhere('lawyer.teamGroup = :group', { group: filters.group });
    if (filters.language) {
      query.andWhere('EXISTS (SELECT 1 FROM lawyer_languages ll WHERE ll.lawyer_id = lawyer.id AND ll.language_code = :language)', { language: filters.language });
    }
    if (filters.experienceMin !== undefined) {
      query.andWhere("lawyer.practiceStartDate <= CURRENT_DATE - make_interval(years => :experienceMin)", { experienceMin: filters.experienceMin });
    }
    if (filters.q?.trim()) {
      const search = filters.q.trim().replace(/[!%_]/g, (character) => '!' + character);
      query.andWhere(
        "EXISTS (SELECT 1 FROM lawyer_translations lt WHERE lt.lawyer_id = lawyer.id AND (lt.full_name ILIKE :q ESCAPE '!' OR lt.latin_name ILIKE :q ESCAPE '!' OR lt.title ILIKE :q ESCAPE '!'))",
        { q: '%' + search + '%' },
      );
    }
    const [items, total] = await query.orderBy('lawyer.displayOrder', 'ASC')
      .addOrderBy('lawyer.createdAt', filters.sortOrder ?? 'DESC')
      .addOrderBy('lawyer.id', 'ASC').skip(skip).take(limit).getManyAndCount();
    return { items, total, page, limit };
  }

  async adminList(filters: LawyerQueryDto) {
    const query = this.query();
    if (filters.status) query.andWhere('lawyer.status = :status', { status: filters.status });
    const { items, total, page, limit } = await this.paginate(query, filters);
    return PaginatedResponse.of(items.map((lawyer) => this.adminProfile(lawyer)), total, page, limit);
  }

  async publicList(filters: LawyerQueryDto, lang: LangCode, featured = false) {
    const query = this.query().andWhere('lawyer.status = :published', { published: LawyerStatus.PUBLISHED });
    query.andWhere('EXISTS (SELECT 1 FROM lawyer_translations lt WHERE lt.lawyer_id = lawyer.id AND lt.language_code = :lang)', { lang });
    if (featured) query.andWhere('lawyer.isFeatured = true');
    const { items, total, page, limit } = await this.paginate(query, filters);
    return PaginatedResponse.of(items.map((lawyer) => this.publicProfile(lawyer, lang)), total, page, limit);
  }

  async publicDetail(slug: string, lang: LangCode) {
    return this.db.transaction('REPEATABLE READ', async (manager) => {
      const lawyer = await manager.getRepository(Lawyer).createQueryBuilder('lawyer')
        .innerJoin('lawyer.translations', 'matched', 'matched.slug = :slug AND matched.languageCode = :lang', { slug, lang })
        .leftJoinAndSelect('lawyer.translations', 'translation')
        .leftJoinAndSelect('lawyer.languages', 'language')
        .where('lawyer.status = :status', { status: LawyerStatus.PUBLISHED })
        .getOne();
      if (!lawyer) throw new NotFoundException('Không tìm thấy luật sư');
      const credentials = await this.credentials(manager, lawyer.id);
      return {
        ...this.publicProfile(lawyer, lang),
        credentials: credentials.map(({ id, kind, yearStart, yearEnd, displayOrder, translations }) => ({
          id, kind, yearStart, yearEnd, displayOrder,
          translation: translations.find((item) => item.languageCode === lang) ?? translations[0],
        })),
      };
    });
  }

  private adminProfile(lawyer: Lawyer) {
    return { ...lawyer, experienceYears: this.experienceYears(lawyer.practiceStartDate) };
  }

  private publicProfile(lawyer: Lawyer, lang: LangCode) {
    const { id, teamGroup, avatarUrl, isFeatured, practiceStartDate, languages, translations } = lawyer;
    const translation = translations.find((item) => item.languageCode === lang)
      ?? translations.find((item) => item.languageCode === DEFAULT_LANG);
    return {
      id, teamGroup, avatarUrl, isFeatured, languages,
      experienceYears: this.experienceYears(practiceStartDate),
      translation,
    };
  }

  private experienceYears(start: string | null) {
    if (!start) return null;
    const today = new Date().toISOString().slice(0, 10);
    const difference = Number(today.slice(0, 4)) - Number(start.slice(0, 4));
    return Math.max(0, difference - Number(today.slice(5) < start.slice(5)));
  }

  private async requireLawyer(manager: EntityManager, id: string, lock = false) {
    const lawyer = await manager.findOne(Lawyer, {
      where: { id },
      ...(lock ? { lock: { mode: 'pessimistic_write' } } : {}),
    });
    if (!lawyer) throw new NotFoundException('Không tìm thấy luật sư');
    return lawyer;
  }

  private async detail(manager: EntityManager, id: string) {
    const lawyer = await manager.findOne(Lawyer, {
      where: { id },
      relations: { translations: true, languages: true },
    });
    if (!lawyer) throw new NotFoundException('Không tìm thấy luật sư');
    return { ...this.adminProfile(lawyer), credentials: await this.credentials(manager, id) };
  }

  adminDetail(id: string) {
    return this.db.transaction('REPEATABLE READ', (manager) => this.detail(manager, id));
  }

  create(dto: CreateLawyerDto) {
    if (!dto.translations.some(({ languageCode }) => languageCode === DEFAULT_LANG)) {
      throw new BadRequestException('Hồ sơ cần có bản dịch tiếng Việt');
    }
    return this.db.transaction(async (manager) => {
      const { translations, languages, ...fields } = dto;
      const lawyer = await manager.save(Lawyer, manager.create(Lawyer, fields));
      await this.saveTranslations(manager, lawyer.id, translations);
      if (languages) await this.replaceLanguages(manager, lawyer.id, languages);
      return this.detail(manager, lawyer.id);
    });
  }

  update(id: string, dto: UpdateLawyerDto | { status: LawyerStatus }) {
    return this.db.transaction(async (manager) => {
      const lawyer = await this.requireLawyer(manager, id, true);
      if ('status' in dto) {
        lawyer.status = dto.status;
        await manager.save(Lawyer, lawyer);
      } else {
        const { translations, languages, ...fields } = dto;
        await manager.save(Lawyer, Object.assign(lawyer, fields));
        if (translations) await this.saveTranslations(manager, id, translations);
        if (languages) await this.replaceLanguages(manager, id, languages);
      }
      return this.detail(manager, id);
    });
  }

  private async saveTranslations(manager: EntityManager, lawyerId: string, translations: LawyerTranslationDto[]) {
    const existing = await manager.findBy(LawyerTranslation, { lawyerId });
    const rows = translations.map((input) => {
      if (input.slug === 'featured') throw new BadRequestException('Slug đã được dành cho danh sách nổi bật');
      const current = existing.find(({ languageCode }) => languageCode === input.languageCode);
      const base = input.languageCode === LangCode.VI
        ? generateViSlug(input.fullName)
        : generateZhSlug(input.latinName || input.fullName);
      const slug = input.slug ?? current?.slug ?? [base.slice(0, 180).replace(/-+$/, '') || 'luat-su', lawyerId].join('-');
      return manager.create(LawyerTranslation, { ...current, ...input, lawyerId, slug });
    });
    await manager.save(LawyerTranslation, rows);
  }

  private async replaceLanguages(manager: EntityManager, lawyerId: string, languages: LawyerLanguageDto[]) {
    await manager.delete(LawyerLanguage, { lawyerId });
    if (languages.length) {
      await manager.insert(LawyerLanguage, languages.map((language) => ({ ...language, lawyerId })));
    }
  }

  async remove(id: string) {
    const result = await this.db.getRepository(Lawyer).softDelete({ id, deletedAt: IsNull() });
    if (!result.affected) throw new NotFoundException('Không tìm thấy luật sư');
  }

  private credentials(manager: EntityManager, lawyerId: string) {
    return manager.find(LawyerCredential, {
      where: { lawyerId },
      relations: { translations: true },
      order: { displayOrder: 'ASC', id: 'ASC', translations: { languageCode: 'ASC' } },
    });
  }

  listCredentials(lawyerId: string) {
    return this.db.transaction('REPEATABLE READ', async (manager) => {
      await this.requireLawyer(manager, lawyerId);
      return this.credentials(manager, lawyerId);
    });
  }

  createCredential(lawyerId: string, dto: CreateCredentialDto) {
    return this.db.transaction(async (manager) => {
      await this.requireLawyer(manager, lawyerId, true);
      return this.saveCredential(manager, manager.create(LawyerCredential, { id: randomUUID(), lawyerId }), dto);
    });
  }

  private async requireCredential(manager: EntityManager, id: string) {
    const lookup = await manager.findOneBy(LawyerCredential, { id });
    if (!lookup) throw new NotFoundException('Không tìm thấy mục hồ sơ năng lực');
    await this.requireLawyer(manager, lookup.lawyerId, true);
    const credential = await manager.findOne(LawyerCredential, { where: { id }, relations: { translations: true } });
    if (!credential) throw new NotFoundException('Không tìm thấy mục hồ sơ năng lực');
    return credential;
  }

  updateCredential(id: string, dto: UpdateCredentialDto) {
    return this.db.transaction(async (manager) => {
      const credential = await this.requireCredential(manager, id);
      return this.saveCredential(manager, credential, dto);
    });
  }

  private async saveCredential(manager: EntityManager, credential: LawyerCredential, dto: UpdateCredentialDto) {
    const { translations, ...fields } = dto;
    Object.assign(credential, fields);
    if (credential.yearStart != null && credential.yearEnd != null && credential.yearEnd < credential.yearStart) {
      throw new BadRequestException('Năm kết thúc phải bằng hoặc sau năm bắt đầu');
    }
    const saved = await manager.save(LawyerCredential, credential);
    if (translations) {
      const rows = translations.map((input) => manager.create(LawyerCredentialTranslation, {
        ...saved.translations?.find(({ languageCode }) => languageCode === input.languageCode),
        ...input,
        credentialId: saved.id,
      }));
      await manager.save(LawyerCredentialTranslation, rows);
    }
    return manager.findOneOrFail(LawyerCredential, {
      where: { id: saved.id },
      relations: { translations: true },
    });
  }

  removeCredential(id: string) {
    return this.db.transaction(async (manager) => {
      const credential = await this.requireCredential(manager, id);
      await manager.delete(LawyerCredential, credential.id);
    });
  }
}
