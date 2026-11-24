"use client";

import React from "react";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { WORKFLOW_STEPS } from "../constants/home.constants";

export function LegalWorkflowSection() {
  return (
    <section className="py-24 bg-[#fffdf8] relative overflow-hidden scroll-mt-20" id="quytrinh">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
          <div>
            <EyebrowBadge hz="03" text="Quy trình" />
            <h2 className="heading-royal text-3xl sm:text-4xl lg:text-5xl mt-3">
              Một vụ việc diễn ra như thế nào
            </h2>
          </div>
          <p className="text-sm text-[#5b6174] m-0 leading-relaxed">
            Mọi bước đều có văn bản và thời hạn rõ ràng để doanh nghiệp dễ dàng theo dõi tiến độ.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto pl-8 sm:pl-0">
          <div className="absolute left-8 sm:left-[150px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#c29a45] via-[#a3171e] to-[#c29a45]" />
          {WORKFLOW_STEPS.map((step, idx) => (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-[150px_1fr] pb-12 last:pb-0 items-start">
              <div className="sm:pr-9 sm:text-right pb-2 sm:pb-0">
                <span className="block font-sans text-xs uppercase tracking-wider text-[#a3171e] font-semibold">
                  {step.time}
                </span>
                <span className="font-royal font-bold text-xl text-[#0b1d3f]">
                  {step.tag}
                </span>
              </div>
              <div className="sm:pl-9 relative">
                <div className="absolute -left-[39px] sm:-left-[5px] top-1.5 w-2.5 h-2.5 bg-gradient-to-br from-[#f0d28a] to-[#c29a45] border-2 border-[#a3171e] rotate-45" />
                <h3 className="font-royal font-bold text-2xl text-[#0b1d3f] mb-1">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5b6174] m-0 max-w-lg leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
