"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SealStamp } from "@/components/ui/seal-stamp";

export function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".header-nav-wrap")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Xử lý chuyển tab dịch vụ khi click từ Mega Menu
  const handleServiceSelect = (tabIndex: number) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("vanich-select-tab", { detail: { tabIndex } }));
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e7dcc3] shadow-[0_1px_0_rgba(201,162,74,0.55)] header-nav-wrap">
      {/* 1. Dải viền 4px gradient đỉnh (Đỏ thẫm - Đỏ chu sa 60% - Vàng kim) */}
      <div className="h-1 w-full bg-gradient-to-r from-[#7c1015] via-[#a3171e] via-60% to-[#c29a45]" />

      {/* 2. Khung điều hướng chính (Chiều cao chuẩn 78px) */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[78px] flex items-center justify-between gap-6">
        {/* Logo thương hiệu */}
        <Link href="/#top" className="flex items-center gap-3 shrink-0">
          {/* Con dấu chỉ hiển thị ở mobile <= 1000px */}
          <span className="lg:hidden">
            <SealStamp char="万" size="md" variant="navy" />
          </span>
          <div>
            <b className="block font-royal font-bold text-[21px] lg:text-[23px] leading-none tracking-[1.5px] text-[#0b1d3f]">
              LUẬT VẠN ÍCH
            </b>
            <small className="block font-hanzi font-semibold text-[10px] lg:text-[11px] tracking-[4px] lg:tracking-[5px] text-[#c29a45] mt-1">
              万益律师
            </small>
          </div>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden xl:flex items-center gap-7 h-full text-[13.5px] font-sans font-semibold uppercase tracking-[0.7px] text-[#0b1d3f]">
          <ul className="flex items-center gap-7 h-full m-0 p-0 list-none">
            {/* 1. Trang chủ */}
            <li className="h-full flex items-center">
              <Link
                href="/#top"
                className={`flex items-center h-full border-b-[3px] transition-colors ${
                  pathname === "/" || pathname === "/vi" || pathname === "/zh-CN"
                    ? "text-[#a3171e] border-[#a3171e]"
                    : "border-transparent hover:text-[#a3171e]"
                }`}
              >
                Trang chủ
              </Link>
            </li>

            {/* 2. Giới thiệu (Dropdown đơn) */}
            <li
              className="h-full flex items-center relative"
              onMouseEnter={() => setOpenDropdown("gioithieu")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href="/#doingu"
                className="flex items-center h-full border-b-[3px] border-transparent hover:text-[#a3171e] transition-colors"
              >
                Giới thiệu
              </Link>
              <button
                type="button"
                className="w-5 h-full bg-none border-0 cursor-pointer text-[#0b1d3f] grid place-items-center p-0 hover:text-[#a3171e]"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdown(openDropdown === "gioithieu" ? null : "gioithieu");
                }}
                aria-expanded={openDropdown === "gioithieu"}
                aria-label="Mở menu Giới thiệu"
              >
                <span
                  className={`inline-block w-[7px] h-[7px] border-r-[1.5px] border-b-[1.5px] border-current transition-transform ${
                    openDropdown === "gioithieu" ? "-rotate-[135deg] -translate-y-0.5" : "rotate-45 -translate-y-0.5"
                  }`}
                />
              </button>

              {openDropdown === "gioithieu" && (
                <div className="absolute top-full -left-4 min-w-[300px] bg-white border border-[#e7dcc3] border-t-[3px] border-t-[#c29a45] shadow-[0_22px_44px_rgba(10,26,58,0.2)] py-2.5 z-50 normal-case animate-in fade-in slide-in-from-top-2">
                  <Link
                    href="/#top"
                    onClick={() => setOpenDropdown(null)}
                    className="flex justify-between items-center gap-5 px-6 py-3 font-sans font-medium text-sm text-[#0f1b33] hover:bg-[#fbf7ee] hover:text-[#a3171e] transition-colors"
                  >
                    <span>Về Luật Vạn Ích</span>
                    <em className="font-hanzi font-bold text-sm not-italic text-[#c29a45]">万益</em>
                  </Link>
                  <Link
                    href="/#doingu"
                    onClick={() => setOpenDropdown(null)}
                    className="flex justify-between items-center gap-5 px-6 py-3 font-sans font-medium text-sm text-[#0f1b33] hover:bg-[#fbf7ee] hover:text-[#a3171e] transition-colors"
                  >
                    <span>Đội ngũ luật sư</span>
                    <em className="font-hanzi font-bold text-sm not-italic text-[#c29a45]">团队</em>
                  </Link>
                  <Link
                    href="/#top"
                    onClick={() => setOpenDropdown(null)}
                    className="flex justify-between items-center gap-5 px-6 py-3 font-sans font-medium text-sm text-[#0f1b33] hover:bg-[#fbf7ee] hover:text-[#a3171e] transition-colors"
                  >
                    <span>Hành lang Việt – Trung</span>
                    <em className="font-hanzi font-bold text-sm not-italic text-[#c29a45]">走廊</em>
                  </Link>
                  <Link
                    href="/#lienhe"
                    onClick={() => setOpenDropdown(null)}
                    className="flex justify-between items-center gap-5 px-6 py-3 font-sans font-medium text-sm text-[#0f1b33] hover:bg-[#fbf7ee] hover:text-[#a3171e] transition-colors"
                  >
                    <span>Mạng lưới văn phòng</span>
                    <em className="font-hanzi font-bold text-sm not-italic text-[#c29a45]">网络</em>
                  </Link>
                </div>
              )}
            </li>

            {/* 3. Dịch vụ pháp lý (MEGA MENU 3 CỘT CHUẨN MẪU) */}
            <li
              className="h-full flex items-center relative"
              onMouseEnter={() => setOpenDropdown("dichvu")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href="/#linhvuc"
                className="flex items-center h-full border-b-[3px] border-transparent hover:text-[#a3171e] transition-colors"
              >
                Dịch vụ pháp lý
              </Link>
              <button
                type="button"
                className="w-5 h-full bg-none border-0 cursor-pointer text-[#0b1d3f] grid place-items-center p-0 hover:text-[#a3171e]"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdown(openDropdown === "dichvu" ? null : "dichvu");
                }}
                aria-expanded={openDropdown === "dichvu"}
                aria-label="Mở menu Dịch vụ pháp lý"
              >
                <span
                  className={`inline-block w-[7px] h-[7px] border-r-[1.5px] border-b-[1.5px] border-current transition-transform ${
                    openDropdown === "dichvu" ? "-rotate-[135deg] -translate-y-0.5" : "rotate-45 -translate-y-0.5"
                  }`}
                />
              </button>

              {openDropdown === "dichvu" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[780px] bg-white border border-[#e7dcc3] border-t-[3px] border-t-[#c29a45] shadow-[0_22px_44px_rgba(10,26,58,0.2)] grid grid-cols-[1fr_1fr_250px] z-50 normal-case animate-in fade-in slide-in-from-top-2">
                  {/* Cột 1: Doanh nghiệp & Đầu tư */}
                  <div className="py-5 px-0 border-r border-[#e7dcc3]">
                    <small className="block px-6 pb-2 font-sans font-semibold text-[11px] tracking-[2px] uppercase text-[#c29a45]">
                      Doanh nghiệp &amp; đầu tư
                    </small>
                    <Link
                      href="/#linhvuc"
                      onClick={() => handleServiceSelect(0)}
                      className="flex justify-between items-center gap-4 px-6 py-3 font-sans font-medium text-sm text-[#0f1b33] hover:bg-[#fbf7ee] hover:text-[#a3171e] transition-colors"
                    >
                      <span>Đầu tư nước ngoài</span>
                      <em className="font-hanzi font-bold text-sm not-italic text-[#c29a45]">外商投资</em>
                    </Link>
                    <Link
                      href="/#linhvuc"
                      onClick={() => handleServiceSelect(1)}
                      className="flex justify-between items-center gap-4 px-6 py-3 font-sans font-medium text-sm text-[#0f1b33] hover:bg-[#fbf7ee] hover:text-[#a3171e] transition-colors"
                    >
                      <span>Hợp đồng song ngữ</span>
                      <em className="font-hanzi font-bold text-sm not-italic text-[#c29a45]">双语合同</em>
                    </Link>
                    <Link
                      href="/#linhvuc"
                      onClick={() => handleServiceSelect(4)}
                      className="flex justify-between items-center gap-4 px-6 py-3 font-sans font-medium text-sm text-[#0f1b33] hover:bg-[#fbf7ee] hover:text-[#a3171e] transition-colors"
                    >
                      <span>Lao động &amp; nhân sự</span>
                      <em className="font-hanzi font-bold text-sm not-italic text-[#c29a45]">劳动用工</em>
                    </Link>
                  </div>

                  {/* Cột 2: Tranh chấp & Giao dịch */}
                  <div className="py-5 px-0 border-r border-[#e7dcc3]">
                    <small className="block px-6 pb-2 font-sans font-semibold text-[11px] tracking-[2px] uppercase text-[#c29a45]">
                      Tranh chấp &amp; giao dịch
                    </small>
                    <Link
                      href="/#linhvuc"
                      onClick={() => handleServiceSelect(2)}
                      className="flex justify-between items-center gap-4 px-6 py-3 font-sans font-medium text-sm text-[#0f1b33] hover:bg-[#fbf7ee] hover:text-[#a3171e] transition-colors"
                    >
                      <span>Tranh tụng &amp; trọng tài</span>
                      <em className="font-hanzi font-bold text-sm not-italic text-[#c29a45]">诉讼仲裁</em>
                    </Link>
                    <Link
                      href="/#linhvuc"
                      onClick={() => handleServiceSelect(3)}
                      className="flex justify-between items-center gap-4 px-6 py-3 font-sans font-medium text-sm text-[#0f1b33] hover:bg-[#fbf7ee] hover:text-[#a3171e] transition-colors"
                    >
                      <span>Thu hồi nợ</span>
                      <em className="font-hanzi font-bold text-sm not-italic text-[#c29a45]">债务追收</em>
                    </Link>
                    <Link
                      href="/#linhvuc"
                      onClick={() => handleServiceSelect(5)}
                      className="flex justify-between items-center gap-4 px-6 py-3 font-sans font-medium text-sm text-[#0f1b33] hover:bg-[#fbf7ee] hover:text-[#a3171e] transition-colors"
                    >
                      <span>Mua bán &amp; sáp nhập</span>
                      <em className="font-hanzi font-bold text-sm not-italic text-[#c29a45]">并购重组</em>
                    </Link>
                  </div>

                  {/* Cột 3: Hộp tư vấn nhanh (.pm Navy Card) */}
                  <div className="bg-[#0b1d3f] text-white p-6 flex flex-col justify-center gap-2">
                    <b className="font-royal font-bold text-[22px] leading-tight text-white">
                      Cần tư vấn gấp?
                    </b>
                    <span className="font-royal font-bold text-[22px] text-[#f0d28a]">
                      0900 123 456
                    </span>
                    <p className="m-0 text-xs text-[#b6c0d6] leading-relaxed">
                      Luật sư phản hồi trong 24 giờ làm việc.
                    </p>
                    <Link
                      href="/#lienhe"
                      onClick={() => setOpenDropdown(null)}
                      className="btn-royal !px-4 !py-2.5 !text-xs !mt-2 justify-center"
                    >
                      Đặt lịch
                    </Link>
                  </div>
                </div>
              )}
            </li>

            {/* 4. Cẩm nang (Dropdown đơn) */}
            <li
              className="h-full flex items-center relative"
              onMouseEnter={() => setOpenDropdown("camnang")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href="/#gocnhin"
                className="flex items-center h-full border-b-[3px] border-transparent hover:text-[#a3171e] transition-colors"
              >
                Cẩm nang
              </Link>
              <button
                type="button"
                className="w-5 h-full bg-none border-0 cursor-pointer text-[#0b1d3f] grid place-items-center p-0 hover:text-[#a3171e]"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdown(openDropdown === "camnang" ? null : "camnang");
                }}
                aria-expanded={openDropdown === "camnang"}
                aria-label="Mở menu Cẩm nang"
              >
                <span
                  className={`inline-block w-[7px] h-[7px] border-r-[1.5px] border-b-[1.5px] border-current transition-transform ${
                    openDropdown === "camnang" ? "-rotate-[135deg] -translate-y-0.5" : "rotate-45 -translate-y-0.5"
                  }`}
                />
              </button>

              {openDropdown === "camnang" && (
                <div className="absolute top-full -left-4 min-w-[300px] bg-white border border-[#e7dcc3] border-t-[3px] border-t-[#c29a45] shadow-[0_22px_44px_rgba(10,26,58,0.2)] py-2.5 z-50 normal-case animate-in fade-in slide-in-from-top-2">
                  <Link
                    href="/#gocnhin"
                    onClick={() => setOpenDropdown(null)}
                    className="flex justify-between items-center gap-5 px-6 py-3 font-sans font-medium text-sm text-[#0f1b33] hover:bg-[#fbf7ee] hover:text-[#a3171e] transition-colors"
                  >
                    <span>Góc nhìn pháp lý</span>
                    <em className="font-hanzi font-bold text-sm not-italic text-[#c29a45]">观点</em>
                  </Link>
                  <Link
                    href="/#thuatngu"
                    onClick={() => setOpenDropdown(null)}
                    className="flex justify-between items-center gap-5 px-6 py-3 font-sans font-medium text-sm text-[#0f1b33] hover:bg-[#fbf7ee] hover:text-[#a3171e] transition-colors"
                  >
                    <span>Từ điển Việt – Trung</span>
                    <em className="font-hanzi font-bold text-sm not-italic text-[#c29a45]">词典</em>
                  </Link>
                  <Link
                    href="/#quytrinh"
                    onClick={() => setOpenDropdown(null)}
                    className="flex justify-between items-center gap-5 px-6 py-3 font-sans font-medium text-sm text-[#0f1b33] hover:bg-[#fbf7ee] hover:text-[#a3171e] transition-colors"
                  >
                    <span>Quy trình làm việc</span>
                    <em className="font-hanzi font-bold text-sm not-italic text-[#c29a45]">流程</em>
                  </Link>
                </div>
              )}
            </li>

            {/* 5. Liên hệ */}
            <li className="h-full flex items-center">
              <Link
                href="/#lienhe"
                className="flex items-center h-full border-b-[3px] border-transparent hover:text-[#a3171e] transition-colors"
              >
                Liên hệ
              </Link>
            </li>
          </ul>
        </nav>

        {/* Nút Đặt lịch tư vấn bên phải */}
        <div className="flex items-center gap-3">
          <Link href="/#lienhe" className="btn-royal !py-3 !px-6 !text-xs shrink-0 hidden sm:inline-flex">
            Đặt lịch tư vấn
          </Link>

          {/* Nút Hamburger cho Mobile / Tablet */}
          <button
            type="button"
            className="xl:hidden bg-none border border-[#e7dcc3] px-4 py-2 font-sans font-semibold text-xs text-[#0b1d3f] cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? "Đóng" : "Menu"}
          </button>
        </div>
      </div>

      {/* Drawer Menu Mobile (Hiển thị <= 1180px) */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b-2 border-[#c29a45] shadow-2xl max-h-[calc(100vh-78px)] overflow-y-auto">
          <ul className="flex flex-col m-0 p-0 list-none text-xs font-semibold uppercase">
            <li className="border-t border-[#e7dcc3]">
              <Link
                href="/#top"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-4 text-[#a3171e]"
              >
                Trang chủ
              </Link>
            </li>
            <li className="border-t border-[#e7dcc3]">
              <Link
                href="/#doingu"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-4 text-[#0b1d3f]"
              >
                Giới thiệu
              </Link>
            </li>
            <li className="border-t border-[#e7dcc3]">
              <Link
                href="/#linhvuc"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-4 text-[#0b1d3f]"
              >
                Dịch vụ pháp lý
              </Link>
            </li>
            <li className="border-t border-[#e7dcc3]">
              <Link
                href="/#gocnhin"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-4 text-[#0b1d3f]"
              >
                Cẩm nang
              </Link>
            </li>
            <li className="border-t border-[#e7dcc3]">
              <Link
                href="/#lienhe"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-4 text-[#0b1d3f]"
              >
                Liên hệ
              </Link>
            </li>
            <li className="border-t border-[#e7dcc3] p-4 bg-[#fbf7ee]">
              <Link
                href="/#lienhe"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-royal w-full justify-center !py-3 text-center"
              >
                Đặt lịch tư vấn &rarr;
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
