import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class UpdateProfileDto {
  @ApiPropertyOptional({
    example: 'Luật sư Nguyễn Văn A',
    description: 'Họ và tên của người dùng',
  })
  @IsOptional()
  @IsString({ message: 'Họ và tên phải là chuỗi' })
  @MaxLength(100, { message: 'Họ và tên tối đa 100 ký tự' })
  fullName?: string;

  @ApiPropertyOptional({
    example: '0912345678',
    description: 'Số điện thoại liên hệ',
  })
  @IsOptional()
  @IsString({ message: 'Số điện thoại phải là chuỗi' })
  @MaxLength(20, { message: 'Số điện thoại tối đa 20 ký tự' })
  phoneNumber?: string;

  @ApiPropertyOptional({
    example: 'https://res.cloudinary.com/luatvanich/image/upload/v1234/avatar.jpg',
    description: 'Đường dẫn ảnh đại diện',
  })
  @IsOptional()
  @IsString({ message: 'Đường dẫn ảnh đại diện phải là chuỗi' })
  avatarUrl?: string;

  @ApiPropertyOptional({
    example: 'luatsu.nguyen@luatvanich.vn',
    description: 'Email liên hệ',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email?: string;

  @ApiPropertyOptional({
    example: 'luatsunguyen',
    description: 'Tên đăng nhập',
  })
  @IsOptional()
  @IsString({ message: 'Tên đăng nhập phải là chuỗi' })
  @MinLength(3, { message: 'Tên đăng nhập tối thiểu 3 ký tự' })
  @MaxLength(50, { message: 'Tên đăng nhập tối đa 50 ký tự' })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: 'Tên đăng nhập chỉ được chứa chữ cái, số, gạch dưới hoặc gạch nối',
  })
  username?: string;
}
