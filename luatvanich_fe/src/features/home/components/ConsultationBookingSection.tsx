"use client";

import React, { useState } from "react";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";

export function ConsultationBookingSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    e.currentTarget.reset();
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#071530] to-[#102a58] text-white" id="lienhe">
      <div
        className="absolute -left-10 -bottom-36 font-hanzi font-bold text-[500px] text-transparent pointer-events-none select-none"
        style={{ WebkitTextStroke: "1px rgba(194, 154, 69, 0.2)" }}
        aria-hidden="true"
      >
        律
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <EyebrowBadge hz="06" text="Liên hệ" variant="gold" />
          <h2 className="font-royal text-4xl sm:text-5xl font-bold leading-tight my-4">
            Nói chuyện với{" "}
            <i className="not-italic text-[#f0d28a]">luật sư</i> bằng tiếng Việt hoặc 中文
          </h2>
          <span className="block font-royal font-bold text-3xl sm:text-4xl text-[#f0d28a] mb-1">
            0900 123 456
          </span>
          <span className="text-sm text-[#b6c0d6] block mb-8">
            lienhe@vanichlaw.vn &bull; Hỗ trợ 24/7
          </span>

          {/* Mạng lưới 4 Văn phòng */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-[#a3171e]">
            <div className="space-y-1">
              <b className="block font-royal text-lg text-white">Hà Nội</b>
              <span className="text-xs text-[#b6c0d6]">
                Văn phòng chính &bull; <em className="not-italic text-[#f0d28a] font-hanzi">河内</em>
              </span>
            </div>
            <div className="space-y-1">
              <b className="block font-royal text-lg text-white">TP. Hồ Chí Minh</b>
              <span className="text-xs text-[#b6c0d6]">
                Chi nhánh miền Nam &bull; <em className="not-italic text-[#f0d28a] font-hanzi">胡志明市</em>
              </span>
            </div>
            <div className="space-y-1 pt-3 border-t border-white/10 sm:border-t-0">
              <b className="block font-royal text-lg text-white">Thượng Hải</b>
              <span className="text-xs text-[#b6c0d6]">
                Đối tác chiến lược &bull; <em className="not-italic text-[#f0d28a] font-hanzi">上海</em>
              </span>
            </div>
            <div className="space-y-1 pt-3 border-t border-white/10 sm:border-t-0">
              <b className="block font-royal text-lg text-white">Quảng Châu</b>
              <span className="text-xs text-[#b6c0d6]">
                Đối tác chiến lược &bull; <em className="not-italic text-[#f0d28a] font-hanzi">广州</em>
              </span>
            </div>
          </div>
        </div>

        {/* Form Đặt lịch tư vấn với 4 góc họa tiết vàng (corner-accents) */}
        <div className="corner-accents bg-gradient-to-br from-white/[0.09] to-white/[0.02] border border-[#c29a45]/45 p-8 sm:p-12 backdrop-blur-md">
          <form onSubmit={handleContactSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-semibold text-[#f0d28a] uppercase tracking-wider mb-1">
                Họ tên / Tên Doanh nghiệp *
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Nguyễn Văn A / Công ty TNHH..."
                className="w-full bg-transparent border-0 border-b border-white/35 text-white p-2.5 text-sm outline-none focus:border-[#f0d28a] placeholder:text-[#7f8aa6]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#f0d28a] uppercase tracking-wider mb-1">
                Số điện thoại hoặc WeChat ID *
              </label>
              <input
                type="text"
                required
                placeholder="Nhập số điện thoại hoặc tài khoản WeChat"
                className="w-full bg-transparent border-0 border-b border-white/35 text-white p-2.5 text-sm outline-none focus:border-[#f0d28a] placeholder:text-[#7f8aa6]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#f0d28a] uppercase tracking-wider mb-1">
                Lĩnh vực quan tâm
              </label>
              <select className="w-full bg-transparent border-0 border-b border-white/35 text-white p-2.5 text-sm outline-none focus:border-[#f0d28a] cursor-pointer [&_option]:text-black">
                <option value="fdi">Đầu tư nước ngoài (FDI)</option>
                <option value="contract">Hợp đồng song ngữ</option>
                <option value="litigation">Tranh tụng & Trọng tài</option>
                <option value="debt">Thu hồi nợ thương mại</option>
                <option value="ma">Mua bán & Sáp nhập (M&A)</option>
                <option value="other">Tư vấn vấn đề khác</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#f0d28a] uppercase tracking-wider mb-1">
                Nội dung sơ bộ
              </label>
              <textarea
                rows={3}
                placeholder="Mô tả tóm tắt tình huống pháp lý hoặc câu hỏi cần giải đáp..."
                className="w-full bg-transparent border-0 border-b border-white/35 text-white p-2.5 text-sm outline-none focus:border-[#f0d28a] placeholder:text-[#7f8aa6] resize-none"
              />
            </div>

            <button type="submit" className="btn-royal w-full justify-center mt-4">
              Gửi yêu cầu tư vấn &rarr;
            </button>

            {formSubmitted && (
              <div className="p-3.5 bg-[#f0d28a]/15 border border-[#f0d28a]/40 text-[#f0d28a] text-xs leading-relaxed rounded mt-3">
                &check; <strong>Đã tiếp nhận yêu cầu.</strong> Luật sư chuyên trách của Vạn Ích sẽ trực tiếp liên hệ lại trong vòng 24 giờ làm việc.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
