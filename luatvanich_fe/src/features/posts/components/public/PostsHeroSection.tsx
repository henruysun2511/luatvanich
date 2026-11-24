import React from "react";
import Link from "next/link";
import { ChevronRight, BookOpen, Bookmark, FileText, Sparkles } from "lucide-react";

interface PostsHeroSectionProps {
  lang: string;
}

export function PostsHeroSection({ lang }: PostsHeroSectionProps) {
  const isZh = lang === "zh-CN";

  return (
    <div className="w-full bg-[#fdfbf7]">
      <section className="relative overflow-hidden border-b border-[#e7dcc3] py-16 md:py-24 lg:py-28">
        {/* Hán tự Watermark chìm phía sau */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -bottom-10 select-none font-serif text-[180px] md:text-[280px] font-bold text-[#85151b]/5 leading-none"
        >
          文
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
              {isZh ? "法律洞察与文章" : "Cẩm nang & Bài viết"}
            </span>
          </nav>

          {/* Badge phân loại */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#85151b]/30 text-xs font-semibold text-[#85151b] uppercase tracking-wider mb-5 shadow-xs">
            <BookOpen className="size-3.5 text-[#85151b]" />
            <span>{isZh ? "法律洞察 • 实战指南" : "Góc nhìn pháp lý • Cẩm nang"}</span>
          </div>

          {/* Tiêu đề chính */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-royal font-bold text-[#06122b] tracking-tight leading-[1.2] max-w-4xl">
            {isZh ? (
              <>
                前沿法评、实操指南与 <span className="text-[#85151b]">中越法律政策研究</span>
              </>
            ) : (
              <>
                Góc nhìn Pháp lý, Nghiên cứu &amp;{" "}
                <span className="text-[#85151b]">Cẩm nang Đầu tư Thực chiến</span>
              </>
            )}
          </h1>

          {/* Phụ đề Hán tự */}
          <div className="mt-2 text-sm md:text-base font-hanzi font-semibold text-[#c29a45] tracking-[3px]">
            {isZh ? "政策前沿 • 判例评析 • 合同指引 • 合规防范" : "政策解读 • 案例精析 • 规则洞察 • 智库研究"}
          </div>

          {/* Đoạn mô tả với viền đỏ chu sa bên trái */}
          <div className="mt-5 pl-4 border-l-2 border-[#85151b]/60">
            <p className="text-sm sm:text-base text-[#4a5568] leading-relaxed max-w-3xl">
              {isZh
                ? "汇集万益专业律师团队关于中越经贸投资政策更新、外资企业经营合规、涉外知识产权保护、经典诉讼判例剖析及双语合同风险防控的原创权威解读。"
                : "Tổng hợp các bài phân tích chính sách đầu tư mới nhất, bình luận án lệ, chuẩn mực soạn thảo hợp đồng thương mại và hướng dẫn phòng ngừa rủi ro pháp lý cho nhà đầu tư tại Việt Nam."}
            </p>
          </div>

          {/* Tags chuyên đề dạng Pill */}
          <div className="mt-8 pt-6 border-t border-[#e7dcc3]/80 flex flex-wrap items-center gap-2.5 sm:gap-3">
            <span className="text-xs font-semibold text-[#718096] uppercase tracking-wider mr-1">
              {isZh ? "热门专题:" : "Chuyên đề:"}
            </span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#e7dcc3] text-xs text-[#06122b]">
              <Bookmark className="size-3 text-[#c29a45]" />
              <span>{isZh ? "外商直接投资 (FDI)" : "Đầu tư FDI & Doanh nghiệp"}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#e7dcc3] text-xs text-[#06122b]">
              <FileText className="size-3 text-[#c29a45]" />
              <span>{isZh ? "中越双语合同审查" : "Hợp đồng song ngữ Việt - Trung"}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#e7dcc3] text-xs text-[#06122b]">
              <Sparkles className="size-3 text-[#85151b]" />
              <span>{isZh ? "跨境商事仲裁与诉讼" : "Trọng tài & Tranh tụng"}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
