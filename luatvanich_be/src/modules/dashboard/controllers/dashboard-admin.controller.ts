import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../../../common/response/api-response';
import { SwaggerDoc } from '../../../common/swagger/swagger-doc';
import { PERMISSIONS } from '../../../common/constants/permission.constant';
import { RequirePermission } from '../../../common/decorators/require-permission.decorator';
import { DashboardService } from '../services/dashboard.service';
import { DashboardQueryDto } from '../dto/request/dashboard-query.dto';
import { DashboardStatsResponseDto } from '../dto/response/dashboard-stats.dto';
import { DashboardChartsResponseDto } from '../dto/response/dashboard-charts.dto';
import { DashboardRecentResponseDto } from '../dto/response/dashboard-recent.dto';

@ApiTags('Dashboard (Admin)')
@Controller({ path: 'admin/dashboard', version: '1' })
export class DashboardAdminController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @RequirePermission(PERMISSIONS.CONSULTATIONS_READ)
  @SwaggerDoc({
    summary: 'Lấy các chỉ số thống kê tổng quan KPI cho Dashboard',
    responseType: DashboardStatsResponseDto,
    bearerAuth: true,
  })
  async getStats() {
    const data = await this.dashboardService.getStats();
    return ApiResponse.success(data, 'Lấy dữ liệu thống kê tổng quan thành công');
  }

  @Get('charts')
  @RequirePermission(PERMISSIONS.CONSULTATIONS_READ)
  @SwaggerDoc({
    summary: 'Lấy dữ liệu 4 loại biểu đồ phân tích (trend, donut, top services, content)',
    responseType: DashboardChartsResponseDto,
    bearerAuth: true,
  })
  async getCharts(@Query() query: DashboardQueryDto) {
    const data = await this.dashboardService.getCharts(query.days);
    return ApiResponse.success(data, 'Lấy dữ liệu biểu đồ thành công');
  }

  @Get('recent-activities')
  @RequirePermission(PERMISSIONS.CONSULTATIONS_READ)
  @SwaggerDoc({
    summary: 'Lấy danh sách yêu cầu tư vấn mới và bài viết chờ xuất bản',
    responseType: DashboardRecentResponseDto,
    bearerAuth: true,
  })
  async getRecentActivities() {
    const data = await this.dashboardService.getRecentActivities();
    return ApiResponse.success(data, 'Lấy danh sách hoạt động gần đây thành công');
  }
}
