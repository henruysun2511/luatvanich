import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserResponseDto } from '../../../users/dto/response/user.dto';

export class AuthResponseDto {
  @ApiProperty({ description: 'JWT Access Token (15 phút)' })
  accessToken: string;

  @ApiPropertyOptional({ description: 'JWT Refresh Token (7 ngày)' })
  refreshToken?: string;

  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;
}
