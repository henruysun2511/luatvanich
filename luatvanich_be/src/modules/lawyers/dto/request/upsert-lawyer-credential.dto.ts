import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CredentialKind } from '../../enums/credential-kind.enum';
import { LangCode } from '../../../../common/enums/lang.enum';

export class UpsertLawyerCredentialTranslationDto {
  @ApiProperty({ enum: LangCode, example: LangCode.VI })
  @IsEnum(LangCode)
  languageCode: LangCode;

  @ApiProperty({ example: 'Thạc sĩ Luật Quốc tế' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({ example: 'Đại học Quốc gia Hà Nội' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  institution?: string;

  @ApiPropertyOptional({ example: 'Chuyên ngành Luật Thương mại Quốc tế' })
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpsertLawyerCredentialDto {
  @ApiPropertyOptional({ description: 'ID credential nếu cập nhật' })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ enum: CredentialKind })
  @IsEnum(CredentialKind)
  kind: CredentialKind;

  @ApiPropertyOptional({ example: 2015 })
  @IsInt()
  @IsOptional()
  yearStart?: number;

  @ApiPropertyOptional({ example: 2017 })
  @IsInt()
  @IsOptional()
  yearEnd?: number;

  @ApiPropertyOptional({ default: 0 })
  @IsInt()
  @IsOptional()
  displayOrder?: number;

  @ApiProperty({ type: [UpsertLawyerCredentialTranslationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpsertLawyerCredentialTranslationDto)
  translations: UpsertLawyerCredentialTranslationDto[];
}
