"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { SideRail } from "@/components/layout/SideRail";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { cn } from "@/lib/utils";

interface PublicLayoutShellProps {
  children: React.ReactNode;
}

export function PublicLayoutShell({ children }: PublicLayoutShellProps) {
  const pathname = usePathname();

  // Kiểm tra trang có hiển thị SideRail hay không:
  // - Trang chủ: /vi, /zh-CN, /
  // - Trang Về Vạn Ích: /vi/about, /zh-CN/about
  // - Trang Hành lang: /vi/corridor, /zh-CN/corridor
  const cleanPath = (pathname || "").replace(/\/+$/, "");
  const segments = cleanPath.split("/").filter(Boolean);

  // segments[0] là mã ngôn ngữ (ví dụ: 'vi', 'zh-CN')
  // Nếu segments.length <= 1 => là trang chủ (/ hoặc /vi hoặc /zh-CN)
  const isHome = segments.length <= 1;
  const pageRoute = segments[1] || "";
  const hasSideRail = isHome || pageRoute === "about" || pageRoute === "corridor";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Thanh Rail Cố định bên trái (chỉ hiện ở Trang chủ, About, Corridor) */}
      {hasSideRail && <SideRail />}

      {/* 2. Toàn bộ nội dung trang: đẩy lề 84px nếu có SideRail, ngược lại là lg:pl-0 */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-[padding] duration-200",
          hasSideRail ? "lg:pl-[84px]" : "lg:pl-0",
        )}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>

      {/* 3. Nút nổi hỗ trợ (chỉ hiện trên Mobile khi thanh Rail bị ẩn) */}
      <div className="lg:hidden">
        <FloatingContact />
      </div>
    </div>
  );
}
