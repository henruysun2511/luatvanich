"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, HelpCircle, CheckCircle2 } from "lucide-react";

interface LegalServicesDirectorySectionProps {
  lang: string;
}

interface ServiceItem {
  id: string;
  hanzi: string;
  title: string;
  desc: string;
  tags: string[];
  duration: string;
  category: "dn" | "tc" | "ld";
  slug: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "01",
    hanzi: "投",
    title: "Đầu tư nước ngoài",
    desc: "Từ xin chủ trương đến khi doanh nghiệp đi vào hoạt động ổn định và tuân thủ các quy định hiện hành.",
    tags: ["Giấy chứng nhận", "Cơ cấu vốn", "Tuân thủ"],
    duration: "30 – 60 ngày",
    category: "dn",
    slug: "dau-tu-nuoc-ngoai",
  },
  {
    id: "02",
    hanzi: "约",
    title: "Hợp đồng song ngữ",
    desc: "Soạn thảo và đối chiếu chặt chẽ để bản Việt và bản Trung cùng một nghĩa, ngăn ngừa tranh chấp.",
    tags: ["Đối chiếu", "Bản ưu tiên", "Phụ lục"],
    duration: "3 – 7 ngày",
    category: "dn",
    slug: "hop-dong-song-ngu",
  },
  {
    id: "03",
    hanzi: "企",
    title: "Doanh nghiệp & tuân thủ",
    desc: "Thành lập, quản trị, kê khai chủ sở hữu hưởng lợi và rà soát tuân thủ định kỳ cho doanh nghiệp.",
    tags: ["Thành lập", "Quản trị", "Kê khai"],
    duration: "1 – 4 tuần",
    category: "dn",
    slug: "doanh-nghiep-va-tuan-thu",
  },
  {
    id: "04",
    hanzi: "并",
    title: "Mua bán & sáp nhập",
    desc: "Thẩm định pháp lý toàn diện, đàm phán hợp đồng chuyển nhượng và hoàn tất giao dịch an toàn.",
    tags: ["Thẩm định", "Đàm phán", "Chuyển nhượng"],
    duration: "2 – 6 tháng",
    category: "dn",
    slug: "mua-ban-va-sap-nhap",
  },
  {
    id: "05",
    hanzi: "权",
    title: "Sở hữu trí tuệ",
    desc: "Đăng ký bảo hộ nhãn hiệu, bản quyền tác giả và xử lý quyết liệt các hành vi xâm phạm quyền sở hữu.",
    tags: ["Nhãn hiệu", "Bản quyền", "Xâm phạm"],
    duration: "2 – 8 tuần",
    category: "dn",
    slug: "so-huu-tri-tue",
  },
  {
    id: "06",
    hanzi: "诉",
    title: "Tranh tụng & trọng tài",
    desc: "Đại diện bảo vệ quyền và lợi ích hợp pháp tại Tòa án và các trung tâm trọng tài thương mại quốc tế.",
    tags: ["Tòa án", "Trọng tài", "Thi hành án"],
    duration: "Theo vụ việc",
    category: "tc",
    slug: "tranh-tung-va-trong-tai",
  },
  {
    id: "07",
    hanzi: "债",
    title: "Thu hồi nợ",
    desc: "Kết hợp đàm phán thiện chí, thông báo pháp lý cảnh báo và khởi kiện cưỡng chế thu hồi công nợ.",
    tags: ["Đàm phán", "Khởi kiện", "Thi hành"],
    duration: "2 – 6 tháng",
    category: "tc",
    slug: "thu-hoi-no",
  },
  {
    id: "08",
    hanzi: "劳",
    title: "Lao động & nhân sự",
    desc: "Xây dựng nội quy lao động, xin giấy phép lao động chuyên gia nước ngoài và giải quyết tranh chấp.",
    tags: ["Hợp đồng", "Giấy phép", "Kỷ luật"],
    duration: "1 – 4 tuần",
    category: "ld",
    slug: "lao-dong-va-nhan-su",
  },
];

const CATEGORY_TABS = [
  { id: "all", vi: "Tất cả dịch vụ", zh: "全部服务" },
  { id: "dn", vi: "Đầu tư & doanh nghiệp", zh: "投资与企业" },
  { id: "tc", vi: "Tranh chấp & Tố tụng", zh: "争议与诉讼" },
  { id: "ld", vi: "Lao động & nhân sự", zh: "劳动与人事" },
];

