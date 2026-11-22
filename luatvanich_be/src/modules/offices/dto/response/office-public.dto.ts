import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OfficePublicDto {
  @ApiProperty() id: string;
  @ApiProperty() code: string;
  @ApiProperty() name: string;
  @ApiProperty() address: string;
  @ApiPropertyOptional() workingHours?: string;
  @ApiPropertyOptional() description?: string;
  @ApiPropertyOptional() phone?: string;
  @ApiPropertyOptional() fax?: string;
  @ApiPropertyOptional() email?: string;
  @ApiPropertyOptional() wechatId?: string;
  @ApiPropertyOptional() wechatQrUrl?: string;
  @ApiPropertyOptional() imageUrl?: string;
  @ApiPropertyOptional() latitude?: number;
  @ApiPropertyOptional() longitude?: number;
  @ApiPropertyOptional() mapEmbedUrl?: string;
  @ApiProperty() isHeadquarters: boolean;
  @ApiProperty() displayOrder: number;
  @ApiPropertyOptional() fallback?: boolean;
}
