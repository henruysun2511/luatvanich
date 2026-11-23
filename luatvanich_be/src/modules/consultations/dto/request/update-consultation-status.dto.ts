import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LeadStatus } from '../../enums/lead-status.enum';

export class UpdateConsultationStatusDto {
  @ApiProperty({ description: 'Trạng thái lead mới', enum: LeadStatus })
  @IsNotEmpty({ message: 'Trạng thái không được để trống' })
  @IsEnum(LeadStatus, { message: 'Trạng thái không hợp lệ' })
  status: LeadStatus;
}
