import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from '../../../common/decorators/public.decorator';
import { ApiResponse } from '../../../common/response/api-response';
import { SwaggerDoc } from '../../../common/swagger/swagger-doc';
import { PublicPracticeAreaQueryDto } from '../dto/request/practice-area-query.dto';
import {
  PracticeAreaDetailPublicDto,
  PracticeAreaPublicDto,
} from '../dto/response/practice-area-public.dto';
import { PracticeAreasService } from '../services/practice-areas.service';

@ApiTags('Practice Areas (Public)')
@Public()
@Controller({ path: 'practice-areas', version: '1' })
export class PracticeAreasController {
  constructor(private readonly service: PracticeAreasService) {}

  /**
   * GET /api/v1/practice-areas
   * Lấy danh sách các lĩnh vực chuyên môn đã xuất bản (hỗ trợ song ngữ & lọc nổi bật)
   */
  @Get()
  @SwaggerDoc({
    summary: 'Danh sách lĩnh vực đã xuất bản',
    responseType: PracticeAreaPublicDto,
    isArray: true,
  })
  async findAll(@Query() query: PublicPracticeAreaQueryDto, @Req() request: Request) {
    const data = await this.service.findAllPublic(request.lang, query.featured);
    return ApiResponse.success(data, 'Lấy danh sách lĩnh vực chuyên môn thành công');
  }

  /**
   * GET /api/v1/practice-areas/:slug
   * Chi tiết lĩnh vực theo slug ngôn ngữ hiện tại, kèm danh sách dịch vụ pháp lý trực thuộc
   */
  @Get(':slug')
  @ApiQuery({ name: 'lang', required: false, description: 'Mã ngôn ngữ: vi hoặc zh-CN' })
  @SwaggerDoc({
    summary: 'Chi tiết lĩnh vực và dịch vụ trực thuộc',
    responseType: PracticeAreaDetailPublicDto,
  })
  async findBySlug(@Param('slug') slug: string, @Req() request: Request) {
    const data = await this.service.findBySlug(slug, request.lang);
    return ApiResponse.success(data, 'Lấy thông tin chi tiết lĩnh vực chuyên môn thành công');
  }
}
