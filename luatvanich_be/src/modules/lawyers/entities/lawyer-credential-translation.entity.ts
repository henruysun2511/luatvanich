import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { LawyerCredential } from './lawyer-credential.entity';
import { LangCode } from '../../../common/enums/lang.enum';

/**
 * Bảng `lawyer_credential_translations` — Bản dịch chi tiết của từng bằng cấp / ấn phẩm.
 * Khóa chính kép: (credential_id, language_code).
 */
@Entity('lawyer_credential_translations')
export class LawyerCredentialTranslation {
  @PrimaryColumn({ name: 'credential_id', type: 'uuid' })
  credentialId: string;

  @PrimaryColumn({ name: 'language_code', length: 10 })
  languageCode: LangCode;

  @ManyToOne(() => LawyerCredential, (c) => c.translations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'credential_id' })
  credential: LawyerCredential;

  /** Tên bằng cấp / Chứng chỉ / Tên giải thưởng / Tiêu đề sách báo công trình */
  @Column({ length: 255 })
  title: string;

  /** Cơ quan cấp / Đơn vị tổ chức / Nhà xuất bản / Tạp chí */
  @Column({ type: 'varchar', nullable: true, length: 255 })
  institution?: string | null;

  /** Mô tả chi tiết / Tóm tắt công trình khoa học */
  @Column({ type: 'text', nullable: true })
  description?: string | null;
}
