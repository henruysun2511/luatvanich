import { Controller, Get, Post, Patch, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RequirePermission } from '../../../common/decorators/require-permission.decorator';
import { PERMISSIONS } from '../../../common/constants/permission.constant';
import { ApiResponse } from '../../../common/response/api-response';
import { PartnersService } from '../partners.service';
import { CreatePartnerDto } from '../dto/create-partner.dto';
import { UpdatePartnerDto } from '../dto/update-partner.dto';

@ApiTags('Partners (Admin)')
@ApiBearerAuth()
@Controller({ path: 'admin/partners', version: '1' })
export class PartnersAdminController {
  constructor(private readonly service: PartnersService) {}

  @Get()
  @RequirePermission(PERMISSIONS.SETTINGS_READ)
  @ApiOperation({ summary: 'Lấy danh sách tất cả đối tác' })
  async getAll() {
    const data = await this.service.getAll();
    return ApiResponse.success(data);
  }

  @Post()
  @RequirePermission(PERMISSIONS.SETTINGS_WRITE)
  @ApiOperation({ summary: 'Tạo mới đối tác' })
  async create(@Body() dto: CreatePartnerDto) {
    const data = await this.service.create(dto);
    return ApiResponse.created(data, 'Thêm đối tác thành công');
  }

  @Patch(':id')
  @RequirePermission(PERMISSIONS.SETTINGS_WRITE)
  @ApiOperation({ summary: 'Cập nhật đối tác' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePartnerDto,
  ) {
    const data = await this.service.update(id, dto);
    return ApiResponse.success(data, 'Cập nhật đối tác thành công');
  }

  @Delete(':id')
  @RequirePermission(PERMISSIONS.SETTINGS_WRITE)
  @ApiOperation({ summary: 'Xóa đối tác' })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.service.delete(id);
    return ApiResponse.noContent('Xóa đối tác thành công');
  }
}
