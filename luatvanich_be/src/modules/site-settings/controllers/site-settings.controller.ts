import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '../../../common/decorators/public.decorator';
import { ApiResponse } from '../../../common/response/api-response';
import { SiteSettingsService } from '../services/site-settings.service';

@ApiTags('Site Settings (Public)')
@Controller({ path: 'site-settings', version: '1' })
export class SiteSettingsController {
  constructor(private readonly service: SiteSettingsService) { }

  @Public()
  @Get('public')
  @ApiOperation({ summary: 'Lấy cấu hình công khai toàn site (Hotline, Email, QR, Stats...)' })
  async getPublicSettings() {
    const data = await this.service.getPublicSettings();
    return ApiResponse.success(data, 'Lấy cấu hình thành công');
  }
}
