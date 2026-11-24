import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class DashboardQueryDto {
  @ApiPropertyOptional({
    description: 'Số ngày thống kê chuỗi thời gian (mặc định 14 ngày)',
    example: 14,
    default: 14,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(7)
  @Max(90)
  days?: number = 14;
}
