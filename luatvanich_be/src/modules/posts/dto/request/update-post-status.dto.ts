import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, Matches, ValidateIf } from 'class-validator';
import { PostStatus } from '../../enums/post-status.enum';

export class UpdatePostStatusDto {
  @ApiProperty({ description: 'Trạng thái bài viết', example: 'published', enum: PostStatus })
  @IsEnum(PostStatus, { message: 'Trạng thái bài viết không hợp lệ' })
  status: PostStatus;

  @ApiPropertyOptional({ description: 'Thời điểm đăng theo ISO 8601 có múi giờ', example: '2026-12-01T09:00:00+07:00' })
  @ValidateIf((dto: UpdatePostStatusDto, value) => dto.status === PostStatus.SCHEDULED || value !== undefined)
  @IsDateString({ strict: true }, { message: 'Thời điểm đăng phải là ngày giờ ISO 8601 hợp lệ' })
  @Matches(/T\d{2}:\d{2}.*(?:Z|[+-]\d{2}:\d{2})$/i, { message: 'Thời điểm đăng phải gồm giờ và múi giờ' })
  publishAt?: string;
}
