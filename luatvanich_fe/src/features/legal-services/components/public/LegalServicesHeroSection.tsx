"use client";

import React from "react";
import Link from "next/link";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { ChevronRight, ArrowRight, CheckCircle2, Shield, Globe2, Sparkles, Scale, FileCheck2 } from "lucide-react";

interface LegalServicesHeroSectionProps {
  lang: string;
}

export function LegalServicesHeroSection({ lang }: LegalServicesHeroSectionProps) {
  const isZh = lang === "zh-CN";

  return (
    <section className="relative bg-gradient-to-br from-[#071326] via-[#0d2140] to-[#142e57] text-white overflow-hidden py-20 lg:py-28 min-h-[620px] flex items-center">
      {/* 1. Lưới kiến trúc & Họa tiết vi mô chìm */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #c29a45 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* 2. Chữ Hán rỗng nét khổng lồ mạ vàng kim 务 (Vụ) */}
      <div
        className="absolute -right-8 -bottom-20 font-serif font-bold text-[240px] lg:text-[380px] text-transparent select-none pointer-events-none z-[1] leading-none whitespace-nowrap"
        style={{ WebkitTextStroke: "1px rgba(194, 154, 69, 0.18)" }}
        aria-hidden="true"
      >
        务
      </div>

      {/* 3. Dải viền hoàng gia trên đỉnh */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#85151b] via-[#c29a45] to-[#f6dc98]" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-[2] w-full">
        {/* Breadcrumb sang trọng */}
        <nav className="flex items-center gap-2 text-xs text-[#9ba8c2] mb-8 font-sans">
          <Link href={`/${lang}`} className="hover:text-[#f0d28a] transition-colors">
            {isZh ? "首页" : "Trang chủ"}
          </Link>
          <ChevronRight className="size-3 text-[#c29a45]" />
          <span className="text-[#f0d28a] font-medium tracking-wide">
            {isZh ? "法律服务" : "Dịch vụ pháp lý"}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* CỘT TRÁI: Typography Hoàng Gia & Thông điệp */}
          <div className="lg:col-span-7 space-y-6">
            <EyebrowBadge
              hz={isZh ? "法律服务" : "LĨNH VỰC TRỌNG TÂM"}
              text={isZh ? "全方位跨境法务" : "DỊCH VỤ PHÁP LÝ CHUYÊN SÂU"}
              variant="tag"
            />

            <h1 className="font-royal text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight text-white">
              {isZh ? (
                <>
                  企业与跨境投资{" "}
                  <i className="not-italic bg-gradient-to-r from-[#f6dc98] via-[#c29a45] to-[#f6dc98] bg-clip-text text-transparent">
                    全方位法律解决方案
                  </i>
                </>
              ) : (
                <>
                  Giải pháp Pháp lý{" "}
                  <i className="not-italic bg-gradient-to-r from-[#f6dc98] via-[#c29a45] to-[#f6dc98] bg-clip-text text-transparent">
                    Đầu tư &amp; Thương mại
                  </i>{" "}
                  Xuyên biên giới
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-[#b6c0d6] max-w-xl leading-relaxed">
              {isZh
                ? "依托逾28年跨国法律实战经验，万益为在越外商与中资企业提供涵盖投资准入、双语合同审查、国际仲裁诉讼与并购合规的全流程法律保护。"
                : "Hơn 28 năm kinh nghiệm thực chiến hỗ trợ nhà đầu tư nước ngoài tại Việt Nam, rà soát đối chiếu song ngữ Việt – Trung chuẩn xác, bảo vệ quyền lợi tối đa trong mọi giao dịch và tranh chấp."}
            </p>

            {/* Nút hành động */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <Link href={`/${lang}#lienhe`} className="btn-royal shadow-lg">
                {isZh ? "预约律师咨询" : "Đặt lịch tư vấn dịch vụ"} &rarr;
              </Link>
              <Link
                href={`/${lang}#linhvuc`}
                className="font-medium text-xs sm:text-sm text-[#f0d28a] border-b border-[#f0d28a]/60 hover:text-white hover:border-white transition-colors pb-0.5"
              >
                {isZh ? "查阅6大核心业务" : "Khám phá các khối dịch vụ"}
              </Link>
            </div>

            {/* Checklist bảo chứng 3 cam kết thương hiệu Vạn Ích */}
            <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-4 text-xs text-[#c9d3e8]">
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

          {/* CỘT PHẢI: Bảng Ma Trận Dịch Vụ Hoàng Gia (Imperial Practice Matrix Card) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-gradient-to-b from-[#0b1d3f] to-[#071328] border border-[#c29a45]/50 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.45)] relative backdrop-blur-xs">
              {/* Huy hiệu đỉnh thẻ */}
              <div className="flex items-center justify-between pb-4 border-b border-[#c29a45]/30">
                <div className="flex items-center gap-2">
                  <Scale className="size-4 text-[#f0d28a]" />
                  <span className="font-royal font-bold text-sm text-[#f0d28a] tracking-wider uppercase">
                    {isZh ? "专业领域矩阵" : "DANH MỤC TRỌNG TÂM"}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-[#85151b] text-white">
                  SINCE 1996
                </span>
              </div>

              {/* 6 con dấu dịch vụ thu nhỏ tinh xảo */}
              <div className="grid grid-cols-2 gap-3 py-5">
                {[
                  { hz: "投", vi: "Đầu tư nước ngoài", zh: "外商直接投资" },
                  { hz: "约", vi: "Hợp đồng song ngữ", zh: "双语合同审查" },
                  { hz: "诉", vi: "Tranh tụng & Trọng tài", zh: "国际仲裁诉讼" },
                  { hz: "并", vi: "Mua bán & Sáp nhập", zh: "跨境并购重组" },
                  { hz: "债", vi: "Thu hồi nợ thương mại", zh: "跨境商事追收" },
                  { hz: "劳", vi: "Lao động & Nhân sự", zh: "劳动合规用工" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 bg-[#06122b]/80 border border-[#c29a45]/25 hover:border-[#c29a45] transition-colors group"
                  >
                    <span className="shrink-0 size-8 bg-[#85151b] text-white font-serif font-bold text-base flex items-center justify-center shadow-xs">
                      {item.hz}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-white truncate group-hover:text-[#f0d28a] transition-colors">
                        {isZh ? item.zh : item.vi}
                      </p>
                      <p className="text-[9px] text-[#7d8ca9] font-mono">0{idx + 1} &bull; LUẬT VẠN ÍCH</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chân thẻ: Hotline trực thấu */}
              <div className="pt-4 border-t border-[#c29a45]/30 flex items-center justify-between text-xs">
                <span className="text-[#9ba8c2]">Đường dây ưu tiên:</span>
                <span className="font-royal font-bold text-[#f0d28a] text-sm tracking-wider">
                  +86 152 7702 0681
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
