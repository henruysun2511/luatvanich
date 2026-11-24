import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '../repositories/dashboard.repository';
import { DashboardStatsResponseDto } from '../dto/response/dashboard-stats.dto';
import { DashboardChartsResponseDto } from '../dto/response/dashboard-charts.dto';
import { DashboardRecentResponseDto } from '../dto/response/dashboard-recent.dto';

@Injectable()
export class DashboardService {
  constructor(private readonly dashboardRepo: DashboardRepository) {}

  /** Lấy thống kê tổng quan KPI */
  async getStats(): Promise<DashboardStatsResponseDto> {
    return this.dashboardRepo.getOverviewStats();
  }

  /** Lấy dữ liệu cho 4 loại biểu đồ */
  async getCharts(days = 14): Promise<DashboardChartsResponseDto> {
    return this.dashboardRepo.getChartsData(days);
  }

  /** Lấy danh sách yêu cầu mới và bài viết hẹn giờ */
  async getRecentActivities(): Promise<DashboardRecentResponseDto> {
    return this.dashboardRepo.getRecentActivities();
  }
}
