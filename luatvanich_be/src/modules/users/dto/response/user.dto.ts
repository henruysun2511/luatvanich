import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;
}
