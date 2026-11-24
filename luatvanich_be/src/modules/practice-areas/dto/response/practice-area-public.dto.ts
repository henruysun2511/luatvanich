import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LegalServicePublicDto } from '../../../legal-services/dto/response/legal-service-public.dto';

export class PracticeAreaPublicDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  iconUrl?: string;

  @ApiPropertyOptional({ example: '投', description: 'Chữ Hán đại diện đơn lẻ / Watermark' })
  hanziBadge?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional({ type: [String], description: 'Danh sách phạm vi công việc' })
  scopePoints?: string[];

  @ApiPropertyOptional({ example: '30 – 60 ngày', description: 'Thời gian thực hiện' })
  estimatedTime?: string;

  @ApiPropertyOptional({ example: 'Trọn gói', description: 'Hình thức phí' })
  feeStructure?: string;

  @ApiProperty()
  isFeatured: boolean;

  @ApiProperty()
  servicesCount: number;

  @ApiPropertyOptional()
  metaTitle?: string;

  @ApiPropertyOptional()
  metaDescription?: string;
}

export class PracticeAreaDetailPublicDto extends PracticeAreaPublicDto {
  @ApiProperty({ type: [LegalServicePublicDto] })
  services: LegalServicePublicDto[];
}
