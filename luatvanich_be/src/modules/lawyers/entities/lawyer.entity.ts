import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { ContentStatus } from '../../../common/enums/content-status.enum';
import { LawyerTeamGroup } from '../enums/lawyer-team-group.enum';
import { LawyerTranslation } from './lawyer-translation.entity';
import { LawyerPracticeArea } from './lawyer-practice-area.entity';
import { LawyerLanguage } from './lawyer-language.entity';
import { LawyerCredential } from './lawyer-credential.entity';
import { Office } from '../../offices/entities/office.entity';

/**
 * Bảng `lawyers` — Dữ liệu luật sư dùng chung mọi ngôn ngữ.
 * Nội dung chi tiết theo ngôn ngữ nằm ở `lawyer_translations`.
 */
@Entity('lawyers')
export class Lawyer extends BaseEntity {
  /** Văn phòng trực thuộc chính */
  @Column({ name: 'office_id', type: 'uuid', nullable: true })
  @Index('idx_lawyers_office_id')
  officeId?: string | null;

  @ManyToOne(() => Office, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'office_id' })
  office?: Office | null;

  /** Tài khoản CMS liên kết (nếu có) */
  @Column({ name: 'user_id', type: 'uuid', nullable: true, unique: true })
  userId?: string | null;

  /** Phân nhóm đội ngũ luật sư */
  @Column({
    name: 'team_group',
    type: 'enum',
    enum: LawyerTeamGroup,
    default: LawyerTeamGroup.CHINESE_TEAM,
  })
  @Index('idx_lawyers_team_group')
  teamGroup: LawyerTeamGroup;

  /** URL ảnh chân dung tỷ lệ 4:5 (Cloudinary) */
  @Column({ name: 'avatar_url', type: 'varchar', nullable: true, length: 500 })
  avatarUrl?: string | null;

  /** Số thẻ hành nghề luật sư / Số giấy phép của Bộ Tư pháp */
  @Column({ name: 'license_number', type: 'varchar', nullable: true, length: 100 })
  licenseNumber?: string | null;

  /** Ảnh scan giấy phép hành nghề */
  @Column({ name: 'license_image_url', type: 'varchar', nullable: true, length: 500 })
  licenseImageUrl?: string | null;

  /** Đoàn luật sư trực thuộc */
  @Column({ name: 'bar_association', type: 'varchar', nullable: true, length: 255 })
  barAssociation?: string | null;

  /** Email công việc */
  @Column({ type: 'varchar', nullable: true, length: 255 })
  email?: string | null;

  /** Số di động */
  @Column({ name: 'mobile_phone', type: 'varchar', nullable: true, length: 50 })
  mobilePhone?: string | null;

  /** Điện thoại bàn cơ quan */
  @Column({ name: 'office_phone', type: 'varchar', nullable: true, length: 50 })
  officePhone?: string | null;

  /** ID WeChat */
  @Column({ name: 'wechat_id', type: 'varchar', nullable: true, length: 100 })
  wechatId?: string | null;

  /** Ảnh mã QR WeChat */
  @Column({ name: 'wechat_qr_url', type: 'varchar', nullable: true, length: 500 })
  wechatQrUrl?: string | null;

  /** Ngày bắt đầu hành nghề (dùng tính số năm kinh nghiệm) */
  @Column({ name: 'practice_start_date', type: 'date', nullable: true })
  practiceStartDate?: string | null;

  /** Thứ tự sắp xếp hiển thị */
  @Column({ name: 'display_order', type: 'int', default: 0 })
  displayOrder: number;

  /** Ghim nổi bật ở trang chủ */
  @Column({ name: 'is_featured', default: false })
  isFeatured: boolean;

  /** Trạng thái hiển thị (draft, published, archived) */
  @Column({ type: 'enum', enum: ContentStatus, default: ContentStatus.DRAFT })
  status: ContentStatus;

  /** Bản dịch song ngữ (vi, zh-CN) */
  @OneToMany(() => LawyerTranslation, (t) => t.lawyer, { cascade: true })
  translations: LawyerTranslation[];

  /** Lĩnh vực chuyên môn phụ trách */
  @OneToMany(() => LawyerPracticeArea, (pa) => pa.lawyer, { cascade: true })
  practiceAreas?: LawyerPracticeArea[];

  /** Ngôn ngữ làm việc */
  @OneToMany(() => LawyerLanguage, (lang) => lang.lawyer, { cascade: true })
  languages?: LawyerLanguage[];

  /** Hồ sơ năng lực: bằng cấp, chứng chỉ, giải thưởng, ấn phẩm */
  @OneToMany(() => LawyerCredential, (c) => c.lawyer, { cascade: true })
  credentials?: LawyerCredential[];
}
