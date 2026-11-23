import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn, Index } from 'typeorm';
import { Lawyer } from './lawyer.entity';
import { LangCode } from '../../../common/enums/lang.enum';

/**
 * Bảng `lawyer_translations` — Bản dịch thông tin Luật sư.
 * Khóa chính kép: (lawyer_id, language_code).
 */
@Entity('lawyer_translations')
export class LawyerTranslation {
  @PrimaryColumn({ name: 'lawyer_id', type: 'uuid' })
  lawyerId: string;

  @PrimaryColumn({ name: 'language_code', length: 10 })
  languageCode: LangCode;

  @ManyToOne(() => Lawyer, (l) => l.translations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lawyer_id' })
  lawyer: Lawyer;

  /** Họ và tên luật sư */
  @Column({ name: 'full_name', length: 200 })
  fullName: string;

  /** Tên phiên âm quốc tế / Pinyin (VD: Ling Bin, Ling Chen) */
  @Column({ name: 'latin_name', type: 'varchar', nullable: true, length: 150 })
  latinName?: string | null;

  /** Đường dẫn tĩnh SEO duy nhất theo ngôn ngữ */
  @Column({ length: 220 })
  @Index('idx_lawyer_translations_slug')
  slug: string;

  /** Chức danh hiển thị chính (VD: Luật sư điều hành / 执行合伙人) */
  @Column({ type: 'varchar', nullable: true, length: 200 })
  title?: string | null;

  /** Chức vụ kiêm nhiệm / Đảng thể (VD: Bí thư Đảng ủy) */
  @Column({ name: 'secondary_title', type: 'varchar', nullable: true, length: 200 })
  secondaryTitle?: string | null;

  /** Học hàm / học vị (VD: Tiến sĩ Luật, Luật sư cấp 1 - 一级律师) */
  @Column({ name: 'academic_title', type: 'varchar', nullable: true, length: 150 })
  academicTitle?: string | null;

  /** Đơn vị công tác gốc / Hãng luật hợp tác */
  @Column({ name: 'affiliated_organization', type: 'varchar', nullable: true, length: 255 })
  affiliatedOrganization?: string | null;

  /** Tiểu sử giới thiệu tóm tắt quá trình hoạt động */
  @Column({ type: 'text', nullable: true })
  bio?: string | null;

  /** SEO meta title */
  @Column({ name: 'meta_title', type: 'varchar', nullable: true, length: 70 })
  metaTitle?: string | null;

  /** SEO meta description */
  @Column({ name: 'meta_description', type: 'varchar', nullable: true, length: 160 })
  metaDescription?: string | null;

  /** Bản dịch đã hoàn thiện */
  @Column({ name: 'is_complete', default: false })
  isComplete: boolean;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
