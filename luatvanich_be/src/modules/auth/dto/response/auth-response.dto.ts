import { ApiProperty } from '@nestjs/swagger';

export class UserSummaryDto {
  @ApiProperty({ example: 'uuid-v4' })
  id: string;

  @ApiProperty({ example: 'admin@luatvanich.vn' })
  email: string;

  @ApiProperty({ example: 'admin', required: false })
  username?: string;

  @ApiProperty({ example: 'Super Admin' })
  fullName: string;

  @ApiProperty({ example: 'superadmin' })
  role: string;
}

export class AuthResponseDto {
  @ApiProperty({ description: 'JWT Access Token (15 phút)' })
  accessToken: string;

  @ApiProperty({ type: UserSummaryDto })
  user: UserSummaryDto;
}
