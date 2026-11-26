import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsString, IsNotEmpty, IsOptional, IsBoolean, Matches, MaxLength } from 'class-validator';

export class UpsertTranslationDto {
  @ApiProperty({ example: 'Tư Vấn Đầu Tư FDI' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @ApiPropertyOptional({ description: 'Bỏ trống để tự sinh từ title' })
  @IsString()
  @IsOptional()
  @MaxLength(220)
  slug?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  excerpt?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contentHtml?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  metaTitle?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  metaDescription?: string;

  @ApiPropertyOptional({ type: [String], nullable: true, description: 'Các bước thực hiện theo thứ tự' })
  @IsOptional()
  @IsArray({ message: 'Quy trình phải là danh sách' })
  @ArrayMaxSize(20, { message: 'Quy trình tối đa 20 bước' })
  @IsString({ each: true, message: 'Mỗi bước phải là văn bản' })
  @Matches(/\S/, { each: true, message: 'Bước thực hiện không được để trống' })
  @MaxLength(500, { each: true, message: 'Mỗi bước tối đa 500 ký tự' })
  processSteps?: string[] | null;

  @ApiPropertyOptional({ type: [String], nullable: true, description: 'Các dòng phí tham khảo đã được công bố' })
  @IsOptional()
  @IsArray({ message: 'Biểu phí phải là danh sách' })
  @ArrayMaxSize(20, { message: 'Biểu phí tối đa 20 dòng' })
  @IsString({ each: true, message: 'Mỗi dòng phí phải là văn bản' })
  @Matches(/\S/, { each: true, message: 'Dòng phí không được để trống' })
  @MaxLength(500, { each: true, message: 'Mỗi dòng phí tối đa 500 ký tự' })
  referenceFees?: string[] | null;

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  isComplete?: boolean;
}
