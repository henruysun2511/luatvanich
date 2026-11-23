import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize, ArrayMinSize, ArrayUnique, IsArray, IsBoolean, IsDateString, IsEnum,
  IsInt, IsNotEmpty, IsObject, IsOptional, IsString, IsUrl, Matches, Max, MaxLength, Min,
  ValidateIf, ValidateNested,
} from 'class-validator';
import { BaseQueryDto } from '../../common/dto/base-query.dto';
import { LangCode } from '../../common/enums/lang.enum';
import { CredentialKind, LawyerGroup, LawyerStatus } from './lawyer.enums';

export class LawyerTranslationDto {
  @ApiProperty({ enum: LangCode })
  @IsEnum(LangCode)
  languageCode: LangCode;

  @ApiProperty()
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  fullName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(150)
  latinName?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  @MaxLength(220)
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(150)
  academicTitle?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bio?: string | null;
}

export class LawyerLanguageDto {
  @ApiProperty({ example: 'zh-CN' })
  @Matches(/^[a-z]{2,3}(?:-[A-Z]{2})?$/)
  languageCode: string;

  @ApiPropertyOptional()
  @ValidateIf((_, value) => value !== undefined)
  @Type(() => Object)
  @IsBoolean()
  isNative?: boolean;
}

export class LawyerLanguagesDto {
  @ApiProperty({ type: [LawyerLanguageDto] })
  @IsArray()
  @ArrayMaxSize(30)
  @ArrayUnique((language: LawyerLanguageDto) => language?.languageCode)
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => LawyerLanguageDto)
  languages: LawyerLanguageDto[];
}

export class CreateLawyerDto {
  @ApiProperty({ type: [LawyerTranslationDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  @ArrayUnique((translation: LawyerTranslationDto) => translation?.languageCode)
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => LawyerTranslationDto)
  translations: LawyerTranslationDto[];

  @ApiPropertyOptional({ type: [LawyerLanguageDto] })
  @ValidateIf((_, value) => value !== undefined)
  @IsArray()
  @ArrayMaxSize(30)
  @ArrayUnique((language: LawyerLanguageDto) => language?.languageCode)
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => LawyerLanguageDto)
  languages?: LawyerLanguageDto[];

  @ApiPropertyOptional({ enum: LawyerGroup })
  @ValidateIf((_, value) => value !== undefined)
  @IsEnum(LawyerGroup)
  teamGroup?: LawyerGroup;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true, require_tld: false })
  @MaxLength(500)
  avatarUrl?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  licenseNumber?: string | null;

  @ApiPropertyOptional({ example: '2010-06-15' })
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsDateString({ strict: true })
  practiceStartDate?: string | null;

  @ApiPropertyOptional()
  @ValidateIf((_, value) => value !== undefined)
  @IsInt()
  @Min(0)
  @Max(2147483647)
  displayOrder?: number;

  @ApiPropertyOptional()
  @ValidateIf((_, value) => value !== undefined)
  @Type(() => Object)
  @IsBoolean()
  isFeatured?: boolean;
}

export class UpdateLawyerDto extends PartialType(CreateLawyerDto, { skipNullProperties: false }) {}

export class UpdateLawyerStatusDto {
  @ApiProperty({ enum: LawyerStatus })
  @IsEnum(LawyerStatus)
  status: LawyerStatus;
}

export class LawyerQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({ enum: LawyerGroup })
  @IsOptional()
  @IsEnum(LawyerGroup)
  group?: LawyerGroup;

  @ApiPropertyOptional({ enum: LawyerStatus })
  @IsOptional()
  @IsEnum(LawyerStatus)
  status?: LawyerStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @Matches(/^[a-z]{2,3}(?:-[A-Z]{2})?$/)
  language?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(9999)
  experienceMin?: number;
}

export class PublicLawyerQueryDto extends OmitType(LawyerQueryDto, ['status'] as const) {
  @ApiPropertyOptional({ enum: LangCode })
  @IsOptional()
  @IsEnum(LangCode)
  lang?: LangCode;
}

export class CredentialTranslationDto {
  @ApiProperty({ enum: LangCode })
  @IsEnum(LangCode)
  languageCode: LangCode;

  @ApiProperty()
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  institution?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string | null;
}

export class CreateCredentialDto {
  @ApiProperty({ enum: CredentialKind })
  @IsEnum(CredentialKind)
  kind: CredentialKind;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(9999)
  yearStart?: number | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(9999)
  yearEnd?: number | null;

  @ApiPropertyOptional()
  @ValidateIf((_, value) => value !== undefined)
  @IsInt()
  @Min(0)
  @Max(2147483647)
  displayOrder?: number;

  @ApiProperty({ type: [CredentialTranslationDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  @ArrayUnique((translation: CredentialTranslationDto) => translation?.languageCode)
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => CredentialTranslationDto)
  translations: CredentialTranslationDto[];
}

export class UpdateCredentialDto extends PartialType(CreateCredentialDto, { skipNullProperties: false }) {}
