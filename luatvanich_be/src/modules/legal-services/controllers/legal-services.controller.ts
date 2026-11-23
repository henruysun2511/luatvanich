import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LegalServicesService } from '../services/legal-services.service';
import { LegalServiceQueryDto } from '../dto/request/legal-service-query.dto';
import { LegalServicePublicDto } from '../dto/response/legal-service-public.dto';
import { SwaggerDoc } from '../../../common/swagger/swagger-doc';
import { ApiResponse } from '../../../common/response/api-response';
import { Public } from '../../../common/decorators/public.decorator';
import { LangCode } from '../../../common/enums/lang.enum';

/**
 * Controller PUBLIC — không cần JWT.
 * Chỉ trả dữ liệu đã published.
 */
@ApiTags('Legal Services (Public)')
@Controller({ path: 'legal-services', version: '1' })
@Public()
export class LegalServicesController {
  constructor(private readonly service: LegalServicesService) {}

  /**
   * GET /api/v1/legal-services?lang=vi&practiceAreaId=&page=1&limit=20
   */
  @Get()
  @SwaggerDoc({
    summary: 'Danh sách dịch vụ pháp lý đã xuất bản',
    description: 'Trả danh sách dịch vụ pháp lý đã published. Hỗ trợ ?lang=vi|zh-CN, ?practiceAreaId, ?isFeatured.',
    responseType: LegalServicePublicDto,
    isArray: true,
  })
  async findAll(@Query() query: LegalServiceQueryDto) {
    const data = await this.service.getPublicList(query);
    return ApiResponse.success(data, 'Lấy danh sách dịch vụ thành công');
  }

  /**
   * GET /api/v1/legal-services/:slug?lang=vi
   */
  @Get(':slug')
  @SwaggerDoc({
    summary: 'Chi tiết dịch vụ pháp lý theo slug',
    responseType: LegalServicePublicDto,
  })
  async findBySlug(@Param('slug') slug: string, @Query('lang') lang = 'vi') {
    const langCode = lang.startsWith('zh') ? LangCode.ZH_CN : LangCode.VI;
    const data = await this.service.getPublicBySlug(slug, langCode);
    return ApiResponse.success(data, 'Lấy chi tiết dịch vụ thành công');
  }
}
