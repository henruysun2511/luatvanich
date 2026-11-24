import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '../../../common/decorators/public.decorator';
import { ApiResponse } from '../../../common/response/api-response';
import { PartnersService } from '../partners.service';

@ApiTags('Partners (Public)')
@Controller({ path: 'partners', version: '1' })
export class PartnersController {
  constructor(private readonly service: PartnersService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách logo đối tác hiển thị trên slider trang chủ' })
  async getActivePartners() {
    const data = await this.service.getActivePartners();
    return ApiResponse.success(data);
  }
}
