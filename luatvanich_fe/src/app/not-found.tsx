import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SealStamp } from "@/components/ui/seal-stamp";
import { Home, LayoutDashboard } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#06122b] px-4 text-center overflow-hidden">
      {/* Thủy ấn mờ nền */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute font-hanzi text-[320px] font-bold text-transparent select-none leading-none [-webkit-text-stroke:1px_rgba(201,162,74,0.06)] z-0 hidden md:block"
      >
        万益
      </div>

      <div className="relative z-10 space-y-6 max-w-lg">
        {/* Con dấu triện vàng */}
        <div className="flex justify-center">
          <SealStamp char="万" size="md" variant="gold" className="w-16 h-16 text-3xl shadow-xl shadow-[#c29a45]/25" />
        </div>

        {/* Số 404 Hoàng gia */}
        <h1 className="font-royal text-8xl md:text-9xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#f0d28a] via-[#c29a45] to-[#855e14] leading-none select-none">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="font-royal text-2xl md:text-3xl font-bold tracking-wide text-white uppercase">
            TRANG KHÔNG TỒN TẠI
          </h2>
          <p className="font-hanzi text-xs tracking-widest text-[#c29a45]">
            页面不存在 &bull; 请返回主页
          </p>
        </div>

        <p className="text-[#a0aec0] text-xs md:text-sm leading-relaxed max-w-md mx-auto">
          Đường dẫn bạn yêu cầu không tìm thấy hoặc đã được điều chuyển trong hệ thống hồ sơ pháp lý của Hãng Luật Vạn Ích.
        </p>

        {/* Các nút điều hướng */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Button
            asChild
            className="h-10 px-5 text-xs font-semibold bg-gradient-to-r from-[#85151b] via-[#a3171e] to-[#c29a45] hover:opacity-95 text-white shadow-lg shadow-[#a3171e]/30 gap-2"
          >
            <Link href="/">
              <Home className="size-4" />
              <span>Quay về trang chủ</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-10 px-5 text-xs font-semibold border-[#c29a45]/50 bg-transparent text-[#f0d28a] hover:bg-[#c29a45]/15 hover:border-[#f0d28a] gap-2"
          >
            <Link href="/admin">
              <LayoutDashboard className="size-4" />
              <span>Cổng quản trị Admin</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
