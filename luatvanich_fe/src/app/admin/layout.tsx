"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AuthInitializer, AuthGuard } from "@/features/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <>
        <AuthInitializer />
        {children}
      </>
    );
  }

  return (
    <>
      <AuthInitializer />
      <AuthGuard>
        <div className="flex min-h-screen bg-muted/20">
          <AdminSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <AdminHeader />
            <main className="flex-1 p-6 overflow-y-auto">{children}</main>
          </div>
        </div>
      </AuthGuard>
    </>
  );
}
