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
  ExternalLink,
  ShieldCheck,
  Settings,
  Building2,
  Scale,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SealStamp } from "@/components/ui/seal-stamp";
import { useAdminSidebar } from "./AdminSidebarContext";

interface NavGroup {
  group: string;
  items: {
    href: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    exact?: boolean;
    badge?: string;
  }[];
}

const navGroups: NavGroup[] = [
  {
    group: "VẬN HÀNH & NỘI DUNG",
    items: [
      { href: "/admin", title: "Tổng quan", icon: LayoutDashboard, exact: true },
      { href: "/admin/consultations", title: "Yêu cầu tư vấn", icon: MessageSquareText },
      { href: "/admin/posts", title: "Cẩm nang & Bài viết", icon: FileText },
      { href: "/admin/pages", title: "Quản lý trang & Builder", icon: Layers },
    ],
  },
  {
    group: "NGHIỆP VỤ PHÁP LÝ",
    items: [
      { href: "/admin/practice-areas", title: "Lĩnh vực chuyên môn", icon: Scale },
      { href: "/admin/services", title: "Dịch vụ pháp lý", icon: Briefcase },
      { href: "/admin/lawyers", title: "Đội ngũ luật sư", icon: Users },
      { href: "/admin/offices", title: "Văn phòng đại diện", icon: Building2 },
    ],
  },
  {
    group: "HỆ THỐNG & TÀI KHOẢN",
    items: [
      { href: "/admin/users", title: "Tài khoản quản trị", icon: ShieldCheck },
      { href: "/admin/settings", title: "Cài đặt hệ thống", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { isCollapsed } = useAdminSidebar();

  return (
    <aside
      className={cn(
        "bg-[#06122b] text-white flex flex-col shrink-0 min-h-screen border-r border-[#c29a45]/30 z-30 select-none shadow-xl transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[68px]" : "w-64",
      )}
    >
      {/* Brand Header */}
      <div
        className={cn(
          "h-16 border-b border-[#c29a45]/25 flex items-center bg-[#040c1e] transition-all duration-300",
          isCollapsed ? "justify-center px-0" : "px-4 gap-3",
        )}
      >
        <Link
          href="/admin"
          className="flex items-center gap-2.5 group"
          title="LUẬT VẠN ÍCH • 万益律师事务所"
        >
          <SealStamp
            char="万"
            size="sm"
            variant="gold"
            className="w-8 h-8 text-[17px] shadow-md shadow-[#c29a45]/20 group-hover:scale-105 transition-transform shrink-0"
          />
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden whitespace-nowrap animate-in fade-in-50 duration-200">
              <span className="font-royal font-bold text-base text-[#f0d28a] tracking-[1.5px] uppercase leading-tight">
                LUẬT VẠN ÍCH
              </span>
              <span className="font-hanzi text-[10px] text-[#c29a45] tracking-[2px] leading-tight">
                万益律师事务所 &bull; ADMIN
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Nav List with Categorized Groups */}
      <nav className="flex-1 px-2.5 py-4 space-y-5 overflow-y-auto overflow-x-hidden font-sans scrollbar-thin scrollbar-thumb-[#c29a45]/20">
        {navGroups.map((group) => (
          <div key={group.group} className="space-y-1">
            {!isCollapsed ? (
              <div className="px-3 pb-1 text-[10px] font-semibold text-[#7f8aa6] tracking-[1.5px] uppercase truncate">
                {group.group}
              </div>
            ) : (
              <div className="my-2 border-t border-[#c29a45]/15 mx-2" />
            )}
            {group.items.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
              const IconComponent = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.title}
                  className={cn(
                    "flex items-center text-xs font-medium transition-all duration-150 group",
                    isCollapsed
                      ? "justify-center p-2.5 rounded-none"
                      : "justify-between px-3 py-2 border-l-2",
                    isActive
                      ? isCollapsed
                        ? "bg-[#c29a45]/25 text-[#f0d28a] shadow-xs"
                        : "bg-gradient-to-r from-[#c29a45]/25 to-[#c29a45]/5 text-[#f0d28a] font-semibold border-[#c29a45] shadow-xs"
                      : isCollapsed
                        ? "text-[#a0aec0] hover:text-[#f0d28a] hover:bg-white/[0.06]"
                        : "text-[#a0aec0] hover:text-[#f0d28a] hover:bg-white/[0.04] border-transparent",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center min-w-0",
                      isCollapsed ? "justify-center" : "gap-2.5",
                    )}
                  >
                    <IconComponent
                      className={cn(
                        "size-4 shrink-0 transition-colors",
                        isActive ? "text-[#f0d28a]" : "text-[#7f8aa6] group-hover:text-[#f0d28a]",
                      )}
                    />
                    {!isCollapsed && <span className="truncate">{item.title}</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom Action: Xem website công khai */}
      <div
        className={cn(
          "border-t border-[#c29a45]/20 bg-[#040c1e]/60 transition-all",
          isCollapsed ? "p-2" : "p-3",
        )}
      >
        <Link
          href="/"
          target="_blank"
          title="Xem website công khai"
          className={cn(
            "flex items-center justify-center border border-[#c29a45]/40 text-[#f0d28a] hover:bg-[#c29a45]/15 hover:border-[#f0d28a] transition-all shadow-xs",
            isCollapsed ? "p-2.5" : "gap-2 w-full px-3 py-2 text-xs font-semibold",
          )}
        >
          <ExternalLink className="size-3.5 shrink-0" />
          {!isCollapsed && <span>Xem website công khai</span>}
        </Link>
      </div>
    </aside>
  );
}
