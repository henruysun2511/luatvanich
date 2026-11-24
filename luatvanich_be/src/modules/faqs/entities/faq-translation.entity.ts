import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Faq } from './faq.entity';
import { LangCode } from '../../../common/enums/lang.enum';

@Entity('faq_translations')
export class FaqTranslation {
  @PrimaryColumn({ name: 'faq_id', type: 'uuid' })
  faqId: string;

  @PrimaryColumn({ name: 'language_code', length: 10 })
  languageCode: LangCode;

  @ManyToOne(() => Faq, (f) => f.translations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'faq_id' })
  faq: Faq;

  @Column({ length: 500 })
  question: string;

  @Column({ type: 'text' })
  answer: string;

  @Column({ name: 'is_complete', default: false })
  isComplete: boolean;
}
