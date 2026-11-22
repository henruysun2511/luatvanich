import { NotFoundException, ConflictException, UnprocessableEntityException } from '@nestjs/common';
import { LEGAL_SERVICE_ERROR_CODE } from '../constants/legal-services.constant';

export class LegalServiceNotFoundException extends NotFoundException {
  constructor(identifier: string) {
    super({
      code: LEGAL_SERVICE_ERROR_CODE.NOT_FOUND,
      message: `Không tìm thấy dịch vụ pháp lý: "${identifier}"`,
    });
  }
}

export class LegalServiceSlugConflictException extends ConflictException {
  constructor(slug: string) {
    super({
      code: LEGAL_SERVICE_ERROR_CODE.SLUG_CONFLICT,
      message: `Đường dẫn tĩnh (slug) "${slug}" đã được sử dụng. Vui lòng chọn slug khác.`,
    });
  }
}

export class CannotDeletePublishedServiceException extends UnprocessableEntityException {
  constructor() {
    super({
      code: LEGAL_SERVICE_ERROR_CODE.CANNOT_DELETE_PUBLISHED,
      message: 'Không thể xóa dịch vụ đang công khai (published). Vui lòng lưu trữ (archive) trước khi xóa.',
    });
  }
}
