"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp, Eye, Building2 } from "lucide-react";
import type { DashboardStats } from "../types/dashboard.types";

interface DashboardStatCardsProps {
  stats?: DashboardStats;
  isLoading: boolean;
}

export function DashboardStatCards({ stats, isLoading }: DashboardStatCardsProps) {
  const cards = [
    {
      num: "01",
      hz: "询", // Tư vấn (咨询)
      title: "Yêu cầu tư vấn",
      count: stats?.consultations.total ?? 0,
      subText: `+${stats?.consultations.todayCount ?? 0} yêu cầu mới hôm nay`,
      subIcon: TrendingUp,
      href: "/admin/consultations?status=new",
      accent: "text-emerald-700",
    },
    {
      num: "02",
      hz: "法", // Dịch vụ pháp lý (法律服务)
      title: "Dịch vụ pháp lý",
      count: stats?.legalServices.total ?? 0,
      subText: `${stats?.legalServices.publishedCount ?? 0} dịch vụ đang công khai`,
      subIcon: null,
      href: "/admin/services",
      accent: "text-[#718096]",
    },
    {
      num: "03",
      hz: "文", // Cẩm nang & Bài viết (文章资讯)
      title: "Cẩm nang & Bài viết",
      count: stats?.posts.total ?? 0,
      subText: `${stats?.posts.totalViews ?? 0} lượt đọc ${
        stats?.posts.scheduledCount ? `• ${stats.posts.scheduledCount} bài hẹn giờ` : ""
      }`,
      subIcon: Eye,
      href: "/admin/posts",
      accent: "text-[#718096]",
    },
    {
      num: "04",
      hz: "律", // Đội ngũ luật sư (律师团队)
      title: "Đội ngũ Luật sư",
      count: stats?.lawyers.total ?? 0,
      subText: `${stats?.offices.total ?? 0} văn phòng đại diện`,
      subIcon: Building2,
      href: "/admin/lawyers",
      accent: "text-[#718096]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((c) => (
        <Link
          key={c.num}
          href={c.href}
          className="group relative bg-white border border-[#c29a45]/35 p-6 rounded-xl flex flex-col justify-between shadow-[0_4px_16px_rgba(11,29,63,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_36px_rgba(10,26,58,0.14)] hover:border-[#c29a45] overflow-hidden"
        >
          {/* Dải gradient đỉnh mở rộng khi hover chuẩn mẫu .sv::before trang chủ */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#c29a45] to-[#a3171e] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

          <div>
            {/* Hàng đỉnh: Số thứ tự đỏ son .no + Chữ Hán đại diện .hz */}
            <div className="flex items-center justify-between pb-2">
              <span className="w-[38px] h-[24px] bg-gradient-to-b from-[#c4252c] to-[#8f1218] text-white font-royal font-bold text-[13px] grid place-items-center tracking-wider shadow-xs rounded-xs">
                {c.num}
              </span>
              <span
                aria-hidden="true"
                className="font-hanzi font-bold text-3xl text-[#c29a45] leading-none group-hover:scale-110 group-hover:text-[#a3171e] transition-all select-none"
              >
                {c.hz}
              </span>
            </div>

            {/* Tiêu đề & Chỉ số lớn */}
            <h3 className="font-royal text-xl font-bold text-[#06122b] mt-3 mb-1 group-hover:text-[#a3171e] transition-colors leading-tight">
              {c.title}
            </h3>

            <div className="font-royal font-bold text-3xl md:text-4xl text-[#06122b] tracking-tight my-1">
              {isLoading ? (
                <div className="h-9 w-20 bg-[#f0ede6] animate-pulse rounded my-1" />
              ) : (
                c.count
              )}
            </div>

            {/* Dòng thông tin phụ */}
            <div className={`mt-2 flex items-center gap-1.5 text-xs font-sans ${c.accent}`}>
              {c.subIcon && <c.subIcon className="size-3.5 text-[#c29a45] shrink-0" />}
              <span className="truncate">{c.subText}</span>
            </div>
          </div>

          {/* Nút Xem chi tiết chuẩn mẫu .bt trang chủ */}
          <div className="pt-3 mt-4 border-t border-[#e7dcc3]/60 flex items-center justify-between">
            <span className="font-sans font-semibold text-xs text-[#06122b] group-hover:text-[#a3171e] flex items-center gap-1.5 transition-colors">
              Xem chi tiết
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
