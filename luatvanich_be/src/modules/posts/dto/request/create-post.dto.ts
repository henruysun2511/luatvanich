import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsObject,
  IsOptional,
  IsUrl,
  IsUUID,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { UpsertPostTranslationDto } from './upsert-post-translation.dto';

export class CreatePostDto {
  @ApiProperty({ description: 'Chuyên mục', example: 'a3da8be5-519e-4459-930f-ea3bd1eaf15c' })
  @IsUUID('4', { message: 'Chuyên mục phải là UUID v4 hợp lệ' })
  categoryId: string;

  @ApiPropertyOptional({
    description: 'Luật sư tác giả',
    example: 'a3da8be5-519e-4459-930f-ea3bd1eaf15c',
    nullable: true,
    type: String,
  })
  @IsOptional()
  @IsUUID('4', { message: 'Luật sư tác giả phải là UUID v4 hợp lệ' })
  authorLawyerId?: string | null;

  @ApiPropertyOptional({
    description: 'URL ảnh bìa',
    example: 'https://res.cloudinary.com/example/image/upload/posts/cover.jpg',
    nullable: true,
    type: String,
  })
  @IsOptional()
  @IsUrl(
    { protocols: ['http', 'https'], require_protocol: true, require_tld: false, disallow_auth: true },
    { message: 'URL ảnh bìa phải là địa chỉ HTTP hoặc HTTPS hợp lệ' },
  )
  @MaxLength(500, { message: 'URL ảnh bìa tối đa 500 ký tự' })
  thumbnailUrl?: string | null;

  @ApiPropertyOptional({ description: 'Ghim nổi bật', example: true, default: false })
  @ValidateIf((_, value) => value !== undefined)
  @IsBoolean({ message: 'Ghim nổi bật phải là true hoặc false' })
  isFeatured?: boolean;

  @ApiPropertyOptional({
    description: 'Danh sách tên thẻ (hệ thống tự động tìm thẻ có sẵn hoặc tạo mới)',
    example: ['Đầu tư FDI', 'Luật Doanh Nghiệp'],
    type: [String],
  })
  @ValidateIf((_, value) => value !== undefined)
  @IsArray({ message: 'Danh sách thẻ phải là mảng' })
  @ArrayMaxSize(50, { message: 'Danh sách thẻ tối đa 50 mục' })
  @MaxLength(100, { each: true, message: 'Tên thẻ tối đa 100 ký tự' })
  tags?: string[];

  @ApiPropertyOptional({
    description: 'Danh sách ID thẻ (nếu có sẵn ID)',
    example: ['a3da8be5-519e-4459-930f-ea3bd1eaf15c'],
    type: [String],
  })
  @ValidateIf((_, value) => value !== undefined)
  @IsArray({ message: 'Danh sách thẻ phải là mảng' })
  @ArrayMaxSize(100, { message: 'Danh sách thẻ vượt quá số mục cho phép' })
  @ArrayUnique((id: unknown) => (typeof id === 'string' ? id.toLowerCase() : id), {
    message: 'Danh sách thẻ không được trùng ID',
  })
  @IsUUID('4', { each: true, message: 'Danh sách thẻ phải chứa UUID v4 hợp lệ' })
  tagIds?: string[];

  @ApiPropertyOptional({
    description: 'Danh sách dịch vụ liên quan',
    example: ['a3da8be5-519e-4459-930f-ea3bd1eaf15c'],
    type: [String],
  })
  @ValidateIf((_, value) => value !== undefined)
  @IsArray({ message: 'Danh sách dịch vụ liên quan phải là mảng' })
  @ArrayMaxSize(100, { message: 'Danh sách dịch vụ liên quan vượt quá số mục cho phép' })
  @ArrayUnique((id: unknown) => (typeof id === 'string' ? id.toLowerCase() : id), {
    message: 'Danh sách dịch vụ liên quan không được trùng ID',
  })
  @IsUUID('4', { each: true, message: 'Danh sách dịch vụ liên quan phải chứa UUID v4 hợp lệ' })
  serviceIds?: string[];

  @ApiProperty({
    type: [UpsertPostTranslationDto],
    description: 'Bản dịch Việt và Trung',
    example: [{ languageCode: 'vi', title: 'Đầu tư FDI', contentHtml: '<p>Nội dung</p>' }],
  })
  @IsArray({ message: 'Bản dịch phải là mảng' })
  @ArrayMinSize(1, { message: 'Cần ít nhất một bản dịch' })
  @ArrayMaxSize(2, { message: 'Chỉ hỗ trợ hai bản dịch' })
  @ArrayUnique((item: UpsertPostTranslationDto) => item?.languageCode, {
    message: 'Ngôn ngữ bản dịch không được trùng',
  })
  @IsObject({ each: true, message: 'Mỗi bản dịch phải là một đối tượng' })
  @ValidateNested({ each: true })
  @Type(() => UpsertPostTranslationDto)
  translations: UpsertPostTranslationDto[];
}
