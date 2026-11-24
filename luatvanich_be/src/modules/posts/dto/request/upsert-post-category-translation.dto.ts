import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, Matches, MaxLength, ValidateIf, IsOptional } from 'class-validator';
import { LangCode } from '../../../../common/enums/lang.enum';

export class UpsertPostCategoryTranslationDto {
  @ApiProperty({ description: 'Ngôn ngữ bản dịch', example: "vi", enum: LangCode })
  @IsEnum(LangCode, { message: 'Ngôn ngữ phải là vi hoặc zh-CN' })
  languageCode: LangCode;

  @ApiProperty({ description: 'Tên chuyên mục', example: "Đầu tư FDI" })
  @Type(() => Object)
  @IsString({ message: 'Tên chuyên mục phải là chuỗi' })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsNotEmpty({ message: 'Tên chuyên mục không được để trống' })
  @MaxLength(200, { message: 'Tên chuyên mục tối đa 200 ký tự' })
  name: string;

  @ApiPropertyOptional({ description: 'Slug riêng theo ngôn ngữ', example: "dau-tu-fdi" })
  @ValidateIf((_, value) => value !== undefined)
  @Type(() => Object)
  @Matches(/^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u, { message: 'Slug chỉ gồm chữ, số và dấu gạch nối' })
  @MaxLength(220, { message: 'Slug tối đa 220 ký tự' })
  slug?: string;

  @ApiPropertyOptional({ description: 'Mô tả chuyên mục', example: "Tin tức về đầu tư", nullable: true, type: String })
  @IsOptional()
  @Type(() => Object)
  @IsString({ message: 'Mô tả chuyên mục phải là chuỗi' })
  @MaxLength(5000, { message: 'Mô tả chuyên mục tối đa 5000 ký tự' })
  description?: string | null;
}
