"use client";

import React, { useEffect, type ReactNode } from "react";
import { useRedirectAfterLogin } from "../hooks/useRedirectAfterLogin";
import { useMe } from "../queries/useAuthQuery";
import { useAuthStore } from "../store/useAuthStore";
import { PageLoader } from "@/components/common";

/**
 * Dành cho trang /admin/login:
 * Nếu đã đăng nhập thì tự động chuyển hướng vào Dashboard.
 */
export function GuestOnly({ children }: { children: ReactNode }) {
  const status = useAuthStore((s) => s.status);
  const { data: user } = useMe();
  const redirectAfterLogin = useRedirectAfterLogin();

  useEffect(() => {
    if (status === "authenticated" && user) {
      redirectAfterLogin();
    }
  }, [status, user, redirectAfterLogin]);

  if (status === "loading" || status === "authenticated") {
    return <PageLoader message="Đang kiểm tra phiên làm việc..." />;
  }

  return <>{children}</>;
}
