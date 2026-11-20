import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LegalServicePublicDto {
  @ApiProperty() id: string;
  @ApiProperty() title: string;
  @ApiProperty() slug: string;
  @ApiPropertyOptional() excerpt?: string;
  @ApiPropertyOptional() contentHtml?: string;
  @ApiPropertyOptional() metaTitle?: string;
  @ApiPropertyOptional() metaDescription?: string;
  @ApiPropertyOptional() coverImageUrl?: string;
  @ApiProperty() isFeatured: boolean;
  @ApiProperty() displayOrder: number;
  /** true nếu thiếu bản dịch yêu cầu, trả về fallback tiếng Việt */
  @ApiPropertyOptional() fallback?: boolean;
}
