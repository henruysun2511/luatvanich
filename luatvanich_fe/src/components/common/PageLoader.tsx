import React from "react";
import { cn } from "@/lib/utils";
import { SealStamp } from "@/components/ui/seal-stamp";

export interface PageLoaderProps {
  /** Thông điệp hiển thị dưới con dấu (mặc định: "Đang tải dữ liệu...") */
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
        "flex flex-col items-center justify-center gap-4 bg-[#f8f6f0]/80 select-none",
        fullscreen ? "min-h-screen" : "min-h-[300px] w-full flex-1",
        className,
      )}
    >
      <div className="flex items-center justify-center">
        <SealStamp
          char="W"
          size="md"
          variant="gold"
          className="w-14 h-14 text-2xl shadow-lg shadow-[#c29a45]/25 animate-pulse"
        />
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <span className="font-royal text-base font-bold text-[#06122b] tracking-wide">
          {message}
        </span>
        <span className="font-hanzi text-[11px] text-[#c29a45] tracking-widest font-semibold">
          万益律师事务所
        </span>
      </div>
    </div>
  );
}

export { PageLoader as FullPageLoader };
