import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique, UpdateDateColumn } from 'typeorm';
import { LangCode } from '../../common/enums/lang.enum';
import { Lawyer } from './lawyer.entity';

@Entity('lawyer_translations')
@Unique('uq_lawyer_slug', ['slug', 'languageCode'])
export class LawyerTranslation {
  @PrimaryColumn({ name: 'lawyer_id', type: 'uuid' })
  lawyerId: string;

  @ManyToOne(() => Lawyer, (lawyer) => lawyer.translations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lawyer_id', foreignKeyConstraintName: 'fk_lawyer_translation_lawyer' })
  lawyer: Lawyer;

  @PrimaryColumn({ name: 'language_code', type: 'varchar', length: 10 })
  languageCode: LangCode;

  @Column({ name: 'full_name', length: 200 })
  fullName: string;

  @Column({ name: 'latin_name', type: 'varchar', length: 150, nullable: true })
  latinName: string | null;

  @Column({ length: 220 })
  slug: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  title: string | null;

  @Column({ name: 'academic_title', type: 'varchar', length: 150, nullable: true })
  academicTitle: string | null;

  @Column({ type: 'text', nullable: true })
  bio: string | null;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
