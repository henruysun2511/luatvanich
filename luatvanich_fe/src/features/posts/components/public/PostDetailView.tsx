"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface PostDetailViewProps {
  lang: string;
  slug?: string;
}

export function PostDetailView({ lang, slug }: PostDetailViewProps) {
  const isZh = lang === "zh-CN";

  const [activeSpy, setActiveSpy] = useState<string>("s1");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // ScrollSpy cho các đề mục bài viết #s1 đến #s5
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["s1", "s2", "s3", "s4", "s5"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSpy(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => showToast(isZh ? "已复制文章链接" : "Đã sao chép liên kết bài viết"))
        .catch(() => showToast(isZh ? "无法复制，请手动复制" : "Không sao chép được, hãy copy thủ công"));
    }
  };

  return (
    <>
      {/* 1. Page Hero Banner (.ph data-z="债") */}
      <section className="relative bg-[radial-gradient(800px_420px_at_85%_10%,rgba(194,154,69,0.2),transparent_60%),radial-gradient(600px_400px_at_0%_100%,rgba(163,23,30,0.3),transparent_60%),linear-gradient(135deg,#071530,#0f2a58_60%,#0b1d3f)] text-white overflow-hidden">
        {/* Chữ Hán rỗng nét watermark khổng lồ 债 */}
        <div
          className="absolute right-[30px] -bottom-[130px] font-chinese font-bold text-[260px] sm:text-[380px] lg:text-[480px] leading-none text-transparent select-none pointer-events-none z-0"
          style={{ WebkitTextStroke: "1px rgba(194,154,69,0.22)" }}
          aria-hidden="true"
        >
          债
        </div>

        <div className="max-w-[1180px] mx-auto px-6 sm:px-10 relative z-10 pt-11 pb-16 lg:pb-[70px]">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2.5 flex-wrap text-[13px] text-[#aab6d0] mb-[34px] font-sans" aria-label="Breadcrumb">
            <Link href={`/${lang}`} className="hover:text-[#f0d28a] transition-colors">
              {isZh ? "首页" : "Trang chủ"}
            </Link>
            <span className="opacity-50">/</span>
            <Link href={`/${lang}/posts`} className="hover:text-[#f0d28a] transition-colors">
              {isZh ? "法务指南" : "Cẩm nang"}
            </Link>
            <span className="opacity-50">/</span>
            <Link href={`/${lang}/posts`} className="hover:text-[#f0d28a] transition-colors">
              {isZh ? "焦点文章" : "Tiêu điểm luật"}
            </Link>
            <span className="opacity-50">/</span>
            <b className="font-normal text-[#f0d28a]">
              {isZh ? "债务追收" : "Thu hồi nợ"}
            </b>
          </nav>

          {/* Tiêu đề & Metadata bài viết */}
          <div className="max-w-[860px]">
            <span className="inline-block bg-gradient-to-r from-[#a3171e] to-[#7c1015] text-[#f0d28a] font-sans font-semibold text-[11.5px] tracking-[2px] uppercase px-4 py-1.5 border border-[#f0d28a]/45">
              {isZh ? "跨境债务追收 · 债务" : "Thu hồi nợ · 债务"}
            </span>

            <h1 className="font-royal font-bold text-4xl sm:text-5xl lg:text-[64px] leading-[1.15] text-white my-5">
              {isZh
                ? "跨境租赁厂房定金纠纷防范：签约交付定金不可忽视的五大雷区"
                : "Mất tiền đặt cọc thuê nhà xưởng: sai lầm cần tránh khi đặt cọc"}
            </h1>

            {/* Meta bar: Tác giả, Ngày, Thời gian đọc, Lượt xem */}
            <div className="flex gap-6 flex-wrap items-center text-[#b6c0d6] text-[13.5px] font-sans mt-6">
              <span className="flex items-center gap-3">
                <i className="w-10 h-10 bg-[#a3171e] text-[#fbeed0] font-chinese font-bold text-xl not-italic flex items-center justify-center">
                  河
                </i>
                <span>
                  <b className="block text-white text-sm font-semibold">Trần Thu Hà</b>
                  <small className="text-xs text-[#aab6d0]">{isZh ? "合伙人律师" : "Luật sư thành viên"}</small>
                </span>
              </span>
              <span>25/11/2026</span>
              <span>{isZh ? "预计阅读 7 分钟" : "7 phút đọc"}</span>
              <span>1.284 {isZh ? "次阅读" : "lượt xem"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Thân bài viết & Sidebar (.lay) */}
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 py-16 lg:py-[70px] grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-12 lg:gap-[70px]">
        {/* Cột trái: Nội dung bài viết (.art) */}
        <article className="font-sans text-[#27324a] space-y-10">
          {/* Đoạn mở đầu (.lead) */}
          <p className="font-royal italic font-medium text-2xl sm:text-[28px] leading-[1.45] text-[#0b1d3f] border-l-[3px] border-l-[#c29a45] pl-6 m-0">
            {isZh
              ? "一笔几亿越南盾的厂房租赁定金，往往仅因合同中缺少了一句关键约定而演化为旷日持久的跨境追索难题。以下为涉华企业赴越投资租赁厂房中最常见的合规漏洞。"
              : "Một khoản đặt cọc vài trăm triệu đồng có thể biến thành tranh chấp kéo dài chỉ vì thiếu một dòng trong hợp đồng. Dưới đây là những sai lầm doanh nghiệp thường gặp khi thuê nhà xưởng."}
          </p>

          {/* S1: Vì sao hay mất tiền cọc? */}
          <section id="s1" className="scroll-mt-28 space-y-4">
            <h2 className="font-royal font-bold text-3xl sm:text-[38px] text-[#0b1d3f] leading-snug">
              <span className="block font-sans font-semibold text-xs tracking-[3px] text-[#a3171e] uppercase mb-1">01</span>
              {isZh ? "企业为何极易丧失定金？" : "Vì sao doanh nghiệp hay mất tiền cọc?"}
            </h2>
            <p className="text-[17px] leading-[1.9] text-[#27324a]">
              Nhiều nhà đầu tư nước ngoài chuyển tiền cọc ngay sau cuộc trao đổi đầu tiên, khi chưa kiểm tra quyền cho thuê của chủ nhà và chưa thống nhất điều kiện hoàn trả. Khi dự án thay đổi hoặc chủ nhà đổi ý, khoản tiền này rất khó đòi lại.
            </p>
            <ul className="space-y-3 pt-2">
              {[
                "Hợp đồng đặt cọc chỉ có bản tiếng Trung hoặc bản dịch sơ sài, hai bản lệch nghĩa nghiêm trọng.",
                "Không ghi rõ mục đích của khoản tiền: đặt cọc, tạm ứng hay thanh toán trước.",
                "Người ký không có thẩm quyền đại diện, hoặc nhà xưởng chưa đủ giấy tờ pháp lý để cho thuê.",
                "Không quy định thời hạn và điều kiện tiên quyết để giao kết hợp đồng thuê chính thức.",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-base text-[#27324a] pt-2.5 border-t border-[#e7dcc3]">
                  <span className="w-2 h-2 bg-[#a3171e] rotate-45 shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* S2: Điều khoản cần có & Khối song ngữ */}
          <section id="s2" className="scroll-mt-28 space-y-6 border-t border-[#e7dcc3] pt-10">
            <h2 className="font-royal font-bold text-3xl sm:text-[38px] text-[#0b1d3f] leading-snug">
              <span className="block font-sans font-semibold text-xs tracking-[3px] text-[#a3171e] uppercase mb-1">02</span>
              {isZh ? "定金协议必须具备的关键核心条款" : "Điều khoản cần có trong hợp đồng đặt cọc"}
            </h2>
            <p className="text-[17px] leading-[1.9] text-[#27324a]">
              Hợp đồng nên nêu rõ số tiền, thời hạn, điều kiện giao kết và hậu quả khi mỗi bên không thực hiện. Với hợp đồng song ngữ, cần ghi bản nào được ưu tiên khi hai bản khác nhau.
            </p>

            {/* Trích dẫn nổi bật (.pq) */}
            <div className="bg-[#0b1d3f] text-white p-8 sm:px-12 sm:py-9 relative font-royal italic font-medium text-2xl sm:text-[28px] leading-[1.4] my-8 shadow-sm">
              <span className="absolute left-4 -top-3 font-royal font-bold text-7xl text-[#c29a45] leading-none pointer-events-none select-none">
                “
              </span>
              Hợp đồng tốt không phải hợp đồng dài, mà là hợp đồng mà cả hai bên đều hiểu giống nhau.
            </div>

            {/* Hộp so sánh đối chiếu song ngữ (.bl) */}
            <div className="border border-[#e7dcc3] bg-white shadow-[0_10px_30px_rgba(11,29,63,0.07)] my-8">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Cột tiếng Việt */}
                <div className="p-7 border-b md:border-b-0 md:border-r border-[#e7dcc3]">
                  <div className="flex justify-between font-sans font-semibold text-[11.5px] tracking-[2px] uppercase text-[#5b6174] border-b border-[#e7dcc3] pb-2.5 mb-3.5">
                    <span>Bản tiếng Việt</span>
                    <span>Điều 5</span>
                  </div>
                  <h3 className="font-royal font-bold text-2xl text-[#0b1d3f] mb-2">Hậu quả khi từ chối</h3>
                  <p className="text-[15px] leading-[1.7] text-[#27324a] m-0">
                    Nếu bên nhận cọc từ chối giao kết hợp đồng thuê thì phải hoàn trả tiền cọc và{" "}
                    <mark className="bg-[#a3171e]/15 text-[#7c1015] font-semibold px-1 border-b-2 border-[#a3171e]">
                      một khoản tiền tương đương số tiền cọc
                    </mark>
                    .
                  </p>
                </div>

                {/* Cột 中文 */}
                <div className="p-7 bg-[#fbf9f4]">
                  <div className="flex justify-between font-sans font-semibold text-[11.5px] tracking-[2px] uppercase text-[#5b6174] border-b border-[#e7dcc3] pb-2.5 mb-3.5">
                    <span>中文版本</span>
                    <span>第五条</span>
                  </div>
                  <h3 className="font-chinese font-bold text-2xl text-[#0b1d3f] mb-2">拒绝订约的后果</h3>
                  <p className="font-chinese font-medium text-base leading-[2] text-[#27324a] m-0">
                    如收取定金一方拒绝订立租赁合同，应返还定金并{" "}
                    <mark className="bg-[#a3171e]/15 text-[#7c1015] font-semibold px-1 border-b-2 border-[#a3171e]">
                      另行支付与定金等额的款项
                    </mark>
                    。
                  </p>
                </div>
              </div>

              {/* Dải cảnh báo chân hộp (.flag) */}
              <div className="bg-[#a3171e] text-white px-7 py-3.5 flex flex-wrap items-center gap-4 text-sm font-sans">
                <b className="font-bold text-[11px] tracking-[2px] uppercase border border-white/50 px-2.5 py-0.5 whitespace-nowrap">
                  {isZh ? "防范要点" : "Kiểm tra"}
                </b>
                <span>
                  Đối chiếu hai bản để chắc chắn mức bồi hoàn được hiểu giống nhau, và bắt buộc ghi rõ ngôn ngữ ưu tiên.
                </span>
              </div>
            </div>
          </section>

          {/* S3: So sánh pháp lý & Bảng table.cmp */}
          <section id="s3" className="scroll-mt-28 space-y-6 border-t border-[#e7dcc3] pt-10">
            <h2 className="font-royal font-bold text-3xl sm:text-[38px] text-[#0b1d3f] leading-snug">
              <span className="block font-sans font-semibold text-xs tracking-[3px] text-[#a3171e] uppercase mb-1">03</span>
              {isZh ? "定金、预付款与违约金之法律界限对照" : "So sánh đặt cọc, tạm ứng và phạt vi phạm"}
            </h2>
            <p className="text-[17px] leading-[1.9] text-[#27324a]">
              Ba khái niệm này thường bị nhầm lẫn, trong khi hậu quả pháp lý theo Luật Dân sự và Luật Thương mại Việt Nam hoàn toàn khác nhau.
            </p>

            {/* Bảng so sánh chuẩn (.cmp) */}
            <div className="overflow-x-auto my-6 border border-[#e7dcc3]">
              <table className="w-full border-collapse text-[14.5px] bg-white font-sans">
                <thead>
                  <tr className="bg-gradient-to-r from-[#0b1d3f] to-[#16336a] text-[#f0d28a] border-b-[3px] border-b-[#a3171e]">
                    <th className="p-3.5 sm:p-4 text-left font-semibold text-xs tracking-wider uppercase">Tiêu chí</th>
                    <th className="p-3.5 sm:p-4 text-left font-semibold text-xs tracking-wider uppercase">Đặt cọc</th>
                    <th className="p-3.5 sm:p-4 text-left font-semibold text-xs tracking-wider uppercase">Tạm ứng</th>
                    <th className="p-3.5 sm:p-4 text-left font-semibold text-xs tracking-wider uppercase">Phạt vi phạm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7dcc3]">
                  <tr className="hover:bg-[#fffdf8] transition-colors">
                    <td className="p-3.5 sm:p-4 font-semibold text-[#0b1d3f]">Mục đích</td>
                    <td className="p-3.5 sm:p-4 text-[#27324a]">Bảo đảm giao kết, thực hiện</td>
                    <td className="p-3.5 sm:p-4 text-[#27324a]">Thanh toán trước một phần</td>
                    <td className="p-3.5 sm:p-4 text-[#27324a]">Chế tài khi vi phạm hợp đồng</td>
                  </tr>
                  <tr className="bg-[#fffaf0] hover:bg-[#fffdf8] transition-colors">
                    <td className="p-3.5 sm:p-4 font-semibold text-[#0b1d3f]">Bên nhận vi phạm</td>
                    <td className="p-3.5 sm:p-4 text-[#27324a]">Hoàn trả và thêm khoản tương đương</td>
                    <td className="p-3.5 sm:p-4 text-[#27324a]">Hoàn trả nguyên số đã nhận</td>
                    <td className="p-3.5 sm:p-4 text-[#27324a]">Theo thỏa thuận (giới hạn 8% TM)</td>
                  </tr>
                  <tr className="hover:bg-[#fffdf8] transition-colors">
                    <td className="p-3.5 sm:p-4 font-semibold text-[#0b1d3f]">Bên giao vi phạm</td>
                    <td className="p-3.5 sm:p-4 text-[#27324a]">Mất toàn bộ khoản đã đặt cọc</td>
                    <td className="p-3.5 sm:p-4 text-[#27324a]">Không mất, được nhận lại</td>
                    <td className="p-3.5 sm:p-4 text-[#27324a]">Theo thỏa thuận (giới hạn 8% TM)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white border border-[#e7dcc3] border-l-4 border-l-[#a3171e] p-5">
              <b className="block font-sans font-bold text-xs tracking-[2px] uppercase text-[#a3171e] mb-1.5">
                {isZh ? "实务法评" : "Lưu ý pháp lý"}
              </b>
              <p className="text-[15px] text-[#5b6174] m-0">
                Bảng trên tóm tắt nguyên tắc chung theo luật Việt Nam. Từng vụ việc cần xem xét ngôn từ hợp đồng và tài liệu chuyển tiền thực tế để định danh chính xác.
              </p>
            </div>
          </section>

          {/* S4: 5 bước cần làm trước khi chuyển tiền */}
          <section id="s4" className="scroll-mt-28 space-y-6 border-t border-[#e7dcc3] pt-10">
            <h2 className="font-royal font-bold text-3xl sm:text-[38px] text-[#0b1d3f] leading-snug">
              <span className="block font-sans font-semibold text-xs tracking-[3px] text-[#a3171e] uppercase mb-1">04</span>
              {isZh ? "支付定金前应当落实的五道防线" : "Năm bước nên làm trước khi chuyển tiền"}
            </h2>
            <ol className="space-y-6 relative border-l border-[#c29a45] ml-5 pl-8">
              {[
                { title: "Xác minh chủ nhà", desc: "Kiểm tra giấy chứng nhận quyền sử dụng đất, giấy phép xây dựng và quyền cho thuê nhà xưởng hợp pháp." },
                { title: "Thống nhất điều kiện bằng văn bản", desc: "Xác lập rõ giá thuê, thời hạn, điều kiện bàn giao và các mốc hoàn cọc nếu không đạt điều kiện." },
                { title: "Đối chiếu hợp đồng song ngữ", desc: "Nhờ luật sư có chuyên môn đọc trực tiếp cả hai bản Việt – Trung trước khi ký kết văn bản." },
                { title: "Chuyển khoản có nội dung rõ ràng", desc: "Ghi đúng mục đích thanh toán theo hợp đồng vào ủy nhiệm chi và lưu giữ chứng từ ngân hàng." },
                { title: "Lưu giữ toàn bộ trao đổi", desc: "Lưu trữ email đàm phán, tin nhắn WeChat có xác nhận danh tính và biên bản họp có chữ ký các bên." },
              ].map((step, idx) => (
                <li key={idx} className="relative">
                  <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-[#0b1d3f] border border-[#c29a45] text-[#f0d28a] font-royal font-bold text-sm flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <b className="block font-royal font-bold text-xl text-[#0b1d3f] mb-1">{step.title}</b>
                  <span className="text-[15.5px] text-[#5b6174] leading-relaxed block">{step.desc}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* S5: Khi đã mất cọc & Tags & Tác giả */}
          <section id="s5" className="scroll-mt-28 space-y-6 border-t border-[#e7dcc3] pt-10">
            <h2 className="font-royal font-bold text-3xl sm:text-[38px] text-[#0b1d3f] leading-snug">
              <span className="block font-sans font-semibold text-xs tracking-[3px] text-[#a3171e] uppercase mb-1">05</span>
              {isZh ? "已发生纠纷：法定维权追讨路径" : "Khi đã mất cọc: lộ trình xử lý"}
            </h2>
            <p className="text-[17px] leading-[1.9] text-[#27324a]">
              Trước hết, gửi thông báo yêu cầu hoàn trả bằng văn bản có bảo đảm và lưu bằng chứng gửi. Sau đó cân nhắc đàm phán trực tiếp, hòa giải thương mại hoặc khởi kiện tại Tòa án / Trọng tài có thẩm quyền. Thời hiệu khởi kiện có hạn, doanh nghiệp không nên trì hoãn quá lâu.
            </p>

            <div className="bg-white border border-[#e7dcc3] border-l-4 border-l-[#a3171e] p-5">
              <b className="block font-sans font-bold text-xs tracking-[2px] uppercase text-[#a3171e] mb-1.5">
                {isZh ? "免责声明" : "Miễn trừ trách nhiệm"}
              </b>
              <p className="text-[15px] text-[#5b6174] m-0">
                Bài viết mang tính tham khảo kiến thức pháp lý đại cương và không thay thế ý kiến tư vấn chính thức cho từng vụ việc cụ thể.
              </p>
            </div>

            {/* Thẻ bài viết (.tags) */}
            <div className="flex gap-2 flex-wrap pt-4">
              {["Đặt cọc", "Thuê nhà xưởng", "Hợp đồng song ngữ", "Thu hồi nợ"].map((t, idx) => (
                <span
                  key={idx}
                  className="border border-[#e7dcc3] px-3.5 py-1.5 text-xs text-[#5b6174] bg-white hover:border-[#a3171e] hover:text-[#a3171e] transition-colors cursor-pointer"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Hộp tác giả (.ab) */}
            <div className="flex items-center gap-5 bg-[#fbf7ee] border border-[#e7dcc3] p-6 mt-8">
              <i className="w-16 h-16 bg-[#a3171e] text-[#fbeed0] font-chinese font-bold text-3xl not-italic flex items-center justify-center shrink-0 shadow-[0_0_0_4px_#f4dedc]">
                河
              </i>
              <div>
                <b className="font-royal font-bold text-2xl text-[#0b1d3f] block">
                  Trần Thu Hà · 陈秋河
                </b>
                <p className="text-[14.5px] text-[#5b6174] m-0 mt-1 leading-normal">
                  Luật sư thành viên, chuyên trách hợp đồng song ngữ và thu hồi nợ cho doanh nghiệp Việt – Trung.{" "}
                  <Link href={`/${lang}/lawyers/tran-thu-ha`} className="text-[#a3171e] font-semibold hover:underline">
                    Xem hồ sơ chi tiết &rarr;
                  </Link>
                </p>
              </div>
            </div>

            {/* Điều hướng Bài trước / Bài sau (.pn2) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
              <Link
                href={`/${lang}/posts/luat-dau-tu-2025-thay-doi`}
                className="border border-[#e7dcc3] p-5 bg-white hover:border-[#c29a45] hover:shadow-[0_12px_28px_rgba(11,29,63,0.1)] transition-all group"
              >
                <small className="font-sans font-semibold text-[11px] tracking-[2px] uppercase text-[#a3171e]">
                  &larr; {isZh ? "上一篇" : "Bài trước"}
                </small>
                <b className="block font-royal font-bold text-xl text-[#0b1d3f] mt-1 group-hover:text-[#a3171e] transition-colors">
                  Luật Đầu tư 2025: điều nhà đầu tư cần rà lại
                </b>
              </Link>

              <Link
                href={`/${lang}/posts/phong-toa-tai-san-con-no`}
                className="border border-[#e7dcc3] p-5 bg-white hover:border-[#c29a45] hover:shadow-[0_12px_28px_rgba(11,29,63,0.1)] transition-all md:text-right group"
              >
                <small className="font-sans font-semibold text-[11px] tracking-[2px] uppercase text-[#a3171e]">
                  {isZh ? "下一篇" : "Bài sau"} &rarr;
                </small>
                <b className="block font-royal font-bold text-xl text-[#0b1d3f] mt-1 group-hover:text-[#a3171e] transition-colors">
                  Phong tỏa tài sản “con nợ”: khi nào được yêu cầu
                </b>
              </Link>
            </div>
          </section>
        </article>

        {/* Cột phải: Sidebar cố định (.aside) */}
        <aside className="sticky top-28 self-start space-y-6">
          {/* Mục lục TOC (.box.toc) */}
          <div className="bg-white border border-[#e7dcc3] p-6 shadow-sm">
            <h4 className="font-sans font-semibold text-[11.5px] tracking-[2.5px] uppercase text-[#a3171e] mb-3.5">
              {isZh ? "文章目录" : "Mục lục"}
            </h4>
            <nav className="space-y-1 text-sm font-sans">
              {[
                { id: "s1", label: isZh ? "为何极易丧失定金" : "Vì sao hay mất tiền cọc?" },
                { id: "s2", label: isZh ? "定金协议必备条款" : "Điều khoản cần có" },
                { id: "s3", label: isZh ? "定金与违约金对照" : "So sánh các khái niệm" },
                { id: "s4", label: isZh ? "支付前五道防线" : "Năm bước trước khi chuyển tiền" },
                { id: "s5", label: isZh ? "纠纷维权解决路径" : "Khi đã mất cọc" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block py-1.5 pl-3.5 border-l-2 transition-all ${
                    activeSpy === item.id
                      ? "border-[#a3171e] text-[#0b1d3f] font-semibold"
                      : "border-[#e7dcc3] text-[#5b6174] hover:border-[#a3171e] hover:text-[#0b1d3f]"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Hộp tư vấn hợp đồng (.cb) */}
          <div className="bg-gradient-to-br from-[#0b1d3f] to-[#16336a] text-white p-7 border-t-[3px] border-t-[#c29a45] shadow-sm">
            <b className="block font-royal font-bold text-2xl lg:text-[28px] leading-tight mb-2">
              {isZh ? "需要合同审阅咨询？" : "Cần tư vấn hợp đồng?"}
            </b>
            <p className="text-sm text-[#b6c0d6] font-sans mb-3.5 leading-relaxed">
              Luật sư đọc đối chiếu trực tiếp cả hai bản Việt – Trung trước khi bạn ký kết.
            </p>
            <span className="block font-royal font-bold text-3xl text-[#f0d28a] mb-4">
              0900 123 456
            </span>
            <a
              href="#lienhe-cta"
              className="inline-flex w-full justify-center bg-gradient-to-b from-[#f0d28a] to-[#c29a45] text-[#06122b] font-sans font-semibold text-xs tracking-wider uppercase py-3 hover:brightness-110 transition-all"
            >
              {isZh ? "预约专业咨询" : "Đặt lịch tư vấn"}
            </a>
          </div>

          {/* Dịch vụ liên quan (.box.ll) */}
          <div className="bg-white border border-[#e7dcc3] p-6 shadow-sm">
            <h4 className="font-sans font-semibold text-[11.5px] tracking-[2.5px] uppercase text-[#a3171e] mb-3">
              {isZh ? "关联法律服务" : "Dịch vụ liên quan"}
            </h4>
            <div className="divide-y divide-[#e7dcc3] font-sans text-sm">
              {[
                { title: "Hợp đồng song ngữ", zh: "约", href: `/${lang}/legal-services/hop-dong-song-ngu` },
                { title: "Thu hồi nợ", zh: "债", href: `/${lang}/legal-services/thu-hoi-no` },
                { title: "Tranh tụng & trọng tài", zh: "诉", href: `/${lang}/legal-services/tranh-tung-trong-tai` },
              ].map((srv, idx) => (
                <Link
                  key={idx}
                  href={srv.href}
                  className="flex items-center justify-between py-2.5 hover:text-[#a3171e] transition-colors"
                >
                  <span>{srv.title}</span>
                  <em className="font-chinese font-bold text-base not-italic text-[#c29a45]">{srv.zh}</em>
                </Link>
              ))}
            </div>
          </div>

          {/* Hộp chia sẻ (.box) */}
          <div className="bg-white border border-[#e7dcc3] p-6 shadow-sm">
            <h4 className="font-sans font-semibold text-[11.5px] tracking-[2.5px] uppercase text-[#a3171e] mb-3">
              {isZh ? "分享本文" : "Chia sẻ"}
            </h4>
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleCopyLink}
                className="bg-[#0b1d3f] hover:bg-[#16336a] text-white px-3.5 py-2 font-sans font-semibold text-xs cursor-pointer transition-colors"
              >
                {isZh ? "复制链接" : "Sao chép liên kết"}
              </button>
              <button
                type="button"
                onClick={() => showToast("Đã chia sẻ lên Zalo")}
                className="bg-gradient-to-b from-[#f0d28a] to-[#c29a45] text-[#06122b] px-3.5 py-2 font-sans font-semibold text-xs cursor-pointer transition-colors"
              >
                Zalo
              </button>
              <button
                type="button"
                onClick={() => showToast("Đã chia sẻ lên WeChat")}
                className="bg-gradient-to-b from-[#f0d28a] to-[#c29a45] text-[#06122b] px-3.5 py-2 font-sans font-semibold text-xs cursor-pointer transition-colors"
              >
                微信
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* 3. Bài viết liên quan (.rc3) */}
      <section className="bg-[#fbf7ee] py-16 border-t border-[#e7dcc3]">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          <div className="mb-10">
            <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#a3171e] flex items-center mb-2">
              <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">相关</b>
              {isZh ? "关联阅读" : "Đọc thêm"}
            </div>
            <h2 className="font-royal font-bold text-3xl sm:text-4xl text-[#0b1d3f]">
              {isZh ? "更多实务法评文章" : "Bài viết liên quan"}
            </h2>
            <p className="text-sm text-[#5b6174] font-sans mt-2 m-0">
              Các phân tích khác về hợp đồng, đầu tư và tranh chấp thương mại có yếu tố Trung Quốc.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tag: "Đầu tư",
                zh: "投",
                bg: "from-[#2a1a3a] to-[#7a2418]",
                title: "Luật Đầu tư 2025: những thay đổi lớn với nhà đầu tư nước ngoài",
                excerpt: "Nhiều thay đổi đáng chú ý về điều kiện và thủ tục cấp phép đầu tư mới…",
                href: `/${lang}/posts/luat-dau-tu-2025-thay-doi`,
              },
              {
                tag: "Tố tụng",
                zh: "封",
                bg: "from-[#06122b] to-[#122650]",
                title: "Phong tỏa tài sản “con nợ”: khi nào được yêu cầu",
                excerpt: "Khi nào chủ nợ được yêu cầu Tòa án phong tỏa tài sản đối tác trước khi xét xử…",
                href: `/${lang}/posts/phong-toa-tai-san-con-no`,
              },
              {
                tag: "Hợp đồng",
                zh: "约",
                bg: "from-[#2a1210] to-[#0a1a3a]",
                title: "Hợp đồng song ngữ Việt – Trung: điểm cần lưu ý",
                excerpt: "Xử lý khác biệt ngôn ngữ và điều khoản ưu tiên để tránh tranh chấp về sau…",
                href: `/${lang}/posts/hop-dong-song-ngu-ban-nao-uu-tien`,
              },
            ].map((rel, idx) => (
              <Link
                key={idx}
                href={rel.href}
                className="bg-white border border-[#e7dcc3] flex flex-col shadow-[0_10px_28px_rgba(11,29,63,0.07)] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(11,29,63,0.14)] transition-all group"
              >
                <div className={`aspect-[3/2] relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${rel.bg}`}>
                  <span className="absolute left-0 top-4 bg-[#a3171e] text-white font-sans font-semibold text-[11px] tracking-wider uppercase px-3 py-1 z-10">
                    {rel.tag}
                  </span>
                  <i className="font-chinese font-bold text-7xl text-[#f0d28a]/90 not-italic select-none">
                    {rel.zh}
                  </i>
                </div>
                <div className="p-6 font-sans flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-royal font-bold text-2xl text-[#0b1d3f] group-hover:text-[#a3171e] transition-colors mb-2 leading-snug">
                      {rel.title}
                    </h3>
                    <p className="text-sm text-[#5b6174] m-0 mb-4 leading-relaxed">{rel.excerpt}</p>
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

      {/* 4. Banner kêu gọi liên hệ chân trang (.band) */}
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

      {/* Toast thông báo */}
      {toastMessage && (
        <div className="fixed left-1/2 bottom-8 -translate-x-1/2 bg-[#0b1d3f] text-[#f0d28a] border border-[#c29a45] px-6 py-3 text-sm font-sans z-[100] shadow-xl animate-fade-in pointer-events-none">
          {toastMessage}
        </div>
      )}
    </>
  );
}
