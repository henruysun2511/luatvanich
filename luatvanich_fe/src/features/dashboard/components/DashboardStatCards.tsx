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
        className="group relative bg-white border border-[#e7dcc3] p-4 rounded-xl shadow-xs hover:border-[#c29a45]/60 hover:shadow-md transition-all block overflow-hidden"
      >
        <div className="h-[2px] -mx-4 -mt-4 mb-3 bg-gradient-to-r from-[#a3171e] to-[#c29a45]" />
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-xs font-medium text-[#718096]">Yêu cầu tư vấn</span>
            <div className="text-2xl font-bold font-mono text-[#06122b] tracking-tight">
              {isLoading ? (
                <div className="h-8 w-16 bg-[#f0ede6] animate-pulse rounded" />
              ) : (
                stats?.consultations.total ?? 0
              )}
            </div>
          </div>
          <div className="size-10 rounded-lg bg-[#a3171e]/10 text-[#a3171e] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <MessageSquareText className="size-5" />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
          <TrendingUp className="size-3.5" />
          <span>+{stats?.consultations.todayCount ?? 0} yêu cầu mới hôm nay</span>
        </div>
      </Link>

      {/* 2. Dịch vụ pháp lý */}
      <Link
        href="/admin/services"
        className="group relative bg-white border border-[#e7dcc3] p-4 rounded-xl shadow-xs hover:border-[#c29a45]/60 hover:shadow-md transition-all block overflow-hidden"
      >
        <div className="h-[2px] -mx-4 -mt-4 mb-3 bg-gradient-to-r from-[#c29a45] to-[#f0d28a]" />
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-xs font-medium text-[#718096]">Dịch vụ pháp lý</span>
            <div className="text-2xl font-bold font-mono text-[#06122b] tracking-tight">
              {isLoading ? (
                <div className="h-8 w-16 bg-[#f0ede6] animate-pulse rounded" />
              ) : (
                stats?.legalServices.total ?? 0
              )}
            </div>
          </div>
          <div className="size-10 rounded-lg bg-[#c29a45]/15 text-[#855e14] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Briefcase className="size-5" />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#718096]">
          <span>{stats?.legalServices.publishedCount ?? 0} dịch vụ đang công khai</span>
        </div>
      </Link>

      {/* 3. Bài viết & Cẩm nang */}
      <Link
        href="/admin/posts"
        className="group relative bg-white border border-[#e7dcc3] p-4 rounded-xl shadow-xs hover:border-[#c29a45]/60 hover:shadow-md transition-all block overflow-hidden"
      >
        <div className="h-[2px] -mx-4 -mt-4 mb-3 bg-gradient-to-r from-[#06122b] to-[#17387a]" />
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-xs font-medium text-[#718096]">Cẩm nang & Bài viết</span>
            <div className="text-2xl font-bold font-mono text-[#06122b] tracking-tight">
              {isLoading ? (
                <div className="h-8 w-16 bg-[#f0ede6] animate-pulse rounded" />
              ) : (
                stats?.posts.total ?? 0
              )}
            </div>
          </div>
          <div className="size-10 rounded-lg bg-[#06122b]/10 text-[#06122b] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <FileText className="size-5" />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 text-[11px] text-[#718096]">
          <span className="flex items-center gap-1">
            <Eye className="size-3 text-[#c29a45]" />
            {stats?.posts.totalViews ?? 0} lượt đọc
          </span>
          {Boolean(stats?.posts.scheduledCount) && (
            <span className="flex items-center gap-1 text-[#855e14]">
              <CalendarClock className="size-3 text-[#c29a45]" />
              {stats?.posts.scheduledCount} bài hẹn giờ
            </span>
          )}
        </div>
      </Link>

      {/* 4. Đội ngũ Luật sư */}
      <Link
        href="/admin/lawyers"
        className="group relative bg-white border border-[#e7dcc3] p-4 rounded-xl shadow-xs hover:border-[#c29a45]/60 hover:shadow-md transition-all block overflow-hidden"
      >
        <div className="h-[2px] -mx-4 -mt-4 mb-3 bg-gradient-to-r from-[#c29a45] to-[#85151b]" />
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-xs font-medium text-[#718096]">Đội ngũ Luật sư</span>
            <div className="text-2xl font-bold font-mono text-[#06122b] tracking-tight">
              {isLoading ? (
                <div className="h-8 w-16 bg-[#f0ede6] animate-pulse rounded" />
              ) : (
                stats?.lawyers.total ?? 0
              )}
            </div>
          </div>
          <div className="size-10 rounded-lg bg-[#06122b]/10 text-[#06122b] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Users className="size-5" />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-[11px] text-[#718096]">
          <Building2 className="size-3 text-[#c29a45]" />
          <span>{stats?.offices.total ?? 0} văn phòng đại diện</span>
        </div>
      </Link>
    </div>
  );
}
