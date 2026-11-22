import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { SwaggerDoc } from '../../../common/swagger/swagger-doc';
import { ApiResponse } from '../../../common/response/api-response';
import { RequirePermission } from '../../../common/decorators/require-permission.decorator';

@ApiTags('Users')
@Controller({ path: 'admin/users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @RequirePermission('users:read')
  @SwaggerDoc({ summary: 'Danh sách người dùng', bearerAuth: true })
  async findAll() {
    const data = await this.usersService.findAll();
    return ApiResponse.success(data, 'Lấy danh sách người dùng thành công');
  }

  @Get(':id')
  @RequirePermission('users:read')
  @SwaggerDoc({ summary: 'Chi tiết người dùng', bearerAuth: true })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.usersService.findById(id);
    return ApiResponse.success(data, 'Lấy thông tin người dùng thành công');
  }
}
