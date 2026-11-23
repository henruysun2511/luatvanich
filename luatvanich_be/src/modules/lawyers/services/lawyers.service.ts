import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LawyerRepository } from '../repositories/lawyer.repository';
import { LawyerTranslationRepository } from '../repositories/lawyer-translation.repository';
import { LawyerCredentialRepository } from '../repositories/lawyer-credential.repository';
import { LawyerPracticeArea } from '../entities/lawyer-practice-area.entity';
import { LawyerLanguage } from '../entities/lawyer-language.entity';
import { LawyerMapper } from '../mapper/lawyer.mapper';
import { CreateLawyerDto } from '../dto/request/create-lawyer.dto';
import { UpdateLawyerDto } from '../dto/request/update-lawyer.dto';
import { LawyerQueryDto } from '../dto/request/lawyer-query.dto';
import { LawyerNotFoundException } from '../exceptions/lawyer.exception';
import { ContentStatus } from '../../../common/enums/content-status.enum';
import { LangCode } from '../../../common/enums/lang.enum';
import { PaginatedResponse } from '../../../common/response/api-response';
import { normalizePagination } from '../../../common/utils/pagination.util';
import {
  generateViSlug,
  generateZhSlug,
  appendSlugSuffix,
} from '../../../common/utils/slug.util';

@Injectable()
export class LawyersService {
  constructor(
    private readonly lawyerRepo: LawyerRepository,
    private readonly translationRepo: LawyerTranslationRepository,
    private readonly credentialRepo: LawyerCredentialRepository,
    @InjectRepository(LawyerPracticeArea)
    private readonly practiceAreaRepo: Repository<LawyerPracticeArea>,
    @InjectRepository(LawyerLanguage)
    private readonly languageRepo: Repository<LawyerLanguage>,
    private readonly mapper: LawyerMapper,
  ) {}

  /** Public: Lấy danh sách luật sư đã xuất bản */
  async findAllPublic(query: LawyerQueryDto, lang: LangCode) {
    const { page, limit } = normalizePagination(query);
    const [items, total] = await this.lawyerRepo.findPublished(query);
    return PaginatedResponse.of(
      items.map((l) => this.mapper.toPublicResponse(l, lang)),
      total,
      page,
      limit,
    );
  }

  /** Public: Chi tiết luật sư theo slug */
  async findBySlugPublic(slug: string, lang: LangCode) {
    const lawyer = await this.lawyerRepo.findBySlug(slug);
    if (!lawyer) throw new LawyerNotFoundException(slug);
    return this.mapper.toDetailPublicResponse(lawyer, lang);
  }

  /** Admin: Lấy danh sách phân trang */
  async findPaginatedAdmin(query: LawyerQueryDto) {
    const { page, limit } = normalizePagination(query);
    const [items, total] = await this.lawyerRepo.findPaginatedAdmin(query);
    return PaginatedResponse.of(
      items.map((l) => this.mapper.toAdminResponse(l)),
      total,
      page,
      limit,
    );
  }

  /** Admin: Chi tiết một luật sư */
  async findByIdAdmin(id: string) {
    const lawyer = await this.lawyerRepo.findById(id);
    if (!lawyer) throw new LawyerNotFoundException(id);
    return this.mapper.toAdminResponse(lawyer);
  }

