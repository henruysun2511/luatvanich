"use client";

import React from "react";
import Link from "next/link";

interface OfficesHeroSectionProps {
  lang: string;
}

export function OfficesHeroSection({ lang }: OfficesHeroSectionProps) {
  const isZh = lang.startsWith("zh");

  return (
    <section
      lang={isZh ? "zh-CN" : "vi"}
      className="relative bg-[radial-gradient(800px_420px_at_85%_10%,rgba(194,154,69,0.2),transparent_60%),radial-gradient(600px_400px_at_0%_100%,rgba(163,23,30,0.3),transparent_60%),linear-gradient(135deg,#071530,#0f2a58_60%,#0b1d3f)] text-white overflow-hidden"
    >
      {/* Chữ Hán rỗng nét watermark khổng lồ 所 */}
      <div
        className="absolute right-[30px] -bottom-[130px] font-chinese font-bold text-[260px] sm:text-[360px] lg:text-[480px] leading-none text-transparent select-none pointer-events-none z-0"
        style={{ WebkitTextStroke: "1px rgba(194,154,69,0.22)" }}
        aria-hidden="true"
      >
        所
      </div>

      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 relative z-10 pt-11 pb-16 lg:pb-[70px]">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2.5 flex-wrap text-[13px] text-[#aab6d0] mb-[34px] font-sans" aria-label="Breadcrumb">
          <Link href={`/${lang}`} className="hover:text-[#f0d28a] transition-colors">
            {isZh ? "首页" : "Trang chủ"}
          </Link>
          <span className="opacity-50">/</span>
          <Link href={`/${lang}/about`} className="hover:text-[#f0d28a] transition-colors">
            {isZh ? "关于我们" : "Giới thiệu"}
          </Link>
          <span className="opacity-50">/</span>
          <b className="font-normal text-[#f0d28a]">
            {isZh ? "办事机构" : "Văn phòng đại diện"}
          </b>
        </nav>

        {/* Nội dung Banner */}
        <div className="max-w-[840px]">
          <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#f0d28a] flex items-center">
            <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">办事处</b>
            {isZh ? "办公网络" : "Mạng lưới"}
          </div>

          <h1 className="font-royal font-bold text-[46px] sm:text-[64px] lg:text-[76px] leading-[1.08] text-white my-4 lg:my-5">
            {isZh ? (
              <>
                办公室与{" "}
                <span className="text-[#f0d28a] italic font-medium">跨境代表机构</span>
              </>
            ) : (
              <>
                Văn phòng &amp;{" "}
                <span className="text-[#f0d28a] italic font-medium">đại diện</span>
              </>
            )}
          </h1>

          <p className="text-[#b6c0d6] text-base sm:text-[18px] max-w-[640px] m-0 leading-relaxed font-sans">
            {isZh
              ? "查找离您最近的办事机构，联系律师并查询前往路线。"
              : "Tìm văn phòng gần bạn, xem giờ làm việc và liên hệ với đội ngũ luật sư."}
          </p>
        </div>
      </div>
    </section>
  );
}
