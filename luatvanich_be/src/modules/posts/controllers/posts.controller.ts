import { Controller, Get, HttpCode, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../../../common/response/api-response';
import { SwaggerDoc } from '../../../common/swagger/swagger-doc';
import { Public } from '../../../common/decorators/public.decorator';
import { LatestPostQueryDto, PostQueryDto, RelatedPostQueryDto } from '../dto/request/post-query.dto';
import { PostDetailPublicDto } from '../dto/response/post-detail-public.dto';
import { PostPublicDto } from '../dto/response/post-public.dto';
import { PostsService } from '../services/posts.service';

@ApiTags('Posts (Public)')
@Public()
@Controller({ path: 'posts', version: '1' })
export class PostsController {
  constructor(private readonly service: PostsService) {}

  @Get()
  @SwaggerDoc({ summary: 'Danh sách bài viết đã xuất bản' })
  async findAll(@Query() query: PostQueryDto, @Req() req: Request) {
    return ApiResponse.success(await this.service.findAllPublic(query, req.lang), 'Lấy danh sách bài viết thành công');
  }

  @Get('latest')
  @SwaggerDoc({ summary: 'Bài viết mới nhất', responseType: PostPublicDto, isArray: true })
  async findLatest(@Query() query: LatestPostQueryDto, @Req() req: Request) {
    return ApiResponse.success(await this.service.findLatest(query, req.lang), 'Lấy bài viết mới nhất thành công');
  }

  @Get(':slug')
  @SwaggerDoc({ summary: 'Chi tiết bài viết', responseType: PostDetailPublicDto })
  async findBySlug(@Param('slug') slug: string, @Req() req: Request) {
    return ApiResponse.success(await this.service.findBySlug(slug, req.lang), 'Lấy bài viết thành công');
  }

  @Get(':slug/related')
  @SwaggerDoc({ summary: 'Bài viết liên quan', responseType: PostPublicDto, isArray: true })
  async findRelated(@Param('slug') slug: string, @Query() query: RelatedPostQueryDto, @Req() req: Request) {
    return ApiResponse.success(await this.service.findRelated(slug, req.lang, query.limit ?? 5), 'Lấy bài viết liên quan thành công');
  }

  @Post(':slug/view')
  @HttpCode(200)
  @SwaggerDoc({ summary: 'Tăng lượt xem bài viết' })
  async countView(@Param('slug') slug: string, @Req() req: Request) {
    return ApiResponse.success(await this.service.countView(slug, req.lang), 'Ghi nhận lượt xem thành công');
  }
}
