"use client";

import React, { useRef } from "react";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { LAWYERS_DATA, HAIR_COLORS } from "../constants/home.constants";

export function LawyersCarouselSection() {
  const lawyersRailRef = useRef<HTMLDivElement>(null);

  const scrollRail = (direction: number) => {
    if (lawyersRailRef.current) {
      lawyersRailRef.current.scrollBy({
        left: direction * lawyersRailRef.current.clientWidth * 0.8,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 bg-[#fbf7ee] relative overflow-hidden" id="doingu">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
          <div>
            <EyebrowBadge hz="04" text="Đội ngũ" />
            <h2 className="heading-royal text-3xl sm:text-4xl lg:text-5xl mt-3">
              Đội ngũ luật sư
            </h2>
          </div>
          <p className="text-sm text-[#5b6174] m-0 leading-relaxed">
            Mỗi luật sư ghi rõ ngôn ngữ làm việc thành thạo và mảng chuyên sâu để bạn trao đổi trực tiếp thuận lợi nhất.
          </p>
        </div>

        <div
          className="flex gap-6 overflow-x-auto [scroll-snap-type:x_mandatory] pb-4 [&::-webkit-scrollbar]:hidden"
          ref={lawyersRailRef}
        >
          {LAWYERS_DATA.map((lw, idx) => {
            const hairColor = HAIR_COLORS[lw.hairIndex];
            return (
              <article
                key={idx}
                className="flex-[0_0_calc(80%)] sm:flex-[0_0_calc(45%)] lg:flex-[0_0_calc(25%-18px)] [scroll-snap-align:start] bg-white border border-[#e7dcc3] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <svg viewBox="0 0 100 125" aria-hidden="true" className="w-full aspect-[4/5] block border-b-2 border-[#c29a45]">
                  <defs>
                    <linearGradient id={`grad-lw-${idx}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#2c4a88" />
                      <stop offset="1" stopColor="#0b1d3f" />
                    </linearGradient>
                  </defs>
                  <rect width="100" height="125" fill={`url(#grad-lw-${idx})`} />
                  <circle cx="50" cy="52" r="40" fill="#f0d28a" opacity=".12" />
                  {!lw.isMale && <path d="M28 62c-7-34 11-48 22-48s29 14 22 48v30H28z" fill={hairColor} />}
                  <path d="M6 125c0-30 16-42 44-44 28 2 44 14 44 44z" fill="#0d121c" />
                  <path d="M38 82l-10 43M62 82l10 43" stroke="#f0d28a" strokeWidth=".8" fill="none" opacity=".6" />
                  <path d="M38 82l12 16 12-16v14l-12 29-12-29z" fill="#f3f5f9" />
                  <path d="M47 96h6l3 29h-12z" fill="#a3171e" />
                  <ellipse cx="50" cy="52" rx="15" ry="19" fill="#e0b293" />
                  <path d="M34 48c-2-20 32-20 32 0-6-9-26-9-32 0z" fill={hairColor} />
                </svg>
                <div className="p-5">
                  <h3 className="font-royal font-bold text-xl text-[#0b1d3f]">{lw.name}</h3>
                  <small className="block text-xs text-[#5b6174] mt-1 mb-3">{lw.role}</small>
                  <div className="flex gap-1.5 mb-3 flex-wrap">
                    {lw.langs.map((l, lIdx) => (
                      <span key={lIdx} className="border border-[#c29a45] text-[#c29a45] font-semibold text-[10px] px-2 py-0.5">
                        {l}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-[#5b6174] m-0 mb-3 pt-3 border-t border-[#e7dcc3] leading-relaxed">
                    {lw.field}
                  </p>
                  <a href="#lienhe" className="text-xs font-semibold text-[#a3171e] hover:underline">
                    Liên hệ luật sư &rarr;
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="flex justify-end gap-2.5 mt-6">
          <button
            type="button"
            className="w-11 h-11 bg-[#0b1d3f] text-[#f0d28a] hover:bg-[#a3171e] hover:text-white transition-colors grid place-items-center cursor-pointer"
            onClick={() => scrollRail(-1)}
            aria-label="Luật sư trước"
          >
            &larr;
          </button>
          <button
            type="button"
            className="w-11 h-11 bg-[#0b1d3f] text-[#f0d28a] hover:bg-[#a3171e] hover:text-white transition-colors grid place-items-center cursor-pointer"
            onClick={() => scrollRail(1)}
            aria-label="Luật sư sau"
          >
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
