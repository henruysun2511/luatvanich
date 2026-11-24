"use client";

import React from "react";

export function CorridorRadarMap() {
  return (
    <svg
      className="w-full max-w-[480px] h-auto drop-shadow-2xl"
      viewBox="0 0 520 560"
      role="img"
      aria-label="Sơ đồ hành lang pháp lý giữa Hà Nội, TP. Hồ Chí Minh, Quảng Châu, Thâm Quyến và Thượng Hải"
    >
      <defs>
        <pattern id="dot-pattern" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#2d4278" />
        </pattern>
      </defs>
      <rect width="520" height="560" fill="url(#dot-pattern)" opacity=".8" />

      {/* Đường chỉ vàng đứt nét chuyển động */}
      <g fill="none" stroke="#c9a24a" strokeWidth="1.6" className="[stroke-dasharray:5_7] animate-dash-flow">
        <path d="M170 470Q130 420 160 370" />
        <path d="M160 370Q170 280 285 250" />
        <path d="M285 250Q380 200 410 110" />
        <path d="M285 250Q300 270 312 292" />
        <path d="M160 370Q230 330 312 292" />
      </g>

      {/* Sóng xung kích Radar tại Hà Nội và Thượng Hải */}
      <g fill="#c9a24a">
        <circle className="animate-radar-pulse [transform-box:fill-box] [transform-origin:center]" cx="410" cy="110" r="5" />
        <circle className="animate-radar-pulse [transform-box:fill-box] [transform-origin:center]" cx="160" cy="370" r="5" />
      </g>

      {/* Điểm tọa độ các thành phố */}
      <g fill="#f0d28a">
        <circle cx="410" cy="110" r="6" />
        <circle cx="285" cy="250" r="6" />
        <circle cx="312" cy="292" r="5" />
        <circle cx="160" cy="370" r="6" />
        <circle cx="170" cy="470" r="6" />
      </g>

      {/* Nhãn tên Thành phố song ngữ */}
      <g className="font-sans text-[11.5px] fill-[#dbe3f5] font-medium">
        <text x="338" y="98">Thượng Hải</text>
        <text x="338" y="116" className="font-hanzi font-bold text-xs fill-[#f0d28a]">上海</text>
        <text x="214" y="238">Quảng Châu</text>
        <text x="214" y="256" className="font-hanzi font-bold text-xs fill-[#f0d28a]">广州</text>
        <text x="324" y="316">Thâm Quyến</text>
        <text x="324" y="334" className="font-hanzi font-bold text-xs fill-[#f0d28a]">深圳</text>
        <text x="64" y="362">Hà Nội</text>
        <text x="64" y="380" className="font-hanzi font-bold text-xs fill-[#f0d28a]">河内</text>
        <text x="186" y="476">TP. Hồ Chí Minh</text>
        <text x="186" y="494" className="font-hanzi font-bold text-xs fill-[#f0d28a]">胡志明市</text>
      </g>
    </svg>
  );
}
