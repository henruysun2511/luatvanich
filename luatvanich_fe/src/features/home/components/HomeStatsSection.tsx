"use client";

import React from "react";
import { HOME_STATS } from "../constants/home.constants";
import type { StatItem } from "../types/home.types";

interface HomeStatsSectionProps {
  stats?: StatItem[];
}

export function HomeStatsSection({ stats = HOME_STATS }: HomeStatsSectionProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-[#e7dcc3] bg-gradient-to-b from-[#fffdf8] to-[#fbf7ee]">
      {stats.map((item, idx) => (
        <div key={idx} className="p-8 sm:p-10 border-r border-[#e7dcc3] last:border-r-0 relative">
          <span className="absolute right-6 top-5 font-hanzi font-bold text-4xl text-[#c29a45]/40 select-none">
            {item.hz}
          </span>
          <b className="block font-royal font-bold text-5xl sm:text-6xl text-transparent bg-gradient-to-b from-[#0b1d3f] to-[#16336a] bg-clip-text leading-none">
            {item.num}
            <span className="text-[#a3171e] text-[0.6em] align-super ml-1">+</span>
          </b>
          <span className="block mt-2 text-[#5b6174] text-xs sm:text-sm font-medium">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
