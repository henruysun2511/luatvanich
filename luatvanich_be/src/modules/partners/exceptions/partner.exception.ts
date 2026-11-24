import { HttpStatus } from '@nestjs/common';
import { AppError } from '../../../common/errors/app.error';
import { PARTNERS_ERROR_CODE } from '../constants/partners.constant';

export class PartnerNotFoundException extends AppError {
  constructor(id: string) {
    super({
      code: PARTNERS_ERROR_CODE.NOT_FOUND,
      message: `Không tìm thấy đối tác: ${id}`,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
