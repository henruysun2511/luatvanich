import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContentStatus } from '../../../../common/enums/content-status.enum';

export class TranslationSummaryDto {
  @ApiProperty() languageCode: string;
  @ApiProperty() title: string;
  @ApiProperty() slug: string;
  @ApiProperty() isComplete: boolean;
}

export class LegalServiceAdminDto {
  @ApiProperty() id: string;
  @ApiPropertyOptional() practiceAreaId?: string;
  @ApiProperty({ enum: ContentStatus }) status: ContentStatus;
  @ApiProperty() displayOrder: number;
  @ApiProperty() isFeatured: boolean;
  @ApiPropertyOptional() coverImageUrl?: string;
  @ApiProperty({ type: [TranslationSummaryDto] }) translations: TranslationSummaryDto[];
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}
