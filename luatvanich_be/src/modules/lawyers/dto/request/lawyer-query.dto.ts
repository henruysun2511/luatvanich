import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ContentStatus } from '../../../../common/enums/content-status.enum';
import { LawyerTeamGroup } from '../../enums/lawyer-team-group.enum';
import { LangCode } from '../../../../common/enums/lang.enum';

export class LawyerQueryDto {
  @ApiPropertyOptional({ enum: LangCode, default: LangCode.VI })
  @IsEnum(LangCode)
  @IsOptional()
  lang?: LangCode = LangCode.VI;

  @ApiPropertyOptional({ enum: ContentStatus })
  @IsEnum(ContentStatus)
  @IsOptional()
  status?: ContentStatus;

  @ApiPropertyOptional({ enum: LawyerTeamGroup })
  @IsEnum(LawyerTeamGroup)
  @IsOptional()
  teamGroup?: LawyerTeamGroup;

  @ApiPropertyOptional({ description: 'Lọc theo UUID văn phòng' })
  @IsUUID()
  @IsOptional()
  officeId?: string;

  @ApiPropertyOptional({ description: 'Lọc theo UUID lĩnh vực chuyên môn' })
  @IsUUID()
  @IsOptional()
  practiceAreaId?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  isFeatured?: boolean;

  @ApiPropertyOptional({ description: 'Tìm theo tên, latin name, email, số thẻ' })
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
