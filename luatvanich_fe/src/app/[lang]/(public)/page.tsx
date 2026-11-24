"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { SealStamp } from "@/components/ui/seal-stamp";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { MarqueeTicker } from "@/components/ui/marquee-ticker";

// 1. Dữ liệu Lĩnh vực & Tabs
const TABS_DATA = [
  {
    hanzi: "外商投资",
    title: "Đầu tư nước ngoài",
    desc: "Đồng hành cùng nhà đầu tư từ khâu xin chủ trương đến khi doanh nghiệp đi vào hoạt động.",
    points: [
      "Giấy chứng nhận đăng ký đầu tư (IRC)",
      "Thành lập và đăng ký doanh nghiệp (ERC)",
      "Cơ cấu vốn, chuyển lợi nhuận về nước hợp pháp",
      "Tuân thủ sau cấp phép & báo cáo định kỳ",
    ],
    time: "30 – 60 ngày",
    fee: "Trọn gói",
  },
  {
    hanzi: "双语合同",
    title: "Hợp đồng song ngữ",
    desc: "Soạn thảo và đối chiếu hợp đồng để hai bản Việt – Trung cùng một nghĩa và chuẩn xác pháp lý.",
    points: [
      "Soạn thảo hợp đồng thương mại & đầu tư",
      "Đối chiếu từng điều khoản hai bản Việt – Trung",
      "Quy định điều khoản ngôn ngữ ưu tiên",
      "Phụ lục sửa đổi, bổ sung & thỏa thuận bảo mật",
    ],
    time: "3 – 7 ngày",
    fee: "Theo hợp đồng",
  },
  {
    hanzi: "诉讼仲裁",
    title: "Tranh tụng & trọng tài",
    desc: "Đại diện tại Tòa án và các trung tâm trọng tài thương mại trong nước (VIAC) và quốc tế.",
    points: [
      "Đánh giá chứng cứ và khả năng thắng kiện",
      "Chuẩn bị đơn khởi kiện, bảo vệ quyền lợi hợp pháp",
      "Áp dụng biện pháp khẩn cấp tạm thời",
      "Thi hành bản án, phán quyết trọng tài có hiệu lực",
    ],
    time: "Theo vụ việc",
    fee: "Theo giờ / trọn gói",
  },
  {
    hanzi: "债务追收",
    title: "Thu hồi nợ",
    desc: "Kết hợp đàm phán, thông báo pháp lý và khởi kiện để thu hồi công nợ thương mại xuyên biên giới.",
    points: [
      "Rà soát chứng từ, đối chiếu công nợ",
      "Thư yêu cầu thanh toán chính thức (Thư luật sư)",
      "Thương lượng phương án trả nợ theo đợt",
      "Khởi kiện và thi hành án kê biên tài sản",
    ],
    time: "2 – 6 tháng",
    fee: "Theo kết quả",
  },
  {
    hanzi: "劳动用工",
    title: "Lao động & nhân sự",
    desc: "Xây dựng quy chế lao động và xử lý vấn đề nhân sự có yếu tố nước ngoài đúng luật Việt Nam.",
    points: [
      "Hợp đồng và nội quy lao động song ngữ",
      "Giấy phép lao động cho chuyên gia nước ngoài",
      "Kỷ luật, chấm dứt hợp đồng lao động",
      "Giải quyết tranh chấp lao động tập thể & cá nhân",
    ],
    time: "1 – 4 tuần",
    fee: "Theo giờ",
  },
  {
    hanzi: "并购重组",
    title: "Mua bán & sáp nhập",
    desc: "Thẩm định pháp lý và đàm phán để giao dịch hoàn tất an toàn, đúng luật và tối ưu thuế.",
    points: [
      "Thẩm định pháp lý doanh nghiệp mục tiêu (Due Diligence)",
      "Soạn thảo và đàm phán hợp đồng M&A",
      "Thủ tục chuyển nhượng vốn, cổ phần & thay đổi ĐKKD",
      "Hỗ trợ tái cấu trúc sau giao dịch",
    ],
    time: "2 – 6 tháng",
    fee: "Trọn gói",
  },
];

// 2. Dữ liệu 6 Dịch vụ tiêu biểu
const FEATURED_SERVICES = [
  {
    hz: "投",
    title: "Đầu tư nước ngoài",
    desc: "Đồng hành nhà đầu tư từ xin chủ trương đến khi doanh nghiệp đi vào hoạt động.",
    tabIndex: 0,
  },
  {
    hz: "约",
    title: "Hợp đồng song ngữ",
    desc: "Soạn thảo và đối chiếu hợp đồng để bản Việt và bản Trung cùng một nghĩa.",
    tabIndex: 1,
  },
  {
    hz: "诉",
    title: "Tranh tụng & trọng tài",
    desc: "Đại diện tại Tòa án và trọng tài thương mại, bảo vệ quyền lợi khách hàng.",
    tabIndex: 2,
  },
  {
    hz: "债",
    title: "Thu hồi nợ",
    desc: "Kết hợp đàm phán, thông báo pháp lý và khởi kiện để thu hồi công nợ.",
    tabIndex: 3,
  },
  {
    hz: "劳",
    title: "Lao động & nhân sự",
    desc: "Quy chế lao động, giấy phép cho chuyên gia và xử lý tranh chấp lao động.",
    tabIndex: 4,
  },
  {
    hz: "并",
    title: "Mua bán & sáp nhập",
    desc: "Thẩm định, đàm phán và hoàn tất giao dịch M&A an toàn, đúng luật.",
    tabIndex: 5,
  },
];

