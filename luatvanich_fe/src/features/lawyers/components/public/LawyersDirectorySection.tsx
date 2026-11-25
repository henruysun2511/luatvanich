"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, X, Grid, List, PhoneCall, Calendar } from "lucide-react";

interface LawyersDirectorySectionProps {
  lang: string;
}

interface RawLawyer {
  i: number;
  n: string;
  z: string;
  r: string;
  l: string;
  f: string;
  o: "hcm" | "hn" | "dn";
  y: number;
  a: "dt" | "hd" | "tt" | "ld" | "ma";
  g: "m" | "f";
}

const RAW_LAWYERS: RawLawyer[] = [
  { i: 0, n: "Nguyễn Minh Hoàng", z: "阮明皇", r: "Luật sư điều hành", l: "VCE", f: "Đầu tư, M&A", o: "hcm", y: 15, a: "dt", g: "m" },
  { i: 1, n: "Trần Thu Hà", z: "陈秋河", r: "Luật sư thành viên", l: "VC", f: "Hợp đồng song ngữ", o: "hcm", y: 12, a: "hd", g: "f" },
  { i: 2, n: "Lê Quốc Bảo", z: "黎国宝", r: "Luật sư thành viên", l: "VE", f: "Tranh tụng, trọng tài", o: "hcm", y: 13, a: "tt", g: "m" },
  { i: 3, n: "Phạm Ngọc Lan", z: "范玉兰", r: "Luật sư thành viên", l: "VC", f: "Thu hồi công nợ", o: "hn", y: 11, a: "tt", g: "f" },
  { i: 4, n: "Đỗ Hồng Ngọc", z: "杜红玉", r: "Luật sư thành viên", l: "VC", f: "Sở hữu trí tuệ", o: "hn", y: 10, a: "dt", g: "f" },
  { i: 5, n: "Vũ Đức Anh", z: "武德英", r: "Luật sư thành viên", l: "VCE", f: "M&A, thuế", o: "hcm", y: 12, a: "ma", g: "m" },
  { i: 6, n: "Hoàng Thị Mai", z: "黄氏梅", r: "Luật sư", l: "VC", f: "Thành lập doanh nghiệp", o: "hcm", y: 8, a: "dt", g: "f" },
  { i: 7, n: "Phan Văn Khải", z: "潘文凯", r: "Luật sư", l: "VCE", f: "Đầu tư nước ngoài", o: "hn", y: 9, a: "dt", g: "m" },
  { i: 8, n: "Bùi Thanh Tùng", z: "裴青松", r: "Luật sư", l: "VC", f: "Cấp phép đầu tư", o: "dn", y: 7, a: "dt", g: "m" },
  { i: 9, n: "Đặng Khánh Linh", z: "邓庆玲", r: "Luật sư", l: "VE", f: "Quản trị doanh nghiệp", o: "hcm", y: 8, a: "dt", g: "f" },
  { i: 10, n: "Ngô Gia Huy", z: "吴嘉辉", r: "Chuyên viên pháp lý", l: "VC", f: "Hồ sơ doanh nghiệp", o: "hcm", y: 4, a: "dt", g: "m" },
  { i: 11, n: "Lý Thảo Vy", z: "李草薇", r: "Chuyên viên pháp lý", l: "VC", f: "Chủ sở hữu hưởng lợi", o: "hn", y: 3, a: "dt", g: "f" },
  { i: 12, n: "Trương Minh Châu", z: "张明珠", r: "Luật sư", l: "VC", f: "Soạn thảo hợp đồng", o: "hcm", y: 9, a: "hd", g: "f" },
  { i: 13, n: "Đinh Quang Vinh", z: "丁光荣", r: "Luật sư", l: "VCE", f: "Hợp đồng thương mại", o: "hn", y: 10, a: "hd", g: "m" },
  { i: 14, n: "Dương Bảo Ngọc", z: "杨宝玉", r: "Luật sư", l: "VC", f: "Đối chiếu song ngữ", o: "hcm", y: 7, a: "hd", g: "f" },
  { i: 15, n: "Mai Thu Trang", z: "梅秋庄", r: "Luật sư", l: "VC", f: "Lao động, nhân sự", o: "dn", y: 8, a: "ld", g: "f" },
  { i: 16, n: "Hồ Đức Thịnh", z: "胡德盛", r: "Chuyên viên pháp lý", l: "VC", f: "Giấy phép lao động", o: "hcm", y: 4, a: "ld", g: "m" },
  { i: 17, n: "Lương Yến Nhi", z: "梁燕儿", r: "Chuyên viên pháp lý", l: "VC", f: "Nội quy lao động", o: "hn", y: 3, a: "ld", g: "f" },
  { i: 18, n: "Cao Văn Hùng", z: "高文雄", r: "Luật sư tranh tụng", l: "VE", f: "Tòa án, trọng tài", o: "hcm", y: 14, a: "tt", g: "m" },
  { i: 19, n: "Võ Thị Hạnh", z: "武氏幸", r: "Luật sư", l: "VC", f: "Thu hồi công nợ", o: "hcm", y: 8, a: "tt", g: "f" },
  { i: 20, n: "Chu Minh Đạt", z: "朱明达", r: "Luật sư", l: "VC", f: "Thi hành án", o: "hn", y: 9, a: "tt", g: "m" },
  { i: 21, n: "Tạ Phương Anh", z: "谢芳英", r: "Luật sư", l: "VCE", f: "Tranh chấp thương mại", o: "dn", y: 9, a: "tt", g: "f" },
  { i: 22, n: "Lâm Quốc Việt", z: "林国越", r: "Chuyên viên pháp lý", l: "VC", f: "Chứng cứ, vi bằng", o: "hcm", y: 4, a: "tt", g: "m" },
  { i: 23, n: "Kiều Thanh Hà", z: "乔清河", r: "Chuyên viên pháp lý", l: "VC", f: "Hồ sơ tố tụng", o: "hn", y: 3, a: "tt", g: "f" },
];

