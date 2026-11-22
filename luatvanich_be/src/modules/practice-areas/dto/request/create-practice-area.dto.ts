import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize, ArrayMinSize, ArrayUnique, IsArray, IsBoolean, IsEnum, IsInt, IsObject,
  IsOptional, IsString, Max, MaxLength, Min, ValidateIf, ValidateNested,
} from 'class-validator';
import { ContentStatus } from '../../../../common/enums/content-status.enum';
import { UpsertPracticeAreaTranslationDto } from './upsert-practice-area-translation.dto';

export class CreatePracticeAreaDto {
  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  iconUrl?: string | null;

  @ApiPropertyOptional()
  @ValidateIf((_, value) => value !== undefined)
  @IsInt()
  @Min(-2147483648)
  @Max(2147483647)
  displayOrder?: number;

  @ApiPropertyOptional({ enum: ContentStatus })
  @ValidateIf((_, value) => value !== undefined)
  @IsEnum(ContentStatus)
  status?: ContentStatus;

  @ApiPropertyOptional()
  @ValidateIf((_, value) => value !== undefined)
  @Type(() => Object)
  @IsBoolean()
  isFeatured?: boolean;

  @ApiProperty({ type: [UpsertPracticeAreaTranslationDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  @ArrayUnique((translation: UpsertPracticeAreaTranslationDto) => translation?.languageCode)
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => UpsertPracticeAreaTranslationDto)
  translations: UpsertPracticeAreaTranslationDto[];
}
