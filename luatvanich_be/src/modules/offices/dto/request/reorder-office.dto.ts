import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

export class ReorderOfficeDto {
  @ApiProperty({ type: [String], description: 'Mảng UUID của các văn phòng theo thứ tự mới' })
  @IsArray()
  @IsUUID('4', { each: true })
  ids: string[];
}
