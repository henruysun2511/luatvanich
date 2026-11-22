import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Lawyer } from './lawyer.entity';
import { CredentialKind } from './lawyer.enums';
import { LawyerCredentialTranslation } from './lawyer-credential-translation.entity';

@Entity('lawyer_credentials')
@Index('idx_lawyer_credentials_lawyer', ['lawyerId', 'kind'])
export class LawyerCredential {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'lawyer_id', type: 'uuid' })
  lawyerId: string;

  @ManyToOne(() => Lawyer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lawyer_id', foreignKeyConstraintName: 'fk_lawyer_credential_lawyer' })
  lawyer: Lawyer;

  @Column({ type: 'enum', enum: CredentialKind, enumName: 'credential_kind' })
  kind: CredentialKind;

  @Column({ name: 'year_start', type: 'int', nullable: true })
  yearStart: number | null;

  @Column({ name: 'year_end', type: 'int', nullable: true })
  yearEnd: number | null;

  @Column({ name: 'display_order', type: 'int', default: 0 })
  displayOrder: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => LawyerCredentialTranslation, (translation) => translation.credential)
  translations: LawyerCredentialTranslation[];
}
