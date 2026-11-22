"use client";

import React, { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LOGIN_PATH } from "../constants/auth.constants";
import { useMe } from "../queries/useAuthQuery";
import { useAuthStore } from "../store/useAuthStore";
import { initSession } from "../utils/refreshSession";
import { FullPageLoader } from "./FullPageLoader";
import { SessionError } from "./SessionError";

/**
 * AuthGuard: Chỉ render children khi đã xác thực xong.
 * Nhờ đó không có query nào chạy khi chưa có token và không bị đá về /login
 * trong lúc đang khôi phục phiên ngầm (status = loading).
 */
export function AuthGuard({ children }: { children: ReactNode }) {
  const status = useAuthStore((s) => s.status);
  const { data: user, isError, refetch } = useMe();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      const back = encodeURIComponent(pathname + (typeof window !== "undefined" ? window.location.search : ""));
      router.replace(`${LOGIN_PATH}?redirect=${back}`);
    }
  }, [status, pathname, router]);

  if (status === "error") {
    return <SessionError onRetry={() => void initSession()} />;
  }

  if (status === "authenticated" && !user && isError) {
    return <SessionError onRetry={() => void refetch()} />;
  }

  if (status !== "authenticated" || !user) {
    return <FullPageLoader />;
  }

  return <>{children}</>;
}
