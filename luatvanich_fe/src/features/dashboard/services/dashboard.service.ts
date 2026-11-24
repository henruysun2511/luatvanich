import { apiClient } from "@/lib/axios";
import type {
  DashboardStats,
  DashboardChartsData,
  DashboardRecentActivities,
} from "../types/dashboard.types";

const DASHBOARD_ADMIN_URL = "/admin/dashboard";

export const dashboardService = {
  /** Lấy các chỉ số KPI tổng quan */
  getStats: async (): Promise<DashboardStats> => {
    const res = await apiClient.get<{ data: DashboardStats }>(`${DASHBOARD_ADMIN_URL}/stats`);
    return res.data.data;
  },

  /** Lấy dữ liệu 4 loại biểu đồ phân tích */
  getCharts: async (days = 14): Promise<DashboardChartsData> => {
    const res = await apiClient.get<{ data: DashboardChartsData }>(
      `${DASHBOARD_ADMIN_URL}/charts`,
      { params: { days } },
    );
    return res.data.data;
  },

  /** Lấy danh sách hoạt động gần đây */
  getRecentActivities: async (): Promise<DashboardRecentActivities> => {
    const res = await apiClient.get<{ data: DashboardRecentActivities }>(
      `${DASHBOARD_ADMIN_URL}/recent-activities`,
    );
    return res.data.data;
  },
};
