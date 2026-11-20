import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

export class ReorderDto {
  @ApiProperty({ type: [String], description: 'Mảng UUID theo thứ tự mới' })
  @IsArray()
  @IsUUID('4', { each: true })
  ids: string[];
}
