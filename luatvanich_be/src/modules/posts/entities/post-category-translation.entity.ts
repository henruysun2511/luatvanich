import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn, Index } from 'typeorm';
import { PostCategory } from './post-category.entity';
import { LangCode } from '../../../common/enums/lang.enum';

/**
 * Bảng `post_category_translations` — Nội dung chuyên mục bài viết theo từng ngôn ngữ.
 * Khóa chính kép: (category_id, language_code).
 */
@Entity('post_category_translations')
@Index('uq_post_category_translations_slug_lang', ['languageCode', 'slug'], { unique: true })
export class PostCategoryTranslation {
  @PrimaryColumn({ name: 'category_id', type: 'uuid' })
  categoryId: string;

  @PrimaryColumn({ name: 'language_code', length: 10 })
  languageCode: LangCode;

  @ManyToOne(() => PostCategory, (c) => c.translations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: PostCategory;

  /** Tên chuyên mục (VD: Đầu tư FDI / 外商投资) */
  @Column({ length: 200 })
  name: string;

  /** Đường dẫn tĩnh SEO duy nhất theo ngôn ngữ */
  @Column({ length: 220 })
  slug: string;

  /** Mô tả khái quát về chuyên mục */
  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
