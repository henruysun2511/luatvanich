import { apiClient } from "@/lib/axios";
import type {
  LoginInput,
  UpdateProfileInput,
  ChangePasswordInput,
} from "../schemas/auth.schema";
import type { AdminUser, AuthResponse } from "../types/auth.types";

const AUTH_BASE_URL = "/admin/auth";
const NO_REFRESH = { skipAuthRefresh: true } as const;

export const authService = {
  login: async (input: LoginInput): Promise<AuthResponse> => {
    const res = await apiClient.post<{ data: AuthResponse }>(
      `${AUTH_BASE_URL}/login`,
      input,
      NO_REFRESH,
    );
    return res.data.data;
  },

  /** Refresh token nằm trong httpOnly cookie, trình duyệt tự gửi kèm */
  refresh: async (): Promise<AuthResponse> => {
    const res = await apiClient.post<{ data: AuthResponse }>(
      `${AUTH_BASE_URL}/refresh`,
      undefined,
      NO_REFRESH,
    );
    return res.data.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post(`${AUTH_BASE_URL}/logout`, undefined, NO_REFRESH);
  },

  me: async (cancelSignal?: AbortSignal): Promise<AdminUser> => {
    const res = await apiClient.get<{ data: AdminUser }>(`${AUTH_BASE_URL}/me`, {
      signal: cancelSignal,
    });
    return res.data.data;
  },

  /** Cập nhật thông tin cá nhân của tài khoản hiện tại */
  updateProfile: async (input: UpdateProfileInput): Promise<AdminUser> => {
    const res = await apiClient.patch<{ data: AdminUser }>(
      `${AUTH_BASE_URL}/profile`,
      input,
    );
    return res.data.data;
  },

  /** Đổi mật khẩu tài khoản hiện tại */
  changePassword: async (
    input: Pick<ChangePasswordInput, "currentPassword" | "newPassword">,
  ): Promise<void> => {
    await apiClient.post(
      `${AUTH_BASE_URL}/change-password`,
      {
        currentPassword: input.currentPassword,
        newPassword: input.newPassword,
      },
      NO_REFRESH,
    );
  },
};
