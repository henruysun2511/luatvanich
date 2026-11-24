"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { User, LogOut, Loader2, Shield, ExternalLink } from "lucide-react";
import { useLogout, useMe } from "@/features/auth";
import { NotificationBellDropdown } from "./NotificationBellDropdown";
import { cn } from "@/lib/utils";

export function AdminHeader() {
  const { data: user } = useMe();
  const logoutMutation = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleLogout = () => {
    setIsOpen(false);
    logoutMutation.mutate();
  };

  return (
    <header className="relative h-16 bg-white border-b border-[#e7dcc3] px-6 flex items-center justify-between z-30 shadow-[0_1px_0_rgba(201,162,74,0.35)]">
      {/* Dải gradient đỉnh hoàng gia 4px đồng bộ Header trang chủ */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#85151b] via-[#a3171e] to-[#c29a45]" />

      <div className="flex items-center gap-2 text-xs text-[#06122b]/80 font-sans">
        <Shield className="size-4 text-[#c29a45]" />
        <span className="font-semibold tracking-wide">
          Hệ thống Quản trị & Điều hành Nội dung
        </span>
        <span className="text-[#c29a45] font-hanzi font-bold hidden md:inline">
          &bull; 万益律师事务所
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Dropdown thông báo */}
        <NotificationBellDropdown />

        {/* User Profile Avatar Dropdown (Chuẩn phong cách .dd trang chủ) */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-2.5 pl-3 border-l border-[#e7dcc3] cursor-pointer py-1.5 select-none group"
          >
            {/* Avatar viền kép vàng kim hoàng gia */}
            <div className="size-9 min-w-[36px] min-h-[36px] rounded-full bg-[#06122b] text-[#f0d28a] flex items-center justify-center text-xs font-bold ring-2 ring-[#c29a45]/50 overflow-hidden shrink-0 relative group-hover:ring-[#c29a45] transition-all shadow-xs">
              <User className="size-4.5 text-[#f0d28a]" />
              {user?.avatarUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatarUrl}
                  alt={user.fullName || user.username}
                  className="absolute inset-0 w-full h-full size-full object-cover rounded-full block"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              )}
            </div>

            <div className="flex flex-col text-left">
              <span className="font-royal text-sm font-bold text-[#06122b] leading-tight group-hover:text-[#a3171e] transition-colors">
                {user?.fullName || user?.username || "Admin"}
              </span>
              <span className="text-[10px] text-[#718096] capitalize leading-tight font-sans">
                {user?.role || "Quản trị viên"}
              </span>
            </div>

            {/* Mũi tên chevron .cv xoay ngược chuẩn trang chủ */}
            <span
              className={cn(
                "inline-block w-[6px] h-[6px] border-r-2 border-b-2 border-[#718096] transition-transform duration-200 ml-1.5",
                isOpen
                  ? "-rotate-135 translate-y-0.5 border-[#a3171e]"
                  : "rotate-45 -translate-y-0.5 group-hover:border-[#06122b]",
              )}
            />
          </div>

          {/* Menu Dropdown Chuẩn mẫu .dd từ trang chủ (vanich-hanh-lang) */}
          {isOpen && (
            <div className="absolute right-0 top-full pt-1 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
              <div className="w-64 bg-white border border-[#e7dcc3] border-t-[3px] border-t-[#c29a45] shadow-[0_22px_44px_rgba(10,26,58,0.2)] py-1 text-[#06122b]">
                {/* Header thông tin tóm tắt */}
                <div className="px-5 py-3 border-b border-[#e7dcc3] bg-[#fcfbf7]">
                  <p className="font-royal text-base font-bold text-[#06122b] truncate leading-tight">
                    {user?.fullName || user?.username || "Admin"}
                  </p>
                  <p className="text-[11px] text-[#718096] truncate font-sans mt-0.5">
                    {user?.email || "admin@luatvanich.vn"}
                  </p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="inline-block size-1.5 rounded-full bg-emerald-500" />
                    <em className="font-hanzi text-[11px] font-bold not-italic text-[#c29a45]">
                      万益律师 &bull; {user?.role || "Super Admin"}
                    </em>
                  </div>
                </div>

                {/* Các mục điều hướng kiểu .dd a song ngữ */}
                <div className="py-1">
                  <Link
                    href="/admin/settings"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-between items-center px-5 py-2.5 font-sans font-medium text-xs text-[#06122b] hover:bg-[#fbf7ee] hover:text-[#a3171e] transition-colors border-b border-[#e7dcc3]/40"
                  >
                    <span>Cài đặt & Hồ sơ cá nhân</span>
                    <em className="font-hanzi font-bold text-xs not-italic text-[#c29a45]">个人中心</em>
                  </Link>

                  <Link
                    href="/"
                    target="_blank"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-between items-center px-5 py-2.5 font-sans font-medium text-xs text-[#06122b] hover:bg-[#fbf7ee] hover:text-[#a3171e] transition-colors border-b border-[#e7dcc3]/40"
                  >
                    <span className="flex items-center gap-1.5">
                      <span>Xem website công khai</span>
                      <ExternalLink className="size-3 text-[#718096]" />
                    </span>
                    <em className="font-hanzi font-bold text-xs not-italic text-[#c29a45]">官网</em>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="w-full flex justify-between items-center px-5 py-2.5 font-sans font-medium text-xs text-[#a3171e] hover:bg-[#a3171e]/10 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      {logoutMutation.isPending ? (
                        <Loader2 className="size-3.5 animate-spin text-[#a3171e]" />
                      ) : (
                        <LogOut className="size-3.5 text-[#a3171e]" />
                      )}
                      <span>Đăng xuất khỏi hệ thống</span>
                    </span>
                    <em className="font-hanzi font-bold text-xs not-italic text-[#a3171e]">退出</em>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
