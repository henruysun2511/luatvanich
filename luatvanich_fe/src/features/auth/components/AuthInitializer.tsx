"use client";

import { useEffect, useRef } from "react";
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
  const initialized = useRef(false);

  useEffect(() => {
    setupAuth();

    // Chỉ initSession một lần khi mount và khi chưa authenticated
    if (!initialized.current) {
      initialized.current = true;
      if (useAuthStore.getState().status !== "authenticated") {
        void initSession();
      }
    }

    return listenAuth((message) => {
      if (message === "logout") {
        clearLocalSession();
      } else if (message === "login" && useAuthStore.getState().status !== "authenticated") {
        void initSession();
      }
    });
  }, []);

  return null;
}
