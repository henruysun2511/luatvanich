import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('partners')
export class Partner extends BaseEntity {
  @ApiProperty({ description: 'Tên đối tác hoặc khách hàng' })
  @Column({ length: 255 })
  name: string;

  @ApiProperty({ description: 'Đường dẫn ảnh Logo (Cloudinary)' })
  @Column({ length: 500, name: 'logo_url' })
  logoUrl: string;

  @ApiProperty({ description: 'Đường dẫn website của đối tác', required: false })
  @Column({ length: 500, nullable: true, name: 'website_url' })
  websiteUrl?: string;

  @ApiProperty({ description: 'Thứ tự hiển thị trên thanh slider' })
  @Column({ type: 'int', default: 0, name: 'display_order' })
  displayOrder: number;

  @ApiProperty({ description: 'Trạng thái hiển thị' })
  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;
}
