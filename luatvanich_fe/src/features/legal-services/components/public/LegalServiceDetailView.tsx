"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface LegalServiceDetailViewProps {
  lang: string;
  slug?: string;
}

export function LegalServiceDetailView({ lang, slug }: LegalServiceDetailViewProps) {
  const isZh = lang === "zh-CN";

  const [activeNav, setActiveNav] = useState<string>("tongquan");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Sub-nav items
  const navItems = [
    { id: "tongquan", label: isZh ? "总览" : "Tổng quan" },
    { id: "phamvi", label: isZh ? "工作范围" : "Phạm vi" },
    { id: "vidu", label: isZh ? "对照示例" : "Ví dụ" },
    { id: "quytrinh", label: isZh ? "服务流程" : "Quy trình" },
    { id: "goi", label: isZh ? "服务方案" : "Gói dịch vụ" },
    { id: "hoidap", label: isZh ? "常见问答" : "Hỏi đáp" },
  ];

  // ScrollSpy cho các section
  useEffect(() => {
    const handleScroll = () => {
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveNav(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 1. Page Hero Banner (.ph data-z="约") */}
      <section className="relative bg-[radial-gradient(800px_420px_at_85%_10%,rgba(194,154,69,0.2),transparent_60%),radial-gradient(600px_400px_at_0%_100%,rgba(163,23,30,0.3),transparent_60%),linear-gradient(135deg,#071530,#0f2a58_60%,#0b1d3f)] text-white overflow-hidden">
        {/* Chữ Hán rỗng nét watermark khổng lồ 约 */}
        <div
          className="absolute right-[30px] -bottom-[130px] font-chinese font-bold text-[260px] sm:text-[380px] lg:text-[480px] leading-none text-transparent select-none pointer-events-none z-0"
          style={{ WebkitTextStroke: "1px rgba(194,154,69,0.22)" }}
          aria-hidden="true"
        >
          约
        </div>

        <div className="max-w-[1180px] mx-auto px-6 sm:px-10 relative z-10 pt-11 pb-20 lg:pb-[90px]">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2.5 flex-wrap text-[13px] text-[#aab6d0] mb-[34px] font-sans" aria-label="Breadcrumb">
            <Link href={`/${lang}`} className="hover:text-[#f0d28a] transition-colors">
              {isZh ? "首页" : "Trang chủ"}
            </Link>
            <span className="opacity-50">/</span>
            <Link href={`/${lang}/legal-services`} className="hover:text-[#f0d28a] transition-colors">
              {isZh ? "法律服务" : "Dịch vụ pháp lý"}
            </Link>
            <span className="opacity-50">/</span>
            <b className="font-normal text-[#f0d28a]">
              {isZh ? "双语合同审查" : "Hợp đồng song ngữ"}
            </b>
          </nav>

          {/* Tiêu đề & Mô tả */}
          <div className="max-w-[780px]">
            <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#f0d28a] flex items-center">
              <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">双语合同</b>
              {isZh ? "核心业务板块" : "Dịch vụ pháp lý"}
            </div>

            <h1 className="font-royal font-bold text-[46px] sm:text-[64px] lg:text-[78px] leading-[1.08] text-white my-4 lg:my-5">
              {isZh ? (
                <>
                  中越双语合同{" "}
                  <span className="text-[#f0d28a] italic font-medium">起草与精准交叉校核</span>
                </>
              ) : (
                <>
                  Hợp đồng song ngữ{" "}
                  <span className="text-[#f0d28a] italic font-medium">Việt – Trung</span>
                </>
              )}
            </h1>

            <p className="text-[#b6c0d6] text-base sm:text-[18px] max-w-[600px] leading-relaxed mb-8 font-sans">
              {isZh
                ? "起草、对照与严格审查跨境商事合同，确保越南语与中文版本法律含义高度一致，在签署前筑牢防线。"
                : "Soạn thảo, đối chiếu và rà soát hợp đồng để bản tiếng Việt và bản tiếng Trung cùng một nghĩa, trước khi bạn ký."}
            </p>

            {/* Các nút CTA */}
            <div className="flex gap-3.5 flex-wrap">
              <a
                href="#lienhe-cta"
                className="inline-flex items-center gap-2.5 bg-gradient-to-b from-[#c4252c] to-[#8f1218] text-white font-sans font-semibold text-[13px] tracking-[1.3px] uppercase px-7 py-4 shadow-[0_8px_20px_rgba(163,23,30,0.3)] hover:brightness-110 hover:gap-4 transition-all"
              >
                {isZh ? "预约律师咨询" : "Đặt lịch tư vấn"}
              </a>
              <a
                href="#goi"
                className="inline-flex items-center gap-2.5 bg-transparent text-white font-sans font-semibold text-[13px] tracking-[1.3px] uppercase px-7 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)] hover:bg-white/10 transition-all"
              >
                {isZh ? "查看服务方案" : "Xem gói dịch vụ"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Khối 4 chỉ số thông tin nổi (.fa) */}
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 -mt-[46px] relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 bg-white shadow-[0_18px_50px_rgba(11,29,63,0.18)] border-t-[3px] border-[#c29a45]">
          <div className="p-6 lg:px-7 lg:py-6 border-r border-[#e7dcc3] border-b lg:border-b-0">
            <small className="font-sans font-semibold text-[11px] tracking-[2px] uppercase text-[#a3171e] block mb-1">
              {isZh ? "服务周期" : "Thời gian"}
            </small>
            <b className="font-royal font-bold text-2xl lg:text-[28px] text-[#0b1d3f] block">3 – 7 ngày</b>
          </div>
          <div className="p-6 lg:px-7 lg:py-6 border-r-0 lg:border-r border-[#e7dcc3] border-b lg:border-b-0">
            <small className="font-sans font-semibold text-[11px] tracking-[2px] uppercase text-[#a3171e] block mb-1">
              {isZh ? "计费方式" : "Hình thức phí"}
            </small>
            <b className="font-royal font-bold text-2xl lg:text-[28px] text-[#0b1d3f] block">Theo hợp đồng</b>
          </div>
          <div className="p-6 lg:px-7 lg:py-6 border-r border-[#e7dcc3]">
            <small className="font-sans font-semibold text-[11px] tracking-[2px] uppercase text-[#a3171e] block mb-1">
              {isZh ? "工作语言" : "Ngôn ngữ"}
            </small>
            <b className="font-royal font-bold text-2xl lg:text-[28px] text-[#0b1d3f] block">VI · 中文 · EN</b>
          </div>
          <div className="p-6 lg:px-7 lg:py-6">
            <small className="font-sans font-semibold text-[11px] tracking-[2px] uppercase text-[#a3171e] block mb-1">
              {isZh ? "主办律师" : "Luật sư phụ trách"}
            </small>
            <b className="font-royal font-bold text-2xl lg:text-[28px] text-[#0b1d3f] block">2 người</b>
          </div>
        </div>
      </div>

      {/* 3. Sub-navigation Sticky (.sn) */}
      <nav className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-[#e7dcc3] mt-8" aria-label="Mục trong trang">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10 flex gap-8 overflow-x-auto whitespace-nowrap">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`py-4 font-sans font-semibold text-[13px] tracking-wide border-b-[3px] transition-colors ${
                activeNav === item.id
                  ? "text-[#a3171e] border-b-[#a3171e]"
                  : "text-[#5b6174] border-b-transparent hover:text-[#a3171e]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* 4. Section 1: Tổng quan (#tongquan) */}
      <section className="py-20" id="tongquan">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-start font-sans">
          <div>
            <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#a3171e] flex items-center mb-2">
              <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">总览</b>
              {isZh ? "总览" : "Tổng quan"}
            </div>
            <h2 className="font-royal font-bold text-3xl sm:text-[46px] leading-[1.15] text-[#0b1d3f] mb-6">
              {isZh ? "一字之差，整条核心违约条款法律效力可能颠覆" : "Một chữ dịch lệch có thể đổi nghĩa cả điều khoản"}
            </h2>
            <p className="text-[16.5px] leading-[1.8] text-[#27324a] mb-5">
              Nhiều tranh chấp giữa doanh nghiệp Việt Nam và Trung Quốc không đến từ thiếu thiện chí, mà từ việc hai bản hợp đồng nói hai điều khác nhau. Luật sư của chúng tôi đọc trực tiếp cả hai bản, đối chiếu từng điều khoản và đánh dấu điểm lệch trước khi bạn ký.
            </p>
            <p className="text-[16.5px] leading-[1.8] text-[#27324a] m-0">
              Chúng tôi cũng hướng dẫn bạn lưu giữ chứng cứ như email, tin nhắn WeChat và biên bản họp theo cách có giá trị khi cần giải quyết tranh chấp.
            </p>
          </div>

          <div className="bg-white border border-[#e7dcc3] p-7 shadow-sm">
            <h4 className="font-sans font-semibold text-[11.5px] tracking-[2.5px] uppercase text-[#a3171e] mb-4">
              {isZh ? "您在何种情况下需要此项服务" : "Bạn cần dịch vụ này khi"}
            </h4>
            <ul className="space-y-3 m-0 p-0 list-none">
              {[
                "Chuẩn bị ký kết hợp đồng thương mại với đối tác Trung Quốc.",
                "Nhận bản hợp đồng dịch từ tiếng Trung và chưa chắc về ngữ nghĩa pháp lý.",
                "Đối tác đề nghị sửa đổi các điều khoản phạt vi phạm, thanh toán hoặc tài phán.",
                "Cần xác lập chứng cứ rõ ràng, hợp pháp cho giao dịch xuyên biên giới.",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#27324a] pt-2.5 border-t border-[#e7dcc3]">
                  <span className="w-2 h-2 bg-[#a3171e] rotate-45 shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Section 2: Phạm vi công việc (#phamvi) */}
      <section className="bg-[#fbf7ee] py-20 border-t border-[#e7dcc3]" id="phamvi">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          <div className="mb-12">
            <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#a3171e] flex items-center mb-2">
              <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">范围</b>
              {isZh ? "服务范围" : "Phạm vi công việc"}
            </div>
            <h2 className="font-royal font-bold text-3xl sm:text-4xl text-[#0b1d3f]">
              {isZh ? "我们在每份合同中落实的六项实质审查" : "Sáu việc chúng tôi làm trong mỗi hợp đồng"}
            </h2>
            <p className="text-sm text-[#5b6174] font-sans mt-2 m-0">
              Bạn có thể chọn từng phần hoặc trọn gói từ khâu soạn thảo đến theo dõi thực hiện.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { zh: "约", title: "Soạn thảo hợp đồng", desc: "Soạn hợp đồng thương mại song ngữ theo mục tiêu bảo vệ và khẩu vị rủi ro của bạn." },
              { zh: "对", title: "Đối chiếu hai bản", desc: "Đọc song song bản Việt và bản Trung, đánh dấu chính xác từng điều khoản bị lệch nghĩa." },
              { zh: "先", title: "Ngôn ngữ ưu tiên", desc: "Soạn điều khoản quy định rõ bản nào được áp dụng khi hai bản phát sinh mâu thuẫn." },
              { zh: "附", title: "Phụ lục sửa đổi", desc: "Soạn thảo phụ lục bổ sung để điều chỉnh hợp đồng đang thực hiện một cách an toàn." },
              { zh: "谈", title: "Tham gia đàm phán", desc: "Cùng bạn tham gia các phiên đàm phán hợp đồng trực tiếp với đối tác bằng tiếng Trung." },
              { zh: "存", title: "Lưu giữ chứng cứ", desc: "Hướng dẫn lưu email, tin nhắn WeChat và biên bản làm việc có giá trị chứng cứ pháp lý." },
            ].map((gc, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#e7dcc3] p-7 relative hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(11,29,63,0.12)] hover:border-[#c29a45] transition-all font-sans group"
              >
                {/* Góc viền vàng (.gc::after) */}
                <div className="absolute right-2.5 bottom-2.5 w-5 h-5 border-r-[1.5px] border-b-[1.5px] border-[#c29a45] pointer-events-none" />

                <i className="block font-chinese font-bold text-5xl leading-none not-italic bg-gradient-to-br from-[#0b1d3f] to-[#3d5fae] bg-clip-text text-transparent mb-4">
                  {gc.zh}
                </i>
                <h3 className="font-royal font-bold text-2xl text-[#0b1d3f] mb-2">{gc.title}</h3>
                <p className="text-[14.5px] text-[#5b6174] leading-relaxed m-0">{gc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Section 3: Ví dụ đối chiếu (#vidu) */}
      <section className="py-20" id="vidu">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          <div className="mb-10">
            <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#a3171e] flex items-center mb-2">
              <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">示例</b>
              {isZh ? "实务对照示例" : "Ví dụ đối chiếu"}
            </div>
            <h2 className="font-royal font-bold text-3xl sm:text-4xl text-[#0b1d3f]">
              {isZh ? "文本歧义是如何被精准发现并标注的" : "Điểm lệch được đánh dấu như thế nào"}
            </h2>
            <p className="text-sm text-[#5b6174] font-sans mt-2 m-0">
              Mỗi điều khoản được so sánh song song để bạn thấy ngay chỗ khác biệt tiềm ẩn rủi ro.
            </p>
          </div>

          <div className="border border-[#e7dcc3] bg-white shadow-[0_10px_30px_rgba(11,29,63,0.07)]">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-7 border-b md:border-b-0 md:border-r border-[#e7dcc3]">
                <div className="flex justify-between font-sans font-semibold text-[11.5px] tracking-[2px] uppercase text-[#5b6174] border-b border-[#e7dcc3] pb-2.5 mb-3.5">
                  <span>Bản tiếng Việt</span>
                  <span>Điều 12</span>
                </div>
                <h3 className="font-royal font-bold text-2xl text-[#0b1d3f] mb-2">Phạt vi phạm</h3>
                <p className="text-[15px] leading-[1.7] text-[#27324a] m-0">
                  Bên vi phạm phải trả khoản phạt tối đa bằng{" "}
                  <mark className="bg-[#a3171e]/15 text-[#7c1015] font-semibold px-1 border-b-2 border-[#a3171e]">
                    8%
                  </mark>{" "}
                  giá trị phần nghĩa vụ hợp đồng bị vi phạm.
                </p>
              </div>

              <div className="p-7 bg-[#fbf9f4]">
                <div className="flex justify-between font-sans font-semibold text-[11.5px] tracking-[2px] uppercase text-[#5b6174] border-b border-[#e7dcc3] pb-2.5 mb-3.5">
                  <span>中文版本</span>
                  <span>第十二条</span>
                </div>
                <h3 className="font-chinese font-bold text-2xl text-[#0b1d3f] mb-2">违约金</h3>
                <p className="font-chinese font-medium text-base leading-[2] text-[#27324a] m-0">
                  违约方应向守约方支付违约金，金额为违约部分价值的{" "}
                  <mark className="bg-[#a3171e]/15 text-[#7c1015] font-semibold px-1 border-b-2 border-[#a3171e]">
                    20%
                  </mark>
                  。
                </p>
              </div>
            </div>

            <div className="bg-[#a3171e] text-white px-7 py-3.5 flex flex-wrap items-center gap-4 text-sm font-sans">
              <b className="font-bold text-[11px] tracking-[2px] uppercase border border-white/50 px-2.5 py-0.5 whitespace-nowrap">
                Phát hiện lệch
              </b>
              <span>
                Bản tiếng Trung ghi mức phạt 20%, cao hơn mức trần 8% theo Luật Thương mại Việt Nam. Cần thống nhất điều khoản và bắt buộc ghi rõ ngôn ngữ ưu tiên.
              </span>
            </div>
          </div>
          <p className="text-xs text-[#7f8aa6] mt-3 font-sans italic">
            * Ví dụ minh họa quy trình làm việc thực tế của Vạn Ích, không phải dữ liệu khách hàng thật.
          </p>
        </div>
      </section>

      {/* 7. Section 4: Quy trình 4 bước (#quytrinh) */}
      <section className="bg-[#fbf7ee] py-20 border-t border-[#e7dcc3]" id="quytrinh">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          <div className="mb-12">
            <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#a3171e] flex items-center mb-2">
              <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">流程</b>
              {isZh ? "办案流程" : "Quy trình"}
            </div>
            <h2 className="font-royal font-bold text-3xl sm:text-4xl text-[#0b1d3f]">
              {isZh ? "从接收合同至正式交付的四个规范节点" : "Bốn bước từ nhận hồ sơ đến bàn giao"}
            </h2>
            <p className="text-sm text-[#5b6174] font-sans mt-2 m-0">
              Mọi bước đều có văn bản xác nhận và thời hạn hoàn thành rõ ràng.
            </p>
          </div>

          {/* Connected timeline (.st4) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute left-0 right-0 top-7 h-[1px] bg-[#c29a45] pointer-events-none" />

            {[
              { zh: "受", day: "Ngày 1", title: "Tiếp nhận", desc: "Nhận bản hợp đồng, xác định mục tiêu kinh doanh và phân tích rủi ro ban đầu." },
              { zh: "研", day: "Ngày 2 – 4", title: "Đối chiếu", desc: "Đọc song song hai bản, đánh dấu từng điểm lệch nghĩa và nguy cơ pháp lý." },
              { zh: "策", day: "Ngày 5 – 6", title: "Đề xuất", desc: "Gửi bản sửa đổi kèm giải thích chi tiết lý do và phương án tối ưu." },
              { zh: "交", day: "Ngày 7", title: "Bàn giao", desc: "Hoàn thiện hợp đồng song ngữ cuối cùng và hướng dẫn lưu giữ chứng cứ." },
            ].map((st, idx) => (
              <div key={idx} className="relative font-sans">
                <span className="w-14 h-14 bg-[#0b1d3f] text-[#f0d28a] font-chinese font-bold text-2xl flex items-center justify-center border border-[#c29a45] relative z-10 shadow-sm">
                  {st.zh}
                </span>
                <small className="block mt-4 font-semibold text-[11px] tracking-[2px] uppercase text-[#a3171e]">
                  {st.day}
                </small>
                <h3 className="font-royal font-bold text-2xl text-[#0b1d3f] my-1">{st.title}</h3>
                <p className="text-[14.5px] text-[#5b6174] leading-relaxed m-0">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Section 5: Bảng gói dịch vụ (#goi) */}
      <section className="py-20" id="goi">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          <div className="mb-12">
            <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#a3171e] flex items-center mb-2">
              <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">方案</b>
              {isZh ? "服务方案" : "Gói dịch vụ"}
            </div>
            <h2 className="font-royal font-bold text-3xl sm:text-4xl text-[#0b1d3f]">
              {isZh ? "选择最适宜的企业协同合作级别" : "Chọn mức đồng hành phù hợp"}
            </h2>
            <p className="text-sm text-[#5b6174] font-sans mt-2 m-0">
              Báo phí bằng văn bản trước khi nhận vụ việc. Mức phí tùy thuộc độ phức tạp của hợp đồng.
            </p>
          </div>

          {/* Grid 3 gói (.pk) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch font-sans">
            {/* Gói 1: Rà soát */}
            <div className="bg-white border border-[#e7dcc3] p-8 flex flex-col shadow-sm">
              <h3 className="font-royal font-bold text-3xl text-[#0b1d3f] mb-1">Rà soát</h3>
              <small className="font-chinese font-bold text-xl text-[#c29a45] mb-5 block">审阅</small>
              <ul className="space-y-3 flex-1 mb-8">
                {["Đọc và đối chiếu song song hai bản", "Báo cáo điểm lệch và phân tích rủi ro", "Một vòng phản hồi và giải đáp trực tiếp"].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#27324a]">
                    <span className="w-1.5 h-1.5 bg-[#a3171e] rotate-45 shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#lienhe-cta"
                className="w-full text-center bg-[#0b1d3f] hover:bg-[#16336a] text-white font-semibold text-xs tracking-wider uppercase py-3 transition-colors"
              >
                Nhận báo phí &rarr;
              </a>
            </div>

            {/* Gói 2: Soạn thảo & rà soát (Nổi bật .ft) */}
            <div className="bg-gradient-to-br from-[#0b1d3f] to-[#16336a] text-white border-t-4 border-t-[#a3171e] p-8 flex flex-col relative lg:-translate-y-3 shadow-[0_24px_50px_rgba(11,29,63,0.3)]">
              <span className="absolute -top-3.5 right-5 bg-[#a3171e] text-white font-semibold text-[11px] tracking-[2px] uppercase px-3.5 py-1">
                Phổ biến
              </span>
              <h3 className="font-royal font-bold text-3xl text-white mb-1">Soạn thảo &amp; rà soát</h3>
              <small className="font-chinese font-bold text-xl text-[#f0d28a] mb-5 block">起草</small>
              <ul className="space-y-3 flex-1 mb-8 text-[#dbe3f5]">
                {[
                  "Soạn hợp đồng song ngữ từ đầu theo mục tiêu",
                  "Xác lập điều khoản ngôn ngữ và tài phán ưu tiên",
                  "Ba vòng chỉnh sửa và hoàn thiện chi tiết",
                  "Hướng dẫn phương án lưu giữ chứng cứ số",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm">
                    <span className="w-1.5 h-1.5 bg-[#f0d28a] rotate-45 shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#lienhe-cta"
                className="w-full text-center bg-gradient-to-b from-[#f0d28a] to-[#c29a45] text-[#06122b] font-semibold text-xs tracking-wider uppercase py-3 hover:brightness-110 transition-all"
              >
                Nhận báo phí &rarr;
              </a>
            </div>

            {/* Gói 3: Đồng hành */}
            <div className="bg-white border border-[#e7dcc3] p-8 flex flex-col shadow-sm">
              <h3 className="font-royal font-bold text-3xl text-[#0b1d3f] mb-1">Đồng hành</h3>
              <small className="font-chinese font-bold text-xl text-[#c29a45] mb-5 block">陪伴</small>
              <ul className="space-y-3 flex-1 mb-8">
                {[
                  "Toàn bộ quyền lợi của gói soạn thảo",
                  "Luật sư trực tiếp tham gia đàm phán bằng tiếng Trung",
                  "Theo dõi và hỗ trợ pháp lý trong suốt quá trình thực hiện",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#27324a]">
                    <span className="w-1.5 h-1.5 bg-[#a3171e] rotate-45 shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#lienhe-cta"
                className="w-full text-center bg-[#0b1d3f] hover:bg-[#16336a] text-white font-semibold text-xs tracking-wider uppercase py-3 transition-colors"
              >
                Nhận báo phí &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Section 6: Luật sư phụ trách (.lg2) */}
      <section className="bg-[#fbf7ee] py-20 border-t border-[#e7dcc3]" id="doingu">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          <div className="mb-10">
            <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#a3171e] flex items-center mb-2">
              <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">团队</b>
              {isZh ? "主办律师" : "Luật sư phụ trách"}
            </div>
            <h2 className="font-royal font-bold text-3xl sm:text-4xl text-[#0b1d3f]">
              {isZh ? "直接经办您涉外合同的专业法务团队" : "Người trực tiếp xử lý hợp đồng của bạn"}
            </h2>
            <p className="text-sm text-[#5b6174] font-sans mt-2 m-0">
              Cả hai luật sư đều làm việc trực tiếp bằng tiếng Việt và tiếng Trung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href={`/${lang}/lawyers/tran-thu-ha`}
              className="grid grid-cols-[130px_1fr] sm:grid-cols-[150px_1fr] bg-white border border-[#e7dcc3] hover:border-[#c29a45] hover:shadow-[0_16px_32px_rgba(11,29,63,0.12)] transition-all group"
            >
              <div className="bg-[#0b1d3f] border-r-[3px] border-r-[#c29a45] overflow-hidden">
                <svg viewBox="0 0 100 125" className="w-full h-full block" preserveAspectRatio="xMidYMin slice">
                  <rect width="100" height="125" fill="#0b1d3f" />
                  <circle cx="50" cy="52" r="40" fill="#f0d28a" opacity="0.12" />
                  <path d="M28 62c-7-34 11-48 22-48s29 14 22 48v30H28z" fill="#2a1c16" />
                  <path d="M6 125c0-30 16-42 44-44 28 2 44 14 44 44z" fill="#0d121c" />
                  <path d="M38 82l-10 43M62 82l10 43" stroke="#f0d28a" strokeWidth="0.8" fill="none" opacity="0.6" />
                  <path d="M38 82l12 16 12-16v14l-12 29-12-29z" fill="#f3f5f9" />
                  <path d="M47 96h6l3 29h-12z" fill="#a3171e" />
                  <ellipse cx="50" cy="52" rx="15" ry="19" fill="#e0b293" />
                  <path d="M34 48c-2-20 32-20 32 0-6-9-26-9-32 0z" fill="#2a1c16" />
                </svg>
              </div>
              <div className="p-6 font-sans">
                <h3 className="font-royal font-bold text-2xl text-[#0b1d3f] group-hover:text-[#a3171e] transition-colors mb-0.5">
                  Trần Thu Hà{" "}
                  <i className="font-chinese font-semibold text-sm text-[#a3171e] not-italic ml-1">
                    陈秋河
                  </i>
                </h3>
                <small className="text-xs text-[#5b6174] block mb-2">Luật sư thành viên</small>
                <p className="text-sm text-[#27324a] m-0 mb-3 leading-relaxed">
                  Chuyên sâu hợp đồng song ngữ, đầu tư nước ngoài và đàm phán thương mại.
                </p>
                <span className="text-xs font-semibold text-[#a3171e]">Xem hồ sơ &rarr;</span>
              </div>
            </Link>

            <Link
              href={`/${lang}/lawyers/duong-bao-ngoc`}
              className="grid grid-cols-[130px_1fr] sm:grid-cols-[150px_1fr] bg-white border border-[#e7dcc3] hover:border-[#c29a45] hover:shadow-[0_16px_32px_rgba(11,29,63,0.12)] transition-all group"
            >
              <div className="bg-[#0b1d3f] border-r-[3px] border-r-[#c29a45] overflow-hidden">
                <svg viewBox="0 0 100 125" className="w-full h-full block" preserveAspectRatio="xMidYMin slice">
                  <rect width="100" height="125" fill="#0b1d3f" />
                  <circle cx="50" cy="52" r="40" fill="#f0d28a" opacity="0.12" />
                  <path d="M28 62c-7-34 11-48 22-48s29 14 22 48v30H28z" fill="#161214" />
                  <path d="M6 125c0-30 16-42 44-44 28 2 44 14 44 44z" fill="#0d121c" />
                  <path d="M38 82l-10 43M62 82l10 43" stroke="#f0d28a" strokeWidth="0.8" fill="none" opacity="0.6" />
                  <path d="M38 82l12 16 12-16v14l-12 29-12-29z" fill="#f3f5f9" />
                  <path d="M47 96h6l3 29h-12z" fill="#a3171e" />
                  <ellipse cx="50" cy="52" rx="15" ry="19" fill="#e0b293" />
                  <path d="M34 48c-2-20 32-20 32 0-6-9-26-9-32 0z" fill="#161214" />
                </svg>
              </div>
              <div className="p-6 font-sans">
                <h3 className="font-royal font-bold text-2xl text-[#0b1d3f] group-hover:text-[#a3171e] transition-colors mb-0.5">
                  Dương Bảo Ngọc{" "}
                  <i className="font-chinese font-semibold text-sm text-[#a3171e] not-italic ml-1">
                    杨宝玉
                  </i>
                </h3>
                <small className="text-xs text-[#5b6174] block mb-2">Luật sư chuyên trách</small>
                <p className="text-sm text-[#27324a] m-0 mb-3 leading-relaxed">
                  Đối chiếu song ngữ, rà soát hợp đồng thương mại và xử lý tranh chấp giao dịch.
                </p>
                <span className="text-xs font-semibold text-[#a3171e]">Xem hồ sơ &rarr;</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Section 7: Hỏi đáp FAQ (#hoidap) */}
      <section className="py-20" id="hoidap">
        <div className="max-w-[900px] mx-auto px-6 sm:px-10">
          <div className="mb-10">
            <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#a3171e] flex items-center mb-2">
              <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">问答</b>
              {isZh ? "常见问答" : "Hỏi đáp"}
            </div>
            <h2 className="font-royal font-bold text-3xl sm:text-4xl text-[#0b1d3f]">
              {isZh ? "跨国企业在起草合同时的常见疑问" : "Câu hỏi thường gặp"}
            </h2>
          </div>

          <div className="border-t-2 border-t-[#a3171e] divide-y divide-[#e7dcc3] font-sans">
            {[
              {
                q: "Hợp đồng chỉ có bản tiếng Trung có giá trị tại Việt Nam không?",
                a: "Khi cần dùng làm chứng cứ tại Tòa án hoặc nộp cho cơ quan quản lý nhà nước tại Việt Nam, tài liệu tiếng nước ngoài bắt buộc phải có bản dịch công chứng sang tiếng Việt. Do đó, các bên nên chủ động ký kết văn bản song ngữ ngay từ đầu.",
              },
              {
                q: "Bản nào được ưu tiên khi có sự mâu thuẫn giữa hai ngôn ngữ?",
                a: "Do các bên tự do thỏa thuận trong điều khoản về ngôn ngữ và giải thích hợp đồng. Nếu không quy định rõ bản ưu tiên, khi phát sinh tranh chấp cơ quan xét xử sẽ căn cứ vào ý chí thực tế của các bên, dẫn đến nhiều rủi ro không lường trước.",
              },
              {
                q: "Tin nhắn WeChat có thể dùng làm chứng cứ trước Tòa án không?",
                a: "Hoàn toàn có thể, nếu chứng minh được danh tính người gửi, tính nguyên vẹn của dữ liệu điện tử và nguồn gốc xuất phát. Luật sư Vạn Ích sẽ hướng dẫn bạn phương án lập vi bằng Thừa phát lại để cố định chứng cứ hợp pháp.",
              },
              {
                q: "Chi phí dịch vụ hợp đồng được xác định như thế nào?",
                a: "Tùy thuộc vào phạm vi công việc bạn chọn: theo giờ, trọn gói theo từng hợp đồng hoặc đồng hành đàm phán. Mọi khoản chi phí đều được gửi văn bản báo giá minh bạch trước khi chính thức tiếp nhận vụ việc.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="py-5">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left font-royal font-bold text-xl sm:text-2xl text-[#0b1d3f] hover:text-[#a3171e] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="font-sans font-normal text-2xl text-[#a3171e] shrink-0 ml-4">
                    {openFaq === idx ? "–" : "+"}
                  </span>
                </button>
                {openFaq === idx && (
                  <p className="text-[15px] leading-relaxed text-[#5b6174] mt-3 max-w-[760px] m-0 animate-fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Section 8: Dịch vụ liên quan (.rc3) */}
      <section className="bg-[#fbf7ee] py-16 border-t border-[#e7dcc3]">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          <div className="mb-8">
            <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#a3171e] flex items-center mb-1">
              <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">相关</b>
              {isZh ? "关联服务" : "Dịch vụ liên quan"}
            </div>
            <h2 className="font-royal font-bold text-3xl sm:text-4xl text-[#0b1d3f]">
              {isZh ? "可能符合您业务需求的板块" : "Có thể bạn cũng cần"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tag: "Đầu tư",
                zh: "投",
                bg: "from-[#0a1a3a] to-[#25408a]",
                title: "Đầu tư nước ngoài",
                desc: "Thành lập doanh nghiệp FDI, cấp phép dự án và cơ cấu vốn.",
                href: `/${lang}/legal-services/dau-tu-nuoc-ngoai`,
              },
              {
                tag: "Thu hồi nợ",
                zh: "债",
                bg: "from-[#2a1a3a] to-[#7a2418]",
                title: "Thu hồi nợ",
                desc: "Đàm phán hòa giải, khởi kiện và thi hành án thu hồi công nợ.",
                href: `/${lang}/legal-services/thu-hoi-no`,
              },
              {
                tag: "Tranh tụng",
                zh: "诉",
                bg: "from-[#06122b] to-[#122650]",
                title: "Tranh tụng & trọng tài",
                desc: "Đại diện bảo vệ quyền lợi tại Tòa án và các Trung tâm Trọng tài.",
                href: `/${lang}/legal-services/tranh-tung-trong-tai`,
              },
            ].map((srv, idx) => (
              <Link
                key={idx}
                href={srv.href}
                className="bg-white border border-[#e7dcc3] flex flex-col shadow-[0_10px_28px_rgba(11,29,63,0.07)] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(11,29,63,0.14)] transition-all group"
              >
                <div className={`aspect-[3/2] relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${srv.bg}`}>
                  <span className="absolute left-0 top-4 bg-[#a3171e] text-white font-sans font-semibold text-[11px] tracking-wider uppercase px-3 py-1 z-10">
                    {srv.tag}
                  </span>
                  <i className="font-chinese font-bold text-7xl text-[#f0d28a]/90 not-italic select-none">
                    {srv.zh}
                  </i>
                </div>
                <div className="p-6 font-sans flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-royal font-bold text-2xl text-[#0b1d3f] group-hover:text-[#a3171e] transition-colors mb-2">
                      {srv.title}
                    </h3>
                    <p className="text-sm text-[#5b6174] m-0 mb-4 leading-relaxed">{srv.desc}</p>
                  </div>
                  <span className="text-xs font-semibold text-[#a3171e] tracking-wide">
                    Xem chi tiết &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Banner kêu gọi liên hệ chân trang (.band) */}
      <section className="bg-[radial-gradient(700px_400px_at_90%_0,rgba(194,154,69,0.2),transparent_60%),linear-gradient(135deg,#071530,#102a58)] text-white border-t-4 border-[#a3171e] py-16 relative overflow-hidden" id="lienhe-cta">
        <div
          className="absolute -left-[30px] -bottom-[150px] font-chinese font-bold text-[360px] sm:text-[520px] leading-none text-transparent select-none pointer-events-none"
          style={{ WebkitTextStroke: "1px rgba(194,154,69,0.18)" }}
          aria-hidden="true"
        >
          律
        </div>

        <div className="max-w-[1180px] mx-auto px-6 sm:px-10 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#f0d28a] flex items-center mb-3">
              <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">委托</b>
              {isZh ? "法律咨询委托" : "Liên hệ luật sư"}
            </div>
            <h2 className="font-royal font-bold text-3xl sm:text-[46px] text-white leading-tight">
              {isZh ? (
                <>使用越南语或中文与 <i className="text-[#f0d28a] not-italic font-normal">专业律师</i> 直接对话</>
              ) : (
                <>Nói chuyện với <i className="text-[#f0d28a] not-italic font-normal">luật sư</i> bằng tiếng Việt hoặc 中文</>
              )}
            </h2>
            <p className="text-[#b6c0d6] text-sm sm:text-base font-sans mt-2 m-0">
              {isZh
                ? "24个工作小时内迅速答复 · 正式接受委托前以书面形式核算报价"
                : "Phản hồi trong 24 giờ làm việc · Báo phí trước khi nhận vụ việc"}
            </p>
          </div>

          <div className="flex gap-3.5 flex-wrap shrink-0">
            <a
              href="tel:0900123456"
              className="inline-flex items-center gap-2.5 bg-gradient-to-b from-[#f0d28a] to-[#c29a45] text-[#06122b] font-sans font-semibold text-[13px] tracking-[1.3px] uppercase px-7 py-4 shadow-none hover:brightness-110 transition-all"
            >
              Gọi 0900 123 456
            </a>
            <a
              href="mailto:lienhe@vanichlaw.vn"
              className="inline-flex items-center gap-2.5 bg-transparent text-white font-sans font-semibold text-[13px] tracking-[1.3px] uppercase px-7 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)] hover:bg-white/10 transition-all"
            >
              Gửi email
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
