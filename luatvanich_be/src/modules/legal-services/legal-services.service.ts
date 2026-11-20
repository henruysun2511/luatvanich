import { Injectable } from '@nestjs/common';
import { LegalServiceRepository } from './repositories/legal-service.repository';
import { LegalServiceTranslationRepository } from './repositories/legal-service-translation.repository';
import { LegalServiceMapper } from './mapper/legal-service.mapper';
import { CreateLegalServiceDto } from './dto/request/create-legal-service.dto';
import { UpdateLegalServiceDto } from './dto/request/update-legal-service.dto';
import { LegalServiceQueryDto } from './dto/request/legal-service-query.dto';
import { UpsertTranslationDto } from './dto/request/upsert-translation.dto';
import { UpdateStatusDto } from './dto/request/update-status.dto';
import { ReorderDto } from './dto/request/reorder.dto';
import { LangCode, DEFAULT_LANG } from '../../common/enums/lang.enum';
import { ContentStatus } from '../../common/enums/content-status.enum';
import { generateViSlug, generateZhSlug, appendSlugSuffix } from '../../common/utils/slug.util';
import { normalizePagination } from '../../common/utils/pagination.util';
import { PaginatedResponse } from '../../common/response/api-response';
import {
  LegalServiceNotFoundException,
  LegalServiceSlugConflictException,
} from './exceptions/legal-service.exception';

@Injectable()
export class LegalServicesService {
  constructor(
    private readonly serviceRepo: LegalServiceRepository,
    private readonly translationRepo: LegalServiceTranslationRepository,
    private readonly mapper: LegalServiceMapper,
  ) {}

  // ── [PUBLIC] ─────────────────────────────────────────────────────────────

  async getPublicList(query: LegalServiceQueryDto) {
    const { page, limit } = normalizePagination(query);
    const [items, total] = await this.serviceRepo.findPublished(query);
    return PaginatedResponse.of(
      this.mapper.toPublicResponseList(items, query.lang || DEFAULT_LANG),
      total,
      page,
      limit,
    );
  }

  async getPublicBySlug(slug: string, lang: LangCode) {
    // BR1: Tìm dịch vụ theo slug, chỉ trả published
    const service = await this.serviceRepo.findBySlug(slug);
    if (!service) throw new LegalServiceNotFoundException(slug);
    return this.mapper.toPublicResponse(service, lang);
  }

  // ── [ADMIN] ──────────────────────────────────────────────────────────────

  async getAdminList(query: LegalServiceQueryDto) {
    const { page, limit } = normalizePagination(query);
    const [items, total] = await this.serviceRepo.findPaginatedAdmin(query);
    return PaginatedResponse.of(
      items.map((s) => this.mapper.toAdminResponse(s)),
      total,
      page,
      limit,
    );
  }

  async getAdminById(id: string) {
    const service = await this.serviceRepo.findById(id);
    if (!service) throw new LegalServiceNotFoundException(id);
    return this.mapper.toAdminResponse(service);
  }

  async create(dto: CreateLegalServiceDto) {
    // BR1: Sinh slug tiếng Việt
    const slugVi = await this.resolveSlug(dto.slugVi || dto.titleVi, LangCode.VI);

    const entity = this.serviceRepo.create({
      practiceAreaId: dto.practiceAreaId,
      isFeatured: dto.isFeatured ?? false,
      status: ContentStatus.DRAFT,
    });
    const saved = await this.serviceRepo.save(entity);

    // Tạo bản dịch tiếng Việt (bắt buộc)
    await this.translationRepo.upsert({
      serviceId: saved.id,
      languageCode: LangCode.VI,
      title: dto.titleVi,
      slug: slugVi,
      excerpt: dto.excerptVi,
      contentHtml: dto.contentHtmlVi,
      isComplete: true,
    });

    // Tạo bản dịch tiếng Trung nếu có
    if (dto.titleZh) {
      const slugZh = await this.resolveSlug(dto.slugZh || dto.titleZh, LangCode.ZH_CN, saved.id);
      await this.translationRepo.upsert({
        serviceId: saved.id,
        languageCode: LangCode.ZH_CN,
        title: dto.titleZh,
        slug: slugZh,
        excerpt: dto.excerptZh,
        isComplete: false,
      });
    }

    return this.getAdminById(saved.id);
  }

  async update(id: string, dto: UpdateLegalServiceDto) {
    const service = await this.serviceRepo.findById(id);
    if (!service) throw new LegalServiceNotFoundException(id);

    if (dto.practiceAreaId !== undefined) service.practiceAreaId = dto.practiceAreaId;
    if (dto.isFeatured !== undefined) service.isFeatured = dto.isFeatured;
    await this.serviceRepo.save(service);

    // Cập nhật bản dịch tiếng Việt nếu có
    if (dto.titleVi) {
      const slugVi = dto.slugVi
        ? await this.resolveSlug(dto.slugVi, LangCode.VI, id)
        : undefined;
      await this.translationRepo.upsert({
        serviceId: id,
        languageCode: LangCode.VI,
        title: dto.titleVi,
        ...(slugVi ? { slug: slugVi } : {}),
        excerpt: dto.excerptVi,
        contentHtml: dto.contentHtmlVi,
      });
    }

    return this.getAdminById(id);
  }

  async updateStatus(id: string, dto: UpdateStatusDto) {
    const service = await this.serviceRepo.findById(id);
    if (!service) throw new LegalServiceNotFoundException(id);
    service.status = dto.status;
    await this.serviceRepo.save(service);
    return this.getAdminById(id);
  }

  async upsertTranslation(id: string, lang: LangCode, dto: UpsertTranslationDto) {
    const service = await this.serviceRepo.findById(id);
    if (!service) throw new LegalServiceNotFoundException(id);

    // BR2: Kiểm tra slug không trùng
    const slug = await this.resolveSlug(dto.slug || dto.title, lang, id);

    await this.translationRepo.upsert({
      serviceId: id,
      languageCode: lang,
      title: dto.title,
      slug,
      excerpt: dto.excerpt,
      contentHtml: dto.contentHtml,
      metaTitle: dto.metaTitle,
      metaDescription: dto.metaDescription,
      isComplete: dto.isComplete ?? false,
    });

    return this.getAdminById(id);
  }

  async getTranslations(id: string) {
    const service = await this.serviceRepo.findById(id);
    if (!service) throw new LegalServiceNotFoundException(id);
    return this.translationRepo.findAllByService(id);
  }

  async reorder(dto: ReorderDto) {
    await this.serviceRepo.reorder(dto.ids);
  }

  async remove(id: string) {
    const service = await this.serviceRepo.findById(id);
    if (!service) throw new LegalServiceNotFoundException(id);

    // BR3: Không xóa dịch vụ đang published — cần archive trước
    if (service.status === ContentStatus.PUBLISHED) {
      service.status = ContentStatus.ARCHIVED;
      await this.serviceRepo.save(service);
    }

    await this.serviceRepo.softDelete(id);
  }

  // ── Helpers ──────────────────────────────────────────────────────────────

  /**
   * Sinh slug duy nhất: kiểm tra trùng và thêm suffix nếu cần.
   */
  private async resolveSlug(raw: string, lang: LangCode, excludeServiceId?: string): Promise<string> {
    const baseSlug = lang === LangCode.ZH_CN ? generateZhSlug(raw) : generateViSlug(raw);
    let slug = baseSlug;
    let count = 1;

    while (await this.translationRepo.isSlugTaken(slug, excludeServiceId)) {
      slug = appendSlugSuffix(baseSlug, ++count);
    }

    return slug;
  }
}
