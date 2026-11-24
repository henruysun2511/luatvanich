"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AdminSidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  setIsCollapsed: (val: boolean) => void;
}

const AdminSidebarContext = createContext<AdminSidebarContextType | undefined>(undefined);

export function AdminSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("admin_sidebar_collapsed");
      if (saved !== null) {
        setIsCollapsed(saved === "true");
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("admin_sidebar_collapsed", String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleSetCollapsed = (val: boolean) => {
    setIsCollapsed(val);
    try {
      localStorage.setItem("admin_sidebar_collapsed", String(val));
    } catch {
      // ignore
    }
  };

  return (
    <AdminSidebarContext.Provider
      value={{
        isCollapsed,
        toggleSidebar,
        setIsCollapsed: handleSetCollapsed,
      }}
    >
      {children}
    </AdminSidebarContext.Provider>
  );
}

export function useAdminSidebar() {
  const context = useContext(AdminSidebarContext);
  if (!context) {
    throw new Error("useAdminSidebar must be used within an AdminSidebarProvider");
  }
  return context;
}
