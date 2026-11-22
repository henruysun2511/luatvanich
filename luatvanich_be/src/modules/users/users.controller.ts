import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/response/user.dto';
import { RoleResponseDto } from './dto/response/role.dto';
import { CreateUserDto } from './dto/request/create-user.dto';
import { AssignRoleDto } from './dto/request/assign-role.dto';
import { ChangePasswordDto } from './dto/request/change-password.dto';
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
   * Danh sách người dùng
   */
  @Get()
  @RequirePermission(PERMISSIONS.USERS_READ)
  @SwaggerDoc({
    summary: 'Danh sách người dùng',
    responseType: UserResponseDto,
    isArray: true,
    bearerAuth: true,
  })
  async findAll() {
    const data = await this.usersService.findAll();
    return ApiResponse.success(data, 'Lấy danh sách người dùng thành công');
  }

  /**
   * GET /api/v1/admin/users/roles
   * Danh sách tất cả vai trò trong hệ thống
   */
  @Get('roles')
  @RequirePermission(PERMISSIONS.USERS_READ)
  @SwaggerDoc({
    summary: 'Danh sách tất cả vai trò',
    responseType: RoleResponseDto,
    isArray: true,
    bearerAuth: true,
  })
  async findAllRoles() {
    const data = await this.usersService.findAllRoles();
    return ApiResponse.success(data, 'Lấy danh sách vai trò thành công');
  }

  /**
   * POST /api/v1/admin/users/change-password
   * Người dùng hiện tại tự đổi mật khẩu cá nhân
   */
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @SwaggerDoc({
    summary: 'Tự đổi mật khẩu của tài khoản hiện tại',
    bodyType: ChangePasswordDto,
    bearerAuth: true,
  })
  async changePassword(
    @CurrentUser('id') currentUserId: string,
    @Body() dto: ChangePasswordDto,
  ) {
    await this.usersService.changePassword(currentUserId, dto);
    return ApiResponse.noContent('Đổi mật khẩu thành công. Vui lòng đăng nhập lại với mật khẩu mới.');
  }

  /**
   * GET /api/v1/admin/users/:id
   * Chi tiết người dùng theo ID
   */
  @Get(':id')
  @RequirePermission(PERMISSIONS.USERS_READ)
  @SwaggerDoc({
    summary: 'Chi tiết người dùng theo ID',
    responseType: UserResponseDto,
    bearerAuth: true,
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.usersService.findById(id);
    return ApiResponse.success(data, 'Lấy thông tin người dùng thành công');
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
   * PATCH /api/v1/admin/users/:id/role
   * Gán vai trò (role) cho người dùng
   */
  @Patch(':id/role')
  @HttpCode(HttpStatus.OK)
  @RequirePermission(PERMISSIONS.USERS_WRITE)
  @SwaggerDoc({
    summary: 'Gán vai trò mới cho người dùng',
    bodyType: AssignRoleDto,
    responseType: UserResponseDto,
    bearerAuth: true,
  })
  async assignRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AssignRoleDto,
    @CurrentUser('id') currentUserId: string,
  ) {
    const data = await this.usersService.assignRole(id, dto, currentUserId);
    return ApiResponse.success(data, 'Gán vai trò cho người dùng thành công');
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
