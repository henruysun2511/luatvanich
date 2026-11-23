import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class NotificationItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: 'consultation' })
  type: string;

  @ApiProperty({ example: 'Yêu cầu tư vấn mới: Nguyễn Văn A' })
  title: string;

  @ApiProperty({ example: 'SĐT: 0901234567 • Lĩnh vực: Đầu tư nước ngoài' })
  message: string;

  @ApiPropertyOptional({ example: '/admin/consultations' })
  link?: string | null;

  @ApiProperty({ example: false })
  isRead: boolean;

  @ApiPropertyOptional()
  metadata?: Record<string, any> | null;

  @ApiProperty()
  createdAt: Date;
}
