import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, Scale } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-accent/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Cột 1: Thông tin công ty */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded bg-accent text-primary flex items-center justify-center font-serif font-bold text-base">
                VI
              </div>
              <span className="font-serif font-bold text-lg text-accent tracking-wide">
                LUẬT VẠN ÍCH
              </span>
            </div>
            <p className="text-xs leading-relaxed text-gray-300">
              Hãng luật chuyên sâu trong lĩnh vực đầu tư nước ngoài (FDI), doanh nghiệp và giải quyết tranh chấp thương mại Việt Nam – Trung Quốc.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <ShieldCheck className="size-4 text-accent shrink-0" />
              <span>Giấy phép hoạt động số: 0102xxxx/TP/ĐKHĐ</span>
            </div>
          </div>

          {/* Cột 2: Dịch vụ pháp lý cốt lõi */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-accent uppercase tracking-wider">
              Dịch vụ trọng tâm
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/services/tu-van-dau-tu-fdi" className="hover:text-accent transition-colors">
                  • Tư vấn Đầu tư FDI Trung Quốc & Đài Loan
                </Link>
              </li>
              <li>
                <Link href="/services/thanh-lap-doanh-nghiep-fdi" className="hover:text-accent transition-colors">
                  • Thành lập Doanh nghiệp có vốn ngoại
                </Link>
              </li>
              <li>
                <Link href="/services/hop-dong-thuong-mai" className="hover:text-accent transition-colors">
                  • Soạn thảo Hợp đồng song ngữ Việt - Trung
                </Link>
              </li>
              <li>
                <Link href="/services/giai-quyet-tranh-chap" className="hover:text-accent transition-colors">
                  • Tranh chấp thương mại & Tố tụng Trọng tài
                </Link>
              </li>
              <li>
                <Link href="/services/mua-ban-sap-nhap-ma" className="hover:text-accent transition-colors">
                  • M&A Doanh nghiệp sản xuất & Bất động sản
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Liên kết nhanh */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-accent uppercase tracking-wider">
              Thông tin hỗ trợ
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">• Về chúng tôi</Link>
              </li>
              <li>
                <Link href="/lawyers" className="hover:text-accent transition-colors">• Đội ngũ luật sư</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent transition-colors">• Tiêu điểm luật & Cẩm nang</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-accent transition-colors">• Chính sách bảo mật thông tin</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-accent transition-colors">• Điều khoản sử dụng</Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Trụ sở và liên hệ */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-accent uppercase tracking-wider">
              Trụ sở & Văn phòng
            </h4>
            <div className="space-y-2 text-xs text-gray-300">
              <p className="flex items-start gap-2">
                <MapPin className="size-4 text-accent shrink-0 mt-0.5" />
                <span>Trụ sở chính: Tầng x, Tòa nhà xxx, Quận Cầu Giấy, Hà Nội</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-4 text-accent shrink-0" />
                <span>Hotline: 0988.xxx.xxx</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="size-4 text-accent shrink-0" />
                <span>Email: contact@luatvanich.vn</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bản quyền dưới cùng */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© {new Date().getFullYear()} Công ty Luật Vạn Ích (万益律师事务所). Bản quyền đã được bảo hộ.</span>
          <span className="flex items-center gap-1 text-accent">
            <Scale className="size-3.5" /> Trách nhiệm – Bảo mật – Chuyên nghiệp
          </span>
        </div>
      </div>
    </footer>
  );
}
