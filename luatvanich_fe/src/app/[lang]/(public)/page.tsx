"use client";

import React, { useState, useRef, useEffect } from "react";

// Dữ liệu Lĩnh vực & Tabs
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

// Dữ liệu 6 Dịch vụ tiêu biểu
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

// Dữ liệu Từ điển pháp lý
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

// Dữ liệu Đội ngũ Luật sư
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

// Dữ liệu Góc nhìn / Bài viết
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

// Dữ liệu Đối tác
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

// Dải chữ Ticker
const TICKER_ITEMS = [
  { vi: "Hợp đồng", zh: "合同" },
  { vi: "Đầu tư", zh: "投资" },
  { vi: "Trọng tài", zh: "仲裁" },
  { vi: "Thu hồi nợ", zh: "债务追收" },
  { vi: "Sở hữu trí tuệ", zh: "知识产权" },
  { vi: "Lao động", zh: "劳动" },
  { vi: "M&A", zh: "并购" },
  { vi: "Thuế", zh: "税务" },
];

export default function PublicHomePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("top");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const lawyersRailRef = useRef<HTMLDivElement>(null);
  const insightsRailRef = useRef<HTMLDivElement>(null);

  // Cuộn ngang rail
  const scrollRail = (ref: React.RefObject<HTMLDivElement | null>, direction: number) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction * ref.current.clientWidth * 0.8,
        behavior: "smooth",
      });
    }
  };

  // Lọc từ điển pháp lý
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

  // Chuyển tab từ thẻ dịch vụ và cuộn mượt
  const handleServiceClick = (tabIdx: number) => {
    setActiveTab(tabIdx);
    const element = document.getElementById("linhvuc");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Submit form liên hệ
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    e.currentTarget.reset();
  };

  // IntersectionObserver để active navigation
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
    <div className="vanich-landing-root font-sans antialiased text-slate-900 bg-white selection:bg-[#c29a45]/30">
      {/* NHÚNG TOÀN BỘ CSS PHONG CÁCH VẠN ÍCH HÀNH LANG */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,700;1,500&family=Be+Vietnam+Pro:wght@400;500;600;700&family=Noto+Serif+SC:wght@600;700&display=swap');

            :root {
              --navy: #0b1d3f;
              --navy2: #16336a;
              --deep: #06122b;
              --gold: #c29a45;
              --gold2: #f0d28a;
              --red: #a3171e;
              --red2: #7c1015;
              --seal: #a3171e;
              --ink: #0f1b33;
              --mute: #5b6174;
              --paper: #fbf7ee;
              --line: #e7dcc3;
              --d: 'Cormorant Garamond', Georgia, serif;
              --s: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif;
              --c: 'Noto Serif SC', serif;
              --rail: 84px;
            }

            .vanich-landing-root {
              padding-left: var(--rail);
              color: var(--ink);
              font-family: var(--s);
              line-height: 1.7;
            }

            .w { max-width: 1120px; margin: 0 auto; padding: 0 40px; }
            .btn-gold {
              display: inline-flex; align-items: center; gap: 12px;
              background: linear-gradient(180deg, #c4252c, #8f1218);
              color: #fff; font: 600 13px var(--s); letter-spacing: 1.4px;
              text-transform: uppercase; padding: 16px 28px; border: 0;
              cursor: pointer; transition: all .2s ease;
              box-shadow: 0 8px 20px rgba(163,23,30,.35), inset 0 1px 0 rgba(255,255,255,.25);
            }
            .btn-gold:hover { background: linear-gradient(180deg, #d12d34, #a3171e); gap: 16px; color: #fff; }

            .ey { font: 500 12px var(--s); letter-spacing: 3px; text-transform: uppercase; color: var(--red); }
            .ey b { font: 700 15px var(--c); letter-spacing: 4px; margin-right: 12px; color: var(--red); }

            /* Rail bên trái */
            .rail-fixed {
              position: fixed; left: 0; top: 0; bottom: 0; width: var(--rail);
              background: var(--deep); display: flex; flex-direction: column;
              align-items: center; justify-content: space-between; padding: 22px 0;
              z-index: 60; border-right: 1px solid rgba(201,162,74,.35);
            }
            .seal-stamp {
              width: 46px; height: 46px; border: 1.5px solid var(--gold);
              color: var(--gold2); display: grid; place-items: center;
              font: 700 25px var(--c); position: relative;
            }
            .seal-stamp::after {
              content: ""; position: absolute; inset: 3px; border: 1px solid rgba(201,162,74,.4);
            }
            .rn-nav { display: flex; flex-direction: column; gap: 20px; align-items: center; }
            .rn-nav a {
              display: flex; flex-direction: column; align-items: center; gap: 6px;
              color: #7f8aa6; font: 500 10.5px var(--s); letter-spacing: 1px; transition: color .2s;
            }
            .rn-nav a i { font: 700 15px var(--d); font-style: normal; }
            .rn-nav a span { writing-mode: vertical-rl; letter-spacing: 2px; text-transform: uppercase; }
            .rn-nav a:hover, .rn-nav a.on { color: var(--gold2); }
            .rn-nav a.on i { border-bottom: 2px solid var(--gold); padding-bottom: 1px; }

            .tel-btn {
              width: 42px; height: 42px; background: var(--seal); color: #fff;
              display: grid; place-items: center; font-size: 17px;
            }

            /* Header Sub / Mega */
            .hdr-nav {
              position: sticky; top: 0; z-index: 55; background: #fff;
              border-bottom: 1px solid var(--line); box-shadow: 0 1px 0 rgba(201,162,74,.55);
            }
            .hdr-nav::before {
              content: ''; display: block; height: 4px;
              background: linear-gradient(90deg, var(--red2), var(--red) 60%, var(--gold));
            }
            .hw-inner {
              max-width: 1280px; margin: 0 auto; padding: 0 40px;
              display: flex; align-items: center; justify-content: space-between; gap: 24px; height: 76px;
            }

            /* Hero */
            .hero-section {
              position: relative;
              background: linear-gradient(120deg, #08111f, #14243d 60%, #1d3556);
              color: #fff; overflow: hidden;
            }
            .hero-section::after {
              content: ''; position: absolute; left: 0; bottom: 0; width: 48%; height: 150px;
              z-index: 1; pointer-events: none;
              background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 150' preserveAspectRatio='none'%3E%3Cpath d='M0 150V66C150 66 290 108 430 150z' fill='%23a3171e'/%3E%3Cpath d='M0 150V104C115 104 235 128 335 150z' fill='%23f0d28a' opacity='.85'/%3E%3C/svg%3E") no-repeat left bottom/100% 100%;
            }
            .big-watermark {
              position: absolute; left: -10px; bottom: -60px;
              font: 700 340px/1 var(--c); color: transparent;
              -webkit-text-stroke: 1px rgba(194,154,69,.22);
              z-index: 1; pointer-events: none; white-space: nowrap;
            }
            .hero-ey-tag {
              display: inline-block;
              background: linear-gradient(90deg, var(--red), var(--red2));
              color: var(--gold2); padding: 7px 20px;
              border: 1px solid rgba(240,210,138,.5); font-style: italic; letter-spacing: 1.5px;
            }

            /* Bản đồ Vector động */
            .map-svg .dash-path { stroke-dasharray: 5 7; animation: flAnim 14s linear infinite; }
            @keyframes flAnim { to { stroke-dashoffset: -240; } }
            .map-svg .pulse-dot { animation: plAnim 3s ease-out infinite; transform-box: fill-box; transform-origin: center; }
            @keyframes plAnim { from { transform: scale(1); opacity: .8; } to { transform: scale(3.2); opacity: 0; } }

            /* Ticker chạy chữ */
            .ticker-bar {
              background: linear-gradient(90deg, var(--red2), var(--red), var(--red2));
              color: #fff; overflow: hidden; white-space: nowrap;
              position: relative; z-index: 3; border-block: 1px solid var(--gold);
            }
            .ticker-track {
              display: inline-block; padding: 12px 0;
              animation: tkAnim 36s linear infinite;
              font: 600 13px var(--s); letter-spacing: 1.5px; text-transform: uppercase;
            }
            .ticker-track span { margin: 0 26px; }
            .ticker-track b { font: 700 15px var(--c); margin-left: 8px; color: var(--gold2); }
            @keyframes tkAnim { to { transform: translateX(-50%); } }

            /* Dãy số liệu */
            .nums-grid {
              display: grid; grid-template-columns: repeat(4, 1fr);
              border-bottom: 1px solid var(--line);
              background: linear-gradient(180deg, #fffdf8, var(--paper));
            }
            .nums-cell { padding: 40px 30px; border-right: 1px solid var(--line); position: relative; }
            .nums-cell:last-child { border-right: 0; }
            .nums-cell::before {
              position: absolute; right: 26px; top: 22px;
              font: 700 44px var(--c); color: var(--gold); opacity: .4;
            }
            .nums-cell:nth-child(1)::before { content: '年'; }
            .nums-cell:nth-child(2)::before { content: '案'; }
            .nums-cell:nth-child(3)::before { content: '团'; }
            .nums-cell:nth-child(4)::before { content: '城'; }
            .nums-cell b {
              display: block; font: 700 60px/1 var(--d);
              background: linear-gradient(180deg, var(--navy), var(--navy2));
              -webkit-background-clip: text; background-clip: text; color: transparent;
            }
            .nums-cell b::after { content: '+'; color: var(--red); font-size: .6em; vertical-align: super; margin-left: 2px; -webkit-text-fill-color: var(--red); }

            /* Sections Chung */
            .vanich-sec { padding: 110px 0; position: relative; overflow: hidden; }
            .vanich-sec:not(.sec-dark):not(.sec-paper) { background: #fffdf8; }
            .vanich-sec.sec-paper { background: var(--paper); }
            .vanich-sec:not(.sec-dark)::before {
              content: ''; position: absolute; top: 30px; left: 50%;
              width: min(420px, 70%); height: 1px; transform: translateX(-50%);
              background: linear-gradient(90deg, transparent, var(--gold), transparent); z-index: 1;
            }
            .vanich-sec:not(.sec-dark)::after {
              position: absolute; right: -30px; top: 20px;
              font: 700 440px/1 var(--c); color: var(--navy); opacity: .035; pointer-events: none;
            }
            #dichvu::after { content: '服'; }
            #linhvuc::after { content: '业'; }
            #thuatngu::after { content: '词'; }
            #quytrinh::after { content: '程'; }
            #doingu::after { content: '团'; }
            #gocnhin::after { content: '观'; }
            #doitac::after { content: '合'; }

            .sec-hd { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: end; margin-bottom: 56px; }
            .sec-hd h2 { font-family: var(--d); font-size: 50px; font-weight: 700; line-height: 1.05; margin-top: 14px; }
            .sec-hd h2::after { content: ''; display: block; width: 56px; height: 3px; background: var(--red); margin-top: 18px; }

            /* Thẻ dịch vụ */
            .sv-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
            .sv-card {
              background: linear-gradient(180deg, #fff, #fffaf0);
              border: 1px solid var(--line); padding: 34px 30px 30px;
              display: flex; flex-direction: column; position: relative;
              transition: transform .25s, box-shadow .25s, border-color .25s; cursor: pointer;
            }
            .sv-card::before {
              content: ''; position: absolute; left: -1px; right: -1px; top: -1px; height: 3px;
              background: linear-gradient(90deg, var(--gold), var(--red));
              transform: scaleX(0); transform-origin: left; transition: transform .3s;
            }
            .sv-card::after {
              content: ''; position: absolute; right: 10px; bottom: 10px; width: 22px; height: 22px;
              border-right: 1.5px solid var(--gold); border-bottom: 1.5px solid var(--gold); opacity: .8;
            }
            .sv-card:hover { transform: translateY(-5px); box-shadow: 0 18px 36px rgba(10,26,58,.14); border-color: var(--gold); }
            .sv-card:hover::before { transform: scaleX(1); }
            .sv-no {
              width: 44px; height: 44px; background: linear-gradient(180deg, #c4252c, #8f1218);
              color: #fff; display: grid; place-items: center; font: 700 19px var(--d); box-shadow: 0 0 0 4px #f4dedc;
            }
            .sv-hz {
              font: 700 58px/1 var(--c);
              background: linear-gradient(160deg, var(--navy), #3d5fae);
              -webkit-background-clip: text; background-clip: text; color: transparent;
            }
            .sv-card h3 { font-family: var(--d); font-size: 26px; text-transform: uppercase; color: var(--navy); margin: 0 0 10px; }
            .sv-btn {
              align-self: flex-start; border: 1.5px solid var(--red); color: var(--red);
              font: 600 13px var(--s); padding: 10px 18px; transition: all .2s;
            }
            .sv-card:hover .sv-btn { background: var(--red); color: #fff; }

            /* Tabs Lĩnh vực */
            .tabs-wrap { display: grid; grid-template-columns: 330px 1fr; border: 1px solid var(--line); background: #fff; box-shadow: 0 18px 44px rgba(11,29,63,.08); }
            .tabs-nav { border-right: 1px solid var(--line); }
            .tab-btn {
              display: flex; width: 100%; justify-content: space-between; align-items: center;
              text-align: left; padding: 22px 26px; background: none; border: 0;
              border-bottom: 1px solid var(--line); cursor: pointer; font: 600 15px var(--s);
              color: var(--ink); transition: background .2s, color .2s;
            }
            .tab-btn:last-child { border-bottom: 0; }
            .tab-btn span { font: 700 18px var(--c); color: var(--gold); opacity: .7; }
            .tab-btn:hover { background: var(--paper); }
            .tab-btn.active {
              background: linear-gradient(90deg, var(--navy), var(--navy2));
              color: #fff; box-shadow: inset 4px 0 0 var(--red);
            }
            .tab-btn.active span { opacity: 1; color: var(--gold2); }
            .tab-panel { padding: 46px 50px; position: relative; overflow: hidden; min-height: 420px; background: linear-gradient(180deg, #fff, #fffaf0); }
            .tab-panel .panel-wm {
              position: absolute; right: 20px; bottom: -40px; font: 700 240px/1 var(--c);
              color: var(--navy); opacity: .05; pointer-events: none;
            }
            .tab-panel h3 { font-family: var(--d); font-size: 38px; margin: 0 0 14px; font-weight: 700; color: var(--navy); }
            .tab-panel ul { list-style: none; padding: 0; margin: 0 0 28px; max-width: 520px; }
            .tab-panel li { padding: 11px 0 11px 28px; border-top: 1px solid var(--line); position: relative; }
            .tab-panel li::before {
              content: ""; position: absolute; left: 0; top: 19px; width: 9px; height: 9px;
              background: var(--red); transform: rotate(45deg);
            }

            /* Bảng Từ điển */
            .glossary-table { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid var(--line); box-shadow: 0 14px 36px rgba(11,29,63,.07); }
            .glossary-table thead { background: linear-gradient(90deg, var(--navy), var(--navy2)); }
            .glossary-table th {
              font: 600 11.5px var(--s); letter-spacing: 2px; text-transform: uppercase;
              color: var(--gold2); text-align: left; padding: 16px 22px; border-bottom: 3px solid var(--red);
            }
            .glossary-table td { padding: 18px 22px; border-bottom: 1px solid var(--line); vertical-align: top; }
            .glossary-table tbody tr:nth-child(even) td { background: #fffaf0; }
            .glossary-table td:first-child { font: 700 21px var(--d); }
            .glossary-table .hz-text { font: 700 22px var(--c); color: var(--navy); }
            .glossary-table .py-text { color: var(--red); font-style: italic; font-size: 13.5px; display: block; font-family: var(--s); }

            /* Timeline */
            .timeline-track { position: relative; max-width: 860px; margin: 0 auto; }
            .timeline-track::before {
              content: ""; position: absolute; left: 150px; top: 6px; bottom: 6px; width: 1px;
              background: linear-gradient(180deg, var(--gold), var(--red), var(--gold));
            }
            .timeline-item { display: grid; grid-template-columns: 150px 1fr; gap: 0; padding-bottom: 46px; }
            .timeline-item:last-child { padding-bottom: 0; }
            .timeline-item time { font: 700 24px var(--d); color: var(--navy); padding-right: 36px; text-align: right; }
            .timeline-item time small { display: block; font: 500 11.5px var(--s); letter-spacing: 2px; color: var(--red); text-transform: uppercase; }
            .timeline-item .ti-body { padding-left: 36px; position: relative; }
            .timeline-item .ti-body::before {
              content: ""; position: absolute; left: -6px; top: 10px; width: 11px; height: 11px;
              background: linear-gradient(135deg, var(--gold2), var(--gold)); border: 2px solid var(--red); transform: rotate(45deg);
            }
            .timeline-item h3 { font-family: var(--d); font-size: 28px; margin: 0 0 6px; font-weight: 700; color: var(--navy); }

            /* Carousels */
            .carousel-rail { display: flex; gap: 24px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; padding-bottom: 4px; }
            .carousel-rail::-webkit-scrollbar { display: none; }
            .lawyer-card {
              flex: 0 0 calc(25% - 18px); scroll-snap-align: start; background: #fff;
              border: 1px solid var(--line); transition: border-color .2s, transform .25s, box-shadow .2s;
              box-shadow: 0 10px 28px rgba(11,29,63,.07);
            }
            .lawyer-card:hover { border-color: var(--gold); transform: translateY(-4px); box-shadow: 0 20px 40px rgba(11,29,63,.16); }
            .lawyer-card svg { width: 100%; aspect-ratio: 4/5; display: block; border-bottom: 3px solid var(--gold); }
            .lawyer-card h3 { font-family: var(--d); font-size: 24px; font-weight: 700; margin: 0; color: var(--navy); }

            .insight-card {
              flex: 0 0 calc(33.33% - 16px); scroll-snap-align: start; background: #fff;
              border: 1px solid var(--line); display: flex; flex-direction: column;
              transition: transform .25s, box-shadow .25s; box-shadow: 0 10px 28px rgba(11,29,63,.07);
            }
            .insight-card:hover { transform: translateY(-4px); box-shadow: 0 16px 32px rgba(10,26,58,.14); }
            .insight-cover { aspect-ratio: 3/2; position: relative; display: grid; place-items: center; overflow: hidden; }
            .insight-cover i { font: 700 92px/1 var(--c); font-style: normal; color: rgba(240,210,138,.92); position: relative; z-index: 1; }
            .insight-cover span {
              position: absolute; left: 0; top: 18px; background: var(--red); color: #fff;
              font: 600 11px var(--s); letter-spacing: 1.5px; text-transform: uppercase; padding: 5px 14px; z-index: 2;
            }
            .insight-card h3 { font-family: var(--d); font-size: 24px; font-weight: 700; margin: 0 0 10px; color: var(--navy); }

            .arrow-ctrl {
              width: 48px; height: 48px; background: var(--navy); color: var(--gold2);
              border: 0; font-size: 20px; cursor: pointer; transition: all .2s; display: grid; place-items: center;
            }
            .arrow-ctrl:hover { background: var(--red); color: #fff; }

            /* Đối tác */
            .partner-card {
              background: linear-gradient(180deg, #fff, #fffaf0); border: 1px solid var(--line);
              padding: 28px 20px; text-align: center; transition: all .2s;
            }
            .partner-card:hover { border-color: var(--red); transform: translateY(-3px); }
            .partner-card b {
              width: 68px; height: 68px; margin: 0 auto 14px; display: grid; place-items: center;
              outline: 1px solid var(--gold); outline-offset: 4px; border: 1px solid var(--gold);
              background: linear-gradient(180deg, #fff, #f8eed6); font: 700 36px/1 var(--c); color: var(--red);
            }
            .partner-card span { font: 700 20px var(--d); text-transform: uppercase; color: var(--navy); }

            /* Khối Liên hệ */
            .contact-sec {
              background: radial-gradient(800px 520px at 85% 15%, rgba(194,154,69,.2), transparent 60%),
                          radial-gradient(600px 500px at 0% 100%, rgba(163,23,30,.3), transparent 60%),
                          linear-gradient(135deg, #071530, #102a58);
              color: #fff; position: relative; overflow: hidden;
            }
            .contact-sec::before {
              content: '律'; position: absolute; left: -40px; bottom: -150px;
              font: 700 540px/1 var(--c); color: transparent;
              -webkit-text-stroke: 1px rgba(194,154,69,.2); pointer-events: none;
            }
            .contact-form-box {
              background: linear-gradient(160deg, rgba(255,255,255,.09), rgba(255,255,255,.02));
              border: 1px solid rgba(194,154,69,.45); padding: 44px 46px 48px;
              backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); position: relative;
            }
            .contact-form-box::before, .contact-form-box::after {
              content: ''; position: absolute; width: 28px; height: 28px; border: 3px solid var(--gold2);
            }
            .contact-form-box::before { left: -2px; top: -2px; border-right: 0; border-bottom: 0; }
            .contact-form-box::after { right: -2px; bottom: -2px; border-left: 0; border-top: 0; }

            .cf-input {
              width: 100%; background: transparent; border: 0;
              border-bottom: 1px solid rgba(255,255,255,.35); color: #fff;
              padding: 10px 0; font: 15px var(--s); outline: none; transition: border-color .2s;
            }
            .cf-input:focus { border-bottom-color: var(--gold2); }
            .cf-input::placeholder { color: #7f8aa6; }
            .cf-input option { color: #000; }

            /* Responsive */
            @media (max-width: 1000px) {
              :root { --rail: 0px; }
              .vanich-landing-root { padding-left: 0; }
              .rail-fixed { display: none; }
              .w { padding: 0 20px; }
              .sec-hd { grid-template-columns: 1fr; gap: 20px; }
              .sec-hd h2 { font-size: 38px; }
              .nums-grid { grid-template-columns: 1fr 1fr; }
              .nums-cell { border-bottom: 1px solid var(--line); }
              .sv-grid { grid-template-columns: 1fr 1fr; }
              .tabs-wrap { grid-template-columns: 1fr; }
              .tabs-nav { display: flex; overflow-x: auto; border-right: 0; border-bottom: 1px solid var(--line); }
              .tab-btn { white-space: nowrap; border-bottom: 0; border-right: 1px solid var(--line); width: auto; gap: 12px; }
              .lawyer-card { flex-basis: calc(45% - 12px); }
              .insight-card { flex-basis: 62%; }
              .partner-grid { grid-template-columns: 1fr 1fr !important; }
              .timeline-track::before { left: 14px; }
              .timeline-item { grid-template-columns: 1fr; padding-left: 36px; }
              .timeline-item time { text-align: left; padding: 0 0 4px; }
              .timeline-item .ti-body { padding-left: 0; }
              .timeline-item .ti-body::before { left: -28px; top: -36px; }
            }
            @media (max-width: 560px) {
              .sv-grid { grid-template-columns: 1fr; }
              .lawyer-card { flex-basis: 78%; }
              .insight-card { flex-basis: 86%; }
              .contact-form-box { padding: 30px 20px; }
            }
          `,
        }}
      />

      {/* 1. THANH RAIL CỐ ĐỊNH BÊN TRÁI (Desktop) */}
      <aside className="rail-fixed">
        <a className="seal-stamp" href="#top" aria-label="Luật Vạn Ích">
          万
        </a>
        <nav className="rn-nav" id="rn">
          <a href="#linhvuc" className={activeSection === "linhvuc" ? "on" : ""}>
            <i>01</i>
            <span>Lĩnh vực</span>
          </a>
          <a href="#thuatngu" className={activeSection === "thuatngu" ? "on" : ""}>
            <i>02</i>
            <span>Thuật ngữ</span>
          </a>
          <a href="#quytrinh" className={activeSection === "quytrinh" ? "on" : ""}>
            <i>03</i>
            <span>Quy trình</span>
          </a>
          <a href="#doingu" className={activeSection === "doingu" ? "on" : ""}>
            <i>04</i>
            <span>Đội ngũ</span>
          </a>
          <a href="#gocnhin" className={activeSection === "gocnhin" ? "on" : ""}>
            <i>05</i>
            <span>Góc nhìn</span>
          </a>
          <a href="#lienhe" className={activeSection === "lienhe" ? "on" : ""}>
            <i>06</i>
            <span>Liên hệ</span>
          </a>
        </nav>
        <a className="tel-btn rounded-sm" href="tel:0900123456" aria-label="Hotline">
          ✆
        </a>
      </aside>

      {/* 2. THANH HEADER ĐIỀU HƯỚNG BỔ TRỢ (Sticky) */}
      <header className="hdr-nav">
        <div className="hw-inner">
          <a className="flex items-center gap-3" href="#top">
            <span className="seal-stamp !w-10 !h-10 !text-xl !bg-[#0b1d3f]">万</span>
            <div>
              <b className="block font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#0b1d3f] leading-none">
                LUẬT VẠN ÍCH
              </b>
              <small className="block font-serif text-[11px] tracking-[5px] text-[#c29a45] font-semibold mt-1">
                万益律师
              </small>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6 h-full text-xs font-semibold uppercase tracking-wider text-[#0b1d3f]">
            <a href="#top" className="text-[#a3171e] border-b-2 border-[#a3171e] py-7">
              Trang chủ
            </a>
            <div
              className="relative py-7 cursor-pointer"
              onMouseEnter={() => setOpenDropdown("gioithieu")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <span className="hover:text-[#a3171e] transition-colors flex items-center gap-1">
                Giới thiệu
              </span>
              {openDropdown === "gioithieu" && (
                <div className="absolute top-full left-0 w-56 bg-white border border-[#e7dcc3] border-t-2 border-t-[#c29a45] shadow-xl py-2 z-50 normal-case">
                  <a href="#top" className="flex justify-between px-4 py-2 hover:bg-[#fbf7ee] text-xs">
                    <span>Về Luật Vạn Ích</span>
                    <em className="text-[#c29a45] not-italic font-serif">万益</em>
                  </a>
                  <a href="#doingu" className="flex justify-between px-4 py-2 hover:bg-[#fbf7ee] text-xs">
                    <span>Đội ngũ luật sư</span>
                    <em className="text-[#c29a45] not-italic font-serif">团队</em>
                  </a>
                  <a href="#top" className="flex justify-between px-4 py-2 hover:bg-[#fbf7ee] text-xs">
                    <span>Hành lang Việt – Trung</span>
                    <em className="text-[#c29a45] not-italic font-serif">走廊</em>
                  </a>
                  <a href="#lienhe" className="flex justify-between px-4 py-2 hover:bg-[#fbf7ee] text-xs">
                    <span>Mạng lưới văn phòng</span>
                    <em className="text-[#c29a45] not-italic font-serif">网络</em>
                  </a>
                </div>
              )}
            </div>

            <div
              className="relative py-7 cursor-pointer"
              onMouseEnter={() => setOpenDropdown("dichvu")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <a href="#linhvuc" className="hover:text-[#a3171e] transition-colors">
                Dịch vụ pháp lý
              </a>
              {openDropdown === "dichvu" && (
                <div className="absolute top-full -left-20 w-[640px] bg-white border border-[#e7dcc3] border-t-2 border-t-[#c29a45] shadow-2xl p-5 grid grid-cols-2 gap-6 z-50 normal-case">
                  <div>
                    <span className="block text-[11px] font-bold text-[#c29a45] uppercase tracking-wider mb-2">
                      Doanh nghiệp & Đầu tư
                    </span>
                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => handleServiceClick(0)}
                        className="w-full flex justify-between py-1.5 px-2 hover:bg-[#fbf7ee] rounded text-xs text-left"
                      >
                        <span>Đầu tư nước ngoài</span>
                        <em className="text-[#c29a45] not-italic font-serif">外商投资</em>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleServiceClick(1)}
                        className="w-full flex justify-between py-1.5 px-2 hover:bg-[#fbf7ee] rounded text-xs text-left"
                      >
                        <span>Hợp đồng song ngữ</span>
                        <em className="text-[#c29a45] not-italic font-serif">双语合同</em>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleServiceClick(4)}
                        className="w-full flex justify-between py-1.5 px-2 hover:bg-[#fbf7ee] rounded text-xs text-left"
                      >
                        <span>Lao động & Nhân sự</span>
                        <em className="text-[#c29a45] not-italic font-serif">劳动用工</em>
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-[#c29a45] uppercase tracking-wider mb-2">
                      Tranh chấp & Giao dịch
                    </span>
                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => handleServiceClick(2)}
                        className="w-full flex justify-between py-1.5 px-2 hover:bg-[#fbf7ee] rounded text-xs text-left"
                      >
                        <span>Tranh tụng & Trọng tài</span>
                        <em className="text-[#c29a45] not-italic font-serif">诉讼仲裁</em>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleServiceClick(3)}
                        className="w-full flex justify-between py-1.5 px-2 hover:bg-[#fbf7ee] rounded text-xs text-left"
                      >
                        <span>Thu hồi nợ</span>
                        <em className="text-[#c29a45] not-italic font-serif">债务追收</em>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleServiceClick(5)}
                        className="w-full flex justify-between py-1.5 px-2 hover:bg-[#fbf7ee] rounded text-xs text-left"
                      >
                        <span>Mua bán & Sáp nhập</span>
                        <em className="text-[#c29a45] not-italic font-serif">并购重组</em>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a href="#gocnhin" className="hover:text-[#a3171e] transition-colors">
              Cẩm nang
            </a>
            <a href="#lienhe" className="hover:text-[#a3171e] transition-colors">
              Liên hệ
            </a>
          </nav>

          <a className="btn-gold hidden sm:inline-flex" href="#lienhe">
            Đặt lịch tư vấn
          </a>

          <button
            type="button"
            className="lg:hidden p-2 border border-[#e7dcc3] text-sm font-semibold text-[#0b1d3f]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "Đóng" : "Menu"}
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b-2 border-[#c29a45] p-4 space-y-3 text-xs font-semibold uppercase">
            <a href="#top" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-[#a3171e]">
              Trang chủ
            </a>
            <a href="#linhvuc" onClick={() => setMobileMenuOpen(false)} className="block py-2">
              Dịch vụ pháp lý
            </a>
            <a href="#thuatngu" onClick={() => setMobileMenuOpen(false)} className="block py-2">
              Từ điển Việt – Trung
            </a>
            <a href="#doingu" onClick={() => setMobileMenuOpen(false)} className="block py-2">
              Đội ngũ luật sư
            </a>
            <a href="#lienhe" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-[#a3171e]">
              Đặt lịch tư vấn ngay
            </a>
          </div>
        )}
      </header>

      {/* 3. HERO BANNER CHÍNH */}
      <section className="hero-section" id="top">
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
            {/* Tháp truyền hình Đông Phương Minh Châu */}
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
        <div className="big-watermark" aria-hidden="true">
          万益
        </div>

        <div className="w relative z-[2] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[660px] pt-16 pb-28">
          <div className="lg:col-span-7 space-y-6">
            <div className="hero-ey-tag">
              <b className="font-serif font-bold text-base not-italic mr-2">万益律师</b>
              Luật Vạn Ích
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight">
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
              <a className="btn-gold" href="#lienhe">
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
              className="map-svg w-full max-w-[480px] h-auto drop-shadow-2xl"
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
              <g fill="none" stroke="#c9a24a" strokeWidth="1.6" className="dash-path">
                <path d="M170 470Q130 420 160 370" />
                <path d="M160 370Q170 280 285 250" />
                <path d="M285 250Q380 200 410 110" />
                <path d="M285 250Q300 270 312 292" />
                <path d="M160 370Q230 330 312 292" />
              </g>

              {/* Sóng xung kích Radar tại Hà Nội và Thượng Hải */}
              <g fill="#c9a24a">
                <circle className="pulse-dot" cx="410" cy="110" r="5" />
                <circle className="pulse-dot" cx="160" cy="370" r="5" />
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
                <text x="338" y="116" className="font-serif font-bold text-xs fill-[#f0d28a]">上海</text>
                <text x="214" y="238">Quảng Châu</text>
                <text x="214" y="256" className="font-serif font-bold text-xs fill-[#f0d28a]">广州</text>
                <text x="324" y="316">Thâm Quyến</text>
                <text x="324" y="334" className="font-serif font-bold text-xs fill-[#f0d28a]">深圳</text>
                <text x="64" y="362">Hà Nội</text>
                <text x="64" y="380" className="font-serif font-bold text-xs fill-[#f0d28a]">河内</text>
                <text x="186" y="476">TP. Hồ Chí Minh</text>
                <text x="186" y="494" className="font-serif font-bold text-xs fill-[#f0d28a]">胡志明市</text>
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* 4. DẢI TICKER THUẬT NGỮ CHẠY VÔ TẬN */}
      <div className="ticker-bar" aria-hidden="true">
        <div className="ticker-track">
          {TICKER_ITEMS.concat(TICKER_ITEMS).map((item, idx) => (
            <span key={idx}>
              {item.vi}
              <b>{item.zh}</b>
            </span>
          ))}
        </div>
      </div>

      {/* 5. KHỐI CON SỐ THỐNG KÊ HOÀNG GIA */}
      <div className="nums-grid w !max-w-none !p-0">
        <div className="nums-cell">
          <b>12</b>
          <span className="block mt-2 text-[#5b6174] text-xs sm:text-sm font-medium">
            năm hành nghề
          </span>
        </div>
        <div className="nums-cell">
          <b>1.200</b>
          <span className="block mt-2 text-[#5b6174] text-xs sm:text-sm font-medium">
            hồ sơ đã tiếp nhận
          </span>
        </div>
        <div className="nums-cell">
          <b>15</b>
          <span className="block mt-2 text-[#5b6174] text-xs sm:text-sm font-medium">
            luật sư và chuyên viên
          </span>
        </div>
        <div className="nums-cell">
          <b>5</b>
          <span className="block mt-2 text-[#5b6174] text-xs sm:text-sm font-medium">
            thành phố trong mạng lưới
          </span>
        </div>
      </div>

      {/* 6. KHỐI 6 DỊCH VỤ TIÊU BIỂU */}
      <section className="vanich-sec sec-paper" id="dichvu">
        <div className="w">
          <div className="sec-hd">
            <div>
              <div className="ey">
                <b>服务</b>Dịch vụ tiêu biểu
              </div>
              <h2>Sáu dịch vụ được tìm đến nhiều nhất</h2>
            </div>
            <p className="text-sm text-[#5b6174] m-0">
              Chọn một dịch vụ để xem chi tiết phạm vi công việc, thời gian và hình thức phí tương ứng.
            </p>
          </div>

          <div className="sv-grid">
            {FEATURED_SERVICES.map((sv, idx) => (
              <div
                key={idx}
                className="sv-card"
                onClick={() => handleServiceClick(sv.tabIndex)}
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="sv-no">0{idx + 1}</span>
                  <span className="sv-hz" aria-hidden="true">
                    {sv.hz}
                  </span>
                </div>
                <h3>{sv.title}</h3>
                <p className="text-xs sm:text-sm text-[#5b6174] mb-6 flex-1 leading-relaxed">
                  {sv.desc}
                </p>
                <span className="sv-btn">Xem chi tiết &rarr;</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. KHỐI LĨNH VỰC CHUYÊN SÂU (TABS) */}
      <section className="vanich-sec" id="linhvuc">
        <div className="w">
          <div className="sec-hd">
            <div>
              <div className="ey">
                <b>01</b>Lĩnh vực
              </div>
              <h2>Chọn đúng vấn đề, gặp đúng luật sư</h2>
            </div>
            <p className="text-sm text-[#5b6174] m-0">
              Mỗi lĩnh vực có luật sư phụ trách riêng, cùng quy trình và mốc thời gian được báo trước rõ ràng.
            </p>
          </div>

          <div className="tabs-wrap">
            {/* Cột trái: Tab list */}
            <div className="tabs-nav" role="tablist">
              {TABS_DATA.map((tab, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  className={`tab-btn ${activeTab === idx ? "active" : ""}`}
                  onClick={() => setActiveTab(idx)}
                >
                  <span>{tab.title}</span>
                  <span className="font-serif">{tab.hanzi}</span>
                </button>
              ))}
            </div>

            {/* Cột phải: Tab panel */}
            <div className="tab-panel" role="tabpanel">
              <div className="panel-wm" aria-hidden="true">
                {TABS_DATA[activeTab].hanzi[0]}
              </div>
              <h3>{TABS_DATA[activeTab].title}</h3>
              <p className="text-sm text-[#5b6174] max-w-lg mb-6 leading-relaxed">
                {TABS_DATA[activeTab].desc}
              </p>
              <ul>
                {TABS_DATA[activeTab].points.map((pt, pIdx) => (
                  <li key={pIdx} className="text-xs sm:text-sm text-[#0f1b33]">
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="flex gap-10 pt-2 border-t border-[#e7dcc3]">
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

      {/* 8. KHỐI TỪ ĐIỂN PHÁP LÝ VIỆT – TRUNG */}
      <section className="vanich-sec sec-paper" id="thuatngu">
        <div className="w">
          <div className="sec-hd">
            <div>
              <div className="ey">
                <b>02</b>Thuật ngữ song ngữ
              </div>
              <h2>Từ điển pháp lý Việt – Trung</h2>
            </div>
            <p className="text-sm text-[#5b6174] m-0">
              Một chữ dịch lệch có thể làm đổi nghĩa cả điều khoản. Tra nhanh các thuật ngữ thường gặp trong hợp đồng kinh tế.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm thuật ngữ, ví dụ: phạt, 合同, tóuzī…"
              className="flex-1 max-w-md p-3.5 border border-[#e7dcc3] bg-white text-sm text-[#0f1b33] rounded-none outline-none focus:border-[#a3171e]"
            />
            <small className="text-xs text-[#5b6174] font-medium">
              Tìm thấy {filteredGlossary.length} thuật ngữ phù hợp
            </small>
          </div>

          <div className="overflow-x-auto">
            <table className="glossary-table">
              <thead>
                <tr>
                  <th className="w-1/4">Tiếng Việt</th>
                  <th className="w-1/6">中文</th>
                  <th className="w-1/6">Pinyin</th>
                  <th>Lưu ý khi soạn hợp đồng</th>
                </tr>
              </thead>
              <tbody>
                {filteredGlossary.length > 0 ? (
                  filteredGlossary.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#fbf8ef] transition-colors">
                      <td className="font-serif font-bold text-lg text-[#0f1b33]">{row.vi}</td>
                      <td className="hz-text">{row.zh}</td>
                      <td className="py-text">{row.pinyin}</td>
                      <td className="text-xs sm:text-sm text-[#5b6174] leading-relaxed">
                        {row.note}
                      </td>
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

      {/* 9. KHỐI QUY TRÌNH THỤ LÝ 4 BƯỚC */}
      <section className="vanich-sec" id="quytrinh">
        <div className="w">
          <div className="sec-hd">
            <div>
              <div className="ey">
                <b>03</b>Quy trình
              </div>
              <h2>Một vụ việc diễn ra như thế nào</h2>
            </div>
            <p className="text-sm text-[#5b6174] m-0">
              Mọi bước đều có văn bản và thời hạn rõ ràng để doanh nghiệp dễ dàng theo dõi tiến độ.
            </p>
          </div>

          <div className="timeline-track">
            <div className="timeline-item">
              <time>
                <small>Ngày 1</small>Tiếp nhận
              </time>
              <div className="ti-body">
                <h3>Nghe trình bày vụ việc</h3>
                <p className="text-xs sm:text-sm text-[#5b6174] m-0 max-w-lg leading-relaxed">
                  Luật sư chuyên trách xác định mục tiêu cốt lõi, đánh giá rủi ro sơ bộ và lập danh mục tài liệu cần thu thập.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <time>
                <small>Ngày 2 – 5</small>Rà soát
              </time>
              <div className="ti-body">
                <h3>Đọc hồ sơ ở cả hai ngôn ngữ</h3>
                <p className="text-xs sm:text-sm text-[#5b6174] m-0 max-w-lg leading-relaxed">
                  Đối chiếu tỉ mỉ bản Việt và bản Trung, đánh dấu các điều khoản bất lợi, lệch nghĩa hoặc tiềm ẩn tranh chấp.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <time>
                <small>Tuần 2</small>Phương án
              </time>
              <div className="ti-body">
                <h3>Báo phí và lộ trình bằng văn bản</h3>
                <p className="text-xs sm:text-sm text-[#5b6174] m-0 max-w-lg leading-relaxed">
                  Trình bày các phương án giải quyết khả thi, thời gian dự kiến và báo giá chi phí trọn gói trước khi nhận vụ việc.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <time>
                <small>Sau đó</small>Đại diện
              </time>
              <div className="ti-body">
                <h3>Đàm phán, làm việc với cơ quan hoặc tố tụng</h3>
                <p className="text-xs sm:text-sm text-[#5b6174] m-0 max-w-lg leading-relaxed">
                  Trực tiếp tham gia đàm phán, đại diện giải trình với cơ quan quản lý và cập nhật tiến độ định kỳ cho đến khi hoàn tất.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. KHỐI ĐỘI NGŨ LUẬT SƯ (Carousel) */}
      <section className="vanich-sec sec-paper" id="doingu">
        <div className="w">
          <div className="sec-hd">
            <div>
              <div className="ey">
                <b>04</b>Đội ngũ
              </div>
              <h2>Đội ngũ luật sư</h2>
            </div>
            <p className="text-sm text-[#5b6174] m-0">
              Mỗi luật sư ghi rõ ngôn ngữ làm việc thành thạo và mảng chuyên sâu để bạn trao đổi trực tiếp thuận lợi nhất.
            </p>
          </div>

          <div className="carousel-rail" ref={lawyersRailRef}>
            {LAWYERS_DATA.map((lw, idx) => {
              const hairColor = HAIR_COLORS[lw.hairIndex];
              return (
                <article key={idx} className="lawyer-card">
                  {/* Avatar tranh khắc họa vector nghệ thuật */}
                  <svg viewBox="0 0 100 125" aria-hidden="true">
                    <defs>
                      <linearGradient id={`grad-lw-${idx}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#2c4a88" />
                        <stop offset="1" stopColor="#0b1d3f" />
                      </linearGradient>
                    </defs>
                    <rect width="100" height="125" fill={`url(#grad-lw-${idx})`} />
                    <circle cx="50" cy="52" r="40" fill="#f0d28a" opacity=".12" />
                    {/* Tóc sau cho nữ */}
                    {!lw.isMale && (
                      <path
                        d="M28 62c-7-34 11-48 22-48s29 14 22 48v30H28z"
                        fill={hairColor}
                      />
                    )}
                    {/* Thân áo vest */}
                    <path d="M6 125c0-30 16-42 44-44 28 2 44 14 44 44z" fill="#0d121c" />
                    <path
                      d="M38 82l-10 43M62 82l10 43"
                      stroke="#f0d28a"
                      strokeWidth=".8"
                      fill="none"
                      opacity=".6"
                    />
                    <path d="M38 82l12 16 12-16v14l-12 29-12-29z" fill="#f3f5f9" />
                    <path d="M47 96h6l3 29h-12z" fill="#a3171e" />
                    <ellipse cx="50" cy="52" rx="15" ry="19" fill="#e0b293" />
                    {/* Tóc trước */}
                    <path
                      d="M34 48c-2-20 32-20 32 0-6-9-26-9-32 0z"
                      fill={hairColor}
                    />
                  </svg>
                  <div className="p-5">
                    <h3>{lw.name}</h3>
                    <small className="block text-xs text-[#5b6174] mt-1 mb-3">
                      {lw.role}
                    </small>
                    <div className="flex gap-1.5 mb-3.5 flex-wrap">
                      {lw.langs.map((l, lIdx) => (
                        <span
                          key={lIdx}
                          className="border border-[#c29a45] text-[#c29a45] font-semibold text-[10px] px-2 py-0.5"
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-[#5b6174] m-0 mb-3.5 pt-3 border-t border-[#e7dcc3] leading-relaxed">
                      {lw.field}
                    </p>
                    <a
                      href="#lienhe"
                      className="text-xs font-semibold text-[#a3171e] hover:underline"
                    >
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
              className="arrow-ctrl"
              onClick={() => scrollRail(lawyersRailRef, -1)}
              aria-label="Luật sư trước"
            >
              &larr;
            </button>
            <button
              type="button"
              className="arrow-ctrl"
              onClick={() => scrollRail(lawyersRailRef, 1)}
              aria-label="Luật sư sau"
            >
              &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* 11. KHỐI GÓC NHÌN PHÁP LÝ (Carousel) */}
      <section className="vanich-sec" id="gocnhin">
        <div className="w">
          <div className="sec-hd">
            <div>
              <div className="ey">
                <b>05</b>Góc nhìn
              </div>
              <h2>Tiêu điểm luật</h2>
            </div>
            <p className="text-sm text-[#5b6174] m-0">
              Các bài viết ngắn về thay đổi pháp luật và tình huống thực tiễn thường gặp của doanh nghiệp Việt – Trung.
            </p>
          </div>

          <div className="carousel-rail" ref={insightsRailRef}>
            {INSIGHTS_DATA.map((item, idx) => (
              <a key={idx} className="insight-card" href="#lienhe">
                <div
                  className="insight-cover"
                  style={{
                    background: `linear-gradient(135deg, ${item.bg1}, ${item.bg2})`,
                  }}
                >
                  <span>{item.tag}</span>
                  <i aria-hidden="true">{item.hz}</i>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3>{item.title}</h3>
                  <p className="text-xs text-[#5b6174] m-0 mb-4 flex-1 leading-relaxed">
                    {item.desc}
                  </p>
                  <span className="text-xs font-semibold text-[#a3171e]">
                    Xem chi tiết &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-end gap-2.5 mt-6">
            <button
              type="button"
              className="arrow-ctrl"
              onClick={() => scrollRail(insightsRailRef, -1)}
              aria-label="Bài trước"
            >
              &larr;
            </button>
            <button
              type="button"
              className="arrow-ctrl"
              onClick={() => scrollRail(insightsRailRef, 1)}
              aria-label="Bài sau"
            >
              &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* 12. KHỐI ĐỐI TÁC TIÊU BIỂU */}
      <section className="vanich-sec sec-paper" id="doitac">
        <div className="w">
          <div className="sec-hd">
            <div>
              <div className="ey">
                <b>合作</b>Đối tác
              </div>
              <h2>Đối tác tiêu biểu</h2>
            </div>
            <p className="text-sm text-[#5b6174] m-0">
              Những doanh nghiệp Việt Nam và Trung Quốc đã tin tưởng giao phó hồ sơ pháp lý chiến lược cho chúng tôi.
            </p>
          </div>

          <div className="partner-grid grid grid-cols-2 md:grid-cols-4 gap-5">
            {PARTNERS_DATA.map((pt, idx) => (
              <div key={idx} className="partner-card">
                <b aria-hidden="true">{pt.hz}</b>
                <span>{pt.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. KHỐI LIÊN HỆ & ĐẶT LỊCH TƯ VẤN */}
      <section className="vanich-sec contact-sec" id="lienhe">
        <div className="w grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="ey !text-[#f0d28a]">
              <b className="!text-[#f0d28a]">06</b>Liên hệ
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold leading-tight my-4">
              Nói chuyện với{" "}
              <i className="not-italic text-[#f0d28a]">luật sư</i> bằng tiếng Việt hoặc 中文
            </h2>
            <span className="block font-serif font-bold text-3xl sm:text-4xl text-[#f0d28a] mb-1">
              0900 123 456
            </span>
            <span className="text-sm text-[#b6c0d6] block mb-8">
              lienhe@vanichlaw.vn &bull; Hỗ trợ 24/7
            </span>

            {/* Mạng lưới 4 Văn phòng */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-[#a3171e]">
              <div className="space-y-1">
                <b className="block font-serif text-lg text-white">Hà Nội</b>
                <span className="text-xs text-[#b6c0d6]">
                  Văn phòng chính &bull; <em className="not-italic text-[#f0d28a] font-serif">河内</em>
                </span>
              </div>
              <div className="space-y-1">
                <b className="block font-serif text-lg text-white">TP. Hồ Chí Minh</b>
                <span className="text-xs text-[#b6c0d6]">
                  Chi nhánh miền Nam &bull; <em className="not-italic text-[#f0d28a] font-serif">胡志明市</em>
                </span>
              </div>
              <div className="space-y-1 pt-3 border-t border-white/10 sm:border-t-0">
                <b className="block font-serif text-lg text-white">Thượng Hải</b>
                <span className="text-xs text-[#b6c0d6]">
                  Đối tác chiến lược &bull; <em className="not-italic text-[#f0d28a] font-serif">上海</em>
                </span>
              </div>
              <div className="space-y-1 pt-3 border-t border-white/10 sm:border-t-0">
                <b className="block font-serif text-lg text-white">Quảng Châu</b>
                <span className="text-xs text-[#b6c0d6]">
                  Đối tác chiến lược &bull; <em className="not-italic text-[#f0d28a] font-serif">广州</em>
                </span>
              </div>
            </div>
          </div>

          {/* Form Đặt lịch tư vấn */}
          <div className="contact-form-box">
            <form onSubmit={handleContactSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] font-semibold text-[#f0d28a] uppercase tracking-wider mb-1">
                  Họ tên / Tên Doanh nghiệp *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A / Công ty TNHH..."
                  className="cf-input"
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
                  className="cf-input"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#f0d28a] uppercase tracking-wider mb-1">
                  Lĩnh vực quan tâm
                </label>
                <select className="cf-input cursor-pointer">
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
                  className="cf-input resize-none"
                />
              </div>

              <button type="submit" className="btn-gold w-full justify-center mt-4">
                Gửi yêu cầu tư vấn &rarr;
              </button>

              {formSubmitted && (
                <div className="p-3 bg-[#f0d28a]/10 border border-[#f0d28a]/40 text-[#f0d28a] text-xs leading-relaxed rounded mt-3">
                  &check; <strong>Đã tiếp nhận yêu cầu.</strong> Luật sư chuyên trách của Vạn Ích sẽ trực tiếp liên hệ lại trong vòng 24 giờ làm việc.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* 14. FOOTER */}
      <footer className="bg-[#06122b] text-[#8d98b2] text-xs py-7 border-t-[3px] border-[#c29a45]">
        <div className="w flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <span>&copy; 2026 Luật Vạn Ích &bull; 万益律师事务所. Bảo lưu mọi quyền.</span>
          <span className="text-[#5a6479]">Hành lang pháp lý vững chắc Việt – Trung.</span>
        </div>
      </footer>
    </div>
  );
}
