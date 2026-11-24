import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, Scale } from "lucide-react";
import { SealStamp } from "@/components/ui/seal-stamp";

export function Footer() {
  return (
    <footer className="bg-[#06122b] text-[#b6c0d6] border-t-[3px] border-[#c29a45] mt-auto font-sans">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Cột 1: Thông tin công ty */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <SealStamp char="万" size="md" variant="gold" />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg text-white tracking-wide">
                  LUẬT VẠN ÍCH
                </span>
                <span className="text-[10px] text-[#c29a45] font-serif tracking-[3px] uppercase">
                  万益律师事务所
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-[#b6c0d6]">
              Hãng luật chuyên sâu trong lĩnh vực đầu tư nước ngoài (FDI), doanh nghiệp và giải quyết tranh chấp thương mại xuyên biên giới Việt Nam – Trung Quốc.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#f0d28a]">
              <ShieldCheck className="size-4 shrink-0" />
              <span>Giấy phép hoạt động: Sở Tư pháp TP. Hà Nội cấp</span>
            </div>
          </div>

          {/* Cột 2: Dịch vụ pháp lý cốt lõi */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-[#f0d28a] uppercase tracking-wider">
              Dịch vụ trọng tâm
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/tu-van-dau-tu-fdi" className="hover:text-[#f0d28a] transition-colors">
                  &bull; Tư vấn Đầu tư FDI (Việt - Trung)
                </Link>
              </li>
              <li>
                <Link href="/services/hop-dong-thuong-mai" className="hover:text-[#f0d28a] transition-colors">
                  &bull; Soạn thảo Hợp đồng song ngữ Việt - Trung
                </Link>
              </li>
              <li>
                <Link href="/services/giai-quyet-tranh-chap" className="hover:text-[#f0d28a] transition-colors">
                  &bull; Tranh tụng Tòa án & Trọng tài Thương mại
                </Link>
              </li>
              <li>
                <Link href="/services/thu-hoi-no" className="hover:text-[#f0d28a] transition-colors">
                  &bull; Thu hồi nợ thương mại quốc tế
                </Link>
              </li>
              <li>
                <Link href="/services/mua-ban-sap-nhap-ma" className="hover:text-[#f0d28a] transition-colors">
                  &bull; Mua bán & Sáp nhập Doanh nghiệp (M&A)
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Thông tin hỗ trợ */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-[#f0d28a] uppercase tracking-wider">
              Thông tin hỗ trợ
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-[#f0d28a] transition-colors">&bull; Về Luật Vạn Ích</Link>
              </li>
              <li>
                <Link href="/lawyers" className="hover:text-[#f0d28a] transition-colors">&bull; Đội ngũ luật sư</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#f0d28a] transition-colors">&bull; Tiêu điểm luật & Cẩm nang</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#f0d28a] transition-colors">&bull; Chính sách bảo mật thông tin</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#f0d28a] transition-colors">&bull; Điều khoản sử dụng</Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Mạng lưới 4 thành phố */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-[#f0d28a] uppercase tracking-wider">
              Mạng lưới văn phòng
            </h4>
            <div className="space-y-2.5 text-xs text-[#b6c0d6]">
              <div>
                <strong className="text-white block font-serif">Hà Nội (Trụ sở chính):</strong>
                <span>Tòa nhà văn phòng, Q. Cầu Giấy, Hà Nội</span>
              </div>
              <div>
                <strong className="text-white block font-serif">TP. Hồ Chí Minh:</strong>
                <span>Chi nhánh miền Nam, Q. 1, TP.HCM</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[11px]">
                <span>Thượng Hải &bull; Quảng Châu:</span>
                <span className="text-[#f0d28a] font-serif">Đối tác chiến lược</span>
              </div>
              <p className="flex items-center gap-2 pt-1 text-[#f0d28a]">
                <Phone className="size-3.5 shrink-0" />
                <span className="font-semibold">Hotline: 0900.123.456</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bản quyền dưới cùng */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-[#7f8aa6] flex flex-col sm:flex-row justify-between items-center gap-3">
          <span>&copy; {new Date().getFullYear()} Công ty Luật Vạn Ích &bull; 万益律师事务所. Bản quyền đã được bảo hộ.</span>
          <span className="flex items-center gap-1.5 text-[#f0d28a]">
            <Scale className="size-3.5" /> Hành lang pháp lý vững chắc Việt – Trung
          </span>
        </div>
      </div>
    </footer>
  );
}
