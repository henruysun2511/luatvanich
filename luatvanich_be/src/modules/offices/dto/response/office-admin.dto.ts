import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContentStatus } from '../../../../common/enums/content-status.enum';

export class OfficeTranslationDetailDto {
  @ApiProperty() languageCode: string;
  @ApiProperty() name: string;
  @ApiProperty() address: string;
  @ApiPropertyOptional() workingHours?: string;
  @ApiPropertyOptional() description?: string;
  @ApiProperty() isComplete: boolean;
  @ApiProperty() updatedAt: Date;
}

export class OfficeAdminDto {
  @ApiProperty() id: string;
  @ApiProperty() code: string;
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
  @ApiProperty({ enum: ContentStatus }) status: ContentStatus;
  @ApiProperty({ type: [OfficeTranslationDetailDto] }) translations: OfficeTranslationDetailDto[];
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}
