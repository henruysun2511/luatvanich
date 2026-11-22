import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, Max, IsEnum, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PAGINATION } from '../constants/pagination.constant';
import { SortOrder } from '../enums/sort-order.enum';

/**
 * BaseQueryDto — DTO cơ sở chứa các tham số truy vấn dùng chung:
 * từ khóa tìm kiếm (q), phân trang (page, limit) và hướng sắp xếp (sortOrder).
 */
export class BaseQueryDto {
  @ApiPropertyOptional({
    description: 'Từ khóa tìm kiếm chung',
  })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({
    enum: SortOrder,
    default: SortOrder.DESC,
    description: 'Hướng sắp xếp (ASC hoặc DESC)',
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;

  @ApiPropertyOptional({
    default: PAGINATION.DEFAULT_PAGE,
    description: 'Trang hiện tại (bắt đầu từ 1)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(PAGINATION.MIN_PAGE)
  page?: number = PAGINATION.DEFAULT_PAGE;

  @ApiPropertyOptional({
    default: PAGINATION.DEFAULT_LIMIT,
    description: `Số lượng bản ghi trên một trang (tối đa ${PAGINATION.MAX_LIMIT})`,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(PAGINATION.MIN_LIMIT)
  @Max(PAGINATION.MAX_LIMIT)
  limit?: number = PAGINATION.DEFAULT_LIMIT;
}
