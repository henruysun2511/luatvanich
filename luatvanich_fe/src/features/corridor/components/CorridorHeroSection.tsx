"use client";

import React from "react";
import Link from "next/link";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { ChevronRight, ArrowLeftRight, Landmark, ShieldCheck, GitFork, ArrowUpRight } from "lucide-react";

interface CorridorHeroSectionProps {
  lang: string;
}

export function CorridorHeroSection({ lang }: CorridorHeroSectionProps) {
  const isZh = lang === "zh-CN";

  return (
    <section className="relative bg-gradient-to-br from-[#06142a] via-[#0d2244] to-[#2e0e15] text-white overflow-hidden py-20 lg:py-28 min-h-[620px] flex items-center">
      {/* 1. Lưới hình học đa hướng */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #f0d28a 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
        aria-hidden="true"
      />

      {/* 2. Chữ Hán rỗng nét khổng lồ 廊 (Lang) */}
      <div
        className="absolute -right-8 -bottom-20 font-serif font-bold text-[240px] lg:text-[380px] text-transparent select-none pointer-events-none z-[1] leading-none whitespace-nowrap"
        style={{ WebkitTextStroke: "1px rgba(240, 210, 138, 0.18)" }}
        aria-hidden="true"
      >
        廊
      </div>

      {/* 3. Dải viền hoàng gia trên đỉnh */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#85151b] via-[#c29a45] to-[#f6dc98]" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-[2] w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#9ba8c2] mb-8 font-sans">
          <Link href={`/${lang}`} className="hover:text-[#f0d28a] transition-colors">
            {isZh ? "首页" : "Trang chủ"}
          </Link>
          <ChevronRight className="size-3 text-[#c29a45]" />
          <span className="text-[#f0d28a] font-medium tracking-wide">
            {isZh ? "中越法治走廊" : "Hành lang pháp lý Việt – Trung"}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* CỘT TRÁI: Typography Hoàng Gia & Thông điệp */}
          <div className="lg:col-span-7 space-y-6">
            <EyebrowBadge
              hz={isZh ? "两廊一圈" : "CHIẾN LƯỢC HAI HÀNH LANG"}
              text={isZh ? "跨境产业法治协同走廊" : "HÀNH LANG PHÁP LÝ CHIẾN LƯỢC VIỆT – TRUNG"}
              variant="tag"
            />

            <h1 className="font-royal text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight text-white">
              {isZh ? (
                <>
                  中越经贸与跨境产业合作{" "}
                  <i className="not-italic bg-gradient-to-r from-[#f6dc98] via-[#c29a45] to-[#f6dc98] bg-clip-text text-transparent">
                    综合法治走廊
                  </i>
                </>
              ) : (
                <>
                  Hành lang Pháp lý{" "}
                  <i className="not-italic bg-gradient-to-r from-[#f6dc98] via-[#c29a45] to-[#f6dc98] bg-clip-text text-transparent">
                    Kết nối Giao thương
                  </i>{" "}
                  &amp; Đầu tư Song phương
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-[#b6c0d6] max-w-xl leading-relaxed">
              {isZh
                ? "依托中国（广西、云南）至越南（河内、海防、胡志明市）的陆海国际大通道，万益打造跨境法治协同平台，致力于保障跨国供应链畅通、大型基础设施合规落地与国际争端化解。"
                : "Nền tảng bảo trợ pháp lý vững chắc cho chuỗi cung ứng sản xuất, logistics xuyên biên giới và các dự án hợp tác kinh tế dọc tuyến 'Hai hành lang, một vành đai' giữa Việt Nam và Trung Quốc."}
            </p>

            {/* Nút hành động */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <Link href={`/${lang}#lienhe`} className="btn-royal shadow-lg">
                {isZh ? "咨询跨境走廊法务" : "Tư vấn dự án hành lang"} &rarr;
              </Link>
              <Link
                href={`/${lang}#hanhlang`}
                className="font-medium text-xs sm:text-sm text-[#f0d28a] border-b border-[#f0d28a]/60 hover:text-white hover:border-white transition-colors pb-0.5"
              >
                {isZh ? "查看走廊雷达拓扑" : "Xem radar bản đồ hành lang"}
              </Link>
            </div>

            {/* Checklist bảo chứng 3 cam kết thương hiệu Vạn Ích */}
            <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-4 text-xs text-[#c9d3e8]">
              <li className="flex items-center gap-2">
                <span className="text-[#f0d28a] font-bold">✓</span> {isZh ? "中越双语 • 中文 – Việt" : "Song ngữ Việt – 中文"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#f0d28a] font-bold">✓</span> {isZh ? "绝对保密" : "Bảo mật tuyệt đối"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#f0d28a] font-bold">✓</span> {isZh ? "接案前明确费用" : "Báo phí trước khi nhận vụ việc"}
              </li>
            </ul>
          </div>

          {/* CỘT PHẢI: Sơ Đồ Kết Nối Tuyến Đường Động (Corridor Vector Gateway Card) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-gradient-to-b from-[#0b1d3d] to-[#1c070c] border border-[#f0d28a]/45 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.55)] relative backdrop-blur-xs">
              {/* Header thẻ */}
              <div className="flex items-center justify-between pb-4 border-b border-[#f0d28a]/30">
                <div className="flex items-center gap-2.5">
                  <GitFork className="size-4 text-[#f0d28a]" />
                  <span className="font-royal font-bold text-sm text-[#f0d28a] tracking-wider uppercase">
                    {isZh ? "走廊互联拓扑" : "TRỤC LIÊN KẾT PHÁP LÝ"}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-[#85151b] text-white">
                  ASEAN &bull; CHINA
                </span>
              </div>

              {/* Trục liên kết song phương */}
              <div className="space-y-3 py-5">
                <div className="p-3 bg-[#061226]/80 border border-[#f0d28a]/25 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">Vân Nam &bull; Quảng Tây (Trung Quốc)</p>
                    <p className="text-[10px] text-[#8d9bb5]">Đầu mối sản xuất, công nghệ &amp; cung ứng</p>
                  </div>
                  <ArrowLeftRight className="size-4 text-[#f0d28a]" />
                </div>

                <div className="p-3 bg-[#170407]/80 border border-[#f0d28a]/25 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">Hà Nội &bull; Hải Phòng &bull; TP.HCM</p>
                    <p className="text-[10px] text-[#8d9bb5]">Thủ phủ tiêu dùng, FDI &amp; xuất khẩu</p>
                  </div>
                  <Landmark className="size-4 text-[#f0d28a]" />
                </div>

                <div className="p-3 bg-[#0c1830]/80 border border-[#f0d28a]/25 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">Cơ chế Trọng tài Song phương</p>
                    <p className="text-[10px] text-[#8d9bb5]">VIAC &bull; CIETAC &bull; HKIAC</p>
                  </div>
                  <ShieldCheck className="size-4 text-[#f0d28a]" />
                </div>
              </div>

              {/* Chân thẻ */}
              <div className="pt-3.5 border-t border-[#f0d28a]/30 flex items-center justify-between text-xs">
                <span className="text-[#9ba8c2]">Quy chuẩn áp dụng:</span>
                <span className="font-royal font-bold text-[#f0d28a]">Hiệp ước Đầu tư Song phương (BIT)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
