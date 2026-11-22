import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { BaseQueryDto } from '../../../../common/dto/base-query.dto';
import { ContentStatus } from '../../../../common/enums/content-status.enum';

function parseBoolean(value: unknown) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return value;
}

export class PracticeAreaQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({ enum: ContentStatus })
  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Object)
  @Transform(({ value }) => parseBoolean(value))
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  search?: string;
}

export class PublicPracticeAreaQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Object)
  @Transform(({ value }) => parseBoolean(value))
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ example: 'zh-CN' })
  @IsOptional()
  @IsString()
  lang?: string;
}
