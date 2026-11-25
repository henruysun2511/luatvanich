"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Clock, Calendar, ArrowRight, BookOpen, Send, Check } from "lucide-react";

interface PostsDirectorySectionProps {
  lang: string;
}

interface PostItem {
  id: number;
  title: string;
  category: string;
  hanzi: string;
  date: string;
  readingMinutes: number;
  excerpt: string;
}

const POSTS_DATA: PostItem[] = [
  {
    id: 1,
    title: "Mất tiền đặt cọc thuê nhà xưởng: sai lầm cần tránh khi đặt cọc",
    category: "Thu hồi nợ",
    hanzi: "债",
    date: "25/11/2026",
    readingMinutes: 7,
    excerpt: "Rủi ro lớn khi hợp đồng đặt cọc không rõ điều khoản hoàn trả và hai bản ngôn ngữ lệch nghĩa.",
  },
  {
    id: 2,
    title: "Luật Đầu tư 2025: những thay đổi lớn với nhà đầu tư nước ngoài",
    category: "Đầu tư",
    hanzi: "投",
    date: "20/11/2026",
    readingMinutes: 8,
    excerpt: "Nhiều thay đổi đáng chú ý về điều kiện và thủ tục đầu tư mà nhà đầu tư Trung Quốc cần rà lại.",
  },
  {
    id: 3,
    title: "Chủ sở hữu hưởng lợi: nghĩa vụ kê khai cần biết",
    category: "Doanh nghiệp",
    hanzi: "权",
    date: "14/11/2026",
    readingMinutes: 6,
    excerpt: "Khái niệm chủ sở hữu hưởng lợi ngày càng được siết chặt trong hoạt động doanh nghiệp.",
  },
  {
    id: 4,
    title: "Phong tỏa tài sản “con nợ”: khi nào được yêu cầu",
    category: "Tố tụng",
    hanzi: "封",
    date: "09/11/2026",
    readingMinutes: 6,
    excerpt: "Khi nào chủ nợ được yêu cầu Tòa án áp dụng biện pháp khẩn cấp tạm thời.",
  },
  {
    id: 5,
    title: "Hợp đồng song ngữ Việt – Trung: điểm cần lưu ý",
    category: "Hợp đồng",
    hanzi: "约",
    date: "02/11/2026",
    readingMinutes: 7,
    excerpt: "Xử lý khác biệt ngôn ngữ để tránh tranh chấp về sau, từ điều khoản phạt đến bản ưu tiên.",
  },
  {
    id: 6,
    title: "Giấy phép lao động cho chuyên gia Trung Quốc: hồ sơ cần chuẩn bị",
    category: "Lao động",
    hanzi: "劳",
    date: "28/10/2026",
    readingMinutes: 5,
    excerpt: "Các nhóm giấy tờ thường gặp và những lỗi khiến hồ sơ bị trả lại.",
  },
  {
    id: 7,
    title: "Tin nhắn WeChat có dùng làm chứng cứ được không?",
    category: "Tố tụng",
    hanzi: "证",
    date: "21/10/2026",
    readingMinutes: 6,
    excerpt: "Điều kiện để tin nhắn điện tử được chấp nhận và cách lưu giữ đúng ngay từ đầu.",
  },
  {
    id: 8,
    title: "Thành lập công ty vốn Trung Quốc: năm bước cần nhớ",
    category: "Đầu tư",
    hanzi: "设",
    date: "15/10/2026",
    readingMinutes: 8,
    excerpt: "Từ xin chủ trương đến đăng ký doanh nghiệp, những mốc không nên bỏ sót.",
  },
  {
    id: 9,
    title: "Điều khoản phạt vi phạm: mức trần và cách soạn thảo",
    category: "Hợp đồng",
    hanzi: "罚",
    date: "08/10/2026",
    readingMinutes: 5,
    excerpt: "Vì sao mức phạt ghi ở bản tiếng Trung có thể vượt giới hạn theo luật Việt Nam.",
  },
  {
    id: 10,
    title: "Chấm dứt hợp đồng lao động với người nước ngoài",
    category: "Lao động",
    hanzi: "终",
    date: "01/10/2026",
    readingMinutes: 6,
    excerpt: "Quy trình và những rủi ro nếu chấm dứt sai căn cứ hoặc sai thủ tục.",
  },
  {
    id: 11,
    title: "Trọng tài thương mại hay Tòa án: chọn cơ chế nào?",
    category: "Tố tụng",
    hanzi: "仲",
    date: "24/09/2026",
    readingMinutes: 9,
    excerpt: "So sánh thời gian, chi phí, tính bảo mật và khả năng thi hành.",
  },
  {
    id: 12,
    title: "Thẩm định pháp lý trước khi mua lại doanh nghiệp",
    category: "Doanh nghiệp",
    hanzi: "并",
    date: "17/09/2026",
    readingMinutes: 8,
    excerpt: "Danh mục rà soát và các dấu hiệu cảnh báo trước khi ký thỏa thuận.",
  },
];

