import {
  IsString, IsNotEmpty, IsOptional, MaxLength, IsEnum,
  IsBoolean, IsInt, IsArray, ValidateNested, IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContentStatus } from '../../../../common/enums/content-status.enum';
import { UpsertOfficeTranslationDto } from './upsert-office-translation.dto';

export class CreateOfficeDto {
  @ApiProperty({ example: 'hanoi_hq', description: 'Mã định danh duy nhất của văn phòng' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code: string;

  @ApiPropertyOptional({ example: '+84 24 3792 0999' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  phone?: string;

  @ApiPropertyOptional({ example: '+84 24 3792 0998' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  fax?: string;

  @ApiPropertyOptional({ example: 'hanoi@luatvanich.vn' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  email?: string;

  @ApiPropertyOptional({ example: 'luatvanich_hanoi' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  wechatId?: string;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/.../wechat_qr.png' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  wechatQrUrl?: string;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/.../office_building.jpg' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  imageUrl?: string;

  @ApiPropertyOptional({ example: 21.053894 })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({ example: 105.781845 })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiPropertyOptional({ example: 'https://www.google.com/maps/embed?...' })
  @IsOptional()
  @IsString()
  mapEmbedUrl?: string;

  @ApiPropertyOptional({ example: true, default: false })
  @IsOptional()
  @IsBoolean()
  isHeadquarters?: boolean;

  @ApiPropertyOptional({ example: 0, default: 0 })
  @IsOptional()
  @IsInt()
  displayOrder?: number;

  @ApiPropertyOptional({ enum: ContentStatus, default: ContentStatus.DRAFT })
  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;

  @ApiProperty({ type: [UpsertOfficeTranslationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpsertOfficeTranslationDto)
  translations: UpsertOfficeTranslationDto[];
}
