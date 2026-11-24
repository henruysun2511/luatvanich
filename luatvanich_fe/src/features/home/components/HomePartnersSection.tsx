"use client";

import React from "react";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { PARTNERS_DATA } from "../constants/home.constants";

export function HomePartnersSection() {
  return (
    <section className="py-24 bg-[#fbf7ee] relative overflow-hidden" id="doitac">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
          <div>
            <EyebrowBadge hz="合作" text="Đối tác" />
            <h2 className="heading-royal text-3xl sm:text-4xl lg:text-5xl mt-3">
              Đối tác tiêu biểu
            </h2>
          </div>
          <p className="text-sm text-[#5b6174] m-0 leading-relaxed">
            Những doanh nghiệp Việt Nam và Trung Quốc đã tin tưởng giao phó hồ sơ pháp lý chiến lược cho chúng tôi.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {PARTNERS_DATA.map((pt, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-b from-white to-[#fffaf0] border border-[#e7dcc3] p-6 text-center hover:border-[#a3171e] hover:-translate-y-1 transition-all"
            >
              <b
                aria-hidden="true"
                className="w-16 h-16 mx-auto mb-3.5 grid place-items-center outline-1 outline-[#c29a45] outline-offset-4 border border-[#c29a45] bg-gradient-to-b from-white to-[#f8eed6] font-hanzi font-bold text-3xl text-[#a3171e]"
              >
                {pt.hz}
              </b>
              <span className="font-royal font-bold text-lg uppercase text-[#0b1d3f] tracking-wide block">
                {pt.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
