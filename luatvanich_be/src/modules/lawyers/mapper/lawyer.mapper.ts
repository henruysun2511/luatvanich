import { Injectable } from '@nestjs/common';
import { Lawyer } from '../entities/lawyer.entity';
import { LawyerAdminDto } from '../dto/response/lawyer-admin.dto';
import {
  LawyerPublicDto,
  LawyerDetailPublicDto,
} from '../dto/response/lawyer-public.dto';
import { LangCode } from '../../../common/enums/lang.enum';

@Injectable()
export class LawyerMapper {
  calculateExperienceYears(
    practiceStartDate?: string | null,
  ): number | undefined {
    if (!practiceStartDate) return undefined;
    const startYear = new Date(practiceStartDate).getFullYear();
    if (isNaN(startYear)) return undefined;
    const currentYear = new Date().getFullYear();
    const years = currentYear - startYear;
    return years > 0 ? years : 1;
  }

  toAdminResponse(entity: Lawyer): LawyerAdminDto {
    const officeName =
      entity.office?.translations?.find((t) => t.languageCode === LangCode.VI)
        ?.name ||
      entity.office?.translations?.[0]?.name ||
      undefined;

    return {
      id: entity.id,
      officeId: entity.officeId ?? undefined,
      officeName,
      userId: entity.userId ?? undefined,
      teamGroup: entity.teamGroup,
      avatarUrl: entity.avatarUrl ?? undefined,
      licenseNumber: entity.licenseNumber ?? undefined,
      licenseImageUrl: entity.licenseImageUrl ?? undefined,
      barAssociation: entity.barAssociation ?? undefined,
      email: entity.email ?? undefined,
      mobilePhone: entity.mobilePhone ?? undefined,
      officePhone: entity.officePhone ?? undefined,
      wechatId: entity.wechatId ?? undefined,
      wechatQrUrl: entity.wechatQrUrl ?? undefined,
      practiceStartDate: entity.practiceStartDate ?? undefined,
      experienceYears: this.calculateExperienceYears(entity.practiceStartDate),
      displayOrder: entity.displayOrder,
      isFeatured: entity.isFeatured,
      status: entity.status,
      translations: (entity.translations || []).map((t) => ({
        languageCode: t.languageCode,
        fullName: t.fullName,
        latinName: t.latinName ?? undefined,
        slug: t.slug,
        title: t.title ?? undefined,
        secondaryTitle: t.secondaryTitle ?? undefined,
        academicTitle: t.academicTitle ?? undefined,
        affiliatedOrganization: t.affiliatedOrganization ?? undefined,
        bio: t.bio ?? undefined,
        metaTitle: t.metaTitle ?? undefined,
        metaDescription: t.metaDescription ?? undefined,
        isComplete: t.isComplete,
        updatedAt: t.updatedAt,
      })),
      practiceAreas: (entity.practiceAreas || []).map((pa) => {
        const areaName =
          pa.practiceArea?.translations?.find(
            (t) => t.languageCode === LangCode.VI,
          )?.name ||
          pa.practiceArea?.translations?.[0]?.name ||
          '';
        return {
          id: pa.practiceAreaId,
          name: areaName,
          isPrimary: pa.isPrimary,
        };
      }),
      languages: (entity.languages || []).map((l) => ({
        languageCode: l.languageCode,
        isNative: l.isNative,
      })),
      credentials: (entity.credentials || []).map((c) => ({
        id: c.id,
        kind: c.kind,
        yearStart: c.yearStart ?? undefined,
        yearEnd: c.yearEnd ?? undefined,
        displayOrder: c.displayOrder,
        translations: (c.translations || []).map((ct) => ({
          languageCode: ct.languageCode,
          title: ct.title,
          institution: ct.institution ?? undefined,
          description: ct.description ?? undefined,
        })),
      })),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toPublicResponse(entity: Lawyer, lang: LangCode): LawyerPublicDto {
    const translations = entity.translations || [];
    let translation = translations.find(
      (t) => t.languageCode === lang && t.isComplete,
    );
    let fallback = false;

    if (!translation) {
      translation = translations.find((t) => t.languageCode === LangCode.VI);
      fallback = lang !== LangCode.VI;
    }

    const officeName =
      entity.office?.translations?.find((t) => t.languageCode === lang)?.name ||
      entity.office?.translations?.[0]?.name ||
      undefined;

    const primaryArea = entity.practiceAreas?.find((pa) => pa.isPrimary);
    const primaryAreaName =
      primaryArea?.practiceArea?.translations?.find(
        (t) => t.languageCode === lang,
      )?.name ||
      primaryArea?.practiceArea?.translations?.[0]?.name ||
      undefined;

    return {
      id: entity.id,
      slug: translation?.slug || entity.id,
      fullName: translation?.fullName || '[Chưa có tên]',
      latinName: translation?.latinName ?? undefined,
      title: translation?.title ?? undefined,
      secondaryTitle: translation?.secondaryTitle ?? undefined,
      academicTitle: translation?.academicTitle ?? undefined,
      teamGroup: entity.teamGroup,
      avatarUrl: entity.avatarUrl ?? undefined,
      officeName,
      experienceYears: this.calculateExperienceYears(entity.practiceStartDate),
      isFeatured: entity.isFeatured,
      displayOrder: entity.displayOrder,
      primaryArea: primaryAreaName,
      languages: (entity.languages || []).map((l) => l.languageCode),
      fallback: fallback || undefined,
    };
  }

  toDetailPublicResponse(
    entity: Lawyer,
    lang: LangCode,
  ): LawyerDetailPublicDto {
    const base = this.toPublicResponse(entity, lang);
    const translations = entity.translations || [];
    const translation =
      translations.find((t) => t.languageCode === lang) ||
      translations.find((t) => t.languageCode === LangCode.VI);

    const credentials = (entity.credentials || []).map((c) => {
      const cTrans =
        c.translations?.find((t) => t.languageCode === lang) ||
        c.translations?.[0];
      return {
        id: c.id,
        kind: c.kind,
        yearStart: c.yearStart ?? undefined,
        yearEnd: c.yearEnd ?? undefined,
        title: cTrans?.title || '',
        institution: cTrans?.institution ?? undefined,
        description: cTrans?.description ?? undefined,
      };
    });

    const practiceAreas = (entity.practiceAreas || []).map((pa) => {
      const paTrans =
        pa.practiceArea?.translations?.find((t) => t.languageCode === lang) ||
        pa.practiceArea?.translations?.[0];
      return {
        id: pa.practiceAreaId,
        name: paTrans?.name || '',
        slug: paTrans?.slug || '',
        isPrimary: pa.isPrimary,
      };
    });

    return {
      ...base,
      bio: translation?.bio ?? undefined,
      barAssociation: entity.barAssociation ?? undefined,
      email: entity.email ?? undefined,
      mobilePhone: entity.mobilePhone ?? undefined,
      officePhone: entity.officePhone ?? undefined,
      wechatId: entity.wechatId ?? undefined,
      wechatQrUrl: entity.wechatQrUrl ?? undefined,
      metaTitle: translation?.metaTitle ?? undefined,
      metaDescription: translation?.metaDescription ?? undefined,
      credentials,
      practiceAreas,
    };
  }
}
