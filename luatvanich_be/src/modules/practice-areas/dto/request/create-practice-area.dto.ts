import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ContentStatus } from '../../../../common/enums/content-status.enum';
import { UpsertPracticeAreaTranslationDto } from './upsert-practice-area-translation.dto';

export class CreatePracticeAreaDto {
  @ApiPropertyOptional({
    example: 'https://res.cloudinary.com/.../fdi-icon.svg',
    description: 'URL biểu tượng hoặc hình ảnh lĩnh vực (Cloudinary)',
    nullable: true,
  })
  @IsOptional()
  @IsString({ message: 'Icon URL phải là chuỗi ký tự' })
  @MaxLength(500, { message: 'Icon URL tối đa 500 ký tự' })
  iconUrl?: string | null;

  @ApiPropertyOptional({ example: 0, default: 0, description: 'Thứ tự sắp xếp hiển thị' })
  @ValidateIf((_, value) => value !== undefined)
  @IsInt({ message: 'Thứ tự hiển thị phải là số nguyên' })
  @Min(-2147483648)
  @Max(2147483647)
  displayOrder?: number;

  @ApiPropertyOptional({
    enum: ContentStatus,
    default: ContentStatus.DRAFT,
    description: 'Trạng thái nội dung (draft, published, archived)',
  })
  @ValidateIf((_, value) => value !== undefined)
  @IsEnum(ContentStatus, { message: 'Trạng thái nội dung không hợp lệ' })
  status?: ContentStatus;

  @ApiPropertyOptional({ example: false, default: false, description: 'Ghim nổi bật trang chủ' })
  @ValidateIf((_, value) => value !== undefined)
  @IsBoolean({ message: 'isFeatured phải là boolean' })
  isFeatured?: boolean;

  @ApiProperty({
    type: [UpsertPracticeAreaTranslationDto],
    description: 'Danh sách bản dịch (tối thiểu 1 ngôn ngữ, tối đa 2: vi và zh-CN)',
  })
  @IsArray({ message: 'translations phải là mảng' })
  @ArrayMinSize(1, { message: 'Cần có ít nhất 1 bản dịch ngôn ngữ' })
  @ArrayMaxSize(2, { message: 'Tối đa 2 bản dịch ngôn ngữ (vi, zh-CN)' })
  @ArrayUnique((translation: UpsertPracticeAreaTranslationDto) => translation?.languageCode, {
    message: 'Mỗi ngôn ngữ chỉ được có 1 bản dịch',
  })
  @IsObject({ each: true, message: 'Mỗi bản dịch phải là một object' })
  @ValidateNested({ each: true })
  @Type(() => UpsertPracticeAreaTranslationDto)
  translations: UpsertPracticeAreaTranslationDto[];
}