  /** Admin: Tạo mới hồ sơ luật sư */
  async create(dto: CreateLawyerDto) {
    const entity = this.lawyerRepo.create({
      officeId: dto.officeId || null,
      teamGroup: dto.teamGroup,
      avatarUrl: dto.avatarUrl || null,
      licenseNumber: dto.licenseNumber || null,
      licenseImageUrl: dto.licenseImageUrl || null,
      barAssociation: dto.barAssociation || null,
      email: dto.email || null,
      mobilePhone: dto.mobilePhone || null,
      officePhone: dto.officePhone || null,
      wechatId: dto.wechatId || null,
      wechatQrUrl: dto.wechatQrUrl || null,
      practiceStartDate: dto.practiceStartDate || null,
      displayOrder: dto.displayOrder ?? 0,
      isFeatured: dto.isFeatured ?? false,
      status: dto.status ?? ContentStatus.DRAFT,
    });

    const saved = await this.lawyerRepo.save(entity);

    // Lưu các bản dịch
    if (dto.translations && dto.translations.length > 0) {
      for (const t of dto.translations) {
        const slug = await this.resolveSlug(
          t.slug || t.latinName || t.fullName,
          t.languageCode,
        );
        await this.translationRepo.upsert({
          lawyerId: saved.id,
          languageCode: t.languageCode,
          fullName: t.fullName,
          latinName: t.latinName || null,
          slug,
          title: t.title || null,
          secondaryTitle: t.secondaryTitle || null,
          academicTitle: t.academicTitle || null,
          affiliatedOrganization: t.affiliatedOrganization || null,
          bio: t.bio || null,
          metaTitle: t.metaTitle || null,
          metaDescription: t.metaDescription || null,
          isComplete: t.isComplete ?? false,
        });
      }
    }

    // Lưu các lĩnh vực chuyên môn
    if (dto.practiceAreas && dto.practiceAreas.length > 0) {
      const paEntities = dto.practiceAreas.map((pa) =>
        this.practiceAreaRepo.create({
          lawyerId: saved.id,
          practiceAreaId: pa.practiceAreaId,
          isPrimary: pa.isPrimary ?? false,
          displayOrder: pa.displayOrder ?? 0,
        }),
      );
      await this.practiceAreaRepo.save(paEntities);
    }

    // Lưu ngôn ngữ
    if (dto.languages && dto.languages.length > 0) {
      const langEntities = dto.languages.map((l) =>
        this.languageRepo.create({
          lawyerId: saved.id,
          languageCode: l.languageCode,
          isNative: l.isNative ?? false,
        }),
      );
      await this.languageRepo.save(langEntities);
    }

    // Lưu credentials
    if (dto.credentials && dto.credentials.length > 0) {
      for (const c of dto.credentials) {
        const savedCred = await this.credentialRepo.saveCredential({
          lawyerId: saved.id,
          kind: c.kind,
          yearStart: c.yearStart ?? null,
          yearEnd: c.yearEnd ?? null,
          displayOrder: c.displayOrder ?? 0,
        });

        if (c.translations && c.translations.length > 0) {
          for (const ct of c.translations) {
            await this.credentialRepo.upsertTranslation({
              credentialId: savedCred.id,
              languageCode: ct.languageCode,
              title: ct.title,
              institution: ct.institution || null,
              description: ct.description || null,
            });
          }
        }
      }
    }

    return this.findByIdAdmin(saved.id);
  }

