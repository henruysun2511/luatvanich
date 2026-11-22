import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsInt, Min, IsBoolean } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ContentStatus } from '../../../../common/enums/content-status.enum';
import { LangCode } from '../../../../common/enums/lang.enum';

export class OfficeQueryDto {
  @ApiPropertyOptional({ enum: LangCode, default: LangCode.VI })
  @IsEnum(LangCode)
  @IsOptional()
  lang?: LangCode = LangCode.VI;

  @ApiPropertyOptional({ enum: ContentStatus })
  @IsEnum(ContentStatus)
  @IsOptional()
  status?: ContentStatus;

  @ApiPropertyOptional({ description: 'Lọc trụ sở chính' })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  isHeadquarters?: boolean;

  @ApiPropertyOptional({ description: 'Tìm kiếm theo tên, địa chỉ hoặc mã văn phòng' })
  @IsString()
  @IsOptional()
  q?: string;

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
