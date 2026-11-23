import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ConsultationRequest } from './consultation-request.entity';
import { User } from '../../users/entities/user.entity';

@Entity('consultation_notes')
export class ConsultationNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('idx_notes_consultation')
  @Column({ name: 'consultation_request_id', type: 'uuid' })
  consultationRequestId: string;

  @ManyToOne(() => ConsultationRequest, (cr) => cr.notes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'consultation_request_id' })
  consultationRequest: ConsultationRequest;

  @Column({ name: 'author_id', type: 'uuid', nullable: true })
  authorId?: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'author_id' })
  author?: User | null;

  @Column({ name: 'author_name', type: 'varchar', length: 150, nullable: true })
  authorName?: string | null;

  @Column({ name: 'note', type: 'text' })
  note: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