  /** Admin: Cập nhật hồ sơ luật sư */
  async update(id: string, dto: UpdateLawyerDto) {
    const lawyer = await this.lawyerRepo.findById(id);
    if (!lawyer) throw new LawyerNotFoundException(id);

    if (dto.officeId !== undefined) lawyer.officeId = dto.officeId || null;
    if (dto.teamGroup !== undefined) lawyer.teamGroup = dto.teamGroup;
    if (dto.avatarUrl !== undefined) lawyer.avatarUrl = dto.avatarUrl || null;
    if (dto.licenseNumber !== undefined)
      lawyer.licenseNumber = dto.licenseNumber || null;
    if (dto.licenseImageUrl !== undefined)
      lawyer.licenseImageUrl = dto.licenseImageUrl || null;
    if (dto.barAssociation !== undefined)
      lawyer.barAssociation = dto.barAssociation || null;
    if (dto.email !== undefined) lawyer.email = dto.email || null;
    if (dto.mobilePhone !== undefined)
      lawyer.mobilePhone = dto.mobilePhone || null;
    if (dto.officePhone !== undefined)
      lawyer.officePhone = dto.officePhone || null;
    if (dto.wechatId !== undefined) lawyer.wechatId = dto.wechatId || null;
    if (dto.wechatQrUrl !== undefined)
      lawyer.wechatQrUrl = dto.wechatQrUrl || null;
    if (dto.practiceStartDate !== undefined)
      lawyer.practiceStartDate = dto.practiceStartDate || null;
    if (dto.displayOrder !== undefined) lawyer.displayOrder = dto.displayOrder;
    if (dto.isFeatured !== undefined) lawyer.isFeatured = dto.isFeatured;
    if (dto.status !== undefined) lawyer.status = dto.status;

    await this.lawyerRepo.save(lawyer);

    // Cập nhật bản dịch
    if (dto.translations && dto.translations.length > 0) {
      for (const t of dto.translations) {
        const slug = await this.resolveSlug(
          t.slug || t.latinName || t.fullName,
          t.languageCode,
          id,
        );
        await this.translationRepo.upsert({
          lawyerId: id,
          languageCode: t.languageCode,
          fullName: t.fullName,
          latinName: t.latinName || null,
          slug,
          title: t.title || null,
          secondaryTitle: t.secondaryTitle || null,
          academicTitle: t.academicTitle || null,
          affiliatedOrganization: t.affiliatedOrganization || null,
          bio: t.bio || null,
          metaTitle: t.metaTitle || null,
          metaDescription: t.metaDescription || null,
          isComplete: t.isComplete ?? false,
        });
      }
    }

    // Cập nhật lĩnh vực chuyên môn (thay thế nếu truyền lên)
    if (dto.practiceAreas !== undefined) {
      await this.practiceAreaRepo.delete({ lawyerId: id });
      if (dto.practiceAreas.length > 0) {
        const paEntities = dto.practiceAreas.map((pa) =>
          this.practiceAreaRepo.create({
            lawyerId: id,
            practiceAreaId: pa.practiceAreaId,
            isPrimary: pa.isPrimary ?? false,
            displayOrder: pa.displayOrder ?? 0,
          }),
        );
        await this.practiceAreaRepo.save(paEntities);
      }
    }

    // Cập nhật ngôn ngữ (thay thế nếu truyền lên)
    if (dto.languages !== undefined) {
      await this.languageRepo.delete({ lawyerId: id });
      if (dto.languages.length > 0) {
        const langEntities = dto.languages.map((l) =>
          this.languageRepo.create({
            lawyerId: id,
            languageCode: l.languageCode,
            isNative: l.isNative ?? false,
          }),
        );
        await this.languageRepo.save(langEntities);
      }
    }

    // Cập nhật credentials
    if (dto.credentials !== undefined) {
      await this.credentialRepo.deleteByLawyerId(id);
      if (dto.credentials.length > 0) {
        for (const c of dto.credentials) {
          const savedCred = await this.credentialRepo.saveCredential({
            lawyerId: id,
            kind: c.kind,
            yearStart: c.yearStart ?? null,
            yearEnd: c.yearEnd ?? null,
            displayOrder: c.displayOrder ?? 0,
          });

          if (c.translations && c.translations.length > 0) {
            for (const ct of c.translations) {
              await this.credentialRepo.upsertTranslation({
                credentialId: savedCred.id,
                languageCode: ct.languageCode,
                title: ct.title,
                institution: ct.institution || null,
                description: ct.description || null,
              });
            }
          }
        }
      }
    }

    return this.findByIdAdmin(id);
  }

  /** Admin: Đổi nhanh trạng thái */
  async updateStatus(id: string, status: ContentStatus) {
    const lawyer = await this.lawyerRepo.findById(id);
    if (!lawyer) throw new LawyerNotFoundException(id);
    lawyer.status = status;
    await this.lawyerRepo.save(lawyer);
    return this.findByIdAdmin(id);
  }

  /** Admin: Đổi thứ tự hiển thị */
  async reorder(ids: string[]) {
    await this.lawyerRepo.reorder(ids);
  }

  /** Admin: Xóa mềm */
  async delete(id: string) {
    const lawyer = await this.lawyerRepo.findById(id);
    if (!lawyer) throw new LawyerNotFoundException(id);
    await this.lawyerRepo.softDelete(id);
  }

  /** Helper: Sinh slug duy nhất */
  private async resolveSlug(
    raw: string,
    lang: LangCode,
    excludeLawyerId?: string,
  ): Promise<string> {
    const baseSlug =
      lang === LangCode.ZH_CN ? generateZhSlug(raw) : generateViSlug(raw);
    let slug = baseSlug;
    let count = 1;

    while (await this.translationRepo.isSlugTaken(slug, excludeLawyerId)) {
      slug = appendSlugSuffix(baseSlug, ++count);
    }

    return slug;
  }
}
