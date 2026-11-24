import React from "react";
import Link from "next/link";
import { ChevronRight, Compass, ShieldCheck, History } from "lucide-react";
import { SealStamp } from "@/components/ui/seal-stamp";

interface AboutHeroSectionProps {
  lang: string;
}

export function AboutHeroSection({ lang }: AboutHeroSectionProps) {
  const isZh = lang === "zh-CN";

  return (
    <div className="w-full bg-[#fbf7ee]">
      <section className="relative overflow-hidden border-b border-[#e7dcc3] py-16 md:py-24 lg:py-28">
        {/* Hán tự Watermark chìm phía sau */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -bottom-10 select-none font-serif text-[190px] md:text-[300px] font-bold text-[#c29a45]/10 leading-none"
        >
          万
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
              {isZh ? "关于万益" : "Về Luật Vạn Ích"}
            </span>
          </nav>

          {/* Badge phân loại */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#c29a45]/60 text-xs font-semibold text-[#85151b] uppercase tracking-wider mb-6 shadow-xs">
            <History className="size-3.5 text-[#c29a45]" />
            <span>{isZh ? "创立于1996 • 跨国积淀" : "Thành lập năm 1996 • Di sản 28 năm"}</span>
          </div>

          {/* Bố cục 2 cột đặc thù cho Trang Giới thiệu */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Cột 1: Thông điệp và tiêu đề (8 cột) */}
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-royal font-bold text-[#06122b] tracking-tight leading-[1.2]">
                {isZh ? (
                  <>
                    逾廿八载深耕，铸就 <span className="text-[#85151b]">中越跨国法律卓越品牌</span>
                  </>
                ) : (
                  <>
                    Hơn Một Phần Tư Thế Kỷ{" "}
                    <span className="text-[#85151b]">Kiến Tạo Uy Tín Pháp Lý Song Phương</span>
                  </>
                )}
              </h1>

              {/* Phụ đề Hán tự */}
              <div className="text-sm md:text-base font-hanzi font-semibold text-[#c29a45] tracking-[4px]">
                {isZh ? "万事以益 • 恪守法道 • 融汇贯通 • 护航远见" : "万事以益 • VẠN SỰ DĨ ÍCH • 1996 - 2026"}
              </div>

              <p className="text-sm sm:text-base text-[#4a5568] leading-relaxed max-w-2xl pt-2">
                {isZh
                  ? "万益律师事务所自1996年创立以来，始终秉承'万事以益'的立所哲学，致力于成为连接中越乃至东盟经贸投资的最值得信赖的涉外法律护航者与制度破壁者。"
                  : "Khởi nguồn từ năm 1996, Hãng luật Vạn Ích là đơn vị tiên phong trong lĩnh vực tư vấn pháp lý thương mại và đầu tư song ngữ giữa Việt Nam và Trung Quốc, bảo vệ tối đa quyền lợi và an toàn dòng vốn xuyên biên giới."}
              </p>

              {/* 3 giá trị cốt lõi */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#e7dcc3] text-xs text-[#06122b] font-medium">
                  <Compass className="size-3.5 text-[#85151b]" />
                  <span>{isZh ? "深谙两国体制与商业环境" : "Thấu hiểu sâu sắc thể chế song phương"}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#e7dcc3] text-xs text-[#06122b] font-medium">
                  <ShieldCheck className="size-3.5 text-[#c29a45]" />
                  <span>{isZh ? "务实笃行，捍卫客户商业利益" : "Hành động vì lợi ích bền vững"}</span>
                </div>
              </div>
            </div>

            {/* Cột 2: Con dấu ấn chương son đỏ & Huy hiệu 1996 (4 cột) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white border border-[#c29a45]/40 shadow-sm relative">
              <SealStamp char="万" size="lg" variant="red" className="w-20 h-20 text-[42px] mb-3 shadow-md" />
              <div className="text-center">
                <span className="block font-royal font-bold text-xl text-[#06122b] tracking-wider">
                  LUẬT VẠN ÍCH
                </span>
                <span className="block text-xs font-hanzi font-semibold text-[#c29a45] tracking-[4px] mt-0.5">
                  万益律师事务所
                </span>
                <span className="inline-block mt-3 px-3 py-1 bg-[#fbf7ee] border border-[#e7dcc3] text-[11px] font-mono text-[#85151b] font-semibold">
                  SINCE 1996 &bull; 28+ YEARS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
