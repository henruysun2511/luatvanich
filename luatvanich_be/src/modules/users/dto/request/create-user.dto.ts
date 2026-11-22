import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'luatsu.nguyen@luatvanich.vn', description: 'Địa chỉ email duy nhất' })
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @ApiProperty({ example: 'luatsunguyen', description: 'Tên đăng nhập duy nhất' })
  @IsString({ message: 'Tên đăng nhập phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  @MinLength(3, { message: 'Tên đăng nhập tối thiểu 3 ký tự' })
  @MaxLength(50, { message: 'Tên đăng nhập tối đa 50 ký tự' })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: 'Tên đăng nhập chỉ được chứa chữ cái, số, gạch dưới hoặc gạch nối',
  })
  username: string;

  @ApiProperty({ example: 'Luật sư Nguyễn Văn A' })
  @IsString({ message: 'Họ và tên phải là chuỗi' })
  @IsNotEmpty({ message: 'Họ và tên không được để trống' })
  @MaxLength(100, { message: 'Họ và tên tối đa 100 ký tự' })
  fullName: string;

  @ApiProperty({ example: 'MatKhau@2026!', minLength: 8 })
  @IsString({ message: 'Mật khẩu phải là chuỗi' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
  password: string;

  @ApiProperty({
    example: 'editor',
    description: 'ID vai trò (UUID) hoặc mã vai trò (superadmin, admin, editor, viewer)',
  })
  @IsString({ message: 'Vai trò phải là chuỗi' })
  @IsNotEmpty({ message: 'Vai trò không được để trống' })
  role: string;

  @ApiPropertyOptional({ example: '0912345678' })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
