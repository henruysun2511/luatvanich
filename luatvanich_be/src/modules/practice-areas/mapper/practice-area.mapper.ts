import { Injectable } from '@nestjs/common';
import { DEFAULT_LANG, LangCode } from '../../../common/enums/lang.enum';
import { PracticeAreaAdminDto } from '../dto/response/practice-area-admin.dto';
import { PracticeAreaPublicDto } from '../dto/response/practice-area-public.dto';
import { PracticeAreaWithCount } from '../repositories/practice-area.repository';

@Injectable()
export class PracticeAreaMapper {
  toPublicDto(entity: PracticeAreaWithCount, lang: LangCode): PracticeAreaPublicDto {
    const localized = entity.translations?.find((translation) => translation.languageCode === lang)
      ?? entity.translations?.find((translation) => translation.languageCode === DEFAULT_LANG)
      ?? entity.translations?.[0];
    return {
      id: entity.id,
      slug: localized?.slug ?? '',
      name: localized?.name ?? '',
      iconUrl: entity.iconUrl ?? undefined,
      hanziBadge: entity.hanziBadge ?? undefined,
      description: localized?.description ?? undefined,
      scopePoints: localized?.scopePoints ?? [],
      estimatedTime: localized?.estimatedTime ?? undefined,
      feeStructure: localized?.feeStructure ?? undefined,
      isFeatured: entity.isFeatured,
      servicesCount: entity.servicesCount,
      metaTitle: localized?.metaTitle ?? undefined,
      metaDescription: localized?.metaDescription ?? undefined,
    };
  }

  toAdminDto(entity: PracticeAreaWithCount): PracticeAreaAdminDto {
    return {
      id: entity.id,
      iconUrl: entity.iconUrl ?? undefined,
      hanziBadge: entity.hanziBadge ?? undefined,
      displayOrder: entity.displayOrder,
      status: entity.status,
      isFeatured: entity.isFeatured,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      servicesCount: entity.servicesCount,
      translations: (entity.translations ?? []).map(({ languageCode, slug, name, description, scopePoints, estimatedTime, feeStructure, metaTitle, metaDescription, isComplete, updatedAt }) => ({
        languageCode, slug, name, description, scopePoints, estimatedTime, feeStructure, metaTitle, metaDescription, isComplete, updatedAt,
      })),
    };
  }
}
