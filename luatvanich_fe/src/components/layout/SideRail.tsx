"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { SealStamp } from "@/components/ui/seal-stamp";
import { scrollToAnchor } from "@/lib/utils";
import { useSideRail } from "@/components/layout/SideRailContext";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

export function SideRail() {
  const { isOpen, toggleRail } = useSideRail();
  const [activeSection, setActiveSection] = useState("top");
  const [scrollProgress, setScrollProgress] = useState(0);
  const params = useParams();
  const pathname = usePathname();
  const lang = (params?.lang as string) || "vi";

  // Check if on homepage
  const isHome =
    pathname === `/${lang}` ||
    pathname === `/${lang}/` ||
    pathname === "/" ||
    pathname === "";

  // Page title mapping for subpages
  let pageTitle = "Luật Vạn Ích";
  if (pathname === `/${lang}/services` || pathname.includes("/legal-services")) {
    pageTitle = lang === "zh-CN" ? "法律服务" : "Dịch vụ pháp lý";
  } else if (pathname.includes("/corridor")) {
    pageTitle = "Hành lang Trung – Việt";
  } else if (pathname.includes("/posts")) {
    pageTitle = "Tiêu điểm luật";
  } else if (pathname.includes("/offices")) {
    pageTitle = "Văn phòng đại diện";
  } else if (pathname.includes("/about")) {
    pageTitle = "Về Vạn Ích";
  } else if (pathname.includes("/lawyers")) {
    pageTitle = pathname.split("/lawyers/")[1] ? "Hồ sơ luật sư" : "Danh sách luật sư";
  }

  // Scroll progress handler
  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const totalScroll = h.scrollHeight - h.clientHeight;
      if (totalScroll > 0) {
        const p = Math.min(Math.max((h.scrollTop / totalScroll) * 100, 0), 100);
        setScrollProgress(p);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Observer for homepage anchors
  useEffect(() => {
    if (!isHome) return;

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
  }, [isHome]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (scrollToAnchor(e, targetId)) {
      setActiveSection(targetId);
    }
  };

  return (
    <>
      {/* Thanh đo tiến trình cuộn trên đỉnh (Progress Bar .pb) */}
      <div
        className={`fixed top-0 right-0 h-[3px] z-[90] pointer-events-none transition-[left] duration-300 ease-in-out ${
          isOpen ? "left-0 lg:left-[84px]" : "left-0"
        }`}
      >
        <div
          className="h-full bg-gradient-to-r from-[#a3171e] via-[#c29a45] to-[#f0d28a] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Thanh Rail bên trái (.rail) - hỗ trợ trượt ẩn/hiện */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-[84px] bg-[#06122b] hidden lg:flex flex-col items-center justify-between py-[22px] z-40 border-r border-[#c29a45]/35 select-none transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Con dấu đỉnh Vạn */}
        <Link
          href={`/${lang}#top`}
          onClick={(e) => isHome && handleNavClick(e, "top")}
          aria-label="Về trang chủ"
          className="transition-transform hover:scale-105"
        >
          <SealStamp char="万" size="md" variant="gold" className="w-[46px] h-[46px] text-[25px]" />
        </Link>

        {isHome ? (
          /* Danh sách anchor sections khi ở trang chủ */
          <nav className="flex flex-col gap-5 items-center my-auto">
            {[
              { id: "linhvuc", num: "01", label: "Lĩnh vực" },
              { id: "thuatngu", num: "02", label: "Thuật ngữ" },
              { id: "quytrinh", num: "03", label: "Quy trình" },
              { id: "doingu", num: "04", label: "Đội ngũ" },
              { id: "gocnhin", num: "05", label: "Góc nhìn" },
              { id: "lienhe", num: "06", label: "Liên hệ" },
            ].map((item) => (
              <Link
                key={item.id}
                href={`/${lang}#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`flex flex-col items-center gap-1.5 text-[10.5px] font-sans font-medium tracking-wider transition-colors ${
                  activeSection === item.id ? "text-[#f0d28a]" : "text-[#7f8aa6] hover:text-[#f0d28a]"
                }`}
              >
                <i
                  className={`font-royal font-bold text-[15px] not-italic ${
                    activeSection === item.id ? "border-b-2 border-[#c29a45] pb-0.5" : ""
                  }`}
                >
                  {item.num}
                </i>
                <span className="[writing-mode:vertical-rl] tracking-[2px] uppercase">{item.label}</span>
              </Link>
            ))}
          </nav>
        ) : (
          /* Nhãn trang dạng đứng và vạch cuộn dọc khi ở trang con (.rm) */
          <div className="flex-1 flex flex-col items-center justify-center gap-[18px] py-[26px]">
            <span className="[writing-mode:vertical-rl] text-[#f0d28a] font-semibold text-[11px] font-sans tracking-[4px] uppercase select-none">
              {pageTitle}
            </span>
            <div className="flex-1 w-[2px] bg-white/15 relative min-h-[60px] rounded-full overflow-hidden">
              <i
                className="absolute left-0 top-0 w-full bg-gradient-to-b from-[#f0d28a] to-[#a3171e] transition-all duration-75 not-italic"
                style={{ height: `${scrollProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Nút Toggle thu gọn thanh rail ở chân rail */}
        <button
          type="button"
          onClick={toggleRail}
          aria-label="Thu gọn thanh rail"
          title="Thu gọn thanh rail"
          className="w-[42px] h-[42px] flex items-center justify-center text-[#c29a45] hover:text-[#f0d28a] transition-colors cursor-pointer group"
        >
          <PanelLeftClose className="size-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>
      </aside>

      {/* Nút Toggle mở lại thanh rail khi rail đang bị ẩn */}
      {!isOpen && (
        <button
          type="button"
          onClick={toggleRail}
          aria-label="Mở rộng thanh rail"
          title="Mở rộng thanh rail"
          className="fixed left-2 bottom-6 w-10 h-10 text-[#c29a45] hover:text-[#f0d28a] hidden lg:flex items-center justify-center z-50 transition-all cursor-pointer group hover:scale-110 drop-shadow-md"
        >
          <PanelLeftOpen className="size-7 group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}
    </>
  );
}
