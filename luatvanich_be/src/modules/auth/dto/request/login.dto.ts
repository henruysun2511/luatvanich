import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'admin@luatvanich.vn',
    description: 'Tên đăng nhập (username) hoặc Email',
  })
  @IsNotEmpty({ message: 'Vui lòng nhập tên đăng nhập hoặc email' })
  @IsString({ message: 'Tên đăng nhập hoặc email phải là chuỗi' })
  username?: string;

  @ApiProperty({
    example: 'admin@luatvanich.vn',
    description: 'Email (tùy chọn thay thế cho username)',
    required: false,
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ example: 'Admin@2026!', description: 'Mật khẩu đăng nhập' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải từ 6 ký tự trở lên' })
  password: string;
}
