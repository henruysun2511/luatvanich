"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Phone, MapPin, ShieldCheck, Scale, Globe, Building2, UserCheck } from "lucide-react";
import { SealStamp } from "@/components/ui/seal-stamp";
import { scrollToAnchor } from "@/lib/utils";

export function Footer() {
  const params = useParams();
  const lang = (params?.lang as string) || "vi";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    scrollToAnchor(e, targetId);
  };

  return (
    <footer className="bg-[#06122b] text-[#b6c0d6] font-sans border-t-2 border-[#c29a45] mt-auto">
      {/* 1. Dải 4 cột nội dung chính của Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Cột 1: Thông tin thương hiệu & Giấy phép (Chiếm 4 cột trên lg) */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              href={`/${lang}#top`}
              onClick={(e) => handleNavClick(e, "top")}
              className="flex items-center gap-3.5 group inline-flex"
            >
              <SealStamp char="万" size="md" variant="gold" className="w-12 h-12 text-[26px]" />
              <div className="flex flex-col">
                <span className="font-royal font-bold text-2xl text-white tracking-wider leading-none group-hover:text-[#f0d28a] transition-colors">
                  LUẬT VẠN ÍCH
                </span>
                <span className="text-[11px] text-[#c29a45] font-hanzi font-semibold tracking-[4px] uppercase mt-1">
                  万益律师事务所
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm leading-relaxed text-[#8f9cb7]">
              Hãng luật song ngữ Trung – Việt hàng đầu với 30 năm kinh nghiệm (1996 - 2026). Đồng hành cùng doanh nghiệp FDI, đầu tư xuyên biên giới, hợp đồng song ngữ và giải quyết tranh chấp pháp lý.
            </p>

            <div className="p-3.5 bg-[#091838] border border-[#c29a45]/30 space-y-2">
              <div className="flex items-start gap-2.5 text-xs text-[#f0d28a]">
                <ShieldCheck className="size-4 shrink-0 mt-0.5 text-[#c29a45]" />
                <span className="leading-snug">
                  Giấy phép Bộ Tư pháp Việt Nam phê duyệt hoạt động chính thức.
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-[#8f9cb7] pt-1.5 border-t border-[#c29a45]/15">
                <Building2 className="size-4 shrink-0 mt-0.5 text-[#c29a45]" />
                <span>Tổng sở: Công ty Luật Vạn Ích Quảng Tây (thành lập 1996)</span>
              </div>
            </div>
          </div>

          {/* Cột 2: Dịch vụ trọng tâm (Chiếm 3 cột trên lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-semibold text-xs text-[#f0d28a] uppercase tracking-[1.5px] border-b border-[#c29a45]/30 pb-2">
              Dịch vụ trọng tâm
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] list-none p-0 m-0">
              <li>
                <Link
                  href={`/${lang}#linhvuc`}
                  onClick={(e) => handleNavClick(e, "linhvuc")}
                  className="hover:text-[#f0d28a] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#c29a45]">&rsaquo;</span> Tư vấn Đầu tư FDI (Việt – Trung)
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#linhvuc`}
                  onClick={(e) => handleNavClick(e, "linhvuc")}
                  className="hover:text-[#f0d28a] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#c29a45]">&rsaquo;</span> Soạn thảo &amp; Thẩm tra Hợp đồng song ngữ
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#linhvuc`}
                  onClick={(e) => handleNavClick(e, "linhvuc")}
                  className="hover:text-[#f0d28a] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#c29a45]">&rsaquo;</span> Tranh tụng Tòa án &amp; Trọng tài (VIAC)
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#linhvuc`}
                  onClick={(e) => handleNavClick(e, "linhvuc")}
                  className="hover:text-[#f0d28a] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#c29a45]">&rsaquo;</span> Thu hồi nợ thương mại quốc tế
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#linhvuc`}
                  onClick={(e) => handleNavClick(e, "linhvuc")}
                  className="hover:text-[#f0d28a] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#c29a45]">&rsaquo;</span> Mua bán &amp; Sáp nhập doanh nghiệp (M&amp;A)
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#linhvuc`}
                  onClick={(e) => handleNavClick(e, "linhvuc")}
                  className="hover:text-[#f0d28a] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#c29a45]">&rsaquo;</span> Lao động &amp; Giấy phép chuyên gia
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Cẩm nang & Thông tin hỗ trợ (Chiếm 2 cột trên lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-semibold text-xs text-[#f0d28a] uppercase tracking-[1.5px] border-b border-[#c29a45]/30 pb-2">
              Thông tin hỗ trợ
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] list-none p-0 m-0">
              <li>
                <Link
                  href={`/${lang}#top`}
                  onClick={(e) => handleNavClick(e, "top")}
                  className="hover:text-[#f0d28a] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#c29a45]">&rsaquo;</span> Về Luật Vạn Ích
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#doingu`}
                  onClick={(e) => handleNavClick(e, "doingu")}
                  className="hover:text-[#f0d28a] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#c29a45]">&rsaquo;</span> Đội ngũ luật sư
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#thuatngu`}
                  onClick={(e) => handleNavClick(e, "thuatngu")}
                  className="hover:text-[#f0d28a] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#c29a45]">&rsaquo;</span> Từ điển Việt – Trung
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#quytrinh`}
                  onClick={(e) => handleNavClick(e, "quytrinh")}
                  className="hover:text-[#f0d28a] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#c29a45]">&rsaquo;</span> Quy trình thụ lý 4 bước
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#gocnhin`}
                  onClick={(e) => handleNavClick(e, "gocnhin")}
                  className="hover:text-[#f0d28a] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#c29a45]">&rsaquo;</span> Góc nhìn pháp lý
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#lienhe`}
                  onClick={(e) => handleNavClick(e, "lienhe")}
                  className="hover:text-[#f0d28a] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#c29a45]">&rsaquo;</span> Đặt lịch tư vấn
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Mạng lưới văn phòng & Đầu mối liên hệ (Chiếm 3 cột trên lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-semibold text-xs text-[#f0d28a] uppercase tracking-[1.5px] border-b border-[#c29a45]/30 pb-2">
              Văn phòng &amp; Đầu mối
            </h4>
            <div className="space-y-3.5 text-xs text-[#8f9cb7]">
              <div>
                <strong className="text-white block font-medium flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-[#c29a45] shrink-0" />
                  Văn phòng Hà Nội:
                </strong>
                <span className="block mt-1 leading-relaxed">
                  Số 17, Đường 23, KĐT Thành phố Giao Lưu, Cổ Nhuế 2, Bắc Từ Liêm, Hà Nội (Gần Bộ Công An)
                </span>
              </div>

              <div>
                <strong className="text-white block font-medium flex items-center gap-1.5">
                  <Globe className="size-3.5 text-[#c29a45] shrink-0" />
                  Trụ sở chính tại Trung Quốc:
                </strong>
                <span className="block mt-1 leading-relaxed">
                  Tầng 27, Tòa nhà Cửu Châu Quốc Tế, số 9 đường Trung Tân, TP. Nam Ninh, Quảng Tây
                </span>
              </div>

              <div className="pt-2 border-t border-[#c29a45]/20">
                <div className="flex items-center gap-1.5 text-white font-medium">
                  <UserCheck className="size-3.5 text-[#c29a45] shrink-0" />
                  Đầu mối liên hệ:
                </div>
                <div className="mt-1 text-[#f0d28a] font-semibold text-xs">
                  Luật sư Tưởng Nữ Trinh (蒋女贞律师)
                </div>
                <p className="flex items-center gap-2 mt-1.5 text-[#f0d28a]">
                  <Phone className="size-3.5 shrink-0 text-[#c29a45]" />
                  <span className="font-semibold text-[13px]">+86 152 7702 0681</span>
                  <span className="text-[10px] text-[#8f9cb7]">(WeChat/Zalo)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Dải Bản quyền & Châm ngôn hoàng gia dưới cùng */}
      <div
        className="text-[12.5px] py-4 bg-[#040d1f]"
        style={{
          borderTop: "1px solid",
          borderImage: "linear-gradient(90deg, #a3171e, #c29a45, #a3171e) 1",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <span className="font-medium text-[#c9d3e8]">
            &copy; {new Date().getFullYear()} Công ty Luật Vạn Ích &bull; 广西万益律师事务所. Bản quyền đã được bảo hộ.
          </span>
          <span className="flex items-center gap-1.5 text-[#f0d28a] text-xs">
            <Scale className="size-3.5 text-[#c29a45]" /> Kết nối Việt – Trung, đồng hành pháp lý vững chắc &bull; 链接中越 · 法律护航
          </span>
        </div>
      </div>
    </footer>
  );
}