const GRADIENTS = [
  "linear-gradient(135deg,#0a1a3a,#25408a)",
  "linear-gradient(135deg,#2a1a3a,#7a2418)",
  "linear-gradient(135deg,#16203a,#3a2a22)",
  "linear-gradient(135deg,#06122b,#122650)",
  "linear-gradient(135deg,#2a1210,#0a1a3a)",
];

const CATEGORIES = [
  { vi: "Tất cả", zh: "全部" },
  { vi: "Đầu tư", zh: "投资" },
  { vi: "Hợp đồng", zh: "合同" },
  { vi: "Thu hồi nợ", zh: "债务追收" },
  { vi: "Tố tụng", zh: "诉讼" },
  { vi: "Lao động", zh: "劳动" },
  { vi: "Doanh nghiệp", zh: "企业" },
];

const TOP_READS = [
  { title: "Mất tiền đặt cọc thuê nhà xưởng", num: "01", slug: "mat-tien-dat-coc-thue-nha-xuong" },
  { title: "Tin nhắn WeChat làm chứng cứ", num: "02", slug: "tin-nhan-wechat-lam-chung-cu" },
  { title: "Luật Đầu tư 2025: điều cần rà lại", num: "03", slug: "luat-dau-tu-2025" },
];

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function PostsDirectorySection({ lang }: PostsDirectorySectionProps) {
  const isZh = lang === "zh";

  const [selectedCat, setSelectedCat] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Filtered list
  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return POSTS_DATA.filter((p) => {
      const matchCat = selectedCat === "Tất cả" || p.category === selectedCat;
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [selectedCat, searchQuery]);

  // If no search and category is 'Tất cả', show featured article on top
  const isFeatureMode = selectedCat === "Tất cả" && !searchQuery.trim();
  const featuredPost = isFeatureMode && filteredPosts.length > 0 ? filteredPosts[0] : null;
  const gridPosts = isFeatureMode ? filteredPosts.slice(1) : filteredPosts;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 4000);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="bg-[#fbf9f4] text-[#121c2d] py-14 lg:py-20 border-t border-[#e2dbce]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        
        {/* Main 2-column layout: Articles (Left) + Sidebar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Filter Pills + Featured Article + Grid + Pagination */}
          <div>
            
            {/* Category Filter Pills (.ch) */}
            <div className="flex gap-2 flex-wrap mb-8">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCat === cat.vi;
                return (
                  <button
                    key={cat.vi}
                    type="button"
                    onClick={() => {
                      setSelectedCat(cat.vi);
                      setVisibleCount(6);
                    }}
                    className={`border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#0b1d3f] text-[#f0d28a] border-[#0b1d3f]"
                        : "bg-white text-[#62708d] border-[#e2dbce] hover:border-[#a3171e] hover:text-[#a3171e]"
                    }`}
                  >
                    {isZh ? cat.zh : cat.vi}
                  </button>
                );
              })}
            </div>

            {/* Featured Article Card (.ft2) */}
            {featuredPost && (
              <div className="mb-10">
                <Link
                  href={`/${lang}/posts/${slugify(featuredPost.title)}`}
                  className="bg-white border border-[#e2dbce] flex flex-col md:flex-row hover:border-[#c29a45] hover:shadow-xl transition-all group overflow-hidden"
                >
                  {/* Cover */}
                  <div
                    style={{ background: GRADIENTS[0] }}
                    className="w-full md:w-80 h-56 md:h-auto shrink-0 relative flex items-center justify-center p-6 overflow-hidden"
                  >
                    <div className="absolute inset-3 border border-[#f0d28a]/40" />
                    <span className="font-chinese text-8xl text-[#e6c984]/90 select-none drop-shadow">
                      {featuredPost.hanzi}
                    </span>
                    <span className="absolute left-0 top-4 bg-[#a3171e] text-white text-[11px] font-semibold uppercase tracking-wider px-3.5 py-1 z-10">
                      {isZh ? `精选 · ${featuredPost.category}` : `Nổi bật · ${featuredPost.category}`}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#8a96a3] uppercase tracking-wider mb-2">
                        <Calendar className="w-3.5 h-3.5 text-[#a3171e]" />
                        <span>{featuredPost.date}</span>
                        <span>·</span>
                        <Clock className="w-3.5 h-3.5 text-[#a3171e]" />
                        <span>{featuredPost.readingMinutes} {isZh ? "分钟阅读" : "phút đọc"}</span>
                      </div>
                      <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#0b1d3f] group-hover:text-[#a3171e] transition-colors leading-tight mb-3">
                        {featuredPost.title}
                      </h2>
                      <p className="text-sm md:text-base text-[#62708d] line-clamp-2 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-[#a3171e] text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                      <span>{isZh ? "阅读文章" : "Đọc bài viết"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Articles Grid (.rc3 / .pg3) */}
            {gridPosts.length === 0 ? (
              <div className="bg-white border border-[#e2dbce] text-center py-14 px-4">
                <BookOpen className="w-8 h-8 text-[#8a96a3] mx-auto mb-3" />
                <p className="text-base text-[#62708d] font-serif">
                  {isZh
                    ? "未找到相关文章。请尝试其他搜索关键词或选择“全部”。"
                    : "Không tìm thấy bài viết nào phù hợp. Vui lòng chọn chuyên mục khác hoặc từ khóa khác."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gridPosts.slice(0, visibleCount).map((post, i) => (
                  <Link
                    key={post.id}
                    href={`/${lang}/posts/${slugify(post.title)}`}
                    className="bg-white border border-[#e2dbce] flex flex-col hover:border-[#c29a45] hover:shadow-lg hover:-translate-y-1 transition-all group"
                  >
                    {/* Cover Header */}
                    <div
                      style={{ background: GRADIENTS[(i + 1) % GRADIENTS.length] }}
                      className="aspect-[3/2] relative flex items-center justify-center overflow-hidden"
                    >
                      <div className="absolute inset-3 border border-[#f0d28a]/40" />
                      <span className="font-chinese text-7xl text-[#e6c984]/90 select-none">
                        {post.hanzi}
                      </span>
                      <span className="absolute left-0 top-3.5 bg-[#a3171e] text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 z-10">
                        {post.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-[#0b1d3f] group-hover:text-[#a3171e] transition-colors leading-snug mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-[#62708d] line-clamp-2 leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-3 text-[11px] text-[#8a96a3] mb-3">
                          <span>{post.date}</span>
                          <span>·</span>
                          <span>{post.readingMinutes} {isZh ? "分钟" : "phút đọc"}</span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[#a3171e] text-xs font-bold uppercase tracking-wider group-hover:gap-2.5 transition-all">
                          <span>{isZh ? "查看详情" : "Xem chi tiết"}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {visibleCount < gridPosts.length && (
              <div className="text-center mt-10">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="bg-gradient-to-b from-[#c4252c] to-[#8f1218] text-white text-xs font-semibold uppercase tracking-widest px-8 py-3.5 shadow-md hover:brightness-110 transition-all cursor-pointer"
                >
                  {isZh ? "加载更多文章" : "Xem thêm bài viết"} ({gridPosts.length - visibleCount})
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Sidebar (.aside) */}
          <aside className="space-y-8 sticky top-24">
            
            {/* Search Box */}
            <div className="bg-white border border-[#e2dbce] p-6 shadow-sm">
              <h4 className="text-[11px] font-bold text-[#a3171e] uppercase tracking-[2.5px] mb-3">
                {isZh ? "文章搜索" : "Tìm kiếm bài viết"}
              </h4>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isZh ? "输入关键词..." : "Tìm bài viết, chủ đề..."}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#fbf9f4] border border-[#d6cdbd] focus:border-[#a3171e] focus:outline-none text-xs text-[#121c2d]"
                />
                <Search className="w-3.5 h-3.5 text-[#8a96a3] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Category Count Box */}
            <div className="bg-white border border-[#e2dbce] p-6 shadow-sm">
              <h4 className="text-[11px] font-bold text-[#a3171e] uppercase tracking-[2.5px] mb-3">
                {isZh ? "文章分类" : "Chuyên mục"}
              </h4>
              <div className="divide-y divide-[#e2dbce]">
                {CATEGORIES.slice(1).map((cat) => {
                  const count = POSTS_DATA.filter((p) => p.category === cat.vi).length;
                  return (
                    <button
                      key={cat.vi}
                      type="button"
                      onClick={() => {
                        setSelectedCat(cat.vi);
                        window.scrollTo({ top: 300, behavior: "smooth" });
                      }}
                      className="w-full py-2.5 flex justify-between items-center text-xs text-[#27324a] hover:text-[#a3171e] transition-colors"
                    >
                      <span className="font-semibold">{isZh ? cat.zh : cat.vi}</span>
                      <span className="font-serif font-bold text-[#c29a45]">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Most Read Box (.box .ll.rd) */}
            <div className="bg-white border border-[#e2dbce] p-6 shadow-sm">
              <h4 className="text-[11px] font-bold text-[#a3171e] uppercase tracking-[2.5px] mb-3">
                {isZh ? "热门阅读" : "Đọc nhiều"}
              </h4>
              <div className="divide-y divide-[#e2dbce]">
                {TOP_READS.map((top) => (
                  <Link
                    key={top.num}
                    href={`/${lang}/posts/${top.slug}`}
                    className="py-3 flex justify-between items-center gap-3 text-xs text-[#27324a] hover:text-[#a3171e] transition-colors group"
                  >
                    <span className="line-clamp-2 leading-relaxed flex-1 font-medium">
                      {top.title}
                    </span>
                    <em className="font-serif font-bold text-sm text-[#c29a45] not-italic shrink-0 group-hover:text-[#a3171e]">
                      {top.num}
                    </em>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription Card (.cb) */}
            <div className="bg-gradient-to-br from-[#0b1d3f] to-[#16336a] text-white p-6 border-t-4 border-t-[#c29a45] shadow-md">
              <b className="block font-serif text-2xl font-bold mb-2">
                {isZh ? "订阅法律快报" : "Nhận bài mới"}
              </b>
              <p className="text-xs text-[#b6c0d6] leading-relaxed mb-4">
                {isZh
                  ? "每月一期中越跨境商事法律变更解读与合规建议，直接发送至您的邮箱。"
                  : "Mỗi tháng một bản tin cập nhật thay đổi pháp luật và phân tích thực tiễn dành cho doanh nghiệp Việt – Trung."}
              </p>

              {newsletterSubscribed ? (
                <div className="flex items-center gap-2 bg-[#a3171e] text-[#fbeed0] p-3 text-xs">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{isZh ? "订阅成功！感谢您的关注。" : "Đăng ký thành công! Cảm ơn bạn."}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2.5">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={isZh ? "输入您的邮箱地址" : "Email của bạn..."}
                    className="w-full px-3.5 py-2.5 bg-white text-[#121c2d] text-xs focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-b from-[#f0d28a] to-[#c29a45] text-[#0b1d3f] font-semibold text-xs uppercase tracking-wider py-2.5 hover:brightness-105 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isZh ? "立即订阅" : "Đăng ký ngay"}</span>
                  </button>
                </form>
              )}
            </div>

          </aside>
        </div>

        {/* Bottom CTA Band (.band) */}
        <div className="mt-20 relative overflow-hidden bg-gradient-to-r from-[#071530] via-[#0b1d3f] to-[#102a58] text-white border-t-4 border-t-[#a3171e] p-8 md:p-12 shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-[#f0d28a] font-chinese text-xs font-bold tracking-[3px] uppercase">
                委托 · 免费初审
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
                Nói chuyện với <i className="text-[#f0d28a] not-italic font-normal">luật sư</i> bằng tiếng Việt hoặc 中文
              </h2>
              <p className="text-[#b6c0d6] text-xs sm:text-sm mt-2">
                Phản hồi trong 24 giờ làm việc · Báo phí trước khi nhận vụ việc
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href="tel:0900123456"
                className="bg-gradient-to-b from-[#f0d28a] to-[#c29a45] text-[#0b1d3f] font-semibold text-xs uppercase tracking-wider px-6 py-3.5 shadow-md hover:brightness-105 transition-all"
              >
                Gọi 0900 123 456
              </a>
              <a
                href="mailto:lienhe@vanichlaw.vn"
                className="border border-white/60 text-white hover:bg-white/10 font-semibold text-xs uppercase tracking-wider px-6 py-3.5 transition-all"
              >
                Gửi email tư vấn
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
