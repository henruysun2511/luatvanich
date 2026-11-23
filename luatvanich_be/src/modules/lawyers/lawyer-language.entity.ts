import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Lawyer } from './lawyer.entity';

@Entity('lawyer_languages')
export class LawyerLanguage {
  @PrimaryColumn({ name: 'lawyer_id', type: 'uuid' })
  lawyerId: string;

  @ManyToOne(() => Lawyer, (lawyer) => lawyer.languages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lawyer_id', foreignKeyConstraintName: 'fk_lawyer_language_lawyer' })
  lawyer: Lawyer;

  @PrimaryColumn({ name: 'language_code', type: 'varchar', length: 10 })
  languageCode: string;

  @Column({ name: 'is_native', default: false })
  isNative: boolean;
}
