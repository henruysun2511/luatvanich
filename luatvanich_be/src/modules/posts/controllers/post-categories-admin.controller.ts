import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../../../common/response/api-response';
import { SwaggerDoc } from '../../../common/swagger/swagger-doc';
import { PERMISSIONS } from '../../../common/constants/permission.constant';
import { RequirePermission } from '../../../common/decorators/require-permission.decorator';
import { CreatePostCategoryDto } from '../dto/request/create-post-category.dto';
import { PostCategoryQueryDto } from '../dto/request/post-category-query.dto';
import { UpdatePostCategoryDto } from '../dto/request/update-post-category.dto';
import { ReorderPostCategoriesDto } from '../dto/request/reorder-post-categories.dto';
import { PostCategoryAdminDto } from '../dto/response/post-category-admin.dto';
import { PostCategoriesService } from '../services/post-categories.service';

@ApiTags('PostCategories (Admin)')
@Controller({ path: 'admin/post-categories', version: '1' })
export class PostCategoriesAdminController {
  constructor(private readonly service: PostCategoriesService) {}

  @Get()
  @RequirePermission(PERMISSIONS.POSTS_READ)
  @SwaggerDoc({ summary: 'Danh sách chuyên mục quản trị', bearerAuth: true })
  async findAll(@Query() query: PostCategoryQueryDto) {
    return ApiResponse.success(await this.service.findAllAdmin(query), 'Lấy danh sách chuyên mục thành công');
  }

  @Post()
  @RequirePermission(PERMISSIONS.POSTS_MANAGE)
  @SwaggerDoc({ summary: 'Tạo chuyên mục', responseType: PostCategoryAdminDto, bodyType: CreatePostCategoryDto, status: 201, bearerAuth: true })
  async create(@Body() dto: CreatePostCategoryDto) {
    return ApiResponse.created(await this.service.create(dto), 'Tạo chuyên mục thành công');
  }

  @Get(':id')
  @RequirePermission(PERMISSIONS.POSTS_READ)
  @SwaggerDoc({ summary: 'Chi tiết chuyên mục quản trị', responseType: PostCategoryAdminDto, bearerAuth: true })
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return ApiResponse.success(await this.service.findByIdAdmin(id), 'Lấy chuyên mục thành công');
  }

  @Patch('reorder')
  @RequirePermission(PERMISSIONS.POSTS_MANAGE)
  @SwaggerDoc({ summary: 'Đổi thứ tự chuyên mục', bodyType: ReorderPostCategoriesDto, bearerAuth: true })
  async reorder(@Body() dto: ReorderPostCategoriesDto) {
    await this.service.reorder(dto);
    return ApiResponse.noContent('Đổi thứ tự chuyên mục thành công');
  }

  @Patch(':id')
  @RequirePermission(PERMISSIONS.POSTS_MANAGE)
  @SwaggerDoc({ summary: 'Cập nhật chuyên mục', responseType: PostCategoryAdminDto, bodyType: UpdatePostCategoryDto, bearerAuth: true })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePostCategoryDto) {
    return ApiResponse.success(await this.service.update(id, dto), 'Cập nhật chuyên mục thành công');
  }

  @Delete(':id')
  @RequirePermission(PERMISSIONS.POSTS_MANAGE)
  @SwaggerDoc({ summary: 'Xóa chuyên mục', bearerAuth: true })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.service.delete(id);
    return ApiResponse.noContent('Xóa chuyên mục thành công');
  }
}
