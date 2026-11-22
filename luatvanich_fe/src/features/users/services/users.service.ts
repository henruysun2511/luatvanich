import { apiClient } from "@/lib/axios";
import type {
  PaginatedUsersResponse,
  UserItem,
  UserQueryParams,
} from "../types/users.types";
import type {
  CreateUserInput,
  AdminResetPasswordInput,
} from "../schemas/users.schema";

const USERS_BASE_URL = "/admin/users";

export const usersService = {
  /** Lấy danh sách người dùng có phân trang & lọc */
  getUsers: async (params?: UserQueryParams): Promise<PaginatedUsersResponse> => {
    const res = await apiClient.get<{ data: PaginatedUsersResponse }>(USERS_BASE_URL, {
      params,
    });
    return res.data.data;
  },

  /** Tạo tài khoản người dùng mới */
  createUser: async (input: CreateUserInput): Promise<UserItem> => {
    const res = await apiClient.post<{ data: UserItem }>(USERS_BASE_URL, input);
    return res.data.data;
  },

  /** Xóa tài khoản người dùng */
  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`${USERS_BASE_URL}/${id}`);
  },

  /** Khóa / Mở khóa tài khoản người dùng */
  updateStatus: async (id: string, isActive: boolean): Promise<UserItem> => {
    const res = await apiClient.patch<{ data: UserItem }>(`${USERS_BASE_URL}/${id}/status`, {
      isActive,
    });
    return res.data.data;
  },

  /** Quản trị viên đặt lại mật khẩu cho người dùng */
  resetPassword: async (id: string, input: AdminResetPasswordInput): Promise<void> => {
    await apiClient.patch(`${USERS_BASE_URL}/${id}/password`, input);
  },
};
