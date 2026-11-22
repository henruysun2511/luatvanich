"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

export function SessionError({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      role="alert"
      className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center bg-muted/20"
    >
      <div className="size-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
        <AlertCircle className="size-6" />
      </div>
      <p className="text-base font-semibold text-foreground">Không thể kết nối tới máy chủ</p>
      <p className="text-muted-foreground max-w-sm text-sm">
        Phiên làm việc của bạn vẫn được lưu. Vui lòng kiểm tra kết nối mạng và thử lại.
      </p>
      <Button onClick={onRetry} className="gap-2">
        <RotateCcw className="size-4" />
        Thử lại
      </Button>
    </div>
  );
}
