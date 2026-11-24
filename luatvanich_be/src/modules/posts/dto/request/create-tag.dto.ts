import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsObject,
  IsOptional,
  Matches,
  ValidateNested,
} from 'class-validator';
import { UpsertTagTranslationDto } from './upsert-tag-translation.dto';

export class CreateTagDto {
  @ApiPropertyOptional({ description: 'Màu thẻ', example: '#0284c7', nullable: true, type: String })
  @IsOptional()
  @Matches(/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i, { message: 'Màu thẻ phải có dạng #RGB hoặc #RRGGBB' })
  colorHex?: string | null;

  @ApiProperty({
    type: [UpsertTagTranslationDto],
    description: 'Bản dịch Việt và Trung',
    example: [{ languageCode: 'vi', name: 'Đầu tư FDI' }],
  })
  @IsArray({ message: 'Bản dịch phải là mảng' })
  @ArrayMinSize(1, { message: 'Cần ít nhất một bản dịch' })
  @ArrayMaxSize(2, { message: 'Chỉ hỗ trợ hai bản dịch' })
  @ArrayUnique((item: UpsertTagTranslationDto) => item?.languageCode, {
    message: 'Ngôn ngữ bản dịch không được trùng',
  })
  @IsObject({ each: true, message: 'Mỗi bản dịch phải là một đối tượng' })
  @ValidateNested({ each: true })
  @Type(() => UpsertTagTranslationDto)
  translations: UpsertTagTranslationDto[];
}
