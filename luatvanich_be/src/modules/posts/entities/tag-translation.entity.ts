import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn, Index } from 'typeorm';
import { Tag } from './tag.entity';
import { LangCode } from '../../../common/enums/lang.enum';

/**
 * Bảng `tag_translations` — Tên thẻ từ khóa theo từng ngôn ngữ.
 * Khóa chính kép: (tag_id, language_code).
 */
@Entity('tag_translations')
@Index('uq_tag_translations_slug_lang', ['languageCode', 'slug'], { unique: true })
export class TagTranslation {
  @PrimaryColumn({ name: 'tag_id', type: 'uuid' })
  tagId: string;

  @PrimaryColumn({ name: 'language_code', length: 10 })
  languageCode: LangCode;

  @ManyToOne(() => Tag, (t) => t.translations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;

  /** Tên thẻ tag (VD: Luật Doanh nghiệp / 公司法) */
  @Column({ length: 100 })
  name: string;

  /** Đường dẫn tĩnh SEO của thẻ tag */
  @Column({ length: 120 })
  slug: string;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
