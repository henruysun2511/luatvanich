import { Entity, ManyToOne, JoinColumn, PrimaryColumn, Index } from 'typeorm';
import { Post } from './post.entity';
import { Tag } from './tag.entity';

/**
 * Bảng nối `post_tags` — Quan hệ nhiều-nhiều giữa Bài viết và Thẻ tag.
 * Khóa chính kép: (post_id, tag_id).
 */
@Entity('post_tags')
export class PostTag {
  @PrimaryColumn({ name: 'post_id', type: 'uuid' })
  postId: string;

  @PrimaryColumn({ name: 'tag_id', type: 'uuid' })
  @Index('idx_post_tags_tag_id')
  tagId: string;

  @ManyToOne(() => Post, (p) => p.postTags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => Tag, (t) => t.postTags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;
}
