import { ApiProperty } from '@nestjs/swagger';

export class ConsultationStatsDto {
  @ApiProperty({ description: 'Tổng số yêu cầu tư vấn', example: 50 })
  total: number;

  @ApiProperty({ description: 'Số yêu cầu gửi trong hôm nay', example: 4 })
  todayCount: number;

  @ApiProperty({ description: 'Số yêu cầu mới chưa xử lý (status=new)', example: 12 })
  newCount: number;

  @ApiProperty({ description: 'Số yêu cầu đang xử lý', example: 8 })
  inProgressCount: number;

  @ApiProperty({ description: 'Số yêu cầu đã hoàn tất', example: 28 })
  doneCount: number;

  @ApiProperty({ description: 'Số yêu cầu đánh dấu spam/hủy', example: 2 })
  spamCount: number;
}

export class LegalServiceStatsDto {
  @ApiProperty({ description: 'Tổng số dịch vụ pháp lý', example: 12 })
  total: number;

  @ApiProperty({ description: 'Số dịch vụ đang công khai', example: 10 })
  publishedCount: number;
}

export class PostStatsDto {
  @ApiProperty({ description: 'Tổng số bài viết cẩm nang', example: 45 })
  total: number;

  @ApiProperty({ description: 'Số bài viết đã xuất bản', example: 38 })
  publishedCount: number;

  @ApiProperty({ description: 'Số bài viết đang lên lịch chờ xuất bản', example: 4 })
  scheduledCount: number;

  @ApiProperty({ description: 'Số bài viết bản nháp', example: 3 })
  draftCount: number;

  @ApiProperty({ description: 'Tổng lượt xem tích lũy mọi bài viết', example: 12450 })
  totalViews: number;
}

export class LawyerStatsDto {
  @ApiProperty({ description: 'Tổng số luật sư', example: 8 })
  total: number;

  @ApiProperty({ description: 'Số luật sư đang hiển thị công khai', example: 8 })
  publishedCount: number;
}

export class OfficeStatsDto {
  @ApiProperty({ description: 'Tổng số văn phòng đại diện', example: 3 })
  total: number;

  @ApiProperty({ description: 'Số văn phòng đang hiển thị', example: 3 })
  publishedCount: number;
}

export class DashboardStatsResponseDto {
  @ApiProperty({ type: ConsultationStatsDto })
  consultations: ConsultationStatsDto;

  @ApiProperty({ type: LegalServiceStatsDto })
  legalServices: LegalServiceStatsDto;

  @ApiProperty({ type: PostStatsDto })
  posts: PostStatsDto;

  @ApiProperty({ type: LawyerStatsDto })
  lawyers: LawyerStatsDto;

  @ApiProperty({ type: OfficeStatsDto })
  offices: OfficeStatsDto;
}
