"use client";

import React, { useRef } from "react";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { INSIGHTS_DATA } from "../constants/home.constants";
import { scrollToAnchor } from "@/lib/utils";

export function LegalInsightsSection() {
  const insightsRailRef = useRef<HTMLDivElement>(null);

  const scrollRail = (direction: number) => {
    if (insightsRailRef.current) {
      insightsRailRef.current.scrollBy({
        left: direction * insightsRailRef.current.clientWidth * 0.8,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 bg-[#fffdf8] relative overflow-hidden scroll-mt-20" id="gocnhin">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
          <div>
            <EyebrowBadge hz="05" text="Góc nhìn" />
            <h2 className="heading-royal text-3xl sm:text-4xl lg:text-5xl mt-3">
              Tiêu điểm luật
            </h2>
          </div>
          <p className="text-sm text-[#5b6174] m-0 leading-relaxed">
            Các bài viết ngắn về thay đổi pháp luật và tình huống thực tiễn thường gặp của doanh nghiệp Việt – Trung.
          </p>
        </div>

        <div
          className="flex gap-6 overflow-x-auto [scroll-snap-type:x_mandatory] pb-4 [&::-webkit-scrollbar]:hidden"
          ref={insightsRailRef}
        >
          {INSIGHTS_DATA.map((item, idx) => (
            <a
              key={idx}
              className="flex-[0_0_calc(85%)] sm:flex-[0_0_calc(55%)] lg:flex-[0_0_calc(33.33%-16px)] [scroll-snap-align:start] bg-white border border-[#e7dcc3] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col cursor-pointer"
              href="#lienhe"
              onClick={(e) => scrollToAnchor(e, "lienhe")}
            >
              <div
                className="aspect-[3/2] relative grid place-items-center overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${item.bg1}, ${item.bg2})` }}
              >
                <span className="absolute left-0 top-4 bg-[#a3171e] text-white font-semibold text-[11px] uppercase tracking-wider px-3.5 py-1">
                  {item.tag}
                </span>
                <i aria-hidden="true" className="font-hanzi font-bold text-7xl text-[#f0d28a]/90 not-italic select-none">
                  {item.hz}
                </i>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-royal font-bold text-xl text-[#0b1d3f] mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5b6174] m-0 mb-4 flex-1 leading-relaxed">
                  {item.desc}
                </p>
                <span className="text-xs font-semibold text-[#a3171e]">Xem chi tiết &rarr;</span>
              </div>
            </a>
          ))}
        </div>

        <div className="flex justify-end gap-2.5 mt-6">
          <button
            type="button"
            className="w-11 h-11 bg-[#0b1d3f] text-[#f0d28a] hover:bg-[#a3171e] hover:text-white transition-colors grid place-items-center cursor-pointer"
            onClick={() => scrollRail(-1)}
            aria-label="Bài trước"
          >
            &larr;
          </button>
          <button
            type="button"
            className="w-11 h-11 bg-[#0b1d3f] text-[#f0d28a] hover:bg-[#a3171e] hover:text-white transition-colors grid place-items-center cursor-pointer"
            onClick={() => scrollRail(1)}
            aria-label="Bài sau"
          >
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
