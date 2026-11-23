import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ConsultationRequest } from './consultation-request.entity';

@Entity('consultation_attachments')
export class ConsultationAttachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('idx_attachments_consultation')
  @Column({ name: 'consultation_request_id', type: 'uuid' })
  consultationRequestId: string;

  @ManyToOne(() => ConsultationRequest, (cr) => cr.attachments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'consultation_request_id' })
  consultationRequest: ConsultationRequest;

  @Column({ name: 'file_name', type: 'varchar', length: 255 })
  fileName: string;

  @Column({ name: 'file_url', type: 'varchar', length: 500 })
  fileUrl: string;

  @Column({ name: 'file_type', type: 'varchar', length: 100, nullable: true })
  fileType?: string | null;

  @Column({ name: 'file_size_bytes', type: 'bigint', nullable: true })
  fileSizeBytes?: number | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
