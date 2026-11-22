import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ example: 'MatKhauCu@2026!', description: 'Mật khẩu hiện tại của tài khoản' })
  @IsString({ message: 'Mật khẩu hiện tại phải là chuỗi' })
  @IsNotEmpty({ message: 'Mật khẩu hiện tại không được để trống' })
  currentPassword: string;

  @ApiProperty({ example: 'MatKhauMoi@2026!', minLength: 8, description: 'Mật khẩu mới (tối thiểu 8 ký tự)' })
  @IsString({ message: 'Mật khẩu mới phải là chuỗi' })
  @IsNotEmpty({ message: 'Mật khẩu mới không được để trống' })
  @MinLength(8, { message: 'Mật khẩu mới phải có ít nhất 8 ký tự' })
  newPassword: string;
}
