import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn, Index } from 'typeorm';
import { LegalService } from './legal-service.entity';
import { LangCode } from '../../../common/enums/lang.enum';

/**
 * Bảng `service_translations` — Nội dung theo từng ngôn ngữ.
 * Khóa chính kép: (service_id, language_code).
 */
@Entity('service_translations')
export class LegalServiceTranslation {
  @PrimaryColumn({ name: 'service_id', type: 'uuid' })
  serviceId: string;

  @PrimaryColumn({ name: 'language_code', length: 10 })
  languageCode: LangCode;

  @ManyToOne(() => LegalService, (s) => s.translations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_id' })
  service: LegalService;

  @Column({ length: 200 })
  title: string;

  @Column({ unique: true, length: 220 })
  @Index('idx_service_translations_slug')
  slug: string;

  /** Mô tả ngắn (dùng cho listing, SEO description) */
  @Column({ type: 'text', nullable: true })
  excerpt?: string;

  /** Nội dung HTML đầy đủ */
  @Column({ name: 'content_html', type: 'text', nullable: true })
  contentHtml?: string;

  /** SEO meta title */
  @Column({ name: 'meta_title', nullable: true, length: 70 })
  metaTitle?: string;

  /** SEO meta description */
  @Column({ name: 'meta_description', nullable: true, length: 160 })
  metaDescription?: string;

  /** Bản dịch đã hoàn thiện chưa */
  @Column({ name: 'is_complete', default: false })
  isComplete: boolean;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
