import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';

/**
 * @RequirePermission('services:write') — Yêu cầu user có quyền tương ứng.
 * PermissionsGuard kiểm tra metadata này.
 * Format: '<resource>:<action>' (vd: services:read, services:write, services:delete, services:publish)
 */
export const RequirePermission = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
