import { Column, Entity, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { ContentStatus } from '../../../common/enums/content-status.enum';
import { PostCategory } from './post-category.entity';
import { PostTranslation } from './post-translation.entity';
import { PostTag } from './post-tag.entity';
import { PostService } from './post-service.entity';

/**
 * Bảng `posts` — Dữ liệu bài viết dùng chung mọi ngôn ngữ.
 * Nội dung theo từng ngôn ngữ (tiêu đề, slug, nội dung Rich Text/HTML, SEO) nằm ở `post_translations`.
 */
@Entity('posts')
export class Post extends BaseEntity {
  /** Chuyên mục chính trực thuộc */
  @Column({ name: 'category_id', type: 'uuid' })
  @Index('idx_posts_category_id')
  categoryId: string;

  @ManyToOne(() => PostCategory, (c) => c.posts, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'category_id' })
  category: PostCategory;

  /** Luật sư tác giả (tùy chọn) */
  @Column({ name: 'author_lawyer_id', type: 'uuid', nullable: true })
  @Index('idx_posts_author_lawyer_id')
  authorLawyerId?: string | null;

  /** URL ảnh đại diện / ảnh bìa bài viết (Cloudinary) */
  @Column({ name: 'thumbnail_url', type: 'varchar', nullable: true, length: 500 })
  thumbnailUrl?: string | null;

  /** Trạng thái bài viết: draft, in_review, scheduled, published, archived */
  @Column({ type: 'enum', enum: ContentStatus, default: ContentStatus.DRAFT })
  status: ContentStatus;

  /** Bài viết nổi bật ghim trang chủ / đầu trang tin */
  @Column({ name: 'is_featured', default: false })
  isFeatured: boolean;

  /** Thời điểm xuất bản theo lịch hẹn */
  @Column({ name: 'publish_at', type: 'timestamptz', nullable: true })
  publishAt?: Date | null;

  /** Lượt xem bài viết */
  @Column({ name: 'views_count', type: 'int', default: 0 })
  viewsCount: number;

  /** Danh sách bản dịch song ngữ (vi, zh-CN) */
  @OneToMany(() => PostTranslation, (t) => t.post, { cascade: true })
  translations: PostTranslation[];

  /** Danh sách thẻ tag gán cho bài viết */
  @OneToMany(() => PostTag, (pt) => pt.post, { cascade: true })
  postTags?: PostTag[];

  /** Danh sách dịch vụ pháp lý liên quan */
  @OneToMany(() => PostService, (ps) => ps.post, { cascade: true })
  postServices?: PostService[];
}
