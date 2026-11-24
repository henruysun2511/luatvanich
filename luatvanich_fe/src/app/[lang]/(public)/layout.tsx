import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SideRail } from "@/components/layout/SideRail";
import { FloatingContact } from "@/components/layout/FloatingContact";

export default function PublicWebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Thanh Rail Cố định bên trái - Hiện diện trên toàn bộ các trang */}
      <SideRail />

      {/* 2. Toàn bộ nội dung trang (Header, Main, Footer) luôn đẩy lề 84px trên desktop */}
      <div className="flex-1 flex flex-col lg:pl-[84px] transition-[padding] duration-200">
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
