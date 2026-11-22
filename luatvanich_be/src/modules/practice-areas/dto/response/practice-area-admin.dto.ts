import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContentStatus } from '../../../../common/enums/content-status.enum';
import { LangCode } from '../../../../common/enums/lang.enum';

export class PracticeAreaTranslationDto {
  @ApiProperty({ enum: LangCode })
  languageCode: LangCode;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string | null;

  @ApiPropertyOptional()
  metaTitle?: string | null;

  @ApiPropertyOptional()
  metaDescription?: string | null;

  @ApiProperty()
  isComplete: boolean;

  @ApiProperty()
  updatedAt: Date;
}

export class PracticeAreaAdminDto {
  @ApiProperty()
  id: string;

  @ApiPropertyOptional()
  iconUrl?: string;

  @ApiProperty()
  displayOrder: number;

  @ApiProperty({ enum: ContentStatus })
  status: ContentStatus;

  @ApiProperty()
  isFeatured: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: [PracticeAreaTranslationDto] })
  translations: PracticeAreaTranslationDto[];

  @ApiProperty()
  servicesCount: number;
}
