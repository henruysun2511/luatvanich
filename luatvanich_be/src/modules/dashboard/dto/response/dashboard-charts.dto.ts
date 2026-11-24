import { ApiProperty } from '@nestjs/swagger';

export class TrendPointDto {
  @ApiProperty({ description: 'Ngày (định dạng YYYY-MM-DD)', example: '2026-11-20' })
  date: string;

  @ApiProperty({ description: 'Số lượng yêu cầu tư vấn trong ngày', example: 3 })
  consultationsCount: number;
}

export class StatusBreakdownItemDto {
  @ApiProperty({ description: 'Mã trạng thái', example: 'new' })
  status: string;

  @ApiProperty({ description: 'Tên trạng thái tiếng Việt', example: 'Mới tiếp nhận' })
  label: string;

  @ApiProperty({ description: 'Số lượng', example: 12 })
  count: number;

  @ApiProperty({ description: 'Tỷ lệ phần trăm', example: 24.5 })
  percentage: number;

  @ApiProperty({ description: 'Mã màu đại diện', example: '#3B82F6' })
  color: string;
}

export class TopPracticeAreaItemDto {
  @ApiProperty({ description: 'ID lĩnh vực chuyên môn', example: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Tên lĩnh vực chuyên môn', example: 'Đầu tư nước ngoài (FDI)' })
  name: string;

  @ApiProperty({ description: 'Số lượng yêu cầu quan tâm', example: 18 })
  count: number;
}

export class ContentSectionDistributionDto {
  @ApiProperty({ description: 'Phân vùng chuyên mục', example: 'handbook' })
  section: string;

  @ApiProperty({ description: 'Tên phân vùng', example: 'Cẩm nang doanh nghiệp' })
  label: string;

  @ApiProperty({ description: 'Số bài viết có bản dịch Tiếng Việt', example: 15 })
  viCount: number;

  @ApiProperty({ description: 'Số bài viết có bản dịch Tiếng Trung', example: 12 })
  zhCount: number;
}

export class DashboardChartsResponseDto {
  @ApiProperty({ type: [TrendPointDto], description: 'Chuỗi thời gian yêu cầu tư vấn N ngày gần nhất' })
  trend: TrendPointDto[];

  @ApiProperty({ type: [StatusBreakdownItemDto], description: 'Phân bố trạng thái xử lý hồ sơ tư vấn' })
  statusBreakdown: StatusBreakdownItemDto[];

  @ApiProperty({ type: [TopPracticeAreaItemDto], description: 'Top lĩnh vực / dịch vụ được quan tâm nhất' })
  topPracticeAreas: TopPracticeAreaItemDto[];

  @ApiProperty({ type: [ContentSectionDistributionDto], description: 'Cơ cấu bài viết theo chuyên mục & song ngữ' })
  contentDistribution: ContentSectionDistributionDto[];
}
