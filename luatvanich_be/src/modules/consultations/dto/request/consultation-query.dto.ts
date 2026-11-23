import { IsOptional, IsEnum, IsUUID, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { LeadStatus } from '../../enums/lead-status.enum';
import { ContactChannel } from '../../enums/contact-channel.enum';

export class ConsultationQueryDto {
  @ApiPropertyOptional({ description: 'Từ khóa tìm kiếm (họ tên, email, SĐT, nội dung)' })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({ description: 'Lọc theo trạng thái lead', enum: LeadStatus })
  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

  @ApiPropertyOptional({ description: 'Lọc theo kênh liên hệ', enum: ContactChannel })
  @IsOptional()
  @IsEnum(ContactChannel)
  contactChannel?: ContactChannel;

  @ApiPropertyOptional({ description: 'Lọc theo lĩnh vực pháp lý' })
  @IsOptional()
  @IsUUID('4')
  practiceAreaId?: string;

  @ApiPropertyOptional({ description: 'Lọc theo luật sư chỉ định' })
  @IsOptional()
  @IsUUID('4')
  lawyerId?: string;

  @ApiPropertyOptional({ description: 'Lọc theo nhân sự được phân công' })
  @IsOptional()
  @IsUUID('4')
  assignedUserId?: string;

  @ApiPropertyOptional({ description: 'Từ ngày (ISO date string)' })
  @IsOptional()
  @IsString()
  fromDate?: string;

  @ApiPropertyOptional({ description: 'Đến ngày (ISO date string)' })
  @IsOptional()
  @IsString()
  toDate?: string;

  @ApiPropertyOptional({ description: 'Số trang', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Số bản ghi mỗi trang', default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20;
}
