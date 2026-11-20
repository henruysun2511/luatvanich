import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID, IsInt, Min, IsBoolean } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ContentStatus } from '../../../../common/enums/content-status.enum';
import { LangCode } from '../../../../common/enums/lang.enum';

export class LegalServiceQueryDto {
  @ApiPropertyOptional({ enum: LangCode, default: LangCode.VI })
  @IsEnum(LangCode)
  @IsOptional()
  lang?: LangCode = LangCode.VI;

  @ApiPropertyOptional({ description: 'Lọc theo lĩnh vực pháp lý' })
  @IsUUID()
  @IsOptional()
  practiceAreaId?: string;

  @ApiPropertyOptional({ enum: ContentStatus })
  @IsEnum(ContentStatus)
  @IsOptional()
  status?: ContentStatus;

  @ApiPropertyOptional({ description: 'Tìm kiếm theo tiêu đề' })
  @IsString()
  @IsOptional()
  q?: string;

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  isFeatured?: boolean;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20;
}
