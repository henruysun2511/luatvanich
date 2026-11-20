"use client";

import React from "react";
import { User, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminHeader() {
  const handleLogout = () => {
    localStorage.removeItem("lvi_admin_token");
    window.location.href = "/admin/login";
  };

  return (
    <header className="h-14 border-b border-border bg-background px-6 flex items-center justify-between">
      <div className="text-xs text-muted-foreground">
        Hệ thống Quản trị Nội dung & Page Builder Song ngữ
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="size-8" aria-label="Thông báo">
          <Bell className="size-4 text-muted-foreground" />
        </Button>

        <div className="flex items-center gap-2 pl-2 border-l border-border">
          <div className="size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
            <User className="size-3.5" />
          </div>
          <span className="text-xs font-semibold text-foreground">Admin</span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground hover:text-destructive"
          onClick={handleLogout}
          title="Đăng xuất"
        >
          <LogOut className="size-4" />
        </Button>
      </div>
    </header>
  );
}
