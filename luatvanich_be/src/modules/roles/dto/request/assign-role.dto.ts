import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AssignRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'ID vai trò (UUID) hoặc mã vai trò (superadmin, admin, editor, viewer)',
  })
  @IsString({ message: 'Vai trò phải là chuỗi' })
  @IsNotEmpty({ message: 'Vai trò không được để trống' })
  role: string;
}

export class AssignUserRoleDto {
  @ApiProperty({
    example: 'd9b2d63d-a233-4f9e-9bd5-5028c7c94b8e',
    description: 'ID người dùng cần gán vai trò',
  })
  @IsUUID('4', { message: 'ID người dùng phải là UUID hợp lệ' })
  @IsNotEmpty({ message: 'ID người dùng không được để trống' })
  userId: string;

  @ApiProperty({
    example: 'admin',
    description: 'ID vai trò (UUID) hoặc mã vai trò (superadmin, admin, editor, viewer)',
  })
  @IsString({ message: 'Vai trò phải là chuỗi' })
  @IsNotEmpty({ message: 'Vai trò không được để trống' })
  role: string;
}
