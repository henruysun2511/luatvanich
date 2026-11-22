"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  MessageSquareText,
  Layers,
  Image,
  Palette,
  ExternalLink,
  ShieldCheck,
  Settings,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavList = [
  { href: "/admin", title: "Tổng quan", icon: LayoutDashboard, exact: true },
  { href: "/admin/pages", title: "Quản lý trang & Builder", icon: Layers },
  { href: "/admin/services", title: "Dịch vụ pháp lý", icon: Briefcase },
  { href: "/admin/offices", title: "Văn phòng đại diện", icon: Building2 },
  { href: "/admin/lawyers", title: "Đội ngũ luật sư", icon: Users },
  { href: "/admin/posts", title: "Cẩm nang & Bài viết", icon: FileText },
  { href: "/admin/consultations", title: "Yêu cầu tư vấn (Leads)", icon: MessageSquareText },
  { href: "/admin/media", title: "Thư viện Media", icon: Image },
  { href: "/admin/users", title: "Tài khoản quản trị", icon: ShieldCheck },
  { href: "/admin/settings", title: "Cài đặt tài khoản", icon: Settings },
  { href: "/admin/theme", title: "Cài đặt Theme", icon: Palette },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="h-14 border-b border-border flex items-center px-4 gap-2">
        <div className="size-8 rounded bg-primary text-accent font-serif font-bold text-sm flex items-center justify-center">
          VI
        </div>
        <div className="flex flex-col">
          <span className="font-serif font-bold text-sm text-primary leading-none">
            LUẬT VẠN ÍCH
          </span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Admin CMS Portal
          </span>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 p-3 space-y-1 text-sm font-medium">
        {adminNavList.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const IconComponent = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <IconComponent className="size-4 shrink-0" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Action: Xem website */}
      <div className="p-3 border-t border-border">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-semibold rounded border border-border text-foreground hover:bg-muted transition-colors"
        >
          <ExternalLink className="size-3.5" />
          Xem website công khai
        </Link>
      </div>
    </aside>
  );
}
