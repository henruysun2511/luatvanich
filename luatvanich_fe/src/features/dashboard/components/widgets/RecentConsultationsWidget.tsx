"use client";

import React from "react";
import Link from "next/link";
import { MessageSquareText, ArrowRight, Clock, Building, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { RecentConsultationItem } from "../../types/dashboard.types";

interface RecentConsultationsWidgetProps {
  items?: RecentConsultationItem[];
  isLoading: boolean;
}

const STATUS_BADGES: Record<string, { label: string; className: string }> = {
  new: { label: "Mới tiếp nhận", className: "bg-red-50 text-[#a3171e] border-red-200" },
  in_progress: { label: "Đang xử lý", className: "bg-[#fbf7ee] text-[#855e14] border-[#c29a45]/50" },
  done: { label: "Đã hoàn thành", className: "bg-emerald-50 text-emerald-800 border-emerald-300" },
  spam: { label: "Spam", className: "bg-slate-100 text-slate-600 border-slate-200" },
};

export function RecentConsultationsWidget({
  items,
  isLoading,
}: RecentConsultationsWidgetProps) {
  return (
    <div className="relative bg-white border border-[#c29a45]/35 rounded-xl p-5 md:p-6 shadow-[0_4px_16px_rgba(11,29,63,0.04)] hover:shadow-[0_12px_28px_rgba(10,26,58,0.08)] hover:border-[#c29a45] transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      {/* Viền đỉnh gradient hoàng gia */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#c29a45] to-[#a3171e]" />

      <div>
        <div className="flex items-center justify-between pb-3.5 border-b border-[#e7dcc3]">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-lg bg-[#06122b]/10 text-[#06122b] flex items-center justify-center shrink-0">
              <MessageSquareText className="size-4.5 text-[#06122b]" />
            </div>
            <div>
              <h3 className="font-royal text-lg font-bold text-[#06122b] leading-tight">
                Yêu cầu tư vấn mới cần phản hồi
              </h3>
              <p className="text-[11px] text-muted-foreground font-sans mt-0.5">
                Danh sách khách hàng doanh nghiệp & cá nhân vừa gửi liên hệ{" "}
                <span className="font-hanzi text-[#c29a45] font-semibold hidden md:inline">
                  &bull; 待办预约
                </span>
              </p>
            </div>
          </div>

          <Link
            href="/admin/consultations"
            className="text-xs font-semibold text-[#06122b] hover:text-[#a3171e] transition-colors flex items-center gap-1 font-sans"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="size-3" />
          </Link>
        </div>

        <div className="divide-y divide-[#e7dcc3]/50 mt-2">
          {isLoading ? (
            <div className="py-8 text-center text-xs text-muted-foreground animate-pulse">
              Đang tải danh sách yêu cầu mới...
            </div>
          ) : !items || items.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">
              Hiện không có yêu cầu tư vấn nào đang chờ.
            </div>
          ) : (
            items.map((item) => {
              const badge = STATUS_BADGES[item.status] || {
                label: item.status,
                className: "bg-muted text-muted-foreground",
              };

              return (
                <div
                  key={item.id}
                  className="py-3 flex items-start justify-between gap-3 hover:bg-[#fbf7ee] transition-colors rounded-lg px-2.5"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-royal font-bold text-[#06122b] truncate">
                        {item.fullName}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#718096]">
                      {item.companyName && (
                        <span className="flex items-center gap-1 truncate max-w-[180px]">
                          <Building className="size-3 shrink-0 text-[#c29a45]" />
                          {item.companyName}
                        </span>
                      )}
                      <span className="flex items-center gap-1 font-mono text-[#06122b]">
                        <Phone className="size-3 shrink-0 text-[#a3171e]" />
                        {item.phone}
                      </span>
                      {item.practiceAreaName && (
                        <Badge variant="outline" className="text-[10px] py-0 h-4 border-[#e7dcc3] text-[#718096] font-normal bg-white">
                          {item.practiceAreaName}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] text-[#718096] font-mono shrink-0 flex items-center gap-1 mt-0.5">
                    <Clock className="size-3 text-[#c29a45]" />
                    {new Date(item.createdAt).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="pt-3.5 border-t border-[#e7dcc3] mt-3">
        <Link
          href="/admin/consultations?status=new"
          className="text-xs font-semibold text-[#06122b] hover:text-[#a3171e] flex items-center justify-center gap-1.5 py-1 transition-colors font-sans"
        >
          <span>Xử lý các yêu cầu chưa phân công</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
