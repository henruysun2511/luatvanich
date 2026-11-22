import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OfficesService } from './offices.service';
import { OfficePublicDto } from './dto/response/office-public.dto';
import { SwaggerDoc } from '../../common/swagger/swagger-doc';
import { ApiResponse } from '../../common/response/api-response';
import { Public } from '../../common/decorators/public.decorator';
import { LangCode } from '../../common/enums/lang.enum';

/**
 * Controller PUBLIC — không cần JWT.
 * Trả danh sách các văn phòng đại diện đang xuất bản.
 */
@ApiTags('Offices (Public)')
@Controller({ path: 'offices', version: '1' })
@Public()
export class OfficesController {
  constructor(private readonly service: OfficesService) {}

  /**
   * GET /api/v1/offices?lang=vi
   */
  @Get()
  @SwaggerDoc({
    summary: 'Danh sách văn phòng đại diện công khai',
    description: 'Trả danh sách các văn phòng đã published. Hỗ trợ ?lang=vi|zh-CN.',
    responseType: OfficePublicDto,
    isArray: true,
  })
  async findAll(@Query('lang') lang = 'vi') {
    const langCode = lang.startsWith('zh') ? LangCode.ZH_CN : LangCode.VI;
    const data = await this.service.getPublicList(langCode);
    return ApiResponse.success(data, 'Lấy danh sách văn phòng thành công');
  }

  /**
   * GET /api/v1/offices/:idOrCode?lang=vi
   */
  @Get(':idOrCode')
  @SwaggerDoc({
    summary: 'Chi tiết văn phòng theo ID hoặc Code',
    responseType: OfficePublicDto,
  })
  async findOne(@Param('idOrCode') idOrCode: string, @Query('lang') lang = 'vi') {
    const langCode = lang.startsWith('zh') ? LangCode.ZH_CN : LangCode.VI;
    const data = await this.service.getPublicDetail(idOrCode, langCode);
    return ApiResponse.success(data, 'Lấy chi tiết văn phòng thành công');
  }
}
