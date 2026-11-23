import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultationRequest } from './entities/consultation-request.entity';
import { ConsultationAttachment } from './entities/consultation-attachment.entity';
import { ConsultationNote } from './entities/consultation-note.entity';
import { ConsultationRequestRepository } from './repositories/consultation-request.repository';
import { ConsultationAttachmentRepository } from './repositories/consultation-attachment.repository';
import { ConsultationNoteRepository } from './repositories/consultation-note.repository';
import { ConsultationMapper } from './mapper/consultation.mapper';
import { ConsultationsService } from './services/consultations.service';
import { ConsultationsController } from './controllers/consultations.controller';
import { ConsultationsAdminController } from './controllers/consultations-admin.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConsultationRequest,
      ConsultationAttachment,
      ConsultationNote,
    ]),
  ],
  controllers: [ConsultationsController, ConsultationsAdminController],
  providers: [
    ConsultationRequestRepository,
    ConsultationAttachmentRepository,
    ConsultationNoteRepository,
    ConsultationMapper,
    ConsultationsService,
  ],
  exports: [ConsultationsService, ConsultationRequestRepository],
})
export class ConsultationsModule {}
