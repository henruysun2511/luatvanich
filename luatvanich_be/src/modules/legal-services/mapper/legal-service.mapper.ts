import { Injectable } from '@nestjs/common';
import { LegalService } from '../entities/legal-service.entity';
import { LegalServiceTranslation } from '../entities/legal-service-translation.entity';
import { LegalServiceAdminDto, TranslationSummaryDto } from '../dto/response/legal-service-admin.dto';
import { LegalServicePublicDto } from '../dto/response/legal-service-public.dto';
import { LangCode } from '../../../common/enums/lang.enum';

@Injectable()
export class LegalServiceMapper {
  /**
   * Chuyển entity → response cho Admin (đầy đủ, tất cả ngôn ngữ)
   */
  toAdminResponse(entity: LegalService): LegalServiceAdminDto {
    return {
      id: entity.id,
      practiceAreaId: entity.practiceAreaId,
      status: entity.status,
      displayOrder: entity.displayOrder,
      isFeatured: entity.isFeatured,
      coverImageUrl: entity.coverImageUrl,
      translations: (entity.translations || []).map((t): TranslationSummaryDto => ({
        languageCode: t.languageCode,
        title: t.title,
        slug: t.slug,
        isComplete: t.isComplete,
      })),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  /**
   * Chuyển entity → response cho Public, chọn đúng ngôn ngữ.
   * Fallback về 'vi' nếu ngôn ngữ yêu cầu không có hoặc chưa hoàn thiện.
   */
  toPublicResponse(entity: LegalService, lang: LangCode): LegalServicePublicDto {
    const translations = entity.translations || [];
    let translation = translations.find((t) => t.languageCode === lang && t.isComplete);
    let fallback = false;

    if (!translation) {
      // Fallback về tiếng Việt
      translation = translations.find((t) => t.languageCode === LangCode.VI);
      fallback = lang !== LangCode.VI;
    }

    if (!translation) {
      // Không có bản dịch nào cả — trả dữ liệu tối thiểu
      return {
        id: entity.id,
        title: '[Chưa có nội dung]',
        slug: entity.id,
        isFeatured: entity.isFeatured,
        displayOrder: entity.displayOrder,
        coverImageUrl: entity.coverImageUrl,
        fallback: true,
      };
    }

    return {
      id: entity.id,
      title: translation.title,
      slug: translation.slug,
      excerpt: translation.excerpt,
      contentHtml: translation.contentHtml,
      metaTitle: translation.metaTitle,
      metaDescription: translation.metaDescription,
      coverImageUrl: entity.coverImageUrl,
      isFeatured: entity.isFeatured,
      displayOrder: entity.displayOrder,
      fallback: fallback || undefined,
    };
  }

  toPublicResponseList(entities: LegalService[], lang: LangCode): LegalServicePublicDto[] {
    return entities.map((e) => this.toPublicResponse(e, lang));
  }
}
