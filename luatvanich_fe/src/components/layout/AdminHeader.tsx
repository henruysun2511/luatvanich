"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { User, LogOut, Loader2, ChevronDown, Shield } from "lucide-react";
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
    <header className="relative h-16 bg-white border-b border-[#e7dcc3] px-6 flex items-center justify-between z-20 shadow-sm">
      {/* Viền đỉnh gradient hoàng gia tinh tế */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#85151b] via-[#a3171e] to-[#c29a45]" />

      <div className="flex items-center gap-2 text-xs text-[#06122b]/80 font-sans">
        <Shield className="size-4 text-[#c29a45]" />
        <span className="font-medium tracking-wide">
          Hệ thống Quản trị & Điều hành Nội dung
        </span>
        <span className="text-[#c29a45] font-hanzi font-semibold hidden md:inline">
          &bull; 万益律师事务所
        </span>
      </div>

      <div className="flex items-center gap-4">
        <NotificationBellDropdown />

        {/* User Profile with Hover Dropdown */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center gap-2.5 pl-3 border-l border-[#e7dcc3] cursor-pointer py-1.5 select-none group">
            <div className="size-8.5 min-w-[34px] min-h-[34px] rounded-full bg-[#06122b] text-[#f0d28a] flex items-center justify-center text-xs font-bold ring-2 ring-[#c29a45]/40 overflow-hidden shrink-0 relative group-hover:ring-[#c29a45] transition-all">
              <User className="size-4 text-[#f0d28a]" />
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
              <span className="text-xs font-semibold text-[#06122b] leading-tight group-hover:text-[#a3171e] transition-colors">
                {user?.fullName || user?.username || "Admin"}
              </span>
              <span className="text-[10px] text-[#718096] capitalize leading-tight">
                {user?.role || "Super Admin"}
              </span>
            </div>
            <ChevronDown
              className={cn(
                "size-3.5 text-[#718096] transition-transform duration-200 ml-0.5",
                isOpen && "rotate-180 text-[#06122b]",
              )}
            />
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 top-full pt-1.5 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
              <div className="w-60 rounded-xl border border-[#c29a45]/30 bg-white p-1.5 shadow-xl text-[#06122b] overflow-hidden">
                {/* Viền đỉnh menu */}
                <div className="h-[2px] -mx-1.5 -mt-1.5 mb-1.5 bg-gradient-to-r from-[#85151b] via-[#c29a45] to-[#f0d28a]" />

                {/* Header thông tin tóm tắt */}
                <div className="px-3 py-2 border-b border-[#e7dcc3]/60 bg-[#fcfbf7]/80 rounded-t-lg">
                  <p className="text-xs font-semibold text-[#06122b] truncate font-royal text-[13.5px]">
                    {user?.fullName || user?.username || "Admin"}
                  </p>
                  <p className="text-[11px] text-[#718096] truncate">
                    {user?.email || "admin@luatvanich.vn"}
                  </p>
                </div>

                <div className="p-1 space-y-0.5">
                  {/* Menu item: Thông tin cá nhân */}
                  <Link
                    href="/admin/settings"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-medium text-[#06122b] hover:bg-[#fbf7ee] hover:text-[#a3171e] transition-colors"
                  >
                    <User className="size-4 text-[#c29a45]" />
                    <span>Cài đặt & Thông tin cá nhân</span>
                  </Link>

                  {/* Menu item: Đăng xuất */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-medium text-[#a3171e] hover:bg-[#a3171e]/10 transition-colors"
                  >
                    {logoutMutation.isPending ? (
                      <Loader2 className="size-4 animate-spin text-[#a3171e]" />
                    ) : (
                      <LogOut className="size-4 text-[#a3171e]" />
                    )}
                    <span>Đăng xuất khỏi hệ thống</span>
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
