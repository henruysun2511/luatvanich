"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SealStamp } from "@/components/ui/seal-stamp";

export function SideRail() {
  const [activeSection, setActiveSection] = useState("top");

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
    <aside className="fixed left-0 top-0 bottom-0 w-[84px] bg-[#06122b] hidden lg:flex flex-col items-center justify-between py-6 z-40 border-r border-[#c29a45]/35 select-none">
      <Link href="/#top" aria-label="Luật Vạn Ích">
        <SealStamp char="万" size="md" variant="gold" className="w-[46px] h-[46px] text-[25px]" />
      </Link>

      <nav className="flex flex-col gap-5 items-center">
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
            href={`/#${item.id}`}
            className={`flex flex-col items-center gap-1.5 text-[10.5px] font-sans font-medium tracking-wider transition-colors ${
              activeSection === item.id ? "text-[#f0d28a]" : "text-[#7f8aa6] hover:text-[#f0d28a]"
            }`}
          >
            <i className={`font-royal font-bold text-[15px] not-italic ${activeSection === item.id ? "border-b-2 border-[#c29a45] pb-0.5" : ""}`}>
              {item.num}
            </i>
            <span className="[writing-mode:vertical-rl] tracking-[2px] uppercase">{item.label}</span>
          </Link>
        ))}
      </nav>

      <a
        href="tel:0900123456"
        className="w-[42px] h-[42px] bg-[#a3171e] text-white grid place-items-center text-[17px] hover:scale-105 transition-transform"
        aria-label="Hotline"
      >
        ✆
      </a>
    </aside>
  );
}
