import React from "react";
import Link from "next/link";
import { ChevronRight, Award, Users, Scale, ShieldCheck } from "lucide-react";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function LawyersPage({ params }: Props) {
  const { lang } = await params;
  const isZh = lang === "zh-CN";

  return (
    <div className="w-full bg-[#06122b]">
      {/* HERO SECTION ONLY */}
      <section className="relative overflow-hidden border-b border-[#c29a45]/30 bg-gradient-to-b from-[#08152c] via-[#06122b] to-[#040a17] py-16 md:py-24 lg:py-28 text-white">
        {/* Hán tự Watermark chìm phía sau */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -bottom-12 select-none font-serif text-[190px] md:text-[300px] font-bold text-[#c29a45]/10 leading-none"
        >
          律
        </div>

        {/* Hoa văn dải viền hoàng gia trên đỉnh */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c29a45] via-[#f0d28a] to-[#c29a45]" />

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
              {isZh ? "律师团队" : "Đội ngũ luật sư"}
            </span>
          </nav>

          {/* Badge phân loại */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0b1d3f] border border-[#c29a45]/50 text-xs font-semibold text-[#f0d28a] uppercase tracking-wider mb-5 shadow-xs">
            <Users className="size-3.5 text-[#c29a45]" />
            <span>{isZh ? "专业团队 • 资深法匠" : "Đội ngũ luật sư • Chuyên gia"}</span>
          </div>

          {/* Tiêu đề chính */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-royal font-bold text-white tracking-tight leading-[1.2] max-w-4xl">
            {isZh ? (
              <>
                深谙中越两地制度的 <span className="text-[#f0d28a]">涉外律师与法律专家团队</span>
              </>
            ) : (
              <>
                Đội ngũ Luật sư &amp; Chuyên gia{" "}
                <span className="text-[#f0d28a]">Song ngữ Việt – Trung Xuất sắc</span>
              </>
            )}
          </h1>

          {/* Phụ đề Hán tự */}
          <div className="mt-2 text-sm md:text-base font-hanzi font-semibold text-[#c29a45] tracking-[4px]">
            {isZh ? "万益法匠 • 融通两国 • 恪尽职守 • 益己益人" : "专业精湛 • 德业双馨 • 贯通中越 • 守望正义"}
          </div>

          {/* Đoạn mô tả định vị */}
          <p className="mt-5 text-sm sm:text-base text-[#9ba8c2] leading-relaxed max-w-3xl">
            {isZh
              ? "万益团队汇聚了资深合伙人、国际商事仲裁员、双语法律专家及各领域骨干律师。团队成员均精通越中两地法律架构、商业习惯与沟通语境，以恪尽职守之态度为客户跨国发展护航。"
              : "Hội tụ các luật sư thành viên, trọng tài viên thương mại quốc tế và chuyên gia tư vấn song ngữ am hiểu sâu sắc hệ thống tư pháp, tập quán thương mại và rào cản ngôn ngữ của cả hai quốc gia."}
          </p>

          {/* 3 chỉ số tóm tắt dạng Pill */}
          <div className="mt-8 pt-6 border-t border-[#c29a45]/20 flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0b1d3f]/80 border border-[#c29a45]/40 text-xs text-[#e2e8f0] font-medium">
              <Scale className="size-3.5 text-[#f0d28a]" />
              <span>{isZh ? "国际商事仲裁员主理" : "Trọng tài viên & Luật sư sáng lập"}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0b1d3f]/80 border border-[#c29a45]/40 text-xs text-[#e2e8f0] font-medium">
              <Award className="size-3.5 text-[#f0d28a]" />
              <span>{isZh ? "越中双向执业背景" : "Chứng chỉ & Kinh nghiệm song phương"}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0b1d3f]/80 border border-[#c29a45]/40 text-xs text-[#e2e8f0] font-medium">
              <ShieldCheck className="size-3.5 text-[#f0d28a]" />
              <span>{isZh ? "以法为本 • 诚信为魂" : "Đạo đức nghề nghiệp - Vạn sự dĩ ích"}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
