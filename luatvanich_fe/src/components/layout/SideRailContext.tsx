"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SideRailContextType {
  isOpen: boolean;
  toggleRail: () => void;
  openRail: () => void;
  closeRail: () => void;
}

const SideRailContext = createContext<SideRailContextType | undefined>(undefined);

export function SideRailProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("luatvanich_rail_open");
      if (saved !== null) {
        setIsOpen(saved === "true");
      }
    } catch {
      // Bỏ qua nếu môi trường không hỗ trợ localStorage
    }
  }, []);

  const toggleRail = () => {
    setIsOpen((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("luatvanich_rail_open", String(next));
      } catch {}
      return next;
    });
  };

  return (
    <SideRailContext.Provider
      value={{
        isOpen,
        toggleRail,
        openRail: () => setIsOpen(true),
        closeRail: () => setIsOpen(false),
      }}
    >
      {children}
    </SideRailContext.Provider>
  );
}

export function useSideRail() {
  const context = useContext(SideRailContext);
  if (!context) {
    throw new Error("useSideRail must be used within a SideRailProvider");
  }
  return context;
}
