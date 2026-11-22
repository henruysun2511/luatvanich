import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PageLoaderProps {
  /** Thông điệp hiển thị dưới biểu tượng quay (mặc định: "Đang tải dữ liệu...") */
  message?: string;
  /** Class tùy biến thêm */
  className?: string;
  /** Chiếm toàn màn hình (min-h-screen) hay chỉ một vùng container */
  fullscreen?: boolean;
}

/**
 * Component Loader dùng chung cho toàn bộ ứng dụng (Next.js Suspense, Loading boundary, Auth Guard, Dashboard).
 */
export function PageLoader({
  message = "Đang tải dữ liệu...",
  className,
  fullscreen = true,
}: PageLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-3 bg-muted/20",
        fullscreen ? "min-h-screen" : "min-h-[300px] w-full flex-1",
        className,
      )}
    >
      <Loader2 className="size-8 animate-spin text-primary" aria-hidden />
      {message && (
        <span className="text-sm font-medium text-muted-foreground">{message}</span>
      )}
    </div>
  );
}

export { PageLoader as FullPageLoader };
