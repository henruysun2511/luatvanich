import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LawyerTeamGroup } from '../../enums/lawyer-team-group.enum';

export class LawyerPublicDto {
  @ApiProperty() id: string;
  @ApiProperty() slug: string;
  @ApiProperty() fullName: string;
  @ApiPropertyOptional() latinName?: string;
  @ApiPropertyOptional() title?: string;
  @ApiPropertyOptional() secondaryTitle?: string;
  @ApiPropertyOptional() academicTitle?: string;
  @ApiProperty({ enum: LawyerTeamGroup }) teamGroup: LawyerTeamGroup;
  @ApiPropertyOptional() avatarUrl?: string;
  @ApiPropertyOptional() officeName?: string;
  @ApiPropertyOptional() experienceYears?: number;
  @ApiProperty() isFeatured: boolean;
  @ApiProperty() displayOrder: number;
  @ApiPropertyOptional() primaryArea?: string;
  @ApiPropertyOptional() languages?: string[];
  @ApiPropertyOptional() fallback?: boolean;
}

export class LawyerDetailPublicDto extends LawyerPublicDto {
  @ApiPropertyOptional() bio?: string;
  @ApiPropertyOptional() barAssociation?: string;
  @ApiPropertyOptional() email?: string;
  @ApiPropertyOptional() mobilePhone?: string;
  @ApiPropertyOptional() officePhone?: string;
  @ApiPropertyOptional() wechatId?: string;
  @ApiPropertyOptional() wechatQrUrl?: string;
  @ApiPropertyOptional() metaTitle?: string;
  @ApiPropertyOptional() metaDescription?: string;
  @ApiPropertyOptional() credentials?: Array<{
    id: string;
    kind: string;
    yearStart?: number;
    yearEnd?: number;
    title: string;
    institution?: string;
    description?: string;
  }>;
  @ApiPropertyOptional() practiceAreas?: Array<{
    id: string;
    name: string;
    slug: string;
    isPrimary: boolean;
  }>;
}
