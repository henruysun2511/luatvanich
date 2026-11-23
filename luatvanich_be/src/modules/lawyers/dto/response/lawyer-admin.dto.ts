import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContentStatus } from '../../../../common/enums/content-status.enum';
import { LawyerTeamGroup } from '../../enums/lawyer-team-group.enum';
import { CredentialKind } from '../../enums/credential-kind.enum';

export class LawyerTranslationAdminDto {
  @ApiProperty() languageCode: string;
  @ApiProperty() fullName: string;
  @ApiPropertyOptional() latinName?: string;
  @ApiProperty() slug: string;
  @ApiPropertyOptional() title?: string;
  @ApiPropertyOptional() secondaryTitle?: string;
  @ApiPropertyOptional() academicTitle?: string;
  @ApiPropertyOptional() affiliatedOrganization?: string;
  @ApiPropertyOptional() bio?: string;
  @ApiPropertyOptional() metaTitle?: string;
  @ApiPropertyOptional() metaDescription?: string;
  @ApiProperty() isComplete: boolean;
  @ApiProperty() updatedAt: Date;
}

export class LawyerCredentialAdminDto {
  @ApiProperty() id: string;
  @ApiProperty({ enum: CredentialKind }) kind: CredentialKind;
  @ApiPropertyOptional() yearStart?: number;
  @ApiPropertyOptional() yearEnd?: number;
  @ApiProperty() displayOrder: number;
  @ApiProperty() translations: Array<{
    languageCode: string;
    title: string;
    institution?: string;
    description?: string;
  }>;
}

export class LawyerAdminDto {
  @ApiProperty() id: string;
  @ApiPropertyOptional() officeId?: string;
  @ApiPropertyOptional() officeName?: string;
  @ApiPropertyOptional() userId?: string;
  @ApiProperty({ enum: LawyerTeamGroup }) teamGroup: LawyerTeamGroup;
  @ApiPropertyOptional() avatarUrl?: string;
  @ApiPropertyOptional() licenseNumber?: string;
  @ApiPropertyOptional() licenseImageUrl?: string;
  @ApiPropertyOptional() barAssociation?: string;
  @ApiPropertyOptional() email?: string;
  @ApiPropertyOptional() mobilePhone?: string;
  @ApiPropertyOptional() officePhone?: string;
  @ApiPropertyOptional() wechatId?: string;
  @ApiPropertyOptional() wechatQrUrl?: string;
  @ApiPropertyOptional() practiceStartDate?: string;
  @ApiPropertyOptional() experienceYears?: number;
  @ApiProperty() displayOrder: number;
  @ApiProperty() isFeatured: boolean;
  @ApiProperty({ enum: ContentStatus }) status: ContentStatus;
  @ApiProperty({ type: [LawyerTranslationAdminDto] }) translations: LawyerTranslationAdminDto[];
  @ApiPropertyOptional() practiceAreas?: Array<{
    id: string;
    name: string;
    isPrimary: boolean;
  }>;
  @ApiPropertyOptional() languages?: Array<{
    languageCode: string;
    isNative: boolean;
  }>;
  @ApiPropertyOptional({ type: [LawyerCredentialAdminDto] }) credentials?: LawyerCredentialAdminDto[];
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}
