"use client";

import React, { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LOGIN_PATH } from "../constants/auth.constants";
import { useMe } from "../queries/useAuthQuery";
import { useAuthStore } from "../store/useAuthStore";
import { initSession } from "../utils/refreshSession";
import { PageLoader } from "@/components/common";
import { SessionError } from "./SessionError";


export function AuthGuard({ children }: { children: ReactNode }) {
  const status = useAuthStore((s) => s.status);
  const { data: user, isError, isLoading, refetch } = useMe();
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

  if (status === "unauthenticated") {
    return <PageLoader message="Đang chuyển hướng đăng nhập..." />;
  }

  if (status === "authenticated" && !user && isError) {
    return <SessionError onRetry={() => void refetch()} />;
  }

  if (status === "loading" || (status === "authenticated" && isLoading && !user)) {
    return <PageLoader message="Đang xác thực hệ thống..." />;
  }

  return <>{children}</>;
}
