import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, Matches, MaxLength, ValidateIf, IsOptional, IsBoolean } from 'class-validator';
import { LangCode } from '../../../../common/enums/lang.enum';

export class UpsertPostTranslationDto {
  @ApiProperty({ description: 'Ngôn ngữ bản dịch', example: "vi", enum: LangCode })
  @IsEnum(LangCode, { message: 'Ngôn ngữ phải là vi hoặc zh-CN' })
  languageCode: LangCode;

  @ApiProperty({ description: 'Tiêu đề', example: "Đầu tư FDI" })
  @Type(() => Object)
  @IsString({ message: 'Tiêu đề phải là chuỗi' })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  @MaxLength(300, { message: 'Tiêu đề tối đa 300 ký tự' })
  title: string;

  @ApiPropertyOptional({ description: 'Slug riêng theo ngôn ngữ', example: "dau-tu-fdi" })
  @ValidateIf((_, value) => value !== undefined)
  @Type(() => Object)
  @Matches(/^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u, { message: 'Slug chỉ gồm chữ, số và dấu gạch nối' })
  @MaxLength(320, { message: 'Slug tối đa 320 ký tự' })
  slug?: string;

  @ApiPropertyOptional({ description: 'Tóm tắt', example: "Giới thiệu bài viết", nullable: true, type: String })
  @IsOptional()
  @Type(() => Object)
  @IsString({ message: 'Tóm tắt phải là chuỗi' })
  @MaxLength(5000, { message: 'Tóm tắt tối đa 5000 ký tự' })
  summary?: string | null;

  @ApiProperty({ description: 'Nội dung HTML', example: "<h2>Đầu tư FDI</h2>" })
  @Type(() => Object)
  @IsString({ message: 'Nội dung HTML phải là chuỗi' })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsNotEmpty({ message: 'Nội dung HTML không được để trống' })
  @MaxLength(250000, { message: 'Nội dung HTML tối đa 250000 ký tự' })
  contentHtml: string;

  @ApiPropertyOptional({ description: 'Tiêu đề SEO', example: "Đầu tư FDI", nullable: true, type: String })
  @IsOptional()
  @Type(() => Object)
  @IsString({ message: 'Tiêu đề SEO phải là chuỗi' })
  @MaxLength(70, { message: 'Tiêu đề SEO tối đa 70 ký tự' })
  metaTitle?: string | null;

  @ApiPropertyOptional({ description: 'Mô tả SEO', example: "Hướng dẫn đầu tư", nullable: true, type: String })
  @IsOptional()
  @Type(() => Object)
  @IsString({ message: 'Mô tả SEO phải là chuỗi' })
  @MaxLength(160, { message: 'Mô tả SEO tối đa 160 ký tự' })
  metaDescription?: string | null;

  @ApiPropertyOptional({ description: 'Bản dịch đã hoàn thiện', example: true })
  @ValidateIf((_, value) => value !== undefined)
  @Type(() => Object)
  @IsBoolean({ message: 'Bản dịch đã hoàn thiện phải là true hoặc false' })
  isComplete?: boolean;
}
