"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DASHBOARD_PATH } from "../constants/auth.constants";

export function useRedirectAfterLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return useCallback(() => {
    const rawRedirect = searchParams.get("redirect");
    // Chỉ cho phép redirect đến internal route (bắt đầu bằng /admin)
    const target =
      rawRedirect && rawRedirect.startsWith("/admin") && rawRedirect !== "/admin/login"
        ? rawRedirect
        : DASHBOARD_PATH;

    router.replace(target);
  }, [router, searchParams]);
}
