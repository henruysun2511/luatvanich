"use client";

import React from "react";
import Link from "next/link";
import {
  MessageSquareText,
  Briefcase,
  FileText,
  Users,
  Eye,
  CalendarClock,
  Building2,
  TrendingUp,
} from "lucide-react";
import type { DashboardStats } from "../types/dashboard.types";

interface DashboardStatCardsProps {
  stats?: DashboardStats;
  isLoading: boolean;
}

export function DashboardStatCards({ stats, isLoading }: DashboardStatCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Yêu cầu tư vấn mới */}
      <Link
        href="/admin/consultations?status=new"
        className="group relative bg-card border border-border p-4 rounded-xl shadow-xs hover:border-primary/50 hover:shadow-sm transition-all block"
      >
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-xs font-medium text-muted-foreground">Yêu cầu tư vấn</span>
            <div className="text-2xl font-bold font-mono text-foreground tracking-tight">
              {isLoading ? (
                <div className="h-8 w-16 bg-muted animate-pulse rounded" />
              ) : (
                stats?.consultations.total ?? 0
              )}
            </div>
          </div>
          <div className="size-10 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <MessageSquareText className="size-5" />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          <TrendingUp className="size-3.5" />
          <span>+{stats?.consultations.todayCount ?? 0} yêu cầu mới hôm nay</span>
        </div>
      </Link>

      {/* 2. Dịch vụ pháp lý */}
      <Link
        href="/admin/services"
        className="group relative bg-card border border-border p-4 rounded-xl shadow-xs hover:border-primary/50 hover:shadow-sm transition-all block"
      >
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-xs font-medium text-muted-foreground">Dịch vụ pháp lý</span>
            <div className="text-2xl font-bold font-mono text-foreground tracking-tight">
              {isLoading ? (
                <div className="h-8 w-16 bg-muted animate-pulse rounded" />
              ) : (
                stats?.legalServices.total ?? 0
              )}
            </div>
          </div>
          <div className="size-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Briefcase className="size-5" />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span>{stats?.legalServices.publishedCount ?? 0} dịch vụ đang công khai</span>
        </div>
      </Link>

      {/* 3. Bài viết & Cẩm nang */}
      <Link
        href="/admin/posts"
        className="group relative bg-card border border-border p-4 rounded-xl shadow-xs hover:border-primary/50 hover:shadow-sm transition-all block"
      >
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-xs font-medium text-muted-foreground">Cẩm nang & Bài viết</span>
            <div className="text-2xl font-bold font-mono text-foreground tracking-tight">
              {isLoading ? (
                <div className="h-8 w-16 bg-muted animate-pulse rounded" />
              ) : (
                stats?.posts.total ?? 0
              )}
            </div>
          </div>
          <div className="size-10 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <FileText className="size-5" />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
          <span className="flex items-center gap-1 text-purple-700 dark:text-purple-300">
            <CalendarClock className="size-3" />
            {stats?.posts.scheduledCount ?? 0} chờ xuất bản
          </span>
          <span className="flex items-center gap-1 text-foreground/80">
            <Eye className="size-3" />
            {stats?.posts.totalViews ?? 0}
          </span>
        </div>
      </Link>

      {/* 4. Luật sư & Văn phòng */}
      <Link
        href="/admin/lawyers"
        className="group relative bg-card border border-border p-4 rounded-xl shadow-xs hover:border-primary/50 hover:shadow-sm transition-all block"
      >
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-xs font-medium text-muted-foreground">Đội ngũ & Mạng lưới</span>
            <div className="text-2xl font-bold font-mono text-foreground tracking-tight">
              {isLoading ? (
                <div className="h-8 w-16 bg-muted animate-pulse rounded" />
              ) : (
                stats?.lawyers.total ?? 0
              )}
            </div>
          </div>
          <div className="size-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Users className="size-5" />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span>{stats?.lawyers.publishedCount ?? 0} luật sư công tác</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Building2 className="size-3" />
            {stats?.offices.total ?? 0} văn phòng
          </span>
        </div>
      </Link>
    </div>
  );
}
