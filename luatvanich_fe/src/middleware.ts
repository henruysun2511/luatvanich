import { NextResponse, type NextRequest } from "next/server";
import {
  LOGIN_PATH,
  SESSION_INDICATOR_COOKIE,
  isAuthPath,
} from "@/features/auth/constants/auth.constants";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Cho phép truy cập trang đăng nhập
  if (isAuthPath(pathname)) {
    return NextResponse.next();
  }

  // Bảo vệ toàn bộ khu vực /admin/*
  if (pathname.startsWith("/admin")) {
    const hasSession = request.cookies.has(SESSION_INDICATOR_COOKIE);

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
