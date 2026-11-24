import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth";
import { dashboardService } from "../services/dashboard.service";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  stats: () => [...dashboardKeys.all, "stats"] as const,
  charts: (days: number) => [...dashboardKeys.all, "charts", days] as const,
  recent: () => [...dashboardKeys.all, "recent"] as const,
};

/** Query lấy thống kê KPI tổng quan */
export function useDashboardStats() {
  const status = useAuthStore((s) => s.status);

  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: () => dashboardService.getStats(),
    enabled: status === "authenticated",
    staleTime: 60_000, // 1 phút
    refetchInterval: 120_000, // Tự làm mới mỗi 2 phút
  });
}

/** Query lấy dữ liệu 4 loại biểu đồ phân tích */
export function useDashboardCharts(days = 14) {
  const status = useAuthStore((s) => s.status);

  return useQuery({
    queryKey: dashboardKeys.charts(days),
    queryFn: () => dashboardService.getCharts(days),
    enabled: status === "authenticated",
    staleTime: 60_000,
    placeholderData: (prev) => prev,
  });
}

/** Query lấy hoạt động gần đây */
export function useDashboardRecent() {
  const status = useAuthStore((s) => s.status);

  return useQuery({
    queryKey: dashboardKeys.recent(),
    queryFn: () => dashboardService.getRecentActivities(),
    enabled: status === "authenticated",
    staleTime: 30_000,
    refetchInterval: 60_000, // Tự làm mới mỗi 1 phút để thấy bài viết vừa được Cron xuất bản
  });
}
