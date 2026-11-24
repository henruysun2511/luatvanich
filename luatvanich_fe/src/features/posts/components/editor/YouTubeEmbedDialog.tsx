"use client";

import React, { useState } from "react";
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
import { Video, Check, X } from "lucide-react";
import { toast } from "sonner";

interface YouTubeEmbedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInsert: (url: string) => void;
}

export function YouTubeEmbedDialog({
  open,
  onOpenChange,
  onInsert,
}: YouTubeEmbedDialogProps) {
  const [url, setUrl] = useState("");

  const handleApply = () => {
    const trimmed = url.trim();
    if (!trimmed) {
      toast.error("Vui lòng nhập đường dẫn video YouTube!");
      return;
    }

    if (!trimmed.includes("youtube.com") && !trimmed.includes("youtu.be")) {
      toast.error("Đường dẫn không hợp lệ. Vui lòng nhập link video YouTube!");
      return;
    }

    onInsert(trimmed);
    setUrl("");
    onOpenChange(false);
    toast.success("Đã nhúng video YouTube vào bài viết!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-sm font-semibold">
            <Video className="size-4 text-red-500" />
            Nhúng Video YouTube
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Dán đường dẫn video YouTube (ví dụ: https://www.youtube.com/watch?v=...)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 my-2">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="text-xs h-9 font-mono"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleApply();
              }
            }}
          />
          <span className="text-[11px] text-muted-foreground block">
            Video sẽ được hiển thị đáp ứng (responsive 16:9) ngay giữa nội dung bài viết.
          </span>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-xs h-8"
          >
            <X className="size-3.5 mr-1" />
            Hủy
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleApply}
            className="text-xs h-8 gap-1 bg-red-600 hover:bg-red-700 text-white"
          >
            <Check className="size-3.5" />
            Chèn Video
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
