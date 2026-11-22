import { HttpStatus } from '@nestjs/common';
import { AppError } from '../../../common/errors/app.error';
import { ROLE_ERROR_CODE } from '../roles.constant';

export class RoleNotFoundException extends AppError {
  constructor(role: string) {
    super({
      code: ROLE_ERROR_CODE.NOT_FOUND,
      message: `Không tìm thấy vai trò "${role}" trong hệ thống`,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}

export class CannotDowngradeSuperAdminException extends AppError {
  constructor() {
    super({
      code: ROLE_ERROR_CODE.CANNOT_DOWNGRADE_SUPERADMIN,
      message: 'Không thể hạ quyền tài khoản Super Admin duy nhất của hệ thống',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