const AREA_MAP: Record<string, { vi: string; zh: string }> = {
  dt: { vi: "Đầu tư & doanh nghiệp", zh: "投资与企业" },
  hd: { vi: "Hợp đồng song ngữ", zh: "双语合同" },
  tt: { vi: "Tranh tụng & thu hồi nợ", zh: "诉讼与债务催收" },
  ld: { vi: "Lao động & nhân sự", zh: "劳动与人事" },
  ma: { vi: "M&A & thuế", zh: "并购与税务" },
};

const LANG_MAP: Record<string, { vi: string; zh: string; badge: string }> = {
  V: { vi: "Tiếng Việt", zh: "越南语", badge: "VI" },
  C: { vi: "Tiếng Trung (中文)", zh: "中文", badge: "中文" },
  E: { vi: "Tiếng Anh", zh: "英语", badge: "EN" },
};

const OFFICE_MAP: Record<string, { vi: string; zh: string }> = {
  hcm: { vi: "TP. Hồ Chí Minh", zh: "胡志明市" },
  hn: { vi: "Hà Nội", zh: "河内" },
  dn: { vi: "Đà Nẵng", zh: "岘港" },
};

const ROLES = [
  "Luật sư điều hành",
  "Luật sư thành viên",
  "Luật sư tranh tụng",
  "Luật sư",
  "Chuyên viên pháp lý",
];

