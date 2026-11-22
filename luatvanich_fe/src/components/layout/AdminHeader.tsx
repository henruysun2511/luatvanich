"use client";

import React from "react";
import Link from "next/link";
import { User, Bell, LogOut, Loader2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogout, useMe } from "@/features/auth";

export function AdminHeader() {
  const { data: user } = useMe();
  const logoutMutation = useLogout();

  const handleLogout = () => {
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
        <Button variant="ghost" size="icon" className="size-8" aria-label="Thông báo">
          <Bell className="size-4 text-muted-foreground" />
        </Button>

        <Link
          href="/admin/settings"
          className="flex items-center gap-2.5 pl-2 border-l border-border hover:opacity-80 transition-opacity"
          title="Cài đặt tài khoản"
        >
          <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold ring-2 ring-primary/20 overflow-hidden">
            {user?.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatarUrl}
                alt={user.fullName || user.username}
                className="size-full object-cover"
              />
            ) : (
              <User className="size-4" />
            )}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-foreground leading-tight">
              {user?.fullName || user?.username || "Admin"}
            </span>
            <span className="text-[10px] text-muted-foreground capitalize leading-tight">
              {user?.role || "Super Admin"}
            </span>
          </div>
        </Link>

        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          title="Đăng xuất"
        >
          {logoutMutation.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <LogOut className="size-4" />
          )}
        </Button>
      </div>
    </header>
  );
}
