"use client";

import React from "react";
import { useParams } from "next/navigation";

export function CorridorRadarMap() {
  const params = useParams();
  const lang = (params?.lang as string) || "vi";
  const isZh = lang === "zh-CN" || lang === "zh";

  return (
    <svg
      className="w-full max-w-[480px] h-auto drop-shadow-2xl"
      viewBox="0 0 520 560"
      role="img"
      aria-label="Sơ đồ hành lang pháp lý hai chiều Nam Ninh – Sùng Tả – Hà Nội – Bắc Ninh – TP. Hồ Chí Minh của Luật Vạn Ích"
    >
      <defs>
        <pattern id="dot-pattern" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#2d4278" />
        </pattern>
      </defs>
      <rect width="520" height="560" fill="url(#dot-pattern)" opacity=".8" />

      {/* Đường chỉ vàng đứt nét chuyển động kết nối hai chiều */}
      <g fill="none" stroke="#c9a24a" strokeWidth="1.6" className="[stroke-dasharray:5_7] animate-dash-flow">
        {/* TP.HCM -> Hà Nội */}
        <path d="M170 475Q130 420 160 360" />
        {/* Hà Nội -> Sùng Tả */}
        <path d="M160 360Q170 270 285 230" />
        {/* Sùng Tả -> Nam Ninh (Tổng sở) */}
        <path d="M285 230Q370 190 410 110" />
        {/* Sùng Tả -> Bắc Ninh · Hải Phòng */}
        <path d="M285 230Q305 260 320 295" />
        {/* Hà Nội -> Bắc Ninh · Hải Phòng */}
        <path d="M160 360Q230 335 320 295" />
      </g>

      {/* Sóng xung kích Radar tại hai đầu cầu: Hà Nội và Nam Ninh */}
      <g fill="#c9a24a">
        <circle className="animate-radar-pulse [transform-box:fill-box] [transform-origin:center]" cx="410" cy="110" r="5" />
        <circle className="animate-radar-pulse [transform-box:fill-box] [transform-origin:center]" cx="160" cy="360" r="5" />
      </g>

      {/* Điểm tọa độ các thành phố then chốt */}
      <g fill="#f0d28a">
        <circle cx="410" cy="110" r="6" />
        <circle cx="285" cy="230" r="5.5" />
        <circle cx="320" cy="295" r="5" />
        <circle cx="160" cy="360" r="6" />
        <circle cx="170" cy="475" r="5.5" />
      </g>

      {/* Nhãn tên các địa điểm song ngữ chuẩn theo mạng lưới Vạn Ích */}
      <g className="font-sans text-[11.5px] fill-[#dbe3f5] font-medium">
        {/* 1. Nam Ninh - Tổng sở chính */}
        <text x="330" y="96">{isZh ? "南宁" : "Nam Ninh"}</text>
        <text x="330" y="114" className="font-hanzi font-bold text-xs fill-[#f0d28a]">
          {isZh ? "总所·九洲国际" : "南宁 (Tổng sở)"}
        </text>

        {/* 2. Sùng Tả - Cửa khẩu Hữu Nghị Quan */}
        <text x="210" y="218">{isZh ? "崇左" : "Sùng Tả"}</text>
        <text x="210" y="236" className="font-hanzi font-bold text-xs fill-[#f0d28a]">
          {isZh ? "边境口岸分所" : "崇左 (Cửa khẩu)"}
        </text>

        {/* 3. Bắc Ninh · Hải Phòng - Vùng công nghiệp & cảng biển FDI */}
        <text x="335" y="294">{isZh ? "北宁 · 海防" : "Bắc Ninh · Hải Phòng"}</text>
        <text x="335" y="312" className="font-hanzi font-bold text-xs fill-[#f0d28a]">
          {isZh ? "产业园区·港口" : "北宁 · 海防"}
        </text>

        {/* 4. Hà Nội - Chi nhánh Việt Nam */}
        <text x="50" y="352">{isZh ? "河内" : "Hà Nội"}</text>
        <text x="50" y="370" className="font-hanzi font-bold text-xs fill-[#f0d28a]">
          {isZh ? "越南分所·政务区" : "河内 (Chi nhánh)"}
        </text>

        {/* 5. TP. Hồ Chí Minh - Trung tâm kinh tế phía Nam */}
        <text x="186" y="475">{isZh ? "胡志明市" : "TP. Hồ Chí Minh"}</text>
        <text x="186" y="493" className="font-hanzi font-bold text-xs fill-[#f0d28a]">
          {isZh ? "南部商业中心" : "胡志明市"}
        </text>
      </g>
    </svg>
  );
}
