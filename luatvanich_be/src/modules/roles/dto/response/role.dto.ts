import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../entities/role.entity';

export class RoleResponseDto {
  @ApiProperty({ example: 'uuid-v4' })
  id: string;

  @ApiProperty({ example: 'admin' })
  code: string;

  @ApiProperty({ example: 'Quản trị viên' })
  name: string;

  @ApiPropertyOptional({ example: 'Quản lý toàn bộ nội dung dịch vụ...' })
  description?: string;

  @ApiProperty({ example: ['users:read', 'services:write'] })
  permissions: string[];

  @ApiProperty({ example: true })
  isSystem: boolean;

  static fromEntity(role: Role): RoleResponseDto {
    return {
      id: role.id,
      code: role.code,
      name: role.name,
      description: role.description,
      permissions: role.permissions || [],
      isSystem: role.isSystem,
    };
  }
}
