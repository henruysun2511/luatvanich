import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Office } from './office.entity';
import { LangCode } from '../../../common/enums/lang.enum';

/**
 * Bảng `office_translations` — Nội dung văn phòng theo từng ngôn ngữ.
 * Khóa chính kép: (office_id, language_code).
 */
@Entity('office_translations')
export class OfficeTranslation {
  @PrimaryColumn({ name: 'office_id', type: 'uuid' })
  officeId: string;

  @PrimaryColumn({ name: 'language_code', length: 10 })
  languageCode: LangCode;

  @ManyToOne(() => Office, (o) => o.translations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'office_id' })
  office: Office;

  /** Tên văn phòng (VD: Văn phòng Hà Nội / 河内办公室) */
  @Column({ length: 200 })
  name: string;

  /** Địa chỉ chi tiết */
  @Column({ length: 500 })
  address: string;

  /** Giờ làm việc (VD: Thứ 2 - Thứ 6: 8:00 - 17:30 / 周一至周五...) */
  @Column({ name: 'working_hours', nullable: true, length: 255 })
  workingHours?: string;

  /** Mô tả tóm tắt văn phòng */
  @Column({ type: 'text', nullable: true })
  description?: string;

  /** Đã hoàn thiện bản dịch chưa */
  @Column({ name: 'is_complete', default: false })
  isComplete: boolean;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
