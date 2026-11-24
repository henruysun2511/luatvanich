import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../../../common/response/api-response';
import { SwaggerDoc } from '../../../common/swagger/swagger-doc';
import { PERMISSIONS } from '../../../common/constants/permission.constant';
import { RequirePermission } from '../../../common/decorators/require-permission.decorator';
import { CreateTagDto } from '../dto/request/create-tag.dto';
import { TagQueryDto } from '../dto/request/tag-query.dto';
import { UpdateTagDto } from '../dto/request/update-tag.dto';
import { TagAdminDto } from '../dto/response/tag-response.dto';
import { TagsService } from '../services/tags.service';

@ApiTags('Tags (Admin)')
@Controller({ path: 'admin/tags', version: '1' })
export class TagsAdminController {
  constructor(private readonly service: TagsService) {}

  @Get()
  @RequirePermission(PERMISSIONS.POSTS_READ)
  @SwaggerDoc({ summary: 'Danh sách thẻ quản trị', bearerAuth: true })
  async findAll(@Query() query: TagQueryDto) {
    return ApiResponse.success(await this.service.findAllAdmin(query), 'Lấy danh sách thẻ thành công');
  }

  @Post()
  @RequirePermission(PERMISSIONS.POSTS_WRITE)
  @SwaggerDoc({ summary: 'Tạo thẻ', responseType: TagAdminDto, bodyType: CreateTagDto, status: 201, bearerAuth: true })
  async create(@Body() dto: CreateTagDto) {
    return ApiResponse.created(await this.service.create(dto), 'Tạo thẻ thành công');
  }

  @Get(':id')
  @RequirePermission(PERMISSIONS.POSTS_READ)
  @SwaggerDoc({ summary: 'Chi tiết thẻ quản trị', responseType: TagAdminDto, bearerAuth: true })
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return ApiResponse.success(await this.service.findByIdAdmin(id), 'Lấy thẻ thành công');
  }

  @Patch(':id')
  @RequirePermission(PERMISSIONS.POSTS_WRITE)
  @SwaggerDoc({ summary: 'Cập nhật thẻ', responseType: TagAdminDto, bodyType: UpdateTagDto, bearerAuth: true })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTagDto) {
    return ApiResponse.success(await this.service.update(id, dto), 'Cập nhật thẻ thành công');
  }

  @Delete(':id')
  @RequirePermission(PERMISSIONS.POSTS_DELETE)
  @SwaggerDoc({ summary: 'Xóa thẻ', bearerAuth: true })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.service.delete(id);
    return ApiResponse.noContent('Xóa thẻ thành công');
  }
}
