import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ContentStatus } from '../../../../common/enums/content-status.enum';

export class UpdateLawyerStatusDto {
  @ApiProperty({ enum: ContentStatus })
  @IsEnum(ContentStatus)
  status: ContentStatus;
}
