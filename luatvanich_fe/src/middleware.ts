import { NextResponse, type NextRequest } from "next/server";
import {
  LOGIN_PATH,
  DASHBOARD_PATH,
  SESSION_INDICATOR_COOKIE,
  isAuthPath,
} from "@/features/auth/constants/auth.constants";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasSession = request.cookies.has(SESSION_INDICATOR_COOKIE);

  // Nếu người dùng ĐÃ có session cookie mà cố truy cập /admin/login:
  // Tự động chuyển hướng ngay vào Dashboard (/admin)
  if (isAuthPath(pathname)) {
    if (hasSession) {
      const redirectUrl = new URL(DASHBOARD_PATH, request.url);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  // Bảo vệ toàn bộ khu vực /admin/*
  if (pathname.startsWith("/admin")) {
    if (!hasSession) {
      const redirectUrl = new URL(LOGIN_PATH, request.url);
      redirectUrl.searchParams.set("redirect", pathname + search);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Chỉ áp dụng middleware cho các route bắt đầu bằng /admin
  matcher: ["/admin/:path*"],
};
