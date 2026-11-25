"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { SealStamp } from "@/components/ui/seal-stamp";
import { scrollToAnchor } from "@/lib/utils";

export function SideRail() {
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
  if (pathname.includes("/legal-services")) {
    pageTitle = "Dịch vụ pháp lý";
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
      <div className="fixed top-0 left-0 lg:left-[84px] right-0 h-[3px] z-[90] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#a3171e] via-[#c29a45] to-[#f0d28a] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Thanh Rail bên trái (.rail) */}
      <aside className="fixed left-0 top-0 bottom-0 w-[84px] bg-[#06122b] hidden lg:flex flex-col items-center justify-between py-[22px] z-40 border-r border-[#c29a45]/35 select-none">
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

        {/* Nút gọi hotline ở chân rail (.tel) */}
        <a
          href="tel:0900123456"
          aria-label="Gọi hotline"
          className="w-[42px] h-[42px] bg-[#a3171e] hover:bg-[#c4252c] text-white flex items-center justify-center text-[17px] transition-colors shadow-md"
        >
          ✆
        </a>
      </aside>
    </>
  );
}
