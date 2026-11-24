"use client";

import React from "react";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { FEATURED_SERVICES } from "../constants/home.constants";

interface FeaturedServicesSectionProps {
  onServiceClick?: (tabIdx: number) => void;
}

export function FeaturedServicesSection({ onServiceClick }: FeaturedServicesSectionProps) {
  const handleClick = (tabIdx: number) => {
    if (onServiceClick) {
      onServiceClick(tabIdx);
    } else {
      window.dispatchEvent(
        new CustomEvent("vanich-select-tab", { detail: { tabIndex: tabIdx } })
      );
      const element = document.getElementById("linhvuc");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="py-24 bg-[#fbf7ee] relative overflow-hidden" id="dichvu">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
          <div>
            <EyebrowBadge hz="服务" text="Dịch vụ tiêu biểu" />
            <h2 className="heading-royal text-3xl sm:text-4xl lg:text-5xl mt-3">
              Sáu dịch vụ được tìm đến nhiều nhất
            </h2>
          </div>
          <p className="text-sm text-[#5b6174] m-0 leading-relaxed">
            Chọn một dịch vụ để xem chi tiết phạm vi công việc, thời gian và hình thức phí tương ứng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_SERVICES.map((sv, idx) => (
            <div
              key={idx}
              className="group relative bg-gradient-to-b from-white to-[#fffaf0] border border-[#e7dcc3] p-8 flex flex-col justify-between transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:border-[#c29a45]"
              onClick={() => handleClick(sv.tabIndex)}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#c29a45] to-[#a3171e] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="w-11 h-11 bg-gradient-to-b from-[#c4252c] to-[#8f1218] text-white font-royal font-bold text-lg grid place-items-center shadow-[0_0_0_4px_#f4dedc]">
                    0{idx + 1}
                  </span>
                  <span className="font-hanzi font-bold text-5xl bg-gradient-to-br from-[#0b1d3f] to-[#3d5fae] bg-clip-text text-transparent select-none">
                    {sv.hz}
                  </span>
                </div>
                <h3 className="font-royal font-bold text-2xl uppercase text-[#0b1d3f] mb-3 tracking-wide">
                  {sv.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5b6174] mb-6 leading-relaxed">
                  {sv.desc}
                </p>
              </div>
              <span className="self-start border border-[#a3171e] text-[#a3171e] font-sans font-semibold text-xs px-4 py-2 transition-colors group-hover:bg-[#a3171e] group-hover:text-white">
                Xem chi tiết &rarr;
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
