import { Column, Entity, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { PostSection } from '../enums/post-section.enum';
import { PostCategoryTranslation } from './post-category-translation.entity';
import { Post } from './post.entity';

/**
 * Bảng `post_categories` — Dữ liệu chuyên mục/thể loại bài viết dùng chung mọi ngôn ngữ.
 * Nội dung theo ngôn ngữ (vi, zh-CN) nằm ở bảng `post_category_translations`.
 * Hỗ trợ cây phân cấp nhiều tầng (parent_id) và thuộc 1 phân vùng lớn (section).
 */
@Entity('post_categories')
export class PostCategory extends BaseEntity {
  /** Phân vùng nội dung lớn (Tin tức, Cẩm nang, Cơ sở tri thức) */
  @Column({ type: 'enum', enum: PostSection, enumName: 'post_categories_section_enum', default: PostSection.NEWS })
  section: PostSection;

  /** Chuyên mục cha (self-referencing FK) */
  @Column({ name: 'parent_id', type: 'uuid', nullable: true })
  @Index('idx_post_categories_parent_id')
  parentId?: string | null;

  @ManyToOne(() => PostCategory, (c) => c.children, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'parent_id' })
  parent?: PostCategory | null;

  /** Danh sách chuyên mục con trực thuộc */
  @OneToMany(() => PostCategory, (c) => c.parent)
  children?: PostCategory[];

  /** Thứ tự sắp xếp hiển thị */
  @Column({ name: 'display_order', type: 'int', default: 0 })
  displayOrder: number;

  /** Danh sách bản dịch song ngữ */
  @OneToMany(() => PostCategoryTranslation, (t) => t.category, { cascade: true })
  translations: PostCategoryTranslation[];

  /** Danh sách bài viết thuộc chuyên mục này */
  @OneToMany(() => Post, (p) => p.category)
  posts?: Post[];
}
