import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ unique: true, length: 50 })
  code: string; // 'superadmin' | 'admin' | 'editor' | 'viewer'

  @Column({ length: 100 })
  name: string; // 'Super Admin', 'Quản trị viên', v.v.

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'simple-array', default: '' })
  permissions: string[]; // ['services:read', 'services:write', ...]

  @Column({ name: 'is_system', default: false })
  isSystem: boolean; // Vai trò hệ thống không xóa được
}
