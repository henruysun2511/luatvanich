import { apiClient } from "@/lib/axios";
import type { LoginInput } from "../schemas/auth.schema";
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
};
