"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface LawyersBookSectionProps {
  lang: string;
}

// Danh sách 24 luật sư từ template cổ trang
const LAWYERS_DATA = [
  { name: "Nguyễn Minh Hoàng", zh: "阮明皇", role: "Luật sư điều hành", langs: "VCE", focus: "Đầu tư, M&A" },
  { name: "Trần Thu Hà", zh: "陈秋河", role: "Luật sư thành viên", langs: "VC", focus: "Hợp đồng song ngữ" },
  { name: "Lê Quốc Bảo", zh: "黎国宝", role: "Luật sư thành viên", langs: "VE", focus: "Tranh tụng, trọng tài" },
  { name: "Phạm Ngọc Lan", zh: "范玉兰", role: "Luật sư thành viên", langs: "VC", focus: "Thu hồi công nợ" },
  { name: "Đỗ Hồng Ngọc", zh: "杜红玉", role: "Luật sư thành viên", langs: "VC", focus: "Sở hữu trí tuệ" },
  { name: "Vũ Đức Anh", zh: "武德英", role: "Luật sư thành viên", langs: "VCE", focus: "M&A, thuế" },
  { name: "Hoàng Thị Mai", zh: "黄氏梅", role: "Luật sư", langs: "VC", focus: "Thành lập doanh nghiệp" },
  { name: "Phan Văn Khải", zh: "潘文凯", role: "Luật sư", langs: "VCE", focus: "Đầu tư nước ngoài" },
  { name: "Bùi Thanh Tùng", zh: "裴青松", role: "Luật sư", langs: "VC", focus: "Cấp phép đầu tư" },
  { name: "Đặng Khánh Linh", zh: "邓庆玲", role: "Luật sư", langs: "VE", focus: "Quản trị doanh nghiệp" },
  { name: "Ngô Gia Huy", zh: "吴嘉辉", role: "Chuyên viên pháp lý", langs: "VC", focus: "Hồ sơ doanh nghiệp" },
  { name: "Lý Thảo Vy", zh: "李草薇", role: "Chuyên viên pháp lý", langs: "VC", focus: "Chủ sở hữu hưởng lợi" },
  { name: "Trương Minh Châu", zh: "张明珠", role: "Luật sư", langs: "VC", focus: "Soạn thảo hợp đồng" },
  { name: "Đinh Quang Vinh", zh: "丁光荣", role: "Luật sư", langs: "VCE", focus: "Hợp đồng thương mại" },
  { name: "Dương Bảo Ngọc", zh: "杨宝玉", role: "Luật sư", langs: "VC", focus: "Đối chiếu song ngữ" },
  { name: "Mai Thu Trang", zh: "梅秋庄", role: "Luật sư", langs: "VC", focus: "Lao động, nhân sự" },
  { name: "Hồ Đức Thịnh", zh: "胡德盛", role: "Chuyên viên pháp lý", langs: "VC", focus: "Giấy phép lao động" },
  { name: "Lương Yến Nhi", zh: "梁燕儿", role: "Chuyên viên pháp lý", langs: "VC", focus: "Nội quy lao động" },
  { name: "Cao Văn Hùng", zh: "高文雄", role: "Luật sư tranh tụng", langs: "VE", focus: "Tòa án, trọng tài" },
  { name: "Võ Thị Hạnh", zh: "武氏幸", role: "Luật sư", langs: "VC", focus: "Thu hồi công nợ" },
  { name: "Chu Minh Đạt", zh: "朱明达", role: "Luật sư", langs: "VC", focus: "Thi hành án" },
  { name: "Tạ Phương Anh", zh: "谢芳英", role: "Luật sư", langs: "VCE", focus: "Tranh chấp thương mại" },
  { name: "Lâm Quốc Việt", zh: "林国越", role: "Chuyên viên pháp lý", langs: "VC", focus: "Chứng cứ, vi bằng" },
  { name: "Kiều Thanh Hà", zh: "乔清河", role: "Chuyên viên pháp lý", langs: "VC", focus: "Hồ sơ tố tụng" },
];

const GROUPS = [
  { vi: "Ban điều hành", zh: "领导团队" },
  { vi: "Đầu tư & Doanh nghiệp", zh: "投资企业" },
  { vi: "Hợp đồng & Lao động", zh: "合同劳动" },
  { vi: "Tranh tụng & Thu hồi nợ", zh: "诉讼债务" },
];

