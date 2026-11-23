import { IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class AssignConsultationDto {
  @ApiPropertyOptional({ description: 'ID nhân sự phụ trách xử lý lead (null để hủy phân công)' })
  @IsOptional()
  @IsUUID('4', { message: 'ID nhân sự không hợp lệ' })
  assignedUserId?: string | null;
}
