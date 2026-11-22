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

export class UsernameAlreadyExistsException extends AppError {
  constructor(username: string) {
    super({
      code: USER_ERROR_CODE.USERNAME_ALREADY_EXISTS,
      message: `Tên đăng nhập "${username}" đã tồn tại trong hệ thống`,
      statusCode: HttpStatus.CONFLICT,
    });
  }
}

export class RoleNotFoundException extends AppError {
  constructor(role: string) {
    super({
      code: USER_ERROR_CODE.ROLE_NOT_FOUND,
      message: `Không tìm thấy vai trò "${role}" trong hệ thống`,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}

export class CannotDeleteSelfException extends AppError {
  constructor() {
    super({
      code: USER_ERROR_CODE.CANNOT_DELETE_SELF,
      message: 'Bạn không thể tự xóa tài khoản của chính mình',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}

export class CannotDeleteSuperAdminException extends AppError {
  constructor() {
    super({
      code: USER_ERROR_CODE.CANNOT_DELETE_SUPERADMIN,
      message: 'Không thể xóa tài khoản Super Admin duy nhất của hệ thống',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}

export class CannotDowngradeSuperAdminException extends AppError {
  constructor() {
    super({
      code: USER_ERROR_CODE.CANNOT_DOWNGRADE_SUPERADMIN,
      message: 'Không thể hạ quyền tài khoản Super Admin duy nhất của hệ thống',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}

export class CannotDeactivateSelfException extends AppError {
  constructor() {
    super({
      code: USER_ERROR_CODE.CANNOT_DEACTIVATE_SELF,
      message: 'Bạn không thể tự khóa tài khoản của chính mình',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}

export class CannotDeactivateSuperAdminException extends AppError {
  constructor() {
    super({
      code: USER_ERROR_CODE.CANNOT_DEACTIVATE_SUPERADMIN,
      message: 'Không thể khóa tài khoản Super Admin duy nhất của hệ thống',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}

export class InvalidCurrentPasswordException extends AppError {
  constructor() {
    super({
      code: USER_ERROR_CODE.INVALID_CURRENT_PASSWORD,
      message: 'Mật khẩu hiện tại không chính xác',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
