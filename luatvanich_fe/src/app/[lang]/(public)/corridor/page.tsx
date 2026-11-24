import React from "react";
import Link from "next/link";
import { ChevronRight, GitFork, ArrowLeftRight, Landmark, ShieldCheck } from "lucide-react";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function CorridorPage({ params }: Props) {
  const { lang } = await params;
  const isZh = lang === "zh-CN";

  return (
    <div className="w-full bg-[#0a1b3a]">
      {/* HERO SECTION ONLY */}
      <section className="relative overflow-hidden border-b border-[#c29a45]/40 bg-gradient-to-b from-[#0a1b3a] via-[#102347] to-[#1a1528] py-16 md:py-24 lg:py-28 text-white">
        {/* Hán tự Watermark chìm phía sau */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -bottom-10 select-none font-serif text-[190px] md:text-[300px] font-bold text-[#c29a45]/10 leading-none"
        >
          廊
        </div>

        {/* Hoa văn dải viền hoàng gia trên đỉnh */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#85151b] via-[#c29a45] to-[#f0d28a]" />

        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#8d9bb5] mb-6 font-sans">
            <Link
              href={`/${lang}`}
              className="hover:text-[#f0d28a] transition-colors"
            >
              {isZh ? "首页" : "Trang chủ"}
            </Link>
            <ChevronRight className="size-3 text-[#c29a45]" />
            <span className="text-[#f0d28a] font-medium">
              {isZh ? "中越法治走廊" : "Hành lang pháp lý Việt – Trung"}
            </span>
          </nav>

          {/* Badge phân loại */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0b1d3f] border border-[#c29a45]/50 text-xs font-semibold text-[#f0d28a] uppercase tracking-wider mb-5 shadow-xs">
            <GitFork className="size-3.5 text-[#c29a45]" />
            <span>{isZh ? "两廊一圈 • 战略支撑" : "Chiến lược Hành lang pháp lý • Kết nối song phương"}</span>
          </div>

          {/* Tiêu đề chính */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-royal font-bold text-white tracking-tight leading-[1.2] max-w-4xl">
            {isZh ? (
              <>
                中越经贸与跨境产业合作 <span className="text-[#f0d28a]">综合法治走廊</span>
              </>
            ) : (
              <>
                Hành lang Pháp lý Chiến lược{" "}
                <span className="text-[#f0d28a]">Kết nối Giao thương &amp; Đầu tư Việt – Trung</span>
              </>
            )}
          </h1>

          {/* Phụ đề Hán tự */}
          <div className="mt-2 text-sm md:text-base font-hanzi font-semibold text-[#c29a45] tracking-[4px]">
            {isZh ? "两廊一圈 • 跨境产业 • 口岸协同 • 仲裁对接" : "南宁 • 河内 • 海防 • 胡志明市 • 经贸法治走廊"}
          </div>

          {/* Đoạn mô tả định vị */}
          <p className="mt-5 text-sm sm:text-base text-[#9ba8c2] leading-relaxed max-w-3xl">
            {isZh
              ? "依托中国（广西、云南）至越南（河内、海防、胡志明市）的陆海国际大通道，万益打造跨境法治协同平台，致力于保障跨国供应链畅通、大型基础设施项目合规推进及双边经贸纠纷高效化解。"
              : "Nền tảng bảo trợ pháp lý vững chắc cho chuỗi cung ứng sản xuất, logistics xuyên biên giới và các dự án hợp tác kinh tế dọc tuyến 'Hai hành lang, một vành đai kinh tế' giữa Việt Nam và Trung Quốc."}
          </p>

          {/* 3 chỉ số tóm tắt dạng Pill */}
          <div className="mt-8 pt-6 border-t border-[#c29a45]/20 flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0b1d3f]/80 border border-[#c29a45]/40 text-xs text-[#e2e8f0] font-medium">
              <ArrowLeftRight className="size-3.5 text-[#f0d28a]" />
              <span>{isZh ? "南宁-河内-胡志明市全线协同" : "Quảng Tây, Vân Nam ⇋ Hà Nội, Hải Phòng, TP.HCM"}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0b1d3f]/80 border border-[#c29a45]/40 text-xs text-[#e2e8f0] font-medium">
              <Landmark className="size-3.5 text-[#f0d28a]" />
              <span>{isZh ? "双边商事仲裁与投资保护" : "Trọng tài thương mại & Bảo hộ đầu tư song phương"}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0b1d3f]/80 border border-[#c29a45]/40 text-xs text-[#e2e8f0] font-medium">
              <ShieldCheck className="size-3.5 text-[#f0d28a]" />
              <span>{isZh ? "边境海关与通关合规护航" : "Thủ tục Hải quan & Thông quan cửa khẩu"}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
