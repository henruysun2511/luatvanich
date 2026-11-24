import {
  Entity,
  PrimaryColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('site_settings')
export class SiteSetting {
  @ApiProperty({ description: 'Mã định danh cấu hình (duy nhất)' })
  @PrimaryColumn({ length: 100 })
  key: string;

  @ApiProperty({ description: 'Giá trị cấu hình (Text hoặc JSON String)' })
  @Column({ type: 'text', nullable: true })
  value: string;

  @ApiProperty({ description: 'Phân nhóm cấu hình (contact, social, stats, seo, branding)' })
  @Column({ length: 50, default: 'general' })
  group: string;

  @ApiProperty({ description: 'Cho phép công khai phía frontend hay không' })
  @Column({ type: 'boolean', default: true, name: 'is_public' })
  isPublic: boolean;

  @ApiProperty({ description: 'Thời điểm cập nhật gần nhất' })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
