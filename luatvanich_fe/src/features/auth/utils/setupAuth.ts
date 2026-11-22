import { configureAuth } from "@/lib/axios";
import { useAuthStore } from "../store/useAuthStore";
import { endSession } from "./endSession";
import { refreshSession } from "./refreshSession";

let configured = false;

/** Đăng ký handler vào lib/axios để tự động gắn token và xử lý 401 */
export function setupAuth() {
  if (configured) return;
  configured = true;
  configureAuth({
    getAccessToken: () => useAuthStore.getState().accessToken,
    refresh: refreshSession,
    onAuthFailure: () => endSession({ redirectBack: true }),
  });
}
