import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LawyersService } from '../services/lawyers.service';
import { LawyerQueryDto } from '../dto/request/lawyer-query.dto';
import {
  LawyerPublicDto,
  LawyerDetailPublicDto,
} from '../dto/response/lawyer-public.dto';
import { LangCode } from '../../../common/enums/lang.enum';
import { Public } from '../../../common/decorators/public.decorator';
import { SwaggerDoc } from '../../../common/swagger/swagger-doc';
import { ApiResponse } from '../../../common/response/api-response';

@ApiTags('Lawyers (Public)')
@Controller({ path: 'lawyers', version: '1' })
@Public()
export class LawyersController {
  constructor(private readonly lawyersService: LawyersService) {}

  @Get()
  @SwaggerDoc({
    summary: 'Lấy danh sách đội ngũ luật sư công khai',
    responseType: LawyerPublicDto,
    isArray: true,
  })
  async getPublicList(@Query() query: LawyerQueryDto) {
    const lang = query.lang || LangCode.VI;
    const data = await this.lawyersService.findAllPublic(query, lang);
    return ApiResponse.success(data, 'Lấy danh sách luật sư thành công');
  }

  @Get(':slug')
  @SwaggerDoc({
    summary: 'Lấy thông tin chi tiết hồ sơ luật sư theo slug',
    responseType: LawyerDetailPublicDto,
  })
  async getPublicDetail(
    @Param('slug') slug: string,
    @Query('lang') lang = LangCode.VI,
  ) {
    const data = await this.lawyersService.findBySlugPublic(slug, lang);
    return ApiResponse.success(data, 'Lấy chi tiết hồ sơ luật sư thành công');
  }
}
