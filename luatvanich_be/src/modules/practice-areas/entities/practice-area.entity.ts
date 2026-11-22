import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { PracticeAreaTranslation } from './practice-area-translation.entity';
import { ContentStatus } from '../../../common/enums/content-status.enum';
import { LegalService } from '../../legal-services/entities/legal-service.entity';

/**
 * Bảng `practice_areas` — Dữ liệu lĩnh vực chuyên môn dùng chung mọi ngôn ngữ.
 * Nội dung văn bản theo ngôn ngữ (vi, zh-CN) nằm ở bảng `practice_area_translations`.
 * Đóng vai trò là nhóm cha của `services` và là nhãn chuyên môn của `lawyers`.
 */
@Entity('practice_areas')
export class PracticeArea extends BaseEntity {
  /** Icon hoặc hình minh họa lĩnh vực (SVG / URL ảnh Cloudinary) */
  @Column({ name: 'icon_url', type: 'varchar', nullable: true, length: 500 })
  iconUrl?: string | null;

  /** Thứ tự sắp xếp hiển thị (kéo thả reorder) */
  @Column({ name: 'display_order', type: 'int', default: 0 })
  displayOrder: number;

  /** Trạng thái nội dung (draft, published, archived) */
  @Column({ type: 'enum', enum: ContentStatus, default: ContentStatus.DRAFT })
  status: ContentStatus;

  /** Ghim nổi bật ở trang chủ (lưới các lĩnh vực trọng tâm) */
  @Column({ name: 'is_featured', default: false })
  isFeatured: boolean;

  /** Danh sách bản dịch song ngữ (vi, zh-CN) */
  @OneToMany(() => PracticeAreaTranslation, (t) => t.practiceArea, { cascade: true })
  translations: PracticeAreaTranslation[];

  /** Danh sách dịch vụ pháp lý trực thuộc lĩnh vực này */
  @OneToMany(() => LegalService, (s) => s.practiceArea)
  services?: LegalService[];
}
