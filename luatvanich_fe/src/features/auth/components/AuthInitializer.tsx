"use client";

import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { listenAuth } from "../utils/authChannel";
import { clearLocalSession } from "../utils/endSession";
import { initSession } from "../utils/refreshSession";
import { setupAuth } from "../utils/setupAuth";

/**
 * Khôi phục phiên khi mở app / F5: access token nằm trong RAM nên đã mất,
 * ta xin cái mới bằng refresh cookie (httpOnly). Đồng bộ đăng nhập/đăng xuất giữa các tab.
 */
export function AuthInitializer() {
  useEffect(() => {
    setupAuth();
    void initSession();

    return listenAuth((message) => {
      if (message === "logout") {
        clearLocalSession();
      } else if (useAuthStore.getState().status !== "authenticated") {
        void initSession();
      }
    });
  }, []);

  return null;
}
