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
  new: { label: "Mới tiếp nhận", className: "bg-blue-50 text-blue-700 border-blue-200" },
  in_progress: { label: "Đang xử lý", className: "bg-amber-50 text-amber-700 border-amber-200" },
  done: { label: "Đã hoàn thành", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  spam: { label: "Spam", className: "bg-slate-100 text-slate-600 border-slate-200" },
};

export function RecentConsultationsWidget({
  items,
  isLoading,
}: RecentConsultationsWidgetProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <MessageSquareText className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Yêu cầu tư vấn mới cần phản hồi
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Danh sách khách hàng doanh nghiệp vừa gửi thông tin liên hệ
              </p>
            </div>
          </div>

          <Link
            href="/admin/consultations"
            className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
          >
            Xem tất cả
            <ArrowRight className="size-3" />
          </Link>
        </div>

        <div className="divide-y divide-border/60 mt-2">
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
                  className="py-3 flex items-start justify-between gap-3 hover:bg-muted/30 transition-colors rounded-lg px-2"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-foreground truncate">
                        {item.fullName}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                      {item.companyName && (
                        <span className="flex items-center gap-1 truncate max-w-[180px]">
                          <Building className="size-3 shrink-0" />
                          {item.companyName}
                        </span>
                      )}
                      <span className="flex items-center gap-1 font-mono text-foreground/80">
                        <Phone className="size-3 shrink-0 text-muted-foreground" />
                        {item.phone}
                      </span>
                      {item.practiceAreaName && (
                        <Badge variant="outline" className="text-[10px] py-0 h-4 border-border font-normal">
                          {item.practiceAreaName}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] text-muted-foreground font-mono shrink-0 flex items-center gap-1 mt-0.5">
                    <Clock className="size-3" />
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

      <div className="pt-3 border-t border-border/60 mt-3">
        <Link
          href="/admin/consultations?status=new"
          className="text-xs font-medium text-primary hover:text-primary/80 flex items-center justify-center gap-1.5 py-1.5 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors"
        >
          Xử lý các yêu cầu chưa phân công
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
