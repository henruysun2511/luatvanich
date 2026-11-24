import { apiClient } from "@/lib/axios";
import type {
  LoginInput,
  UpdateProfileInput,
  ChangePasswordInput,
} from "../schemas/auth.schema";
import type { AdminUser, AuthResponse } from "../types/auth.types";
import {
  getStoredRefreshToken,
  setStoredRefreshToken,
  clearStoredRefreshToken,
} from "../utils/refreshTokenStorage";

const AUTH_BASE_URL = "/admin/auth";
const NO_REFRESH = { skipAuthRefresh: true } as const;

export const authService = {
  login: async (input: LoginInput): Promise<AuthResponse> => {
    const res = await apiClient.post<{ data: AuthResponse }>(
      `${AUTH_BASE_URL}/login`,
      input,
      NO_REFRESH,
    );
    const data = res.data.data;
    if (data?.refreshToken) {
      setStoredRefreshToken(data.refreshToken);
    }
    return data;
  },

  /** 
   * Refresh access token: Ưu tiên httpOnly cookie, 
   * đồng thời gửi kèm token fallback trong body & header nếu cookie bị chặn cross-port 
   */
  refresh: async (): Promise<AuthResponse> => {
    const fallbackToken = getStoredRefreshToken();
    const headers = fallbackToken ? { "x-refresh-token": fallbackToken } : undefined;
    const res = await apiClient.post<{ data: AuthResponse }>(
      `${AUTH_BASE_URL}/refresh`,
      fallbackToken ? { refreshToken: fallbackToken } : undefined,
      {
        ...NO_REFRESH,
        headers,
      },
    );
    const data = res.data.data;
    if (data?.refreshToken) {
      setStoredRefreshToken(data.refreshToken);
    }
    return data;
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post(`${AUTH_BASE_URL}/logout`, undefined, NO_REFRESH);
    } finally {
      clearStoredRefreshToken();
    }
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
