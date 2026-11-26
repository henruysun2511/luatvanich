import { CheckCircle2 } from "lucide-react";
import type { SupportedLocale } from "@/types/api";

export function LegalServicesSupportSection({ lang }: { lang: SupportedLocale }) {
  const isZh = lang === "zh-CN";
  return (
    <div className="bg-[#fbf9f4] text-[#121c2d]">
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
                  <span>{isZh ? "详细记录工作日志" : "Ghi chép nhật ký công việc chi tiết"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a3171e]" />
                  <span>{isZh ? "按月灵活结算" : "Quyết toán linh hoạt theo tháng"}</span>
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
                  <span>{isZh ? "无额外费用" : "Không phát sinh thêm chi phí"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a3171e]" />
                  <span>{isZh ? "按里程碑推进" : "Cam kết tiến độ theo từng mốc"}</span>
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
                  <span>{isZh ? "降低前期财务风险" : "Giảm thiểu rủi ro tài chính ban đầu"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a3171e]" />
                  <span>{isZh ? "协助维护客户利益" : "Đồng hành tối đa hóa lợi ích"}</span>
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
              {isZh ? "使用中文或越南语咨询律师" : "Trao đổi với luật sư bằng tiếng Việt hoặc tiếng Trung"}
            </h2>
            <p className="text-[#b6c0d6] text-xs sm:text-sm mt-2">
              {isZh ? "24 个工作小时内回复 · 受理前明确报价" : "Phản hồi trong 24 giờ làm việc · Báo phí trước khi nhận vụ việc"}
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <a
              href="tel:0900123456"
              className="bg-gradient-to-b from-[#f0d28a] to-[#c29a45] text-[#0b1d3f] font-semibold text-xs uppercase tracking-wider px-6 py-3.5 shadow-md hover:brightness-105 transition-all"
            >
              {isZh ? "致电 0900 123 456" : "Gọi 0900 123 456"}
            </a>
            <a
              href="mailto:lienhe@vanichlaw.vn"
              className="border border-white/60 text-white hover:bg-white/10 font-semibold text-xs uppercase tracking-wider px-6 py-3.5 transition-all"
            >
              {isZh ? "发送咨询邮件" : "Gửi email tư vấn"}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
