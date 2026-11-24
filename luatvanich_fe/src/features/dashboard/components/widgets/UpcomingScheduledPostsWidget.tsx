"use client";

import React from "react";
import Link from "next/link";
import { CalendarClock, ArrowRight, FileText, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { UpcomingScheduledPostItem } from "../../types/dashboard.types";

interface UpcomingScheduledPostsWidgetProps {
  items?: UpcomingScheduledPostItem[];
  isLoading: boolean;
}

export function UpcomingScheduledPostsWidget({
  items,
  isLoading,
}: UpcomingScheduledPostsWidgetProps) {
  return (
    <div className="relative bg-white border border-[#c29a45]/35 rounded-xl p-5 md:p-6 shadow-[0_4px_16px_rgba(11,29,63,0.04)] hover:shadow-[0_12px_28px_rgba(10,26,58,0.08)] hover:border-[#c29a45] transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      {/* Viền đỉnh gradient hoàng gia */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#06122b] via-[#c29a45] to-[#a3171e]" />

      <div>
        <div className="flex items-center justify-between pb-3.5 border-b border-[#e7dcc3]">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-lg bg-[#06122b]/10 text-[#06122b] flex items-center justify-center shrink-0">
              <CalendarClock className="size-4.5 text-[#06122b]" />
            </div>
            <div>
              <h3 className="font-royal text-lg font-bold text-[#06122b] leading-tight">
                Bài viết chờ xuất bản theo hẹn giờ
              </h3>
              <p className="text-[11px] text-muted-foreground font-sans mt-0.5">
                Tiến trình tự động phát hành công khai đúng lịch hẹn{" "}
                <span className="font-hanzi text-[#c29a45] font-semibold hidden md:inline">
                  &bull; 定时发布
                </span>
              </p>
            </div>
          </div>

          <Link
            href="/admin/posts?status=scheduled"
            className="text-xs font-semibold text-[#06122b] hover:text-[#a3171e] transition-colors flex items-center gap-1 font-sans"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="size-3" />
          </Link>
        </div>

        <div className="divide-y divide-[#e7dcc3]/50 mt-2">
          {isLoading ? (
            <div className="py-8 text-center text-xs text-muted-foreground animate-pulse">
              Đang tải danh sách bài viết...
            </div>
          ) : !items || items.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">
              Không có bài viết nào đang ở trạng thái hẹn giờ.
            </div>
          ) : (
            items.map((post) => (
              <div
                key={post.id}
                className="py-3 flex items-start justify-between gap-3 hover:bg-[#fbf7ee] transition-colors rounded-lg px-2.5"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <FileText className="size-3.5 text-[#c29a45] shrink-0" />
                    <span className="text-xs font-royal font-bold text-[#06122b] line-clamp-1">
                      {post.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-[#718096]">
                    <Badge variant="outline" className="text-[10px] py-0 h-4 border-[#e7dcc3] font-normal text-[#718096] bg-white">
                      {post.categoryName}
                    </Badge>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-[11px] font-mono font-semibold text-[#855e14] bg-[#fbf7ee] px-2 py-0.5 rounded border border-[#c29a45]/30">
                    <Clock className="size-3 text-[#c29a45]" />
                    <span>
                      {new Date(post.publishAt).toLocaleString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#718096] mt-0.5 block">Hẹn giờ phát hành</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="pt-3.5 border-t border-[#e7dcc3] mt-3">
        <Link
          href="/admin/posts"
          className="text-xs font-semibold text-[#06122b] hover:text-[#a3171e] flex items-center justify-center gap-1.5 py-1 transition-colors font-sans"
        >
          <span>Quản lý toàn bộ cẩm nang & bài viết</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
