"use client";

import React from "react";
import Link from "next/link";

interface LawyersHeroSectionProps {
  lang: string;
}

export function LawyersHeroSection({ lang }: LawyersHeroSectionProps) {
  const isZh = lang === "zh-CN";

  return (
    <section className="relative bg-[radial-gradient(800px_420px_at_85%_10%,rgba(194,154,69,0.2),transparent_60%),radial-gradient(600px_400px_at_0%_100%,rgba(163,23,30,0.3),transparent_60%),linear-gradient(135deg,#071530,#0f2a58_60%,#0b1d3f)] text-white overflow-hidden">
      {/* Chữ Hán rỗng nét watermark khổng lồ 团 */}
      <div
        className="absolute right-[30px] -bottom-[130px] font-chinese font-bold text-[260px] sm:text-[360px] lg:text-[480px] leading-none text-transparent select-none pointer-events-none z-0"
        style={{ WebkitTextStroke: "1px rgba(194,154,69,0.22)" }}
        aria-hidden="true"
      >
        团
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
            {isZh ? "律师名录" : "Danh sách luật sư"}
          </b>
        </nav>

        {/* Nội dung Banner */}
        <div className="max-w-[840px]">
          <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#f0d28a] flex items-center">
            <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">律师名录</b>
            {isZh ? "专家团队" : "Đội ngũ"}
          </div>

          <h1 className="font-royal font-bold text-[46px] sm:text-[64px] lg:text-[76px] leading-[1.08] text-white my-4 lg:my-5">
            {isZh ? (
              <>
                专业{" "}
                <span className="text-[#f0d28a] italic font-medium">中越双语律师名录</span>
              </>
            ) : (
              <>
                Danh sách{" "}
                <span className="text-[#f0d28a] italic font-medium">luật sư</span>
              </>
            )}
          </h1>

          <p className="text-[#b6c0d6] text-base sm:text-[18px] max-w-[640px] m-0 leading-relaxed font-sans">
            {isZh
              ? "二十四名精通越南语、中文及涉外商业法律的专业律师与法务专员。根据业务领域、语言与执业办公室精准匹配最契合的办案团队。"
              : "Hai mươi bốn luật sư và chuyên viên pháp lý làm việc bằng tiếng Việt, tiếng Trung hoặc cả hai. Lọc theo lĩnh vực, ngôn ngữ và văn phòng để tìm người phù hợp."}
          </p>

          {/* Ô tìm kiếm luật sư (.sr) */}
          <form className="flex max-w-[560px] mt-[30px]" role="search" onSubmit={(e) => e.preventDefault()}>
            <input
              id="qi"
              type="text"
              placeholder={isZh ? "按姓名、汉字或擅长领域搜索…" : "Tìm theo tên, chữ Hán hoặc lĩnh vực…"}
              aria-label="Tìm luật sư"
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
