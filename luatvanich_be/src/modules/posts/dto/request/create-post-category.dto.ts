import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, ArrayUnique, IsArray, IsObject, ValidateNested, IsEnum, IsInt, IsOptional, IsUUID, Max, Min, ValidateIf } from 'class-validator';
import { PostSection } from '../../enums/post-section.enum';
import { UpsertPostCategoryTranslationDto } from './upsert-post-category-translation.dto';

export class CreatePostCategoryDto {
  @ApiProperty({ description: 'Phân vùng nội dung', example: "news", enum: PostSection })
  @IsEnum(PostSection, { message: 'Phân vùng phải là news, handbook hoặc knowledge_base' })
  section: PostSection;

  @ApiPropertyOptional({ description: 'Chuyên mục cha', example: "a3da8be5-519e-4459-930f-ea3bd1eaf15c", nullable: true, type: String })
  @IsOptional()
  @Type(() => Object)
  @IsUUID('4', { message: 'Chuyên mục cha phải là UUID v4 hợp lệ' })
  parentId?: string | null;

  @ApiPropertyOptional({ description: 'Thứ tự hiển thị', example: 0 })
  @ValidateIf((_, value) => value !== undefined)
  @Type(() => Object)
  @IsInt({ message: 'Thứ tự hiển thị phải là số nguyên' })
  @Min(0, { message: 'Thứ tự hiển thị phải từ 0' })
  @Max(2147483647, { message: 'Thứ tự hiển thị vượt giới hạn' })
  displayOrder?: number;

  @ApiProperty({ type: [UpsertPostCategoryTranslationDto], description: 'Bản dịch Việt và Trung', example: [{ languageCode: 'vi' }] })
  @IsArray({ message: 'Bản dịch phải là mảng' })
  @ArrayMinSize(1, { message: 'Cần ít nhất một bản dịch' })
  @ArrayMaxSize(2, { message: 'Chỉ hỗ trợ hai bản dịch' })
  @ArrayUnique((item: UpsertPostCategoryTranslationDto) => item?.languageCode, { message: 'Ngôn ngữ bản dịch không được trùng' })
  @IsObject({ each: true, message: 'Mỗi bản dịch phải là một đối tượng' })
  @ValidateNested({ each: true })
  @Type(() => UpsertPostCategoryTranslationDto)
  translations: UpsertPostCategoryTranslationDto[];
}
