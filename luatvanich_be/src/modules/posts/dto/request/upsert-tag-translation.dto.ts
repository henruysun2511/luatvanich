import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, Matches, MaxLength, ValidateIf } from 'class-validator';
import { LangCode } from '../../../../common/enums/lang.enum';

export class UpsertTagTranslationDto {
  @ApiProperty({ description: 'Ngôn ngữ bản dịch', example: 'vi', enum: LangCode })
  @IsEnum(LangCode, { message: 'Ngôn ngữ phải là vi hoặc zh-CN' })
  languageCode: LangCode;

  @ApiProperty({ description: 'Tên thẻ', example: 'Đầu tư FDI' })
  @IsString({ message: 'Tên thẻ phải là chuỗi' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty({ message: 'Tên thẻ không được để trống' })
  @MaxLength(100, { message: 'Tên thẻ tối đa 100 ký tự' })
  name: string;

  @ApiPropertyOptional({ description: 'Slug riêng theo ngôn ngữ', example: 'dau-tu-fdi' })
  @ValidateIf((_, value) => value !== undefined)
  @IsString({ message: 'Slug phải là chuỗi' })
  @Matches(/^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u, { message: 'Slug chỉ gồm chữ, số và dấu gạch nối' })
  @MaxLength(120, { message: 'Slug tối đa 120 ký tự' })
  slug?: string;
}
