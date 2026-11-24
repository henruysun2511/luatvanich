"use client";

import React, { useState } from "react";
import {
  DashboardHeader,
  DashboardStatCards,
  ConsultationTrendChart,
  ConsultationStatusDonutChart,
  TopServicesPopularityChart,
  ContentCategoryDistributionChart,
  RecentConsultationsWidget,
  UpcomingScheduledPostsWidget,
  useDashboardStats,
  useDashboardCharts,
  useDashboardRecent,
} from "@/features/dashboard";

export default function AdminDashboardPage() {
  const [days, setDays] = useState<number>(14);

  const {
    data: stats,
    isLoading: isLoadingStats,
    refetch: refetchStats,
    isFetching: isFetchingStats,
  } = useDashboardStats();

  const {
    data: charts,
    isLoading: isLoadingCharts,
    refetch: refetchCharts,
    isFetching: isFetchingCharts,
  } = useDashboardCharts(days);

  const {
    data: recent,
    isLoading: isLoadingRecent,
    refetch: refetchRecent,
    isFetching: isFetchingRecent,
  } = useDashboardRecent();

  const isRefreshing = isFetchingStats || isFetchingCharts || isFetchingRecent;

  const handleRefresh = async () => {
    await Promise.all([refetchStats(), refetchCharts(), refetchRecent()]);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header Bảng điều khiển */}
      <DashboardHeader
        days={days}
        onDaysChange={setDays}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* 2. Dãy 4 Thẻ KPI Tổng quan */}
      <DashboardStatCards stats={stats} isLoading={isLoadingStats} />

      {/* 3. Cụm Biểu đồ Hàng 1: Xu hướng tiếp nhận (Area) & Phân bố trạng thái (Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <ConsultationTrendChart data={charts?.trend} isLoading={isLoadingCharts} />
        </div>
        <div className="lg:col-span-5">
          <ConsultationStatusDonutChart
            data={charts?.statusBreakdown}
            isLoading={isLoadingCharts}
          />
        </div>
      </div>

      {/* 4. Cụm Biểu đồ Hàng 2: Top Lĩnh vực (Horizontal Bar) & Cơ cấu Bài viết (Grouped Bar) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <TopServicesPopularityChart
          data={charts?.topPracticeAreas}
          isLoading={isLoadingCharts}
        />
        <ContentCategoryDistributionChart
          data={charts?.contentDistribution}
          isLoading={isLoadingCharts}
        />
      </div>

      {/* 5. Cụm Tác vụ Thực tế: Yêu cầu tư vấn mới & Bài viết hẹn giờ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RecentConsultationsWidget
          items={recent?.recentConsultations}
          isLoading={isLoadingRecent}
        />
        <UpcomingScheduledPostsWidget
          items={recent?.upcomingScheduledPosts}
          isLoading={isLoadingRecent}
        />
      </div>
    </div>
  );
}
