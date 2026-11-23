import { Injectable } from '@nestjs/common';
import { ConsultationRequestRepository } from '../repositories/consultation-request.repository';
import { ConsultationAttachmentRepository } from '../repositories/consultation-attachment.repository';
import { ConsultationNoteRepository } from '../repositories/consultation-note.repository';
import { ConsultationMapper } from '../mapper/consultation.mapper';
import { CreateConsultationDto } from '../dto/request/create-consultation.dto';
import { ConsultationQueryDto } from '../dto/request/consultation-query.dto';
import { LeadStatus } from '../enums/lead-status.enum';
import { PaginatedResponse } from '../../../common/response/api-response';
import {
  ConsultationNotFoundException,
  ConsultationNoteNotFoundException,
  ConsultationCannotDeleteNoteException,
} from '../exceptions/consultation.exception';
import { ConsultationPublicResponseDto } from '../dto/response/consultation-public.dto';
import { ConsultationAdminDto } from '../dto/response/consultation-admin.dto';
import { ConsultationNoteDto } from '../dto/response/consultation-note.dto';
import { NotificationsService } from '../../notifications/services/notifications.service';

@Injectable()
export class ConsultationsService {
  constructor(
    private readonly requestRepo: ConsultationRequestRepository,
    private readonly attachmentRepo: ConsultationAttachmentRepository,
    private readonly noteRepo: ConsultationNoteRepository,
    private readonly mapper: ConsultationMapper,
    private readonly notificationsService: NotificationsService,
  ) {}

  /**
   * Public: Khách hàng gửi yêu cầu tư vấn mới từ website
   */
  async create(
    dto: CreateConsultationDto,
    clientIp?: string,
    userAgent?: string,
  ): Promise<ConsultationPublicResponseDto> {
    const createdRequest = await this.requestRepo.createAndSave({
      fullName: dto.fullName,
      companyName: dto.companyName ?? null,
      phone: dto.phone,
      email: dto.email ?? null,
      contactChannel: dto.contactChannel,
      contactChannelId: dto.contactChannelId ?? null,
      preferredContactTime: dto.preferredContactTime ?? null,
      practiceAreaId: dto.practiceAreaId ?? null,
      lawyerId: dto.lawyerId ?? null,
      languageCode: dto.languageCode || 'vi',
      title: dto.title ?? null,
      content: dto.content,
      consent: dto.consent,
      status: LeadStatus.NEW,
      ipAddress: clientIp ?? null,
      userAgent: userAgent ?? null,
    });

    if (dto.attachments && dto.attachments.length > 0) {
      await this.attachmentRepo.createMany(
        createdRequest.id,
        dto.attachments.map((att) => ({
          fileName: att.fileName,
          fileUrl: att.fileUrl,
          fileType: att.fileType ?? null,
          fileSizeBytes: att.fileSizeBytes ?? null,
        })),
      );
    }

    // Kích hoạt gửi email thông báo cho Admin (Chạy ngầm bất đồng bộ Non-blocking)
    setImmediate(async () => {
      try {
        const fullDetail = await this.requestRepo.findById(createdRequest.id);
        const mappedDto = fullDetail ? this.mapper.toAdminDto(fullDetail) : null;

        await this.notificationsService.notifyNewConsultation({
          id: createdRequest.id,
          fullName: createdRequest.fullName,
          companyName: createdRequest.companyName,
          phone: createdRequest.phone,
          email: createdRequest.email,
          contactChannel: createdRequest.contactChannel,
          contactChannelId: createdRequest.contactChannelId,
          preferredContactTime: createdRequest.preferredContactTime,
          practiceAreaName: mappedDto?.practiceAreaName ?? null,
          lawyerName: mappedDto?.lawyerName ?? null,
          content: createdRequest.content,
          attachmentCount: dto.attachments?.length || 0,
          createdAt: createdRequest.createdAt,
        });
      } catch {
        // Lỗi thông báo nền không bao giờ ảnh hưởng tới response của khách
      }
    });

    return {
      id: createdRequest.id,
      message: 'Yêu cầu tư vấn của bạn đã được gửi thành công. Chuyên viên của Luật Vạn Ích sẽ liên hệ trong thời gian sớm nhất!',
      createdAt: createdRequest.createdAt,
    };
  }

  /**
   * Admin: Lấy danh sách leads kèm bộ lọc và phân trang
   */
  async getAdminList(
    query: ConsultationQueryDto,
  ): Promise<PaginatedResponse<ConsultationAdminDto>> {
    const page = query.page || 1;
    const limit = query.limit || 20;

    const { items, total } = await this.requestRepo.findWithFilters(query);
    const dtos = items.map((item) => this.mapper.toAdminDto(item));

    return PaginatedResponse.of(dtos, total, page, limit);
  }

  /**
   * Admin: Xem chi tiết lead
   */
  async getAdminById(id: string): Promise<ConsultationAdminDto> {
    const item = await this.requestRepo.findById(id);
    if (!item) throw new ConsultationNotFoundException(id);
    return this.mapper.toAdminDto(item);
  }

  /**
   * Admin: Cập nhật trạng thái lead
   */
  async updateStatus(id: string, status: LeadStatus): Promise<ConsultationAdminDto> {
    const item = await this.requestRepo.findById(id);
    if (!item) throw new ConsultationNotFoundException(id);

    await this.requestRepo.updateStatus(id, status);
    return this.getAdminById(id);
  }

  /**
   * Admin: Cập nhật trạng thái hàng loạt
   */
  async bulkUpdateStatus(ids: string[], status: LeadStatus): Promise<void> {
    await this.requestRepo.updateStatusBulk(ids, status);
  }

  /**
   * Admin: Phân công người xử lý
   */
  async assignUser(id: string, assignedUserId: string | null): Promise<ConsultationAdminDto> {
    const item = await this.requestRepo.findById(id);
    if (!item) throw new ConsultationNotFoundException(id);

    await this.requestRepo.assignUser(id, assignedUserId);
    return this.getAdminById(id);
  }

  /**
   * Admin: Thêm ghi chú nội bộ vào lead
   */
  async addNote(
    consultationId: string,
    authorId: string | null,
    authorName: string | null,
    note: string,
  ): Promise<ConsultationNoteDto> {
    const item = await this.requestRepo.findById(consultationId);
    if (!item) throw new ConsultationNotFoundException(consultationId);

    const savedNote = await this.noteRepo.createNote(
      consultationId,
      authorId,
      authorName,
      note,
    );
    return this.mapper.toNoteDto(savedNote);
  }

  /**
   * Admin: Xóa ghi chú nội bộ
   */
  async deleteNote(
    noteId: string,
    currentUserId: string,
    isSuperAdmin: boolean,
  ): Promise<void> {
    const note = await this.noteRepo.findById(noteId);
    if (!note) throw new ConsultationNoteNotFoundException(noteId);

    if (!isSuperAdmin && note.authorId !== currentUserId) {
      throw new ConsultationCannotDeleteNoteException();
    }

    await this.noteRepo.deleteNote(noteId);
  }

  /**
   * Admin: Xóa mềm yêu cầu tư vấn
   */
  async delete(id: string): Promise<void> {
    const item = await this.requestRepo.findById(id);
    if (!item) throw new ConsultationNotFoundException(id);

    await this.requestRepo.softDelete(id);
  }
}
