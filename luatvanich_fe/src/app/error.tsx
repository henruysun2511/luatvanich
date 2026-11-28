"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SealStamp } from "@/components/ui/seal-stamp";
import { RotateCcw, Home, AlertTriangle } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#06122b] px-4 text-center overflow-hidden">
      {/* Vầng sáng đỏ son chu sa cảnh báo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute w-[400px] h-[400px] rounded-full bg-radial from-[#a3171e]/20 via-transparent to-transparent blur-3xl z-0"
      />

      <div className="relative z-10 space-y-6 max-w-lg">
        {/* Dấu triện với icon cảnh báo */}
        <div className="relative inline-flex items-center justify-center mx-auto">
          <SealStamp char="W" size="md" variant="gold" className="w-16 h-16 shadow-xl shadow-[#a3171e]/30" />
          <div className="absolute -bottom-1 -right-1 size-6 rounded-full bg-[#a3171e] text-white flex items-center justify-center border-2 border-[#06122b] shadow-md">
            <AlertTriangle className="size-3.5" />
          </div>
        </div>

        {/* Số 500 Hoàng gia */}
        <h1 className="font-royal text-8xl md:text-9xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#ff8b94] via-[#a3171e] to-[#590d12] leading-none select-none">
          500
        </h1>

        <div className="space-y-2">
          <h2 className="font-royal text-2xl md:text-3xl font-bold tracking-wide text-white uppercase">
            HỆ THỐNG GẶP SỰ CỐ
          </h2>
          <p className="font-hanzi text-xs tracking-widest text-[#f0d28a]">
            系统异常 &bull; 请稍后重试
          </p>
        </div>

        <p className="text-[#a0aec0] text-xs md:text-sm leading-relaxed max-w-md mx-auto">
          Hệ thống ghi nhận sự cố bất khả kháng trong quá trình xử lý yêu cầu. Đội ngũ kỹ thuật Luật Vạn Ích đã nhận được thông báo để kịp thời khắc phục.
        </p>

        {/* Các nút hành động */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Button
            onClick={() => reset()}
            className="h-10 px-5 text-xs font-semibold bg-[#a3171e] hover:bg-[#85151b] text-white border border-[#c29a45]/40 shadow-lg shadow-[#a3171e]/30 gap-2"
          >
            <RotateCcw className="size-4" />
            <span>Thử tải lại trang</span>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-10 px-5 text-xs font-semibold border-[#c29a45]/50 bg-transparent text-[#f0d28a] hover:bg-[#c29a45]/15 hover:border-[#f0d28a] gap-2"
          >
            <Link href="/">
              <Home className="size-4" />
              <span>Quay về trang chủ</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
