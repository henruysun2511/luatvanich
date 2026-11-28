"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin, Phone, Scale } from "lucide-react";
import { SealStamp } from "@/components/ui/seal-stamp";
import { scrollToAnchor } from "@/lib/utils";

export function Footer() {
  const params = useParams();
  const lang = (params?.lang as string) || "vi";
  const isZh = lang === "zh-CN" || lang === "zh";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    scrollToAnchor(e, targetId);
  };

  return (
    <footer className="bg-[#050e20] text-[#9ba8c2] font-sans border-t border-[#c29a45]/40 mt-auto">
      {/* 1. Khung nội dung chính - Giãn cách rộng rãi, 4 cột tiêu chuẩn */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Cột 1: Nhận diện thương hiệu & Thông tin pháp nhân (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              href={`/${lang}#top`}
              onClick={(e) => handleNavClick(e, "top")}
              className="flex items-center gap-4 group inline-flex"
            >
              <SealStamp char="W" size="md" variant="gold" className="w-12 h-12 shrink-0" />
              <div>
                <span className="block font-royal font-bold text-2xl text-white tracking-wider group-hover:text-[#f0d28a] transition-colors">
                  {isZh ? "广西万益（河内）律师事务所" : "LUẬT VẠN ÍCH"}
                </span>
                <span className="block text-xs text-[#c29a45] font-hanzi font-semibold tracking-[2px] mt-1">
                  {isZh ? "VĂN PHÒNG LUẬT SƯ VẠN ÍCH (HÀ NỘI)" : "广西万益（河内）律师事务所"}
                </span>
              </div>
            </Link>

            {/* Thông tin pháp nhân đầy đủ */}
            <div className="space-y-1.5 text-xs border-l-2 border-[#c29a45] pl-3.5 py-1.5 bg-[#0b1d3f]/50">
              <p className="font-semibold text-[#f0d28a] tracking-wide leading-snug">
                {isZh
                  ? "广西万益（河内）律师事务所"
                  : "Chi nhánh Văn phòng Luật sư Vạn Ích Quảng Tây tại Hà Nội"}
              </p>
              <p className="text-[#8d9bb5] leading-relaxed">
                {isZh
                  ? "越南司法部第 73/TP/ĐKHĐ-ĐN 号设立许可证 · 税号：0108962624"
                  : "Giấy phép hoạt động số 73/TP/ĐKHĐ-ĐN do Bộ Tư pháp cấp · MST: 0108962624"}
              </p>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-[#8d9bb5]">
              {isZh
                ? "万益律师事务所成立于1996年，系中国全国优秀律师事务所。河内办公室依托中越两国双重法域实战经验，全周期护航中资企业赴越投资落地与涉外争议解决。"
                : "Hãng luật thành lập từ năm 1996, thuộc hệ thống Hãng luật xuất sắc toàn quốc (Trung Quốc). Chi nhánh Hà Nội đồng hành pháp lý toàn diện cùng doanh nghiệp FDI và nhà đầu tư xuyên biên giới."}
            </p>
          </div>

          {/* Cột 2: Dịch vụ pháp lý trọng tâm (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold text-[#f0d28a] uppercase tracking-[2px] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c29a45]" />
              {isZh ? "核心业务领域" : "Dịch vụ trọng tâm"}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm list-none p-0 m-0">
              <li>
                <Link
                  href={`/${lang}/legal-services`}
                  className="hover:text-[#f0d28a] transition-colors block leading-relaxed"
                >
                  {isZh ? "外商直接投资 (FDI) 与项目准入" : "Tư vấn Đầu tư FDI & Cấp phép dự án"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/legal-services`}
                  className="hover:text-[#f0d28a] transition-colors block leading-relaxed"
                >
                  {isZh ? "企业并购 (M&A) 与法律尽调" : "M&A Doanh nghiệp & Thẩm định pháp lý"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/legal-services`}
                  className="hover:text-[#f0d28a] transition-colors block leading-relaxed"
                >
                  {isZh ? "中越双语商事合同起草与审查" : "Hợp đồng song ngữ Việt – Trung"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/legal-services`}
                  className="hover:text-[#f0d28a] transition-colors block leading-relaxed"
                >
                  {isZh ? "商事仲裁 (VIAC/CIETAC) 与诉讼" : "Trọng tài quốc tế (VIAC/CIETAC) & Tố tụng"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/legal-services`}
                  className="hover:text-[#f0d28a] transition-colors block leading-relaxed"
                >
                  {isZh ? "跨境税务筹划、合规与资金出境" : "Tuân thủ Thuế, Lao động & Chuyển vốn"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Khám phá & Hồ sơ năng lực (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold text-[#f0d28a] uppercase tracking-[2px] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c29a45]" />
              {isZh ? "了解万益" : "Khám phá"}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm list-none p-0 m-0">
              <li>
                <Link
                  href={`/${lang}/about`}
                  className="hover:text-[#f0d28a] transition-colors block"
                >
                  {isZh ? "关于万益律所" : "Về Luật Vạn Ích"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/lawyers`}
                  className="hover:text-[#f0d28a] transition-colors block"
                >
                  {isZh ? "双语律师团队" : "Đội ngũ Luật sư"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/corridor`}
                  className="hover:text-[#f0d28a] transition-colors block"
                >
                  {isZh ? "中越法治走廊" : "Hành lang Việt – Trung"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/offices`}
                  className="hover:text-[#f0d28a] transition-colors block"
                >
                  {isZh ? "全球办公网络" : "Mạng lưới văn phòng"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#thuatngu`}
                  onClick={(e) => handleNavClick(e, "thuatngu")}
                  className="hover:text-[#f0d28a] transition-colors block"
                >
                  {isZh ? "中越法律术语词典" : "Từ điển pháp lý"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/posts`}
                  className="hover:text-[#f0d28a] transition-colors block"
                >
                  {isZh ? "涉外法治动态" : "Tiêu điểm & Án lệ"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Mạng lưới 3 Trụ sở & Đầu mối tư vấn (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold text-[#f0d28a] uppercase tracking-[2px] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c29a45]" />
              {isZh ? "办公地址 & 咨询" : "Trụ sở & Liên hệ"}
            </h4>
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-medium text-[13px]">
                  <MapPin className="size-3.5 text-[#c29a45] shrink-0" />
                  <span>{isZh ? "河内办公室（越南分支机构）" : "Văn phòng Hà Nội (Chi nhánh VN)"}</span>
                </div>
                <p className="text-xs text-[#8d9bb5] pl-5 leading-relaxed">
                  {isZh
                    ? "河内市交流城都市区联排别墅区23路17号（公安部附近）"
                    : "Số 17, Đường 23, KĐT Thành phố Giao Lưu, Bắc Từ Liêm, Hà Nội (gần Bộ Công an)"}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-medium text-[13px]">
                  <MapPin className="size-3.5 text-[#c29a45] shrink-0" />
                  <span>{isZh ? "崇左分所（边境口岸前沿）" : "Chi nhánh Sùng Tả (Cửa khẩu TQ)"}</span>
                </div>
                <p className="text-xs text-[#8d9bb5] pl-5 leading-relaxed">
                  {isZh
                    ? "广西崇左市友谊关口岸联检大楼 / 凭祥综合保税区"
                    : "Khu hợp tác kinh tế biên giới Hữu Nghị Quan, TP. Bằng Tường / Sùng Tả"}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-medium text-[13px]">
                  <MapPin className="size-3.5 text-[#c29a45] shrink-0" />
                  <span>{isZh ? "广西南宁总所（中国总部）" : "Tổng sở Nam Ninh (Trung Quốc)"}</span>
                </div>
                <p className="text-xs text-[#8d9bb5] pl-5 leading-relaxed">
                  {isZh
                    ? "南宁市青秀区中新路9号九洲国际大厦27层"
                    : "Tầng 27, Tòa nhà Cửu Châu Quốc Tế, số 9 đường Trung Tân, TP. Nam Ninh"}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10">
                <span className="block text-[11px] uppercase tracking-wider text-[#c29a45] font-semibold mb-1">
                  {isZh ? "直接咨询对接人" : "Đầu mối tư vấn trực tiếp 24/7"}
                </span>
                <div className="flex items-center gap-2.5 text-white">
                  <Phone className="size-4 text-[#c29a45] shrink-0" />
                  <a
                    href="tel:+8615277020681"
                    className="font-royal font-bold text-base text-[#f0d28a] tracking-wide hover:underline"
                  >
                    +86 152 7702 0681
                  </a>
                  <span className="text-[11px] text-[#7e8ca8]">
                    ({isZh ? "蒋女贞 律师" : "LS. Tưởng Nữ Trinh"})
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Dải Bản quyền thanh mảnh, tinh tế */}
      <div className="border-t border-white/10 py-5 text-xs text-[#717e99]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <span>
            &copy; {new Date().getFullYear()}{" "}
            {isZh
              ? "广西万益（河内）律师事务所"
              : "Chi nhánh Văn phòng Luật sư Vạn Ích Quảng Tây tại Hà Nội"}
            {" "}&bull; 广西万益律师事务所. {isZh ? "保留所有权利。" : "Bảo lưu mọi quyền."}
          </span>
          <span className="flex items-center gap-2 text-[#c29a45]">
            <Scale className="size-3.5" />
            <span>
              {isZh
                ? "链接中越 · 法律护航"
                : "Kết nối Việt – Trung, đồng hành pháp lý vững chắc"}
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
