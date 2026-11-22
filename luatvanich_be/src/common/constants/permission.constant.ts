/**
 * Danh mục toàn bộ quyền hạn (Permissions) trong hệ thống Luật Vạn Ích.
 * Định dạng: resource:action
 */
export const PERMISSIONS = {
  WILDCARD: '*',

  // Users
  USERS_READ: 'users:read',
  USERS_WRITE: 'users:write',
  USERS_DELETE: 'users:delete',

  // Roles
  ROLES_READ: 'roles:read',
  ROLES_WRITE: 'roles:write',

  // Legal Services
  SERVICES_READ: 'services:read',
  SERVICES_WRITE: 'services:write',
  SERVICES_PUBLISH: 'services:publish',
  SERVICES_DELETE: 'services:delete',

  // Media
  MEDIA_READ: 'media:read',
  MEDIA_WRITE: 'media:write',
  MEDIA_DELETE: 'media:delete',

  // Pages (Puck Builder)
  PAGES_READ: 'pages:read',
  PAGES_WRITE: 'pages:write',
  PAGES_PUBLISH: 'pages:publish',
  PAGES_DELETE: 'pages:delete',

  // Posts / Knowledge Base
  POSTS_READ: 'posts:read',
  POSTS_WRITE: 'posts:write',
  POSTS_PUBLISH: 'posts:publish',
  POSTS_DELETE: 'posts:delete',

  // Consultations / Leads
  CONSULTATIONS_READ: 'consultations:read',
  CONSULTATIONS_WRITE: 'consultations:write',

  // Settings & Theme
  SETTINGS_READ: 'settings:read',
  SETTINGS_WRITE: 'settings:write',
  THEME_READ: 'theme:read',
  THEME_WRITE: 'theme:write',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
