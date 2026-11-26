import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LegalServicePublicDto } from './legal-service-public.dto';

export class LegalServiceDetailPublicDto extends LegalServicePublicDto {
  @ApiProperty({ type: String, nullable: true })
  practiceAreaId: string | null;

  @ApiProperty({ type: 'object', additionalProperties: { type: 'string' } })
  localizedSlugs: Partial<Record<'vi' | 'zh-CN', string>>;

  @ApiProperty({ type: [String] })
  processSteps: string[];

  @ApiProperty({ type: [String] })
  referenceFees: string[];

  @ApiPropertyOptional()
  feeStructure?: string;

  @ApiPropertyOptional()
  estimatedTime?: string;
}
