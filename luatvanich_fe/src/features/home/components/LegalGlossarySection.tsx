"use client";

import React, { useState } from "react";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { GLOSSARY_TERMS } from "../constants/home.constants";

export function LegalGlossarySection() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGlossary = GLOSSARY_TERMS.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.vi.toLowerCase().includes(q) ||
      item.zh.toLowerCase().includes(q) ||
      item.pinyin.toLowerCase().includes(q) ||
      item.note.toLowerCase().includes(q)
    );
  });

  return (
    <section className="py-24 bg-[#fbf7ee] relative overflow-hidden" id="thuatngu">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
          <div>
            <EyebrowBadge hz="02" text="Thuật ngữ song ngữ" />
            <h2 className="heading-royal text-3xl sm:text-4xl lg:text-5xl mt-3">
              Từ điển pháp lý Việt – Trung
            </h2>
          </div>
          <p className="text-sm text-[#5b6174] m-0 leading-relaxed">
            Một chữ dịch lệch có thể làm đổi nghĩa cả điều khoản. Tra nhanh các thuật ngữ thường gặp trong hợp đồng kinh tế.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm thuật ngữ, ví dụ: phạt, 合同, tóuzī…"
            className="flex-1 max-w-md p-3.5 border border-[#e7dcc3] bg-white text-sm text-[#0f1b33] outline-none focus:border-[#a3171e] shadow-xs"
          />
          <small className="text-xs text-[#5b6174] font-medium">
            Tìm thấy {filteredGlossary.length} thuật ngữ phù hợp
          </small>
        </div>

        <div className="overflow-x-auto shadow-md border border-[#e7dcc3] bg-white">
          <table className="w-full border-collapse text-left">
            <thead className="bg-gradient-to-r from-[#0b1d3f] to-[#16336a] text-[#f0d28a] text-[11px] uppercase tracking-wider font-semibold border-b-2 border-[#a3171e]">
              <tr>
                <th className="p-4 w-1/4">Tiếng Việt</th>
                <th className="p-4 w-1/6">中文</th>
                <th className="p-4 w-1/6">Pinyin</th>
                <th className="p-4">Lưu ý khi soạn hợp đồng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7dcc3] text-xs sm:text-sm">
              {filteredGlossary.length > 0 ? (
                filteredGlossary.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#fbf8ef] transition-colors odd:bg-white even:bg-[#fffaf0]">
                    <td className="p-4 font-royal font-bold text-lg text-[#0f1b33]">{row.vi}</td>
                    <td className="p-4 font-hanzi font-bold text-xl text-[#0b1d3f]">{row.zh}</td>
                    <td className="p-4 font-sans italic text-[#a3171e] text-xs sm:text-sm">{row.pinyin}</td>
                    <td className="p-4 text-[#5b6174] leading-relaxed">{row.note}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-sm text-[#5b6174]">
                    Không tìm thấy thuật ngữ phù hợp với từ khóa &ldquo;{searchQuery}&rdquo;.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