const HR_COLORS = ["#1b1718", "#2a1c16", "#3a2a22", "#161214"];

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Hàm vẽ ảnh SVG chân dung
function renderLawyerBust(lawyer: RawLawyer) {
  const h = HR_COLORS[lawyer.i % 4];
  const isMale = lawyer.g === "m";

  return (
    <svg viewBox="0 0 100 125" preserveAspectRatio="xMidYMin slice" className="w-full h-full block" aria-hidden="true">
      <defs>
        <linearGradient id={`dir_b${lawyer.i}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2c4a88" />
          <stop offset="100%" stopColor="#0b1d3f" />
        </linearGradient>
      </defs>
      <rect width="100" height="125" fill={`url(#dir_b${lawyer.i})`} />
      <circle cx="50" cy="52" r="40" fill="#f0d28a" opacity="0.12" />
      {!isMale && (
        <path d="M28 62c-7-34 11-48 22-48s29 14 22 48v30H28z" fill={h} />
      )}
      <path d="M6 125c0-30 16-42 44-44 28 2 44 14 44 44z" fill="#0d121c" />
      <path d="M38 82l-10 43M62 82l10 43" stroke="#f0d28a" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M38 82l12 16 12-16v14l-12 29-12-29z" fill="#f3f5f9" />
      <path d="M47 96h6l3 29h-12z" fill="#a3171e" />
      <ellipse cx="50" cy="52" rx="15" ry="19" fill="#e0b293" />
      <path d="M34 48c-2-20 32-20 32 0-6-9-26-9-32 0z" fill={h} />
    </svg>
  );
}

export function LawyersDirectorySection({ lang }: LawyersDirectorySectionProps) {
  const isZh = lang === "zh";

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [selectedOffices, setSelectedOffices] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"az" | "exp">("az");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(9);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Toggle filter helper
  const toggleItem = (list: string[], item: string, setter: (val: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter((x) => x !== item));
    } else {
      setter([...list, item]);
    }
  };

  const handleResetFilters = () => {
    setSelectedAreas([]);
    setSelectedLangs([]);
    setSelectedOffices([]);
    setSelectedRoles([]);
    setSearchQuery("");
  };

  // Filter and Sort Data
  const filteredLawyers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = RAW_LAWYERS.filter((item) => {
      // Area match
      if (selectedAreas.length > 0 && !selectedAreas.includes(item.a)) {
        return false;
      }
      // Langs match (must have all selected langs)
      if (selectedLangs.length > 0 && !selectedLangs.every((c) => item.l.includes(c))) {
        return false;
      }
      // Office match
      if (selectedOffices.length > 0 && !selectedOffices.includes(item.o)) {
        return false;
      }
      // Role match
      if (selectedRoles.length > 0 && !selectedRoles.includes(item.r)) {
        return false;
      }
      // Query match (name, chinese name, or focus area)
      if (q) {
        const fullStr = `${item.n} ${item.z} ${item.f}`.toLowerCase();
        if (!fullStr.includes(q)) return false;
      }
      return true;
    });

    // Sorting
    list.sort((a, b) => {
      if (sortBy === "az") {
        const lastNameA = a.n.split(" ").pop() || a.n;
        const lastNameB = b.n.split(" ").pop() || b.n;
        return lastNameA.localeCompare(lastNameB, "vi") || a.n.localeCompare(b.n, "vi");
      }
      return b.y - a.y; // Experience desc
    });

    return list;
  }, [searchQuery, selectedAreas, selectedLangs, selectedOffices, selectedRoles, sortBy]);

  const activeFiltersCount =
    selectedAreas.length + selectedLangs.length + selectedOffices.length + selectedRoles.length;

  return (
    <section className="bg-[#fbf9f4] text-[#121c2d] py-16 lg:py-24 border-t border-[#e2dbce]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        
        {/* Section Header & Search bar */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#e2dbce]">
            <div>
              <div className="inline-flex items-center gap-2 text-[#a3171e] text-xs font-bold tracking-[3px] uppercase mb-2">
                <span className="font-chinese text-sm">律所人才</span>
                <span>{isZh ? "高级律师团队" : "Hồ sơ & Tra cứu"}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0b1d3f]">
                {isZh ? "全方位律师名录检索" : "Tra cứu danh bạ luật sư"}
              </h2>
              <p className="text-[#62708d] text-sm sm:text-base mt-2 max-w-2xl">
                {isZh
                  ? "支持按执业领域、中英越语言能力、所属分所与职务筛选，快速预约适合您事务的专业律师。"
                  : "Lọc theo lĩnh vực chuyên môn, ngôn ngữ làm việc, văn phòng và số năm kinh nghiệm để tìm luật sư phù hợp nhất."}
              </p>
            </div>

            {/* Quick Search Input */}
            <div className="w-full md:w-80 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isZh ? "搜索姓名、汉字、专业领域..." : "Tìm tên, chữ Hán, lĩnh vực..."}
                className="w-full pl-10 pr-4 py-3 bg-white border border-[#d6cdbd] focus:border-[#a3171e] focus:outline-none text-sm text-[#121c2d] shadow-sm rounded-none"
              />
              <Search className="w-4 h-4 text-[#8a96a3] absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Grid: Sidebar + Results */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 items-start">
          
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden flex justify-between items-center bg-white p-4 border border-[#e2dbce]">
            <span className="text-sm font-semibold text-[#0b1d3f]">
              {isZh ? `找到 ${filteredLawyers.length} 位律师` : `Tìm thấy ${filteredLawyers.length} luật sư`}
            </span>
            <button
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="inline-flex items-center gap-2 bg-[#0b1d3f] text-[#f0d28a] px-4 py-2 text-xs font-semibold uppercase tracking-wider"
            >
              <Filter className="w-4 h-4" />
              {isZh ? "筛选条件" : "Bộ lọc"} {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
          </div>

          {/* Sidebar Filter Component */}
          <aside
            className={`bg-white border border-[#e2dbce] border-t-4 border-t-[#a3171e] p-6 shadow-sm sticky top-24 ${
              mobileFilterOpen ? "block" : "hidden lg:block"
            }`}
          >
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#e2dbce]">
              <h3 className="font-serif font-bold text-xl text-[#0b1d3f]">
                {isZh ? "筛选条件" : "Bộ lọc"}
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-[#a3171e] hover:underline font-semibold"
                >
                  {isZh ? "清空全部" : "Xóa lọc"}
                </button>
              )}
            </div>

            {/* Filter Group: Lĩnh vực */}
            <div className="py-4 border-b border-[#e2dbce]">
              <h4 className="text-[11px] font-bold text-[#a3171e] uppercase tracking-[2px] mb-3">
                {isZh ? "执业领域" : "Lĩnh vực chuyên môn"}
              </h4>
              <div className="space-y-2">
                {Object.entries(AREA_MAP).map(([key, val]) => {
                  const count = RAW_LAWYERS.filter((x) => x.a === key).length;
                  const isChecked = selectedAreas.includes(key);
                  return (
                    <label key={key} className="flex items-center justify-between text-sm text-[#27324a] cursor-pointer hover:text-[#a3171e]">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleItem(selectedAreas, key, setSelectedAreas)}
                          className="w-4 h-4 accent-[#a3171e] rounded-none cursor-pointer"
                        />
                        <span>{isZh ? val.zh : val.vi}</span>
                      </div>
                      <span className="text-xs text-[#8a96a3]">({count})</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Filter Group: Ngôn ngữ */}
            <div className="py-4 border-b border-[#e2dbce]">
              <h4 className="text-[11px] font-bold text-[#a3171e] uppercase tracking-[2px] mb-3">
                {isZh ? "工作语言" : "Ngôn ngữ làm việc"}
              </h4>
              <div className="space-y-2">
                {Object.entries(LANG_MAP).map(([key, val]) => {
                  const count = RAW_LAWYERS.filter((x) => x.l.includes(key)).length;
                  const isChecked = selectedLangs.includes(key);
                  return (
                    <label key={key} className="flex items-center justify-between text-sm text-[#27324a] cursor-pointer hover:text-[#a3171e]">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleItem(selectedLangs, key, setSelectedLangs)}
                          className="w-4 h-4 accent-[#a3171e] rounded-none cursor-pointer"
                        />
                        <span>{isZh ? val.zh : val.vi}</span>
                      </div>
                      <span className="text-xs text-[#8a96a3]">({count})</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Filter Group: Văn phòng */}
            <div className="py-4 border-b border-[#e2dbce]">
              <h4 className="text-[11px] font-bold text-[#a3171e] uppercase tracking-[2px] mb-3">
                {isZh ? "所属分所" : "Văn phòng làm việc"}
              </h4>
              <div className="space-y-2">
                {Object.entries(OFFICE_MAP).map(([key, val]) => {
                  const count = RAW_LAWYERS.filter((x) => x.o === key).length;
                  const isChecked = selectedOffices.includes(key);
                  return (
                    <label key={key} className="flex items-center justify-between text-sm text-[#27324a] cursor-pointer hover:text-[#a3171e]">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleItem(selectedOffices, key, setSelectedOffices)}
                          className="w-4 h-4 accent-[#a3171e] rounded-none cursor-pointer"
                        />
                        <span>{isZh ? val.zh : val.vi}</span>
                      </div>
                      <span className="text-xs text-[#8a96a3]">({count})</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Filter Group: Chức danh */}
            <div className="pt-4">
              <h4 className="text-[11px] font-bold text-[#a3171e] uppercase tracking-[2px] mb-3">
                {isZh ? "职务职称" : "Chức danh luật sư"}
              </h4>
              <div className="space-y-2">
                {ROLES.map((role) => {
                  const count = RAW_LAWYERS.filter((x) => x.r === role).length;
                  const isChecked = selectedRoles.includes(role);
                  return (
                    <label key={role} className="flex items-center justify-between text-sm text-[#27324a] cursor-pointer hover:text-[#a3171e]">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleItem(selectedRoles, role, setSelectedRoles)}
                          className="w-4 h-4 accent-[#a3171e] rounded-none cursor-pointer"
                        />
                        <span>{role}</span>
                      </div>
                      <span className="text-xs text-[#8a96a3]">({count})</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Result Content */}
          <div>
            {/* Top Bar: Counter, Sorting, Layout switch */}
            <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-4 border border-[#e2dbce] mb-6">
              <span className="text-sm text-[#62708d]">
                {isZh ? (
                  <>显示 <b>{Math.min(visibleCount, filteredLawyers.length)}</b> / <b>{filteredLawyers.length}</b> 位律师</>
                ) : (
                  <>Hiển thị <b>{Math.min(visibleCount, filteredLawyers.length)}</b> / <b>{filteredLawyers.length}</b> luật sư</>
                )}
              </span>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#62708d]">
                  <span>{isZh ? "排序" : "Sắp xếp"}</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "az" | "exp")}
                    className="border border-[#e2dbce] bg-white px-2.5 py-1.5 text-xs text-[#121c2d] focus:outline-none cursor-pointer"
                  >
                    <option value="az">{isZh ? "姓名 A–Z" : "Tên A–Z"}</option>
                    <option value="exp">{isZh ? "从业经验" : "Số năm kinh nghiệm"}</option>
                  </select>
                </div>

                {/* View Mode */}
                <div className="flex border border-[#e2dbce]">
                  <button
                    type="button"
                    aria-label="Dạng lưới"
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 ${viewMode === "grid" ? "bg-[#0b1d3f] text-[#f0d28a]" : "bg-white text-gray-500 hover:text-gray-800"}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Dạng danh sách"
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 ${viewMode === "list" ? "bg-[#0b1d3f] text-[#f0d28a]" : "bg-white text-gray-500 hover:text-gray-800"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {filteredLawyers.length === 0 && (
              <div className="bg-white border border-[#e2dbce] text-center py-16 px-4">
                <p className="text-lg text-[#62708d] font-serif">
                  {isZh
                    ? "未找到匹配条件的律师。请尝试清除或放宽筛选条件。"
                    : "Không tìm thấy luật sư phù hợp với bộ lọc. Vui lòng bỏ bớt điều kiện hoặc tìm kiếm khác."}
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 inline-block bg-[#0b1d3f] text-[#f0d28a] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-[#a3171e] transition-colors"
                >
                  {isZh ? "重置所有条件" : "Xóa tất cả bộ lọc"}
                </button>
              </div>
            )}

            {/* Grid / List Cards */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredLawyers.slice(0, visibleCount).map((lawyer) => {
                const lawyerSlug = slugify(lawyer.n);
                const detailHref = `/${lang}/lawyers/${lawyerSlug}`;

                if (viewMode === "list") {
                  return (
                    <article
                      key={lawyer.i}
                      className="bg-white border border-[#e2dbce] flex flex-col sm:flex-row hover:border-[#c29a45] hover:shadow-lg transition-all"
                    >
                      <Link
                        href={detailHref}
                        className="w-full sm:w-44 h-48 sm:h-auto shrink-0 relative overflow-hidden bg-[#0b1d3f] border-b sm:border-b-0 sm:border-r-2 border-r-[#c29a45] block group"
                      >
                        {renderLawyerBust(lawyer)}
                        <span className="absolute right-2 bottom-2 w-7 h-7 bg-[#a3171e] text-[#fbeed0] font-chinese text-sm leading-7 text-center shadow-md">
                          {lawyer.z[0]}
                        </span>
                      </Link>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h3 className="font-serif text-2xl font-bold text-[#0b1d3f]">
                              <Link href={detailHref} className="hover:text-[#a3171e] transition-colors">
                                {lawyer.n}
                              </Link>
                            </h3>
                            <span className="font-chinese text-sm font-bold text-[#a3171e] tracking-wider">
                              {lawyer.z}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-[#8a96a3] uppercase tracking-wider mt-0.5">
                            {lawyer.r} · {OFFICE_MAP[lawyer.o][isZh ? "zh" : "vi"]} · {lawyer.y} {isZh ? "年经验" : "năm kinh nghiệm"}
                          </p>

                          {/* Badges */}
                          <div className="flex gap-1.5 my-2.5">
                            {[...lawyer.l].map((c) => (
                              <span
                                key={c}
                                className="border border-[#c29a45] text-[#8e6d23] text-[10px] font-bold px-1.5 py-0.5 tracking-wider uppercase"
                              >
                                {LANG_MAP[c].badge}
                              </span>
                            ))}
                          </div>

                          <p className="text-sm text-[#4b5563] italic">
                            {isZh ? `专长领域：${lawyer.f}` : `Lĩnh vực: ${lawyer.f}`}
                          </p>
                        </div>

                        <div className="flex gap-2.5 mt-4 pt-3 border-t border-[#f0ebe0]">
                          <Link
                            href={detailHref}
                            className="bg-gradient-to-b from-[#c4252c] to-[#8f1218] text-white text-xs font-semibold uppercase tracking-wider px-4 py-2 hover:brightness-110 transition-all text-center flex-1"
                          >
                            {isZh ? "查看详情" : "Xem hồ sơ"}
                          </Link>
                          <a
                            href="#lienhe-cta"
                            className="border border-[#a3171e] text-[#a3171e] hover:bg-[#a3171e] hover:text-white text-xs font-semibold uppercase tracking-wider px-3 py-2 transition-all text-center"
                          >
                            {isZh ? "预约咨询" : "Đặt lịch"}
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                }

                // Grid Card
                return (
                  <article
                    key={lawyer.i}
                    className="bg-white border border-[#e2dbce] flex flex-col hover:border-[#c29a45] hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <Link
                      href={detailHref}
                      className="relative block aspect-[4/3] overflow-hidden bg-[#0b1d3f] border-b-2 border-b-[#c29a45] group"
                    >
                      {renderLawyerBust(lawyer)}
                      <span className="absolute right-3 bottom-3 w-8 h-8 bg-[#a3171e] text-[#fbeed0] font-chinese font-bold text-base leading-8 text-center shadow-md">
                        {lawyer.z[0]}
                      </span>
                    </Link>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="font-serif text-xl font-bold text-[#0b1d3f]">
                            <Link href={detailHref} className="hover:text-[#a3171e] transition-colors">
                              {lawyer.n}
                            </Link>
                          </h3>
                          <span className="font-chinese text-xs font-bold text-[#a3171e] tracking-widest">
                            {lawyer.z}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#8a96a3] uppercase tracking-wider mt-0.5">
                          {lawyer.r}
                        </p>

                        {/* Badges */}
                        <div className="flex gap-1.5 my-3">
                          {[...lawyer.l].map((c) => (
                            <span
                              key={c}
                              className="border border-[#c29a45] text-[#8e6d23] text-[10px] font-bold px-1.5 py-0.5 tracking-wider uppercase"
                            >
                              {LANG_MAP[c].badge}
                            </span>
                          ))}
                        </div>

                        <p className="text-xs text-[#4b5563] italic line-clamp-2">
                          {lawyer.f}
                        </p>
                        <p className="text-[11px] text-[#8a96a3] mt-2">
                          {OFFICE_MAP[lawyer.o][isZh ? "zh" : "vi"]} · {lawyer.y} {isZh ? "年经验" : "năm kinh nghiệm"}
                        </p>
                      </div>

                      <div className="flex gap-2 mt-5 pt-3 border-t border-[#f0ebe0]">
                        <Link
                          href={detailHref}
                          className="bg-gradient-to-b from-[#c4252c] to-[#8f1218] text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-2 hover:brightness-110 transition-all text-center flex-1"
                        >
                          {isZh ? "Xem hồ sơ" : "Xem hồ sơ"}
                        </Link>
                        <a
                          href="#lienhe-cta"
                          className="border border-[#a3171e] text-[#a3171e] hover:bg-[#a3171e] hover:text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-2 transition-all text-center"
                        >
                          {isZh ? "Đặt lịch" : "Đặt lịch"}
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Load More Button */}
            {visibleCount < filteredLawyers.length && (
              <div className="text-center mt-10">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="bg-gradient-to-b from-[#c4252c] to-[#8f1218] text-white text-xs font-semibold uppercase tracking-widest px-8 py-3.5 shadow-md hover:brightness-110 transition-all"
                >
                  {isZh ? "查看更多律师" : "Xem thêm luật sư"} ({filteredLawyers.length - visibleCount})
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Section Ghép luật sư phù hợp (matchmaker box) */}
        <div className="mt-20 bg-white border border-[#e2dbce] border-l-4 border-l-[#c29a45] p-8 md:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-[#a3171e] text-xs font-bold uppercase tracking-[2px]">
              {isZh ? "智能匹配 · 法律咨询" : "Tư vấn nhanh · Chưa biết chọn ai?"}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0b1d3f] mt-1 mb-2">
              {isZh ? "让我们为您推荐最合适的专案律师" : "Để chúng tôi ghép luật sư phù hợp với bạn"}
            </h3>
            <p className="text-sm text-[#62708d]">
              {isZh
                ? "简要描述您的案件需求，我们将在24个工作小时内为您指派主办律师及双语支持团队。"
                : "Mô tả ngắn gọn vụ việc hoặc nhu cầu pháp lý, Vạn Ích sẽ sắp xếp luật sư am hiểu sâu nhất phụ trách và phản hồi trong 24 giờ làm việc."}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a
              href="#lienhe-cta"
              className="inline-flex items-center gap-2 bg-gradient-to-b from-[#c4252c] to-[#8f1218] text-white text-xs font-semibold uppercase tracking-wider px-6 py-3.5 shadow-md hover:brightness-110 transition-all"
            >
              <Calendar className="w-4 h-4" />
              {isZh ? "预约咨询" : "Đặt lịch tư vấn"}
            </a>
            <Link
              href={`/${lang}/offices`}
              className="inline-flex items-center gap-2 border border-[#0b1d3f] text-[#0b1d3f] hover:bg-[#0b1d3f] hover:text-[#f0d28a] text-xs font-semibold uppercase tracking-wider px-6 py-3.5 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              {isZh ? "查看各地分所" : "Xem văn phòng"}
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
