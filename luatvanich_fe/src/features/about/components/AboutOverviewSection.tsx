"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, X } from "lucide-react";
import {
  LAWYER_ASSETS,
  LICENSE_ASSETS,
  PROJECT_ASSETS,
} from "@/constants/assets.constants";

interface AboutOverviewSectionProps {
  lang: string;
}

export function AboutOverviewSection({ lang }: AboutOverviewSectionProps) {
  const isZh = lang === "zh-CN" || lang === "zh";

  // Lightbox xem ảnh scan
  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string } | null>(null);

  return (
    <div className="font-sans text-[#0f1b33] bg-[#fffdf8]">
      
      {/* 1. Thanh số liệu nổi (.kp) - đặt thụt lên đè vào chân Hero (-mt-[46px]) */}
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 -mt-[46px] relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 bg-white shadow-[0_18px_50px_rgba(11,29,63,0.18)] border-t-[3px] border-t-[#c29a45] divide-x divide-y md:divide-y-0 divide-[#e7dcc3]">
          <div className="p-6 sm:p-7">
            <b className="block font-royal font-bold text-[46px] leading-none text-[#0b1d3f]">30+</b>
            <small className="text-[#5b6174] text-[13px] block mt-1.5 font-sans">
              {isZh ? "年总所历程（1996年始）" : "năm hành nghề (từ 1996)"}
            </small>
          </div>
          <div className="p-6 sm:p-7">
            <b className="block font-royal font-bold text-[46px] leading-none text-[#0b1d3f]">1.200+</b>
            <small className="text-[#5b6174] text-[13px] block mt-1.5 font-sans">
              {isZh ? "件已办涉外商事实操案件" : "hồ sơ đã tiếp nhận"}
            </small>
          </div>
          <div className="p-6 sm:p-7">
            <b className="block font-royal font-bold text-[46px] leading-none text-[#0b1d3f]">300+</b>
            <small className="text-[#5b6174] text-[13px] block mt-1.5 font-sans">
              {isZh ? "位专业律师与涉外人才" : "luật sư và chuyên viên"}
            </small>
          </div>
          <div className="p-6 sm:p-7">
            <b className="block font-royal font-bold text-[46px] leading-none text-[#0b1d3f]">12</b>
            <small className="text-[#5b6174] text-[13px] block mt-1.5 font-sans">
              {isZh ? "处中越与东盟联动网络" : "văn phòng & điểm làm việc"}
            </small>
          </div>
        </div>
      </div>

      {/* 2. Ý nghĩa tên gọi Vạn Ích (.nm3) */}
      <section className="py-20 lg:py-24">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end mb-11">
            <div>
              <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#a3171e] flex items-center mb-3">
                <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">名称</b>
                {isZh ? "字号释义" : "Ý nghĩa tên gọi"}
              </div>
              <h2 className="font-royal font-bold text-[40px] sm:text-[48px] text-[#0b1d3f] leading-[1.1] relative after:content-[''] after:block after:w-14 after:h-[3px] after:bg-[#a3171e] after:mt-4">
                {isZh ? "万益，万事皆有益" : "Vạn Ích, muôn điều có lợi"}
              </h2>
            </div>
            <p className="m-0 text-[#5b6174] text-[15.5px] leading-relaxed">
              {isZh
                ? "“万益”不仅是我们的名字，更是执业底线与行动宣言：每一项涉外法务委托，都必须为双边合作创造真实、合规、长远的合法利益。"
                : "Tên gọi là lời nhắc về mục tiêu của chúng tôi: mỗi vụ việc phải mang lại lợi ích thực cho cả hai bên hợp tác."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr_40px_1.1fr] gap-2.5 items-stretch">
            <div className="bg-white border border-[#e7dcc3] p-8 sm:p-9 text-center">
              <i className="block font-chinese font-bold text-[90px] leading-none not-italic bg-gradient-to-b from-[#0b1d3f] to-[#3d5fae] bg-clip-text text-transparent select-none">
                万
              </i>
              <b className="block font-royal font-bold text-[34px] text-[#0b1d3f] my-2">
                {isZh ? "万" : "Vạn"}
              </b>
              <p className="m-0 text-[#5b6174] text-[14.5px] leading-relaxed">
                {isZh
                  ? "万物、包罗万象。我们深耕实体制造、矿业、基建、现代农业与跨境数字贸易等多领域赛道。"
                  : "Mười nghìn, nghĩa là rất nhiều. Chúng tôi làm việc với nhiều ngành, nhiều dạng giao dịch và nhiều đối tác."}
              </p>
            </div>

            <div className="grid place-items-center font-royal font-bold text-[40px] text-[#a3171e] py-2">
              +
            </div>

            <div className="bg-white border border-[#e7dcc3] p-8 sm:p-9 text-center">
              <i className="block font-chinese font-bold text-[90px] leading-none not-italic bg-gradient-to-b from-[#0b1d3f] to-[#3d5fae] bg-clip-text text-transparent select-none">
                益
              </i>
              <b className="block font-royal font-bold text-[34px] text-[#0b1d3f] my-2">
                {isZh ? "益" : "Ích"}
              </b>
              <p className="m-0 text-[#5b6174] text-[14.5px] leading-relaxed">
                {isZh
                  ? "利益、合规增益。我们所做的一切法律尽调与风控，终极目标都是捍卫客户的合法权益与长远收益。"
                  : "Lợi ích. Mục tiêu cuối cùng của mọi tư vấn là lợi ích hợp pháp và bền vững của khách hàng."}
              </p>
            </div>

            <div className="grid place-items-center font-royal font-bold text-[40px] text-[#a3171e] py-2">
              =
            </div>

            <div className="bg-gradient-to-br from-[#0b1d3f] to-[#16336a] text-white border-t-4 border-t-[#a3171e] p-8 sm:p-9 text-center shadow-xl">
              <i className="block font-chinese font-bold text-[80px] leading-none not-italic text-[#f0d28a] select-none">
                万益
              </i>
              <b className="block font-royal font-bold text-[34px] text-white my-2">
                {isZh ? "万益" : "Vạn Ích"}
              </b>
              <p className="m-0 text-[#b6c0d6] text-[14.5px] leading-relaxed">
                {isZh
                  ? "链接中越，法律护航。致力于成为中越跨境经贸与投资最值得托付的法治金桥。"
                  : "Cầu nối pháp lý đem lại lợi ích cho hợp tác Việt – Trung."}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Câu chuyện khởi sự (.two & .pq) */}
      <section className="py-20 lg:py-24 bg-[#fbf7ee] border-t border-[#e7dcc3]">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
            <div>
              <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#a3171e] flex items-center mb-3">
                <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">缘起</b>
                {isZh ? "执业初心" : "Câu chuyện"}
              </div>
              <h2 className="font-royal font-bold text-[36px] sm:text-[44px] text-[#0b1d3f] leading-[1.15] mb-5">
                {isZh ? "始于一份两版含义迥异的中越双语合同" : "Bắt đầu từ một hợp đồng hai bản nói hai điều khác nhau"}
              </h2>
              <p className="text-[16.5px] leading-relaxed text-[#27324a] mb-4">
                {isZh
                  ? "多年前，创始团队处理过一起跨国商事纠纷，其起因既非恶意欺诈，仅仅是因为中越双语合同在违约金和管辖条款翻译上出现语义偏差。自那时起，我们便立下规矩：必须具备直接研判两国文字的专业能力。"
                  : "Năm 2014, đội ngũ sáng lập gặp một vụ tranh chấp mà nguyên nhân không phải ác ý, chỉ là hai bản hợp đồng Việt – Trung lệch nhau một điều khoản. Từ đó chúng tôi xây dựng cách làm việc đọc trực tiếp cả hai ngôn ngữ."}
              </p>
              <p className="text-[16.5px] leading-relaxed text-[#27324a] m-0">
                {isZh
                  ? "十余年深耕至今，我们的每一项法务工作依然始于一句追问：“当双方落笔签约时，彼此的真正理解是否百分之百一致？”"
                  : "Hơn mười năm sau, mỗi vụ việc vẫn bắt đầu bằng một câu hỏi: đối tác của bạn thực sự hiểu điều gì khi ký?"}
              </p>
            </div>

            <div className="relative bg-[#0b1d3f] text-white p-8 sm:p-12 lg:p-14 font-royal italic font-medium text-[24px] sm:text-[28px] leading-[1.4] shadow-xl before:content-['“'] before:absolute before:left-4 before:-top-3 before:font-royal before:font-bold before:text-[90px] before:text-[#c29a45] before:leading-none">
              {isZh
                ? "一份真正优秀的跨国合同，不在于条款有多冗长，而在于签约双方对其权利义务的理解毫无歧义。"
                : "Hợp đồng tốt không phải hợp đồng dài, mà là hợp đồng mà cả hai bên đều hiểu giống nhau."}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Giá trị cốt lõi (.cdb & .cd5) */}
      <section className="py-20 lg:py-24 bg-[radial-gradient(700px_400px_at_90%_0,rgba(194,154,69,0.2),transparent_60%),linear-gradient(135deg,#071530,#102a58)] text-white border-t border-[#e7dcc3]">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end mb-12">
            <div>
              <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#f0d28a] flex items-center mb-3">
                <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">准则</b>
                {isZh ? "核心价值" : "Giá trị cốt lõi"}
              </div>
              <h2 className="font-royal font-bold text-[40px] sm:text-[48px] text-white leading-[1.1] relative after:content-[''] after:block after:w-14 after:h-[3px] after:bg-[#a3171e] after:mt-4">
                {isZh ? "我们恪守的五项执业准则" : "Năm điều chúng tôi giữ"}
              </h2>
            </div>
            <p className="m-0 text-[#b6c0d6] text-[15px] leading-relaxed">
              {isZh
                ? "不论案件标的大或小，皆以最高专业准则贯穿始终。"
                : "Các nguyên tắc áp dụng cho mọi vụ việc, dù lớn hay nhỏ."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-[rgba(194,154,69,0.5)] divide-y sm:divide-y-0 sm:divide-x divide-[rgba(194,154,69,0.35)]">
            <div className="p-8 sm:p-6">
              <i className="block font-chinese font-bold text-[46px] leading-none text-[#f0d28a] not-italic mb-3.5">信</i>
              <small className="font-sans font-semibold text-[11px] tracking-[2px] text-[#c29a45] uppercase">{isZh ? "准则一" : "Điều 1"}</small>
              <h3 className="font-royal font-bold text-[26px] text-white my-1">{isZh ? "诚信立业" : "Chữ tín"}</h3>
              <p className="text-[#b6c0d6] text-[14px] leading-relaxed m-0">{isZh ? "始终以客户合法权益为依归。" : "Đặt lợi ích hợp pháp của khách hàng lên trước."}</p>
            </div>
            <div className="p-8 sm:p-6">
              <i className="block font-chinese font-bold text-[46px] leading-none text-[#f0d28a] not-italic mb-3.5">密</i>
              <small className="font-sans font-semibold text-[11px] tracking-[2px] text-[#c29a45] uppercase">{isZh ? "准则二" : "Điều 2"}</small>
              <h3 className="font-royal font-bold text-[26px] text-white my-1">{isZh ? "严守秘密" : "Bảo mật"}</h3>
              <p className="text-[#b6c0d6] text-[14px] leading-relaxed m-0">{isZh ? "对所有受托商业机密绝不外泄。" : "Giữ kín mọi thông tin được ủy thác."}</p>
            </div>
            <div className="p-8 sm:p-6">
              <i className="block font-chinese font-bold text-[46px] leading-none text-[#f0d28a] not-italic mb-3.5">专</i>
              <small className="font-sans font-semibold text-[11px] tracking-[2px] text-[#c29a45] uppercase">{isZh ? "准则三" : "Điều 3"}</small>
              <h3 className="font-royal font-bold text-[26px] text-white my-1">{isZh ? "专注实操" : "Chuyên môn"}</h3>
              <p className="text-[#b6c0d6] text-[14px] leading-relaxed m-0">{isZh ? "基于中越双法域实定法精准研判。" : "Tư vấn dựa trên pháp luật hai nước."}</p>
            </div>
            <div className="p-8 sm:p-6">
              <i className="block font-chinese font-bold text-[46px] leading-none text-[#f0d28a] not-italic mb-3.5">明</i>
              <small className="font-sans font-semibold text-[11px] tracking-[2px] text-[#c29a45] uppercase">{isZh ? "准则四" : "Điều 4"}</small>
              <h3 className="font-royal font-bold text-[26px] text-white my-1">{isZh ? "公开透明" : "Minh bạch"}</h3>
              <p className="text-[#b6c0d6] text-[14px] leading-relaxed m-0">{isZh ? "方案与律师费用书面先行确认。" : "Báo phí và phương án bằng văn bản."}</p>
            </div>
            <div className="p-8 sm:p-6">
              <i className="block font-chinese font-bold text-[46px] leading-none text-[#f0d28a] not-italic mb-3.5">伴</i>
              <small className="font-sans font-semibold text-[11px] tracking-[2px] text-[#c29a45] uppercase">{isZh ? "准则五" : "Điều 5"}</small>
              <h3 className="font-royal font-bold text-[26px] text-white my-1">{isZh ? "全程相伴" : "Đồng hành"}</h3>
              <p className="text-[#b6c0d6] text-[14px] leading-relaxed m-0">{isZh ? "紧跟落地闭环直至项目平稳运行。" : "Theo sát vụ việc đến khi hoàn tất."}</p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Chặng đường phát triển (.tl5) */}
      <section className="py-20 lg:py-24">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end mb-14">
            <div>
              <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#a3171e] flex items-center mb-3">
                <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">历程</b>
                {isZh ? "发展足迹" : "Chặng đường"}
              </div>
              <h2 className="font-royal font-bold text-[40px] sm:text-[48px] text-[#0b1d3f] leading-[1.1] relative after:content-[''] after:block after:w-14 after:h-[3px] after:bg-[#a3171e] after:mt-4">
                {isZh ? "三十载总所底蕴，十二年跨境深耕" : "Mười hai năm, năm mốc chính"}
              </h2>
            </div>
            <p className="m-0 text-[#5b6174] text-[15px] leading-relaxed">
              {isZh
                ? "从初期专注于涉外合同审理，到如今形成覆盖东盟、中越双支点联动的全方位法律服务网络。"
                : "Từ một nhóm nhỏ làm hợp đồng song ngữ đến văn phòng có mạng lưới ở hai nước."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 relative before:hidden lg:before:block lg:before:content-[''] lg:before:absolute lg:before:left-0 lg:before:right-0 lg:before:top-[19px] lg:before:h-[1px] lg:before:bg-[#c29a45]">
            <div>
              <b className="inline-block bg-[#0b1d3f] text-[#f0d28a] font-royal font-bold text-[22px] px-3.5 py-1.5 border border-[#c29a45] relative z-10">
                2014
              </b>
              <h3 className="font-royal font-bold text-[25px] text-[#0b1d3f] mt-4 mb-1.5">{isZh ? "实务启航" : "Khởi đầu"}</h3>
              <p className="text-[#5b6174] text-[14px] leading-relaxed m-0">{isZh ? "团队赴越留学实践，专注两国双语合同精准对接。" : "Nhóm sáng lập bắt đầu hành nghề, tập trung hợp đồng song ngữ."}</p>
            </div>
            <div>
              <b className="inline-block bg-[#0b1d3f] text-[#f0d28a] font-royal font-bold text-[22px] px-3.5 py-1.5 border border-[#c29a45] relative z-10">
                2017
              </b>
              <h3 className="font-royal font-bold text-[25px] text-[#0b1d3f] mt-4 mb-1.5">{isZh ? "外资准入" : "Đầu tư nước ngoài"}</h3>
              <p className="text-[#5b6174] text-[14px] leading-relaxed m-0">{isZh ? "开拓赴越制造实体投资、园区选址与工厂设立全案。" : "Mở mảng tư vấn đầu tư cho doanh nghiệp Trung Quốc."}</p>
            </div>
            <div>
              <b className="inline-block bg-[#0b1d3f] text-[#f0d28a] font-royal font-bold text-[22px] px-3.5 py-1.5 border border-[#c29a45] relative z-10">
                2020
              </b>
              <h3 className="font-royal font-bold text-[25px] text-[#0b1d3f] mt-4 mb-1.5">{isZh ? "争议解决" : "Tranh tụng & Trọng tài"}</h3>
              <p className="text-[#5b6174] text-[14px] leading-relaxed m-0">{isZh ? "成立跨国民商事诉讼、越中仲裁与商账追收团队。" : "Thành lập nhóm tranh tụng và thu hồi công nợ."}</p>
            </div>
            <div>
              <b className="inline-block bg-[#0b1d3f] text-[#f0d28a] font-royal font-bold text-[22px] px-3.5 py-1.5 border border-[#c29a45] relative z-10">
                2022
              </b>
              <h3 className="font-royal font-bold text-[25px] text-[#0b1d3f] mt-4 mb-1.5">{isZh ? "北宁驻点" : "Chi nhánh Bắc Ninh"}</h3>
              <p className="text-[#5b6174] text-[14px] leading-relaxed m-0">{isZh ? "设立北宁办事处，紧密贴身服务越北工业园区中资制造业。" : "Thiết lập cứ điểm phục vụ các KCN trọng điểm tại miền Bắc VN."}</p>
            </div>
            <div>
              <b className="inline-block bg-[#a3171e] text-[#f0d28a] font-royal font-bold text-[22px] px-3.5 py-1.5 border border-[#f0d28a] relative z-10 shadow-md">
                2026
              </b>
              <h3 className="font-royal font-bold text-[25px] text-[#a3171e] mt-4 mb-1.5">{isZh ? "万益（河内）" : "Luật Vạn Ích (Hà Nội)"}</h3>
              <p className="text-[#5b6174] text-[14px] leading-relaxed m-0">{isZh ? "越南司法部正式批准更名万益（河内）并迁址首都政务核心区。" : "Bộ Tư pháp VN chính thức cấp phép đổi tên và dời trụ sở về Hà Nội."}</p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Ban lãnh đạo & Đội ngũ thực tế (.rc3) */}
      <section className="py-20 lg:py-24 bg-[#fbf7ee] border-t border-[#e7dcc3]">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end mb-12">
            <div>
              <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#a3171e] flex items-center mb-3">
                <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">领导</b>
                {isZh ? "主办团队" : "Ban lãnh đạo"}
              </div>
              <h2 className="font-royal font-bold text-[40px] sm:text-[48px] text-[#0b1d3f] leading-[1.1] relative after:content-[''] after:block after:w-14 after:h-[3px] after:bg-[#a3171e] after:mt-4">
                {isZh ? "核心主办涉外律师与顾问" : "Những người dẫn dắt văn phòng"}
              </h2>
            </div>
            <p className="m-0 text-[#5b6174] text-[15px] leading-relaxed">
              {isZh
                ? "所有核心合伙人与团队律师均熟练使用中越双语直接开展商务谈判、起草法律文书及出庭诉讼。"
                : "Tất cả các luật sư nòng cốt đều làm việc trực tiếp bằng tiếng Việt và tiếng Trung."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Luật sư 1: LS. Lăng Thần */}
            <Link
              href={`/${lang}/lawyers/nguyen-minh-hoang`}
              className="bg-white border border-[#e7dcc3] flex flex-col shadow-[0_10px_28px_rgba(11,29,63,0.07)] hover:border-[#c29a45] hover:shadow-[0_16px_32px_rgba(11,29,63,0.14)] hover:-translate-y-1 transition-all group"
            >
              <div className="aspect-[4/3] overflow-hidden border-b-[3px] border-b-[#c29a45] relative bg-[#0b1d3f]">
                <Image
                  src={LAWYER_ASSETS.langThan.portrait}
                  alt="LS. Lăng Thần"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-royal font-bold text-[25px] text-[#0b1d3f] group-hover:text-[#a3171e] transition-colors mb-1">
                    Lăng Thần <span className="font-chinese font-semibold text-[14px] text-[#a3171e] tracking-[2px] ml-1.5">凌晨</span>
                  </h3>
                  <p className="text-[13.5px] text-[#5b6174] m-0 mb-3">
                    {isZh ? "河内、崇左办公室主任 · 投资并购与涉外涉诉" : "Giám đốc VP Hà Nội & Sùng Tả · M&A, FDI, Tranh tụng"}
                  </p>
                </div>
                <span className="text-[#a3171e] font-sans font-semibold text-[13px] group-hover:translate-x-1 transition-transform inline-block">
                  {isZh ? "查看详情 →" : "Xem hồ sơ →"}
                </span>
              </div>
            </Link>

            {/* Luật sư 2: LS. Liễu Ái */}
            <Link
              href={`/${lang}/lawyers/tran-thu-ha`}
              className="bg-white border border-[#e7dcc3] flex flex-col shadow-[0_10px_28px_rgba(11,29,63,0.07)] hover:border-[#c29a45] hover:shadow-[0_16px_32px_rgba(11,29,63,0.14)] hover:-translate-y-1 transition-all group"
            >
              <div className="aspect-[4/3] overflow-hidden border-b-[3px] border-b-[#c29a45] relative bg-[#0b1d3f]">
                <Image
                  src={LAWYER_ASSETS.lieuAi.portrait}
                  alt="LS. Liễu Ái"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-royal font-bold text-[25px] text-[#0b1d3f] group-hover:text-[#a3171e] transition-colors mb-1">
                    Liễu Ái <span className="font-chinese font-semibold text-[14px] text-[#a3171e] tracking-[2px] ml-1.5">柳爱</span>
                  </h3>
                  <p className="text-[13.5px] text-[#5b6174] m-0 mb-3">
                    {isZh ? "河内办公室专职律师 · 越南执业许可 · 商事争议" : "Luật sư chuyên trách VP Hà Nội · Tranh chấp & Hợp đồng"}
                  </p>
                </div>
                <span className="text-[#a3171e] font-sans font-semibold text-[13px] group-hover:translate-x-1 transition-transform inline-block">
                  {isZh ? "查看详情 →" : "Xem hồ sơ →"}
                </span>
              </div>
            </Link>

            {/* Luật sư 3: LS. Tưởng Nữ Trinh */}
            <Link
              href={`/${lang}/lawyers/le-quoc-bao`}
              className="bg-white border border-[#e7dcc3] flex flex-col shadow-[0_10px_28px_rgba(11,29,63,0.07)] hover:border-[#c29a45] hover:shadow-[0_16px_32px_rgba(11,29,63,0.14)] hover:-translate-y-1 transition-all group"
            >
              <div className="aspect-[4/3] overflow-hidden border-b-[3px] border-b-[#c29a45] relative bg-[#0b1d3f]">
                <Image
                  src={LAWYER_ASSETS.tuongNuTrinh.portrait}
                  alt="LS. Tưởng Nữ Trinh"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-royal font-bold text-[25px] text-[#0b1d3f] group-hover:text-[#a3171e] transition-colors mb-1">
                    Tưởng Nữ Trinh <span className="font-chinese font-semibold text-[14px] text-[#a3171e] tracking-[2px] ml-1.5">蒋女贞</span>
                  </h3>
                  <p className="text-[13.5px] text-[#5b6174] m-0 mb-3">
                    {isZh ? "法学硕士 · 中越双语涉外律师 · 涉外投资咨询" : "Thạc sĩ Luật · Song ngữ Việt - Trung · Tư vấn đầu tư"}
                  </p>
                </div>
                <span className="text-[#a3171e] font-sans font-semibold text-[13px] group-hover:translate-x-1 transition-transform inline-block">
                  {isZh ? "查看详情 →" : "Xem hồ sơ →"}
                </span>
              </div>
            </Link>

          </div>

        </div>
      </section>

      {/* 7. Tư cách pháp lý & Hồ sơ năng lực thực tế */}
      <section className="py-20 lg:py-24 border-t border-[#e7dcc3]">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end mb-12">
            <div>
              <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#a3171e] flex items-center mb-3">
                <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">资质</b>
                {isZh ? "法定执照" : "Tư cách pháp lý"}
              </div>
              <h2 className="font-royal font-bold text-[40px] sm:text-[48px] text-[#0b1d3f] leading-[1.1] relative after:content-[''] after:block after:w-14 after:h-[3px] after:bg-[#a3171e] after:mt-4">
                {isZh ? "越南司法部正式批设证明" : "Giấy phép Bộ Tư pháp Việt Nam"}
              </h2>
            </div>
            <p className="m-0 text-[#5b6174] text-[15px] leading-relaxed">
              {isZh
                ? "万益（河内）为合法合规在中国司法部备案、获越南司法部全套执照批准的外国律师分支机构。"
                : "Chi nhánh hoạt động hợp pháp dưới sự quản lý của Bộ Tư pháp Việt Nam và Sở Tư pháp TP. Hà Nội."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div
              onClick={() => setLightboxImg({ src: LICENSE_ASSETS.boTuPhapHanoi.main, title: "Giấy phép thành lập Chi nhánh Hà Nội do Bộ Tư pháp Việt Nam cấp" })}
              className="bg-white border border-[#e7dcc3] p-5 cursor-pointer hover:border-[#c29a45] hover:shadow-lg transition-all group"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-[#fbf7ee] border border-[#e7dcc3] mb-3">
                <Image
                  src={LICENSE_ASSETS.boTuPhapHanoi.main}
                  alt="Giấy phép Bộ Tư pháp"
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform"
                />
              </div>
              <b className="font-royal text-[18px] text-[#0b1d3f] block group-hover:text-[#a3171e] transition-colors">
                {isZh ? "司法部设立许可证" : "Giấy phép Bộ Tư pháp"}
              </b>
              <small className="text-[#5b6174] text-[12px] block mt-0.5">Quyết định thành lập chi nhánh</small>
            </div>

            <div
              onClick={() => setLightboxImg({ src: LICENSE_ASSETS.boTuPhapHanoi.tax, title: "Giấy chứng nhận đăng ký thuế tại Việt Nam" })}
              className="bg-white border border-[#e7dcc3] p-5 cursor-pointer hover:border-[#c29a45] hover:shadow-lg transition-all group"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-[#fbf7ee] border border-[#e7dcc3] mb-3">
                <Image
                  src={LICENSE_ASSETS.boTuPhapHanoi.tax}
                  alt="Đăng ký thuế"
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform"
                />
              </div>
              <b className="font-royal text-[18px] text-[#0b1d3f] block group-hover:text-[#a3171e] transition-colors">
                {isZh ? "越南税务登记证" : "Đăng ký thuế tại VN"}
              </b>
              <small className="text-[#5b6174] text-[12px] block mt-0.5">Mã số thuế doanh nghiệp</small>
            </div>

            <div
              onClick={() => setLightboxImg({ src: "/images/licenses/giay-phep-vietnam-lieu-ai-1.png", title: "Giấy phép hành nghề tại Việt Nam của LS. Liễu Ái" })}
              className="bg-white border border-[#e7dcc3] p-5 cursor-pointer hover:border-[#c29a45] hover:shadow-lg transition-all group"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-[#fbf7ee] border border-[#e7dcc3] mb-3">
                <Image
                  src="/images/licenses/giay-phep-vietnam-lieu-ai-1.png"
                  alt="Giấy phép LS Liễu Ái"
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform"
                />
              </div>
              <b className="font-royal text-[18px] text-[#0b1d3f] block group-hover:text-[#a3171e] transition-colors">
                {isZh ? "柳爱律师执业许可" : "Giấy phép LS. Liễu Ái"}
              </b>
              <small className="text-[#5b6174] text-[12px] block mt-0.5">Cấp phép hành nghề tại VN</small>
            </div>

            <div
              onClick={() => setLightboxImg({ src: "/images/licenses/giay-phep-hanh-nghe-lang-than-1.png", title: "Giấy phép hành nghề LS. Lăng Thần" })}
              className="bg-white border border-[#e7dcc3] p-5 cursor-pointer hover:border-[#c29a45] hover:shadow-lg transition-all group"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-[#fbf7ee] border border-[#e7dcc3] mb-3">
                <Image
                  src="/images/licenses/giay-phep-hanh-nghe-lang-than-1.png"
                  alt="Giấy phép LS Lăng Thần"
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform"
                />
              </div>
              <b className="font-royal text-[18px] text-[#0b1d3f] block group-hover:text-[#a3171e] transition-colors">
                {isZh ? "凌晨主任执业证" : "Giấy phép LS. Lăng Thần"}
              </b>
              <small className="text-[#5b6174] text-[12px] block mt-0.5">Trưởng đại diện chi nhánh</small>
            </div>
          </div>

          {/* 5 Dự án thực tế tiêu biểu */}
          <div className="bg-[#fbf7ee] border border-[#e7dcc3] p-8 sm:p-10">
            <div className="mb-6">
              <span className="font-chinese font-bold text-[#a3171e] text-xs tracking-[3px] uppercase block mb-1">
                业绩证明 · 真实案例
              </span>
              <h3 className="font-royal font-bold text-[32px] text-[#0b1d3f]">
                {isZh ? "五大跨境重点投资与并购实战项目" : "5 dự án tiêu biểu đã thực hiện tại Việt Nam"}
              </h3>
            </div>

            <div className="divide-y divide-[#e7dcc3]">
              {PROJECT_ASSETS.map((p, idx) => (
                <div
                  key={idx}
                  className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-sans font-bold text-xs text-[#a3171e]">0{idx + 1}</span>
                      <span className="text-[11px] font-semibold text-[#c29a45] uppercase tracking-wider">
                        {p.clientZh}
                      </span>
                    </div>
                    <b className="font-royal text-[20px] text-[#0b1d3f] group-hover:text-[#a3171e] transition-colors block">
                      {p.name}
                    </b>
                    <p className="text-xs text-[#5b6174] m-0 mt-0.5">
                      Khách hàng: {p.client}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setLightboxImg({ src: p.contracts[0], title: p.name })}
                    className="inline-flex items-center gap-1.5 text-xs text-[#a3171e] font-semibold border border-[#a3171e] px-4 py-2 hover:bg-[#a3171e] hover:text-white transition-all self-start md:self-center shrink-0 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isZh ? "查看合同材料" : "Xem hồ sơ hợp đồng"}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 8. CTA Band cuối trang (.band) */}
      <section className="bg-[radial-gradient(700px_400px_at_90%_0,rgba(194,154,69,0.2),transparent_60%),linear-gradient(135deg,#071530,#102a58)] text-white border-t-4 border-t-[#a3171e] py-[70px] relative overflow-hidden" id="lienhe-cta">
        <div className="absolute -left-8 -bottom-[150px] font-chinese font-bold text-[520px] leading-none text-transparent select-none pointer-events-none" style={{ WebkitTextStroke: "1px rgba(194,154,69,0.18)" }}>
          律
        </div>

        <div className="max-w-[1180px] mx-auto px-6 sm:px-10 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#f0d28a] flex items-center mb-3">
              <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">委托</b>
              {isZh ? "法律咨询" : "Liên hệ luật sư"}
            </div>
            <h2 className="font-royal font-bold text-[36px] sm:text-[46px] text-white leading-tight mt-3">
              {isZh ? (
                <>直接与 <i className="text-[#f0d28a] font-normal not-italic">涉外律师</i> 沟通业务（越文或中文）</>
              ) : (
                <>Nói chuyện với <i className="text-[#f0d28a] font-normal not-italic">luật sư</i> bằng tiếng Việt hoặc 中文</>
              )}
            </h2>
            <p className="text-[#b6c0d6] text-[15px] mt-2.5 mb-0">
              {isZh
                ? "24个工作小时内迅速答复 · 正式立案前出具书面工作方案与费用报价"
                : "Phản hồi trong 24 giờ làm việc · Báo phí trước khi nhận vụ việc"}
            </p>
          </div>

          <div className="flex gap-3.5 flex-wrap shrink-0">
            <a
              href="tel:15277020681"
              className="inline-flex items-center gap-2.5 bg-gradient-to-b from-[#f0d28a] to-[#c29a45] text-[#06122b] font-sans font-semibold text-[13px] tracking-[1.3px] uppercase px-7 py-4 shadow-md hover:brightness-105 transition-all"
            >
              Gọi 15277020681
            </a>
            <a
              href="mailto:lienhe@vanichlaw.vn"
              className="inline-flex items-center gap-2.5 bg-transparent text-white font-sans font-semibold text-[13px] tracking-[1.3px] uppercase px-7 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)] hover:bg-white/10 transition-all"
            >
              Gửi email tư vấn
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white max-w-4xl max-h-[90vh] w-full p-4 border-2 border-[#c29a45] shadow-2xl relative flex flex-col"
          >
            <div className="flex justify-between items-center pb-2 mb-2 border-b border-[#e7dcc3]">
              <h3 className="font-royal font-bold text-lg text-[#0b1d3f] truncate">
                {lightboxImg.title}
              </h3>
              <button
                type="button"
                onClick={() => setLightboxImg(null)}
                className="text-gray-400 hover:text-gray-800 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative flex-1 min-h-[500px]">
              <Image
                src={lightboxImg.src}
                alt={lightboxImg.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
