import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';

export class ReorderPracticeAreaDto {
  @ApiProperty({
    type: [String],
    example: ['123e4567-e89b-12d3-a456-426614174000', '223e4567-e89b-12d3-a456-426614174001'],
    description: 'Mảng UUID của các lĩnh vực chuyên môn theo thứ tự hiển thị mới',
  })
  @IsArray({ message: 'ids phải là mảng' })
  @ArrayMinSize(1, { message: 'Danh sách ids không được để trống' })
  @IsUUID('4', { each: true, message: 'Mỗi phần tử trong ids phải là UUID v4 hợp lệ' })
  ids: string[];
}
