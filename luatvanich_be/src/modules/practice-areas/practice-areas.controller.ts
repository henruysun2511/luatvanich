import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from '../../common/decorators/public.decorator';
import { ApiResponse } from '../../common/response/api-response';
import { SwaggerDoc } from '../../common/swagger/swagger-doc';
import { PublicPracticeAreaQueryDto } from './dto/request/practice-area-query.dto';
import { PracticeAreaDetailPublicDto, PracticeAreaPublicDto } from './dto/response/practice-area-public.dto';
import { PRACTICE_AREA_ROUTE } from './practice-areas.constant';
import { PracticeAreasService } from './practice-areas.service';

@ApiTags('Practice Areas (Public)')
@Public()
@Controller({ path: PRACTICE_AREA_ROUTE, version: '1' })
export class PracticeAreasController {
  constructor(private readonly service: PracticeAreasService) {}

  @Get()
  @SwaggerDoc({ summary: 'Danh sách lĩnh vực đã xuất bản', responseType: PracticeAreaPublicDto, isArray: true })
  async findAll(@Query() query: PublicPracticeAreaQueryDto, @Req() request: Request) {
    return ApiResponse.success(await this.service.findAllPublic(request.lang, query.featured));
  }

  @Get(':slug')
  @ApiQuery({ name: 'lang', required: false })
  @SwaggerDoc({ summary: 'Chi tiết lĩnh vực và dịch vụ trực thuộc', responseType: PracticeAreaDetailPublicDto })
  async findBySlug(@Param('slug') slug: string, @Req() request: Request) {
    return ApiResponse.success(await this.service.findBySlug(slug, request.lang));
  }
}
