import { SetMetadata } from '@nestjs/common';
import { Permission } from '../constants/permission.constant';

export const PERMISSIONS_KEY = 'permissions';

/**
 * @RequirePermission(PERMISSIONS.SERVICES_WRITE) — Yêu cầu user có quyền tương ứng.
 * PermissionsGuard kiểm tra metadata này.
 */
export const RequirePermission = (...permissions: (Permission | string)[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
