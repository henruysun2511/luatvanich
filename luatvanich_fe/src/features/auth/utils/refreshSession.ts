import { LawFirmApiError } from "@/lib/axios";
import { getSharedQueryClient } from "@/lib/query-client";
import { authKeys } from "../queries/auth.keys";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../store/useAuthStore";
import type { AuthResponse } from "../types/auth.types";
import { clearSessionCookie, setSessionCookie } from "./sessionCookie";

/** Kiểm tra xem lỗi có phải do hết phiên (401/403) */
export const isAuthFailure = (error: unknown) =>
  error instanceof LawFirmApiError && (error.statusCode === 401 || error.statusCode === 403);

/** Ghi nhận phiên mới: token vào store, user vào cache của Query, set cookie cho middleware */
export function applySession({ accessToken, user }: AuthResponse) {
  useAuthStore.getState().setSession(accessToken);
  setSessionCookie();
  if (user) {
    getSharedQueryClient().setQueryData(authKeys.me, user);
  }
}

let inflightRefresh: Promise<string> | null = null;

/**
 * Single-flight: mọi nơi gọi cùng lúc (AuthInitializer, interceptor 401)
 * dùng chung MỘT request refresh, tránh gọi lặp lại.
 */
export function refreshSession(): Promise<string> {
  if (!inflightRefresh) {
    inflightRefresh = authService
      .refresh()
      .then((data) => {
        if (!data?.accessToken) {
          throw new LawFirmApiError("Không tìm thấy phiên làm việc hợp lệ.", 401);
        }
        applySession(data);
        return data.accessToken;
      })
      .catch((error) => {
        if (isAuthFailure(error)) {
          useAuthStore.getState().clearSession();
          clearSessionCookie();
        }
        throw error;
      })
      .finally(() => {
        inflightRefresh = null;
      });
  }
  return inflightRefresh;
}

/** Khôi phục phiên khi mở app / F5 / bấm "Thử lại" */
export function initSession() {
  useAuthStore.getState().setStatus("loading");
  return refreshSession().catch((error) => {
    if (!isAuthFailure(error)) {
      useAuthStore.getState().setStatus("error");
    }
  });
}
