import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { PracticeArea } from '../../practice-areas/entities/practice-area.entity';
import { Lawyer } from '../../lawyers/entities/lawyer.entity';
import { User } from '../../users/entities/user.entity';
import { LeadStatus } from '../enums/lead-status.enum';
import { ContactChannel } from '../enums/contact-channel.enum';
import { ConsultationAttachment } from './consultation-attachment.entity';
import { ConsultationNote } from './consultation-note.entity';

@Entity('consultation_requests')
export class ConsultationRequest extends BaseEntity {
  @Column({ name: 'full_name', type: 'varchar', length: 200 })
  fullName: string;

  @Column({ name: 'company_name', type: 'varchar', length: 255, nullable: true })
  companyName?: string | null;

  @Column({ name: 'phone', type: 'varchar', length: 50 })
  phone: string;

  @Column({ name: 'email', type: 'varchar', length: 255, nullable: true })
  email?: string | null;

  @Column({
    name: 'contact_channel',
    type: 'enum',
    enum: ContactChannel,
    default: ContactChannel.PHONE,
  })
  contactChannel: ContactChannel;

  @Column({ name: 'contact_channel_id', type: 'varchar', length: 100, nullable: true })
  contactChannelId?: string | null;

  @Column({ name: 'preferred_contact_time', type: 'varchar', length: 100, nullable: true })
  preferredContactTime?: string | null;

  @Column({ name: 'practice_area_id', type: 'uuid', nullable: true })
  practiceAreaId?: string | null;

  @ManyToOne(() => PracticeArea, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'practice_area_id' })
  practiceArea?: PracticeArea | null;

  @Column({ name: 'lawyer_id', type: 'uuid', nullable: true })
  lawyerId?: string | null;

  @ManyToOne(() => Lawyer, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'lawyer_id' })
  lawyer?: Lawyer | null;

  @Column({ name: 'assigned_user_id', type: 'uuid', nullable: true })
  assignedUserId?: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'assigned_user_id' })
  assignedUser?: User | null;

  @Column({ name: 'language_code', type: 'varchar', length: 10, default: 'vi' })
  languageCode: string;

  @Column({ name: 'title', type: 'varchar', length: 255, nullable: true })
  title?: string | null;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({ name: 'consent', type: 'boolean', default: false })
  consent: boolean;

  @Index('idx_consultations_status')
  @Column({
    name: 'status',
    type: 'enum',
    enum: LeadStatus,
    default: LeadStatus.NEW,
  })
  status: LeadStatus;

  @Column({ name: 'ip_address', type: 'varchar', length: 45, nullable: true })
  ipAddress?: string | null;

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  userAgent?: string | null;

  @OneToMany(() => ConsultationAttachment, (att) => att.consultationRequest, {
    cascade: true,
  })
  attachments: ConsultationAttachment[];

  @OneToMany(() => ConsultationNote, (note) => note.consultationRequest, {
    cascade: true,
  })
  notes: ConsultationNote[];
}
