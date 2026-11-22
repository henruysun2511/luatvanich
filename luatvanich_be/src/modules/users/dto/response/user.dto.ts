import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '../../entities/user.entity';

export class UserResponseDto {
  @ApiProperty({ example: 'uuid-v4' })
  id: string;

  @ApiProperty({ example: 'admin@luatvanich.vn' })
  email: string;

  @ApiProperty({ example: 'admin' })
  username: string;

  @ApiProperty({ example: 'Super Admin' })
  fullName: string;

  @ApiProperty({ example: 'superadmin' })
  role: string;

  @ApiPropertyOptional({ example: 'Super Admin' })
  roleName?: string;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiPropertyOptional({ example: '0912345678' })
  phoneNumber?: string;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/.../avatar.jpg' })
  avatarUrl?: string;

  @ApiPropertyOptional()
  lastLoginAt?: Date;

  @ApiProperty()
  createdAt: Date;

  static fromEntity(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      role: (user.role as any)?.code || 'viewer',
      roleName: (user.role as any)?.name || 'Người xem',
      isActive: user.isActive,
      phoneNumber: user.phoneNumber,
      avatarUrl: user.avatarUrl,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
    };
  }
}
