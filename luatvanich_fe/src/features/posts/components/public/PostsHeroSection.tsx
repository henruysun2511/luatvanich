"use client";

import React from "react";
import Link from "next/link";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { ChevronRight, BookOpen, Bookmark, FileText, Sparkles, Download, ArrowUpRight } from "lucide-react";

interface PostsHeroSectionProps {
  lang: string;
}

export function PostsHeroSection({ lang }: PostsHeroSectionProps) {
  const isZh = lang === "zh-CN";

  return (
    <section className="relative bg-gradient-to-br from-[#fcfbf7] via-[#f7f2e4] to-[#ede3cd] text-[#06122b] overflow-hidden py-20 lg:py-28 min-h-[620px] flex items-center border-b border-[#e7dcc3]">
      {/* 1. Lưới vi mô giấy tuyên hoàng gia */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #85151b 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* 2. Chữ Hán rỗng nét khổng lồ 文 (Văn) màu đỏ chu sa son mờ */}
      <div
        className="absolute -right-8 -bottom-20 font-serif font-bold text-[240px] lg:text-[380px] text-transparent select-none pointer-events-none z-[1] leading-none whitespace-nowrap"
        style={{ WebkitTextStroke: "1px rgba(133, 21, 27, 0.14)" }}
        aria-hidden="true"
      >
        文
      </div>

      {/* 3. Dải viền hoàng gia trên đỉnh */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#85151b] via-[#c29a45] to-[#85151b]" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-[2] w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#718096] mb-8 font-sans">
          <Link href={`/${lang}`} className="hover:text-[#85151b] transition-colors">
            {isZh ? "首页" : "Trang chủ"}
          </Link>
          <ChevronRight className="size-3 text-[#c29a45]" />
          <span className="text-[#85151b] font-medium tracking-wide">
            {isZh ? "法律洞察与文章" : "Cẩm nang & Bài viết"}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* CỘT TRÁI: Typography Hoàng Gia & Thông điệp */}
          <div className="lg:col-span-7 space-y-6">
            <EyebrowBadge
              hz={isZh ? "权威洞察" : "THƯ VIỆN NGHIÊN CỨU"}
              text={isZh ? "政策解读与判例精析" : "GÓC NHÌN PHÁP LÝ & CẨM NANG THỰC CHIẾN"}
              variant="tag"
            />

            <h1 className="font-royal text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight text-[#06122b]">
              {isZh ? (
                <>
                  前沿法评、实务指南与{" "}
                  <i className="not-italic bg-gradient-to-r from-[#85151b] via-[#b32027] to-[#85151b] bg-clip-text text-transparent">
                    中越法律政策研究
                  </i>
                </>
              ) : (
                <>
                  Điển Tịch Pháp Lý &amp;{" "}
                  <i className="not-italic bg-gradient-to-r from-[#85151b] via-[#b32027] to-[#85151b] bg-clip-text text-transparent">
                    Cẩm Nang Đầu Tư
                  </i>{" "}
                  Thực Chiến
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-[#4a5568] max-w-xl leading-relaxed">
              {isZh
                ? "汇集万益团队原创的涉外投资政策前瞻、判例深度剖析、双语合同规范指引与跨境合规实务防范，为投资决策者提供具穿透力的智识支持。"
                : "Tổng hợp các bài phân tích chính sách đầu tư mới nhất, bình luận án lệ, chuẩn mực soạn thảo hợp đồng thương mại và cẩm nang phòng ngừa rủi ro pháp lý cho nhà đầu tư tại Việt Nam."}
            </p>

            {/* Nút hành động */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <Link href={`/${lang}#thuatngu`} className="btn-royal shadow-lg">
                {isZh ? "查阅中越法律词典" : "Tra cứu từ điển pháp lý"} &rarr;
              </Link>
              <Link
                href={`/${lang}#tintuc`}
                className="font-medium text-xs sm:text-sm text-[#85151b] border-b border-[#85151b]/60 hover:text-[#06122b] hover:border-[#06122b] transition-colors pb-0.5"
              >
                {isZh ? "浏览最新发表分析" : "Đọc các bài viết mới nhất"}
              </Link>
            </div>

            {/* Checklist bảo chứng 3 cam kết thương hiệu Vạn Ích */}
            <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-4 text-xs text-[#5a6882]">
              <li className="flex items-center gap-2">
                <span className="text-[#85151b] font-bold">&check;</span> {isZh ? "中越双语 • 中文 – Việt" : "Song ngữ Việt – 中文"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#85151b] font-bold">&check;</span> {isZh ? "绝对保密" : "Bảo mật tuyệt đối"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#85151b] font-bold">&check;</span> {isZh ? "接案前明确费用" : "Báo phí trước khi nhận vụ việc"}
              </li>
            </ul>
          </div>

          {/* CỘT PHẢI: Cuốn Thư Điển Lệ & Báo Cáo Chiến Lược (Legal Gazette & Dossier Card) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white border border-[#c29a45]/60 p-6 sm:p-7 shadow-[0_20px_45px_rgba(133,21,27,0.12)] relative">
              {/* Header thẻ */}
              <div className="flex items-center justify-between pb-4 border-b border-[#e7dcc3]">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="size-4 text-[#85151b]" />
                  <span className="font-royal font-bold text-sm text-[#06122b] tracking-wider uppercase">
                    {isZh ? "万益法讯与学术简报" : "BẢN TIN PHÁP LÝ CHIẾN LƯỢC"}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-[#fbf7ee] border border-[#c29a45] text-[#85151b]">
                  QUÝ 1 &bull; 2026
                </span>
              </div>

              {/* Danh sách 3 chuyên đề tiêu biểu */}
              <div className="space-y-3 py-5">
                <div className="p-3 bg-[#fcfbf9] border border-[#e7dcc3] hover:border-[#85151b] transition-colors">
                  <span className="text-[10px] font-semibold text-[#c29a45] uppercase tracking-wider block mb-1">
                    Chuyên đề Đầu tư FDI 2026
                  </span>
                  <p className="text-xs font-bold text-[#06122b] leading-snug">
                    Quy trình thẩm định pháp lý (Due Diligence) doanh nghiệp FDI và rà soát chủ sở hữu hưởng lợi mới.
                  </p>
                </div>

                <div className="p-3 bg-[#fcfbf9] border border-[#e7dcc3] hover:border-[#85151b] transition-colors">
                  <span className="text-[10px] font-semibold text-[#c29a45] uppercase tracking-wider block mb-1">
                    Hợp đồng Song ngữ
                  </span>
                  <p className="text-xs font-bold text-[#06122b] leading-snug">
                    Điều khoản trần phạt vi phạm 8% và điều khoản giải quyết tranh chấp trọng tài xuyên biên giới.
                  </p>
                </div>

                <div className="p-3 bg-[#fcfbf9] border border-[#e7dcc3] hover:border-[#85151b] transition-colors">
                  <span className="text-[10px] font-semibold text-[#c29a45] uppercase tracking-wider block mb-1">
                    Trọng tài Thương mại
                  </span>
                  <p className="text-xs font-bold text-[#06122b] leading-snug">
                    Công nhận và cho thi hành phán quyết trọng tài nước ngoài tại Tòa án Việt Nam.
                  </p>
                </div>
              </div>

              {/* Chân thẻ */}
              <div className="pt-3.5 border-t border-[#e7dcc3] flex items-center justify-between text-xs">
                <span className="text-[#718096]">Được biên soạn bởi:</span>
                <span className="font-royal font-bold text-[#85151b]">Viện Nghiên cứu Pháp lý Vạn Ích</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
