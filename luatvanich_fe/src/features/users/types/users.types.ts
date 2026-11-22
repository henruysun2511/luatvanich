export interface UserItem {
  id: string;
  email: string;
  username: string;
  fullName: string;
  role: string;
  roleName?: string;
  isActive: boolean;
  phoneNumber?: string;
  avatarUrl?: string;
  lastLoginAt?: string;
  createdAt: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedUsersResponse {
  items: UserItem[];
  pagination: PaginationMeta;
}

export interface UserQueryParams {
  q?: string;
  role?: string;
  isActive?: boolean;
  sortBy?: "createdAt" | "fullName" | "username" | "email" | "lastLoginAt";
  sortOrder?: "ASC" | "DESC";
  page?: number;
  limit?: number;
}
