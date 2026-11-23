import { Entity, ManyToOne, JoinColumn, PrimaryColumn, Index } from 'typeorm';
import { Post } from './post.entity';
import { LegalService } from '../../legal-services/entities/legal-service.entity';

/**
 * Bảng nối `post_services` — Quan hệ nhiều-nhiều giữa Bài viết và Dịch vụ pháp lý.
 * Khóa chính kép: (post_id, service_id).
 */
@Entity('post_services')
export class PostService {
  @PrimaryColumn({ name: 'post_id', type: 'uuid' })
  postId: string;

  @PrimaryColumn({ name: 'service_id', type: 'uuid' })
  @Index('idx_post_services_service_id')
  serviceId: string;

  @ManyToOne(() => Post, (p) => p.postServices, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => LegalService, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_id' })
  service: LegalService;
}
