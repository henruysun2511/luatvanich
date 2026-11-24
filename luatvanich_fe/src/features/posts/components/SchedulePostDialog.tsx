"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, CalendarClock, Clock, Loader2, Sparkles } from "lucide-react";
import { useUpdatePostStatus } from "../queries/usePostsQuery";
import type { PostItem } from "../types/posts.types";

interface SchedulePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: PostItem | null;
}

/** Chuyển Date thành chuỗi `YYYY-MM-DDTHH:mm` cho input type="datetime-local" */
function toDateTimeLocalString(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function SchedulePostDialog({
  open,
  onOpenChange,
  post,
}: SchedulePostDialogProps) {
  const updateStatusMutation = useUpdatePostStatus();

  // Khởi tạo thời gian mặc định là ngày mai 08:00
  const getDefaultScheduleTime = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(8, 0, 0, 0);
    return toDateTimeLocalString(tomorrow);
  };

  const [scheduledDateTime, setScheduledDateTime] = useState<string>(getDefaultScheduleTime());
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Giới hạn thời gian tối thiểu: hiện tại + 5 phút
  const now = new Date();
  now.setMinutes(now.getMinutes() + 5);
  const minDateTime = toDateTimeLocalString(now);

  useEffect(() => {
    if (open && post) {
      if (post.publishAt && new Date(post.publishAt) > new Date()) {
        setScheduledDateTime(toDateTimeLocalString(new Date(post.publishAt)));
      } else {
        setScheduledDateTime(getDefaultScheduleTime());
      }
      setErrorMessage(null);
    }
  }, [open, post]);

  if (!post) return null;

  const viTranslation = post.translations.find((t) => t.languageCode === "vi");
  const zhTranslation = post.translations.find((t) => t.languageCode === "zh-CN");
  const postTitle = viTranslation?.title || zhTranslation?.title || "Bài viết";

  // Kiểm tra xem bài viết có ít nhất 1 bản dịch đánh dấu hoàn chỉnh chưa
  const hasCompleteTranslation = post.translations.some((t) => t.isComplete);

  // Các preset chọn nhanh
  const applyPreset = (type: "1h" | "tomorrow-morning" | "tomorrow-afternoon" | "next-monday") => {
    const target = new Date();
    if (type === "1h") {
      target.setHours(target.getHours() + 1);
    } else if (type === "tomorrow-morning") {
      target.setDate(target.getDate() + 1);
      target.setHours(8, 0, 0, 0);
    } else if (type === "tomorrow-afternoon") {
      target.setDate(target.getDate() + 1);
      target.setHours(14, 0, 0, 0);
    } else if (type === "next-monday") {
      const day = target.getDay();
      const diff = day === 0 ? 1 : 8 - day; // Đến Thứ 2 tới
      target.setDate(target.getDate() + diff);
      target.setHours(8, 0, 0, 0);
    }
    setScheduledDateTime(toDateTimeLocalString(target));
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const targetDate = new Date(scheduledDateTime);
    if (isNaN(targetDate.getTime()) || targetDate <= new Date()) {
      setErrorMessage("Thời điểm lên lịch xuất bản phải ở tương lai.");
      return;
    }

    if (!hasCompleteTranslation) {
      setErrorMessage(
        "Bài viết cần ít nhất một bản dịch được đánh dấu 'Hoàn thiện' trước khi lên lịch xuất bản."
      );
      return;
    }

    try {
      await updateStatusMutation.mutateAsync({
        id: post.id,
        payload: {
          status: "scheduled",
          publishAt: targetDate.toISOString(),
        },
      });
      onOpenChange(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Không thể lên lịch bài viết";
      setErrorMessage(msg);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-semibold">
            <CalendarClock className="size-5 text-purple-600" />
            Lên lịch đăng bài viết
          </DialogTitle>
          <DialogDescription className="text-xs">
            Hệ thống sẽ tự động xuất bản bài viết công khai khi tới thời điểm hẹn giờ.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* Tóm tắt bài viết */}
          <div className="p-3 rounded-none border border-border bg-muted/30 space-y-1">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              Bài viết được chọn:
            </span>
            <p className="text-xs font-semibold text-foreground line-clamp-2">{postTitle}</p>
          </div>

          {/* Cảnh báo chưa hoàn thiện bản dịch */}
          {!hasCompleteTranslation && (
            <div className="p-2.5 rounded-none border border-amber-200 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-2">
              <AlertCircle className="size-4 shrink-0 mt-0.5 text-amber-600" />
              <span>
                Bài viết này chưa có bản dịch nào được đánh dấu <strong>Hoàn thiện</strong>. Hãy chỉnh
                sửa bài viết và bật &quot;Đánh dấu hoàn thiện&quot; trước khi lên lịch.
              </span>
            </div>
          )}

          {/* Chọn ngày & giờ */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
              <Clock className="size-3.5 text-muted-foreground" />
              Thời gian xuất bản dự kiến <span className="text-destructive">*</span>
            </label>
            <Input
              type="datetime-local"
              value={scheduledDateTime}
              min={minDateTime}
              onChange={(e) => {
                setScheduledDateTime(e.target.value);
                setErrorMessage(null);
              }}
              className="h-9 text-xs font-mono"
            />
          </div>

          {/* Gợi ý chọn nhanh (Presets) */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
              <Sparkles className="size-3 text-purple-600" />
              Gợi ý hẹn giờ nhanh:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 text-[11px] px-2 py-0 border-border hover:bg-muted"
                onClick={() => applyPreset("1h")}
              >
                +1 giờ nữa
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 text-[11px] px-2 py-0 border-border hover:bg-muted"
                onClick={() => applyPreset("tomorrow-morning")}
              >
                Sáng mai (08:00)
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 text-[11px] px-2 py-0 border-border hover:bg-muted"
                onClick={() => applyPreset("tomorrow-afternoon")}
              >
                Chiều mai (14:00)
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 text-[11px] px-2 py-0 border-border hover:bg-muted"
                onClick={() => applyPreset("next-monday")}
              >
                Thứ Hai tới (08:00)
              </Button>
            </div>
          </div>

          {/* Thông báo lỗi */}
          {errorMessage && (
            <div className="p-2.5 rounded-none border border-destructive/20 bg-destructive/10 text-destructive text-xs">
              {errorMessage}
            </div>
          )}

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              disabled={updateStatusMutation.isPending}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={updateStatusMutation.isPending || !hasCompleteTranslation}
              className="bg-purple-600 hover:bg-purple-700 text-white gap-1.5"
            >
              {updateStatusMutation.isPending && <Loader2 className="size-3.5 animate-spin" />}
              Xác nhận lên lịch
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
