import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn, Index } from 'typeorm';
import { Post } from './post.entity';
import { LangCode } from '../../../common/enums/lang.enum';

/**
 * Bảng `post_translations` — Nội dung chi tiết bài viết theo từng ngôn ngữ.
 * Khóa chính kép: (post_id, language_code).
 */
@Entity('post_translations')
export class PostTranslation {
  @PrimaryColumn({ name: 'post_id', type: 'uuid' })
  postId: string;

  @PrimaryColumn({ name: 'language_code', length: 10 })
  languageCode: LangCode;

  @ManyToOne(() => Post, (p) => p.translations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  /** Tiêu đề bài viết */
  @Column({ length: 300 })
  title: string;

  /** Đường dẫn tĩnh SEO duy nhất theo ngôn ngữ */
  @Column({ length: 320 })
  @Index('idx_post_translations_slug')
  slug: string;

  /** Tóm tắt ngắn mở đầu bài viết */
  @Column({ type: 'text', nullable: true })
  summary?: string | null;

  /** Nội dung chi tiết bài viết (Rich Text / HTML) */
  @Column({ name: 'content_html', type: 'text' })
  contentHtml: string;

  /** SEO meta title */
  @Column({ name: 'meta_title', type: 'varchar', nullable: true, length: 70 })
  metaTitle?: string | null;

  /** SEO meta description */
  @Column({ name: 'meta_description', type: 'varchar', nullable: true, length: 160 })
  metaDescription?: string | null;

  /** Đánh dấu bản dịch đã hoàn thiện hay chưa */
  @Column({ name: 'is_complete', default: false })
  isComplete: boolean;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
