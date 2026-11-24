import { HttpStatus } from '@nestjs/common';
import { AppError } from '../../../common/errors/app.error';
import { FAQS_ERROR_CODE } from '../constants/faqs.constant';

export class FaqNotFoundException extends AppError {
  constructor(id: string) {
    super({
      code: FAQS_ERROR_CODE.NOT_FOUND,
      message: `Không tìm thấy câu hỏi FAQ: ${id}`,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
