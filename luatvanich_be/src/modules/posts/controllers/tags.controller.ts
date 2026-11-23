import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../../../common/response/api-response';
import { SwaggerDoc } from '../../../common/swagger/swagger-doc';
import { Public } from '../../../common/decorators/public.decorator';
import { PostQueryDto } from '../dto/request/post-query.dto';
import { TagPublicDto } from '../dto/response/tag-response.dto';
import { PostsService } from '../services/posts.service';
import { TagsService } from '../services/tags.service';

@ApiTags('Tags (Public)')
@Public()
@Controller({ path: 'tags', version: '1' })
export class TagsController {
  constructor(private readonly tags: TagsService, private readonly posts: PostsService) {}

  @Get()
  @ApiQuery({ name: 'lang', required: false, enum: ['vi', 'zh-CN'] })
  @SwaggerDoc({ summary: 'Các thẻ đang có bài viết công khai', responseType: TagPublicDto, isArray: true })
  async findAll(@Req() req: Request) {
    return ApiResponse.success(await this.tags.findAllPublic(req.lang), 'Lấy danh sách thẻ thành công');
  }

  @Get(':slug/posts')
  @SwaggerDoc({ summary: 'Danh sách bài viết theo thẻ' })
  async findPosts(@Param('slug') slug: string, @Query() query: PostQueryDto, @Req() req: Request) {
    const tagId = await this.tags.findPublicId(slug, req.lang);
    return ApiResponse.success(await this.posts.findAllPublic(query, req.lang, tagId), 'Lấy bài viết theo thẻ thành công');
  }
}
