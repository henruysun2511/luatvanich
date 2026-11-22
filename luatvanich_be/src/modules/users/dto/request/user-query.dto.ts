import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { BaseQueryDto } from '../../../../common/dto/base-query.dto';
import { UserSortBy } from '../../users.constant';

export { UserSortBy };

/**
 * UserQueryDto — Kế thừa BaseQueryDto (q, page, limit, sortOrder)
 * và mở rộng các bộ lọc chuyên biệt cho người dùng (role, isActive, sortBy).
 */
export class UserQueryDto extends BaseQueryDto {
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
    description: 'Cột sắp xếp dữ liệu người dùng',
  })
  @IsOptional()
  @IsEnum(UserSortBy)
  sortBy?: UserSortBy = UserSortBy.CREATED_AT;
}
