import { Injectable } from '@nestjs/common';
import { ConsultationRequest } from '../entities/consultation-request.entity';
import { ConsultationNote } from '../entities/consultation-note.entity';
import {
  ConsultationAdminDto,
  ConsultationAttachmentDto,
} from '../dto/response/consultation-admin.dto';
import { ConsultationNoteDto } from '../dto/response/consultation-note.dto';

@Injectable()
export class ConsultationMapper {
  toAdminDto(entity: ConsultationRequest): ConsultationAdminDto {
    const practiceAreaName =
      entity.practiceArea?.translations?.find((t) => t.languageCode === 'vi')
        ?.name ||
      entity.practiceArea?.translations?.[0]?.name ||
      null;

    const lawyerName =
      entity.lawyer?.translations?.find((t) => t.languageCode === 'vi')
        ?.fullName ||
      entity.lawyer?.translations?.[0]?.fullName ||
      null;

    const assignedUserName =
      entity.assignedUser?.fullName ||
      entity.assignedUser?.email ||
      null;

    const attachments: ConsultationAttachmentDto[] = (entity.attachments || []).map(
      (att) => ({
        id: att.id,
        fileName: att.fileName,
        fileUrl: att.fileUrl,
        fileType: att.fileType ?? null,
        fileSizeBytes: att.fileSizeBytes ? Number(att.fileSizeBytes) : null,
        createdAt: att.createdAt,
      }),
    );

    const notes: ConsultationNoteDto[] = (entity.notes || []).map((n) =>
      this.toNoteDto(n),
    );

    return {
      id: entity.id,
      fullName: entity.fullName,
      companyName: entity.companyName ?? null,
      phone: entity.phone,
      email: entity.email ?? null,
      contactChannel: entity.contactChannel,
      contactChannelId: entity.contactChannelId ?? null,
      preferredContactTime: entity.preferredContactTime ?? null,
      practiceAreaId: entity.practiceAreaId ?? null,
      practiceAreaName,
      lawyerId: entity.lawyerId ?? null,
      lawyerName,
      assignedUserId: entity.assignedUserId ?? null,
      assignedUserName,
      languageCode: entity.languageCode,
      title: entity.title ?? null,
      content: entity.content,
      consent: entity.consent,
      status: entity.status,
      ipAddress: entity.ipAddress ?? null,
      userAgent: entity.userAgent ?? null,
      attachments,
      notes,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toNoteDto(note: ConsultationNote): ConsultationNoteDto {
    return {
      id: note.id,
      consultationRequestId: note.consultationRequestId,
      authorId: note.authorId ?? null,
      authorName: note.author?.fullName || note.authorName || 'Thành viên nội bộ',
      note: note.note,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    };
  }
}
