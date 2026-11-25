"use client";

import React from "react";
import Link from "next/link";

interface PostsHeroSectionProps {
  lang: string;
}

export function PostsHeroSection({ lang }: PostsHeroSectionProps) {
  const isZh = lang === "zh-CN";

  return (
    <section className="relative bg-[radial-gradient(800px_420px_at_85%_10%,rgba(194,154,69,0.2),transparent_60%),radial-gradient(600px_400px_at_0%_100%,rgba(163,23,30,0.3),transparent_60%),linear-gradient(135deg,#071530,#0f2a58_60%,#0b1d3f)] text-white overflow-hidden">
      {/* Chữ Hán rỗng nét watermark khổng lồ 文 */}
      <div
        className="absolute right-[30px] -bottom-[130px] font-chinese font-bold text-[260px] sm:text-[360px] lg:text-[480px] leading-none text-transparent select-none pointer-events-none z-0"
        style={{ WebkitTextStroke: "1px rgba(194,154,69,0.22)" }}
        aria-hidden="true"
      >
        文
      </div>

      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 relative z-10 pt-11 pb-16 lg:pb-[70px]">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2.5 flex-wrap text-[13px] text-[#aab6d0] mb-[34px] font-sans" aria-label="Breadcrumb">
          <Link href={`/${lang}`} className="hover:text-[#f0d28a] transition-colors">
            {isZh ? "首页" : "Trang chủ"}
          </Link>
          <span className="opacity-50">/</span>
          <Link href={`/${lang}/posts`} className="hover:text-[#f0d28a] transition-colors">
            {isZh ? "法务指南" : "Cẩm nang"}
          </Link>
          <span className="opacity-50">/</span>
          <b className="font-normal text-[#f0d28a]">
            {isZh ? "法律焦点" : "Tiêu điểm luật"}
          </b>
        </nav>

        {/* Nội dung Banner */}
        <div className="max-w-[840px]">
          <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#f0d28a] flex items-center">
            <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">观点</b>
            {isZh ? "实务法评" : "Cẩm nang pháp lý"}
          </div>

          <h1 className="font-royal font-bold text-[46px] sm:text-[64px] lg:text-[76px] leading-[1.08] text-white my-4 lg:my-5">
            {isZh ? (
              <>
                法律{" "}
                <span className="text-[#f0d28a] italic font-medium">实务精要与判例洞察</span>
              </>
            ) : (
              <>
                Tiêu điểm{" "}
                <span className="text-[#f0d28a] italic font-medium">luật</span>
              </>
            )}
          </h1>

          <p className="text-[#b6c0d6] text-base sm:text-[18px] max-w-[640px] m-0 leading-relaxed font-sans">
            {isZh
              ? "聚焦涉华合同审裁、外商投资准入、跨境债务追收与商事纠纷解决的实务分析与实操指南。"
              : "Phân tích ngắn gọn về hợp đồng, đầu tư, thu hồi nợ và tranh chấp thương mại có yếu tố Trung Quốc."}
          </p>

          {/* Ô tìm kiếm bài viết (.sr) */}
          <form className="flex max-w-[560px] mt-[30px]" role="search" onSubmit={(e) => e.preventDefault()}>
            <input
              id="qi"
              type="text"
              placeholder={isZh ? "搜索文章，例如：定金、微信、投资法…" : "Tìm bài viết, ví dụ: đặt cọc, WeChat…"}
              aria-label="Tìm bài viết"
              className="flex-1 px-5 py-4 border-0 text-[15px] font-sans bg-white text-[#0f1b33] placeholder-[#7f8aa6] focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#a3171e] hover:bg-[#c4252c] text-white px-7 font-sans font-semibold text-[13px] tracking-[1.5px] uppercase cursor-pointer transition-colors"
            >
              {isZh ? "搜索" : "Tìm"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
