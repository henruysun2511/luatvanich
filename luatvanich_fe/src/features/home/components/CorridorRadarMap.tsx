"use client";

import React from "react";
import { useParams } from "next/navigation";

export function CorridorRadarMap() {
  const params = useParams();
  const lang = (params?.lang as string) || "vi";
  const isZh = lang === "zh-CN" || lang === "zh";

  return (
    <svg
      className="w-full max-w-[540px] h-auto drop-shadow-2xl"
      viewBox="0 0 580 560"
      role="img"
      aria-label="Sơ đồ hành lang pháp lý hai chiều Nam Ninh – Sùng Tả – Hà Nội – Bắc Ninh – TP. Hồ Chí Minh của Luật Vạn Ích"
    >
      <defs>
        <pattern id="dot-pattern" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#2d4278" />
        </pattern>
      </defs>
      <rect width="580" height="560" fill="url(#dot-pattern)" opacity=".8" />

      {/* Đường chỉ vàng đứt nét chuyển động kết nối hai chiều */}
      <g fill="none" stroke="#c9a24a" strokeWidth="1.6" className="[stroke-dasharray:5_7] animate-dash-flow">
        {/* TP.HCM -> Hà Nội */}
        <path d="M185 480Q140 420 175 360" />
        {/* Hà Nội -> Sùng Tả */}
        <path d="M175 360Q185 270 325 225" />
        {/* Sùng Tả -> Nam Ninh (Tổng sở) */}
        <path d="M325 225Q410 180 465 105" />
        {/* Sùng Tả -> Bắc Ninh · Hải Phòng */}
        <path d="M325 225Q345 260 365 295" />
        {/* Hà Nội -> Bắc Ninh · Hải Phòng */}
        <path d="M175 360Q250 335 365 295" />
      </g>

      {/* Sóng xung kích Radar tại hai đầu cầu: Hà Nội và Nam Ninh */}
      <g fill="#c9a24a">
        <circle className="animate-radar-pulse [transform-box:fill-box] [transform-origin:center]" cx="465" cy="105" r="5" />
        <circle className="animate-radar-pulse [transform-box:fill-box] [transform-origin:center]" cx="175" cy="360" r="5" />
      </g>

      {/* Điểm tọa độ các thành phố then chốt */}
      <g fill="#f0d28a">
        <circle cx="465" cy="105" r="6" />
        <circle cx="325" cy="225" r="5.5" />
        <circle cx="365" cy="295" r="5" />
        <circle cx="175" cy="360" r="6" />
        <circle cx="185" cy="480" r="5.5" />
      </g>

      {/* Nhãn tên các địa điểm song ngữ - Dùng textAnchor chính xác để tránh đè chữ vào dấu chấm */}
      <g className="font-sans text-[11.5px] fill-[#dbe3f5] font-medium">
        {/* 1. Nam Ninh - Đặt bên TRÁI dấu chấm (text-anchor: end) */}
        <text x="448" y="98" textAnchor="end">{isZh ? "南宁" : "Nam Ninh"}</text>
        <text x="448" y="116" textAnchor="end" className="font-hanzi font-bold text-xs fill-[#f0d28a]">
          {isZh ? "总所·九洲国际" : "南宁 (Tổng sở)"}
        </text>

        {/* 2. Sùng Tả - Đặt bên TRÁI dấu chấm (text-anchor: end) */}
        <text x="308" y="218" textAnchor="end">{isZh ? "崇左" : "Sùng Tả"}</text>
        <text x="308" y="236" textAnchor="end" className="font-hanzi font-bold text-xs fill-[#f0d28a]">
          {isZh ? "边境口岸分所" : "崇左 (Cửa khẩu)"}
        </text>

        {/* 3. Bắc Ninh · Hải Phòng - Đặt bên PHẢI dấu chấm (text-anchor: start) */}
        <text x="382" y="294" textAnchor="start">{isZh ? "北宁 · 海防" : "Bắc Ninh · Hải Phòng"}</text>
        <text x="382" y="312" textAnchor="start" className="font-hanzi font-bold text-xs fill-[#f0d28a]">
          {isZh ? "产业园区·港口" : "北宁 · 海防"}
        </text>

        {/* 4. Hà Nội - Đặt bên TRÁI dấu chấm (text-anchor: end) */}
        <text x="155" y="352" textAnchor="end">{isZh ? "河内" : "Hà Nội"}</text>
        <text x="155" y="370" textAnchor="end" className="font-hanzi font-bold text-xs fill-[#f0d28a]">
          {isZh ? "越南分所·政务区" : "河内 (Chi nhánh)"}
        </text>

        {/* 5. TP. Hồ Chí Minh - Đặt bên PHẢI dấu chấm (text-anchor: start) */}
        <text x="202" y="475" textAnchor="start">{isZh ? "胡志明市" : "TP. Hồ Chí Minh"}</text>
        <text x="202" y="493" textAnchor="start" className="font-hanzi font-bold text-xs fill-[#f0d28a]">
          {isZh ? "南部商业中心" : "胡志明市"}
        </text>
      </g>
    </svg>
  );
}
