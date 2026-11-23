import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ContentStatus } from '../../../../common/enums/content-status.enum';
import { LawyerTeamGroup } from '../../enums/lawyer-team-group.enum';
import { UpsertLawyerTranslationDto } from './upsert-lawyer-translation.dto';
import { UpsertLawyerCredentialDto } from './upsert-lawyer-credential.dto';

export class LawyerPracticeAreaInputDto {
  @ApiProperty({ description: 'UUID lĩnh vực pháp lý' })
  @IsUUID()
  practiceAreaId: string;

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsInt()
  @IsOptional()
  displayOrder?: number;
}

export class LawyerLanguageInputDto {
  @ApiProperty({ example: 'vi' })
  @IsString()
  languageCode: string;

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  isNative?: boolean;
}

export class CreateLawyerDto {
  @ApiPropertyOptional({ description: 'UUID văn phòng trực thuộc' })
  @IsUUID()
  @IsOptional()
  officeId?: string;

  @ApiProperty({ enum: LawyerTeamGroup, default: LawyerTeamGroup.CHINESE_TEAM })
  @IsEnum(LawyerTeamGroup)
  @IsOptional()
  teamGroup?: LawyerTeamGroup;

  @ApiPropertyOptional({ description: 'URL ảnh chân dung tỷ lệ 4:5' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  avatarUrl?: string;

  @ApiPropertyOptional({ description: 'Số thẻ luật sư / Số giấy phép' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  licenseNumber?: string;

  @ApiPropertyOptional({ description: 'URL scan thẻ luật sư / giấy phép' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  licenseImageUrl?: string;

  @ApiPropertyOptional({ description: 'Đoàn luật sư trực thuộc' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  barAssociation?: string;

  @ApiPropertyOptional({ example: 'lawyer@wanyimail.com' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  email?: string;

  @ApiPropertyOptional({ example: '0901234567' })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  mobilePhone?: string;

  @ApiPropertyOptional({ example: '024-38258888' })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  officePhone?: string;

  @ApiPropertyOptional({ example: 'lawyer_wechat_id' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  wechatId?: string;

  @ApiPropertyOptional({ description: 'URL ảnh mã QR WeChat' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  wechatQrUrl?: string;

  @ApiPropertyOptional({ example: '2010-05-15', description: 'Ngày bắt đầu hành nghề' })
  @IsString()
  @IsOptional()
  practiceStartDate?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsInt()
  @IsOptional()
  displayOrder?: number;

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @ApiPropertyOptional({ enum: ContentStatus, default: ContentStatus.DRAFT })
  @IsEnum(ContentStatus)
  @IsOptional()
  status?: ContentStatus;

  @ApiProperty({ type: [UpsertLawyerTranslationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpsertLawyerTranslationDto)
  translations: UpsertLawyerTranslationDto[];

  @ApiPropertyOptional({ type: [LawyerPracticeAreaInputDto] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LawyerPracticeAreaInputDto)
  practiceAreas?: LawyerPracticeAreaInputDto[];

  @ApiPropertyOptional({ type: [LawyerLanguageInputDto] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LawyerLanguageInputDto)
  languages?: LawyerLanguageInputDto[];

  @ApiPropertyOptional({ type: [UpsertLawyerCredentialDto] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpsertLawyerCredentialDto)
  credentials?: UpsertLawyerCredentialDto[];
}
