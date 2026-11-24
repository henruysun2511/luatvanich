"use client";

import React, { useState } from "react";
import {
  Globe,
  Award,
  Building,
  HelpCircle,
  Palette,
  ShieldCheck,
  Settings,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/common";
import { SiteSettingsTab } from "@/features/settings/components/tabs/SiteSettingsTab";
import { CompanyStatsTab } from "@/features/settings/components/tabs/CompanyStatsTab";
import { HomepageContentTab } from "@/features/settings/components/tabs/HomepageContentTab";
import { PartnersTab } from "@/features/settings/components/tabs/PartnersTab";
import { FaqsTab } from "@/features/settings/components/tabs/FaqsTab";
import { ThemeBrandingTab } from "@/features/settings/components/tabs/ThemeBrandingTab";
import { AccountSecurityTab } from "@/features/settings/components/tabs/AccountSecurityTab";

type SettingsTab = "site" | "company" | "content" | "partners" | "faqs" | "theme" | "account";

const TABS: { id: SettingsTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "site", label: "Cấu hình Website", icon: Globe },
  { id: "company", label: "Giới thiệu & Số liệu", icon: Award },
  { id: "content", label: "Từ điển & Quy trình", icon: BookOpen },
  { id: "partners", label: "Logo Đối tác", icon: Building },
  { id: "faqs", label: "Câu hỏi thường gặp", icon: HelpCircle },
  { id: "theme", label: "Giao diện & Thương hiệu", icon: Palette },
  { id: "account", label: "Tài khoản & Bảo mật", icon: ShieldCheck },
];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("site");

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <PageHeader
        icon={Settings}
        title="Trung tâm Cài đặt Hệ thống & Website"
        description="Quản lý toàn diện thông tin liên hệ, hotline, đối tác, FAQs, nhận diện thương hiệu và bảo mật."
      />

      {/* 6 Tabs Navigation (Royal Style) */}
      <div className="flex items-center gap-1 border-b border-[#e7dcc3] overflow-x-auto scrollbar-none font-sans">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap -mb-px select-none cursor-pointer",
                isActive
                  ? "border-[#85151b] text-[#85151b] bg-[#fbf7ee]"
                  : "border-transparent text-[#718096] hover:text-[#06122b] hover:bg-[#fcfbf9]",
              )}
            >
              <Icon
                className={cn(
                  "size-4 shrink-0 transition-colors",
                  isActive ? "text-[#85151b]" : "text-[#718096]",
                )}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Body */}
      <div className="pt-2 animate-in fade-in-50 duration-200">
        {activeTab === "site" && <SiteSettingsTab />}
        {activeTab === "company" && <CompanyStatsTab />}
        {activeTab === "content" && <HomepageContentTab />}
        {activeTab === "partners" && <PartnersTab />}
        {activeTab === "faqs" && <FaqsTab />}
        {activeTab === "theme" && <ThemeBrandingTab />}
        {activeTab === "account" && <AccountSecurityTab />}
      </div>
    </div>
  );
}
