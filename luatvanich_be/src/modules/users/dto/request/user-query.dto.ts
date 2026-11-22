import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, IsInt, Min, Max, IsEnum } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { SortOrder } from '../../../../common/enums/sort-order.enum';
import { PAGINATION } from '../../../../common/constants/pagination.constant';
import { UserSortBy } from '../../users.constant';

export { SortOrder, UserSortBy };

export class UserQueryDto {
  @ApiPropertyOptional({
    description: 'Tìm kiếm theo từ khóa (username, email, họ tên, số điện thoại)',
  })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({
    description: 'Lọc theo vai trò (mã vai trò: superadmin, admin, editor, viewer hoặc UUID vai trò)',
  })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiPropertyOptional({
    description: 'Lọc theo trạng thái hoạt động: true = đang hoạt động, false = đã khóa',
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
  })
  isActive?: boolean;

  @ApiPropertyOptional({
    enum: UserSortBy,
    default: UserSortBy.CREATED_AT,
    description: 'Cột sắp xếp dữ liệu',
  })
  @IsOptional()
  @IsEnum(UserSortBy)
  sortBy?: UserSortBy = UserSortBy.CREATED_AT;

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
