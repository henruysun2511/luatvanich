"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";
import { SealStamp } from "@/components/ui/seal-stamp";

export function SessionError({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      role="alert"
      className="flex min-h-screen flex-col items-center justify-center gap-5 p-6 text-center bg-[#06122b] text-white"
    >
      <div className="relative">
        <SealStamp char="万" size="md" variant="gold" className="w-14 h-14 text-2xl shadow-xl shadow-[#c29a45]/20" />
        <div className="absolute -bottom-1 -right-1 size-5 rounded-full bg-[#a3171e] text-white flex items-center justify-center border-2 border-[#06122b]">
          <AlertCircle className="size-3" />
        </div>
      </div>

      <div className="space-y-1.5 max-w-sm">
        <h2 className="font-royal text-2xl font-bold tracking-wide text-[#f0d28a]">
          GIÁN ĐOẠN PHIÊN KẾT NỐI
        </h2>
        <p className="font-hanzi text-xs text-[#c29a45] tracking-widest">
          连接服务器中断 &bull; 请重新尝试
        </p>
      </div>

      <p className="text-[#a0aec0] max-w-sm text-xs leading-relaxed">
        Phiên làm việc của bạn vẫn được bảo lưu an toàn. Vui lòng kiểm tra lại đường truyền mạng hoặc thử kết nối lại.
      </p>

      <Button
        onClick={onRetry}
        className="gap-2 bg-[#a3171e] hover:bg-[#85151b] text-white border border-[#c29a45]/40 shadow-lg px-6 h-10"
      >
        <RotateCcw className="size-4" />
        <span>Thử kết nối lại</span>
      </Button>
    </div>
  );
}
