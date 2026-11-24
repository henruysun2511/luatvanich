"use client";

import React from "react";
import Link from "next/link";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { ChevronRight, Compass, ShieldCheck, History, Award, BookOpen, Scale } from "lucide-react";
import { SealStamp } from "@/components/ui/seal-stamp";

interface AboutHeroSectionProps {
  lang: string;
}

export function AboutHeroSection({ lang }: AboutHeroSectionProps) {
  const isZh = lang === "zh-CN";

  return (
    <section className="relative bg-gradient-to-br from-[#3b080b] via-[#520d11] to-[#1c0204] text-white overflow-hidden py-20 lg:py-28 min-h-[620px] flex items-center">
      {/* 1. Hoa văn gấm hoàng cung chìm */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #f0d28a 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* 2. Chữ Hán rỗng nét khổng lồ 万 (Vạn) */}
      <div
        className="absolute -right-8 -bottom-20 font-serif font-bold text-[240px] lg:text-[380px] text-transparent select-none pointer-events-none z-[1] leading-none whitespace-nowrap"
        style={{ WebkitTextStroke: "1px rgba(240, 210, 138, 0.18)" }}
        aria-hidden="true"
      >
        万
      </div>

      {/* 3. Dải viền hoàng gia trên đỉnh */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c29a45] via-[#f0d28a] to-[#c29a45]" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-[2] w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#d6a9a9] mb-8 font-sans">
          <Link href={`/${lang}`} className="hover:text-[#f0d28a] transition-colors">
            {isZh ? "首页" : "Trang chủ"}
          </Link>
          <ChevronRight className="size-3 text-[#f0d28a]" />
          <span className="text-[#f0d28a] font-medium tracking-wide">
            {isZh ? "关于万益" : "Về Luật Vạn Ích"}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* CỘT TRÁI: Typography Hoàng Gia & Lịch sử */}
          <div className="lg:col-span-7 space-y-6">
            <EyebrowBadge
              hz={isZh ? "创立于1996" : "KẾ THỪA DI SẢN TỪ 1996"}
              text={isZh ? "万事以益 • 廿八载信誉" : "VẠN SỰ DĨ ÍCH • 28 NĂM ĐỒNG HÀNH"}
              variant="tag"
            />

            <h1 className="font-royal text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight text-white">
              {isZh ? (
                <>
                  逾廿八载深耕，铸就{" "}
                  <i className="not-italic bg-gradient-to-r from-[#f6dc98] via-[#c29a45] to-[#f6dc98] bg-clip-text text-transparent">
                    中越涉外法治卓越品牌
                  </i>
                </>
              ) : (
                <>
                  Hơn Một Phần Tư Thế Kỷ{" "}
                  <i className="not-italic bg-gradient-to-r from-[#f6dc98] via-[#c29a45] to-[#f6dc98] bg-clip-text text-transparent">
                    Kiến Tạo Uy Tín
                  </i>{" "}
                  Pháp Lý Song Phương
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-[#f2d8d8] max-w-xl leading-relaxed">
              {isZh
                ? "万益律师事务所自1996年创立伊始，始终恪守'万事以益'的立所哲学。作为连接中国与东盟经济合作的法治使者，万益致力为跨国产业、外商投资提供最坚实的制度支撑与权益保障。"
                : "Khởi nguồn từ năm 1996, Hãng luật Vạn Ích là đơn vị tiên phong trong lĩnh vực tư vấn pháp lý thương mại và đầu tư giữa Việt Nam và Trung Quốc, bảo vệ tối đa quyền lợi và an toàn dòng vốn xuyên biên giới."}
            </p>

            {/* Nút hành động */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <Link href={`/${lang}#lienhe`} className="btn-royal shadow-lg">
                {isZh ? "与我们建立联系" : "Kết nối cùng Vạn Ích"} &rarr;
              </Link>
              <Link
                href={`/${lang}/corridor`}
                className="font-medium text-xs sm:text-sm text-[#f0d28a] border-b border-[#f0d28a]/60 hover:text-white hover:border-white transition-colors pb-0.5"
              >
                {isZh ? "了解中越走廊战略" : "Khám phá Hành lang pháp lý"}
              </Link>
            </div>

            {/* Checklist bảo chứng 3 cam kết thương hiệu Vạn Ích */}
            <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-4 text-xs text-[#fae1e1]">
              <li className="flex items-center gap-2">
                <span className="text-[#f0d28a] font-bold">&check;</span> {isZh ? "中越双语 • 中文 – Việt" : "Song ngữ Việt – 中文"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#f0d28a] font-bold">&check;</span> {isZh ? "绝对保密" : "Bảo mật tuyệt đối"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#f0d28a] font-bold">&check;</span> {isZh ? "接案前明确费用" : "Báo phí trước khi nhận vụ việc"}
              </li>
            </ul>
          </div>

          {/* CỘT PHẢI: Kim Ấn Vạn Ích & Niên Biểu 1996 (1996 Golden Charter & Seal Stamp) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-gradient-to-b from-[#2a0507] to-[#170203] border border-[#f0d28a]/50 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative backdrop-blur-xs">
              {/* Con dấu lớn trang nghiêm */}
              <div className="flex flex-col items-center text-center pb-6 border-b border-[#f0d28a]/30">
                <SealStamp char="万" size="lg" variant="gold" className="w-20 h-20 text-[42px] mb-4 shadow-xl border-2 border-[#f0d28a]" />
                <h3 className="font-royal font-bold text-2xl text-white tracking-wider">
                  LUẬT VẠN ÍCH
                </h3>
                <p className="text-xs font-hanzi font-semibold text-[#f0d28a] tracking-[5px] mt-1">
                  万益律师事务所 &bull; 1996
                </p>
                <div className="inline-block mt-3 px-3 py-1 bg-[#4a0a0e] border border-[#f0d28a]/40 text-[11px] font-mono text-[#f0d28a] font-semibold">
                  28+ NĂM KINH NGHIỆM THỰC CHIẾN
                </div>
              </div>

              {/* 3 trụ cột triết lý */}
              <div className="py-5 space-y-3">
                <div className="p-2.5 bg-[#200405] border border-[#f0d28a]/20 flex items-center gap-3">
                  <Scale className="size-4 text-[#f0d28a] shrink-0" />
                  <span className="text-xs text-[#fae1e1]">Thượng tôn pháp luật, bảo vệ công lý</span>
                </div>
                <div className="p-2.5 bg-[#200405] border border-[#f0d28a]/20 flex items-center gap-3">
                  <ShieldCheck className="size-4 text-[#f0d28a] shrink-0" />
                  <span className="text-xs text-[#fae1e1]">Bảo hộ quyền tài sản và đầu tư xuyên biên giới</span>
                </div>
                <div className="p-2.5 bg-[#200405] border border-[#f0d28a]/20 flex items-center gap-3">
                  <Compass className="size-4 text-[#f0d28a] shrink-0" />
                  <span className="text-xs text-[#fae1e1]">Kết nối giao thương bền vững Việt – Trung</span>
                </div>
              </div>

              {/* Chân thẻ */}
              <div className="pt-3.5 border-t border-[#f0d28a]/30 flex items-center justify-between text-xs">
                <span className="text-[#d6a9a9] italic">Khẩu hiệu cốt lõi:</span>
                <span className="font-hanzi font-bold text-[#f0d28a] tracking-[2px]">
                  万事以益 &bull; VẠN SỰ DĨ ÍCH
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
