"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, Globe, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const legalServicesMenu = [
  { title: "Tư vấn Đầu tư FDI (Việt - Trung)", href: "/services/tu-van-dau-tu-fdi" },
  { title: "Thành lập Doanh nghiệp có vốn nước ngoài", href: "/services/thanh-lap-doanh-nghiep-fdi" },
  { title: "Tư vấn Thuế & Kế toán Doanh nghiệp", href: "/services/tu-van-thue-ke-toan" },
  { title: "Hợp đồng & Giao dịch Thương mại", href: "/services/hop-dong-thuong-mai" },
  { title: "Lao động & Thẻ tạm trú cho Chuyên gia", href: "/services/lao-dong-the-tam-tru" },
  { title: "Giấy phép con & Điều kiện kinh doanh", href: "/services/giay-phep-con" },
  { title: "Sở hữu trí tuệ & Nhãn hiệu", href: "/services/so-huu-tri-tue" },
  { title: "Mua bán & Sáp nhập Doanh nghiệp (M&A)", href: "/services/mua-ban-sap-nhap-ma" },
  { title: "Giải quyết Tranh chấp & Tố tụng", href: "/services/giai-quyet-tranh-chap" },
  { title: "Dịch thuật Công chứng Pháp lý Việt - Trung", href: "/services/dich-thuat-cong-chung" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      {/* Thanh thông tin phụ trên cùng */}
      <div className="bg-primary text-primary-foreground text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 opacity-90">
              <Phone className="size-3 text-accent" /> Hotline: <strong>0988.xxx.xxx</strong> (Hỗ trợ 24/7)
            </span>
            <span className="flex items-center gap-1.5 opacity-90">
              <Mail className="size-3 text-accent" /> Email: contact@luatvanich.vn
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-accent font-medium">Văn phòng: Hà Nội | TP. Hồ Chí Minh</span>
            <div className="flex items-center gap-1 border-l border-white/20 pl-3">
              <Globe className="size-3 text-accent" />
              <Link href="/vi" className="font-bold hover:underline">VI</Link>
              <span className="opacity-50">/</span>
              <Link href="/zh-CN" className="opacity-80 hover:underline">中文</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Thanh điều hướng chính */}
      <div className="bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo thương hiệu */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="size-9 rounded bg-primary text-accent font-serif font-bold text-lg flex items-center justify-center border border-accent/40 shadow-sm">
              VI
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg text-primary leading-tight tracking-tight">
                LUẬT VẠN ÍCH
              </span>
              <span className="text-[10px] text-muted-foreground tracking-wider uppercase">
                万益律师事务所 • Law Firm
              </span>
            </div>
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-foreground hover:text-accent transition-colors">
              Trang chủ
            </Link>
            <Link href="/about" className="text-foreground hover:text-accent transition-colors">
              Giới thiệu
            </Link>

            {/* Mega Menu Dịch vụ */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-foreground hover:text-accent py-2 transition-colors">
                Dịch vụ pháp lý <ChevronDown className="size-3.5 opacity-70" />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full -left-20 w-[580px] bg-card border border-border shadow-xl rounded-md p-4 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2">
                  {legalServicesMenu.map((svc) => (
                    <Link
                      key={svc.href}
                      href={svc.href}
                      className="p-2 rounded hover:bg-muted text-xs text-foreground font-medium transition-colors"
                    >
                      {svc.title}
                    </Link>
                  ))}
                  <div className="col-span-2 pt-2 border-t mt-1 text-right">
                    <Link href="/services" className="text-xs text-accent font-bold hover:underline">
                      Xem toàn bộ 12 chuyên khoa dịch vụ →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/lawyers" className="text-foreground hover:text-accent transition-colors">
              Đội ngũ luật sư
            </Link>
            <Link href="/blog" className="text-foreground hover:text-accent transition-colors">
              Cẩm nang pháp lý
            </Link>
            <Link href="/contact" className="text-foreground hover:text-accent transition-colors">
              Liên hệ
            </Link>
          </nav>

          {/* Nút Đặt lịch & Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <Button variant="accent" size="sm" asChild className="hidden sm:inline-flex">
              <Link href="/contact#booking">Đặt lịch tư vấn</Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b bg-card px-4 py-4 space-y-3">
          <Link href="/" className="block py-1.5 font-medium" onClick={() => setMobileMenuOpen(false)}>
            Trang chủ
          </Link>
          <Link href="/about" className="block py-1.5 font-medium" onClick={() => setMobileMenuOpen(false)}>
            Giới thiệu
          </Link>
          <Link href="/services" className="block py-1.5 font-medium" onClick={() => setMobileMenuOpen(false)}>
            Dịch vụ pháp lý
          </Link>
          <Link href="/lawyers" className="block py-1.5 font-medium" onClick={() => setMobileMenuOpen(false)}>
            Đội ngũ luật sư
          </Link>
          <Link href="/blog" className="block py-1.5 font-medium" onClick={() => setMobileMenuOpen(false)}>
            Cẩm nang pháp luật
          </Link>
          <Link href="/contact" className="block py-1.5 font-medium" onClick={() => setMobileMenuOpen(false)}>
            Liên hệ
          </Link>
          <div className="pt-2 border-t flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Ngôn ngữ:</span>
            <div className="flex gap-2 text-xs font-bold">
              <Link href="/vi" className="text-primary underline">Tiếng Việt</Link>
              <span>|</span>
              <Link href="/zh-CN" className="text-muted-foreground">中文 (Tiếng Trung)</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
