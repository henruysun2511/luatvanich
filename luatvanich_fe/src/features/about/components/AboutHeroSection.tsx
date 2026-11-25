"use client";

import React from "react";
import Link from "next/link";

interface AboutHeroSectionProps {
  lang: string;
}

export function AboutHeroSection({ lang }: AboutHeroSectionProps) {
  const isZh = lang === "zh-CN";

  return (
    <>
      <section className="relative bg-[radial-gradient(800px_420px_at_85%_10%,rgba(194,154,69,0.2),transparent_60%),radial-gradient(600px_400px_at_0%_100%,rgba(163,23,30,0.3),transparent_60%),linear-gradient(135deg,#071530,#0f2a58_60%,#0b1d3f)] text-white overflow-hidden">
        {/* Chữ Hán rỗng nét watermark khổng lồ 万益 */}
        <div
          className="absolute right-[30px] -bottom-[130px] font-chinese font-bold text-[240px] sm:text-[340px] lg:text-[440px] leading-none text-transparent select-none pointer-events-none z-0"
          style={{ WebkitTextStroke: "1px rgba(194,154,69,0.22)" }}
          aria-hidden="true"
        >
          万益
        </div>

        <div className="max-w-[1180px] mx-auto px-6 sm:px-10 relative z-10 pt-11 pb-20 lg:pb-[90px]">
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
              {isZh ? "关于万益" : "Về Vạn Ích"}
            </b>
          </nav>

          {/* Nội dung Banner */}
          <div className="max-w-[840px]">
            <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#f0d28a] flex items-center">
              <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">关于我们</b>
              {isZh ? "关于万益" : "Giới thiệu"}
            </div>

            <h1 className="font-royal font-bold text-[46px] sm:text-[64px] lg:text-[76px] leading-[1.08] text-white my-4 lg:my-5">
              {isZh ? (
                <>
                  关于{" "}
                  <span className="text-[#f0d28a] italic font-medium">万益律师事务所</span>
                </>
              ) : (
                <>
                  Về Luật{" "}
                  <span className="text-[#f0d28a] italic font-medium">Vạn Ích</span>
                </>
              )}
            </h1>

            <p className="text-[#b6c0d6] text-base sm:text-[18px] max-w-[640px] m-0 leading-relaxed font-sans">
              {isZh
                ? "以深谙两国法律、语言与商业惯例为根基，致力于成为中越跨境企业信赖的法治合作桥梁。"
                : "Văn phòng luật sư song ngữ làm cầu nối pháp lý cho doanh nghiệp Việt Nam và Trung Quốc, bằng hiểu biết về luật, về ngôn ngữ và về cách làm ăn của hai bên."}
            </p>

            {/* Các nút CTA (.btn và .btn.ol) */}
            <div className="flex gap-3.5 flex-wrap mt-8">
              <Link
                href={`/${lang}#lienhe`}
                className="inline-flex items-center gap-2.5 bg-gradient-to-b from-[#c4252c] to-[#8f1218] text-white font-sans font-semibold text-[13px] tracking-[1.3px] uppercase px-7 py-4 shadow-[0_8px_20px_rgba(163,23,30,0.3)] hover:brightness-110 hover:gap-4 transition-all"
              >
                {isZh ? "预约咨询" : "Đặt lịch tư vấn"}
              </Link>
              <Link
                href={`/${lang}/offices`}
                className="inline-flex items-center gap-2.5 bg-transparent text-white font-sans font-semibold text-[13px] tracking-[1.3px] uppercase px-7 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)] hover:bg-white/10 hover:gap-4 transition-all"
              >
                {isZh ? "分支机构" : "Văn phòng đại diện"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Khối 4 chỉ số KPI nổi trên nền (.kp) */}
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 -mt-[46px] relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 bg-white shadow-[0_18px_50px_rgba(11,29,63,0.18)] border-t-[3px] border-[#c29a45]">
          <div className="p-6 lg:px-7 lg:py-6 border-r border-[#e7dcc3] border-b lg:border-b-0">
            <b className="block font-royal font-bold text-4xl lg:text-[46px] leading-none text-[#0b1d3f]">12</b>
            <small className="text-[#5b6174] text-[13px] font-sans mt-1 block">
              {isZh ? "年跨境执业积淀" : "năm hành nghề"}
            </small>
          </div>
          <div className="p-6 lg:px-7 lg:py-6 border-r-0 lg:border-r border-[#e7dcc3] border-b lg:border-b-0">
            <b className="block font-royal font-bold text-4xl lg:text-[46px] leading-none text-[#0b1d3f]">1.200+</b>
            <small className="text-[#5b6174] text-[13px] font-sans mt-1 block">
              {isZh ? "宗已办结跨境案件" : "hồ sơ đã tiếp nhận"}
            </small>
          </div>
          <div className="p-6 lg:px-7 lg:py-6 border-r border-[#e7dcc3]">
            <b className="block font-royal font-bold text-4xl lg:text-[46px] leading-none text-[#0b1d3f]">24</b>
            <small className="text-[#5b6174] text-[13px] font-sans mt-1 block">
              {isZh ? "名双语律师及专家" : "luật sư và chuyên viên"}
            </small>
          </div>
          <div className="p-6 lg:px-7 lg:py-6">
            <b className="block font-royal font-bold text-4xl lg:text-[46px] leading-none text-[#0b1d3f]">6</b>
            <small className="text-[#5b6174] text-[13px] font-sans mt-1 block">
              {isZh ? "处实体办公与协作网点" : "điểm làm việc"}
            </small>
          </div>
        </div>
      </div>
    </>
  );
}
