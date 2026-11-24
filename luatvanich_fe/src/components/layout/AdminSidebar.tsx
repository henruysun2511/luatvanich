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
  Scale,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SealStamp } from "@/components/ui/seal-stamp";

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
      { href: "/admin/media", title: "Thư viện Media", icon: Image },
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
      { href: "/admin/settings", title: "Cài đặt tài khoản", icon: Settings },
      { href: "/admin/theme", title: "Cài đặt Theme", icon: Palette },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#06122b] text-white flex flex-col shrink-0 min-h-screen border-r border-[#c29a45]/30 z-30 select-none shadow-xl">
      {/* Brand Header */}
      <div className="h-16 border-b border-[#c29a45]/25 flex items-center px-4 gap-3 bg-[#040c1e]">
        <Link href="/admin" className="flex items-center gap-2.5 group">
          <SealStamp
            char="万"
            size="sm"
            variant="gold"
            className="w-8 h-8 text-[17px] shadow-md shadow-[#c29a45]/20 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-royal font-bold text-base text-[#f0d28a] tracking-[1.5px] uppercase leading-tight">
              LUẬT VẠN ÍCH
            </span>
            <span className="font-hanzi text-[10px] text-[#c29a45] tracking-[2px] leading-tight">
              万益律师事务所 &bull; ADMIN
            </span>
          </div>
        </Link>
      </div>

      {/* Nav List with Categorized Groups */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto font-sans scrollbar-thin scrollbar-thumb-[#c29a45]/20">
        {navGroups.map((group) => (
          <div key={group.group} className="space-y-1">
            <div className="px-3 pb-1 text-[10px] font-semibold text-[#7f8aa6] tracking-[1.5px] uppercase">
              {group.group}
            </div>
            {group.items.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
              const IconComponent = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all duration-150 group",
                    isActive
                      ? "bg-gradient-to-r from-[#c29a45]/25 to-[#c29a45]/5 text-[#f0d28a] font-semibold border-l-2 border-[#c29a45] shadow-sm"
                      : "text-[#a0aec0] hover:text-[#f0d28a] hover:bg-white/[0.04]",
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <IconComponent
                      className={cn(
                        "size-4 shrink-0 transition-colors",
                        isActive ? "text-[#f0d28a]" : "text-[#7f8aa6] group-hover:text-[#f0d28a]",
                      )}
                    />
                    <span className="truncate">{item.title}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom Action: Xem website công khai */}
      <div className="p-3 border-t border-[#c29a45]/20 bg-[#040c1e]/60">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-semibold rounded border border-[#c29a45]/40 text-[#f0d28a] hover:bg-[#c29a45]/15 hover:border-[#f0d28a] transition-all shadow-sm"
        >
          <ExternalLink className="size-3.5" />
          <span>Xem website công khai</span>
        </Link>
      </div>
    </aside>
  );
}