const SITUATIONS = [
  { text: "Sắp ký hợp đồng với đối tác Trung Quốc", targetIndex: 1 },
  { text: "Muốn đầu tư hoặc mở công ty tại Việt Nam", targetIndex: 0 },
  { text: "Đối tác chậm hoặc không thanh toán nợ", targetIndex: 6 },
  { text: "Có tranh chấp cần đưa ra Tòa án hoặc trọng tài", targetIndex: 5 },
  { text: "Muốn mua lại một doanh nghiệp", targetIndex: 3 },
  { text: "Cần thuê chuyên gia nước ngoài làm việc", targetIndex: 7 },
];

export function LegalServicesDirectorySection({ lang }: LegalServicesDirectorySectionProps) {
  const isZh = lang === "zh";

  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [activeSituationIndex, setActiveSituationIndex] = useState(0);

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (activeCategory === "all") return true;
    return s.category === activeCategory;
  });

  const recommendedService = SERVICES_DATA[SITUATIONS[activeSituationIndex].targetIndex];

  return (
    <div className="bg-[#fbf9f4] text-[#121c2d] border-t border-[#e2dbce]">
      
      {/* Sticky Filter Subnav (.sn) */}
      <nav className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-[#e2dbce] shadow-sm">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-3 flex flex-wrap justify-between items-center gap-4">
          
          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORY_TABS.map((tab) => {
              const isSelected = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#0b1d3f] text-[#f0d28a] border-[#0b1d3f]"
                      : "bg-white text-[#62708d] border-[#e2dbce] hover:border-[#a3171e] hover:text-[#a3171e]"
                  }`}
                >
                  {isZh ? tab.zh : tab.vi}
                </button>
              );
            })}
          </div>

          {/* View mode toggle buttons (.vw) */}
          <div className="flex border border-[#e2dbce] bg-white">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                viewMode === "list"
                  ? "bg-[#0b1d3f] text-[#f0d28a]"
                  : "text-[#62708d] hover:text-[#0b1d3f]"
              }`}
            >
              {isZh ? "列表视图" : "Danh sách"}
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[#0b1d3f] text-[#f0d28a]"
                  : "text-[#62708d] hover:text-[#0b1d3f]"
              }`}
            >
              {isZh ? "网格视图" : "Lưới"}
            </button>
          </div>

        </div>
      </nav>

      {/* Services List / Grid Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          
          {viewMode === "list" ? (
            /* LIST VIEW (.sv) */
            <div className="border-t-2 border-t-[#a3171e] divide-y divide-[#e2dbce] bg-white border-x border-b border-[#e2dbce] shadow-sm">
              {filteredServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/${lang}/legal-services/${service.slug}`}
                  className="grid grid-cols-[40px_1fr] sm:grid-cols-[56px_74px_1fr_160px_34px] gap-4 sm:gap-6 items-center p-6 sm:p-8 hover:bg-[#0b1d3f] hover:text-white transition-all group"
                >
                  {/* Number */}
                  <span className="font-sans font-bold text-sm text-[#a3171e] group-hover:text-[#f0d28a] transition-colors">
                    {service.id}
                  </span>

                  {/* Hanzi Watermark Seal */}
                  <span className="hidden sm:block font-chinese font-bold text-4xl text-[#0b1d3f] opacity-80 group-hover:text-[#f0d28a] group-hover:opacity-100 transition-colors select-none text-center">
                    {service.hanzi}
                  </span>

                  {/* Texts */}
                  <div className="col-span-1">
                    <h3 className="font-serif text-2xl font-bold text-[#0b1d3f] group-hover:text-white transition-colors mb-1">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#62708d] group-hover:text-[#b6c0d6] transition-colors max-w-2xl leading-relaxed mb-3">
                      {service.desc}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-[#c29a45] text-[#8e6d23] group-hover:text-[#f0d28a] group-hover:border-[#f0d28a] text-[10.5px] font-semibold px-2 py-0.5 tracking-wider uppercase transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Duration Time */}
                  <div className="hidden sm:block text-right">
                    <small className="block text-[10px] uppercase font-bold tracking-widest text-[#a3171e] group-hover:text-[#f0d28a] transition-colors">
                      {isZh ? "预计周期" : "Thời gian"}
                    </small>
                    <b className="font-serif text-lg font-bold text-[#0b1d3f] group-hover:text-white transition-colors">
                      {service.duration}
                    </b>
                  </div>

                  {/* Arrow */}
                  <span className="text-[#a3171e] group-hover:text-[#f0d28a] group-hover:translate-x-1 transition-all text-xl font-bold text-center">
                    →
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            /* GRID VIEW (.sv.grid) */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/${lang}/legal-services/${service.slug}`}
                  className="bg-white border border-[#e2dbce] p-8 relative hover:border-[#c29a45] hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between"
                >
                  <span className="absolute right-6 top-5 font-chinese font-bold text-5xl text-[#0b1d3f]/15 group-hover:text-[#a3171e]/25 transition-colors select-none">
                    {service.hanzi}
                  </span>

                  <div>
                    <span className="font-sans font-bold text-xs text-[#a3171e] tracking-widest block mb-1">
                      {service.id}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#0b1d3f] group-hover:text-[#a3171e] transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#62708d] leading-relaxed mb-4">
                      {service.desc}
                    </p>
                    <div className="flex gap-1.5 flex-wrap mb-6">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-[#c29a45] text-[#8e6d23] text-[10px] font-semibold px-2 py-0.5 tracking-wider uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#f0ebe0] flex justify-between items-center">
                    <div>
                      <small className="block text-[9.5px] uppercase font-bold tracking-widest text-[#a3171e]">
                        {isZh ? "预计周期" : "Thời gian ước tính"}
                      </small>
                      <b className="font-serif text-sm font-bold text-[#0b1d3f]">
                        {service.duration}
                      </b>
                    </div>
                    <span className="text-[#a3171e] font-semibold text-xs uppercase tracking-wider group-hover:translate-x-1 transition-all flex items-center gap-1">
                      <span>{isZh ? "详情" : "Chi tiết"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Situation Finder Section ("Tôi đang gặp tình huống nào?" - .sec.g) */}
      <section className="bg-white py-16 lg:py-24 border-t border-[#e2dbce]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-[#a3171e] text-xs font-bold tracking-[3px] uppercase mb-2">
                <HelpCircle className="w-4 h-4" />
                <span>{isZh ? "智能指引" : "Chọn nhanh theo nhu cầu"}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0b1d3f]">
                {isZh ? "您当前面临何种法律状况？" : "Tôi đang gặp tình huống nào?"}
              </h2>
            </div>
            <p className="text-[#62708d] text-sm sm:text-base max-w-md">
              {isZh
                ? "选择与您事务最相近的场景，我们将智能推荐对应的法务解决方案。"
                : "Chọn tình huống gần nhất với vụ việc của bạn, Vạn Ích sẽ gợi ý ngay dịch vụ và phương án giải quyết tối ưu."}
            </p>
          </div>

          <div className="bg-[#fbf9f4] border border-[#e2dbce] p-6 sm:p-10 shadow-sm">
            {/* Situation buttons */}
            <div className="flex gap-2.5 flex-wrap mb-8">
              {SITUATIONS.map((sit, idx) => {
                const isActive = activeSituationIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSituationIndex(idx)}
                    className={`border px-4 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#0b1d3f] text-[#f0d28a] border-[#0b1d3f] shadow-sm"
                        : "bg-white text-[#27324a] border-[#e2dbce] hover:border-[#a3171e] hover:text-[#a3171e]"
                    }`}
                  >
                    {sit.text}
                  </button>
                );
              })}
            </div>

            {/* Recommendation Result Card (.rs2) */}
            <div className="bg-gradient-to-br from-[#0b1d3f] to-[#16336a] text-white border-t-4 border-t-[#c29a45] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
              <div className="flex items-center gap-6">
                <span className="font-chinese font-bold text-6xl sm:text-7xl text-[#f0d28a] select-none shrink-0 drop-shadow">
                  {recommendedService.hanzi}
                </span>
                <div>
                  <small className="block text-[11px] font-bold uppercase tracking-[2px] text-[#f0d28a] mb-1">
                    {isZh ? "推荐法务方案" : "Gợi ý dịch vụ phù hợp nhất"}
                  </small>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1.5">
                    {recommendedService.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#b6c0d6] max-w-xl leading-relaxed">
                    {recommendedService.desc}
                  </p>
                </div>
              </div>

              <Link
                href={`/${lang}/legal-services/${recommendedService.slug}`}
                className="bg-gradient-to-b from-[#f0d28a] to-[#c29a45] text-[#0b1d3f] font-semibold text-xs uppercase tracking-wider px-6 py-3.5 hover:brightness-105 transition-all shrink-0 text-center w-full md:w-auto"
              >
                {isZh ? "查看该服务" : "Xem dịch vụ này"}
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Pricing Models Section ("Cách tính phí" - .fm3) */}
      <section className="py-16 lg:py-24 border-t border-[#e2dbce]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-[#a3171e] text-xs font-bold tracking-[3px] uppercase mb-2">
                <span className="font-chinese text-sm">收费方式</span>
                <span>{isZh ? "清晰透明" : "Minh bạch chi phí"}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0b1d3f]">
                {isZh ? "三大计费方式，书面先行确认" : "Ba hình thức, báo trước bằng văn bản"}
              </h2>
            </div>
            <p className="text-[#62708d] text-sm sm:text-base max-w-md">
              {isZh
                ? "收费标准基于工作范围与复杂程度，在正式立案前双方以书面协议明确约定，绝无隐性费用。"
                : "Mức phí cụ thể phụ thuộc vào phạm vi và độ phức tạp, được thống nhất bằng văn bản trước khi bắt đầu, không phát sinh phụ phí."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Model 1: Hourly */}
            <div className="bg-white border border-[#e2dbce] p-8 shadow-sm relative flex flex-col justify-between">
              <div>
                <span className="font-chinese font-bold text-5xl text-[#c29a45] block mb-3">
                  时
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#0b1d3f] mb-3">
                  {isZh ? "按小时计费" : "Theo giờ"}
                </h3>
                <p className="text-xs sm:text-sm text-[#62708d] leading-relaxed">
                  {isZh
                    ? "适用于难以预估实际工作量的事务，如常年法律顾问咨询、重大商业谈判陪同或突发事件应对。"
                    : "Phù hợp công việc khó ước lượng trước khối lượng, như tư vấn pháp lý thường xuyên hoặc đàm phán thương mại kéo dài."}
                </p>
              </div>
              <ul className="mt-6 pt-4 border-t border-[#f0ebe0] space-y-2 text-xs text-[#27324a]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a3171e]" />
                  <span>Ghi chép nhật ký công việc chi tiết</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a3171e]" />
                  <span>Quyết toán linh hoạt theo tháng</span>
                </li>
              </ul>
            </div>

            {/* Model 2: Flat Fee (Featured) */}
            <div className="bg-gradient-to-b from-white to-[#fffaf0] border border-[#e2dbce] border-t-4 border-t-[#a3171e] p-8 shadow-xl relative flex flex-col justify-between transform md:-translate-y-2">
              <span className="absolute right-4 top-4 bg-[#a3171e] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
                {isZh ? "常用优选" : "Phổ biến nhất"}
              </span>

              <div>
                <span className="font-chinese font-bold text-5xl text-[#a3171e] block mb-3">
                  包
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#0b1d3f] mb-3">
                  {isZh ? "包干固定费" : "Trọn gói"}
                </h3>
                <p className="text-xs sm:text-sm text-[#62708d] leading-relaxed">
                  {isZh
                    ? "适用于范围明确的工作，总费用固定包干，如设立企业、合规审查或双语合同草拟。"
                    : "Phạm vi công việc rõ ràng, mức phí cố định, như thành lập doanh nghiệp, xin giấy phép hoặc soạn thảo hợp đồng."}
                </p>
              </div>
              <ul className="mt-6 pt-4 border-t border-[#f0ebe0] space-y-2 text-xs text-[#27324a]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a3171e]" />
                  <span>Không phát sinh thêm chi phí</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a3171e]" />
                  <span>Cam kết tiến độ theo từng mốc</span>
                </li>
              </ul>
            </div>

            {/* Model 3: Contingency / Success */}
            <div className="bg-white border border-[#e2dbce] p-8 shadow-sm relative flex flex-col justify-between">
              <div>
                <span className="font-chinese font-bold text-5xl text-[#c29a45] block mb-3">
                  果
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#0b1d3f] mb-3">
                  {isZh ? "风险代理费" : "Theo kết quả"}
                </h3>
                <p className="text-xs sm:text-sm text-[#62708d] leading-relaxed">
                  {isZh
                    ? "适用于特定商业追偿与债务执行案件，律师费用与最终实际追回的财产成果紧密挂钩。"
                    : "Áp dụng cho các vụ việc thu hồi công nợ doanh nghiệp, thù lao luật sư gắn liền với kết quả thực tế đạt được."}
                </p>
              </div>
              <ul className="mt-6 pt-4 border-t border-[#f0ebe0] space-y-2 text-xs text-[#27324a]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a3171e]" />
                  <span>Giảm thiểu rủi ro tài chính ban đầu</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a3171e]" />
                  <span>Đồng hành tối đa hóa lợi ích</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* Bottom CTA Band */}
      <section className="bg-gradient-to-r from-[#071530] via-[#0b1d3f] to-[#102a58] text-white border-t-4 border-t-[#a3171e] py-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-[#f0d28a] font-chinese text-xs font-bold tracking-[3px] uppercase">
              委托 · 法律护航
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
      </section>

    </div>
  );
}
