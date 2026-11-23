import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { BaseQueryDto } from '../../../../common/dto/base-query.dto';
import { LangCode } from '../../../../common/enums/lang.enum';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, IsUUID, Max, MaxLength, Min, ValidateIf } from 'class-validator';
import { PostSection } from '../../enums/post-section.enum';
import { PostStatus } from '../../enums/post-status.enum';

export class PostQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({ description: 'Phân vùng nội dung', example: "news", enum: PostSection })
  @ValidateIf((_, value) => value !== undefined)
  @IsEnum(PostSection, { message: 'Phân vùng phải là news, handbook hoặc knowledge_base' })
  section?: PostSection;

  @ApiPropertyOptional({ description: 'Slug chuyên mục', example: "dau-tu" })
  @ValidateIf((_, value) => value !== undefined)
  @Type(() => Object)
  @IsString({ message: 'Slug chuyên mục phải là chuỗi' })
  @MaxLength(220, { message: 'Slug chuyên mục tối đa 220 ký tự' })
  categorySlug?: string;

  @ApiPropertyOptional({ description: 'Slug thẻ', example: "fdi" })
  @ValidateIf((_, value) => value !== undefined)
  @Type(() => Object)
  @IsString({ message: 'Slug thẻ phải là chuỗi' })
  @MaxLength(120, { message: 'Slug thẻ tối đa 120 ký tự' })
  tagSlug?: string;

  @ApiPropertyOptional({ description: 'ID luật sư', example: "a3da8be5-519e-4459-930f-ea3bd1eaf15c" })
  @ValidateIf((_, value) => value !== undefined)
  @Type(() => Object)
  @IsUUID('4', { message: 'ID luật sư phải là UUID v4 hợp lệ' })
  lawyerId?: string;

  @ApiPropertyOptional({ description: 'ID dịch vụ', example: "a3da8be5-519e-4459-930f-ea3bd1eaf15c" })
  @ValidateIf((_, value) => value !== undefined)
  @Type(() => Object)
  @IsUUID('4', { message: 'ID dịch vụ phải là UUID v4 hợp lệ' })
  serviceId?: string;

  @ApiPropertyOptional({ description: 'Ngôn ngữ nội dung', example: "vi", enum: LangCode })
  @IsOptional()
  @IsEnum(LangCode, { message: 'Ngôn ngữ phải là vi hoặc zh-CN' })
  lang?: LangCode;
}

export class AdminPostQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({ description: 'Trạng thái bài viết', example: "draft", enum: PostStatus })
  @IsOptional()
  @IsEnum(PostStatus, { message: 'Trạng thái bài viết không hợp lệ' })
  status?: PostStatus;

  @ApiPropertyOptional({ description: 'ID chuyên mục', example: "a3da8be5-519e-4459-930f-ea3bd1eaf15c" })
  @ValidateIf((_, value) => value !== undefined)
  @Type(() => Object)
  @IsUUID('4', { message: 'ID chuyên mục phải là UUID v4 hợp lệ' })
  categoryId?: string;

  @ApiPropertyOptional({ description: 'ID luật sư tác giả', example: "a3da8be5-519e-4459-930f-ea3bd1eaf15c" })
  @ValidateIf((_, value) => value !== undefined)
  @Type(() => Object)
  @IsUUID('4', { message: 'ID luật sư tác giả phải là UUID v4 hợp lệ' })
  authorLawyerId?: string;

  @ApiPropertyOptional({ description: 'Ghim nổi bật', example: true })
  @ValidateIf((_, value) => value !== undefined)
  @Type(() => Object)
  @Transform(({ value }) => value === 'true' ? true : value === 'false' ? false : value)
  @IsBoolean({ message: 'Ghim nổi bật phải là true hoặc false' })
  isFeatured?: boolean;

  @ApiPropertyOptional({ description: 'Ngôn ngữ nội dung', example: "vi", enum: LangCode })
  @IsOptional()
  @IsEnum(LangCode, { message: 'Ngôn ngữ phải là vi hoặc zh-CN' })
  lang?: LangCode;
}

export class LatestPostQueryDto {
  @ApiPropertyOptional({ description: 'Số bài viết cần hiển thị', example: 5 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Limit phải là số nguyên' })
  @Min(1, { message: 'Limit phải từ 1' })
  @Max(100, { message: 'Limit tối đa 100' })
  limit?: number = 5;

  @ApiPropertyOptional({ description: 'Slug chuyên mục', example: "dau-tu" })
  @ValidateIf((_, value) => value !== undefined)
  @Type(() => Object)
  @IsString({ message: 'Slug chuyên mục phải là chuỗi' })
  @MaxLength(220, { message: 'Slug chuyên mục tối đa 220 ký tự' })
  category?: string;

  @ApiPropertyOptional({ description: 'Ngôn ngữ nội dung', example: "vi", enum: LangCode })
  @IsOptional()
  @IsEnum(LangCode, { message: 'Ngôn ngữ phải là vi hoặc zh-CN' })
  lang?: LangCode;
}

export class RelatedPostQueryDto {
  @ApiPropertyOptional({ description: 'Số bài viết cần hiển thị', example: 5 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Limit phải là số nguyên' })
  @Min(1, { message: 'Limit phải từ 1' })
  @Max(100, { message: 'Limit tối đa 100' })
  limit?: number = 5;

  @ApiPropertyOptional({ enum: LangCode, description: 'Ngôn ngữ nội dung', example: 'vi' })
  @IsOptional()
  @IsEnum(LangCode, { message: 'Ngôn ngữ phải là vi hoặc zh-CN' })
  lang?: LangCode;
}
