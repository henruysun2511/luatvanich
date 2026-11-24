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
    <div className="bg-card border border-border rounded-xl p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <CalendarClock className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Bài viết chờ xuất bản theo hẹn giờ
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Tiến trình Cron Job sẽ tự động phát hành công khai khi đến giờ
              </p>
            </div>
          </div>

          <Link
            href="/admin/posts?status=scheduled"
            className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
          >
            Xem tất cả
            <ArrowRight className="size-3" />
          </Link>
        </div>

        <div className="divide-y divide-border/60 mt-2">
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
                className="py-3 flex items-start justify-between gap-3 hover:bg-muted/30 transition-colors rounded-lg px-2"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <FileText className="size-3.5 text-muted-foreground shrink-0" />
                    <span className="text-xs font-semibold text-foreground line-clamp-1">
                      {post.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <Badge variant="outline" className="text-[10px] py-0 h-4 border-border font-normal">
                      {post.categoryName}
                    </Badge>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-[11px] font-mono font-medium text-purple-700 dark:text-purple-300">
                    <Clock className="size-3" />
                    <span>
                      {new Date(post.publishAt).toLocaleString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">Hẹn giờ phát hành</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-border/60 mt-3">
        <Link
          href="/admin/posts"
          className="text-xs font-medium text-primary hover:text-primary/80 flex items-center justify-center gap-1.5 py-1.5 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors"
        >
          Quản lý toàn bộ cẩm nang & bài viết
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
