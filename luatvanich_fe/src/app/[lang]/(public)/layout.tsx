import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SideRail } from "@/components/layout/SideRail";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { SideRailProvider } from "@/components/layout/SideRailContext";
import { PublicContentWrapper } from "@/components/layout/PublicContentWrapper";

export default function PublicWebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SideRailProvider>
      <div className="flex flex-col min-h-screen bg-white">
        {/* 1. Thanh Rail Cố định bên trái - Hỗ trợ toggle ẩn/hiện */}
        <SideRail />

        {/* 2. Toàn bộ nội dung trang (Header, Main, Footer) thích ứng với trạng thái Rail */}
        <PublicContentWrapper>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </PublicContentWrapper>

        {/* 3. Nút nổi hỗ trợ (chỉ hiện trên Mobile khi thanh Rail bị ẩn) */}
        <div className="lg:hidden">
          <FloatingContact />
        </div>
      </div>
    </SideRailProvider>
  );
}