// 3. Dữ liệu Từ điển pháp lý
const GLOSSARY_TERMS = [
  { vi: "Hợp đồng", zh: "合同", pinyin: "hétong", note: "Ghi rõ tên pháp nhân đầy đủ ở cả hai bản." },
  { vi: "Đầu tư", zh: "投资", pinyin: "tóuzī", note: "Phân biệt đầu tư trực tiếp và gián tiếp." },
  { vi: "Thanh toán", zh: "付款", pinyin: "fùkuǎn", note: "Nêu rõ tiền tệ, thời hạn và phương thức." },
  { vi: "Phạt vi phạm", zh: "违约金", pinyin: "wéiyuējīn", note: "Mức phạt có trần theo luật Việt Nam (tối đa 8%)." },
  { vi: "Bất khả kháng", zh: "不可抗力", pinyin: "bùkě kànglì", note: "Quy định rõ các sự kiện, thời hạn gửi thông báo." },
  { vi: "Trọng tài", zh: "仲裁", pinyin: "zhòngcái", note: "Chọn trung tâm trọng tài và luật áp dụng rõ ràng." },
  { vi: "Chủ sở hữu hưởng lợi", zh: "实益所有人", pinyin: "shíyì suǒyǒurén", note: "Chú ý nghĩa vụ kê khai thông tin theo quy định mới." },
  { vi: "Giấy phép lao động", zh: "工作许可", pinyin: "gōngzuò xǔkě", note: "Kiểm tra điều kiện bằng cấp, kinh nghiệm từng vị trí." },
];

// 4. Dữ liệu Đội ngũ Luật sư
const LAWYERS_DATA = [
  {
    name: "Nguyễn Minh Hoàng",
    role: "Luật sư điều hành",
    langs: ["VI", "中文", "EN"],
    field: "Đầu tư nước ngoài, M&A",
    hairIndex: 0,
    isMale: 1,
  },
  {
    name: "Trần Thu Hà",
    role: "Luật sư thành viên",
    langs: ["VI", "中文"],
    field: "Hợp đồng song ngữ",
    hairIndex: 1,
    isMale: 0,
  },
  {
    name: "Lê Quốc Bảo",
    role: "Luật sư tranh tụng",
    langs: ["VI", "EN"],
    field: "Tranh tụng, trọng tài",
    hairIndex: 2,
    isMale: 1,
  },
  {
    name: "Phạm Ngọc Lan",
    role: "Chuyên viên pháp lý",
    langs: ["VI", "中文"],
    field: "Thu hồi nợ, lao động",
    hairIndex: 3,
    isMale: 0,
  },
  {
    name: "Đỗ Hồng Ngọc",
    role: "Luật sư",
    langs: ["VI", "中文"],
    field: "Doanh nghiệp, sở hữu trí tuệ",
    hairIndex: 0,
    isMale: 0,
  },
  {
    name: "Vũ Đức Anh",
    role: "Luật sư",
    langs: ["VI", "中文", "EN"],
    field: "M&A, thuế doanh nghiệp",
    hairIndex: 1,
    isMale: 1,
  },
];

const HAIR_COLORS = ["#1b1718", "#2a1c16", "#3a2a22", "#161214"];

// 5. Dữ liệu Góc nhìn / Bài viết
const INSIGHTS_DATA = [
  {
    hz: "债",
    tag: "Thu hồi nợ",
    title: "Mất tiền đặt cọc thuê nhà xưởng: sai lầm khi đặt cọc",
    desc: "Rủi ro lớn khi hợp đồng đặt cọc không rõ điều khoản hoàn trả tiền cọc nếu bên cho thuê không hoàn thiện pháp lý PCCC…",
    bg1: "#0a1a3a",
    bg2: "#25408a",
  },
  {
    hz: "投",
    tag: "Đầu tư",
    title: "Luật Đầu tư 2025: những thay đổi lớn với nhà đầu tư nước ngoài",
    desc: "Nhiều thay đổi đáng chú ý về điều kiện tiếp cận thị trường và đơn giản hóa thủ tục cấp IRC cho dự án công nghệ cao…",
    bg1: "#2a1a3a",
    bg2: "#7a2418",
  },
  {
    hz: "权",
    tag: "Doanh nghiệp",
    title: "Chủ sở hữu hưởng lợi: nghĩa vụ kê khai cần biết",
    desc: "Khái niệm chủ sở hữu hưởng lợi ngày càng được siết chặt trong các quy định phòng chống rửa tiền và cấp giấy phép kinh doanh…",
    bg1: "#16203a",
    bg2: "#3a2a22",
  },
  {
    hz: "封",
    tag: "Tố tụng",
    title: "Phong tỏa tài sản “con nợ”: khi nào được yêu cầu",
    desc: "Khi nào chủ nợ được yêu cầu Tòa án áp dụng biện pháp khẩn cấp tạm thời phong tỏa tài khoản ngân hàng và bất động sản…",
    bg1: "#06122b",
    bg2: "#122650",
  },
  {
    hz: "约",
    tag: "Hợp đồng",
    title: "Hợp đồng song ngữ Việt – Trung: điểm cần lưu ý",
    desc: "Xử lý khác biệt ngữ nghĩa và điều khoản ngôn ngữ áp dụng để tránh trường hợp tranh chấp phát sinh do bản dịch sai lệch…",
    bg1: "#2a1210",
    bg2: "#0a1a3a",
  },
];

