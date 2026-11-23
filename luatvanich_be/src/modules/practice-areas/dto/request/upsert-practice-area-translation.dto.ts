import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { LangCode } from '../../../../common/enums/lang.enum';

export class UpsertPracticeAreaTranslationDto {
  @ApiProperty({
    enum: LangCode,
    example: LangCode.VI,
    description: 'Mã ngôn ngữ: vi hoặc zh-CN',
  })
  @IsEnum(LangCode, { message: 'Mã ngôn ngữ không hợp lệ (chỉ hỗ trợ vi hoặc zh-CN)' })
  languageCode: LangCode;

  @ApiProperty({
    example: 'Đầu tư nước ngoài (FDI)',
    description: 'Tên lĩnh vực chuyên môn pháp lý',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'Tên lĩnh vực phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Tên lĩnh vực không được để trống' })
  @MaxLength(200, { message: 'Tên lĩnh vực tối đa 200 ký tự' })
  name: string;

  @ApiPropertyOptional({
    example: 'dau-tu-nuoc-ngoai-fdi',
    description: 'Đường dẫn tĩnh SEO duy nhất. Bỏ trống để tự sinh từ tên.',
  })
  @ValidateIf((_, value) => value !== undefined && value !== '')
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Đường dẫn slug chỉ được chứa chữ thường, số và dấu gạch nối (VD: dau-tu-fdi)',
  })
  @MaxLength(220, { message: 'Đường dẫn slug tối đa 220 ký tự' })
  slug?: string;

  @ApiPropertyOptional({
    example: 'Tư vấn pháp lý toàn diện cho các dự án đầu tư FDI vào Việt Nam...',
    description: 'Mô tả khái quát về lĩnh vực',
    nullable: true,
  })
  @IsOptional()
  @IsString({ message: 'Mô tả phải là chuỗi ký tự' })
  description?: string | null;

  @ApiPropertyOptional({
    example: 'Tư Vấn Đầu Tư FDI Chuyên Nghiệp | Hãng Luật Vạn Ích',
    description: 'SEO Meta Title (tối đa 70 ký tự)',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(70, { message: 'Meta title tối đa 70 ký tự' })
  metaTitle?: string | null;

  @ApiPropertyOptional({
    example: 'Hãng luật Vạn Ích cung cấp dịch vụ tư vấn đầu tư FDI, thành lập doanh nghiệp FDI...',
    description: 'SEO Meta Description (tối đa 160 ký tự)',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(160, { message: 'Meta description tối đa 160 ký tự' })
  metaDescription?: string | null;

  @ApiPropertyOptional({
    example: true,
    default: false,
    description: 'Bản dịch đã hoàn thiện hay đang nháp',
  })
  @ValidateIf((_, value) => value !== undefined)
  @IsBoolean({ message: 'isComplete phải là boolean' })
  isComplete?: boolean;
}