const NUMERALS = ["一", "二", "三", "四"];
const LANG_MAP: Record<string, string> = { V: "VI", C: "中文", E: "EN" };
const FEMALE_SET = new Set([1, 3, 4, 6, 9, 11, 12, 14, 15, 17, 19, 21, 23]);

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Hàm vẽ ảnh minh họa chân dung cổ trang SVG
function renderPortrait(i: number, name: string) {
  const isFemale = FEMALE_SET.has(i);
  const pick = (arr: string[], k: number) => arr[(i * k + (i >> 1)) % arr.length];
  const skin = pick(["#f0cfa8", "#e8bf94", "#f3d6b5", "#e2b68a"], 3);
  const neck = pick(["#dcb68c", "#d4a67a", "#e2c19a", "#cfa073"], 3);
  const hair = pick(["#1b1410", "#2a1a12", "#3a2a20", "#16161a"], 5);
  const suit = pick(isFemale ? ["#2b3a6b", "#6a2f36", "#3b3b44", "#2e4a45"] : ["#1f2a55", "#2d2d35", "#3a2b2a", "#25403c"], 7);
  const bg = pick(["#d9c7a0", "#c8d3d6", "#dcc5b4", "#c9d4c0", "#d5cbe0"], 11);
  const tie = pick(["#b5362a", "#8b3422", "#1a2f86", "#7a6a2a"], 13);
  const glasses = i % 3 === 0;

  const backHair = isFemale ? `<path d="M19 50C13 22 27 9 40 9s27 13 21 41l3 32H16z" fill="${hair}"/>` : "";
  const topHair = isFemale
    ? `<path d="M24 45C20 22 31 15 41 15c12 0 19 8 15 30-1-13-8-19-18-19-7 3-11 9-14 19z" fill="${hair}"/>`
    : `<path d="M24 41C21 22 31 16 41 16c11 0 18 7 15 25-2-9-8-14-16-14s-13 5-16 14z" fill="${hair}"/>`;

  const bodyClothing = isFemale
    ? `<path d="M31 73l9 15 9-15z" fill="#f6efe0"/><path d="M31 73l9 15-5 12H20z M49 73l-9 15 5 12h15z" fill="${suit}" opacity="0"/>`
    : `<path d="M31 73l9 14 9-14z" fill="#f6efe0"/><path d="M38 80h4l2 18-4 2-4-2z" fill="${tie}"/><path d="M31 73l9 14-4 3-8-12zM49 73l-9 14 4 3 8-12z" fill="#fff" opacity=".85"/>`;

  const glassesSvg = glasses
    ? `<g fill="none" stroke="#3a2414" stroke-width="1.1"><circle cx="33.5" cy="43" r="5"/><circle cx="46.5" cy="43" r="5"/><path d="M38.5 43h3"/></g>`
    : "";

  return (
    <svg
      viewBox="0 0 80 100"
      className="w-full h-full block"
      role="img"
      aria-label={`Ảnh chân dung ${name}`}
      dangerouslySetInnerHTML={{
        __html: `
        <defs>
          <linearGradient id="pt_g${i}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="${bg}"/>
            <stop offset="1" stop-color="#b79a6e"/>
          </linearGradient>
        </defs>
        <rect width="80" height="100" fill="url(#pt_g${i})"/>
        ${backHair}
        <path d="M4 100c2-22 18-28 36-28s34 6 36 28z" fill="${suit}"/>
        ${bodyClothing}
        <rect x="34" y="57" width="12" height="18" rx="5" fill="${neck}"/>
        <ellipse cx="25.5" cy="44" rx="2.6" ry="4" fill="${skin}"/>
        <ellipse cx="54.5" cy="44" rx="2.6" ry="4" fill="${skin}"/>
        <ellipse cx="40" cy="42" rx="15" ry="18" fill="${skin}"/>
        ${topHair}
        <g stroke="${hair}" stroke-width="1.4" stroke-linecap="round">
          <path d="M31 38.5h5M44 38.5h5"/>
        </g>
        <circle cx="34" cy="43" r="1.5" fill="#2a1a12"/>
        <circle cx="46" cy="43" r="1.5" fill="#2a1a12"/>
        ${glassesSvg}
        <path d="M40 44l-1.5 6h3" fill="none" stroke="#b78760" stroke-width="1"/>
        <path d="M35.5 54.5q4.5 3 9 0" fill="none" stroke="#8a4a3a" stroke-width="1.3" stroke-linecap="round"/>
      `,
      }}
    />
  );
}

