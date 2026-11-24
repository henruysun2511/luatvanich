import React from "react";
import Link from "next/link";
import { ChevronRight, Building2, MapPin } from "lucide-react";

interface OfficesHeroSectionProps {
  lang: string;
}

export function OfficesHeroSection({ lang }: OfficesHeroSectionProps) {
  const isZh = lang === "zh-CN";

  return (
    <div className="w-full bg-[#f8f6f0]">
      <section className="relative overflow-hidden border-b border-[#e7dcc3] py-16 md:py-24 lg:py-28">
        {/* Hán tự Watermark chìm phía sau */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -bottom-10 select-none font-serif text-[180px] md:text-[280px] font-bold text-[#c29a45]/10 leading-none"
        >
          联
        </div>

        {/* Hoa văn dải viền hoàng gia trên đỉnh */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#85151b] via-[#c29a45] to-[#85151b]" />

        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#718096] mb-6 font-sans">
            <Link
              href={`/${lang}`}
              className="hover:text-[#85151b] transition-colors"
            >
              {isZh ? "首页" : "Trang chủ"}
            </Link>
            <ChevronRight className="size-3 text-[#c29a45]" />
            <span className="text-[#06122b] font-medium">
              {isZh ? "办公网络与联系" : "Mạng lưới văn phòng"}
            </span>
          </nav>

          {/* Badge phân loại */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#c29a45]/60 text-xs font-semibold text-[#85151b] uppercase tracking-wider mb-5 shadow-xs">
            <Building2 className="size-3.5 text-[#c29a45]" />
            <span>{isZh ? "实体网络 • 跨境协同" : "Mạng lưới trụ sở • Hiện diện trực tiếp"}</span>
          </div>

          {/* Tiêu đề chính */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-royal font-bold text-[#06122b] tracking-tight leading-[1.2] max-w-4xl">
            {isZh ? (
              <>
                覆盖中越关键口岸与 <span className="text-[#85151b]">核心经济枢纽的实体网络</span>
              </>
            ) : (
              <>
                Mạng lưới Hiện diện Trực tiếp tại{" "}
                <span className="text-[#85151b]">Việt Nam &amp; Trung Quốc</span>
              </>
            )}
          </h1>

          {/* Phụ đề Hán tự */}
          <div className="mt-2 text-sm md:text-base font-hanzi font-semibold text-[#c29a45] tracking-[3px]">
            {isZh ? "河内总部 • 胡志明分部 • 南宁办公室 • 东兴联络处" : "河内总部 • 胡志明分部 • 广西要冲 • 边境口岸"}
          </div>

          {/* Đoạn mô tả định vị */}
          <p className="mt-5 text-sm sm:text-base text-[#4a5568] leading-relaxed max-w-3xl">
            {isZh
              ? "依托在越南河内、胡志明市及中国南宁等关键经贸重镇布局的实体机构，万益构建起无缝衔接的跨境响应机制，随时随地为客户提供本土化、面对面与高效率的综合法律服务。"
              : "Hệ thống văn phòng đại diện và cơ sở liên kết chiến lược tại các trung tâm kinh tế và cửa khẩu mậu dịch trọng yếu, sẵn sàng tiếp nhận và hỗ trợ khách hàng trực tiếp tại chỗ."}
          </p>

          {/* 4 địa bàn trọng tâm dạng Pill */}
          <div className="mt-8 pt-6 border-t border-[#e7dcc3]/80 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#e7dcc3] text-xs text-[#06122b] font-medium shadow-2xs">
              <MapPin className="size-3.5 text-[#85151b]" />
              <span>{isZh ? "河内总部 (越南政经枢纽)" : "Trụ sở Hà Nội (Việt Nam)"}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#e7dcc3] text-xs text-[#06122b] font-medium shadow-2xs">
              <MapPin className="size-3.5 text-[#85151b]" />
              <span>{isZh ? "胡志明市代表处 (南部商业核心)" : "Chi nhánh TP. Hồ Chí Minh"}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#e7dcc3] text-xs text-[#06122b] font-medium shadow-2xs">
              <MapPin className="size-3.5 text-[#c29a45]" />
              <span>{isZh ? "南宁办公室 (中国-东盟桥头堡)" : "Văn phòng Nam Ninh (Quảng Tây)"}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#e7dcc3] text-xs text-[#06122b] font-medium shadow-2xs">
              <MapPin className="size-3.5 text-[#c29a45]" />
              <span>{isZh ? "东兴联络点 (边境通关口岸)" : "Cửa khẩu Đông Hưng"}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
