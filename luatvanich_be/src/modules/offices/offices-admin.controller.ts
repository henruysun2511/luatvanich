import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, Query, ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OfficesService } from './offices.service';
import { CreateOfficeDto } from './dto/request/create-office.dto';
import { UpdateOfficeDto } from './dto/request/update-office.dto';
import { OfficeQueryDto } from './dto/request/office-query.dto';
import { ReorderOfficeDto } from './dto/request/reorder-office.dto';
import { OfficeAdminDto } from './dto/response/office-admin.dto';
import { SwaggerDoc } from '../../common/swagger/swagger-doc';
import { ApiResponse } from '../../common/response/api-response';
import { RequirePermission } from '../../common/decorators/require-permission.decorator';
import { PERMISSIONS } from '../../common/constants/permission.constant';

@ApiTags('Offices (Admin)')
@Controller({ path: 'admin/offices', version: '1' })
export class OfficesAdminController {
  constructor(private readonly service: OfficesService) {}

  /** GET /api/v1/admin/offices */
  @Get()
  @RequirePermission(PERMISSIONS.SETTINGS_READ)
  @SwaggerDoc({ summary: 'Admin: Danh sách văn phòng đại diện', responseType: OfficeAdminDto, isArray: true, bearerAuth: true })
  async findAll(@Query() query: OfficeQueryDto) {
    const data = await this.service.getAdminList(query);
    return ApiResponse.success(data, 'Lấy danh sách văn phòng thành công');
  }

  /** POST /api/v1/admin/offices */
  @Post()
  @RequirePermission(PERMISSIONS.SETTINGS_WRITE)
  @SwaggerDoc({ summary: 'Admin: Tạo văn phòng mới', bodyType: CreateOfficeDto, responseType: OfficeAdminDto, status: 201, bearerAuth: true })
  async create(@Body() dto: CreateOfficeDto) {
    const data = await this.service.create(dto);
    return ApiResponse.created(data, 'Tạo văn phòng thành công');
  }

  /** GET /api/v1/admin/offices/:id */
  @Get(':id')
  @RequirePermission(PERMISSIONS.SETTINGS_READ)
  @SwaggerDoc({ summary: 'Admin: Chi tiết văn phòng', responseType: OfficeAdminDto, bearerAuth: true })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.service.getAdminDetail(id);
    return ApiResponse.success(data, 'Lấy chi tiết văn phòng thành công');
  }

  /** PATCH /api/v1/admin/offices/reorder */
  @Patch('reorder')
  @RequirePermission(PERMISSIONS.SETTINGS_WRITE)
  @SwaggerDoc({ summary: 'Admin: Đổi thứ tự sắp xếp văn phòng', bodyType: ReorderOfficeDto, bearerAuth: true })
  async reorder(@Body() dto: ReorderOfficeDto) {
    await this.service.reorder(dto);
    return ApiResponse.success(null, 'Cập nhật thứ tự văn phòng thành công');
  }

  /** PATCH /api/v1/admin/offices/:id */
  @Patch(':id')
  @RequirePermission(PERMISSIONS.SETTINGS_WRITE)
  @SwaggerDoc({ summary: 'Admin: Cập nhật văn phòng', bodyType: UpdateOfficeDto, responseType: OfficeAdminDto, bearerAuth: true })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateOfficeDto,
  ) {
    const data = await this.service.update(id, dto);
    return ApiResponse.success(data, 'Cập nhật văn phòng thành công');
  }

  /** DELETE /api/v1/admin/offices/:id */
  @Delete(':id')
  @RequirePermission(PERMISSIONS.SETTINGS_WRITE)
  @SwaggerDoc({ summary: 'Admin: Xóa văn phòng (soft delete)', bearerAuth: true })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.service.delete(id);
    return ApiResponse.success(null, 'Xóa văn phòng thành công');
  }
}
