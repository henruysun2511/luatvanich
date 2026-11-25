"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  Award,
  Building2,
  Users,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Eye,
  X,
} from "lucide-react";
import {
  LAWYER_ASSETS,
  LICENSE_ASSETS,
  AWARD_ASSETS,
  OFFICE_ASSETS,
  PROJECT_ASSETS,
} from "@/constants/assets.constants";

interface AboutOverviewSectionProps {
  lang: string;
}

export function AboutOverviewSection({ lang }: AboutOverviewSectionProps) {
  const isZh = lang === "zh-CN" || lang === "zh";

  // Lightbox preview for licenses or contracts
  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string } | null>(null);

  // Stats
  const STATS = [
    { num: "30+", vi: "Năm kinh nghiệm tổng sở (từ 1996)", zh: "年总所深耕历程（始于1996）" },
    { num: "300+", vi: "Luật sư & chuyên gia pháp lý", zh: "位专业律师与涉外人才" },
    { num: "100%", vi: "Hợp pháp hóa bởi Bộ Tư pháp VN", zh: "越南司法部正式批设合规机构" },
    { num: "12", vi: "Văn phòng tại VN, TQ & Đông Nam Á", zh: "处国内外协同网络与分支机构" },
  ];

  // 7 Core Experts
  const KEY_EXPERTS = [
    {
      nameVi: "LS. Lăng Thần",
      nameZh: "凌晨 主任",
      roleVi: "Giám đốc Văn phòng Vạn Ích Hà Nội & Sùng Tả · Luật sư TQ được cấp phép hành nghề tại Việt Nam",
      roleZh: "万益河内、崇左办公室主任 · 越南执业许可中国律师",
      descVi: "Cử nhân Luật, du học Đại học Hà Nội từ 2010. Ủy viên UB MTTQ TP. Sùng Tả khóa IV, V, VI; Cố vấn lập pháp HĐND TP; Hơn 10 năm kinh nghiệm M&A, FDI, tranh tụng và quy tắc RCEP. Đạt danh hiệu Luật sư xuất sắc, Đảng viên xuất sắc ngành luật sư.",
      descZh: "法学学士，2010年留学河内大学，中越双语实战涉外律师。崇左市政协委员、市人大立法专家顾问。深耕跨境投资并购、项目谈判、尽职调查十余年，荣获崇左市优秀律师、全区普法先进个人称号。",
      img: LAWYER_ASSETS.langThan.portrait,
      tag: "Trưởng đại diện",
      tagZh: "首席代表",
    },
    {
      nameVi: "LS. Liễu Ái",
      nameZh: "柳爱 律师",
      roleVi: "Luật sư chuyên trách Văn phòng Hà Nội (Có giấy phép hành nghề tại VN)",
      roleZh: "万益河内办公室专职律师（越南执业许可）",
      descVi: "Luật sư Trung Quốc được Bộ Tư pháp Việt Nam cấp phép hành nghề chính thức. Chuyên sâu giải quyết tranh chấp thương mại, xử lý xung đột pháp luật và tư vấn dự án đầu tư nhà xưởng tại Việt Nam.",
      descZh: "拥有越南司法部颁发执业许可的中国律师。常驻越南，专注跨境民商事争议解决、涉越投资并购与企业合规风控实务。",
      img: LAWYER_ASSETS.lieuAi.portrait,
      tag: "Luật sư thường trú VN",
      tagZh: "常驻越南",
    },
    {
      nameVi: "LS. Tưởng Nữ Trinh",
      nameZh: "蒋女贞 律师",
      roleVi: "Thạc sĩ · Luật sư song ngữ Trung – Việt Văn phòng Bắc Kinh · Đầu mối liên hệ",
      roleZh: "硕士 · 万益北京办公室专职律师（中越双语）",
      descVi: "Thạc sĩ Luật, thông thạo tiếng Trung và tiếng Việt. Chuyên trách tư vấn đầu tư nước ngoài, cố vấn pháp lý doanh nghiệp, đại diện tố tụng và trọng tài quốc tế. Đầu mối tiếp nhận và điều phối hồ sơ khách hàng.",
      descZh: "法学硕士，中越双语涉外律师。专注涉外投资咨询、企业法律顾问、跨境民商事诉讼与仲裁代理。河内办公室核心联络协调人。",
      img: LAWYER_ASSETS.tuongNuTrinh.portrait,
      tag: "Đầu mối tiếp nhận",
      tagZh: "业务统筹",
      phone: "15277020681",
    },
    {
      nameVi: "LS. Lê Chí Chinh (Lê Chí Trinh)",
      nameZh: "黎志征 律师",
      roleVi: "Giám đốc Viễn Dương Legal · Trọng tài viên Trọng tài Thương mại Việt – Trung",
      roleZh: "远洋律所主任 · 越中仲裁中心仲裁员",
      descVi: "Luật sư Đoàn Luật sư tỉnh Quảng Ninh, Trọng tài viên Trọng tài Thương mại Bắc Hải và Phòng Thành Cảng. Hội viên Hiệp hội DN Đầu tư nước ngoài Việt Nam (VAFIE). Tác giả công trình nghiên cứu so sánh pháp luật Việt Nam - Trung Quốc.",
      descZh: "越南广宁省律师协会执业律师，远洋律师事务所主任。兼任越中仲裁中心仲裁员、北海商事仲裁员，越南外资企业协会会员，中越法律移植研讨专家。",
      img: LAWYER_ASSETS.leChiChinh.card,
      tag: "Đối tác Việt Nam",
      tagZh: "越南本土合伙",
    },
    {
      nameVi: "GS. TS. Ngũ Quang Hồng",
      nameZh: "伍光红 教授/律师",
      roleVi: "Tiến sĩ Luật ĐHQGHN · Giáo sư, Hướng dẫn NCS ĐH Dân tộc Quảng Tây",
      roleZh: "越南河内国家大学法学博士 · 广西民族大学法学院教授/博导",
      descVi: "Tiến sĩ Luật học tại Đại học Quốc gia Hà Nội. Chuyên gia hàng đầu về pháp luật Việt Nam tại Trung Quốc, chủ trì hơn 10 đề tài cấp nhà nước, công bố hơn 40 bài báo khoa học; dịch thuật và xuất bản Bộ luật Dân sự Việt Nam và Tuyển tập Pháp luật Thương mại Đầu tư Việt Nam.",
      descZh: "越南河内国家大学法学博士，博士生导师。主持国家及省部级涉外法治课题10余项，出版《越南民法典》《越南商贸投资法律汇编》等专著译著10余部。",
      img: "/images/office/phong-hoi-nghi-van-ich.jpeg",
      tag: "Cố vấn học thuật",
      tagZh: "法学博导",
    },
    {
      nameVi: "TS. LS. Lăng Bân",
      nameZh: "凌斌 主任/书记",
      roleVi: "Chủ nhiệm Tổng sở Vạn Ích · Bí thư Đảng ủy · Luật sư Cấp 1 Toàn quốc",
      roleZh: "广西万益总所主任、党委书记 · 一级律师/博士",
      descVi: "Hậu tiến sĩ Luật Tây Nam, Luật sư xuất sắc toàn quốc do Bộ Tư pháp Trung Quốc vinh danh. Trực tiếp tham gia công tác lập pháp địa phương và chiến lược pháp trị ASEAN; chuyên sâu các vụ tranh tụng trọng điểm, tái cấu trúc phá sản và M&A quy mô lớn.",
      descZh: "西南政法大学法学博士后，司法部全国优秀律师。深度参与地方立法与东盟法治研究，拥有重大商事诉讼、破产重组及跨国投资顶级实操经验。",
      img: "/images/office/tru-so-cuu-chau-quoc-te-van-ich.jpeg",
      tag: "Lãnh đạo tổng sở",
      tagZh: "总所领航",
    },
    {
      nameVi: "TS. Kinh tế Trần Trà My",
      nameZh: "陈茶媚 博士 (Tran Tra My)",
      roleVi: "Cố vấn cấp cao Ngoại giao & Kinh tế · Tiến sĩ UIBE Bắc Kinh",
      roleZh: "高级顾问 · 经济学博士（对外经贸大学）",
      descVi: "Tiếng mẹ đẻ tiếng Việt, thông thạo tiếng Trung và tiếng Anh thương mại. Tiến sĩ Thương mại Quốc tế tại Đại học Kinh tế Thương mại Đối ngoại Bắc Kinh (UIBE). Cố vấn chiến lược kết nối chính quyền, hiệp hội và các tập đoàn lớn hai nước.",
      descZh: "越南母语，精通中英越商务用语。对外经济贸易大学国际贸易学博士，北京交通大学本科及硕士。专注中越政府园区资源对接与跨境商业投资战略。",
      img: "/images/office/khu-vuc-tiep-khach-van-ich.jpeg",
      tag: "Cố vấn ngoại giao",
      tagZh: "高级外联顾问",
    },
  ];

  // 5 Real-world Case Studies
  const CASE_STUDIES = [
    {
      id: 1,
      titleVi: "Nhà máy sản xuất 1,2 triệu lốp radian toàn thép/năm tại Việt Nam",
      titleZh: "贵州前进轮胎在越设立年产120万条全钢子午线轮胎项目",
      clientVi: "Công ty TNHH Lốp xe Tiền Tiến Việt Nam (Quý Châu Tiền Tiến)",
      clientZh: "贵州前进轮胎投资有限责任公司 / 越南前进轮胎",
      descVi: "Tư vấn pháp lý toàn trình cho dự án sản xuất công nghiệp nặng quy mô lớn: từ thẩm định pháp lý đất đai khu công nghiệp, xin chấp thuận chủ trương đầu tư, giấy chứng nhận đăng ký đầu tư (IRC), đăng ký doanh nghiệp (ERC) đến hoàn tất các thủ tục môi trường, PCCC và đưa nhà máy vào vận hành.",
      descZh: "为中国大型重型轮胎制造项目提供自园区尽调、土地租赁、ODI备案、越南外资准入审批（IRC/ERC）至环评消防合规的全周期涉外法律支持。",
      contractImg: "/images/projects/hop-dong-du-an-tien-tien-lop-xe-1.png",
      tagVi: "Đầu tư sản xuất FDI",
      tagZh: "重大实体制造",
    },
    {
      id: 2,
      titleVi: "M&A thâu tóm 100% cổ phần Công ty Cổ phần HANPO Việt Nam",
      titleZh: "力浚（越南）精密五金收购越南HANPO股份公司100%股权项目",
      clientVi: "Công ty TNHH Sản phẩm Kim khí Chính xác Lực Tuấn (Cám Châu Lực Tuấn)",
      clientZh: "赣州力俊科技有限公司 / 力浚精密",
      descVi: "Thẩm định pháp lý chuyên sâu (Legal Due Diligence), đàm phán hợp đồng chuyển nhượng cổ phần xuyên biên giới, xử lý cơ cấu sở hữu tài sản đất đai và giấy phép kinh doanh, chuyển đổi đăng ký cổ đông chiến lược an toàn tuyệt đối.",
      descZh: "开展全面法律尽职调查，草拟并谈判双语股权收购协议，办理越南投资部外资收购股权核准与股东变更登记，妥善规避历史债务隐患。",
      contractImg: "/images/projects/hop-dong-m-and-a-hanpo-viet-nam.png",
      tagVi: "Mua bán & Sáp nhập (M&A)",
      tagZh: "全资股权收购",
    },
    {
      id: 3,
      titleVi: "Thành lập Công ty TNHH Công nghệ Sinh học Ưu Việt Kim Vũ tại VN",
      titleZh: "金宇保灵在越投资设立优越金宇生物科技有限公司专项服务",
      clientVi: "Công ty TNHH Dược phẩm Sinh học Kim Vũ Bảo Linh (Hồng Kông)",
      clientZh: "金宇生物科技（香港）有限公司",
      descVi: "Tư vấn đầu tư dự án công nghệ cao trong lĩnh vực dược sinh học thú y, đáp ứng nghiêm ngặt các tiêu chuẩn kiểm định chuyên ngành, quy định chuyển giao công nghệ và cơ chế vốn FDI.",
      descZh: "协助中国头部生物疫苗企业落户越南，完成高科技农业及医药类外资准入审批、跨境资本金账户合规设立及行业资质备案。",
      contractImg: "/images/projects/hop-dong-duoc-pham-jinyu-hong-kong.png",
      tagVi: "Dược sinh học & Công nghệ cao",
      tagZh: "生物制药与高科技",
    },
    {
      id: 4,
      titleVi: "Thành lập chi nhánh và nhà xưởng Công nghệ Mox Ningbo tại Việt Nam",
      titleZh: "宁波摩克斯科技有限公司投资设立越南分支机构与生产基地",
      clientVi: "Công ty TNHH Công nghệ Mox Ningbo",
      clientZh: "宁波摩克斯科技有限公司",
      descVi: "Hỗ trợ doanh nghiệp cơ khí chính xác mở rộng chuỗi cung ứng sang Việt Nam, giải quyết các vướng mắc về xuất xứ hàng hóa RCEP và tuân thủ thuế.",
      descZh: "助力长三角精密制造供应链出海落地，保障跨境资本出境备案与越南实体设立无缝衔接，优化关税及原产地合规架构。",
      contractImg: "/images/projects/hop-dong-ningbo-mox-tech.png",
      tagVi: "Chuỗi cung ứng chế tạo",
      tagZh: "制造供应链布局",
    },
    {
      id: 5,
      titleVi: "Thành lập Công ty TNHH Thương mại Quốc tế ZMX Việt Nam",
      titleZh: "香港ZMX进出口贸易在越设立商贸与供应链物流实体项目",
      clientVi: "Công ty TNHH Thương mại Xuất nhập khẩu ZMX Hồng Kông",
      clientZh: "香港ZMX进出口贸易有限责任公司",
      descVi: "Xử lý thủ tục cấp phép phân phối bán buôn, bán lẻ, quyền xuất nhập khẩu và xây dựng hệ thống hợp đồng thương mại song ngữ chuẩn hóa.",
      descZh: "协助跨境进出口商贸主体设立越南全资商贸公司，申请进出口权与分销零售资质，起草合规双语贸易主协议。",
      contractImg: "/images/projects/hop-dong-zmx-trading-viet-nam.png",
      tagVi: "Thương mại & Xuất nhập khẩu",
      tagZh: "国际贸易合规",
    },
  ];

  return (
    <div className="bg-[#fbf9f4] text-[#121c2d] font-sans">
      
      {/* 1. Bar Thống kê Nổi bật (KPIs Banner) */}
      <div className="max-w-[1180px] mx-auto px-4 sm:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 bg-[#0b1d3f] border-t-4 border-t-[#c29a45] shadow-2xl divide-x divide-y lg:divide-y-0 divide-[#1c2f58]">
          {STATS.map((s, idx) => (
            <div key={idx} className="p-6 sm:p-7 text-center">
              <span className="block font-serif font-bold text-3xl sm:text-4xl text-[#f0d28a] mb-1">
                {s.num}
              </span>
              <span className="text-xs sm:text-[13px] text-[#b6c0d6] font-medium leading-snug">
                {isZh ? s.zh : s.vi}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Slogan & Triết lý Tên gọi "Vạn Ích" */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          
          {/* Slogan Banner */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-[#a3171e] text-white font-chinese text-xs tracking-[3px] uppercase px-4 py-1.5 mb-3 shadow-sm">
              {isZh ? "官方口号 · 核心宗旨" : "Slogan chính thức · Khẩu hiệu hành động"}
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0b1d3f] leading-tight mb-4">
              {isZh ? "链接中越 · 法律护航" : "Kết nối Việt‑Trung, đồng hành pháp lý vững chắc"}
            </h2>
            <p className="text-sm sm:text-base text-[#62708d] leading-relaxed">
              {isZh
                ? "万益（河内）秉承中越两国双法域实战经验与东盟协同网络，为企业跨境投资落地、项目运营风控与商事争议解决提供全周期定制化法律保障。"
                : "Hãng luật Vạn Ích kết hợp am hiểu sâu sắc pháp luật thực định hai nước, năng lực ngôn ngữ song ngữ bản ngữ và mạng lưới chính phủ – doanh nghiệp để bảo vệ an toàn tối đa cho mọi dự án hợp tác."}
            </p>
          </div>

          {/* Nghĩa chữ Vạn - Chữ Ích (3 Boxes) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            <div className="bg-white border border-[#e2dbce] p-8 shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-chinese font-bold text-6xl text-[#c29a45] block mb-2 select-none">万</span>
                <b className="font-serif text-2xl text-[#0b1d3f] block mb-2">{isZh ? "万 · 包罗万象" : "Vạn · Muôn điều rộng lớn"}</b>
                <p className="text-xs sm:text-sm text-[#62708d] leading-relaxed">
                  {isZh
                    ? "代表着跨越众多产业赛道：制造业、基建、矿业、能源、高科技算力、现代农业与国际贸易。"
                    : "Mười nghìn, biểu trưng cho sự uyên thâm, bao quát đa dạng lĩnh vực kinh doanh, ngành nghề và các dạng giao dịch xuyên biên giới."}
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#a3171e] uppercase tracking-wider mt-6 pt-4 border-t border-[#f0ebe0]">
                {isZh ? "多元业务覆盖" : "Đa dạng ngành nghề"}
              </span>
            </div>

            <div className="bg-white border border-[#e2dbce] p-8 shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-chinese font-bold text-6xl text-[#a3171e] block mb-2 select-none">益</span>
                <b className="font-serif text-2xl text-[#0b1d3f] block mb-2">{isZh ? "益 · 互利共赢" : "Ích · Lợi ích bền vững"}</b>
                <p className="text-xs sm:text-sm text-[#62708d] leading-relaxed">
                  {isZh
                    ? "以客户合法权益为最终归宿，追求交易公平、合规稳健与中越双向投资的长期合作共赢。"
                    : "Lợi ích. Mục tiêu tối thượng của mọi tư vấn pháp lý là bảo toàn và phát triển lợi ích hợp pháp, dài hạn và bền vững của khách hàng."}
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#a3171e] uppercase tracking-wider mt-6 pt-4 border-t border-[#f0ebe0]">
                {isZh ? "客户利益至上" : "Quyền lợi khách hàng"}
              </span>
            </div>

            <div className="bg-gradient-to-br from-[#0b1d3f] to-[#16336a] text-white border-t-4 border-t-[#c29a45] p-8 shadow-xl flex flex-col justify-between">
              <div>
                <span className="font-chinese font-bold text-6xl text-[#f0d28a] block mb-2 select-none">万益</span>
                <b className="font-serif text-2xl text-white block mb-2">{isZh ? "万益 · 护航东盟" : "Vạn Ích · Cầu nối pháp lý"}</b>
                <p className="text-xs sm:text-sm text-[#b6c0d6] leading-relaxed">
                  {isZh
                    ? "立足广西沿边口岸枢纽，扎根越南首都政务中心，构筑链接中越两国最高效的跨境涉外法治金桥。"
                    : "Tên gọi là lời cam kết nhất quán: Mỗi vụ việc đảm nhận phải đem lại lợi ích thiết thực, an tâm và hiệu quả cho đối tác hai nước."}
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#f0d28a] uppercase tracking-wider mt-6 pt-4 border-t border-white/20">
                {isZh ? "中越跨境专业品牌" : "Cầu nối Việt – Trung"}
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Section Tư Cách Pháp Nhân & Giấy Phép Bộ Tư Pháp Việt Nam */}
      <section className="py-16 lg:py-24 bg-white border-y border-[#e2dbce]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[#a3171e] text-xs font-bold tracking-[3px] uppercase mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>{isZh ? "资质认证 · 合规展业" : "Tư cách pháp lý chính thức"}</span>
              </div>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0b1d3f]">
                {isZh ? "经越南司法部批准设立的合法外国律师分所" : "Chi nhánh được Bộ Tư pháp Việt Nam cấp phép chính thức"}
              </h2>
              <p className="text-[#62708d] text-sm sm:text-base mt-3 leading-relaxed">
                {isZh
                  ? "广西万益（河内）办公室依规在中国司法部备案，并于2026年7月经越南司法部正式批准更名并迁址首都河内，是合法在越南全境提供国际商事法律服务的代表机构。"
                  : "Văn phòng Luật sư Vạn Ích (Hà Nội) tuân thủ đầy đủ quy trình đăng ký tại Bộ Tư pháp Trung Quốc và được Bộ Tư pháp nước CHXHCN Việt Nam cấp phép hoạt động chính thức (tháng 07/2026), có mã số thuế và đăng ký hoạt động minh bạch."}
              </p>
            </div>

            {/* Quick Badge */}
            <div className="bg-[#fbf9f4] border border-[#e2dbce] border-l-4 border-l-[#a3171e] p-5 shrink-0 max-w-sm">
              <span className="text-[11px] font-bold text-[#a3171e] uppercase tracking-wider block mb-1">
                {isZh ? "官方批准备案" : "Phê duyệt & Giám sát"}
              </span>
              <p className="text-xs text-[#27324a] font-medium leading-relaxed m-0">
                {isZh
                  ? "主管机关：越南司法部 · 河内市司法厅 · 中国司法部境外分支备案"
                  : "Cơ quan cấp phép: Bộ Tư pháp Việt Nam · Quản lý địa bàn: Sở Tư pháp TP. Hà Nội."}
              </p>
            </div>
          </div>

          {/* Lưới trưng bày 4 Giấy phép thực tế */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Giấy phép 1: Giấy phép Bộ Tư pháp VP Hà Nội */}
            <div
              onClick={() => setLightboxImg({ src: LICENSE_ASSETS.boTuPhapHanoi.main, title: "Giấy phép thành lập Chi nhánh Hà Nội do Bộ Tư pháp Việt Nam cấp" })}
              className="bg-[#fbf9f4] border border-[#e2dbce] p-4 group cursor-pointer hover:border-[#c29a45] hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-white border border-[#e2dbce] mb-3">
                <Image
                  src={LICENSE_ASSETS.boTuPhapHanoi.main}
                  alt="Giấy phép Bộ Tư pháp"
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform"
                />
                <span className="absolute right-2 top-2 bg-[#0b1d3f]/80 text-white p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <b className="text-xs font-serif font-bold text-[#0b1d3f] block group-hover:text-[#a3171e] transition-colors line-clamp-1">
                  {isZh ? "越南司法部批设许可" : "Giấy phép Bộ Tư pháp VN"}
                </b>
                <span className="text-[11px] text-[#8a96a3]">
                  {isZh ? "分所设立与执业批文" : "Quyết định thành lập chi nhánh"}
                </span>
              </div>
            </div>

            {/* Giấy phép 2: Đăng ký thuế */}
            <div
              onClick={() => setLightboxImg({ src: LICENSE_ASSETS.boTuPhapHanoi.tax, title: "Giấy chứng nhận đăng ký thuế Văn phòng Vạn Ích Hà Nội" })}
              className="bg-[#fbf9f4] border border-[#e2dbce] p-4 group cursor-pointer hover:border-[#c29a45] hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-white border border-[#e2dbce] mb-3">
                <Image
                  src={LICENSE_ASSETS.boTuPhapHanoi.tax}
                  alt="Đăng ký thuế"
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform"
                />
                <span className="absolute right-2 top-2 bg-[#0b1d3f]/80 text-white p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <b className="text-xs font-serif font-bold text-[#0b1d3f] block group-hover:text-[#a3171e] transition-colors line-clamp-1">
                  {isZh ? "越南税务登记证" : "Đăng ký thuế tại Việt Nam"}
                </b>
                <span className="text-[11px] text-[#8a96a3]">
                  {isZh ? "合法纳税与财政代码" : "Mã số thuế doanh nghiệp"}
                </span>
              </div>
            </div>

            {/* Giấy phép 3: Giấy phép hành nghề LS Liễu Ái tại VN */}
            <div
              onClick={() => setLightboxImg({ src: "/images/licenses/giay-phep-vietnam-lieu-ai-1.png", title: "Giấy phép hành nghề luật sư tại Việt Nam của LS. Liễu Ái" })}
              className="bg-[#fbf9f4] border border-[#e2dbce] p-4 group cursor-pointer hover:border-[#c29a45] hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-white border border-[#e2dbce] mb-3">
                <Image
                  src="/images/licenses/giay-phep-vietnam-lieu-ai-1.png"
                  alt="Giấy phép hành nghề LS Liễu Ái"
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform"
                />
                <span className="absolute right-2 top-2 bg-[#0b1d3f]/80 text-white p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <b className="text-xs font-serif font-bold text-[#0b1d3f] block group-hover:text-[#a3171e] transition-colors line-clamp-1">
                  {isZh ? "柳爱律师越南执业证" : "Giấy phép hành nghề LS. Liễu Ái"}
                </b>
                <span className="text-[11px] text-[#8a96a3]">
                  {isZh ? "司法部批准在越执业" : "Cấp phép hành nghề tại VN"}
                </span>
              </div>
            </div>

            {/* Giấy phép 4: Giấy phép LS Lăng Thần */}
            <div
              onClick={() => setLightboxImg({ src: "/images/licenses/giay-phep-hanh-nghe-lang-than-1.png", title: "Chứng chỉ & Giấy phép hành nghề của Giám đốc LS. Lăng Thần" })}
              className="bg-[#fbf9f4] border border-[#e2dbce] p-4 group cursor-pointer hover:border-[#c29a45] hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-white border border-[#e2dbce] mb-3">
                <Image
                  src="/images/licenses/giay-phep-hanh-nghe-lang-than-1.png"
                  alt="Giấy phép LS Lăng Thần"
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform"
                />
                <span className="absolute right-2 top-2 bg-[#0b1d3f]/80 text-white p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <b className="text-xs font-serif font-bold text-[#0b1d3f] block group-hover:text-[#a3171e] transition-colors line-clamp-1">
                  {isZh ? "凌晨主任执业资质" : "Giấy phép LS. Lăng Thần"}
                </b>
                <span className="text-[11px] text-[#8a96a3]">
                  {isZh ? "执业证与越南业务准入" : "Luật sư & Trưởng văn phòng"}
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Section Đội Ngũ 7 Chuyên Gia Pháp Lý Thực Chiến (Ảnh Thật) */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#a3171e] font-chinese text-xs font-bold tracking-[3px] uppercase block mb-1">
              专业团队 · 领衔主办
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0b1d3f] mb-3">
              {isZh ? "核心涉外实操律师与专家团队" : "Đội ngũ chuyên gia pháp lý thực chiến hàng đầu"}
            </h2>
            <p className="text-[#62708d] text-sm sm:text-base leading-relaxed">
              {isZh
                ? "中方涉外律师与越南本土持证律师无缝协同，博士、教授与实战骨干全程主办，拒绝层层转包。"
                : "Sự kết hợp ăn ý giữa luật sư Trung Quốc được cấp phép tại Việt Nam, giáo sư tiến sĩ luật đầu ngành và luật sư bản ngữ dày dạn kinh nghiệm thực tế."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {KEY_EXPERTS.map((lawyer, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#e2dbce] flex flex-col hover:border-[#c29a45] hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-[4/3] relative overflow-hidden bg-[#0b1d3f] border-b-2 border-b-[#c29a45]">
                  <Image
                    src={lawyer.img}
                    alt={lawyer.nameVi}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute left-3 top-3 bg-[#a3171e] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 z-10 shadow">
                    {isZh ? lawyer.tagZh : lawyer.tag}
                  </span>
                </div>

                {/* Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <h3 className="font-serif text-xl font-bold text-[#0b1d3f] group-hover:text-[#a3171e] transition-colors">
                        {isZh ? lawyer.nameZh : lawyer.nameVi}
                      </h3>
                      <span className="font-chinese text-xs text-[#a3171e] font-semibold">
                        {isZh ? lawyer.nameVi : lawyer.nameZh}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-[#c29a45] mb-3 leading-normal">
                      {isZh ? lawyer.roleZh : lawyer.roleVi}
                    </p>

                    <p className="text-xs text-[#62708d] leading-relaxed line-clamp-4 mb-4">
                      {isZh ? lawyer.descZh : lawyer.descVi}
                    </p>
                  </div>

                  {lawyer.phone && (
                    <div className="pt-3 border-t border-[#f0ebe0] flex items-center justify-between text-xs text-[#a3171e] font-bold">
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        <span>Hotline: {lawyer.phone}</span>
                      </span>
                      <span className="text-[10px] text-[#8a96a3] font-normal uppercase">Zalo / WeChat</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Section 5 Đại Dự Án Case Studies Thực Tế */}
      <section className="py-16 lg:py-24 bg-white border-t border-[#e2dbce]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-[#a3171e] text-xs font-bold tracking-[3px] uppercase mb-2">
                <Briefcase className="w-4 h-4" />
                <span>{isZh ? "典型实绩 · 真实案例" : "Kinh nghiệm thực tiễn"}</span>
              </div>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0b1d3f]">
                {isZh ? "五大跨境重点投资与并购实战业绩" : "5 đại dự án tiêu biểu đã thực hiện tại Việt Nam"}
              </h2>
            </div>
            <p className="text-[#62708d] text-sm sm:text-base max-w-md">
              {isZh
                ? "涵盖重大实体制造业落户、外资全资并购、生物制药及国际商贸物流，具有完备的合同证明与实操背书。"
                : "Hồ sơ năng lực thực tế chứng minh năng lực xử lý các giao dịch phức tạp, quy mô hàng trăm triệu USD giữa Việt Nam và Trung Quốc."}
            </p>
          </div>

          <div className="space-y-6">
            {CASE_STUDIES.map((c) => (
              <div
                key={c.id}
                className="bg-[#fbf9f4] border border-[#e2dbce] p-6 sm:p-8 flex flex-col lg:flex-row items-start justify-between gap-6 hover:border-[#c29a45] hover:shadow-md transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-sans font-bold text-xs text-[#a3171e] tracking-wider uppercase">
                      Case #{c.id}
                    </span>
                    <span className="border border-[#c29a45] text-[#8e6d23] text-[10px] font-semibold px-2 py-0.5 tracking-wider uppercase">
                      {isZh ? c.tagZh : c.tagVi}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#0b1d3f] mb-2 leading-snug">
                    {isZh ? c.titleZh : c.titleVi}
                  </h3>

                  <div className="text-xs text-[#a3171e] font-semibold mb-3">
                    {isZh ? `委托主体：${c.clientZh}` : `Khách hàng: ${c.clientVi}`}
                  </div>

                  <p className="text-xs sm:text-sm text-[#62708d] leading-relaxed">
                    {isZh ? c.descZh : c.descVi}
                  </p>
                </div>

                {/* Contract Scan Thumbnail Preview */}
                <div
                  onClick={() => setLightboxImg({ src: c.contractImg, title: isZh ? c.titleZh : c.titleVi })}
                  className="w-full sm:w-64 h-36 shrink-0 relative overflow-hidden bg-white border border-[#e2dbce] group cursor-pointer shadow-sm hover:border-[#a3171e]"
                >
                  <Image
                    src={c.contractImg}
                    alt={c.titleVi}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-[#0b1d3f]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5">
                    <Eye className="w-4 h-4" />
                    <span>{isZh ? "查看合同证明" : "Xem hợp đồng"}</span>
                  </div>
                  <span className="absolute bottom-2 left-2 bg-[#0b1d3f]/90 text-white text-[9px] font-semibold px-2 py-0.5">
                    {isZh ? "合同材料" : "Hồ sơ dự án"}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Section Bằng Khen & Danh Hiệu Cấp Quốc Gia */}
      <section className="py-16 lg:py-24 border-t border-[#e2dbce]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#a3171e] font-chinese text-xs font-bold tracking-[3px] uppercase block mb-1">
              荣誉表彰 · 国家认可
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#0b1d3f] mb-3">
              {isZh ? "国家级与行业权威荣誉表彰" : "Bằng khen & Thành tựu tiêu biểu toàn quốc"}
            </h2>
            <p className="text-xs sm:text-sm text-[#62708d]">
              {isZh
                ? "十余次荣获全国文明委、中央组织部、司法部、中华全国律师协会表彰，铸就值得信赖的品牌商誉。"
                : "Hơn 10 lần vinh dự đón nhận bằng khen và huân chương của Ủy ban Văn minh Trung ương, Ban Tổ chức Trung ương, Bộ Tư pháp và Hiệp hội Luật sư toàn quốc."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AWARD_ASSETS.map((award, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxImg({ src: award.src, title: isZh ? award.titleZh : award.title })}
                className="bg-white border border-[#e2dbce] p-5 cursor-pointer hover:border-[#c29a45] hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-[#fbf9f4] border border-[#e2dbce] mb-3">
                  <Image
                    src={award.src}
                    alt={award.title}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute right-2 top-2 bg-[#0b1d3f]/80 text-white p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h4 className="font-serif text-sm font-bold text-[#0b1d3f] group-hover:text-[#a3171e] transition-colors line-clamp-2">
                  {isZh ? award.titleZh : award.title}
                </h4>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Section Trụ Sở & Thông Tin Liên Hệ Thực Tế */}
      <section className="bg-white py-16 lg:py-24 border-t border-[#e2dbce]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Văn phòng Hà Nội (Thực tế) */}
            <div className="bg-[#fbf9f4] border-2 border-[#0b1d3f] p-8 sm:p-10 relative shadow-lg">
              <span className="inline-block bg-[#0b1d3f] text-[#f0d28a] text-[11px] font-bold uppercase tracking-widest px-3 py-1 mb-4">
                {isZh ? "越南本土政务枢纽" : "Văn phòng đại diện tại Hà Nội"}
              </span>

              <h3 className="font-serif text-3xl font-bold text-[#0b1d3f] mb-3">
                {isZh ? "广西万益（河内）律师事务所" : "Văn phòng Luật sư Vạn Ích (Hà Nội)"}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#27324a] mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#a3171e] shrink-0 mt-0.5" />
                  <div>
                    <b className="block text-[#0b1d3f] mb-0.5">{isZh ? "正式办公地址：" : "Địa chỉ chính thức:"}</b>
                    <span>Số 17, Đường 23, Khu biệt thự liền kề KĐT Thành phố Giao Lưu, Cổ Nhuế 1, Bắc Từ Liêm, TP. Hà Nội</span>
                    <p className="text-[11px] text-[#8a96a3] m-0 mt-0.5 italic">
                      {isZh
                        ? "河内市交流城都市区联排别墅区23路17号（公安部附近，从范文同大道右转进入）"
                        : "(Rẽ phải từ Đại lộ Phạm Văn Đồng vào, gần trụ sở Bộ Công An)"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#a3171e] shrink-0" />
                  <div>
                    <b className="text-[#0b1d3f]">{isZh ? "联络主任：" : "Người phụ trách: "}</b>
                    <span>Luật sư Tưởng Nữ Trinh (蒋女贞) · </span>
                    <a href="tel:15277020681" className="text-[#a3171e] font-bold hover:underline">
                      15277020681
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#a3171e] shrink-0" />
                  <div>
                    <b className="text-[#0b1d3f]">Email: </b>
                    <a href="mailto:lienhe@vanichlaw.vn" className="text-[#0b1d3f] hover:text-[#a3171e]">
                      lienhe@vanichlaw.vn
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 flex-wrap">
                <Link
                  href={`/${lang}#lienhe`}
                  className="bg-gradient-to-b from-[#c4252c] to-[#8f1218] text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 shadow hover:brightness-110 transition-all"
                >
                  {isZh ? "预约河内面谈" : "Đặt lịch tư vấn tại Hà Nội"}
                </Link>
                <Link
                  href={`/${lang}/offices`}
                  className="border border-[#0b1d3f] text-[#0b1d3f] hover:bg-[#0b1d3f] hover:text-[#f0d28a] text-xs font-semibold uppercase tracking-wider px-6 py-3 transition-all"
                >
                  {isZh ? "查看各地办公室" : "Hệ thống văn phòng"}
                </Link>
              </div>
            </div>

            {/* Trụ sở Tổng sở Nam Ninh & Ảnh */}
            <div className="space-y-6">
              <div className="relative aspect-[16/10] overflow-hidden border border-[#e2dbce] shadow-md bg-[#0b1d3f]">
                <Image
                  src={OFFICE_ASSETS.headquarter}
                  alt="Trụ sở Cửu Châu Quốc Tế Nam Ninh"
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 bg-[#0b1d3f]/90 text-[#f0d28a] text-xs font-semibold px-3 py-1">
                  {isZh ? "中国总所 · 南宁九洲国际大厦27层" : "Trụ sở chính · Tầng 27 Tòa nhà Cửu Châu Quốc Tế (Nam Ninh)"}
                </span>
              </div>

              <div className="bg-[#fbf9f4] border border-[#e2dbce] p-6">
                <h4 className="font-serif font-bold text-lg text-[#0b1d3f] mb-1">
                  {isZh ? "广西万益律师事务所（总所）" : "Hãng luật Vạn Ích (Tổng sở Nam Ninh)"}
                </h4>
                <p className="text-xs text-[#62708d] mb-3 leading-relaxed">
                  {isZh
                    ? "注册地址：南宁市青秀区中新路9号九洲国际27层 · 拥有9,000余平方米自有产权办公空间"
                    : "Địa chỉ: Tầng 27 Tòa nhà Cửu Châu Quốc Tế, Số 9 Đường Trung Tân, Quận Thanh Tú, TP. Nam Ninh, Quảng Tây."}
                </p>
                <div className="flex items-center gap-2 text-xs text-[#a3171e] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#a3171e]" />
                  <span>{isZh ? "连通新加坡、马来西亚吉隆坡与越南全国服务网络" : "Kết nối mạng lưới Singapore, Malaysia và toàn diện Việt Nam"}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Lightbox Modal phóng to ảnh scan */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white max-w-4xl max-h-[90vh] w-full p-4 border border-[#c29a45] shadow-2xl relative flex flex-col"
          >
            <div className="flex justify-between items-center pb-2 mb-2 border-b border-[#e2dbce]">
              <h3 className="font-serif font-bold text-base text-[#0b1d3f] truncate">
                {lightboxImg.title}
              </h3>
              <button
                type="button"
                onClick={() => setLightboxImg(null)}
                className="text-gray-400 hover:text-gray-800 p-1"
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
