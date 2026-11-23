import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, ArrayUnique, IsArray, IsInt, IsObject, IsUUID, Max, Min, ValidateNested } from 'class-validator';

export class PracticeAreaOrderItemDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsInt()
  @Min(-2147483648)
  @Max(2147483647)
  displayOrder: number;
}

export class ReorderPracticeAreaDto {
  @ApiProperty({ type: [PracticeAreaOrderItemDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique((item: PracticeAreaOrderItemDto) => (typeof item?.id === 'string' ? item.id.toLowerCase() : item?.id))
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => PracticeAreaOrderItemDto)
  items: PracticeAreaOrderItemDto[];
}
