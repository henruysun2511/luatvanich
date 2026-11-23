import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Lawyer } from './lawyer.entity';

/**
 * Bảng nối `lawyer_languages` — Ngôn ngữ làm việc của Luật sư.
 * Khóa chính kép: (lawyer_id, language_code).
 */
@Entity('lawyer_languages')
export class LawyerLanguage {
  @PrimaryColumn({ name: 'lawyer_id', type: 'uuid' })
  lawyerId: string;

  @PrimaryColumn({ name: 'language_code', length: 10 })
  languageCode: string;

  @ManyToOne(() => Lawyer, (l) => l.languages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lawyer_id' })
  lawyer: Lawyer;

  /** Ngôn ngữ mẹ đẻ */
  @Column({ name: 'is_native', default: false })
  isNative: boolean;
}
