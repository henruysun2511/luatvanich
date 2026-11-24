"use client";

import React from "react";
import Link from "next/link";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { ChevronRight, Award, ShieldCheck, Scale, Users, Gavel, Star } from "lucide-react";
import { SealStamp } from "@/components/ui/seal-stamp";

interface LawyersHeroSectionProps {
  lang: string;
}

export function LawyersHeroSection({ lang }: LawyersHeroSectionProps) {
  const isZh = lang === "zh-CN";

  return (
    <section className="relative bg-gradient-to-br from-[#060c18] via-[#0b162c] to-[#122340] text-white overflow-hidden py-20 lg:py-28 min-h-[620px] flex items-center">
      {/* 1. Lưới hình học sang trọng */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #f0d28a 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
        aria-hidden="true"
      />

      {/* 2. Chữ Hán rỗng nét khổng lồ 律 (Luật) */}
      <div
        className="absolute -right-8 -bottom-20 font-serif font-bold text-[240px] lg:text-[380px] text-transparent select-none pointer-events-none z-[1] leading-none whitespace-nowrap"
        style={{ WebkitTextStroke: "1px rgba(240, 210, 138, 0.16)" }}
        aria-hidden="true"
      >
        律
      </div>

      {/* 3. Dải viền hoàng gia trên đỉnh */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c29a45] via-[#f0d28a] to-[#c29a45]" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-[2] w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#8d9bb5] mb-8 font-sans">
          <Link href={`/${lang}`} className="hover:text-[#f0d28a] transition-colors">
            {isZh ? "首页" : "Trang chủ"}
          </Link>
          <ChevronRight className="size-3 text-[#c29a45]" />
          <span className="text-[#f0d28a] font-medium tracking-wide">
            {isZh ? "律师团队" : "Đội ngũ luật sư"}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* CỘT TRÁI: Typography Hoàng Gia & Thông điệp */}
          <div className="lg:col-span-7 space-y-6">
            <EyebrowBadge
              hz={isZh ? "资深法匠" : "HỘI ĐỒNG LUẬT GIA"}
              text={isZh ? "中越双语涉外专家" : "ĐỘI NGŨ LUẬT SƯ & CHUYÊN GIA SONG NGỮ"}
              variant="tag"
            />

            <h1 className="font-royal text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight text-white">
              {isZh ? (
                <>
                  深谙两国法度与商道的{" "}
                  <i className="not-italic bg-gradient-to-r from-[#f6dc98] via-[#c29a45] to-[#f6dc98] bg-clip-text text-transparent">
                    资深跨国法律精英
                  </i>
                </>
              ) : (
                <>
                  Đội ngũ Luật sư &amp; Chuyên gia{" "}
                  <i className="not-italic bg-gradient-to-r from-[#f6dc98] via-[#c29a45] to-[#f6dc98] bg-clip-text text-transparent">
                    Bản Lĩnh Tranh Tụng
                  </i>{" "}
                  Việt – Trung
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-[#9ba8c2] max-w-xl leading-relaxed">
              {isZh
                ? "汇集资深合伙人、国际商事仲裁员及跨境实战律师。团队精通越中两地法律规则、司法惯例与语言思维，以恪尽职守之操守为跨国客户化解深层风险。"
                : "Hội tụ các luật sư thành viên, trọng tài viên thương mại quốc tế và chuyên gia tư vấn song ngữ am hiểu sâu sắc hệ thống tư pháp, tập quán thương mại và rào cản ngôn ngữ của cả hai quốc gia."}
            </p>

            {/* Checklist bảo chứng */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#d2dcfa]">
              <li className="flex items-center gap-2.5">
                <span className="flex items-center justify-center size-4 rounded-full bg-[#f0d28a]/20 text-[#f0d28a] font-bold text-[11px]">✦</span>
                <span>{isZh ? "国际商事仲裁员主理案件" : "Trọng tài viên & Luật sư sáng lập"}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex items-center justify-center size-4 rounded-full bg-[#f0d28a]/20 text-[#f0d28a] font-bold text-[11px]">✦</span>
                <span>{isZh ? "中国与越南双向执业背景" : "Kinh nghiệm tư vấn song phương"}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex items-center justify-center size-4 rounded-full bg-[#f0d28a]/20 text-[#f0d28a] font-bold text-[11px]">✦</span>
                <span>{isZh ? "胜诉及成功和解率领先" : "Tỷ lệ hòa giải & bảo vệ thành công cao"}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex items-center justify-center size-4 rounded-full bg-[#f0d28a]/20 text-[#f0d28a] font-bold text-[11px]">✦</span>
                <span>{isZh ? "全程保密，恪守职业道德" : "Bảo mật tuyệt đối thông tin khách hàng"}</span>
              </li>
            </ul>

            {/* Nút hành động */}
            <div className="flex flex-wrap items-center gap-5 pt-4">
              <Link href={`/${lang}#lienhe`} className="btn-royal shadow-lg">
                {isZh ? "预约指定律师" : "Gặp gỡ luật sư chuyên trách"} &rarr;
              </Link>
              <Link
                href={`/${lang}#doingu`}
                className="font-medium text-xs sm:text-sm text-[#f0d28a] border-b border-[#f0d28a]/60 hover:text-white hover:border-white transition-colors pb-0.5"
              >
                {isZh ? "浏览在册律师名录" : "Xem danh bạ luật sư"}
              </Link>
            </div>
          </div>

          {/* CỘT PHẢI: Thẻ Phẩm Hàm Luật Gia (Senior Counsel Insignia Card) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-gradient-to-b from-[#0e1d38] to-[#081224] border border-[#f0d28a]/45 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.55)] relative backdrop-blur-xs">
              {/* Header thẻ */}
              <div className="flex items-center justify-between pb-4 border-b border-[#f0d28a]/30">
                <div className="flex items-center gap-3">
                  <SealStamp char="万" size="md" variant="gold" className="w-10 h-10 text-[20px]" />
                  <div>
                    <h3 className="font-royal font-bold text-sm text-white tracking-wider">
                      {isZh ? "万益涉外法官团队" : "HỘI ĐỒNG TƯ VẤN CẤP CAO"}
                    </h3>
                    <p className="text-[10px] text-[#c29a45] font-hanzi tracking-[2px]">万益律师事务所</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-[#a3171e] text-white">
                  EST. 1996
                </span>
              </div>

              {/* Thông số danh dự */}
              <div className="grid grid-cols-2 gap-3 py-5">
                <div className="bg-[#050e20] p-3.5 border border-[#c29a45]/25">
                  <div className="flex items-center gap-1.5 text-xs text-[#f0d28a] mb-1">
                    <Scale className="size-3.5" />
                    <span>Thâm niên</span>
                  </div>
                  <p className="text-xl font-royal font-bold text-white">28+ Năm</p>
                  <p className="text-[10px] text-[#7d8ca9] mt-0.5">Thực chiến tư vấn &amp; tố tụng</p>
                </div>

                <div className="bg-[#050e20] p-3.5 border border-[#c29a45]/25">
                  <div className="flex items-center gap-1.5 text-xs text-[#f0d28a] mb-1">
                    <Award className="size-3.5" />
                    <span>Chứng chỉ</span>
                  </div>
                  <p className="text-xl font-royal font-bold text-white">Song Phương</p>
                  <p className="text-[10px] text-[#7d8ca9] mt-0.5">Việt Nam &amp; Trọng tài quốc tế</p>
                </div>

                <div className="bg-[#050e20] p-3.5 border border-[#c29a45]/25">
                  <div className="flex items-center gap-1.5 text-xs text-[#f0d28a] mb-1">
                    <Gavel className="size-3.5" />
                    <span>Tranh tụng</span>
                  </div>
                  <p className="text-xl font-royal font-bold text-white">1.000+</p>
                  <p className="text-[10px] text-[#7d8ca9] mt-0.5">Vụ việc thụ lý thành công</p>
                </div>

                <div className="bg-[#050e20] p-3.5 border border-[#c29a45]/25">
                  <div className="flex items-center gap-1.5 text-xs text-[#f0d28a] mb-1">
                    <Star className="size-3.5" />
                    <span>Hài lòng</span>
                  </div>
                  <p className="text-xl font-royal font-bold text-white">98%</p>
                  <p className="text-[10px] text-[#7d8ca9] mt-0.5">Tỷ lệ khách hàng gắn bó</p>
                </div>
              </div>

              {/* Tuyên ngôn đạo đức */}
              <div className="pt-3.5 border-t border-[#f0d28a]/20 flex items-center justify-between text-xs">
                <span className="text-[#8d9bb5] italic">Tôn chỉ nghề nghiệp:</span>
                <span className="font-hanzi font-bold text-[#f0d28a] tracking-[2px]">
                  万事以益 &bull; VẠN SỰ DĨ ÍCH
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
