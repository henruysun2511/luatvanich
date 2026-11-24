"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, Globe, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SealStamp } from "@/components/ui/seal-stamp";

const legalServicesMenu = [
  { title: "Tư vấn Đầu tư FDI (Việt - Trung)", hz: "外商投资", href: "/services/tu-van-dau-tu-fdi" },
  { title: "Hợp đồng & Giao dịch Thương mại", hz: "双语合同", href: "/services/hop-dong-thuong-mai" },
  { title: "Tranh tụng & Trọng tài Thương mại", hz: "诉讼仲裁", href: "/services/giai-quyet-tranh-chap" },
  { title: "Thu hồi nợ xuyên biên giới", hz: "债务追收", href: "/services/thu-hoi-no" },
  { title: "Lao động & Thẻ tạm trú Chuyên gia", hz: "劳动用工", href: "/services/lao-dong-the-tam-tru" },
  { title: "Mua bán & Sáp nhập Doanh nghiệp (M&A)", hz: "并购重组", href: "/services/mua-ban-sap-nhap-ma" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs">
      {/* 1. Dải viền 3 màu đỉnh trang (Đỏ thẫm - Đỏ chu sa - Vàng kim) */}
      <div className="h-1 w-full bg-gradient-to-r from-[#7c1015] via-[#a3171e] via-60% to-[#c29a45]" />

      {/* 2. Thanh thông tin phụ trên cùng */}
      <div className="bg-[#0b1d3f] text-white text-xs py-1.5 px-4 hidden md:block border-b border-[#c29a45]/30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 opacity-90">
              <Phone className="size-3 text-[#f0d28a]" /> Hotline: <strong className="text-[#f0d28a]">0900.123.456</strong> (Hỗ trợ 24/7)
            </span>
            <span className="flex items-center gap-1.5 opacity-90">
              <Mail className="size-3 text-[#f0d28a]" /> Email: lienhe@vanichlaw.vn
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#f0d28a] font-medium text-[11px] tracking-wider uppercase">
              Văn phòng: Hà Nội &bull; TP.HCM &bull; Thượng Hải &bull; Quảng Châu
            </span>
            <div className="flex items-center gap-1 border-l border-white/20 pl-3">
              <Globe className="size-3 text-[#f0d28a]" />
              <Link href="/vi" className="font-bold hover:underline text-[#f0d28a]">VI</Link>
              <span className="opacity-50">/</span>
              <Link href="/zh-CN" className="opacity-80 hover:underline">中文</Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Thanh điều hướng chính */}
      <div className="bg-white/95 backdrop-blur-md border-b border-[#e7dcc3] px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo thương hiệu */}
          <Link href="/" className="flex items-center gap-3 group">
            <SealStamp char="万" size="md" variant="gold" className="group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl text-[#0b1d3f] leading-none tracking-wider">
                LUẬT VẠN ÍCH
              </span>
              <span className="text-[10px] text-[#c29a45] tracking-[4px] uppercase font-serif font-semibold mt-1">
                万益律师事务所 &bull; LAW FIRM
              </span>
            </div>
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-[#0b1d3f]">
            <Link href="/" className="hover:text-[#a3171e] transition-colors py-2">
              Trang chủ
            </Link>
            <Link href="/about" className="hover:text-[#a3171e] transition-colors py-2">
              Giới thiệu
            </Link>

            {/* Mega Menu Dịch vụ */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                href="/services"
                className="flex items-center gap-1 hover:text-[#a3171e] py-2 transition-colors"
              >
                Dịch vụ pháp lý <ChevronDown className="size-3 opacity-70" />
              </Link>

              {servicesDropdownOpen && (
                <div className="absolute top-full -left-20 w-[580px] bg-white border border-[#e7dcc3] border-t-2 border-t-[#c29a45] shadow-2xl p-4 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2">
                  {legalServicesMenu.map((svc) => (
                    <Link
                      key={svc.href}
                      href={svc.href}
                      className="p-2.5 rounded hover:bg-[#fbf7ee] text-xs text-[#0f1b33] font-medium transition-colors flex items-center justify-between normal-case"
                    >
                      <span>{svc.title}</span>
                      <em className="text-[#c29a45] not-italic font-serif text-[11px]">{svc.hz}</em>
                    </Link>
                  ))}
                  <div className="col-span-2 pt-2 border-t border-[#e7dcc3] mt-1 text-right">
                    <Link href="/services" className="text-xs text-[#a3171e] font-bold hover:underline normal-case">
                      Xem toàn bộ 12 chuyên khoa dịch vụ &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/lawyers" className="hover:text-[#a3171e] transition-colors py-2">
              Đội ngũ luật sư
            </Link>
            <Link href="/blog" className="hover:text-[#a3171e] transition-colors py-2">
              Cẩm nang pháp lý
            </Link>
            <Link href="/contact" className="hover:text-[#a3171e] transition-colors py-2">
              Liên hệ
            </Link>
          </nav>

          {/* Nút Đặt lịch & Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <Button variant="royal" size="sm" asChild className="hidden sm:inline-flex">
              <Link href="/contact#booking">Đặt lịch tư vấn &rarr;</Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden border-[#e7dcc3]"
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
        <div className="lg:hidden border-b border-[#e7dcc3] bg-[#fbf7ee] px-5 py-4 space-y-3 text-xs font-semibold uppercase">
          <Link href="/" className="block py-1.5 text-[#a3171e]" onClick={() => setMobileMenuOpen(false)}>
            Trang chủ
          </Link>
          <Link href="/about" className="block py-1.5 text-[#0b1d3f]" onClick={() => setMobileMenuOpen(false)}>
            Giới thiệu
          </Link>
          <Link href="/services" className="block py-1.5 text-[#0b1d3f]" onClick={() => setMobileMenuOpen(false)}>
            Dịch vụ pháp lý
          </Link>
          <Link href="/lawyers" className="block py-1.5 text-[#0b1d3f]" onClick={() => setMobileMenuOpen(false)}>
            Đội ngũ luật sư
          </Link>
          <Link href="/blog" className="block py-1.5 text-[#0b1d3f]" onClick={() => setMobileMenuOpen(false)}>
            Cẩm nang pháp luật
          </Link>
          <Link href="/contact" className="block py-1.5 text-[#0b1d3f]" onClick={() => setMobileMenuOpen(false)}>
            Liên hệ
          </Link>
          <div className="pt-3 border-t border-[#e7dcc3] flex justify-between items-center">
            <span className="text-xs text-[#5b6174]">Ngôn ngữ:</span>
            <div className="flex gap-2 text-xs font-bold">
              <Link href="/vi" className="text-[#a3171e] underline">Tiếng Việt</Link>
              <span>|</span>
              <Link href="/zh-CN" className="text-[#5b6174]">中文 (Tiếng Trung)</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
