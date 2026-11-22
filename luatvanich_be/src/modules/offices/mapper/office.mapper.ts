import { Injectable } from '@nestjs/common';
import { Office } from '../entities/office.entity';
import { OfficeAdminDto, OfficeTranslationDetailDto } from '../dto/response/office-admin.dto';
import { OfficePublicDto } from '../dto/response/office-public.dto';
import { LangCode } from '../../../common/enums/lang.enum';

@Injectable()
export class OfficeMapper {
  /**
   * Chuyển entity → response cho Admin (đầy đủ tất cả ngôn ngữ)
   */
  toAdminResponse(entity: Office): OfficeAdminDto {
    return {
      id: entity.id,
      code: entity.code,
      phone: entity.phone,
      fax: entity.fax,
      email: entity.email,
      wechatId: entity.wechatId,
      wechatQrUrl: entity.wechatQrUrl,
      imageUrl: entity.imageUrl,
      latitude: entity.latitude ? Number(entity.latitude) : undefined,
      longitude: entity.longitude ? Number(entity.longitude) : undefined,
      mapEmbedUrl: entity.mapEmbedUrl,
      isHeadquarters: entity.isHeadquarters,
      displayOrder: entity.displayOrder,
      status: entity.status,
      translations: (entity.translations || []).map((t): OfficeTranslationDetailDto => ({
        languageCode: t.languageCode,
        name: t.name,
        address: t.address,
        workingHours: t.workingHours,
        description: t.description,
        isComplete: t.isComplete,
        updatedAt: t.updatedAt,
      })),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  /**
   * Chuyển entity → response cho Public theo ngôn ngữ yêu cầu.
   * Fallback về tiếng Việt nếu ngôn ngữ yêu cầu chưa hoàn thiện.
   */
  toPublicResponse(entity: Office, lang: LangCode): OfficePublicDto {
    const translations = entity.translations || [];
    let translation = translations.find((t) => t.languageCode === lang && t.isComplete);
    let fallback = false;

    if (!translation) {
      // Thử tìm bản dịch bất kỳ của ngôn ngữ yêu cầu
      translation = translations.find((t) => t.languageCode === lang);
    }

    if (!translation) {
      // Fallback về tiếng Việt
      translation = translations.find((t) => t.languageCode === LangCode.VI);
      fallback = lang !== LangCode.VI;
    }

    if (!translation) {
      // Fallback về bản dịch đầu tiên có được
      translation = translations[0];
      fallback = true;
    }

    return {
      id: entity.id,
      code: entity.code,
      name: translation ? translation.name : entity.code,
      address: translation ? translation.address : '',
      workingHours: translation?.workingHours,
      description: translation?.description,
      phone: entity.phone,
      fax: entity.fax,
      email: entity.email,
      wechatId: entity.wechatId,
      wechatQrUrl: entity.wechatQrUrl,
      imageUrl: entity.imageUrl,
      latitude: entity.latitude ? Number(entity.latitude) : undefined,
      longitude: entity.longitude ? Number(entity.longitude) : undefined,
      mapEmbedUrl: entity.mapEmbedUrl,
      isHeadquarters: entity.isHeadquarters,
      displayOrder: entity.displayOrder,
      fallback,
    };
  }
}
