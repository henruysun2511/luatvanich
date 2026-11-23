import { IsArray, IsEnum, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LeadStatus } from '../../enums/lead-status.enum';

export class BulkStatusConsultationDto {
  @ApiProperty({ description: 'Danh sách ID yêu cầu tư vấn cần cập nhật', type: [String] })
  @IsArray()
  @IsUUID('4', { each: true, message: 'Danh sách ID không hợp lệ' })
  ids: string[];

  @ApiProperty({ description: 'Trạng thái lead mới áp dụng', enum: LeadStatus })
  @IsEnum(LeadStatus)
  status: LeadStatus;
}
