import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayNotEmpty, ArrayUnique, IsArray, IsUUID } from 'class-validator';

export class ReorderPostCategoriesDto {
  @ArrayNotEmpty({ message: 'Cần ít nhất một chuyên mục' })
  @ApiProperty({ description: 'Danh sách chuyên mục theo thứ tự mới', example: ["a3da8be5-519e-4459-930f-ea3bd1eaf15c"], type: [String] })
  @IsArray({ message: 'Danh sách chuyên mục theo thứ tự mới phải là mảng' })
  @ArrayMaxSize(500, { message: 'Danh sách chuyên mục theo thứ tự mới vượt quá số mục cho phép' })
  @ArrayUnique((id: unknown) => typeof id === 'string' ? id.toLowerCase() : id, { message: 'Danh sách chuyên mục theo thứ tự mới không được trùng ID' })
  @IsUUID('4', { each: true, message: 'Danh sách chuyên mục theo thứ tự mới phải chứa UUID v4 hợp lệ' })
  ids: string[];
}
