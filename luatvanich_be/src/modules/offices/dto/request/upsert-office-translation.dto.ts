import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LangCode } from '../../../../common/enums/lang.enum';

export class UpsertOfficeTranslationDto {
  @ApiProperty({ enum: LangCode, example: LangCode.VI })
  @IsEnum(LangCode)
  languageCode: LangCode;

  @ApiProperty({ example: 'Văn phòng Hà Nội' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @ApiProperty({ example: 'Số 17 đường 23 khu biệt thự KĐT Thành phố Giao Lưu, Bắc Từ Liêm, Hà Nội' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  address: string;

  @ApiPropertyOptional({ example: 'Thứ 2 - Thứ 6: 08:00 - 17:30' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  workingHours?: string;

  @ApiPropertyOptional({ example: 'Trụ sở chính kết nối dịch vụ pháp lý xuyên biên giới Việt - Trung.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: true, default: false })
  @IsOptional()
  @IsBoolean()
  isComplete?: boolean;
}
