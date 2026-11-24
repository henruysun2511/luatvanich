"use client";

import React from "react";
import {
  HeroSection,
  HomeStatsSection,
  FeaturedServicesSection,
  PracticeAreasTabsSection,
  LegalGlossarySection,
  LegalWorkflowSection,
  LawyersCarouselSection,
  LegalInsightsSection,
  HomePartnersSection,
  ConsultationBookingSection,
} from "@/features/home";
import { MarqueeTicker } from "@/components/ui/marquee-ticker";

export default function PublicHomePage() {
  return (
    <div className="relative font-sans text-slate-900 bg-white selection:bg-[#c29a45]/30">
      {/* 1. Hero Banner chính & Sơ đồ hành lang Radar */}
      <HeroSection />

      {/* 2. Dải Ticker thuật ngữ vô tận */}
      <MarqueeTicker />

      {/* 3. Dãy con số thống kê Hoàng gia */}
      <HomeStatsSection />

      {/* 4. Sáu dịch vụ tiêu biểu */}
      <FeaturedServicesSection />

      {/* 5. Khối lĩnh vực chuyên sâu (Interactive Tabs) */}
      <PracticeAreasTabsSection />

      {/* 6. Từ điển pháp lý Việt – Trung */}
      <LegalGlossarySection />

      {/* 7. Quy trình thụ lý 4 bước */}
      <LegalWorkflowSection />

      {/* 8. Đội ngũ luật sư */}
      <LawyersCarouselSection />

      {/* 9. Góc nhìn & Tiêu điểm luật */}
      <LegalInsightsSection />

      {/* 10. Đối tác tiêu biểu */}
      <HomePartnersSection />

      {/* 11. Đặt lịch tư vấn & Mạng lưới văn phòng */}
      <ConsultationBookingSection />
    </div>
  );
}
