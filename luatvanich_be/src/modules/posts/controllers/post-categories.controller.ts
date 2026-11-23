import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../../../common/response/api-response';
import { SwaggerDoc } from '../../../common/swagger/swagger-doc';
import { Public } from '../../../common/decorators/public.decorator';
import { PublicPostCategoryQueryDto } from '../dto/request/post-category-query.dto';
import { PostCategoryDetailDto, PostCategoryTreeDto } from '../dto/response/post-category-public.dto';
import { PostCategoriesService } from '../services/post-categories.service';

@ApiTags('Post Categories (Public)')
@Public()
@Controller({ path: 'post-categories', version: '1' })
export class PostCategoriesController {
  constructor(private readonly service: PostCategoriesService) {}

  @Get()
  @SwaggerDoc({ summary: 'Cây chuyên mục bài viết', responseType: PostCategoryTreeDto, isArray: true })
  async findTree(@Query() query: PublicPostCategoryQueryDto, @Req() req: Request) {
    return ApiResponse.success(await this.service.findPublicTree(req.lang, query.section), 'Lấy cây chuyên mục thành công');
  }

  @Get(':slug')
  @SwaggerDoc({ summary: 'Chi tiết chuyên mục', responseType: PostCategoryDetailDto })
  async findBySlug(@Param('slug') slug: string, @Req() req: Request) {
    return ApiResponse.success(await this.service.findPublicBySlug(slug, req.lang), 'Lấy chuyên mục thành công');
  }
}
