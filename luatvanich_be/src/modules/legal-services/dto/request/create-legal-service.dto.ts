import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsUUID, MaxLength } from 'class-validator';
import { LangCode } from '../../../../common/enums/lang.enum';

export class CreateLegalServiceDto {
  @ApiPropertyOptional({ description: 'UUID lĩnh vực pháp lý cha' })
  @IsUUID()
  @IsOptional()
  practiceAreaId?: string;

  @ApiPropertyOptional({ description: 'URL ảnh đại diện / ảnh bìa dịch vụ' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  coverImageUrl?: string;

  @ApiPropertyOptional({ default: 0, description: 'Thứ tự sắp xếp hiển thị' })
  @IsOptional()
  displayOrder?: number;

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @ApiPropertyOptional({ example: '投', description: 'Chữ Hán đại diện đơn lẻ hiển thị trên card' })
  @IsString()
  @IsOptional()
  @MaxLength(10)
  hanziBadge?: string;

  // ── Nội dung tiếng Việt (bắt buộc) ─────────────────────────────────
  @ApiProperty({ example: 'Tư Vấn Đầu Tư FDI' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  titleVi: string;

  @ApiPropertyOptional({ example: 'tu-van-dau-tu-fdi', description: 'Bỏ trống để tự sinh từ titleVi' })
  @IsString()
  @IsOptional()
  @MaxLength(220)
  slugVi?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  excerptVi?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contentHtmlVi?: string;

  // ── Nội dung tiếng Trung (tùy chọn) ────────────────────────────────
  @ApiPropertyOptional({ example: '外商直接投资咨询' })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  titleZh?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  slugZh?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  excerptZh?: string;
}
