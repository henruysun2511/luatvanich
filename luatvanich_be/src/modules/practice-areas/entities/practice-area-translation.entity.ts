import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn, Index } from 'typeorm';
import { PracticeArea } from './practice-area.entity';
import { LangCode } from '../../../common/enums/lang.enum';

/**
 * Bảng `practice_area_translations` — Nội dung lĩnh vực theo từng ngôn ngữ.
 * Khóa chính kép: (practice_area_id, language_code).
 */
@Entity('practice_area_translations')
export class PracticeAreaTranslation {
  @PrimaryColumn({ name: 'practice_area_id', type: 'uuid' })
  practiceAreaId: string;

  @PrimaryColumn({ name: 'language_code', length: 10 })
  languageCode: LangCode;

  @ManyToOne(() => PracticeArea, (pa) => pa.translations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'practice_area_id' })
  practiceArea: PracticeArea;

  /** Tên lĩnh vực pháp lý (VD: Đầu tư nước ngoài (FDI) / 外商直接投资) */
  @Column({ length: 200 })
  name: string;

  /** Đường dẫn tĩnh SEO duy nhất theo ngôn ngữ (VD: dau-tu-nuoc-ngoai-fdi) */
  @Column({ unique: true, length: 220 })
  @Index('idx_practice_area_translations_slug')
  slug: string;

  /** Mô tả khái quát về lĩnh vực pháp lý */
  @Column({ type: 'text', nullable: true })
  description?: string | null;

  /** Danh sách 4-6 gạch đầu dòng phạm vi công việc chuyên sâu */
  @Column({ name: 'scope_points', type: 'jsonb', nullable: true, default: () => "'[]'::jsonb" })
  scopePoints?: string[] | null;

  /** Khung thời gian hoàn thành (ví dụ: 30 – 60 ngày, 2 – 6 tháng) */
  @Column({ name: 'estimated_time', type: 'varchar', nullable: true, length: 100 })
  estimatedTime?: string | null;

  /** Hình thức tính phí (ví dụ: Trọn gói, Theo hợp đồng, Theo vụ việc) */
  @Column({ name: 'fee_structure', type: 'varchar', nullable: true, length: 100 })
  feeStructure?: string | null;

  /** SEO meta title */
  @Column({ name: 'meta_title', type: 'varchar', nullable: true, length: 70 })
  metaTitle?: string | null;

  /** SEO meta description */
  @Column({ name: 'meta_description', type: 'varchar', nullable: true, length: 160 })
  metaDescription?: string | null;

  /** Bản dịch đã hoàn thiện hay đang nháp */
  @Column({ name: 'is_complete', default: false })
  isComplete: boolean;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
