"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  CheckCheck,
  MessageSquareText,
  Clock,
  Loader2,
  Inbox,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useAdminNotificationFeed,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
  NotificationItem,
} from "@/features/notifications";
import { cn } from "@/lib/utils";

/**
 * Format thời gian hiển thị thân thiện tiếng Việt
 */
function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "Vừa xong";
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays === 1) return "Hôm qua";
    if (diffDays < 7) return `${diffDays} ngày trước`;

    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

export function NotificationBellDropdown() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useAdminNotificationFeed(15);
  const markReadMutation = useMarkNotificationAsRead();
  const markAllReadMutation = useMarkAllNotificationsAsRead();

  const unreadCount = data?.unreadCount ?? 0;
  const items = data?.items ?? [];

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleItemClick = (item: NotificationItem) => {
    if (!item.isRead) {
      markReadMutation.mutate(item.id);
    }
    setIsOpen(false);
    if (item.link) {
      router.push(item.link);
    }
  };

  const handleMarkAllAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (unreadCount > 0 && !markAllReadMutation.isPending) {
      markAllReadMutation.mutate();
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Nút bấm Quả chuông */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "relative size-8 transition-colors",
          isOpen && "bg-accent text-accent-foreground",
        )}
        aria-label="Thông báo"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Bell className="size-4 text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-600 rounded-full ring-2 ring-background animate-pulse">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </Button>

      {/* Popover Dropdown Container */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-border bg-popover shadow-xl z-50 overflow-hidden text-popover-foreground animate-in fade-in-0 zoom-in-95 duration-150">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/80 bg-muted/30">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">Thông báo</span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 text-[11px] font-medium bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300 rounded-full">
                  {unreadCount} mới
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllAsRead}
                disabled={markAllReadMutation.isPending}
                className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1 font-medium disabled:opacity-50"
              >
                {markAllReadMutation.isPending ? (
                  <Loader2 className="size-3 animate-spin" />
                ) : (
                  <CheckCheck className="size-3.5" />
                )}
                <span>Đã đọc tất cả</span>
              </button>
            )}
          </div>

          {/* Body: Danh sách thông báo */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-border/50">
            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center text-muted-foreground gap-2">
                <Loader2 className="size-5 animate-spin text-primary" />
                <span className="text-xs">Đang tải thông báo...</span>
              </div>
            ) : items.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-muted-foreground text-center px-4">
                <div className="size-10 rounded-full bg-muted flex items-center justify-center mb-2">
                  <Inbox className="size-5 text-muted-foreground/60" />
                </div>
                <p className="text-xs font-medium text-foreground">Không có thông báo nào</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Các yêu cầu tư vấn mới từ khách hàng sẽ hiển thị tại đây.
                </p>
              </div>
            ) : (
              items.map((item) => {
                const isUnread = !item.isRead;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={cn(
                      "p-3.5 flex items-start gap-3 transition-colors cursor-pointer text-left select-none",
                      isUnread
                        ? "bg-primary/[0.04] hover:bg-primary/[0.08]"
                        : "hover:bg-muted/60 opacity-80 hover:opacity-100",
                    )}
                  >
                    {/* Icon loại thông báo */}
                    <div
                      className={cn(
                        "size-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                        isUnread
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      <MessageSquareText className="size-4" />
                    </div>

                    {/* Nội dung thông báo */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p
                          className={cn(
                            "text-xs truncate",
                            isUnread
                              ? "font-semibold text-foreground"
                              : "font-medium text-foreground/80",
                          )}
                        >
                          {item.title}
                        </p>
                        {isUnread && (
                          <span className="size-2 rounded-full bg-primary shrink-0" />
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
                        {item.message}
                      </p>

                      <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground/80">
                        <Clock className="size-3" />
                        <span>{formatRelativeTime(item.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-border/80 bg-muted/20 text-center">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                router.push("/admin/consultations");
              }}
              className="w-full py-1.5 text-xs text-primary hover:text-primary/80 font-medium flex items-center justify-center gap-1.5 rounded-md hover:bg-primary/5 transition-colors"
            >
              <span>Xem tất cả yêu cầu tư vấn</span>
              <ArrowRight className="size-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
