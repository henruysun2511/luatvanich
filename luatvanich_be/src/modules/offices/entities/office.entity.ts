import { Column, Entity, OneToMany, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { OfficeTranslation } from './office-translation.entity';
import { ContentStatus } from '../../../common/enums/content-status.enum';

/**
 * Bảng `offices` — Dữ liệu văn phòng đại diện dùng chung mọi ngôn ngữ.
 * Nội dung địa chỉ, tên theo ngôn ngữ nằm ở bảng `office_translations`.
 */
@Entity('offices')
export class Office extends BaseEntity {
  /** Mã định danh văn phòng (VD: hanoi_hq, chongzuo, nanning, bacninh) */
  @Column({ unique: true, length: 50 })
  @Index('idx_offices_code')
  code: string;

  /** Số điện thoại hotline / máy bàn */
  @Column({ nullable: true, length: 50 })
  phone?: string;

  /** Số fax văn phòng */
  @Column({ nullable: true, length: 50 })
  fax?: string;

  /** Email liên hệ của văn phòng */
  @Column({ nullable: true, length: 255 })
  email?: string;

  /** WeChat ID của văn phòng */
  @Column({ name: 'wechat_id', nullable: true, length: 100 })
  wechatId?: string;

  /** Link ảnh mã QR WeChat văn phòng */
  @Column({ name: 'wechat_qr_url', nullable: true, length: 500 })
  wechatQrUrl?: string;

  /** URL ảnh đại diện tòa nhà / văn phòng (Cloudinary) */
  @Column({ name: 'image_url', nullable: true, length: 500 })
  imageUrl?: string;

  /** Tọa độ GPS: Vĩ độ */
  @Column({ type: 'numeric', precision: 10, scale: 7, nullable: true })
  latitude?: number;

  /** Tọa độ GPS: Kinh độ */
  @Column({ type: 'numeric', precision: 10, scale: 7, nullable: true })
  longitude?: number;

  /** Iframe embed bản đồ (Google Maps / Baidu Maps) */
  @Column({ name: 'map_embed_url', type: 'text', nullable: true })
  mapEmbedUrl?: string;

  /** Đánh dấu là Trụ sở chính */
  @Column({ name: 'is_headquarters', default: false })
  isHeadquarters: boolean;

  /** Thứ tự sắp xếp hiển thị */
  @Column({ name: 'display_order', type: 'int', default: 0 })
  displayOrder: number;

  /** Trạng thái nội dung */
  @Column({ type: 'enum', enum: ContentStatus, default: ContentStatus.DRAFT })
  status: ContentStatus;

  /** Danh sách bản dịch song ngữ (vi, zh-CN) */
  @OneToMany(() => OfficeTranslation, (t) => t.office, { cascade: true })
  translations: OfficeTranslation[];
}
