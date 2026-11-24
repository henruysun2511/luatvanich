import React from "react";
import Link from "next/link";
import { ChevronRight, Briefcase, CheckCircle2, Globe, Shield } from "lucide-react";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function LegalServicesPage({ params }: Props) {
  const { lang } = await params;
  const isZh = lang === "zh-CN";

  return (
    <div className="w-full bg-[#fbf7ee]">
      {/* HERO SECTION ONLY */}
      <section className="relative overflow-hidden border-b border-[#e7dcc3] py-16 md:py-24 lg:py-28">
        {/* Hán tự Watermark chìm phía sau */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -bottom-10 select-none font-serif text-[180px] md:text-[280px] font-bold text-[#c29a45]/10 leading-none"
        >
          务
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
              {isZh ? "法律服务" : "Dịch vụ pháp lý"}
            </span>
          </nav>

          {/* Badge phân loại */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#c29a45]/60 text-xs font-semibold text-[#85151b] uppercase tracking-wider mb-5 shadow-xs">
            <Briefcase className="size-3.5 text-[#c29a45]" />
            <span>{isZh ? "法律服务 • 专业委托" : "Dịch vụ pháp lý • Chuyên sâu"}</span>
          </div>

          {/* Tiêu đề chính */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-royal font-bold text-[#06122b] tracking-tight leading-[1.2] max-w-4xl">
            {isZh ? (
              <>
                企业与跨境投资 <span className="text-[#85151b]">全方位法律解决方案</span>
              </>
            ) : (
              <>
                Giải pháp Pháp lý Toàn diện{" "}
                <span className="text-[#85151b]">Doanh nghiệp &amp; Đầu tư Xuyên biên giới</span>
              </>
            )}
          </h1>

          {/* Phụ đề Hán tự */}
          <div className="mt-2 text-sm md:text-base font-hanzi font-semibold text-[#c29a45] tracking-[3px]">
            {isZh ? "跨国商事 • 外商投资 • 诉讼仲裁 • 合同合规" : "外商投资 • 双语合同 • 诉讼仲裁 • 并购重组"}
          </div>

          {/* Đoạn mô tả định vị */}
          <p className="mt-5 text-sm sm:text-base text-[#4a5568] leading-relaxed max-w-3xl">
            {isZh
              ? "依托逾28年跨国法律实务积淀，万益律师事务所专注于为在越中资企业及跨境投资者提供涵盖外商投资准入、双语合同起草审查、跨境争议仲裁解决与合规经营的全流程专业法律保障。"
              : "Hơn 28 năm kinh nghiệm thực chiến giải quyết các thủ tục đầu tư FDI, rà soát đối chiếu hợp đồng song ngữ Việt – Trung, tranh tụng trọng tài quốc tế và thẩm định M&A, bảo vệ quyền lợi tối đa cho doanh nghiệp."}
          </p>

          {/* 3 chỉ số tóm tắt dạng Pill */}
          <div className="mt-8 pt-6 border-t border-[#e7dcc3]/80 flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#e7dcc3] text-xs text-[#06122b] font-medium">
              <CheckCircle2 className="size-3.5 text-[#85151b]" />
              <span>{isZh ? "6大核心法律服务领域" : "6+ Nhóm dịch vụ trọng tâm"}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#e7dcc3] text-xs text-[#06122b] font-medium">
              <Globe className="size-3.5 text-[#c29a45]" />
              <span>{isZh ? "100% 中越双语法律文书" : "100% Hồ sơ đối chiếu song ngữ"}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#e7dcc3] text-xs text-[#06122b] font-medium">
              <Shield className="size-3.5 text-[#85151b]" />
              <span>{isZh ? "河内 • 胡志明市 • 南宁实体协同" : "Hà Nội • TP.HCM • Nam Ninh"}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
