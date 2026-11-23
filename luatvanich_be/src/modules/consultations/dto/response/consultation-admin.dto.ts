import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LeadStatus } from '../../enums/lead-status.enum';
import { ContactChannel } from '../../enums/contact-channel.enum';
import { ConsultationNoteDto } from './consultation-note.dto';

export class ConsultationAttachmentDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fileName: string;

  @ApiProperty()
  fileUrl: string;

  @ApiPropertyOptional()
  fileType?: string | null;

  @ApiPropertyOptional()
  fileSizeBytes?: number | null;

  @ApiProperty()
  createdAt: Date;
}

export class ConsultationAdminDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fullName: string;

  @ApiPropertyOptional()
  companyName?: string | null;

  @ApiProperty()
  phone: string;

  @ApiPropertyOptional()
  email?: string | null;

  @ApiProperty({ enum: ContactChannel })
  contactChannel: ContactChannel;

  @ApiPropertyOptional()
  contactChannelId?: string | null;

  @ApiPropertyOptional()
  preferredContactTime?: string | null;

  @ApiPropertyOptional()
  practiceAreaId?: string | null;

  @ApiPropertyOptional()
  practiceAreaName?: string | null;

  @ApiPropertyOptional()
  lawyerId?: string | null;

  @ApiPropertyOptional()
  lawyerName?: string | null;

  @ApiPropertyOptional()
  assignedUserId?: string | null;

  @ApiPropertyOptional()
  assignedUserName?: string | null;

  @ApiProperty()
  languageCode: string;

  @ApiPropertyOptional()
  title?: string | null;

  @ApiProperty()
  content: string;

  @ApiProperty()
  consent: boolean;

  @ApiProperty({ enum: LeadStatus })
  status: LeadStatus;

  @ApiPropertyOptional()
  ipAddress?: string | null;

  @ApiPropertyOptional()
  userAgent?: string | null;

  @ApiProperty({ type: [ConsultationAttachmentDto] })
  attachments: ConsultationAttachmentDto[];

  @ApiProperty({ type: [ConsultationNoteDto] })
  notes: ConsultationNoteDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
