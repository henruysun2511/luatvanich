import { ApiProperty } from '@nestjs/swagger';

export class RecentConsultationItemDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Nguyễn Văn A' })
  fullName: string;

  @ApiProperty({ example: 'Công ty TNHH Đầu tư Hoa Hạ', nullable: true })
  companyName?: string | null;

  @ApiProperty({ example: '0912345678' })
  phone: string;

  @ApiProperty({ example: 'new' })
  status: string;

  @ApiProperty({ example: 'Đầu tư nước ngoài (FDI)', nullable: true })
  practiceAreaName?: string | null;

  @ApiProperty({ example: '2026-11-24T10:00:00Z' })
  createdAt: string;
}

export class UpcomingScheduledPostItemDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Thủ tục thành lập doanh nghiệp FDI 2026' })
  title: string;

  @ApiProperty({ example: 'Cẩm nang pháp lý' })
  categoryName: string;

  @ApiProperty({ example: '2026-11-25T08:00:00Z' })
  publishAt: string;
}

export class DashboardRecentResponseDto {
  @ApiProperty({ type: [RecentConsultationItemDto], description: '5 yêu cầu tư vấn mới nhất' })
  recentConsultations: RecentConsultationItemDto[];

  @ApiProperty({ type: [UpcomingScheduledPostItemDto], description: '5 bài viết sắp xuất bản theo lịch hẹn' })
  upcomingScheduledPosts: UpcomingScheduledPostItemDto[];
}
