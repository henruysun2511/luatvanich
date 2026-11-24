import { Controller, Get, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RequirePermission } from '../../../common/decorators/require-permission.decorator';
import { PERMISSIONS } from '../../../common/constants/permission.constant';
import { ApiResponse } from '../../../common/response/api-response';
import { SiteSettingsService } from '../site-settings.service';
import { UpdateSettingsDto } from '../dto/update-settings.dto';

@ApiTags('Site Settings (Admin)')
@ApiBearerAuth()
@Controller({ path: 'admin/site-settings', version: '1' })
export class SiteSettingsAdminController {
  constructor(private readonly service: SiteSettingsService) {}

  @Get()
  @RequirePermission(PERMISSIONS.SETTINGS_READ)
  @ApiOperation({ summary: 'Lấy toàn bộ cấu hình theo nhóm (Admin)' })
  async getAllSettings() {
    const data = await this.service.getAllSettings();
    return ApiResponse.success(data, 'Lấy danh sách cấu hình thành công');
  }

  @Put()
  @RequirePermission(PERMISSIONS.SETTINGS_WRITE)
  @ApiOperation({ summary: 'Cập nhật hàng loạt cấu hình' })
  async updateSettings(@Body() dto: UpdateSettingsDto) {
    await this.service.updateSettings(dto);
    return ApiResponse.success(null, 'Cập nhật cấu hình thành công');
  }
}
