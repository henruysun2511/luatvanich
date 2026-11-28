"use client";

import React from "react";
import { useParams } from "next/navigation";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { CorridorRadarMap } from "./CorridorRadarMap";
import { scrollToAnchor } from "@/lib/utils";

export function HeroSection() {
  const params = useParams();
  const lang = (params?.lang as string) || "vi";
  const isZh = lang === "zh-CN" || lang === "zh";

  return (
    <section className="relative bg-gradient-to-br from-[#08111f] via-[#14243d] to-[#1d3556] text-white overflow-hidden scroll-mt-20" id="top">
      {/* Vector Kiến trúc Cao ốc Skyline */}
      <svg
        className="absolute left-0 right-0 bottom-0 w-full h-[140px] z-[1] opacity-50 pointer-events-none"
        viewBox="0 0 1400 140"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g fill="#17387a">
          <rect x="0" y="90" width="52" height="50" />
          <rect x="70" y="60" width="60" height="80" />
          <rect x="140" y="80" width="68" height="60" />
          <rect x="210" y="30" width="52" height="110" />
          <rect x="280" y="70" width="60" height="70" />
          <rect x="350" y="95" width="68" height="45" />
          <rect x="420" y="45" width="52" height="95" />
          <rect x="490" y="75" width="60" height="65" />
          <rect x="560" y="20" width="68" height="120" />
          <rect x="630" y="85" width="52" height="55" />
          <rect x="700" y="55" width="60" height="85" />
          <rect x="770" y="80" width="68" height="60" />
          <rect x="840" y="40" width="52" height="100" />
          <rect x="910" y="65" width="60" height="75" />
          <rect x="980" y="90" width="68" height="50" />
          <rect x="1050" y="50" width="52" height="90" />
          <rect x="1120" y="75" width="60" height="65" />
          <rect x="1190" y="25" width="68" height="115" />
          <rect x="1260" y="70" width="52" height="70" />
          <rect x="1330" y="85" width="60" height="55" />
          <rect x="997" y="14" width="6" height="126" />
          <circle cx="1000" cy="70" r="17" />
          <circle cx="1000" cy="36" r="10" />
          <rect x="990" y="92" width="20" height="48" />
          <g transform="translate(1240 20)">
            <path d="M0 40h90l-10 10H10z" />
            <path d="M12 22h66l-8 10H20z" />
            <path d="M24 6h42l-6 8H30z" />
            <rect x="43" y="-14" width="4" height="22" />
            <rect x="14" y="50" width="62" height="70" />
          </g>
        </g>
      </svg>

      {/* Chữ Hán chìm khổng lồ 万益 */}
      <div
        className="absolute -left-2 -bottom-16 font-hanzi font-bold text-[220px] lg:text-[340px] text-transparent select-none pointer-events-none z-[1] leading-none whitespace-nowrap"
        style={{ WebkitTextStroke: "1px rgba(194, 154, 69, 0.22)" }}
        aria-hidden="true"
      >
        万益
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-[2] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[660px] pt-16 pb-28">
        <div className="lg:col-span-7 space-y-6">
          <EyebrowBadge
            hz={isZh ? "链接中越 · 法律护航" : "链接中越 · 法律护航"}
            text={isZh ? "广西万益（河内）律师事务所" : "Luật Vạn Ích (Hà Nội)"}
            variant="tag"
          />

          <h1 className="font-royal text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight">
            {isZh ? (
              <>
                中越跨境法治走廊 ·{" "}
                <i className="not-italic bg-gradient-to-r from-[#f6dc98] via-[#c29a45] to-[#f6dc98] bg-clip-text text-transparent">
                  法律护航
                </i>
              </>
            ) : (
              <>
                Hành lang pháp lý giữa{" "}
                <i className="not-italic bg-gradient-to-r from-[#f6dc98] via-[#c29a45] to-[#f6dc98] bg-clip-text text-transparent">
                  Việt Nam
                </i>{" "}
                và Trung Quốc.
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-[#b6c0d6] max-w-lg leading-relaxed">
            {isZh
              ? "经越南司法部批准设立的中国境外涉外律师分支机构，汇聚中越双语资深律师与法学博士团队。全周期护航中资企业赴越投资落地、并购重组、合规风控与涉外争议解决。"
              : "Chi nhánh hãng luật được Bộ Tư pháp cấp phép, quy tụ đội ngũ luật sư và tiến sĩ song ngữ Việt – Trung. Đồng hành toàn diện từ cấp phép đầu tư FDI, M&A, thẩm định pháp lý dự án đến giải quyết tranh chấp xuyên biên giới."}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <a
              className="btn-royal"
              href="#lienhe"
              onClick={(e) => scrollToAnchor(e, "lienhe")}
            >
              {isZh ? "预约双语咨询 →" : "Đặt lịch tư vấn song ngữ →"}
            </a>
            <a
              className="font-medium text-sm border-b border-white hover:text-[#f0d28a] hover:border-[#f0d28a] transition-colors pb-0.5"
              href="#linhvuc"
              onClick={(e) => scrollToAnchor(e, "linhvuc")}
            >
              {isZh ? "专业业务领域" : "Lĩnh vực chuyên sâu"}
            </a>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-4 text-xs text-[#c9d3e8]">
            {isZh ? (
              <>
                <li className="flex items-center gap-2">
                  <span className="text-[#f0d28a] font-bold">✓</span> 中越双语律师与法学博士团队
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#f0d28a] font-bold">✓</span> 贯通中越两国双重法域体系
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#f0d28a] font-bold">✓</span> 越南司法部合规备案分支机构
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-2">
                  <span className="text-[#f0d28a] font-bold">✓</span> Đội ngũ Luật sư &amp; Tiến sĩ song ngữ
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#f0d28a] font-bold">✓</span> Khép kín hai nền pháp luật Việt – Trung
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#f0d28a] font-bold">✓</span> Được Bộ Tư pháp cấp phép hoạt động
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Sơ đồ Bản đồ Hành lang Radar động */}
        <div className="lg:col-span-5 flex justify-center">
          <CorridorRadarMap />
        </div>
      </div>
    </section>
  );
}
