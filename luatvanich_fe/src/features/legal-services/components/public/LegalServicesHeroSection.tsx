"use client";

import React from "react";
import Link from "next/link";

interface LegalServicesHeroSectionProps {
  lang: string;
}

export function LegalServicesHeroSection({ lang }: LegalServicesHeroSectionProps) {
  const isZh = lang === "zh-CN";

  return (
    <section className="relative bg-[radial-gradient(800px_420px_at_85%_10%,rgba(194,154,69,0.2),transparent_60%),radial-gradient(600px_400px_at_0%_100%,rgba(163,23,30,0.3),transparent_60%),linear-gradient(135deg,#071530,#0f2a58_60%,#0b1d3f)] text-white overflow-hidden">
      {/* Chữ Hán rỗng nét watermark khổng lồ 服 */}
      <div
        className="absolute right-[30px] -bottom-[130px] font-chinese font-bold text-[260px] sm:text-[360px] lg:text-[480px] leading-none text-transparent select-none pointer-events-none z-0"
        style={{ WebkitTextStroke: "1px rgba(194,154,69,0.22)" }}
        aria-hidden="true"
      >
        服
      </div>

      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 relative z-10 pt-11 pb-16 lg:pb-[70px]">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2.5 flex-wrap text-[13px] text-[#aab6d0] mb-[34px] font-sans" aria-label="Breadcrumb">
          <Link href={`/${lang}`} className="hover:text-[#f0d28a] transition-colors">
            {isZh ? "首页" : "Trang chủ"}
          </Link>
          <span className="opacity-50">/</span>
          <b className="font-normal text-[#f0d28a]">
            {isZh ? "法律服务" : "Dịch vụ pháp lý"}
          </b>
        </nav>

        {/* Nội dung Banner */}
        <div className="max-w-[840px]">
          <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#f0d28a] flex items-center">
            <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">服务</b>
            {isZh ? "法律服务" : "Dịch vụ pháp lý"}
          </div>

          <h1 className="font-royal font-bold text-[46px] sm:text-[64px] lg:text-[76px] leading-[1.08] text-white my-4 lg:my-5">
            {isZh ? (
              <>
                跨国法务服务{" "}
                <span className="text-[#f0d28a] italic font-medium">中越企业全方位解决方案</span>
              </>
            ) : (
              <>
                Tám mảng tư vấn cho{" "}
                <span className="text-[#f0d28a] italic font-medium">doanh nghiệp Việt – Trung</span>
              </>
            )}
          </h1>

          <p className="text-[#b6c0d6] text-base sm:text-[18px] max-w-[640px] m-0 leading-relaxed font-sans">
            {isZh
              ? "每个服务板块均有专职律师负责，流程清晰规范，接案前以书面形式明确报价方案。"
              : "Mỗi dịch vụ có luật sư phụ trách riêng, quy trình rõ ràng và báo phí bằng văn bản trước khi nhận vụ việc."}
          </p>
        </div>
      </div>
    </section>
  );
}
