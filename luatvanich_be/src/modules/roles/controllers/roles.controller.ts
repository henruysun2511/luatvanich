import {
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Body,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesService } from '../services/roles.service';
import { RoleResponseDto } from '../dto/response/role.dto';
import { AssignRoleDto, AssignUserRoleDto } from '../dto/request/assign-role.dto';
import { UserResponseDto } from '../../users/dto/response/user.dto';
import { SwaggerDoc } from '../../../common/swagger/swagger-doc';
import { ApiResponse } from '../../../common/response/api-response';
import { RequirePermission } from '../../../common/decorators/require-permission.decorator';
import { PERMISSIONS } from '../../../common/constants/permission.constant';

@ApiTags('Roles')
@Controller({ path: 'admin/roles', version: '1' })
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  /**
   * GET /api/v1/admin/roles
   * Danh sách tất cả vai trò trong hệ thống
   */
  @Get()
  @RequirePermission(PERMISSIONS.USERS_READ)
  @SwaggerDoc({
    summary: 'Danh sách tất cả vai trò',
    responseType: RoleResponseDto,
    isArray: true,
    bearerAuth: true,
  })
  async findAll() {
    const data = await this.rolesService.findAll();
    return ApiResponse.success(data, 'Lấy danh sách vai trò thành công');
  }

  /**
   * PATCH /api/v1/admin/roles/assign/:userId
   * Gán vai trò mới cho người dùng (URL param userId)
   */
  @Patch('assign/:userId')
  @HttpCode(HttpStatus.OK)
  @RequirePermission(PERMISSIONS.USERS_WRITE)
  @SwaggerDoc({
    summary: 'Gán vai trò mới cho người dùng (theo User ID trong URL)',
    bodyType: AssignRoleDto,
    responseType: UserResponseDto,
    bearerAuth: true,
  })
  async assignRoleByParam(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() dto: AssignRoleDto,
  ) {
    const data = await this.rolesService.assignRole(userId, dto.role);
    return ApiResponse.success(data, 'Gán vai trò cho người dùng thành công');
  }

  /**
   * POST /api/v1/admin/roles/assign
   * Gán vai trò mới cho người dùng (JSON body chứa cả userId và role)
   */
  @Post('assign')
  @HttpCode(HttpStatus.OK)
  @RequirePermission(PERMISSIONS.USERS_WRITE)
  @SwaggerDoc({
    summary: 'Gán vai trò mới cho người dùng (theo JSON Body)',
    bodyType: AssignUserRoleDto,
    responseType: UserResponseDto,
    bearerAuth: true,
  })
  async assignRoleByBody(@Body() dto: AssignUserRoleDto) {
    const data = await this.rolesService.assignRole(dto.userId, dto.role);
    return ApiResponse.success(data, 'Gán vai trò cho người dùng thành công');
  }
}
