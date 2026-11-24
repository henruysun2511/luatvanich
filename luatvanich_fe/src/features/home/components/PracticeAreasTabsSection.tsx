"use client";

import React, { useState, useEffect } from "react";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { TABS_DATA } from "../constants/home.constants";

interface PracticeAreasTabsSectionProps {
  initialTab?: number;
}

export function PracticeAreasTabsSection({ initialTab = 0 }: PracticeAreasTabsSectionProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const handleTabEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ tabIndex: number }>;
      if (customEvent.detail && typeof customEvent.detail.tabIndex === "number") {
        setActiveTab(customEvent.detail.tabIndex);
        const el = document.getElementById("linhvuc");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("vanich-select-tab", handleTabEvent);
    return () => window.removeEventListener("vanich-select-tab", handleTabEvent);
  }, []);

  return (
    <section className="py-24 bg-[#fffdf8] relative overflow-hidden scroll-mt-20" id="linhvuc">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
          <div>
            <EyebrowBadge hz="01" text="Lĩnh vực" />
            <h2 className="heading-royal text-3xl sm:text-4xl lg:text-5xl mt-3">
              Chọn đúng vấn đề, gặp đúng luật sư
            </h2>
          </div>
          <p className="text-sm text-[#5b6174] m-0 leading-relaxed">
            Mỗi lĩnh vực có luật sư phụ trách riêng, cùng quy trình và mốc thời gian được báo trước rõ ràng.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#e7dcc3] bg-white shadow-xl">
          {/* Cột trái: Tab list */}
          <div className="lg:col-span-4 border-r border-[#e7dcc3] flex lg:flex-col overflow-x-auto lg:overflow-visible">
            {TABS_DATA.map((tab, idx) => (
              <button
                key={idx}
                type="button"
                className={`w-full flex justify-between items-center p-5 sm:p-6 text-left border-b border-[#e7dcc3] transition-colors font-sans text-xs sm:text-sm font-semibold whitespace-nowrap lg:whitespace-normal cursor-pointer ${
                  activeTab === idx
                    ? "bg-gradient-to-r from-[#0b1d3f] to-[#16336a] text-white shadow-[inset_4px_0_0_#a3171e]"
                    : "text-[#0f1b33] hover:bg-[#fbf7ee]"
                }`}
                onClick={() => setActiveTab(idx)}
              >
                <span>{tab.title}</span>
                <span className={`font-hanzi font-bold text-base ${activeTab === idx ? "text-[#f0d28a]" : "text-[#c29a45]"}`}>
                  {tab.hanzi}
                </span>
              </button>
            ))}
          </div>

          {/* Cột phải: Tab panel */}
          <div className="lg:col-span-8 p-8 sm:p-12 relative overflow-hidden bg-gradient-to-b from-white to-[#fffaf0]">
            <div className="absolute right-6 -bottom-10 font-hanzi font-bold text-[200px] text-[#0b1d3f]/5 select-none pointer-events-none">
              {TABS_DATA[activeTab].hanzi[0]}
            </div>
            <h3 className="font-royal font-bold text-3xl sm:text-4xl text-[#0b1d3f] mb-3">
              {TABS_DATA[activeTab].title}
            </h3>
            <p className="text-sm text-[#5b6174] max-w-lg mb-6 leading-relaxed">
              {TABS_DATA[activeTab].desc}
            </p>
            <ul className="space-y-3 mb-8 max-w-lg">
              {TABS_DATA[activeTab].points.map((pt, pIdx) => (
                <li key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#0f1b33]">
                  <span className="w-2 h-2 bg-[#a3171e] rotate-45 shrink-0 mt-1.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-10 pt-4 border-t border-[#e7dcc3]">
              <div>
                <span className="text-[12px] text-[#5b6174] block">Thời gian</span>
                <b className="font-semibold text-sm text-[#0f1b33]">
                  {TABS_DATA[activeTab].time}
                </b>
              </div>
              <div>
                <span className="text-[12px] text-[#5b6174] block">Hình thức phí</span>
                <b className="font-semibold text-sm text-[#0f1b33]">
                  {TABS_DATA[activeTab].fee}
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
