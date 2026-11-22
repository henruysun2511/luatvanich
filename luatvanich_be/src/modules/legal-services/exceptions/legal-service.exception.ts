import { HttpStatus } from '@nestjs/common';
import { AppError } from '../../../common/errors/app.error';
import { LEGAL_SERVICE_ERROR_CODE } from '../legal-services.constant';

export class LegalServiceNotFoundException extends AppError {
  constructor(identifier: string) {
    super({
      code: LEGAL_SERVICE_ERROR_CODE.NOT_FOUND,
      message: `Không tìm thấy dịch vụ pháp lý: "${identifier}"`,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}

export class LegalServiceSlugConflictException extends AppError {
  constructor(slug: string) {
    super({
      code: LEGAL_SERVICE_ERROR_CODE.SLUG_CONFLICT,
      message: `Đường dẫn tĩnh (slug) "${slug}" đã được sử dụng. Vui lòng chọn slug khác.`,
      statusCode: HttpStatus.CONFLICT,
    });
  }
}

export class CannotDeletePublishedServiceException extends AppError {
  constructor() {
    super({
      code: LEGAL_SERVICE_ERROR_CODE.CANNOT_DELETE_PUBLISHED,
      message: 'Không thể xóa dịch vụ đang công khai (published). Vui lòng lưu trữ (archive) trước khi xóa.',
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    });
  }
}
