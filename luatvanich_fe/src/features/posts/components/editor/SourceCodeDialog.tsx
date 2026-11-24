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
import { Textarea } from "@/components/ui/textarea";
import { Code, Check, X } from "lucide-react";

interface SourceCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialHtml: string;
  onApply: (html: string) => void;
}

export function SourceCodeDialog({
  open,
  onOpenChange,
  initialHtml,
  onApply,
}: SourceCodeDialogProps) {
  const [code, setCode] = useState(initialHtml);

  useEffect(() => {
    if (open) {
      setCode(initialHtml);
    }
  }, [open, initialHtml]);

  const handleSave = () => {
    onApply(code);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-sm font-semibold">
            <Code className="size-4 text-primary" />
            Mã nguồn HTML bài viết (Source Code)
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Bạn có thể xem và chỉnh sửa trực tiếp cấu trúc HTML thô của bài viết tại đây.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 min-h-[350px] my-2">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full min-h-[350px] font-mono text-xs leading-relaxed p-3 bg-muted/20"
            placeholder="<div>...</div>"
            spellCheck={false}
          />
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
            Hủy bỏ
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleSave}
            className="text-xs h-8 gap-1"
          >
            <Check className="size-3.5" />
            Áp dụng thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
