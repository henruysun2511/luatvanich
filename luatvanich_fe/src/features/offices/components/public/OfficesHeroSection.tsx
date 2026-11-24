"use client";

import React from "react";
import Link from "next/link";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { ChevronRight, Building2, MapPin, Phone, Globe, Shield, Clock } from "lucide-react";

interface OfficesHeroSectionProps {
  lang: string;
}

export function OfficesHeroSection({ lang }: OfficesHeroSectionProps) {
  const isZh = lang === "zh-CN";

  return (
    <section className="relative bg-gradient-to-br from-[#061226] via-[#0c1f3c] to-[#142e54] text-white overflow-hidden py-20 lg:py-28 min-h-[620px] flex items-center">
      {/* 1. Lưới tọa độ kinh vĩ tuyến chìm */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #f0d28a 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
        aria-hidden="true"
      />

      {/* 2. Chữ Hán rỗng nét khổng lồ 联 (Liên) */}
      <div
        className="absolute -right-8 -bottom-20 font-serif font-bold text-[240px] lg:text-[380px] text-transparent select-none pointer-events-none z-[1] leading-none whitespace-nowrap"
        style={{ WebkitTextStroke: "1px rgba(194, 154, 69, 0.18)" }}
        aria-hidden="true"
      >
        联
      </div>

      {/* 3. Dải viền hoàng gia trên đỉnh */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#85151b] via-[#c29a45] to-[#f6dc98]" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-[2] w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#9ba8c2] mb-8 font-sans">
          <Link href={`/${lang}`} className="hover:text-[#f0d28a] transition-colors">
            {isZh ? "首页" : "Trang chủ"}
          </Link>
          <ChevronRight className="size-3 text-[#c29a45]" />
          <span className="text-[#f0d28a] font-medium tracking-wide">
            {isZh ? "办公网络与联系" : "Mạng lưới văn phòng"}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* CỘT TRÁI: Typography Hoàng Gia & Thông điệp */}
          <div className="lg:col-span-7 space-y-6">
            <EyebrowBadge
              hz={isZh ? "实体网络" : "MẠNG LƯỚI TRỰC TIẾP"}
              text={isZh ? "中越口岸与核心经贸枢纽" : "HIỆN DIỆN CHIẾN LƯỢC TẠI 4 THÀNH PHỐ"}
              variant="tag"
            />

            <h1 className="font-royal text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight text-white">
              {isZh ? (
                <>
                  覆盖两国枢纽与口岸的{" "}
                  <i className="not-italic bg-gradient-to-r from-[#f6dc98] via-[#c29a45] to-[#f6dc98] bg-clip-text text-transparent">
                    实体跨国法律网络
                  </i>
                </>
              ) : (
                <>
                  Mạng lưới Hiện diện{" "}
                  <i className="not-italic bg-gradient-to-r from-[#f6dc98] via-[#c29a45] to-[#f6dc98] bg-clip-text text-transparent">
                    Trực tiếp &amp; Đa điểm
                  </i>{" "}
                  Việt Nam – Trung Quốc
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-[#b6c0d6] max-w-xl leading-relaxed">
              {isZh
                ? "在越南河内、胡志明市及中国南宁等关键经贸要冲设立实体办公室与联络站，构建无时差、本土化与高效率的跨境现场法律响应体系。"
                : "Hệ thống văn phòng đại diện và cơ sở liên kết chiến lược tại các trung tâm kinh tế và cửa khẩu mậu dịch trọng yếu, sẵn sàng tiếp nhận và hỗ trợ khách hàng trực tiếp tại chỗ."}
            </p>

            {/* Nút hành động */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <Link href={`/${lang}#lienhe`} className="btn-royal shadow-lg">
                {isZh ? "联系最近的办公室" : "Liên hệ văn phòng gần nhất"} &rarr;
              </Link>
              <a
                href="tel:+8615277020681"
                className="font-medium text-xs sm:text-sm text-[#f0d28a] border-b border-[#f0d28a]/60 hover:text-white hover:border-white transition-colors pb-0.5"
              >
                Hotline: +86 152 7702 0681
              </a>
            </div>

            {/* Checklist bảo chứng 3 cam kết thương hiệu Vạn Ích */}
            <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-4 text-xs text-[#c9d3e8]">
              <li className="flex items-center gap-2">
                <span className="text-[#f0d28a] font-bold">✓</span> {isZh ? "中越双语 • 中文 – Việt" : "Song ngữ Việt – 中文"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#f0d28a] font-bold">✓</span> {isZh ? "绝对保密" : "Bảo mật tuyệt đối"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#f0d28a] font-bold">✓</span> {isZh ? "接案前明确费用" : "Báo phí trước khi nhận vụ việc"}
              </li>
            </ul>
          </div>

          {/* CỘT PHẢI: Thẻ Bản Đồ Tọa Độ 4 Trụ Sở (Bilateral Network Coordinates Card) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-gradient-to-b from-[#0b1b36] to-[#071328] border border-[#c29a45]/45 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative backdrop-blur-xs">
              {/* Header thẻ */}
              <div className="flex items-center justify-between pb-4 border-b border-[#c29a45]/30">
                <div className="flex items-center gap-2.5">
                  <Building2 className="size-4 text-[#f0d28a]" />
                  <span className="font-royal font-bold text-sm text-[#f0d28a] tracking-wider uppercase">
                    {isZh ? "实体办公室网络" : "MẠNG LƯỚI TRỤ SỞ CHIẾN LƯỢC"}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" /> ONLINE
                </span>
              </div>

              {/* Danh sách 4 trụ sở */}
              <div className="space-y-3 py-5">
                {[
                  { name: "Trụ sở Hà Nội (Việt Nam)", role: "Trung tâm điều hành & Pháp lý", code: "HQ &bull; HN" },
                  { name: "Chi nhánh TP. Hồ Chí Minh", role: "Thương mại, M&A & Nam Bộ", code: "BR &bull; SGN" },
                  { name: "Văn phòng Nam Ninh (Quảng Tây)", role: "Cầu nối Doanh nghiệp Trung Quốc", code: "CN &bull; NNG" },
                  { name: "Cửa khẩu Đông Hưng (Quảng Ninh)", role: "Logistics & Mậu dịch biên giới", code: "BORDER &bull; DH" },
                ].map((office, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-[#061226]/80 border border-[#c29a45]/20 hover:border-[#f0d28a] transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      <MapPin className="size-4 text-[#f0d28a] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-white">{office.name}</p>
                        <p className="text-[10px] text-[#8d9bb5]">{office.role}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono font-semibold px-2 py-0.5 bg-[#85151b] text-white">
                      {office.code}
                    </span>
                  </div>
                ))}
              </div>

              {/* Chân thẻ */}
              <div className="pt-3.5 border-t border-[#c29a45]/30 flex items-center justify-between text-xs">
                <span className="text-[#9ba8c2]">Đầu mối tư vấn:</span>
                <span className="font-royal font-bold text-[#f0d28a]">LS. Tưởng Nữ Trinh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
