import { HttpStatus } from '@nestjs/common';
import { AppError } from '../../../common/errors/app.error';
import { PRACTICE_AREA_ERROR_CODE } from '../practice-areas.constant';

export class PracticeAreaNotFoundException extends AppError {
  constructor(idOrSlug: string) {
    super({
      code: PRACTICE_AREA_ERROR_CODE.NOT_FOUND,
      message: `Không tìm thấy lĩnh vực pháp lý: ${idOrSlug}`,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}

export class PracticeAreaSlugAlreadyExistsException extends AppError {
  constructor(slug: string) {
    super({
      code: PRACTICE_AREA_ERROR_CODE.SLUG_ALREADY_EXISTS,
      message: `Đường dẫn slug "${slug}" đã tồn tại trên hệ thống`,
      statusCode: HttpStatus.CONFLICT,
    });
  }
}

export class PracticeAreaHasServicesException extends AppError {
  constructor(count: number) {
    super({
      code: PRACTICE_AREA_ERROR_CODE.HAS_SERVICES,
      message: `Không thể xóa lĩnh vực này vì đang có ${count} dịch vụ pháp lý trực thuộc`,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}

export class PracticeAreaHasLawyersException extends AppError {
  constructor() {
    super({
      code: PRACTICE_AREA_ERROR_CODE.HAS_LAWYERS,
      message: 'Không thể xóa lĩnh vực này vì vẫn còn luật sư đang liên kết',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
