import Link from "next/link";
import { Scale, Users, ShieldCheck, ArrowRight, Award, Building2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function PublicHomePage() {
  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO BANNER CHÍNH */}
      <section className="relative bg-primary text-primary-foreground py-20 px-4 overflow-hidden border-b border-accent/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-semibold">
              <Scale className="size-3.5" /> Hãng Luật Song Ngữ Việt - Trung Chuyên Nghiệp
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Giải Pháp Pháp Lý Vững Chắc Cho <span className="text-accent">Doanh Nghiệp FDI</span> & Đầu Tư Quốc Tế
            </h1>
            <p className="text-sm sm:text-base text-gray-200 max-w-2xl leading-relaxed">
              Luật Vạn Ích đồng hành cùng các tập đoàn, doanh nghiệp Trung Quốc, Đài Loan và Việt Nam trong suốt quá trình cấp phép đầu tư, quản trị nội bộ, tuân thủ thuế và bảo vệ quyền lợi tối đa tại Việt Nam.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button variant="accent" size="lg" asChild>
                <Link href="/contact#booking">Đặt lịch tư vấn pháp luật</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-white/30 text-white hover:bg-white/10">
                <Link href="/services">Khám phá các dịch vụ</Link>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4 backdrop-blur-md">
              <h3 className="font-serif font-bold text-lg text-accent border-b border-white/10 pb-2">
                Tại sao chọn Luật Vạn Ích?
              </h3>
              <ul className="space-y-3 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="size-4 text-accent shrink-0 mt-0.5" />
                  <span>100% Luật sư am hiểu văn hóa và luật pháp kinh doanh Việt - Trung.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="size-4 text-accent shrink-0 mt-0.5" />
                  <span>Hơn 500+ dự án FDI cấp mới và tái cấu trúc thành công.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Building2 className="size-4 text-accent shrink-0 mt-0.5" />
                  <span>Văn phòng đại diện thuận tiện tại hai đầu cầu Hà Nội và TP.HCM.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DÃY SỐ LIỆU NỔI BẬT */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-card border border-border p-6 rounded-md shadow-sm">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-primary">15+</div>
            <div className="text-xs text-muted-foreground mt-1">Năm kinh nghiệm hành nghề</div>
          </div>
          <div className="bg-card border border-border p-6 rounded-md shadow-sm">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-accent">500+</div>
            <div className="text-xs text-muted-foreground mt-1">Doanh nghiệp FDI đồng hành</div>
          </div>
          <div className="bg-card border border-border p-6 rounded-md shadow-sm">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-primary">98%</div>
            <div className="text-xs text-muted-foreground mt-1">Tỷ lệ vụ việc đạt kết quả kỳ vọng</div>
          </div>
          <div className="bg-card border border-border p-6 rounded-md shadow-sm">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-accent">24/7</div>
            <div className="text-xs text-muted-foreground mt-1">Hỗ trợ khẩn cấp Việt - Trung</div>
          </div>
        </div>
      </section>

      {/* 3. LƯỚI DỊCH VỤ TIÊU BIỂU */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2 border-b pb-4">
          <div>
            <span className="text-xs font-bold text-accent uppercase tracking-wider">Lĩnh vực trọng tâm</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mt-1">Dịch Vụ Pháp Lý Tiêu Biểu</h2>
          </div>
          <Link href="/services" className="text-sm font-semibold text-primary hover:text-accent flex items-center gap-1">
            Xem tất cả 12 dịch vụ <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border p-6 rounded-md hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="size-10 rounded bg-primary/10 text-primary flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-serif font-bold text-lg text-foreground">Tư Vấn Đầu Tư FDI</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Thẩm định vị trí địa điểm thuê đất khu công nghiệp, xin chấp thuận chủ trương đầu tư và Giấy chứng nhận đăng ký đầu tư (IRC).
              </p>
            </div>
            <Link href="/services/tu-van-dau-tu-fdi" className="text-xs font-semibold text-accent mt-4 inline-block hover:underline">
              Chi tiết dịch vụ →
            </Link>
          </div>

          <div className="bg-card border border-border p-6 rounded-md hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="size-10 rounded bg-primary/10 text-primary flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-serif font-bold text-lg text-foreground">Thành Lập Doanh Nghiệp FDI</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Đăng ký thành lập công ty TNHH/Cổ phần có vốn nước ngoài, giấy phép phân phối bán buôn/bán lẻ, khắc dấu và thủ tục thuế ban đầu.
              </p>
            </div>
            <Link href="/services/thanh-lap-doanh-nghiep-fdi" className="text-xs font-semibold text-accent mt-4 inline-block hover:underline">
              Chi tiết dịch vụ →
            </Link>
          </div>

          <div className="bg-card border border-border p-6 rounded-md hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="size-10 rounded bg-primary/10 text-primary flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-serif font-bold text-lg text-foreground">Giải Quyết Tranh Chấp & Tố Tụng</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Đại diện bảo vệ quyền lợi hợp pháp tại Tòa án nhân dân các cấp hoặc Trung tâm Trọng tài Quốc tế Việt Nam (VIAC).
              </p>
            </div>
            <Link href="/services/giai-quyet-tranh-chap" className="text-xs font-semibold text-accent mt-4 inline-block hover:underline">
              Chi tiết dịch vụ →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. KHỐI KÊU GỌI HÀNH ĐỘNG (CTA) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-primary text-primary-foreground rounded-lg p-8 sm:p-12 text-center space-y-4 border border-accent/40">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Cần Tư Vấn Trực Tiếp Với Luật Sư Chuyên Trách?
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto">
            Gửi yêu cầu hoặc liên hệ hotline để nhận tư vấn sơ bộ và báo giá phương án pháp lý tối ưu nhất trong vòng 24 giờ.
          </p>
          <div className="pt-2">
            <Button variant="accent" size="lg" asChild>
              <Link href="/contact">Gửi Yêu Cầu Tư Vấn Ngay</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
