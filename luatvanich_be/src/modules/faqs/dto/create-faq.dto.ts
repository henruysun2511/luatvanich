import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LangCode } from '../../../common/enums/lang.enum';

export class FaqTranslationDto {
  @ApiProperty({ example: 'vi', enum: LangCode })
  @IsString()
  @IsNotEmpty()
  languageCode: LangCode;

  @ApiProperty({ example: 'Thủ tục thành lập công ty FDI tại Việt Nam mất bao lâu?' })
  @IsString()
  @IsNotEmpty({ message: 'Câu hỏi không được để trống' })
  question: string;

  @ApiProperty({ example: 'Thông thường quy trình cấp IRC và ERC mất từ 25 - 45 ngày làm việc...' })
  @IsString()
  @IsNotEmpty({ message: 'Câu trả lời không được để trống' })
  answer: string;

  @ApiProperty({ default: true, required: false })
  @IsOptional()
  @IsBoolean()
  isComplete?: boolean;
}

export class CreateFaqDto {
  @ApiProperty({ example: 'investment', required: false, default: 'general' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ example: 0, required: false, default: 0 })
  @IsOptional()
  @IsInt()
  displayOrder?: number;

  @ApiProperty({ example: true, required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ type: [FaqTranslationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FaqTranslationDto)
  translations: FaqTranslationDto[];
}
