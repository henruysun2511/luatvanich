"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { User, LogOut, Loader2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <header className="h-14 border-b border-border bg-background px-6 flex items-center justify-between">
      <div className="text-xs text-muted-foreground flex items-center gap-2">
        <span className="font-semibold text-foreground">Luật Vạn Ích CMS</span>
        <span className="text-border">&bull;</span>
        <span>Hệ thống Quản trị & Điều hành Nội dung</span>
      </div>

      <div className="flex items-center gap-3">
        <NotificationBellDropdown />

        {/* User Profile with Hover Dropdown */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center gap-2.5 pl-2 border-l border-border cursor-pointer py-1.5 select-none group">
            <div className="size-8 min-w-8 min-h-8 max-w-8 max-h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold ring-2 ring-primary/20 overflow-hidden shrink-0 relative">
              {user?.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatarUrl}
                  alt={user.fullName || user.username}
                  className="w-full h-full size-full object-cover rounded-full block"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              ) : (
                <User className="size-4" />
              )}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                {user?.fullName || user?.username || "Admin"}
              </span>
              <span className="text-[10px] text-muted-foreground capitalize leading-tight">
                {user?.role || "Super Admin"}
              </span>
            </div>
            <ChevronDown
              className={cn(
                "size-3.5 text-muted-foreground transition-transform duration-200 ml-0.5",
                isOpen && "rotate-180 text-foreground",
              )}
            />
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 top-full pt-1.5 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
              <div className="w-56 rounded-lg border border-border bg-popover p-1 shadow-lg text-popover-foreground">
                {/* Header thông tin tóm tắt */}
                <div className="px-3 py-2 border-b border-border/60">
                  <p className="text-xs font-semibold text-foreground truncate">
                    {user?.fullName || user?.username || "Admin"}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {user?.email || "admin@luatvanich.vn"}
                  </p>
                </div>

                <div className="p-1 space-y-0.5">
                  {/* Menu item: Thông tin cá nhân */}
                  <Link
                    href="/admin/settings"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <User className="size-4 text-muted-foreground" />
                    <span>Thông tin cá nhân</span>
                  </Link>

                  {/* Menu item: Đăng xuất */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    {logoutMutation.isPending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <LogOut className="size-4" />
                    )}
                    <span>Đăng xuất</span>
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
