import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AssignRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'ID vai trò (UUID) hoặc mã vai trò (superadmin, admin, editor, viewer)',
  })
  @IsString({ message: 'Vai trò phải là chuỗi' })
  @IsNotEmpty({ message: 'Vai trò không được để trống' })
  role: string;
}
