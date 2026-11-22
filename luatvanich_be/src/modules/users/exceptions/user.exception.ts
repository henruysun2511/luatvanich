import { HttpStatus } from '@nestjs/common';
import { AppError } from '../../../common/errors/app.error';
import { USER_ERROR_CODE } from '../users.constant';

export class UserNotFoundException extends AppError {
  constructor(identifier?: string) {
    super({
      code: USER_ERROR_CODE.NOT_FOUND,
      message: identifier ? `Không tìm thấy người dùng "${identifier}"` : 'Không tìm thấy người dùng',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}

export class UserAlreadyExistsException extends AppError {
  constructor(email: string) {
    super({
      code: USER_ERROR_CODE.ALREADY_EXISTS,
      message: `Email "${email}" đã tồn tại trong hệ thống`,
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
