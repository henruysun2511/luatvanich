import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../../../common/decorators/require-permission.decorator';
import { IS_PUBLIC_KEY } from '../../../common/decorators/public.decorator';

/**
 * PermissionsGuard — Kiểm tra user có quyền tương ứng không.
 * Yêu cầu user đã qua JwtAuthGuard trước.
 * Role 'superadmin' tự động có mọi quyền.
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions || requiredPermissions.length === 0) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;

    // Superadmin có tất cả quyền
    if (user.role === 'superadmin') return true;

    return requiredPermissions.every((p) => user.permissions?.includes(p));
  }
}
