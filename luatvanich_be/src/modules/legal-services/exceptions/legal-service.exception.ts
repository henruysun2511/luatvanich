import { BadRequestException, NotFoundException } from '@nestjs/common';
import { LEGAL_SERVICE_ERROR_CODE } from '../legal-services.constant';

export class LegalServiceNotFoundException extends NotFoundException {
  constructor(idOrSlug?: string) {
    super({
      code: LEGAL_SERVICE_ERROR_CODE.NOT_FOUND,
      message: idOrSlug
        ? `Dịch vụ pháp lý '${idOrSlug}' không tồn tại`
        : 'Dịch vụ pháp lý không tồn tại',
    });
  }
}

export class LegalServiceSlugConflictException extends BadRequestException {
  constructor(slug: string) {
    super({
      code: LEGAL_SERVICE_ERROR_CODE.SLUG_CONFLICT,
      message: `Slug '${slug}' đã tồn tại, vui lòng dùng slug khác`,
    });
  }
}

export class LegalServiceTranslationNotFoundException extends NotFoundException {
  constructor(id: string, lang: string) {
    super({
      code: LEGAL_SERVICE_ERROR_CODE.TRANSLATION_NOT_FOUND,
      message: `Bản dịch '${lang}' của dịch vụ '${id}' không tồn tại`,
    });
  }
}
