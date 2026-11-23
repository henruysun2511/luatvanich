import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

export class ReorderLawyerDto {
  @ApiProperty({ type: [String], description: 'Mảng UUID luật sư theo thứ tự hiển thị mới' })
  @IsArray()
  @IsUUID('4', { each: true })
  ids: string[];
}
