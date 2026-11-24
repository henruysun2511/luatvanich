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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    scrollToAnchor(e, targetId);
  };

  return (
    <footer className="bg-[#050e20] text-[#9ba8c2] font-sans border-t border-[#c29a45]/40 mt-auto">
      {/* 1. Khung nội dung chính - Giãn cách rộng rãi, thoáng đãng */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Cột 1: Nhận diện thương hiệu & Thông điệp (5 cột) */}
          <div className="lg:col-span-5 space-y-6">
            <Link
              href={`/${lang}#top`}
              onClick={(e) => handleNavClick(e, "top")}
              className="flex items-center gap-4 group inline-flex"
            >
              <SealStamp char="万" size="md" variant="gold" className="w-12 h-12 text-[26px]" />
              <div>
                <span className="block font-royal font-bold text-2xl text-white tracking-wider group-hover:text-[#f0d28a] transition-colors">
                  LUẬT VẠN ÍCH
                </span>
                <span className="block text-xs text-[#c29a45] font-hanzi font-semibold tracking-[4px] uppercase mt-1">
                  万益律师事务所
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-[#8d9bb5] max-w-sm">
              Hãng luật song ngữ Trung – Việt thành lập từ năm 1996. Đồng hành pháp lý toàn diện cùng doanh nghiệp FDI và nhà đầu tư xuyên biên giới.
            </p>

            <div className="pt-2">
              <span className="block text-xs uppercase tracking-wider text-[#c29a45] font-semibold mb-1.5">
                Đầu mối tư vấn trực tiếp
              </span>
              <div className="flex items-center gap-3 text-white">
                <Phone className="size-4 text-[#c29a45] shrink-0" />
                <span className="font-royal font-bold text-lg text-[#f0d28a] tracking-wide">
                  +86 152 7702 0681
                </span>
                <span className="text-xs text-[#7e8ca8]">(LS. Tưởng Nữ Trinh)</span>
              </div>
            </div>
          </div>

          {/* Cột 2: Liên kết nhanh & Dịch vụ trọng tâm (3 cột) */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-xs font-semibold text-[#f0d28a] uppercase tracking-[2px]">
              Dịch vụ &amp; Cẩm nang
            </h4>
            <ul className="space-y-3.5 text-sm list-none p-0 m-0">
              <li>
                <Link
                  href={`/${lang}#linhvuc`}
                  onClick={(e) => handleNavClick(e, "linhvuc")}
                  className="hover:text-[#f0d28a] transition-colors"
                >
                  Đầu tư FDI &amp; Doanh nghiệp
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#linhvuc`}
                  onClick={(e) => handleNavClick(e, "linhvuc")}
                  className="hover:text-[#f0d28a] transition-colors"
                >
                  Hợp đồng song ngữ Việt – Trung
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#linhvuc`}
                  onClick={(e) => handleNavClick(e, "linhvuc")}
                  className="hover:text-[#f0d28a] transition-colors"
                >
                  Tranh tụng Tòa án &amp; Trọng tài
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#thuatngu`}
                  onClick={(e) => handleNavClick(e, "thuatngu")}
                  className="hover:text-[#f0d28a] transition-colors"
                >
                  Từ điển thuật ngữ pháp lý
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#doingu`}
                  onClick={(e) => handleNavClick(e, "doingu")}
                  className="hover:text-[#f0d28a] transition-colors"
                >
                  Đội ngũ luật sư &amp; chuyên gia
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Văn phòng đại diện (4 cột) */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-xs font-semibold text-[#f0d28a] uppercase tracking-[2px]">
              Mạng lưới văn phòng
            </h4>
            <div className="space-y-5 text-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-medium text-[13px]">
                  <MapPin className="size-4 text-[#c29a45] shrink-0" />
                  <span>Văn phòng Hà Nội</span>
                </div>
                <p className="text-xs text-[#8d9bb5] pl-6 leading-relaxed">
                  Số 17, Đường 23, Khu biệt thự KĐT Thành phố Giao Lưu, Bắc Từ Liêm, Hà Nội
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-medium text-[13px]">
                  <MapPin className="size-4 text-[#c29a45] shrink-0" />
                  <span>Tổng sở Quảng Tây (Trung Quốc)</span>
                </div>
                <p className="text-xs text-[#8d9bb5] pl-6 leading-relaxed">
                  Tầng 27, Tòa nhà Cửu Châu Quốc Tế, số 9 đường Trung Tân, TP. Nam Ninh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Dải Bản quyền thanh mảnh, tinh tế */}
      <div className="border-t border-white/10 py-6 text-xs text-[#717e99]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <span>
            &copy; {new Date().getFullYear()} Công ty Luật Vạn Ích &bull; 广西万益律师事务所. Bảo lưu mọi quyền.
          </span>
          <span className="flex items-center gap-2 text-[#c29a45]">
            <Scale className="size-3.5" />
            <span>Kết nối Việt – Trung, đồng hành pháp lý vững chắc</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
