import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LawyersService } from '../services/lawyers.service';
import { CreateLawyerDto } from '../dto/request/create-lawyer.dto';
import { UpdateLawyerDto } from '../dto/request/update-lawyer.dto';
import { UpdateLawyerStatusDto } from '../dto/request/update-lawyer-status.dto';
import { ReorderLawyerDto } from '../dto/request/reorder-lawyer.dto';
import { LawyerQueryDto } from '../dto/request/lawyer-query.dto';
import { LawyerAdminDto } from '../dto/response/lawyer-admin.dto';
import { RequirePermission } from '../../../common/decorators/require-permission.decorator';
import { PERMISSIONS } from '../../../common/constants/permission.constant';
import { SwaggerDoc } from '../../../common/swagger/swagger-doc';
import { ApiResponse } from '../../../common/response/api-response';

@ApiTags('Lawyers (Admin)')
@Controller({ path: 'admin/lawyers', version: '1' })
export class LawyersAdminController {
  constructor(private readonly lawyersService: LawyersService) {}

  @Get()
  @RequirePermission(PERMISSIONS.SERVICES_READ)
  @SwaggerDoc({
    summary: 'Admin: Danh sách quản trị hồ sơ luật sư phân trang',
    responseType: LawyerAdminDto,
    isArray: true,
    bearerAuth: true,
  })
  async getAdminList(@Query() query: LawyerQueryDto) {
    const data = await this.lawyersService.findPaginatedAdmin(query);
    return ApiResponse.success(data, 'Lấy danh sách luật sư thành công');
  }

  @Post()
  @RequirePermission(PERMISSIONS.SERVICES_WRITE)
  @SwaggerDoc({
    summary: 'Admin: Tạo mới hồ sơ luật sư',
    responseType: LawyerAdminDto,
    bearerAuth: true,
  })
  async create(@Body() dto: CreateLawyerDto) {
    const data = await this.lawyersService.create(dto);
    return ApiResponse.success(data, 'Tạo hồ sơ luật sư thành công');
  }

  @Patch('reorder')
  @RequirePermission(PERMISSIONS.SERVICES_WRITE)
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDoc({
    summary: 'Admin: Đổi thứ tự sắp xếp hiển thị',
    bearerAuth: true,
  })
  async reorder(@Body() dto: ReorderLawyerDto) {
    await this.lawyersService.reorder(dto.ids);
  }

  @Get(':id')
  @RequirePermission(PERMISSIONS.SERVICES_READ)
  @SwaggerDoc({
    summary: 'Admin: Chi tiết hồ sơ luật sư theo ID',
    responseType: LawyerAdminDto,
    bearerAuth: true,
  })
  async getAdminById(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.lawyersService.findByIdAdmin(id);
    return ApiResponse.success(data, 'Lấy chi tiết luật sư thành công');
  }

  @Patch(':id/status')
  @RequirePermission(PERMISSIONS.SERVICES_WRITE)
  @SwaggerDoc({
    summary: 'Admin: Cập nhật nhanh trạng thái hiển thị',
    responseType: LawyerAdminDto,
    bearerAuth: true,
  })
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateLawyerStatusDto,
  ) {
    const data = await this.lawyersService.updateStatus(id, dto.status);
    return ApiResponse.success(data, 'Cập nhật trạng thái thành công');
  }

  @Patch(':id')
  @RequirePermission(PERMISSIONS.SERVICES_WRITE)
  @SwaggerDoc({
    summary: 'Admin: Cập nhật hồ sơ luật sư',
    responseType: LawyerAdminDto,
    bearerAuth: true,
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateLawyerDto,
  ) {
    const data = await this.lawyersService.update(id, dto);
    return ApiResponse.success(data, 'Cập nhật hồ sơ luật sư thành công');
  }

  @Delete(':id')
  @RequirePermission(PERMISSIONS.SERVICES_DELETE)
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDoc({
    summary: 'Admin: Xóa mềm hồ sơ luật sư',
    bearerAuth: true,
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.lawyersService.delete(id);
  }
}
