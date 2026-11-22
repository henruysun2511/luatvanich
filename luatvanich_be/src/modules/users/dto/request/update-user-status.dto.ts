import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateUserStatusDto {
  @ApiProperty({
    example: false,
    description: 'Trạng thái hoạt động của tài khoản: true = hoạt động, false = khóa tài khoản',
  })
  @IsBoolean({ message: 'Trạng thái hoạt động phải là kiểu boolean (true hoặc false)' })
  @IsNotEmpty({ message: 'Trạng thái hoạt động không được để trống' })
  isActive: boolean;
}
