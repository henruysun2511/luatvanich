import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConsultationAttachment } from '../entities/consultation-attachment.entity';

@Injectable()
export class ConsultationAttachmentRepository {
  constructor(
    @InjectRepository(ConsultationAttachment)
    private readonly repo: Repository<ConsultationAttachment>,
  ) {}

  async createMany(
    consultationRequestId: string,
    attachments: Array<{
      fileName: string;
      fileUrl: string;
      fileType?: string | null;
      fileSizeBytes?: number | null;
    }>,
  ): Promise<ConsultationAttachment[]> {
    if (!attachments || attachments.length === 0) return [];

    const entities = attachments.map((att) =>
      this.repo.create({
        consultationRequestId,
        fileName: att.fileName,
        fileUrl: att.fileUrl,
        fileType: att.fileType ?? null,
        fileSizeBytes: att.fileSizeBytes ?? null,
      }),
    );

    return this.repo.save(entities);
  }

  async findByConsultationId(consultationRequestId: string): Promise<ConsultationAttachment[]> {
    return this.repo.find({
      where: { consultationRequestId },
      order: { createdAt: 'ASC' },
    });
  }
}
