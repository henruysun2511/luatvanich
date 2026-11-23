import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Lawyer } from './lawyer.entity';
import { CredentialKind } from '../enums/credential-kind.enum';
import { LawyerCredentialTranslation } from './lawyer-credential-translation.entity';

/**
 * Bảng `lawyer_credentials` — Lý lịch, bằng cấp, chứng chỉ, giải thưởng, ấn phẩm khoa học.
 */
@Entity('lawyer_credentials')
@Index('idx_lawyer_credentials_lawyer', ['lawyerId', 'kind'])
export class LawyerCredential {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'lawyer_id', type: 'uuid' })
  lawyerId: string;

  @ManyToOne(() => Lawyer, (l) => l.credentials, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lawyer_id' })
  lawyer: Lawyer;

  /** Loại thành tích / lý lịch */
  @Column({ type: 'enum', enum: CredentialKind })
  kind: CredentialKind;

  /** Năm bắt đầu (hoặc năm công bố ấn phẩm) */
  @Column({ name: 'year_start', type: 'int', nullable: true })
  yearStart?: number | null;

  /** Năm kết thúc */
  @Column({ name: 'year_end', type: 'int', nullable: true })
  yearEnd?: number | null;

  /** Thứ tự hiển thị */
  @Column({ name: 'display_order', type: 'int', default: 0 })
  displayOrder: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => LawyerCredentialTranslation, (t) => t.credential, { cascade: true })
  translations: LawyerCredentialTranslation[];
}
