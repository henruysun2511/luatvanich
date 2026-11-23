import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsBoolean,
} from 'class-validator';
import { LangCode } from '../../../../common/enums/lang.enum';

export class UpsertLawyerTranslationDto {
  @ApiProperty({ enum: LangCode, example: LangCode.VI })
  @IsEnum(LangCode)
  languageCode: LangCode;

  @ApiProperty({ example: 'Nguyễn Văn A' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  fullName: string;

  @ApiPropertyOptional({ example: 'Nguyen Van A' })
  @IsString()
  @IsOptional()
  @MaxLength(150)
  latinName?: string;

  @ApiPropertyOptional({ example: 'luat-su-nguyen-van-a' })
  @IsString()
  @IsOptional()
  @MaxLength(220)
  slug?: string;

  @ApiPropertyOptional({ example: 'Luật sư điều hành' })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  title?: string;

  @ApiPropertyOptional({ example: 'Bí thư Chi bộ' })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  secondaryTitle?: string;

  @ApiPropertyOptional({ example: 'Tiến sĩ Luật / 一级律师' })
  @IsString()
  @IsOptional()
  @MaxLength(150)
  academicTitle?: string;

  @ApiPropertyOptional({ example: 'Đoàn Luật sư TP. Hà Nội' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  affiliatedOrganization?: string;

  @ApiPropertyOptional({ example: 'Luật sư có hơn 15 năm kinh nghiệm trong lĩnh vực đầu tư FDI...' })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional({ example: 'Luật sư Nguyễn Văn A | Hãng luật Vạn Ích' })
  @IsString()
  @IsOptional()
  @MaxLength(70)
  metaTitle?: string;

  @ApiPropertyOptional({ example: 'Hồ sơ năng lực và kinh nghiệm tư vấn pháp lý của Luật sư Nguyễn Văn A...' })
  @IsString()
  @IsOptional()
  @MaxLength(160)
  metaDescription?: string;

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  isComplete?: boolean;
}
