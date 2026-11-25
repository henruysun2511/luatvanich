"use client";

import React from "react";
import { useSideRail } from "@/components/layout/SideRailContext";

export function PublicContentWrapper({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSideRail();

  return (
    <div
      className={`flex-1 flex flex-col transition-[padding] duration-300 ease-in-out ${
        isOpen ? "lg:pl-[84px]" : "lg:pl-0"
      }`}
    >
      {children}
    </div>
  );
}
