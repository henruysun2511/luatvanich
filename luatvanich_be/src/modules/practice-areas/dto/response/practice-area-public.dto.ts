import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LegalServicePublicDto } from '../../../legal-services/dto/response/legal-service-public.dto';

export class PracticeAreaPublicDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  iconUrl?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  isFeatured: boolean;

  @ApiProperty()
  servicesCount: number;

  @ApiPropertyOptional()
  metaTitle?: string;

  @ApiPropertyOptional()
  metaDescription?: string;
}

export class PracticeAreaDetailPublicDto extends PracticeAreaPublicDto {
  @ApiProperty({ type: [LegalServicePublicDto] })
  services: LegalServicePublicDto[];
}
