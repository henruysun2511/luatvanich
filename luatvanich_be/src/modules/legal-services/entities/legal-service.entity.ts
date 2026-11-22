import { Column, Entity, OneToMany, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { LegalServiceTranslation } from './legal-service-translation.entity';
import { ContentStatus } from '../../../common/enums/content-status.enum';
import { PracticeArea } from '../../practice-areas/entities/practice-area.entity';

/**
 * Bảng `services` — Dữ liệu dùng chung mọi ngôn ngữ.
 * Nội dung văn bản theo ngôn ngữ nằm ở bảng `service_translations`.
 */
@Entity('services')
export class LegalService extends BaseEntity {
  /** Lĩnh vực pháp lý cha (FK tới bảng practice_areas) */
  @Column({ name: 'practice_area_id', type: 'uuid', nullable: true })
  @Index('idx_services_practice_area_id')
  practiceAreaId?: string;

  @ManyToOne(() => PracticeArea, (pa) => pa.services, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'practice_area_id' })
  practiceArea?: PracticeArea;

  /** Thứ tự hiển thị (kéo thả reorder) */
  @Column({ name: 'display_order', type: 'int', default: 0 })
  displayOrder: number;

  /** Trạng thái nội dung */
  @Column({ type: 'enum', enum: ContentStatus, default: ContentStatus.DRAFT })
  status: ContentStatus;

  /** Thời điểm đặt lịch xuất bản */
  @Column({ name: 'publish_at', type: 'timestamptz', nullable: true })
  publishAt?: Date;

  /** URL ảnh đại diện dịch vụ (Cloudinary) */
  @Column({ name: 'cover_image_url', nullable: true })
  coverImageUrl?: string;

  /** JSON Puck page-builder cho trang chi tiết dịch vụ */
  @Column({ name: 'content_json', type: 'jsonb', nullable: true })
  contentJson?: object;

  /** Hiển thị trên trang chủ */
  @Column({ name: 'is_featured', default: false })
  isFeatured: boolean;

  @OneToMany(() => LegalServiceTranslation, (t) => t.service, { cascade: true })
  translations: LegalServiceTranslation[];
}
