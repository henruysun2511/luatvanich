import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { TagTranslation } from './tag-translation.entity';
import { PostTag } from './post-tag.entity';

/**
 * Bảng `tags` — Thẻ từ khóa bài viết dùng chung mọi ngôn ngữ.
 * Nội dung văn bản theo ngôn ngữ nằm ở `tag_translations`.
 */
@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Mã màu hiển thị badge (VD: #0284c7) */
  @Column({ name: 'color_hex', type: 'varchar', nullable: true, length: 20 })
  colorHex?: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  /** Danh sách bản dịch song ngữ của thẻ */
  @OneToMany(() => TagTranslation, (t) => t.tag, { cascade: true })
  translations: TagTranslation[];

  /** Danh sách bài viết được gán thẻ này */
  @OneToMany(() => PostTag, (pt) => pt.tag)
  postTags?: PostTag[];
}
