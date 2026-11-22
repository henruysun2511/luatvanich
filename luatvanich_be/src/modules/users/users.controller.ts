import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/response/user.dto';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UserQueryDto } from './dto/request/user-query.dto';
import { AdminResetPasswordDto } from './dto/request/admin-reset-password.dto';
import { SwaggerDoc } from '../../common/swagger/swagger-doc';
import { ApiResponse } from '../../common/response/api-response';
import { RequirePermission } from '../../common/decorators/require-permission.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { PERMISSIONS } from '../../common/constants/permission.constant';

@ApiTags('Users')
@Controller({ path: 'admin/users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * GET /api/v1/admin/users
   * Danh sách người dùng có tìm kiếm, bộ lọc và phân trang
   */
  @Get()
  @RequirePermission(PERMISSIONS.USERS_READ)
  @SwaggerDoc({
    summary: 'Danh sách người dùng (tìm kiếm, lọc, phân trang)',
    description: 'Hỗ trợ ?q= (từ khóa), ?role= (mã hoặc UUID vai trò), ?isActive= (true/false), ?sortBy=, ?sortOrder=, ?page=, ?limit=',
    responseType: UserResponseDto,
    isArray: true,
    bearerAuth: true,
  })
  async findAll(@Query() query: UserQueryDto) {
    const data = await this.usersService.findAll(query);
    return ApiResponse.success(data, 'Lấy danh sách người dùng thành công');
  }

  /**
   * POST /api/v1/admin/users
   * Tạo tài khoản người dùng mới
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @RequirePermission(PERMISSIONS.USERS_WRITE)
  @SwaggerDoc({
    summary: 'Tạo tài khoản người dùng mới',
    bodyType: CreateUserDto,
    responseType: UserResponseDto,
    bearerAuth: true,
  })
  async create(@Body() dto: CreateUserDto) {
    const data = await this.usersService.create(dto);
    return ApiResponse.created(data, 'Tạo tài khoản người dùng thành công');
  }

  /**
   * DELETE /api/v1/admin/users/:id
   * Xóa tài khoản người dùng
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @RequirePermission(PERMISSIONS.USERS_DELETE)
  @SwaggerDoc({
    summary: 'Xóa tài khoản người dùng',
    bearerAuth: true,
  })
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('id') currentUserId: string,
  ) {
    await this.usersService.delete(id, currentUserId);
    return ApiResponse.noContent('Xóa tài khoản người dùng thành công');
  }

  /**
   * PATCH /api/v1/admin/users/:id/password
   * Quản trị viên đặt lại mật khẩu cho tài khoản người dùng
   */
  @Patch(':id/password')
  @HttpCode(HttpStatus.OK)
  @RequirePermission(PERMISSIONS.USERS_WRITE)
  @SwaggerDoc({
    summary: 'Quản trị viên đặt lại mật khẩu cho người dùng',
    bodyType: AdminResetPasswordDto,
    bearerAuth: true,
  })
  async adminResetPassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AdminResetPasswordDto,
  ) {
    await this.usersService.adminResetPassword(id, dto);
    return ApiResponse.noContent('Đặt lại mật khẩu cho người dùng thành công');
  }
}
