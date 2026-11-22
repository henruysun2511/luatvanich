export const DEFAULT_USERS_LIMIT = 10;

export const USER_STATUS_OPTIONS = [
  { label: "Tất cả trạng thái", value: "ALL" },
  { label: "Đang hoạt động", value: "true" },
  { label: "Đã khóa", value: "false" },
] as const;

export const USER_SORT_OPTIONS = [
  { label: "Mới nhất", sortBy: "createdAt", sortOrder: "DESC" },
  { label: "Cũ nhất", sortBy: "createdAt", sortOrder: "ASC" },
  { label: "Họ và tên (A - Z)", sortBy: "fullName", sortOrder: "ASC" },
  { label: "Họ và tên (Z - A)", sortBy: "fullName", sortOrder: "DESC" },
  { label: "Đăng nhập gần nhất", sortBy: "lastLoginAt", sortOrder: "DESC" },
] as const;
