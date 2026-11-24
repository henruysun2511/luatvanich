"use client";

import React from "react";
import { HOME_STATS } from "../constants/home.constants";
import type { StatItem } from "../types/home.types";

interface HomeStatsSectionProps {
  stats?: StatItem[];
}

export function HomeStatsSection({ stats = HOME_STATS }: HomeStatsSectionProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 bg-gradient-to-b from-[#08152c] via-[#06122b] to-[#050e1f] border-b-2 border-[#c29a45]/40 shadow-inner">
      {stats.map((item, idx) => (
        <div
          key={idx}
          className="p-8 sm:p-10 border-r border-b lg:border-b-0 border-[#c29a45]/20 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r lg:last:border-r-0 relative group transition-colors duration-300 hover:bg-[#0b1d3f]/70"
        >
          {/* Chữ Hán chìm mờ góc trên */}
          <span className="absolute right-6 top-5 font-hanzi font-bold text-4xl sm:text-5xl text-[#c29a45]/20 select-none pointer-events-none transition-transform duration-300 group-hover:scale-105 group-hover:text-[#c29a45]/35">
            {item.hz}
          </span>

          {/* Con số Hoàng Gia ánh kim vàng */}
          <b className="block font-royal font-bold text-5xl sm:text-6xl text-transparent bg-gradient-to-b from-[#f6dc98] via-[#f0d28a] to-[#c29a45] bg-clip-text leading-none">
            {item.num}
            <span className="text-[#e03137] text-[0.6em] align-super ml-1 font-sans font-bold">+</span>
          </b>

          {/* Nhãn mô tả số liệu màu bạc sang trọng */}
          <span className="block mt-3 text-[#c9d3e8] text-xs sm:text-sm font-medium tracking-wide">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
