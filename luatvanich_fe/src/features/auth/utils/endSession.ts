import { getSharedQueryClient } from "@/lib/query-client";
import { LOGIN_PATH, isAuthPath } from "../constants/auth.constants";
import { useAuthStore } from "../store/useAuthStore";
import { broadcastAuth } from "./authChannel";
import { clearSessionCookie } from "./sessionCookie";

/** Xóa phiên cục bộ */
export function clearLocalSession({ redirectBack = false }: { redirectBack?: boolean } = {}) {
  useAuthStore.getState().clearSession();
  clearSessionCookie();
  getSharedQueryClient().clear();

  if (typeof window === "undefined") return;
  const { pathname, search } = window.location;
  if (isAuthPath(pathname)) return;

  const target = redirectBack
    ? `${LOGIN_PATH}?redirect=${encodeURIComponent(pathname + search)}`
    : LOGIN_PATH;
  window.location.assign(target);
}

/** Đăng xuất chủ động hoặc phiên hết hạn: xóa cục bộ + báo cho các tab khác */
export function endSession(options?: { redirectBack?: boolean }) {
  broadcastAuth("logout");
  clearLocalSession(options);
}
