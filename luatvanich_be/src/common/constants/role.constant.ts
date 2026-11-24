import { PERMISSIONS, Permission } from './permission.constant';

/**
 * Các vai trò (Roles) mặc định trong hệ thống Luật Vạn Ích.
 */
export const SYSTEM_ROLES = {
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
} as const;

export type SystemRole = (typeof SYSTEM_ROLES)[keyof typeof SYSTEM_ROLES];

export interface RoleDefinition {
  code: string;
  name: string;
  description: string;
  isSystem: boolean;
  permissions: Permission[] | string[];
}

/**
 * Định nghĩa mặc định phân bổ quyền cho từng vai trò hệ thống.
 * Dùng cho Seeder khởi tạo và kiểm tra quyền.
 */
export const DEFAULT_ROLE_DEFINITIONS: RoleDefinition[] = [
  {
    code: SYSTEM_ROLES.SUPERADMIN,
    name: 'Super Admin',
    description: 'Toàn quyền quản trị hệ thống, quản lý tài khoản và phân quyền cấp cao.',
    isSystem: true,
    permissions: [PERMISSIONS.WILDCARD],
  },
  {
    code: SYSTEM_ROLES.ADMIN,
    name: 'Quản trị viên',
    description: 'Quản lý toàn bộ nội dung dịch vụ, bài viết, media, cấu hình và tiếp nhận khách hàng.',
    isSystem: true,
    permissions: [
      PERMISSIONS.USERS_READ,
      PERMISSIONS.USERS_WRITE,
      PERMISSIONS.USERS_DELETE,
      PERMISSIONS.ROLES_READ,
      PERMISSIONS.ROLES_WRITE,
      PERMISSIONS.SERVICES_READ,
      PERMISSIONS.SERVICES_WRITE,
      PERMISSIONS.SERVICES_PUBLISH,
      PERMISSIONS.SERVICES_DELETE,
      PERMISSIONS.LAWYERS_READ,
      PERMISSIONS.LAWYERS_WRITE,
      PERMISSIONS.LAWYERS_PUBLISH,
      PERMISSIONS.LAWYERS_DELETE,
      PERMISSIONS.MEDIA_READ,
      PERMISSIONS.MEDIA_WRITE,
      PERMISSIONS.MEDIA_DELETE,
      PERMISSIONS.PAGES_READ,
      PERMISSIONS.PAGES_WRITE,
      PERMISSIONS.PAGES_PUBLISH,
      PERMISSIONS.PAGES_DELETE,
      PERMISSIONS.POSTS_READ,
      PERMISSIONS.POSTS_WRITE,
      PERMISSIONS.POSTS_MANAGE,
      PERMISSIONS.POSTS_PUBLISH,
      PERMISSIONS.POSTS_DELETE,
      PERMISSIONS.CONSULTATIONS_READ,
      PERMISSIONS.CONSULTATIONS_WRITE,
      PERMISSIONS.SETTINGS_READ,
      PERMISSIONS.SETTINGS_WRITE,
      PERMISSIONS.THEME_READ,
      PERMISSIONS.THEME_WRITE,
    ],
  },
  {
    code: SYSTEM_ROLES.EDITOR,
    name: 'Biên tập viên',
    description: 'Soạn thảo, quản lý bài viết, dịch vụ pháp lý và tải lên tệp tin.',
    isSystem: true,
    permissions: [
      PERMISSIONS.SERVICES_READ,
      PERMISSIONS.SERVICES_WRITE,
      PERMISSIONS.MEDIA_READ,
      PERMISSIONS.MEDIA_WRITE,
      PERMISSIONS.PAGES_READ,
      PERMISSIONS.PAGES_WRITE,
      PERMISSIONS.POSTS_READ,
      PERMISSIONS.POSTS_WRITE,
      PERMISSIONS.CONSULTATIONS_READ,
    ],
  },
  {
    code: SYSTEM_ROLES.VIEWER,
    name: 'Người xem',
    description: 'Chỉ có quyền đọc/xem dữ liệu báo cáo, dịch vụ và danh sách tư vấn.',
    isSystem: true,
    permissions: [
      PERMISSIONS.SERVICES_READ,
      PERMISSIONS.PAGES_READ,
      PERMISSIONS.POSTS_READ,
      PERMISSIONS.CONSULTATIONS_READ,
    ],
  },
];