export function LawyersBookSection({ lang }: LawyersBookSectionProps) {
  const isZh = lang === "zh-CN";

  // Trạng thái lật trang: 0 = Bìa đóng, 1 = Mở trang 1-2, 2 = Mở trang 3-4, 3 = Trang cuối (跋)
  const [currentStep, setCurrentStep] = useState(0);
  const [scaleFactor, setScaleFactor] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const BOOK_W = 600;
  const BOOK_H = 760;
  const TOTAL_LEAVES = 3;

  const TAB_LABELS = [
    isZh ? "封面" : "Bìa sách",
    isZh ? "第一 – 二页" : "Trang 一 – 二",
    isZh ? "第三 – 四页" : "Trang 三 – 四",
    isZh ? "结语" : "Lời cuối",
  ];

  // Tự động tính toán tỷ lệ scale vừa vặn khung nhìn
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const k = Math.min(1.15, (w - 60) / (2 * BOOK_W), (h - 180) / BOOK_H);
      setScaleFactor(Math.max(0.35, k));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lật trang bằng phím mũi tên
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentStep((prev) => Math.min(TOTAL_LEAVES, prev + 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentStep((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const goToStep = (step: number) => {
    setCurrentStep(Math.max(0, Math.min(TOTAL_LEAVES, step)));
  };

  // Render một thẻ luật sư trong vở cổ trang
  const renderLawyerCard = (item: (typeof LAWYERS_DATA)[0], index: number) => {
    const detailUrl = `/${lang}/lawyers/${slugify(item.name)}`;

    return (
      <Link
        key={index}
        href={detailUrl}
        className="flex gap-3 items-start p-3 border-b border-[#8b3422]/35 odd:border-r hover:bg-[#b5362a]/10 transition-colors cursor-pointer group"
      >
        {/* Khung ảnh chân dung nghiêng cổ điển (.ph) */}
        <div className="relative shrink-0 w-[96px] h-[122px] p-1 bg-[#fbf3dc] border-[1.5px] border-[#8b3422] shadow-[2px_3px_6px_rgba(60,30,10,0.3)] group-hover:rotate-0 transition-transform">
          {renderPortrait(index, item.name)}
          {/* Con dấu triện đỏ vuông góc dưới (.sl) */}
          <span className="absolute -right-2 -bottom-2 w-7 h-7 bg-[#b5362a] text-[#fbeed0] font-chinese font-bold text-sm leading-7 text-center -rotate-4 shadow-[0_0_0_1.5px_rgba(251,238,208,0.8),1px_2px_3px_rgba(0,0,0,0.3)]">
            {item.zh[0]}
          </span>
        </div>

        {/* Thông tin (.inf) */}
        <div className="flex-1 min-w-0 font-serif">
          <div className="mb-1 leading-tight">
            <b className="block font-bold text-[15px] text-[#3a2414] group-hover:text-[#b5362a] transition-colors truncate">
              {item.name}
            </b>
            <i className="font-chinese font-semibold text-xs text-[#8b3422] tracking-wider not-italic">
              {item.zh}
            </i>
          </div>
          <p className="m-0 mb-1 text-xs font-semibold text-[#3a2414] leading-normal">{item.role}</p>
          <div className="text-xs text-[#6b4a30] italic leading-tight line-clamp-2">{item.focus}</div>
          <div className="flex gap-1 mt-2">
            {[...item.langs].map((c, i) => (
              <span
                key={i}
                className="border border-[#b5362a] text-[#b5362a] font-semibold text-[9px] px-1.5 py-0.2 tracking-wider"
              >
                {LANG_MAP[c]}
              </span>
            ))}
          </div>
        </div>
      </Link>
    );
  };

  // Render một trang sách (.pg)
  const renderBookPage = (groupIndex: number, pageNum: number, isRightPage: boolean) => {
    const group = GROUPS[groupIndex];
    const lawyers = LAWYERS_DATA.slice(groupIndex * 6, groupIndex * 6 + 6);

    return (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#f8e9c2,#f3e2b4_55%,#edd5a0)] p-6 select-none overflow-hidden font-serif">
        {/* Khung viền đỏ son đôi (.fr) */}
        <div className="absolute inset-3 border-2 border-[#8b3422]/75 pointer-events-none">
          <div className="absolute inset-1 border border-[#8b3422]/50" />
        </div>

        {/* Header trang (.hd2) */}
        <div className="flex justify-between items-baseline border-b-2 border-[#8b3422] mx-2 pt-2 pb-1.5 mb-2">
          <b className="font-bold text-lg text-[#3a2414]">{group.vi}</b>
          <i className="font-chinese font-bold text-lg text-[#b5362a] tracking-[4px] not-italic">
            {group.zh}
          </i>
        </div>

        {/* Lưới 6 luật sư (2 cột x 3 hàng) */}
        <div className="grid grid-cols-2 grid-rows-3 mx-2 h-[calc(100%-110px)]">
          {lawyers.map((item, idx) => renderLawyerCard(item, groupIndex * 6 + idx))}
        </div>

        {/* Số trang Hán tự ở chân trang (.pn) */}
        <div className="absolute bottom-5 left-0 right-0 text-center font-chinese font-semibold text-sm tracking-[3px] text-[#8b3422]">
          — {NUMERALS[pageNum]} —
        </div>

        {/* Góc gấp lật trang (.corner) */}
        <span
          role="button"
          tabIndex={0}
          aria-label={isRightPage ? "Lật trang sau" : "Lật trang trước"}
          onClick={(e) => {
            e.stopPropagation();
            goToStep(isRightPage ? currentStep + 1 : currentStep - 1);
          }}
          className={`absolute bottom-0 w-14 h-14 cursor-pointer z-20 hover:w-20 hover:h-20 transition-all ${
            isRightPage
              ? "right-0 bg-[linear-gradient(135deg,transparent_50%,rgba(120,80,30,0.35)_50%,#e8cf95_52%,#f7ebc6)]"
              : "left-0 bg-[linear-gradient(225deg,transparent_50%,rgba(120,80,30,0.35)_50%,#e8cf95_52%,#f7ebc6)]"
          }`}
        />
      </div>
    );
  };

  // Trang Lời cuối (Colophon / 跋)
  const renderColophonPage = () => (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#f8e9c2,#f3e2b4_55%,#edd5a0)] p-6 select-none font-serif">
      <div className="absolute inset-3 border-2 border-[#8b3422]/75 pointer-events-none">
        <div className="absolute inset-1 border border-[#8b3422]/50" />
      </div>

      <div className="flex flex-col items-center text-center px-6 pt-6">
        <div className="font-chinese text-8xl text-[#b5362a] mt-6 select-none leading-none">跋</div>
        <p className="font-bold text-lg text-[#3a2414] mt-2 mb-2 font-serif">Lời cuối</p>
        <p className="text-[14.5px] text-[#5a3a22] max-w-[420px] leading-relaxed mb-4">
          Mỗi luật sư trong cuốn danh bạ này đều làm việc trực tiếp bằng tiếng Việt, tiếng Trung hoặc cả hai. Hãy chọn người phù hợp nhất với vụ việc của bạn.
        </p>

        <dl className="text-left text-sm max-w-[380px] w-full border-t border-[#8b3422]/30 pt-3 space-y-2 text-[#3a2414]">
          <div>
            <dt className="font-bold text-xs uppercase tracking-wider text-[#8b3422]">Điện thoại hotline</dt>
            <dd className="font-semibold text-base mt-0.5">0900 123 456</dd>
          </div>
          <div>
            <dt className="font-bold text-xs uppercase tracking-wider text-[#8b3422]">Thư điện tử</dt>
            <dd className="font-semibold text-base mt-0.5">lienhe@vanichlaw.vn</dd>
          </div>
          <div>
            <dt className="font-bold text-xs uppercase tracking-wider text-[#8b3422]">Trụ sở chính</dt>
            <dd className="font-semibold text-sm mt-0.5">Tầng 12, Tòa nhà Landmark, Quận 1, TP. Hồ Chí Minh</dd>
          </div>
        </dl>

        {/* Con dấu đỏ Vạn Ích Luật Sở */}
        <div className="w-16 border-2 border-[#b5362a] text-[#b5362a] grid grid-cols-2 font-chinese font-bold text-base leading-tight text-center p-1 mt-6 -rotate-2 select-none opacity-90 shadow-sm">
          <span>万</span>
          <span>益</span>
          <span>律</span>
          <span>所</span>
        </div>

        <p className="text-[11px] text-[#5a3a22]/70 mt-4">© 2026 Luật Vạn Ích · 万益律师事务所</p>
      </div>

      <div className="absolute bottom-5 left-0 right-0 text-center font-chinese font-semibold text-sm tracking-[3px] text-[#8b3422]">
        — 终 —
      </div>

      {/* Góc lật về trang trước */}
      <span
        role="button"
        tabIndex={0}
        aria-label="Lật trang trước"
        onClick={() => goToStep(currentStep - 1)}
        className="absolute bottom-0 left-0 w-14 h-14 cursor-pointer z-20 hover:w-20 hover:h-20 transition-all bg-[linear-gradient(225deg,transparent_50%,rgba(120,80,30,0.35)_50%,#e8cf95_52%,#f7ebc6)]"
      />
    </div>
  );

  return (
    <section className="relative py-16 lg:py-24 bg-[repeating-linear-gradient(90deg,#c9ab80_0_7px,#bf9f72_7px_9px),#c4a477] overflow-hidden border-t-4 border-t-[#8b3422] shadow-inner">
      {/* Tiêu đề mục cuốn vở cổ trang */}
      <div className="text-center px-4 mb-4">
        <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#3a2414] tracking-[2px] mb-2 uppercase">
          {isZh ? "万益律师团队" : "Đội ngũ luật sư"}
        </h2>
        <span className="font-serif font-semibold text-xs tracking-[3px] uppercase text-[#5a3a22]">
          {isZh ? "涉外法律专家 · 万益律所" : "Chuyên gia pháp lý & Cố vấn cấp cao · Luật Vạn Ích"}
        </span>
      </div>

      {/* Khung chứa cuốn sách cổ 3D */}
      <div className="flex flex-col items-center justify-center relative w-full px-4">
        {/* Vùng fit scale */}
        <div
          ref={containerRef}
          style={{
            width: `${BOOK_W * 2 * scaleFactor}px`,
            height: `${BOOK_H * scaleFactor}px`,
          }}
          className="relative my-4"
        >
          {/* Tọa độ perspective scale */}
          <div
            style={{
              width: `${BOOK_W * 2}px`,
              height: `${BOOK_H}px`,
              transform: `scale(${scaleFactor})`,
              transformOrigin: "0 0",
              perspective: "2800px",
            }}
            className="absolute left-0 top-0"
          >
            {/* Đổ bóng nền cuốn sách */}
            <div className="absolute left-[5%] right-[5%] -bottom-7 h-10 bg-[radial-gradient(ellipse_at_center,rgba(40,20,5,0.45),transparent_70%)] filter blur-md" />

            {/* Khối Book 3D Container */}
            <div
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 1s cubic-bezier(0.5, 0.1, 0.2, 1)",
                transform:
                  currentStep === 0
                    ? "translateX(-25%)"
                    : currentStep === TOTAL_LEAVES
                    ? "translateX(25%)"
                    : "translateX(0)",
              }}
              className="absolute inset-0"
            >
              {/* Bìa sau cố định (.bc) */}
              <div
                style={{
                  width: `${BOOK_W}px`,
                  height: `${BOOK_H}px`,
                  transform: "translateZ(-4px)",
                }}
                className="absolute left-1/2 top-0 rounded-r bg-[linear-gradient(135deg,#1a2f86,#12236a)] shadow-2xl"
              />

              {/* TỜ 0: Bìa trước (Front Cover) & Trang 1 (Trang 一) */}
              <div
                style={{
                  width: `${BOOK_W}px`,
                  height: `${BOOK_H}px`,
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  transition: "transform 1.05s cubic-bezier(0.55, 0.05, 0.25, 1)",
                  transform: currentStep >= 1 ? "rotateY(-180deg)" : "rotateY(0deg)",
                  zIndex: currentStep >= 1 ? 1 : 30,
                }}
                className="absolute left-1/2 top-0"
              >
                {/* Mặt trước Tờ 0: Bìa sách xanh gấm chỉ trắng cổ (.cov.cloth) */}
                <div
                  onClick={() => goToStep(1)}
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                  className="absolute inset-0 rounded-r bg-[linear-gradient(135deg,#1a2f86,#12236a)] shadow-[6px_8px_24px_rgba(30,15,0,0.4)] cursor-pointer select-none overflow-hidden"
                >
                  {/* Đường chỉ khâu sách cổ điển (.st) */}
                  <svg className="absolute left-0 top-0 w-[70px] h-full pointer-events-none drop-shadow-[1px_1.5px_0_rgba(0,0,0,0.35)]" viewBox="0 0 70 760" preserveAspectRatio="none">
                    <g stroke="#f2f2ea" strokeWidth="3.4" fill="none" strokeLinecap="round">
                      <path d="M44 40V720" />
                      <path d="M0 40H44M0 170H44M0 370H44M0 530H44M0 720H44" />
                    </g>
                  </svg>

                  {/* Nhãn thẻ tên dán trên bìa (.lab) */}
                  <div className="absolute left-[240px] top-14 w-[210px] h-[600px] bg-[#f6ecd2] border border-[#1b1b1b] p-2 shadow-lg">
                    <div className="h-full border-[1.5px] border-[#1b1b1b] flex flex-col items-center justify-between py-6 bg-gradient-to-b from-[#fbf3dc] to-[#f1e4bf]">
                      <div className="flex flex-col items-center text-[#16227a] font-chinese font-bold text-5xl tracking-[10px] space-y-3 mt-4">
                        <span>万</span>
                        <span>益</span>
                        <span>律</span>
                        <span>师</span>
                        <span>名</span>
                        <span>录</span>
                      </div>
                      <span className="w-14 border-2 border-[#b5362a] text-[#b5362a] grid grid-cols-2 font-chinese font-bold text-base leading-tight text-center p-1 -rotate-2">
                        <span>万</span>
                        <span>益</span>
                        <span>律</span>
                        <span>所</span>
                      </span>
                    </div>
                  </div>

                  <span className="absolute left-0 right-0 bottom-8 text-center text-[#f6ecd2]/80 font-serif font-semibold text-xs tracking-[4px] uppercase">
                    Luật Vạn Ích
                  </span>
                  <span className="absolute right-6 top-6 text-[#f6ecd2]/80 font-serif font-semibold text-[11px] tracking-widest uppercase animate-pulse">
                    {isZh ? "轻触翻开名录" : "Chạm để mở"}
                  </span>
                </div>

                {/* Mặt sau Tờ 0: Trang 1 (Trang 一: Ban điều hành) */}
                <div
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                  className="absolute inset-0"
                >
                  {renderBookPage(0, 0, false)}
                </div>
              </div>

              {/* TỜ 1: Trang 2 (Trang 二) & Trang 3 (Trang 三) */}
              <div
                style={{
                  width: `${BOOK_W}px`,
                  height: `${BOOK_H}px`,
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  transition: "transform 1.05s cubic-bezier(0.55, 0.05, 0.25, 1)",
                  transform: currentStep >= 2 ? "rotateY(-180deg)" : "rotateY(0deg)",
                  zIndex: currentStep >= 2 ? 2 : 20,
                }}
                className="absolute left-1/2 top-0"
              >
                {/* Mặt trước Tờ 1: Trang 2 (Trang 二: Đầu tư & Doanh nghiệp) */}
                <div
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                  className="absolute inset-0"
                >
                  {renderBookPage(1, 1, true)}
                </div>

                {/* Mặt sau Tờ 1: Trang 3 (Trang 三: Hợp đồng & Lao động) */}
                <div
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                  className="absolute inset-0"
                >
                  {renderBookPage(2, 2, false)}
                </div>
              </div>

              {/* TỜ 2: Trang 4 (Trang 四) & Trang Lời cuối (跋) */}
              <div
                style={{
                  width: `${BOOK_W}px`,
                  height: `${BOOK_H}px`,
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  transition: "transform 1.05s cubic-bezier(0.55, 0.05, 0.25, 1)",
                  transform: currentStep >= 3 ? "rotateY(-180deg)" : "rotateY(0deg)",
                  zIndex: currentStep >= 3 ? 3 : 10,
                }}
                className="absolute left-1/2 top-0"
              >
                {/* Mặt trước Tờ 2: Trang 4 (Trang 四: Tranh tụng & Thu hồi nợ) */}
                <div
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                  className="absolute inset-0"
                >
                  {renderBookPage(3, 3, true)}
                </div>

                {/* Mặt sau Tờ 2: Lời cuối (Colophon / 跋) */}
                <div
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                  className="absolute inset-0"
                >
                  {renderColophonPage()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thanh nút điều khiển lật trang (.ctl) */}
        <div className="flex gap-3 items-center justify-center flex-wrap mt-8 font-serif">
          <button
            type="button"
            disabled={currentStep === 0}
            onClick={() => goToStep(0)}
            className="bg-[#f6ecd2] border-[1.5px] border-[#8b3422] text-[#3a2414] font-semibold text-xs sm:text-sm px-4 py-2 hover:bg-[#8b3422] hover:text-[#fbeed0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ⟲ {isZh ? "返回封面" : "Về bìa"}
          </button>
          <button
            type="button"
            disabled={currentStep === 0}
            onClick={() => goToStep(currentStep - 1)}
            className="bg-[#f6ecd2] border-[1.5px] border-[#8b3422] text-[#3a2414] font-semibold text-xs sm:text-sm px-4 py-2 hover:bg-[#8b3422] hover:text-[#fbeed0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            &larr; {isZh ? "上一页" : "Trang trước"}
          </button>
          <span className="min-w-[130px] text-center font-bold text-sm text-[#3a2414] px-2">
            {TAB_LABELS[currentStep]}
          </span>
          <button
            type="button"
            disabled={currentStep === TOTAL_LEAVES}
            onClick={() => goToStep(currentStep + 1)}
            className="bg-[#f6ecd2] border-[1.5px] border-[#8b3422] text-[#3a2414] font-semibold text-xs sm:text-sm px-4 py-2 hover:bg-[#8b3422] hover:text-[#fbeed0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {isZh ? "下一页" : "Trang sau"} &rarr;
          </button>
        </div>

        {/* Tab nhảy nhanh đến các trang */}
        <div className="flex gap-2 justify-center mt-3 flex-wrap font-serif">
          {TAB_LABELS.map((label, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goToStep(idx)}
              className={`border-b-2 font-semibold text-xs sm:text-[13px] px-3 py-1 cursor-pointer transition-colors ${
                currentStep === idx
                  ? "border-[#b5362a] text-[#b5362a]"
                  : "border-transparent text-[#4a2e18] hover:text-[#b5362a]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="text-xs text-[#5a3a22] text-center mt-3 font-serif italic">
          {isZh
            ? "💡 提示：点击封面打开名录，亦可使用键盘 ← → 翻页，或直接点击页面折角。"
            : "💡 Mẹo: Bấm vào bìa sách để mở, hoặc dùng phím ← → trên bàn phím. Bấm vào góc cong của trang để lật."}
        </p>
      </div>

      {/* Giao diện sổ phẳng cổ trang cho màn hình điện thoại (Mobile Responsive) */}
      <div className="block lg:hidden max-w-lg mx-auto px-4 mt-8 font-serif">
        <div className="text-center mb-6">
          <span className="inline-block bg-[#8b3422] text-[#fbeed0] font-chinese text-xs tracking-widest px-3 py-1">
            名录卷轴 · 24位涉外律师
          </span>
        </div>

        <div className="space-y-8">
          {GROUPS.map((grp, gIdx) => (
            <div key={gIdx} className="bg-[#fbf3dc] border-2 border-[#8b3422] p-4 shadow-md">
              <div className="flex justify-between items-baseline border-b-2 border-[#8b3422] pb-2 mb-3">
                <b className="font-bold text-lg text-[#3a2414]">{grp.vi}</b>
                <i className="font-chinese font-bold text-base text-[#b5362a] tracking-wider not-italic">
                  {grp.zh}
                </i>
              </div>

              <div className="divide-y divide-[#8b3422]/30">
                {LAWYERS_DATA.slice(gIdx * 6, gIdx * 6 + 6).map((item, idx) => {
                  const realIdx = gIdx * 6 + idx;
                  return (
                    <Link
                      key={realIdx}
                      href={`/${lang}/lawyers/${slugify(item.name)}`}
                      className="flex gap-3 items-center py-3 group"
                    >
                      <div className="w-16 h-20 shrink-0 border border-[#8b3422] p-0.5 bg-white shadow-sm relative">
                        {renderPortrait(realIdx, item.name)}
                        <span className="absolute -right-1 -bottom-1 w-5 h-5 bg-[#b5362a] text-[#fbeed0] font-chinese text-[11px] leading-5 text-center">
                          {item.zh[0]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <b className="block text-sm text-[#3a2414] group-hover:text-[#b5362a] transition-colors truncate">
                          {item.name} <span className="font-chinese text-xs text-[#8b3422] ml-1">{item.zh}</span>
                        </b>
                        <p className="text-xs text-[#5a3a22] m-0 mb-1">{item.role}</p>
                        <p className="text-[11px] text-[#7a4e2f] italic line-clamp-1 m-0">{item.focus}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
