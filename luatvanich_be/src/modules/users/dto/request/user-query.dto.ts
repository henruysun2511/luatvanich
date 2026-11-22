import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, IsInt, Min, Max, IsEnum } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { SortOrder } from '../../../../common/enums/sort-order.enum';
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
    default: 1,
    description: 'Trang hiện tại (bắt đầu từ 1)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    default: 10,
    description: 'Số lượng bản ghi trên một trang (tối đa 100)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}
