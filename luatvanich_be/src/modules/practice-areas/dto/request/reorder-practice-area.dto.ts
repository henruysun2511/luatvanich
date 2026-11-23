import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsInt,
  IsObject,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class PracticeAreaOrderItemDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID của lĩnh vực chuyên môn (UUID)',
  })
  @IsUUID('4', { message: 'ID lĩnh vực phải là UUID v4 hợp lệ' })
  id: string;

  @ApiProperty({ example: 1, description: 'Thứ tự hiển thị mới' })
  @IsInt({ message: 'Thứ tự hiển thị phải là số nguyên' })
  @Min(-2147483648, { message: 'Thứ tự hiển thị tối thiểu -2147483648' })
  @Max(2147483647, { message: 'Thứ tự hiển thị tối đa 2147483647' })
  displayOrder: number;
}

export class ReorderPracticeAreaDto {
  @ApiProperty({
    type: [PracticeAreaOrderItemDto],
    description: 'Danh sách các lĩnh vực cần cập nhật thứ tự hiển thị',
  })
  @IsArray({ message: 'items phải là mảng' })
  @ArrayMinSize(1, { message: 'Danh sách items không được để trống' })
  @ArrayUnique(
    (item: PracticeAreaOrderItemDto) =>
      typeof item?.id === 'string' ? item.id.toLowerCase() : item?.id,
    { message: 'Các ID trong danh sách sắp xếp không được trùng nhau' },
  )
  @IsObject({ each: true, message: 'Mỗi item phải là một object' })
  @ValidateNested({ each: true })
  @Type(() => PracticeAreaOrderItemDto)
  items: PracticeAreaOrderItemDto[];
}
