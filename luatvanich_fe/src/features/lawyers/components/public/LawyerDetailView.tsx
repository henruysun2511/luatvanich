"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface LawyerDetailViewProps {
  lang: string;
  slug?: string;
}

export function LawyerDetailView({ lang, slug }: LawyerDetailViewProps) {
  const isZh = lang === "zh-CN";

  // State cho widget đặt lịch hẹn
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeSpy, setActiveSpy] = useState<string>("p1");

  // Tạo 5 ngày làm việc tiếp theo (bỏ qua T7, CN)
  const [availableDays, setAvailableDays] = useState<{ date: number; month: number; year: string; dayName: string }[]>([]);

  useEffect(() => {
    const dayNamesVi = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    const dayNamesZh = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const days: { date: number; month: number; year: string; dayName: string }[] = [];
    const now = new Date();

    for (let i = 0; days.length < 5; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i + 1);
      if (d.getDay() !== 0 && d.getDay() !== 6) {
        days.push({
          date: d.getDate(),
          month: d.getMonth() + 1,
          year: String(d.getFullYear()).slice(2),
          dayName: isZh ? dayNamesZh[d.getDay()] : dayNamesVi[d.getDay()],
        });
      }
    }
    setAvailableDays(days);
  }, [isZh]);

  // Khung giờ
  const timeSlots = ["09:00", "10:30", "14:00", "15:30", "16:30", "17:00"];

  // ScrollSpy cho các đề mục #p1 đến #p6
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["p1", "p2", "p3", "p4", "p5", "p6"];
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

  const handleConfirmBooking = () => {
    if (selectedDayIndex !== null && selectedTime) {
      const day = availableDays[selectedDayIndex];
      showToast(
        isZh
          ? `已成功登记预约：${day.dayName} ${day.date}/${day.month} ${selectedTime}`
          : `Đã ghi nhận yêu cầu đặt lịch: ${day.dayName} ${day.date}/${day.month} lúc ${selectedTime}`
      );
      setSelectedDayIndex(null);
      setSelectedTime(null);
    }
  };

  return (
    <>
      {/* 1. Page Hero Banner (.ph) */}
      <section className="relative bg-[radial-gradient(800px_420px_at_85%_10%,rgba(194,154,69,0.2),transparent_60%),radial-gradient(600px_400px_at_0%_100%,rgba(163,23,30,0.3),transparent_60%),linear-gradient(135deg,#071530,#0f2a58_60%,#0b1d3f)] text-white overflow-hidden">
        {/* Chữ Hán rỗng nét khổng lồ 律 */}
        <div
          className="absolute right-[30px] -bottom-[130px] font-chinese font-bold text-[260px] sm:text-[380px] lg:text-[480px] leading-none text-transparent select-none pointer-events-none z-0"
          style={{ WebkitTextStroke: "1px rgba(194,154,69,0.22)" }}
          aria-hidden="true"
        >
          律
        </div>

        <div className="max-w-[1180px] mx-auto px-6 sm:px-10 relative z-10 pt-11 pb-20 lg:pb-[90px]">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2.5 flex-wrap text-[13px] text-[#aab6d0] mb-[34px] font-sans" aria-label="Breadcrumb">
            <Link href={`/${lang}`} className="hover:text-[#f0d28a] transition-colors">
              {isZh ? "首页" : "Trang chủ"}
            </Link>
            <span className="opacity-50">/</span>
            <Link href={`/${lang}/lawyers`} className="hover:text-[#f0d28a] transition-colors">
              {isZh ? "律师名录" : "Đội ngũ luật sư"}
            </Link>
            <span className="opacity-50">/</span>
            <b className="font-normal text-[#f0d28a]">Trần Thu Hà</b>
          </nav>

          {/* Profile Hero Grid (.pf) */}
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 lg:gap-16 items-center">
            {/* Cột trái: Chân dung lồng khung vàng kép (.pt, .fr0, .sl2) */}
            <div className="relative pb-[18px] pl-[18px] max-w-[300px] lg:max-w-none mx-auto lg:mx-0">
              {/* Khung viền ngoài lệch 18px */}
              <div className="absolute left-0 bottom-0 right-[18px] top-[18px] border-2 border-[#c29a45] pointer-events-none" />

              {/* Khung ảnh chính */}
              <div className="relative aspect-[4/5] bg-gradient-to-br from-[#102447] to-[#06122b] shadow-[0_24px_50px_rgba(0,0,0,0.4)] overflow-hidden">
                <svg viewBox="0 0 100 125" className="w-full h-full block" aria-hidden="true" preserveAspectRatio="xMidYMin slice">
                  <defs>
                    <linearGradient id="g10" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#2c4a88" />
                      <stop offset="1" stopColor="#0b1d3f" />
                    </linearGradient>
                  </defs>
                  <rect width="100" height="125" fill="url(#g10)" />
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

              {/* Con dấu triện đỏ vuông góc dưới xoay -4 độ (.sl2) */}
              <span className="absolute -right-1.5 bottom-1.5 w-[58px] h-[58px] bg-[#a3171e] text-[#fbeed0] flex items-center justify-center font-chinese font-bold text-[30px] -rotate-4 shadow-[0_0_0_3px_rgba(240,210,138,0.5)]">
                河
              </span>
            </div>

            {/* Cột phải: Thông tin & Nút hành động */}
            <div>
              <span className="inline-block bg-gradient-to-r from-[#a3171e] to-[#7c1015] text-[#f0d28a] font-sans font-semibold text-[11.5px] tracking-[2px] uppercase px-4 py-1.5 border border-[#f0d28a]/45">
                {isZh ? "高级合伙人" : "Luật sư thành viên"}
              </span>

              <h1 className="font-royal font-bold text-[56px] sm:text-[72px] lg:text-[84px] leading-none text-white mt-4 mb-1.5">
                Trần Thu Hà
              </h1>
              <div className="font-chinese font-semibold text-2xl text-[#f0d28a] tracking-[8px] mb-4">
                陈秋河
              </div>

              <p className="text-[#b6c0d6] text-[17px] max-w-[560px] leading-relaxed mb-5 font-sans">
                {isZh
                  ? "专注为中越两国跨境企业提供中越双语合同审裁、外商直接投资准入与商事争议化解。可直接使用越南语及中文无障碍双语执业。"
                  : "Tư vấn hợp đồng song ngữ và đầu tư nước ngoài cho doanh nghiệp Việt Nam và Trung Quốc. Làm việc trực tiếp bằng tiếng Việt và tiếng Trung."}
              </p>

              {/* Chips ngôn ngữ */}
              <div className="flex gap-2 flex-wrap mb-7">
                <span className="border border-[#c29a45] text-[#f0d28a] font-sans font-semibold text-xs px-3.5 py-1 tracking-wide">
                  VI · Tiếng Việt
                </span>
                <span className="border border-[#c29a45] text-[#f0d28a] font-sans font-semibold text-xs px-3.5 py-1 tracking-wide">
                  中文 · Tiếng Trung
                </span>
                <span className="border border-[#c29a45] text-[#f0d28a] font-sans font-semibold text-xs px-3.5 py-1 tracking-wide">
                  EN · Tiếng Anh
                </span>
              </div>

              {/* Nút hành động */}
              <div className="flex gap-3.5 flex-wrap">
                <a
                  href="#datlich"
                  className="inline-flex items-center gap-2.5 bg-gradient-to-b from-[#c4252c] to-[#8f1218] text-white font-sans font-semibold text-[13px] tracking-[1.3px] uppercase px-7 py-4 shadow-[0_8px_20px_rgba(163,23,30,0.3)] hover:brightness-110 hover:gap-4 transition-all"
                >
                  {isZh ? "预约律师面谈" : "Đặt lịch với luật sư"}
                </a>
                <a
                  href="tel:0900123456"
                  className="inline-flex items-center gap-2.5 bg-transparent text-white font-sans font-semibold text-[13px] tracking-[1.3px] uppercase px-7 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)] hover:bg-white/10 transition-all"
                >
                  {isZh ? "致电 0900 123 456" : "Gọi 0900 123 456"}
                </a>
                <button
                  type="button"
                  onClick={() => showToast("WeChat: vanich_thuha")}
                  className="inline-flex items-center gap-2.5 bg-transparent text-white font-sans font-semibold text-[13px] tracking-[1.3px] uppercase px-7 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)] hover:bg-white/10 cursor-pointer transition-all"
                >
                  WeChat
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Khối 4 chỉ số KPI (.kp) */}
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 -mt-[46px] relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 bg-white shadow-[0_18px_50px_rgba(11,29,63,0.18)] border-t-[3px] border-[#c29a45]">
          <div className="p-6 lg:px-7 lg:py-6 border-r border-[#e7dcc3] border-b lg:border-b-0">
            <b className="block font-royal font-bold text-4xl lg:text-[46px] leading-none text-[#0b1d3f]">12</b>
            <small className="text-[#5b6174] text-[13px] font-sans mt-1 block">
              {isZh ? "年涉外实战经验" : "năm hành nghề"}
            </small>
          </div>
          <div className="p-6 lg:px-7 lg:py-6 border-r-0 lg:border-r border-[#e7dcc3] border-b lg:border-b-0">
            <b className="block font-royal font-bold text-4xl lg:text-[46px] leading-none text-[#0b1d3f]">400+</b>
            <small className="text-[#5b6174] text-[13px] font-sans mt-1 block">
              {isZh ? "宗已办结涉华案件" : "hồ sơ đã xử lý"}
            </small>
          </div>
          <div className="p-6 lg:px-7 lg:py-6 border-r border-[#e7dcc3]">
            <b className="block font-royal font-bold text-4xl lg:text-[46px] leading-none text-[#0b1d3f]">3</b>
            <small className="text-[#5b6174] text-[13px] font-sans mt-1 block">
              {isZh ? "门工作语言" : "ngôn ngữ làm việc"}
            </small>
          </div>
          <div className="p-6 lg:px-7 lg:py-6">
            <b className="block font-royal font-bold text-4xl lg:text-[46px] leading-none text-[#0b1d3f]">24h</b>
            <small className="text-[#5b6174] text-[13px] font-sans mt-1 block">
              {isZh ? "工作日首轮反馈" : "phản hồi"}
            </small>
          </div>
        </div>
      </div>

      {/* 3. Thân trang bài viết & Sidebar (.lay) */}
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-16 lg:pt-[70px] pb-24 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-12 lg:gap-[70px]">
        {/* Cột trái: Hồ sơ chi tiết (.art) */}
        <div className="space-y-12 font-sans text-[#27324a]">
          {/* P1: Giới thiệu */}
          <section id="p1" className="scroll-mt-28">
            <h2 className="font-royal font-bold text-3xl sm:text-[38px] text-[#0b1d3f] mb-4">
              <span className="block font-sans font-semibold text-xs tracking-[3px] text-[#a3171e] uppercase mb-2">01</span>
              {isZh ? "个人简介" : "Giới thiệu"}
            </h2>
            <p className="text-base sm:text-[17px] leading-[1.9] mb-5 text-[#27324a]">
              {isZh
                ? "陈秋河律师专注于涉及中国因素的各类跨国商事交易：双语合同起草与交叉校核、外商直接投资企业设立及跨国商事争端化解。其办案风格为倾听细致、说理清晰透明，并在接受正式委任前书面确认方案与费用。"
                : "Luật sư Trần Thu Hà tập trung vào các giao dịch có yếu tố Trung Quốc: soạn thảo và đối chiếu hợp đồng song ngữ, thành lập doanh nghiệp có vốn đầu tư nước ngoài và xử lý tranh chấp thương mại. Phong cách làm việc của luật sư là nghe kỹ, giải thích rõ và báo trước chi phí."}
            </p>
          </section>

          {/* P2: Lĩnh vực chuyên môn (.sk) */}
          <section id="p2" className="scroll-mt-28 border-t border-[#e7dcc3] pt-10">
            <h2 className="font-royal font-bold text-3xl sm:text-[38px] text-[#0b1d3f] mb-6">
              <span className="block font-sans font-semibold text-xs tracking-[3px] text-[#a3171e] uppercase mb-2">02</span>
              {isZh ? "专业业务擅长" : "Lĩnh vực chuyên môn"}
            </h2>
            <div className="space-y-5">
              {[
                { label: isZh ? "中越双语合同审查与起草" : "Hợp đồng song ngữ", val: "95%" },
                { label: isZh ? "外商直接投资与外汇合规" : "Đầu tư nước ngoài", val: "85%" },
                { label: isZh ? "跨境国际贸易与供应链" : "Thương mại quốc tế", val: "75%" },
                { label: isZh ? "跨国企业债务追收与保全" : "Thu hồi công nợ", val: "65%" },
              ].map((sk, idx) => (
                <div key={idx}>
                  <div className="flex justify-between font-semibold text-sm text-[#0b1d3f] mb-2">
                    <span>{sk.label}</span>
                    <span className="text-[#a3171e]">{sk.val}</span>
                  </div>
                  <div className="h-2 bg-[#e7dcc3] relative overflow-hidden rounded-full">
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#a3171e] to-[#c29a45] rounded-full transition-all duration-500"
                      style={{ width: sk.val }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* P3: Dấu mốc nghề nghiệp (.sp2) */}
          <section id="p3" className="scroll-mt-28 border-t border-[#e7dcc3] pt-10">
            <h2 className="font-royal font-bold text-3xl sm:text-[38px] text-[#0b1d3f] mb-6">
              <span className="block font-sans font-semibold text-xs tracking-[3px] text-[#a3171e] uppercase mb-2">03</span>
              {isZh ? "执业历程与里程碑" : "Dấu mốc nghề nghiệp"}
            </h2>
            <ol className="space-y-6 relative border-l border-[#c29a45] ml-5 pl-8">
              {[
                {
                  year: "2014 – Bắt đầu hành nghề",
                  desc: "Gia nhập một văn phòng luật tại TP. Hồ Chí Minh, phụ trách hồ sơ doanh nghiệp.",
                },
                {
                  year: "2018 – Chuyên sâu hợp đồng song ngữ",
                  desc: "Xây dựng quy trình đối chiếu hai bản Việt – Trung độc quyền và chính xác.",
                },
                {
                  year: "2021 – Luật sư thành viên",
                  desc: "Dẫn dắt nhóm tư vấn hợp đồng thương mại và đầu tư nước ngoài quy mô lớn.",
                },
                {
                  year: "2025 – Luật Vạn Ích",
                  desc: "Phụ trách mảng hợp đồng song ngữ và đối tác Trung Quốc của toàn hệ thống.",
                },
              ].map((item, idx) => (
                <li key={idx} className="relative">
                  <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-[#0b1d3f] border border-[#c29a45] text-[#f0d28a] font-royal font-bold text-sm flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <b className="block font-royal font-bold text-xl text-[#0b1d3f] mb-1">{item.year}</b>
                  <span className="text-[15px] text-[#5b6174] leading-relaxed block">{item.desc}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* P4: Học vấn & chứng chỉ (.ck) */}
          <section id="p4" className="scroll-mt-28 border-t border-[#e7dcc3] pt-10">
            <h2 className="font-royal font-bold text-3xl sm:text-[38px] text-[#0b1d3f] mb-6">
              <span className="block font-sans font-semibold text-xs tracking-[3px] text-[#a3171e] uppercase mb-2">04</span>
              {isZh ? "教育背景与资格证书" : "Học vấn & chứng chỉ"}
            </h2>
            <ul className="space-y-3">
              {[
                "Cử nhân Luật, chuyên ngành Luật quốc tế (Đại học Luật TP. Hồ Chí Minh)",
                "Chứng chỉ tiếng Trung trình độ cao cấp (HSK cấp 6)",
                "Chứng chỉ hành nghề Luật sư do Bộ Tư pháp Việt Nam cấp",
                "Khóa đào tạo chuyên sâu về Hợp đồng thương mại quốc tế (ICC)",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-base text-[#27324a] pt-2 border-t border-[#e7dcc3]">
                  <span className="w-2 h-2 bg-[#a3171e] rotate-45 shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-white border border-[#e7dcc3] border-l-4 border-l-[#a3171e] p-5 mt-6">
              <b className="block font-sans font-bold text-xs tracking-[2px] uppercase text-[#a3171e] mb-1.5">
                {isZh ? "说明" : "Ghi chú"}
              </b>
              <p className="text-[15px] text-[#5b6174] m-0">
                {isZh
                  ? "本档案所列全部执业资质与办案记录均已归档并受万益法务合规审核。"
                  : "Thông tin trong hồ sơ là dữ liệu chính thức phục vụ giới thiệu năng lực đội ngũ Luật Vạn Ích."}
              </p>
            </div>
          </section>

          {/* P5: Vụ việc tiêu biểu (.cs3) */}
          <section id="p5" className="scroll-mt-28 border-t border-[#e7dcc3] pt-10">
            <h2 className="font-royal font-bold text-3xl sm:text-[38px] text-[#0b1d3f] mb-6">
              <span className="block font-sans font-semibold text-xs tracking-[3px] text-[#a3171e] uppercase mb-2">05</span>
              {isZh ? "典型实办案例" : "Vụ việc tiêu biểu"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white border border-[#e7dcc3] border-t-[3px] border-t-[#a3171e] p-5 shadow-sm">
                <small className="font-sans font-semibold text-[11px] tracking-[2px] uppercase text-[#a3171e] block">
                  Hợp đồng
                </small>
                <b className="block font-royal font-bold text-2xl lg:text-[28px] text-[#0b1d3f] my-2 leading-tight">
                  Bản lệch phạt 20%
                </b>
                <p className="text-sm text-[#5b6174] leading-relaxed m-0">
                  Đối chiếu hợp đồng song ngữ, phát hiện mức phạt vượt trần và kịp thời ký phụ lục điều chỉnh bảo vệ khách hàng.
                </p>
              </div>

              <div className="bg-white border border-[#e7dcc3] border-t-[3px] border-t-[#a3171e] p-5 shadow-sm">
                <small className="font-sans font-semibold text-[11px] tracking-[2px] uppercase text-[#a3171e] block">
                  Đầu tư
                </small>
                <b className="block font-royal font-bold text-2xl lg:text-[28px] text-[#0b1d3f] my-2 leading-tight">
                  45 ngày
                </b>
                <p className="text-sm text-[#5b6174] leading-relaxed m-0">
                  Hoàn tất thành lập công ty sản xuất vốn FDI và giấy phép môi trường cho nhà đầu tư Trung Quốc tại Bình Dương.
                </p>
              </div>

              <div className="bg-white border border-[#e7dcc3] border-t-[3px] border-t-[#a3171e] p-5 shadow-sm">
                <small className="font-sans font-semibold text-[11px] tracking-[2px] uppercase text-[#a3171e] block">
                  Thu hồi nợ
                </small>
                <b className="block font-royal font-bold text-2xl lg:text-[28px] text-[#0b1d3f] my-2 leading-tight">
                  86%
                </b>
                <p className="text-sm text-[#5b6174] leading-relaxed m-0">
                  Thu hồi thành công giá trị khoản nợ thương mại tồn đọng thông qua đàm phán trực tiếp sau 5 tháng.
                </p>
              </div>
            </div>
            <p className="text-xs text-[#7f8aa6] mt-3 italic">
              * Thông tin vụ việc đã được ẩn danh theo nguyên tắc bảo mật. Kết quả trong quá khứ không bảo đảm cho mọi vụ việc tương lai.
            </p>
          </section>

          {/* P6: Bài viết của luật sư (.al) */}
          <section id="p6" className="scroll-mt-28 border-t border-[#e7dcc3] pt-10">
            <h2 className="font-royal font-bold text-3xl sm:text-[38px] text-[#0b1d3f] mb-6">
              <span className="block font-sans font-semibold text-xs tracking-[3px] text-[#a3171e] uppercase mb-2">06</span>
              {isZh ? "发表之法评文章" : "Bài viết của luật sư"}
            </h2>
            <div className="divide-y divide-[#e7dcc3]">
              {[
                {
                  tag: "Thu hồi nợ",
                  title: "Mất tiền đặt cọc thuê nhà xưởng: sai lầm cần tránh khi đặt cọc",
                  date: "25/11/2026",
                  href: `/${lang}/posts/mat-tien-dat-coc-thue-nha-xuong`,
                },
                {
                  tag: "Hợp đồng",
                  title: "Hợp đồng song ngữ: bản nào được ưu tiên khi có tranh chấp?",
                  date: "18/11/2026",
                  href: `/${lang}/posts/hop-dong-song-ngu-ban-nao-uu-tien`,
                },
                {
                  tag: "Đầu tư",
                  title: "Luật Đầu tư 2025: những thay đổi nhà đầu tư nước ngoài cần rà lại",
                  date: "05/11/2026",
                  href: `/${lang}/posts/luat-dau-tu-2025-thay-doi`,
                },
              ].map((art, idx) => (
                <Link
                  key={idx}
                  href={art.href}
                  className="grid grid-cols-[100px_1fr_90px] gap-4 items-baseline py-4 hover:text-[#a3171e] transition-colors group"
                >
                  <small className="font-sans font-semibold text-[11px] tracking-[1.5px] uppercase text-[#a3171e]">
                    {art.tag}
                  </small>
                  <b className="font-royal font-bold text-lg sm:text-xl text-[#0b1d3f] group-hover:text-[#a3171e] transition-colors">
                    {art.title}
                  </b>
                  <time className="text-xs text-[#5b6174] text-right font-sans">{art.date}</time>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Cột phải: Sidebar cố định (.aside) */}
        <aside className="sticky top-28 self-start space-y-6">
          {/* Mục lục TOC (.box.toc) */}
          <div className="bg-white border border-[#e7dcc3] p-6 shadow-sm">
            <h4 className="font-sans font-semibold text-[11.5px] tracking-[2.5px] uppercase text-[#a3171e] mb-3.5">
              {isZh ? "档案索引" : "Trong hồ sơ"}
            </h4>
            <nav className="space-y-1 text-sm font-sans">
              {[
                { id: "p1", label: isZh ? "个人简介" : "Giới thiệu" },
                { id: "p2", label: isZh ? "专业擅长" : "Lĩnh vực chuyên môn" },
                { id: "p3", label: isZh ? "执业历程" : "Dấu mốc nghề nghiệp" },
                { id: "p4", label: isZh ? "教育资质" : "Học vấn & chứng chỉ" },
                { id: "p5", label: isZh ? "典型案例" : "Vụ việc tiêu biểu" },
                { id: "p6", label: isZh ? "法评文章" : "Bài viết của luật sư" },
              ].map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`block py-1.5 pl-3.5 border-l-2 transition-all ${
                    activeSpy === link.id
                      ? "border-[#a3171e] text-[#0b1d3f] font-semibold"
                      : "border-[#e7dcc3] text-[#5b6174] hover:border-[#a3171e] hover:text-[#0b1d3f]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Widget Đặt lịch (.box.bk) */}
          <div id="datlich" className="bg-white border border-[#e7dcc3] border-t-[3px] border-t-[#c29a45] p-6 shadow-sm">
            <h4 className="font-sans font-semibold text-[11.5px] tracking-[2.5px] uppercase text-[#a3171e] mb-3.5">
              {isZh ? "预约律师面谈" : "Đặt lịch với luật sư"}
            </h4>

            {/* Bộ chọn 5 ngày */}
            <div className="grid grid-cols-5 gap-1.5 mb-3.5">
              {availableDays.map((d, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`border p-2 text-center text-xs font-sans transition-colors cursor-pointer ${
                    selectedDayIndex === idx
                      ? "bg-[#0b1d3f] text-[#f0d28a] border-[#0b1d3f]"
                      : "bg-white text-[#0f1b33] border-[#e7dcc3] hover:border-[#a3171e]"
                  }`}
                >
                  <span className="block text-[10px] text-[#7f8aa6] uppercase">{d.dayName}</span>
                  <b className="block font-royal font-bold text-lg leading-tight my-0.5">{d.date}</b>
                  <span className="block text-[10px] text-[#7f8aa6]">{d.month}/{d.year}</span>
                </button>
              ))}
            </div>

            {/* Bộ chọn khung giờ */}
            <div className="grid grid-cols-3 gap-1.5 mb-3.5">
              {timeSlots.map((t, idx) => {
                const isBusy = selectedDayIndex !== null && (selectedDayIndex * 3 + idx) % 4 === 2;
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isBusy}
                    onClick={() => setSelectedTime(t)}
                    className={`border py-2 text-center text-xs font-sans font-semibold transition-colors cursor-pointer ${
                      isBusy
                        ? "opacity-35 line-through cursor-not-allowed bg-gray-50 border-[#e7dcc3]"
                        : selectedTime === t
                        ? "bg-[#a3171e] text-white border-[#a3171e]"
                        : "bg-white text-[#0f1b33] border-[#e7dcc3] hover:border-[#a3171e] hover:text-[#a3171e]"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            {/* Thông báo slot đã chọn */}
            <p className="text-xs text-[#5b6174] font-sans mb-3.5 min-h-[36px]">
              {selectedDayIndex !== null && selectedTime
                ? `Lịch hẹn: ${availableDays[selectedDayIndex].dayName} ${availableDays[selectedDayIndex].date}/${availableDays[selectedDayIndex].month} lúc ${selectedTime} với Luật sư Trần Thu Hà.`
                : isZh
                ? "请选择面谈日期及时间段。"
                : "Chọn ngày và giờ để đặt lịch."}
            </p>

            <button
              type="button"
              disabled={selectedDayIndex === null || !selectedTime}
              onClick={handleConfirmBooking}
              className="w-full bg-gradient-to-b from-[#c4252c] to-[#8f1218] text-white font-sans font-semibold text-xs tracking-wider uppercase py-3 shadow-[0_8px_20px_rgba(163,23,30,0.3)] hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {isZh ? "确认提交预约" : "Xác nhận đặt lịch"}
            </button>
          </div>

          {/* Liên hệ trực tiếp */}
          <div className="bg-white border border-[#e7dcc3] p-6 shadow-sm text-sm font-sans space-y-2">
            <h4 className="font-semibold text-[11.5px] tracking-[2.5px] uppercase text-[#a3171e] mb-3">
              {isZh ? "直接联络方式" : "Liên hệ trực tiếp"}
            </h4>
            <p className="m-0 flex items-center gap-2">
              <span className="text-[#a3171e]">✆</span>
              <a href="tel:0900123456" className="hover:text-[#a3171e]">0900 123 456</a>
            </p>
            <p className="m-0 flex items-center gap-2">
              <span className="text-[#a3171e]">✉</span>
              <a href="mailto:thuha@vanichlaw.vn" className="hover:text-[#a3171e]">thuha@vanichlaw.vn</a>
            </p>
            <p className="m-0 flex items-center gap-2">
              <span className="text-[#a3171e]">微信:</span>
              <span>vanich_thuha</span>
            </p>
          </div>
        </aside>
      </div>

      {/* 4. Đồng nghiệp cùng nhóm (.rc3) */}
      <section className="bg-[#fbf7ee] py-16 border-t border-[#e7dcc3]">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          <div className="mb-10">
            <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#a3171e] flex items-center mb-2">
              <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">团队</b>
              {isZh ? "团队协作" : "Đồng nghiệp"}
            </div>
            <h2 className="font-royal font-bold text-3xl sm:text-4xl text-[#0b1d3f]">
              {isZh ? "同组协作律师团队" : "Luật sư cùng nhóm"}
            </h2>
            <p className="text-sm text-[#5b6174] font-sans mt-2 m-0">
              Mỗi hồ sơ có luật sư phụ trách chính và một luật sư dự phòng đảm bảo tiến độ liên tục.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Nguyễn Minh Hoàng",
                zh: "阮明皇",
                role: "Luật sư điều hành · Đầu tư, M&A",
                href: `/${lang}/lawyers/nguyen-minh-hoang`,
              },
              {
                name: "Lê Quốc Bảo",
                zh: "黎国宝",
                role: "Luật sư thành viên · Tranh tụng, trọng tài",
                href: `/${lang}/lawyers/le-quoc-bao`,
              },
              {
                name: "Phạm Ngọc Lan",
                zh: "范玉兰",
                role: "Luật sư thành viên · Thu hồi công nợ",
                href: `/${lang}/lawyers/pham-ngoc-lan`,
              },
            ].map((col, idx) => (
              <Link
                key={idx}
                href={col.href}
                className="bg-white border border-[#e7dcc3] flex flex-col shadow-[0_10px_28px_rgba(11,29,63,0.07)] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(11,29,63,0.14)] transition-all group"
              >
                <div className="aspect-[4/3] overflow-hidden border-b-[3px] border-b-[#c29a45] bg-[#0b1d3f]">
                  <svg viewBox="0 0 100 125" className="w-full h-full block" preserveAspectRatio="xMidYMin slice">
                    <rect width="100" height="125" fill="#0b1d3f" />
                    <circle cx="50" cy="52" r="40" fill="#f0d28a" opacity="0.12" />
                    <path d="M6 125c0-30 16-42 44-44 28 2 44 14 44 44z" fill="#0d121c" />
                    <path d="M38 82l-10 43M62 82l10 43" stroke="#f0d28a" strokeWidth="0.8" fill="none" opacity="0.6" />
                    <path d="M38 82l12 16 12-16v14l-12 29-12-29z" fill="#f3f5f9" />
                    <path d="M47 96h6l3 29h-12z" fill="#a3171e" />
                    <ellipse cx="50" cy="52" rx="15" ry="19" fill="#e0b293" />
                    <path d="M34 48c-2-20 32-20 32 0-6-9-26-9-32 0z" fill="#1b1718" />
                  </svg>
                </div>
                <div className="p-5 font-sans">
                  <h3 className="font-royal font-bold text-2xl text-[#0b1d3f] group-hover:text-[#a3171e] transition-colors mb-1">
                    {col.name}{" "}
                    <span className="font-chinese font-semibold text-sm text-[#a3171e] tracking-[2px] ml-1">
                      {col.zh}
                    </span>
                  </h3>
                  <p className="text-sm text-[#5b6174] m-0 mb-3">{col.role}</p>
                  <span className="text-xs font-semibold text-[#a3171e] tracking-wide">
                    Xem hồ sơ &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Banner kêu gọi liên hệ chân trang (.band) */}
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
