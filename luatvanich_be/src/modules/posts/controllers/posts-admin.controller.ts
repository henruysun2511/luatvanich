import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../../../common/response/api-response';
import { SwaggerDoc } from '../../../common/swagger/swagger-doc';
import { PERMISSIONS } from '../../../common/constants/permission.constant';
import { RequirePermission } from '../../../common/decorators/require-permission.decorator';
import { CreatePostDto } from '../dto/request/create-post.dto';
import { AdminPostQueryDto } from '../dto/request/post-query.dto';
import { UpdatePostDto } from '../dto/request/update-post.dto';
import { UpdatePostStatusDto } from '../dto/request/update-post-status.dto';
import { PostAdminDto } from '../dto/response/post-admin.dto';
import { PostsService } from '../services/posts.service';

@ApiTags('Posts (Admin)')
@Controller({ path: 'admin/posts', version: '1' })
export class PostsAdminController {
  constructor(private readonly service: PostsService) {}

  @Get()
  @RequirePermission(PERMISSIONS.POSTS_READ)
  @SwaggerDoc({ summary: 'Danh sách bài viết quản trị', bearerAuth: true })
  async findAll(@Query() query: AdminPostQueryDto) {
    return ApiResponse.success(await this.service.findAllAdmin(query), 'Lấy danh sách bài viết thành công');
  }

  @Post()
  @RequirePermission(PERMISSIONS.POSTS_WRITE)
  @SwaggerDoc({ summary: 'Tạo bài viết', responseType: PostAdminDto, bodyType: CreatePostDto, status: 201, bearerAuth: true })
  async create(@Body() dto: CreatePostDto) {
    return ApiResponse.created(await this.service.create(dto), 'Tạo bài viết thành công');
  }

  @Get(':id')
  @RequirePermission(PERMISSIONS.POSTS_READ)
  @SwaggerDoc({ summary: 'Chi tiết bài viết quản trị', responseType: PostAdminDto, bearerAuth: true })
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return ApiResponse.success(await this.service.findByIdAdmin(id), 'Lấy bài viết thành công');
  }

  @Patch(':id/status')
  @RequirePermission(PERMISSIONS.POSTS_PUBLISH)
  @SwaggerDoc({ summary: 'Đổi trạng thái xuất bản', responseType: PostAdminDto, bodyType: UpdatePostStatusDto, bearerAuth: true })
  async updateStatus(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePostStatusDto) {
    return ApiResponse.success(await this.service.updateStatus(id, dto), 'Đổi trạng thái bài viết thành công');
  }

  @Patch(':id')
  @RequirePermission(PERMISSIONS.POSTS_WRITE)
  @SwaggerDoc({ summary: 'Cập nhật bài viết', responseType: PostAdminDto, bodyType: UpdatePostDto, bearerAuth: true })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePostDto) {
    return ApiResponse.success(await this.service.update(id, dto), 'Cập nhật bài viết thành công');
  }

  @Delete(':id')
  @RequirePermission(PERMISSIONS.POSTS_DELETE)
  @SwaggerDoc({ summary: 'Xóa bài viết', bearerAuth: true })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.service.delete(id);
    return ApiResponse.noContent('Xóa bài viết thành công');
  }
}