// 6. Dữ liệu Đối tác
const PARTNERS_DATA = [
  { hz: "华", name: "Hoa Long" },
  { hz: "盛", name: "Thanh Sơn" },
  { hz: "东", name: "Đông Á Corp" },
  { hz: "瑞", name: "Rui Feng" },
  { hz: "联", name: "Liên Việt" },
  { hz: "通", name: "Tongda" },
  { hz: "港", name: "Hải Cảng" },
  { hz: "鑫", name: "Xin Tai" },
];

export default function PublicHomePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("top");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const lawyersRailRef = useRef<HTMLDivElement>(null);
  const insightsRailRef = useRef<HTMLDivElement>(null);

  const scrollRail = (ref: React.RefObject<HTMLDivElement | null>, direction: number) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction * ref.current.clientWidth * 0.8,
        behavior: "smooth",
      });
    }
  };

  const filteredGlossary = GLOSSARY_TERMS.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.vi.toLowerCase().includes(q) ||
      item.zh.toLowerCase().includes(q) ||
      item.pinyin.toLowerCase().includes(q) ||
      item.note.toLowerCase().includes(q)
    );
  });

  const handleServiceClick = (tabIdx: number) => {
    setActiveTab(tabIdx);
    const element = document.getElementById("linhvuc");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    e.currentTarget.reset();
  };

  useEffect(() => {
    const sectionIds = ["top", "linhvuc", "thuatngu", "quytrinh", "doingu", "gocnhin", "lienhe"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id || "top");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative font-sans text-slate-900 bg-white selection:bg-[#c29a45]/30">
      {/* 1. THANH RAIL CỐ ĐỊNH BÊN TRÁI (Desktop) */}
      <aside className="fixed left-0 top-0 bottom-0 w-[84px] bg-[#06122b] hidden xl:flex flex-col items-center justify-between py-6 z-40 border-r border-[#c29a45]/35 select-none">
        <a href="#top" aria-label="Luật Vạn Ích">
          <SealStamp char="万" size="md" variant="gold" />
        </a>
        <nav className="flex flex-col gap-5 items-center">
          {[
            { id: "linhvuc", num: "01", label: "Lĩnh vực" },
            { id: "thuatngu", num: "02", label: "Thuật ngữ" },
            { id: "quytrinh", num: "03", label: "Quy trình" },
            { id: "doingu", num: "04", label: "Đội ngũ" },
            { id: "gocnhin", num: "05", label: "Góc nhìn" },
            { id: "lienhe", num: "06", label: "Liên hệ" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex flex-col items-center gap-1.5 text-[10.5px] font-sans font-medium tracking-wider transition-colors ${
                activeSection === item.id ? "text-[#f0d28a]" : "text-[#7f8aa6] hover:text-[#f0d28a]"
              }`}
            >
              <i className={`font-royal font-bold text-sm not-italic ${activeSection === item.id ? "border-b-2 border-[#c29a45] pb-0.5" : ""}`}>
                {item.num}
              </i>
              <span className="[writing-mode:vertical-rl] tracking-[2px] uppercase">{item.label}</span>
            </a>
          ))}
        </nav>
        <a
          href="tel:0900123456"
          className="w-10 h-10 rounded bg-[#a3171e] text-white grid place-items-center text-base hover:scale-105 transition-transform"
          aria-label="Hotline"
        >
          ✆
        </a>
      </aside>

      {/* 2. HERO BANNER CHÍNH */}
      <section className="relative bg-gradient-to-br from-[#08111f] via-[#14243d] to-[#1d3556] text-white overflow-hidden" id="top">
        {/* Vector Kiến trúc Cao ốc Skyline */}
        <svg
          className="absolute left-0 right-0 bottom-0 w-full h-[140px] z-[1] opacity-50 pointer-events-none"
          viewBox="0 0 1400 140"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g fill="#17387a">
            <rect x="0" y="90" width="52" height="50" />
            <rect x="70" y="60" width="60" height="80" />
            <rect x="140" y="80" width="68" height="60" />
            <rect x="210" y="30" width="52" height="110" />
            <rect x="280" y="70" width="60" height="70" />
            <rect x="350" y="95" width="68" height="45" />
            <rect x="420" y="45" width="52" height="95" />
            <rect x="490" y="75" width="60" height="65" />
            <rect x="560" y="20" width="68" height="120" />
            <rect x="630" y="85" width="52" height="55" />
            <rect x="700" y="55" width="60" height="85" />
            <rect x="770" y="80" width="68" height="60" />
            <rect x="840" y="40" width="52" height="100" />
            <rect x="910" y="65" width="60" height="75" />
            <rect x="980" y="90" width="68" height="50" />
            <rect x="1050" y="50" width="52" height="90" />
            <rect x="1120" y="75" width="60" height="65" />
            <rect x="1190" y="25" width="68" height="115" />
            <rect x="1260" y="70" width="52" height="70" />
            <rect x="1330" y="85" width="60" height="55" />
            <rect x="997" y="14" width="6" height="126" />
            <circle cx="1000" cy="70" r="17" />
            <circle cx="1000" cy="36" r="10" />
            <rect x="990" y="92" width="20" height="48" />
            <g transform="translate(1240 20)">
              <path d="M0 40h90l-10 10H10z" />
              <path d="M12 22h66l-8 10H20z" />
              <path d="M24 6h42l-6 8H30z" />
              <rect x="43" y="-14" width="4" height="22" />
              <rect x="14" y="50" width="62" height="70" />
            </g>
          </g>
        </svg>

        {/* Chữ Hán chìm khổng lồ 万益 */}
        <div
          className="absolute -left-2 -bottom-16 font-hanzi font-bold text-[220px] lg:text-[340px] text-transparent select-none pointer-events-none z-[1] leading-none whitespace-nowrap"
          style={{ WebkitTextStroke: "1px rgba(194, 154, 69, 0.22)" }}
          aria-hidden="true"
        >
          万益
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-[2] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[660px] pt-16 pb-28">
          <div className="lg:col-span-7 space-y-6">
            <EyebrowBadge hz="万益律师" text="Luật Vạn Ích" variant="tag" />
            <h1 className="font-royal text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight">
              Hành lang pháp lý giữa{" "}
              <i className="not-italic bg-gradient-to-r from-[#f6dc98] via-[#c29a45] to-[#f6dc98] bg-clip-text text-transparent">
                Việt Nam
              </i>{" "}
              và Trung Quốc.
            </h1>
            <p className="text-sm sm:text-base text-[#b6c0d6] max-w-lg leading-relaxed">
              Văn phòng luật sư song ngữ đồng hành cùng doanh nghiệp đầu tư, ký kết và giải quyết tranh chấp xuyên biên giới, làm việc trực tiếp bằng cả hai ngôn ngữ.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <a className="btn-royal" href="#lienhe">
                Đặt lịch tư vấn &rarr;
              </a>
              <a
                className="font-medium text-sm border-b border-white hover:text-[#f0d28a] hover:border-[#f0d28a] transition-colors pb-0.5"
                href="#linhvuc"
              >
                Xem lĩnh vực
              </a>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-4 text-xs text-[#c9d3e8]">
              <li className="flex items-center gap-2">
                <span className="text-[#f0d28a] font-bold">&check;</span> Song ngữ Việt – 中文
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#f0d28a] font-bold">&check;</span> Bảo mật tuyệt đối
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#f0d28a] font-bold">&check;</span> Báo phí trước khi nhận vụ việc
              </li>
            </ul>
          </div>

          {/* Sơ đồ Bản đồ Hành lang Radar động */}
          <div className="lg:col-span-5 flex justify-center">
            <svg
              className="w-full max-w-[480px] h-auto drop-shadow-2xl"
              viewBox="0 0 520 560"
              role="img"
              aria-label="Sơ đồ hành lang pháp lý giữa Hà Nội, TP. Hồ Chí Minh, Quảng Châu, Thâm Quyến và Thượng Hải"
            >
              <defs>
                <pattern id="dot-pattern" width="18" height="18" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.2" fill="#2d4278" />
                </pattern>
              </defs>
              <rect width="520" height="560" fill="url(#dot-pattern)" opacity=".8" />

              {/* Đường chỉ vàng đứt nét chuyển động */}
              <g fill="none" stroke="#c9a24a" strokeWidth="1.6" className="[stroke-dasharray:5_7] animate-dash-flow">
                <path d="M170 470Q130 420 160 370" />
                <path d="M160 370Q170 280 285 250" />
                <path d="M285 250Q380 200 410 110" />
                <path d="M285 250Q300 270 312 292" />
                <path d="M160 370Q230 330 312 292" />
              </g>

              {/* Sóng xung kích Radar tại Hà Nội và Thượng Hải */}
              <g fill="#c9a24a">
                <circle className="animate-radar-pulse [transform-box:fill-box] [transform-origin:center]" cx="410" cy="110" r="5" />
                <circle className="animate-radar-pulse [transform-box:fill-box] [transform-origin:center]" cx="160" cy="370" r="5" />
              </g>

              {/* Điểm tọa độ các thành phố */}
              <g fill="#f0d28a">
                <circle cx="410" cy="110" r="6" />
                <circle cx="285" cy="250" r="6" />
                <circle cx="312" cy="292" r="5" />
                <circle cx="160" cy="370" r="6" />
                <circle cx="170" cy="470" r="6" />
              </g>

              {/* Nhãn tên Thành phố song ngữ */}
              <g className="font-sans text-[11.5px] fill-[#dbe3f5] font-medium">
                <text x="338" y="98">Thượng Hải</text>
                <text x="338" y="116" className="font-hanzi font-bold text-xs fill-[#f0d28a]">上海</text>
                <text x="214" y="238">Quảng Châu</text>
                <text x="214" y="256" className="font-hanzi font-bold text-xs fill-[#f0d28a]">广州</text>
                <text x="324" y="316">Thâm Quyến</text>
                <text x="324" y="334" className="font-hanzi font-bold text-xs fill-[#f0d28a]">深圳</text>
                <text x="64" y="362">Hà Nội</text>
                <text x="64" y="380" className="font-hanzi font-bold text-xs fill-[#f0d28a]">河内</text>
                <text x="186" y="476">TP. Hồ Chí Minh</text>
                <text x="186" y="494" className="font-hanzi font-bold text-xs fill-[#f0d28a]">胡志明市</text>
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* 3. DẢI TICKER THUẬT NGỮ CHẠY VÔ TẬN */}
      <MarqueeTicker />

      {/* 4. KHỐI CON SỐ THỐNG KÊ HOÀNG GIA */}
      <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-[#e7dcc3] bg-gradient-to-b from-[#fffdf8] to-[#fbf7ee]">
        {[
          { num: "12", hz: "年", label: "năm hành nghề" },
          { num: "1.200", hz: "案", label: "hồ sơ đã tiếp nhận" },
          { num: "15", hz: "团", label: "luật sư và chuyên viên" },
          { num: "5", hz: "城", label: "thành phố trong mạng lưới" },
        ].map((item, idx) => (
          <div key={idx} className="p-8 sm:p-10 border-r border-[#e7dcc3] last:border-r-0 relative">
            <span className="absolute right-6 top-5 font-hanzi font-bold text-4xl text-[#c29a45]/40 select-none">
              {item.hz}
            </span>
            <b className="block font-royal font-bold text-5xl sm:text-6xl text-transparent bg-gradient-to-b from-[#0b1d3f] to-[#16336a] bg-clip-text leading-none">
              {item.num}
              <span className="text-[#a3171e] text-[0.6em] align-super ml-1">+</span>
            </b>
            <span className="block mt-2 text-[#5b6174] text-xs sm:text-sm font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* 5. KHỐI 6 DỊCH VỤ TIÊU BIỂU */}
      <section className="py-24 bg-[#fbf7ee] relative overflow-hidden" id="dichvu">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
            <div>
              <EyebrowBadge hz="服务" text="Dịch vụ tiêu biểu" />
              <h2 className="heading-royal text-3xl sm:text-4xl lg:text-5xl mt-3">
                Sáu dịch vụ được tìm đến nhiều nhất
              </h2>
            </div>
            <p className="text-sm text-[#5b6174] m-0 leading-relaxed">
              Chọn một dịch vụ để xem chi tiết phạm vi công việc, thời gian và hình thức phí tương ứng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_SERVICES.map((sv, idx) => (
              <div
                key={idx}
                className="group relative bg-gradient-to-b from-white to-[#fffaf0] border border-[#e7dcc3] p-8 flex flex-col justify-between transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:border-[#c29a45]"
                onClick={() => handleServiceClick(sv.tabIndex)}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#c29a45] to-[#a3171e] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="w-11 h-11 bg-gradient-to-b from-[#c4252c] to-[#8f1218] text-white font-royal font-bold text-lg grid place-items-center shadow-[0_0_0_4px_#f4dedc]">
                      0{idx + 1}
                    </span>
                    <span className="font-hanzi font-bold text-5xl bg-gradient-to-br from-[#0b1d3f] to-[#3d5fae] bg-clip-text text-transparent select-none">
                      {sv.hz}
                    </span>
                  </div>
                  <h3 className="font-royal font-bold text-2xl uppercase text-[#0b1d3f] mb-3 tracking-wide">
                    {sv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5b6174] mb-6 leading-relaxed">
                    {sv.desc}
                  </p>
                </div>
                <span className="self-start border border-[#a3171e] text-[#a3171e] font-sans font-semibold text-xs px-4 py-2 transition-colors group-hover:bg-[#a3171e] group-hover:text-white">
                  Xem chi tiết &rarr;
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. KHỐI LĨNH VỰC CHUYÊN SÂU (TABS) */}
      <section className="py-24 bg-[#fffdf8] relative overflow-hidden" id="linhvuc">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
            <div>
              <EyebrowBadge hz="01" text="Lĩnh vực" />
              <h2 className="heading-royal text-3xl sm:text-4xl lg:text-5xl mt-3">
                Chọn đúng vấn đề, gặp đúng luật sư
              </h2>
            </div>
            <p className="text-sm text-[#5b6174] m-0 leading-relaxed">
              Mỗi lĩnh vực có luật sư phụ trách riêng, cùng quy trình và mốc thời gian được báo trước rõ ràng.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#e7dcc3] bg-white shadow-xl">
            {/* Cột trái: Tab list */}
            <div className="lg:col-span-4 border-r border-[#e7dcc3] flex lg:flex-col overflow-x-auto lg:overflow-visible">
              {TABS_DATA.map((tab, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`w-full flex justify-between items-center p-5 sm:p-6 text-left border-b border-[#e7dcc3] transition-colors font-sans text-xs sm:text-sm font-semibold whitespace-nowrap lg:whitespace-normal ${
                    activeTab === idx
                      ? "bg-gradient-to-r from-[#0b1d3f] to-[#16336a] text-white shadow-[inset_4px_0_0_#a3171e]"
                      : "text-[#0f1b33] hover:bg-[#fbf7ee]"
                  }`}
                  onClick={() => setActiveTab(idx)}
                >
                  <span>{tab.title}</span>
                  <span className={`font-hanzi font-bold text-base ${activeTab === idx ? "text-[#f0d28a]" : "text-[#c29a45]"}`}>
                    {tab.hanzi}
                  </span>
                </button>
              ))}
            </div>

            {/* Cột phải: Tab panel */}
            <div className="lg:col-span-8 p-8 sm:p-12 relative overflow-hidden bg-gradient-to-b from-white to-[#fffaf0]">
              <div className="absolute right-6 -bottom-10 font-hanzi font-bold text-[200px] text-[#0b1d3f]/5 select-none pointer-events-none">
                {TABS_DATA[activeTab].hanzi[0]}
              </div>
              <h3 className="font-royal font-bold text-3xl sm:text-4xl text-[#0b1d3f] mb-3">
                {TABS_DATA[activeTab].title}
              </h3>
              <p className="text-sm text-[#5b6174] max-w-lg mb-6 leading-relaxed">
                {TABS_DATA[activeTab].desc}
              </p>
              <ul className="space-y-3 mb-8 max-w-lg">
                {TABS_DATA[activeTab].points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#0f1b33]">
                    <span className="w-2 h-2 bg-[#a3171e] rotate-45 shrink-0 mt-1.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-10 pt-4 border-t border-[#e7dcc3]">
                <div>
                  <span className="text-[12px] text-[#5b6174] block">Thời gian</span>
                  <b className="font-semibold text-sm text-[#0f1b33]">
                    {TABS_DATA[activeTab].time}
                  </b>
                </div>
                <div>
                  <span className="text-[12px] text-[#5b6174] block">Hình thức phí</span>
                  <b className="font-semibold text-sm text-[#0f1b33]">
                    {TABS_DATA[activeTab].fee}
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. KHỐI TỪ ĐIỂN PHÁP LÝ VIỆT – TRUNG */}
      <section className="py-24 bg-[#fbf7ee] relative overflow-hidden" id="thuatngu">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
            <div>
              <EyebrowBadge hz="02" text="Thuật ngữ song ngữ" />
              <h2 className="heading-royal text-3xl sm:text-4xl lg:text-5xl mt-3">
                Từ điển pháp lý Việt – Trung
              </h2>
            </div>
            <p className="text-sm text-[#5b6174] m-0 leading-relaxed">
              Một chữ dịch lệch có thể làm đổi nghĩa cả điều khoản. Tra nhanh các thuật ngữ thường gặp trong hợp đồng kinh tế.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm thuật ngữ, ví dụ: phạt, 合同, tóuzī…"
              className="flex-1 max-w-md p-3.5 border border-[#e7dcc3] bg-white text-sm text-[#0f1b33] outline-none focus:border-[#a3171e] shadow-xs"
            />
            <small className="text-xs text-[#5b6174] font-medium">
              Tìm thấy {filteredGlossary.length} thuật ngữ phù hợp
            </small>
          </div>

          <div className="overflow-x-auto shadow-md border border-[#e7dcc3] bg-white">
            <table className="w-full border-collapse text-left">
              <thead className="bg-gradient-to-r from-[#0b1d3f] to-[#16336a] text-[#f0d28a] text-[11px] uppercase tracking-wider font-semibold border-b-2 border-[#a3171e]">
                <tr>
                  <th className="p-4 w-1/4">Tiếng Việt</th>
                  <th className="p-4 w-1/6">中文</th>
                  <th className="p-4 w-1/6">Pinyin</th>
                  <th className="p-4">Lưu ý khi soạn hợp đồng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7dcc3] text-xs sm:text-sm">
                {filteredGlossary.length > 0 ? (
                  filteredGlossary.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#fbf8ef] transition-colors odd:bg-white even:bg-[#fffaf0]">
                      <td className="p-4 font-royal font-bold text-lg text-[#0f1b33]">{row.vi}</td>
                      <td className="p-4 font-hanzi font-bold text-xl text-[#0b1d3f]">{row.zh}</td>
                      <td className="p-4 font-sans italic text-[#a3171e] text-xs sm:text-sm">{row.pinyin}</td>
                      <td className="p-4 text-[#5b6174] leading-relaxed">{row.note}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-sm text-[#5b6174]">
                      Không tìm thấy thuật ngữ phù hợp với từ khóa &ldquo;{searchQuery}&rdquo;.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 8. KHỐI QUY TRÌNH THỤ LÝ 4 BƯỚC */}
      <section className="py-24 bg-[#fffdf8] relative overflow-hidden" id="quytrinh">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
            <div>
              <EyebrowBadge hz="03" text="Quy trình" />
              <h2 className="heading-royal text-3xl sm:text-4xl lg:text-5xl mt-3">
                Một vụ việc diễn ra như thế nào
              </h2>
            </div>
            <p className="text-sm text-[#5b6174] m-0 leading-relaxed">
              Mọi bước đều có văn bản và thời hạn rõ ràng để doanh nghiệp dễ dàng theo dõi tiến độ.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto pl-8 sm:pl-0">
            <div className="absolute left-8 sm:left-[150px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#c29a45] via-[#a3171e] to-[#c29a45]" />
            {[
              { time: "Ngày 1", tag: "Tiếp nhận", title: "Nghe trình bày vụ việc", desc: "Luật sư chuyên trách xác định mục tiêu cốt lõi, đánh giá rủi ro sơ bộ và lập danh mục tài liệu cần thu thập." },
              { time: "Ngày 2 – 5", tag: "Rà soát", title: "Đọc hồ sơ ở cả hai ngôn ngữ", desc: "Đối chiếu tỉ mỉ bản Việt và bản Trung, đánh dấu các điều khoản bất lợi, lệch nghĩa hoặc tiềm ẩn tranh chấp." },
              { time: "Tuần 2", tag: "Phương án", title: "Báo phí và lộ trình bằng văn bản", desc: "Trình bày các phương án giải quyết khả thi, thời gian dự kiến và báo giá chi phí trọn gói trước khi nhận vụ việc." },
              { time: "Sau đó", tag: "Đại diện", title: "Đàm phán, làm việc với cơ quan hoặc tố tụng", desc: "Trực tiếp tham gia đàm phán, đại diện giải trình với cơ quan quản lý và cập nhật tiến độ định kỳ cho đến khi hoàn tất." },
            ].map((step, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-[150px_1fr] pb-12 last:pb-0 items-start">
                <div className="sm:pr-9 sm:text-right pb-2 sm:pb-0">
                  <span className="block font-sans text-xs uppercase tracking-wider text-[#a3171e] font-semibold">{step.time}</span>
                  <span className="font-royal font-bold text-xl text-[#0b1d3f]">{step.tag}</span>
                </div>
                <div className="sm:pl-9 relative">
                  <div className="absolute -left-[39px] sm:-left-[5px] top-1.5 w-2.5 h-2.5 bg-gradient-to-br from-[#f0d28a] to-[#c29a45] border-2 border-[#a3171e] rotate-45" />
                  <h3 className="font-royal font-bold text-2xl text-[#0b1d3f] mb-1">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-[#5b6174] m-0 max-w-lg leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. KHỐI ĐỘI NGŨ LUẬT SƯ (Carousel) */}
      <section className="py-24 bg-[#fbf7ee] relative overflow-hidden" id="doingu">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
            <div>
              <EyebrowBadge hz="04" text="Đội ngũ" />
              <h2 className="heading-royal text-3xl sm:text-4xl lg:text-5xl mt-3">
                Đội ngũ luật sư
              </h2>
            </div>
            <p className="text-sm text-[#5b6174] m-0 leading-relaxed">
              Mỗi luật sư ghi rõ ngôn ngữ làm việc thành thạo và mảng chuyên sâu để bạn trao đổi trực tiếp thuận lợi nhất.
            </p>
          </div>

          <div className="flex gap-6 overflow-x-auto [scroll-snap-type:x_mandatory] pb-4 [&::-webkit-scrollbar]:hidden" ref={lawyersRailRef}>
            {LAWYERS_DATA.map((lw, idx) => {
              const hairColor = HAIR_COLORS[lw.hairIndex];
              return (
                <article key={idx} className="flex-[0_0_calc(80%)] sm:flex-[0_0_calc(45%)] lg:flex-[0_0_calc(25%-18px)] [scroll-snap-align:start] bg-white border border-[#e7dcc3] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <svg viewBox="0 0 100 125" aria-hidden="true" className="w-full aspect-[4/5] block border-b-2 border-[#c29a45]">
                    <defs>
                      <linearGradient id={`grad-lw-${idx}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#2c4a88" />
                        <stop offset="1" stopColor="#0b1d3f" />
                      </linearGradient>
                    </defs>
                    <rect width="100" height="125" fill={`url(#grad-lw-${idx})`} />
                    <circle cx="50" cy="52" r="40" fill="#f0d28a" opacity=".12" />
                    {!lw.isMale && <path d="M28 62c-7-34 11-48 22-48s29 14 22 48v30H28z" fill={hairColor} />}
                    <path d="M6 125c0-30 16-42 44-44 28 2 44 14 44 44z" fill="#0d121c" />
                    <path d="M38 82l-10 43M62 82l10 43" stroke="#f0d28a" strokeWidth=".8" fill="none" opacity=".6" />
                    <path d="M38 82l12 16 12-16v14l-12 29-12-29z" fill="#f3f5f9" />
                    <path d="M47 96h6l3 29h-12z" fill="#a3171e" />
                    <ellipse cx="50" cy="52" rx="15" ry="19" fill="#e0b293" />
                    <path d="M34 48c-2-20 32-20 32 0-6-9-26-9-32 0z" fill={hairColor} />
                  </svg>
                  <div className="p-5">
                    <h3 className="font-royal font-bold text-xl text-[#0b1d3f]">{lw.name}</h3>
                    <small className="block text-xs text-[#5b6174] mt-1 mb-3">{lw.role}</small>
                    <div className="flex gap-1.5 mb-3 flex-wrap">
                      {lw.langs.map((l, lIdx) => (
                        <span key={lIdx} className="border border-[#c29a45] text-[#c29a45] font-semibold text-[10px] px-2 py-0.5">
                          {l}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-[#5b6174] m-0 mb-3 pt-3 border-t border-[#e7dcc3] leading-relaxed">
                      {lw.field}
                    </p>
                    <a href="#lienhe" className="text-xs font-semibold text-[#a3171e] hover:underline">
                      Liên hệ luật sư &rarr;
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="flex justify-end gap-2.5 mt-6">
            <button
              type="button"
              className="w-11 h-11 bg-[#0b1d3f] text-[#f0d28a] hover:bg-[#a3171e] hover:text-white transition-colors grid place-items-center"
              onClick={() => scrollRail(lawyersRailRef, -1)}
              aria-label="Luật sư trước"
            >
              &larr;
            </button>
            <button
              type="button"
              className="w-11 h-11 bg-[#0b1d3f] text-[#f0d28a] hover:bg-[#a3171e] hover:text-white transition-colors grid place-items-center"
              onClick={() => scrollRail(lawyersRailRef, 1)}
              aria-label="Luật sư sau"
            >
              &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* 10. KHỐI GÓC NHÌN PHÁP LÝ (Carousel) */}
      <section className="py-24 bg-[#fffdf8] relative overflow-hidden" id="gocnhin">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
            <div>
              <EyebrowBadge hz="05" text="Góc nhìn" />
              <h2 className="heading-royal text-3xl sm:text-4xl lg:text-5xl mt-3">
                Tiêu điểm luật
              </h2>
            </div>
            <p className="text-sm text-[#5b6174] m-0 leading-relaxed">
              Các bài viết ngắn về thay đổi pháp luật và tình huống thực tiễn thường gặp của doanh nghiệp Việt – Trung.
            </p>
          </div>

          <div className="flex gap-6 overflow-x-auto [scroll-snap-type:x_mandatory] pb-4 [&::-webkit-scrollbar]:hidden" ref={insightsRailRef}>
            {INSIGHTS_DATA.map((item, idx) => (
              <a
                key={idx}
                className="flex-[0_0_calc(85%)] sm:flex-[0_0_calc(55%)] lg:flex-[0_0_calc(33.33%-16px)] [scroll-snap-align:start] bg-white border border-[#e7dcc3] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
                href="#lienhe"
              >
                <div
                  className="aspect-[3/2] relative grid place-items-center overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${item.bg1}, ${item.bg2})` }}
                >
                  <span className="absolute left-0 top-4 bg-[#a3171e] text-white font-semibold text-[11px] uppercase tracking-wider px-3.5 py-1">
                    {item.tag}
                  </span>
                  <i aria-hidden="true" className="font-hanzi font-bold text-7xl text-[#f0d28a]/90 not-italic select-none">
                    {item.hz}
                  </i>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-royal font-bold text-xl text-[#0b1d3f] mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5b6174] m-0 mb-4 flex-1 leading-relaxed">
                    {item.desc}
                  </p>
                  <span className="text-xs font-semibold text-[#a3171e]">Xem chi tiết &rarr;</span>
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-end gap-2.5 mt-6">
            <button
              type="button"
              className="w-11 h-11 bg-[#0b1d3f] text-[#f0d28a] hover:bg-[#a3171e] hover:text-white transition-colors grid place-items-center"
              onClick={() => scrollRail(insightsRailRef, -1)}
              aria-label="Bài trước"
            >
              &larr;
            </button>
            <button
              type="button"
              className="w-11 h-11 bg-[#0b1d3f] text-[#f0d28a] hover:bg-[#a3171e] hover:text-white transition-colors grid place-items-center"
              onClick={() => scrollRail(insightsRailRef, 1)}
              aria-label="Bài sau"
            >
              &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* 11. KHỐI ĐỐI TÁC TIÊU BIỂU */}
      <section className="py-24 bg-[#fbf7ee] relative overflow-hidden" id="doitac">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
            <div>
              <EyebrowBadge hz="合作" text="Đối tác" />
              <h2 className="heading-royal text-3xl sm:text-4xl lg:text-5xl mt-3">
                Đối tác tiêu biểu
              </h2>
            </div>
            <p className="text-sm text-[#5b6174] m-0 leading-relaxed">
              Những doanh nghiệp Việt Nam và Trung Quốc đã tin tưởng giao phó hồ sơ pháp lý chiến lược cho chúng tôi.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {PARTNERS_DATA.map((pt, idx) => (
              <div key={idx} className="bg-gradient-to-b from-white to-[#fffaf0] border border-[#e7dcc3] p-6 text-center hover:border-[#a3171e] hover:-translate-y-1 transition-all">
                <b aria-hidden="true" className="w-16 h-16 mx-auto mb-3.5 grid place-items-center outline-1 outline-[#c29a45] outline-offset-4 border border-[#c29a45] bg-gradient-to-b from-white to-[#f8eed6] font-hanzi font-bold text-3xl text-[#a3171e]">
                  {pt.hz}
                </b>
                <span className="font-royal font-bold text-lg uppercase text-[#0b1d3f] tracking-wide block">
                  {pt.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. KHỐI LIÊN HỆ & ĐẶT LỊCH TƯ VẤN */}
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
    </div>
  );
}
