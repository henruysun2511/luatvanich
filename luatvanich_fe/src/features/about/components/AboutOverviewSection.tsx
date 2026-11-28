"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, X, Phone, MapPin, Mail, Award, ShieldCheck, Building2, Users } from "lucide-react";
import {
  LAWYER_ASSETS,
  LICENSE_ASSETS,
  PROJECT_ASSETS,
  AWARD_ASSETS,
  OFFICE_ASSETS,
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

      {/* 1. Slogan chính thức & Nhận diện cốt lõi */}
      <section className="pt-16 pb-12 bg-gradient-to-b from-[#fbf7ee] to-[#fffdf8] border-b border-[#e7dcc3]">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#a3171e]/10 border border-[#a3171e]/30 text-[#a3171e] text-xs font-semibold uppercase tracking-[3px] mb-4">
            <span className="font-chinese font-bold text-sm tracking-[4px]">使命</span>
            <span>{isZh ? "官方执业口号" : "Khẩu hiệu hành nghề chính thức"}</span>
          </div>

          <h2 className="font-royal font-bold text-[34px] sm:text-[46px] lg:text-[52px] text-[#0b1d3f] leading-[1.2] mb-3">
            {isZh ? "链接中越 · 法律护航" : "Kết nối Việt‑Trung, đồng hành pháp lý vững chắc"}
          </h2>
          <p className="font-chinese text-[18px] sm:text-[22px] text-[#c29a45] font-medium tracking-[3px]">
            {isZh ? "为跨境经贸投资构筑坚不可摧的合规防线" : "链接中越 · 法律护航"}
          </p>
        </div>
      </section>

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
                : "Tên gọi là lời nhắc về mục tiêu của chúng tôi: mỗi vụ việc phải mang lại lợi ích thực và bền vững cho cả hai bên hợp tác."}
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
                  : "Lợi ích. Mục tiêu cuối cùng của mọi tư vấn là lợi ích hợp pháp và an toàn bền vững cho doanh nghiệp."}
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
                  : "Cầu nối pháp lý đem lại lợi ích thiết thực cho hợp tác Việt – Trung."}
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
                  : "Năm 2014, đội ngũ sáng lập gặp một vụ tranh chấp mà nguyên nhân không phải ác ý, chỉ là hai bản hợp đồng Việt – Trung lệch nhau một điều khoản về thẩm quyền và bồi thường. Từ đó chúng tôi xây dựng cách làm việc đọc trực tiếp cả hai ngôn ngữ."}
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
              <p className="text-[#b6c0d6] text-[14px] leading-relaxed m-0">{isZh ? "基于中越双法域实定法精准研判。" : "Tư vấn dựa trên pháp luật thực định hai nước."}</p>
            </div>
            <div className="p-8 sm:p-6">
              <i className="block font-chinese font-bold text-[46px] leading-none text-[#f0d28a] not-italic mb-3.5">明</i>
              <small className="font-sans font-semibold text-[11px] tracking-[2px] text-[#c29a45] uppercase">{isZh ? "准则四" : "Điều 4"}</small>
              <h3 className="font-royal font-bold text-[26px] text-white my-1">{isZh ? "公开透明" : "Minh bạch"}</h3>
              <p className="text-[#b6c0d6] text-[14px] leading-relaxed m-0">{isZh ? "方案与律师费用书面先行确认。" : "Báo phí và phương án bằng văn bản rõ ràng."}</p>
            </div>
            <div className="p-8 sm:p-6">
              <i className="block font-chinese font-bold text-[46px] leading-none text-[#f0d28a] not-italic mb-3.5">伴</i>
              <small className="font-sans font-semibold text-[11px] tracking-[2px] text-[#c29a45] uppercase">{isZh ? "准则五" : "Điều 5"}</small>
              <h3 className="font-royal font-bold text-[26px] text-white my-1">{isZh ? "全程相伴" : "Đồng hành"}</h3>
              <p className="text-[#b6c0d6] text-[14px] leading-relaxed m-0">{isZh ? "紧跟落地闭环直至项目平稳运行。" : "Theo sát vụ việc đến khi hoàn tất trọn vẹn."}</p>
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
                : "Từ một nhóm nhỏ làm hợp đồng song ngữ đến văn phòng luật có mạng lưới thực thụ tại cả hai quốc gia."}
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
              <h3 className="font-royal font-bold text-[25px] text-[#0b1d3f] mt-4 mb-1.5">{isZh ? "外资准入" : "Đầu tư FDI"}</h3>
              <p className="text-[#5b6174] text-[14px] leading-relaxed m-0">{isZh ? "开拓赴越制造实体投资、园区选址与工厂设立全案。" : "Mở mảng tư vấn đầu tư sản xuất cho doanh nghiệp Trung Quốc."}</p>
            </div>
            <div>
              <b className="inline-block bg-[#0b1d3f] text-[#f0d28a] font-royal font-bold text-[22px] px-3.5 py-1.5 border border-[#c29a45] relative z-10">
                2020
              </b>
              <h3 className="font-royal font-bold text-[25px] text-[#0b1d3f] mt-4 mb-1.5">{isZh ? "争议解决" : "Tranh tụng & Trọng tài"}</h3>
              <p className="text-[#5b6174] text-[14px] leading-relaxed m-0">{isZh ? "成立跨国民商事诉讼、越中仲裁与商账追收团队。" : "Thành lập nhóm tranh tụng, trọng tài thương mại và xử lý nợ."}</p>
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
              <h3 className="font-royal font-bold text-[25px] text-[#a3171e] mt-4 mb-1.5">{isZh ? "万益（河内）" : "Vạn Ích (Hà Nội)"}</h3>
              <p className="text-[#5b6174] text-[14px] leading-relaxed m-0">{isZh ? "越南司法部正式批准更名万益（河内）并迁址首都政务核心区。" : "Bộ Tư pháp VN chính thức cấp phép đổi tên và dời trụ sở về Hà Nội."}</p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Đội ngũ chuyên gia pháp lý thực chiến hàng đầu (ĐẦY ĐỦ 7 CHUYÊN GIA) */}
      <section className="py-20 lg:py-24 bg-[#fbf7ee] border-t border-[#e7dcc3]" id="chuyen-gia">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end mb-12">
            <div>
              <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#a3171e] flex items-center mb-3">
                <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">精英</b>
                {isZh ? "主办律师及智库" : "Đội ngũ chuyên gia"}
              </div>
              <h2 className="font-royal font-bold text-[40px] sm:text-[48px] text-[#0b1d3f] leading-[1.1] relative after:content-[''] after:block after:w-14 after:h-[3px] after:bg-[#a3171e] after:mt-4">
                {isZh ? "涉外实务主办律师与高级顾问" : "Đội ngũ pháp lý nòng cốt Việt - Trung"}
              </h2>
            </div>
            <p className="m-0 text-[#5b6174] text-[15px] leading-relaxed">
              {isZh
                ? "中越双持证律师领衔，深谙两国实定法、经贸惯例与司法实践，直接以双语参与商业谈判与诉讼仲裁。"
                : "Được dẫn dắt bởi các luật sư có giấy phép hành nghề tại Việt Nam và Trung Quốc, kết hợp cùng đội ngũ giáo sư, tiến sĩ và trọng tài viên thương mại quốc tế."}
            </p>
          </div>

          {/* Hồ sơ nổi bật: Giám đốc chi nhánh */}
          <div className="bg-white border border-[#e7dcc3] shadow-[0_14px_34px_rgba(11,29,63,0.08)] grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] mb-6 overflow-hidden">
            <div className="relative aspect-[4/5] lg:aspect-auto bg-[#0b1d3f]">
              <Image
                src={LAWYER_ASSETS.langThan.portrait}
                alt="LS. Lăng Thần"
                fill
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1d3f] to-transparent h-24" />
            </div>
            <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
              <span className="text-[11px] font-semibold text-[#a3171e] uppercase tracking-[2.5px] mb-3">
                {isZh ? "办公室主任 · 常驻河内" : "Giám đốc chi nhánh · Thường trú Hà Nội"}
              </span>
              <h3 className="font-royal font-bold text-[32px] sm:text-[38px] text-[#0b1d3f] leading-tight mb-1">
                Lăng Thần <span className="font-chinese font-semibold text-[16px] text-[#a3171e] tracking-[2px] ml-1">凌晨</span>
              </h3>
              <p className="text-[#c29a45] font-semibold text-[14px] uppercase tracking-wider mb-5">
                {isZh ? "河内与崇左办公室主任" : "Giám đốc VP Hà Nội & Sùng Tả"}
              </p>
              <p className="text-[15.5px] text-[#27324a] leading-relaxed mb-6 max-w-[520px]">
                {isZh ? "中国律师、获准在越执业。崇左市政协委员，深耕跨境诉讼与FDI并购。" : "Luật sư Trung Quốc được cấp phép tại Việt Nam, Ủy viên Ủy ban Mặt trận Tổ quốc TP. Sùng Tả, chuyên trách tranh tụng xuyên biên giới và các thương vụ M&A có yếu tố FDI."}
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0b1d3f]">
                  <ShieldCheck className="w-4 h-4 text-[#a3171e]" /> {isZh ? "持证：越南 & 中国" : "Giấy phép hành nghề: Việt Nam & Trung Quốc"}
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxImg({ src: LAWYER_ASSETS.langThan.licenses[0], title: "Giấy phép hành nghề tại Việt Nam - LS. Lăng Thần" })}
                  className="inline-flex items-center gap-1.5 text-[13px] text-[#a3171e] font-semibold border-b border-[#a3171e] pb-0.5 hover:text-[#0b1d3f] hover:border-[#0b1d3f] transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" /> {isZh ? "查看执业证" : "Xem chứng chỉ hành nghề"}
                </button>
              </div>
            </div>
          </div>

          {/* 3 luật sư thường trú còn lại */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">

            {/* LS 2: Liễu Ái */}
            <div className="bg-white border border-[#e7dcc3] flex gap-4 p-4 hover:border-[#c29a45] hover:shadow-[0_8px_22px_rgba(11,29,63,0.08)] transition-all group">
              <div className="relative w-[84px] h-[84px] shrink-0 overflow-hidden bg-[#0b1d3f]">
                <Image
                  src={LAWYER_ASSETS.lieuAi.portrait}
                  alt="LS. Liễu Ái"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-royal font-bold text-[18px] text-[#0b1d3f] group-hover:text-[#a3171e] transition-colors leading-tight">
                  Liễu Ái <span className="font-chinese font-semibold text-[12px] text-[#a3171e] ml-0.5">柳爱</span>
                </h4>
                <p className="text-[11px] font-semibold text-[#c29a45] uppercase tracking-wide mt-0.5 mb-1.5">
                  {isZh ? "专职律师" : "Luật sư chuyên trách"}
                </p>
                <button
                  type="button"
                  onClick={() => setLightboxImg({ src: LAWYER_ASSETS.lieuAi.licenses[0], title: "Giấy phép hành nghề tại Việt Nam - LS. Liễu Ái" })}
                  className="text-[11.5px] text-[#5b6174] hover:text-[#a3171e] inline-flex items-center gap-1"
                >
                  <ShieldCheck className="w-3 h-3" /> {isZh ? "查看证书" : "Xem giấy phép"}
                </button>
              </div>
            </div>

            {/* LS 3: Tưởng Nữ Trinh */}
            <div className="bg-white border border-[#e7dcc3] flex gap-4 p-4 hover:border-[#c29a45] hover:shadow-[0_8px_22px_rgba(11,29,63,0.08)] transition-all group">
              <div className="relative w-[84px] h-[84px] shrink-0 overflow-hidden bg-[#0b1d3f]">
                <Image
                  src={LAWYER_ASSETS.tuongNuTrinh.portrait}
                  alt="LS. Tưởng Nữ Trinh"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-royal font-bold text-[18px] text-[#0b1d3f] group-hover:text-[#a3171e] transition-colors leading-tight">
                  Tưởng Nữ Trinh <span className="font-chinese font-semibold text-[12px] text-[#a3171e] ml-0.5">蒋女贞</span>
                </h4>
                <p className="text-[11px] font-semibold text-[#c29a45] uppercase tracking-wide mt-0.5 mb-1.5">
                  {isZh ? "双语涉外律师" : "Luật sư song ngữ"}
                </p>
                <button
                  type="button"
                  onClick={() => setLightboxImg({ src: LAWYER_ASSETS.tuongNuTrinh.licenses[0], title: "Giấy phép hành nghề - LS. Tưởng Nữ Trinh" })}
                  className="text-[11.5px] text-[#5b6174] hover:text-[#a3171e] inline-flex items-center gap-1"
                >
                  <ShieldCheck className="w-3 h-3" /> {isZh ? "查看证书" : "Xem giấy phép"}
                </button>
              </div>
            </div>

            {/* LS 4: Lê Chí Chinh */}
            <div className="bg-white border border-[#e7dcc3] flex gap-4 p-4 hover:border-[#c29a45] hover:shadow-[0_8px_22px_rgba(11,29,63,0.08)] transition-all group">
              <div className="relative w-[84px] h-[84px] shrink-0 overflow-hidden bg-[#fbf7ee]">
                <Image
                  src={LAWYER_ASSETS.leChiChinh.card}
                  alt="LS. Lê Chí Chinh"
                  fill
                  className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-royal font-bold text-[18px] text-[#0b1d3f] group-hover:text-[#a3171e] transition-colors leading-tight">
                  Lê Chí Chinh <span className="font-chinese font-semibold text-[12px] text-[#a3171e] ml-0.5">黎志征</span>
                </h4>
                <p className="text-[11px] font-semibold text-[#c29a45] uppercase tracking-wide mt-0.5 mb-1.5">
                  {isZh ? "仲裁员" : "Trọng tài viên"}
                </p>
                <button
                  type="button"
                  onClick={() => setLightboxImg({ src: LAWYER_ASSETS.leChiChinh.license, title: "Thẻ Luật sư - LS. Lê Chí Chinh" })}
                  className="text-[11.5px] text-[#5b6174] hover:text-[#a3171e] inline-flex items-center gap-1"
                >
                  <ShieldCheck className="w-3 h-3" /> {isZh ? "查看证书" : "Xem thẻ LS"}
                </button>
              </div>
            </div>

          </div>

          {/* Nhóm 2: Hội đồng cố vấn cấp cao - dạng danh sách hồ sơ */}
          <div>
            <h3 className="font-royal font-bold text-[24px] text-[#0b1d3f] mb-1">
              {isZh ? "总所领导与专家顾问智库" : "Hội đồng cố vấn & Lãnh đạo cấp cao"}
            </h3>
            <p className="text-[14px] text-[#5b6174] mb-6">
              {isZh ? "学术与政策支持" : "Hỗ trợ học thuật, chiến lược và chính sách song phương"}
            </p>

            <div className="border-t border-[#e7dcc3]">

              {/* Chuyên gia 5: TS. Lăng Bân */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 py-6 border-b border-[#e7dcc3]">
                <div className="flex items-center gap-4 sm:w-[300px] shrink-0">
                  <div className="w-16 h-16 shrink-0 bg-[#0b1d3f] text-[#f0d28a] grid place-items-center font-chinese font-bold text-2xl">
                    凌
                  </div>
                  <div>
                    <h4 className="font-royal font-bold text-[20px] text-[#0b1d3f] leading-tight">
                      TS. Lăng Bân <span className="font-chinese text-sm text-[#a3171e] ml-1">凌斌</span>
                    </h4>
                    <span className="text-[12px] font-semibold text-[#c29a45] uppercase tracking-wide">
                      {isZh ? "万益总所主任" : "Chủ nhiệm Tổng sở Vạn Ích"}
                    </span>
                  </div>
                </div>
                <p className="text-[14px] text-[#5b6174] leading-relaxed m-0 flex-1">
                  {isZh
                    ? "法学博士，由中国司法部与中华全国律师协会表彰的“全国优秀律师”，全面督导跨境涉外法务准则与质控体系。"
                    : "Tiến sĩ Luật, Luật sư xuất sắc toàn quốc do Bộ Tư pháp Trung Quốc vinh danh. Phụ trách định hướng chiến lược và kiểm soát chất lượng vụ việc xuyên biên giới."}
                </p>
              </div>

              {/* Chuyên gia 6: GS. TS. Ngũ Quang Hồng */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 py-6 border-b border-[#e7dcc3]">
                <div className="flex items-center gap-4 sm:w-[300px] shrink-0">
                  <div className="w-16 h-16 shrink-0 bg-[#0b1d3f] text-[#f0d28a] grid place-items-center font-chinese font-bold text-2xl">
                    伍
                  </div>
                  <div>
                    <h4 className="font-royal font-bold text-[20px] text-[#0b1d3f] leading-tight">
                      GS. TS. Ngũ Quang Hồng <span className="font-chinese text-sm text-[#a3171e] ml-1">伍光红</span>
                    </h4>
                    <span className="text-[12px] font-semibold text-[#c29a45] uppercase tracking-wide">
                      {isZh ? "法学教授 · 博士生导师" : "Cố vấn học thuật & Luật so sánh"}
                    </span>
                  </div>
                </div>
                <p className="text-[14px] text-[#5b6174] leading-relaxed m-0 flex-1">
                  {isZh
                    ? "越南河内国家大学法学博士、广西民族大学教授，主持翻译《越南民法典》及多部越南商事实定法典籍。"
                    : "Tiến sĩ Luật Đại học Quốc gia Hà Nội, Giáo sư Đại học Dân tộc Quảng Tây, chuyên gia dịch thuật Bộ luật Dân sự Việt Nam sang tiếng Trung."}
                </p>
              </div>

              {/* Chuyên gia 7: TS. Kinh tế Trần Trà My */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 py-6">
                <div className="flex items-center gap-4 sm:w-[300px] shrink-0">
                  <div className="w-16 h-16 shrink-0 bg-[#0b1d3f] text-[#f0d28a] grid place-items-center font-chinese font-bold text-2xl">
                    陈
                  </div>
                  <div>
                    <h4 className="font-royal font-bold text-[20px] text-[#0b1d3f] leading-tight">
                      TS. Trần Trà My <span className="font-chinese text-sm text-[#a3171e] ml-1">Tran Tra My</span>
                    </h4>
                    <span className="text-[12px] font-semibold text-[#c29a45] uppercase tracking-wide">
                      {isZh ? "对外经贸顾问 · 经济学博士" : "Cố vấn Ngoại giao & Thương mại"}
                    </span>
                  </div>
                </div>
                <p className="text-[14px] text-[#5b6174] leading-relaxed m-0 flex-1">
                  {isZh
                    ? "对外经济贸易大学（北京UIBE）经济学博士，专注中越跨境产业园选址、跨国供应链政策合规与双边经贸政策研判。"
                    : "Tiến sĩ Kinh tế Đại học Kinh tế & Thương mại Đối ngoại Bắc Kinh (UIBE), cố vấn kết nối quan hệ kinh tế - thương mại và xúc tiến đầu tư."}
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 7. Tư cách pháp lý chính thức tại Việt Nam (4 Giấy phép Scan) */}
      <section className="py-20 lg:py-24 border-t border-[#e7dcc3]" id="phap-ly">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end mb-12">
            <div>
              <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#a3171e] flex items-center mb-3">
                <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">资质</b>
                {isZh ? "法定资质" : "Tư cách pháp lý"}
              </div>
              <h2 className="font-royal font-bold text-[40px] sm:text-[48px] text-[#0b1d3f] leading-[1.1] relative after:content-[''] after:block after:w-14 after:h-[3px] after:bg-[#a3171e] after:mt-4">
                {isZh ? "越南司法部正式批准备案" : "Hợp pháp hóa & Giấy phép chính thức"}
              </h2>
            </div>
            <p className="m-0 text-[#5b6174] text-[15px] leading-relaxed">
              {isZh
                ? "广西万益（河内）律师事务所为在中国司法部合法备案、经越南司法部第 73/TP/ĐKHĐ-ĐN 号执照批准设立的外国律师事务所分支机构，依法在越南境内开展全方位涉外法律服务。"
                : "Chi nhánh Văn phòng Luật sư Vạn Ích Quảng Tây tại Hà Nội là chi nhánh hãng luật nước ngoài được Bộ Tư pháp Việt Nam cấp phép chính thức theo Giấy phép số 73/TP/ĐKHĐ-ĐN, tiền thân là Chi nhánh Bắc Ninh dời về Thủ đô Hà Nội theo Giấy phép điều chỉnh mới nhất."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              onClick={() => setLightboxImg({ src: LICENSE_ASSETS.boTuPhapHanoi.main, title: "Giấy phép thành lập Chi nhánh Hà Nội do Bộ Tư pháp Việt Nam cấp" })}
              className="bg-white border border-[#e7dcc3] p-5 cursor-pointer hover:border-[#c29a45] hover:shadow-lg transition-all group"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-[#fbf7ee] border border-[#e7dcc3] mb-3">
                <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 bg-[#0b1d3f] text-[#f0d28a] text-[10px] font-semibold uppercase tracking-wider px-2 py-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3 h-3"><path fill="currentColor" d="M12 2l7 3v6c0 5-3.5 8.5-7 11c-3.5-2.5-7-6-7-11V5z" /></svg>
                  {isZh ? "已核验" : "Đã xác thực"}
                </span>
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
              <small className="text-[#5b6174] text-[12px] block mt-0.5">Cấp phép chi nhánh tại Hà Nội</small>
            </div>

            <div
              onClick={() => setLightboxImg({ src: LICENSE_ASSETS.boTuPhapHanoi.tax, title: "Giấy chứng nhận đăng ký thuế tại Việt Nam" })}
              className="bg-white border border-[#e7dcc3] p-5 cursor-pointer hover:border-[#c29a45] hover:shadow-lg transition-all group"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-[#fbf7ee] border border-[#e7dcc3] mb-3">
                <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 bg-[#0b1d3f] text-[#f0d28a] text-[10px] font-semibold uppercase tracking-wider px-2 py-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3 h-3"><path fill="currentColor" d="M12 2l7 3v6c0 5-3.5 8.5-7 11c-3.5-2.5-7-6-7-11V5z" /></svg>
                  {isZh ? "已核验" : "Đã xác thực"}
                </span>
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
                <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 bg-[#0b1d3f] text-[#f0d28a] text-[10px] font-semibold uppercase tracking-wider px-2 py-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3 h-3"><path fill="currentColor" d="M12 2l7 3v6c0 5-3.5 8.5-7 11c-3.5-2.5-7-6-7-11V5z" /></svg>
                  {isZh ? "已核验" : "Đã xác thực"}
                </span>
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
              <small className="text-[#5b6174] text-[12px] block mt-0.5">Bộ Tư pháp cấp phép hành nghề tại VN</small>
            </div>

            <div
              onClick={() => setLightboxImg({ src: "/images/licenses/giay-phep-hanh-nghe-lang-than-1.png", title: "Giấy phép hành nghề LS. Lăng Thần" })}
              className="bg-white border border-[#e7dcc3] p-5 cursor-pointer hover:border-[#c29a45] hover:shadow-lg transition-all group"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-[#fbf7ee] border border-[#e7dcc3] mb-3">
                <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 bg-[#0b1d3f] text-[#f0d28a] text-[10px] font-semibold uppercase tracking-wider px-2 py-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3 h-3"><path fill="currentColor" d="M12 2l7 3v6c0 5-3.5 8.5-7 11c-3.5-2.5-7-6-7-11V5z" /></svg>
                  {isZh ? "已核验" : "Đã xác thực"}
                </span>
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
              <small className="text-[#5b6174] text-[12px] block mt-0.5">Trưởng đại diện chi nhánh Hà Nội</small>
            </div>
          </div>

        </div>
      </section>

      {/* 8. 5 Dự án & Khách hàng FDI thực tế (Case Studies) */}
      <section className="py-20 lg:py-24 bg-[#fbf7ee] border-t border-[#e7dcc3]">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end mb-12">
            <div>
              <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#a3171e] flex items-center mb-3">
                <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">实绩</b>
                {isZh ? "实战案例" : "Hồ sơ năng lực"}
              </div>
              <h2 className="font-royal font-bold text-[40px] sm:text-[48px] text-[#0b1d3f] leading-[1.1] relative after:content-[''] after:block after:w-14 after:h-[3px] after:bg-[#a3171e] after:mt-4">
                {isZh ? "五大跨境重点投资与并购实战项目" : "5 dự án trọng điểm đã thực hiện tại Việt Nam"}
              </h2>
            </div>
            <p className="m-0 text-[#5b6174] text-[15px] leading-relaxed">
              {isZh
                ? "合同与实务证据闭环，见证我们协助中资企业在越南实现合规落地与商业成功。"
                : "Hồ sơ hợp đồng và thẩm định thực tế, minh chứng cho năng lực thực thi các giao dịch FDI và M&A quy mô lớn."}
            </p>
          </div>

          <div>
            {PROJECT_ASSETS.map((p, idx) => (
              <div
                key={idx}
                className={`flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-6 px-6 sm:px-8 border-l-4 group transition-colors ${idx % 2 === 0
                    ? "bg-white border-l-[#a3171e]"
                    : "bg-[#fffdf8] border-l-[#c29a45]"
                  }`}
              >
                <span className="inline-flex items-center justify-center w-11 h-11 shrink-0 bg-[#0b1d3f] text-[#f0d28a] font-royal font-bold text-[17px] border border-[#c29a45]">
                  0{idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="inline-block text-[10.5px] font-semibold text-[#a3171e] uppercase tracking-wider bg-[#a3171e]/10 px-2.5 py-1 mb-2">
                    {p.clientZh}
                  </span>
                  <b className="font-royal text-[20px] sm:text-[22px] text-[#0b1d3f] group-hover:text-[#a3171e] transition-colors block leading-snug">
                    {p.name}
                  </b>
                  <p className="text-[13px] text-[#5b6174] m-0 mt-1">
                    Khách hàng: {p.client}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setLightboxImg({ src: p.contracts[0], title: p.name })}
                  className="inline-flex items-center gap-1.5 text-xs text-[#a3171e] font-semibold border border-[#a3171e] px-4 py-2 hover:bg-[#a3171e] hover:text-white transition-all self-start sm:self-center shrink-0 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isZh ? "查看合同材料" : "Xem hồ sơ hợp đồng"}</span>
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. Bằng khen & Huân chương danh dự cấp Quốc gia (6 Awards) */}
      <section className="py-20 lg:py-24 border-t border-[#e7dcc3]">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end mb-14">
            <div>
              <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#a3171e] flex items-center mb-3">
                <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">荣誉</b>
                {isZh ? "殊荣表彰" : "Vinh danh & Khen thưởng"}
              </div>
              <h2 className="font-royal font-bold text-[40px] sm:text-[48px] text-[#0b1d3f] leading-[1.1] relative after:content-[''] after:block after:w-14 after:h-[3px] after:bg-[#a3171e] after:mt-4">
                {isZh ? "国家级与行业权威荣誉" : "Bằng khen & Huân chương cấp Quốc gia"}
              </h2>
            </div>
            <p className="m-0 text-[#5b6174] text-[15px] leading-relaxed">
              {isZh
                ? "近三十年稳健合规执业，万益屡获中央文明办、司法部及律师协会国家级最高荣誉表彰。"
                : "Gần 30 năm phát triển, hệ thống Vạn Ích nhiều lần được Ủy ban Văn minh Trung ương, Bộ Tư pháp và Hiệp hội Luật sư toàn quốc khen tặng."}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-10 gap-y-10">
            {AWARD_ASSETS.map((aw, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxImg({ src: aw.src, title: aw.title })}
                className="cursor-pointer group flex flex-col items-center text-center w-[150px]"
              >
                <div className="relative w-[128px] h-[128px] rounded-full overflow-hidden border-[3px] border-[#e7dcc3] group-hover:border-[#c29a45] transition-colors bg-[#fbf7ee] shadow-[0_6px_18px_rgba(11,29,63,0.08)] mb-3">
                  <Image
                    src={aw.src}
                    alt={aw.title}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="font-chinese text-[11px] text-[#a3171e] font-semibold block mb-0.5">
                  {aw.titleZh}
                </span>
                <h4 className="font-royal font-bold text-[14px] text-[#0b1d3f] group-hover:text-[#a3171e] transition-colors leading-snug">
                  {aw.title}
                </h4>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. Trụ sở thực tế tại Hà Nội, Nam Ninh & Đầu mối liên hệ */}
      <section className="py-20 lg:py-24 bg-[#fbf7ee] border-t border-[#e7dcc3]" id="dia-chi">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end mb-12">
            <div>
              <div className="text-[12px] font-sans font-medium tracking-[3px] uppercase text-[#a3171e] flex items-center mb-3">
                <b className="font-chinese font-bold text-[15px] tracking-[4px] mr-3">驻所</b>
                {isZh ? "办公实体" : "Trụ sở hoạt động"}
              </div>
              <h2 className="font-royal font-bold text-[40px] sm:text-[48px] text-[#0b1d3f] leading-[1.1] relative after:content-[''] after:block after:w-14 after:h-[3px] after:bg-[#a3171e] after:mt-4">
                {isZh ? "河内与南宁实体办公机构" : "Trụ sở Hà Nội & Tổng sở Nam Ninh"}
              </h2>
            </div>
            <p className="m-0 text-[#5b6174] text-[15px] leading-relaxed">
              {isZh
                ? "两地实体律所无缝协作，为客户提供中越跨境法务面对面当面研判与闭环支持。"
                : "Văn phòng thực tế sẵn sàng tiếp đón và làm việc trực tiếp cùng quý khách hàng tại Thủ đô Hà Nội và Nam Ninh."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Trụ sở Hà Nội */}
            <div className="bg-white border border-[#e7dcc3] shadow-[0_10px_28px_rgba(11,29,63,0.07)] overflow-hidden">
              <div className="relative aspect-[16/8]">
                <Image
                  src={OFFICE_ASSETS.workspace}
                  alt="Không gian làm việc Vạn Ích Hà Nội"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d3f]/90 via-[#0b1d3f]/10 to-transparent" />
                <div className="absolute top-4 right-0 bg-[#a3171e] text-white px-4 py-1 text-xs font-semibold uppercase tracking-wider">
                  Việt Nam
                </div>
                <div className="absolute bottom-4 left-5 right-5">
                  <span className="font-chinese font-bold text-[#f0d28a] text-sm tracking-[2px] block mb-0.5">
                    越南办事处 · 首都河内
                  </span>
                  <h3 className="font-royal font-bold text-[26px] text-white leading-tight">
                    Văn phòng Vạn Ích (Hà Nội)
                  </h3>
                </div>
              </div>

              <div className="p-7 sm:p-8 flex gap-6">
                <div className="relative w-[90px] h-[90px] shrink-0 overflow-hidden hidden sm:block">
                  <Image src={OFFICE_ASSETS.reception} alt="Sảnh tiếp khách" fill className="object-cover" />
                </div>
                <div className="space-y-3 text-[14px] text-[#27324a] min-w-0">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#a3171e] shrink-0 mt-0.5" />
                    <p className="text-[#5b6174] m-0">
                      Số 17, Đường 23, Khu biệt thự liền kề KĐT Thành phố Giao Lưu, Cổ Nhuế 1, Bắc Từ Liêm, Hà Nội.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Users className="w-4 h-4 text-[#a3171e] shrink-0 mt-0.5" />
                    <p className="text-[#5b6174] m-0">
                      Đầu mối: LS. Tưởng Nữ Trinh (Chi nhánh Hà Nội & Bắc Kinh)
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-[#a3171e] shrink-0 mt-0.5" />
                    <p className="text-[#a3171e] font-bold m-0">15277020681</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trụ sở Tổng sở Nam Ninh */}
            <div className="bg-white border border-[#e7dcc3] shadow-[0_10px_28px_rgba(11,29,63,0.07)] overflow-hidden">
              <div className="relative aspect-[16/8]">
                <Image
                  src={OFFICE_ASSETS.headquarter}
                  alt="Trụ sở Tòa nhà Cửu Châu Quốc Tế"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d3f]/90 via-[#0b1d3f]/10 to-transparent" />
                <div className="absolute top-4 right-0 bg-[#0b1d3f] text-[#f0d28a] px-4 py-1 text-xs font-semibold uppercase tracking-wider">
                  China HQ
                </div>
                <div className="absolute bottom-4 left-5 right-5">
                  <span className="font-chinese font-bold text-[#f0d28a] text-sm tracking-[2px] block mb-0.5">
                    中国总所 · 广西南宁
                  </span>
                  <h3 className="font-royal font-bold text-[26px] text-white leading-tight">
                    Tổng sở Vạn Ích (Nam Ninh)
                  </h3>
                </div>
              </div>

              <div className="p-7 sm:p-8 flex gap-6">
                <div className="relative w-[90px] h-[90px] shrink-0 overflow-hidden hidden sm:block">
                  <Image src={OFFICE_ASSETS.conference} alt="Phòng hội nghị" fill className="object-cover" />
                </div>
                <div className="space-y-3 text-[14px] text-[#27324a] min-w-0">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#c29a45] shrink-0 mt-0.5" />
                    <p className="text-[#5b6174] m-0">
                      Tầng 27, Tòa nhà Cửu Châu Quốc Tế, TP. Nam Ninh, Khu tự trị dân tộc Choang Quảng Tây, Trung Quốc.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Building2 className="w-4 h-4 text-[#c29a45] shrink-0 mt-0.5" />
                    <p className="text-[#5b6174] m-0">
                      Mạng lưới liên kết: Bắc Kinh, Thượng Hải, Thâm Quyến, Sùng Tả, Đông Hưng, Bách Sắc, Phòng Thành Cảng.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-[#c29a45] shrink-0 mt-0.5" />
                    <p className="text-[#0b1d3f] font-semibold m-0">lienhe@vanichlaw.vn</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 11. CTA Band cuối trang (.band) */}
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
                <>直接与 <i className="text-[#f0d28a] font-normal not-italic">主办涉外律师</i> 沟通业务（越文或中文）</>
              ) : (
                <>Nói chuyện trực tiếp với <i className="text-[#f0d28a] font-normal not-italic">luật sư</i> bằng tiếng Việt hoặc 中文</>
              )}
            </h2>
            <p className="text-[#b6c0d6] text-[15px] mt-2.5 mb-0">
              {isZh
                ? "24个工作小时内迅速答复 · 正式立案前出具书面工作方案与费用报价"
                : "Phản hồi trong 24 giờ làm việc · Báo phí và giải pháp bằng văn bản trước khi ký kết"}
            </p>
          </div>

          <div className="flex gap-3.5 flex-wrap shrink-0">
            <a
              href="tel:15277020681"
              className="inline-flex items-center gap-2.5 bg-gradient-to-b from-[#f0d28a] to-[#c29a45] text-[#06122b] font-sans font-semibold text-[13px] tracking-[1.3px] uppercase px-7 py-4 shadow-md hover:brightness-105 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Gọi 15277020681</span>
            </a>
            <a
              href="mailto:lienhe@vanichlaw.vn"
              className="inline-flex items-center gap-2.5 bg-transparent text-white font-sans font-semibold text-[13px] tracking-[1.3px] uppercase px-7 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)] hover:bg-white/10 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Gửi email tư vấn</span>
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