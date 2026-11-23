import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiExtraModels, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { PERMISSIONS } from '../../common/constants/permission.constant';
import { RequirePermission } from '../../common/decorators/require-permission.decorator';
import { ApiResponse } from '../../common/response/api-response';
import { SwaggerDoc } from '../../common/swagger/swagger-doc';
import { CreatePracticeAreaDto } from './dto/request/create-practice-area.dto';
import { PracticeAreaQueryDto } from './dto/request/practice-area-query.dto';
import { PracticeAreaOrderItemDto, ReorderPracticeAreaDto } from './dto/request/reorder-practice-area.dto';
import { UpdatePracticeAreaDto } from './dto/request/update-practice-area.dto';
import { PracticeAreaAdminDto } from './dto/response/practice-area-admin.dto';
import { PRACTICE_AREA_ADMIN_ROUTE } from './practice-areas.constant';
import { PracticeAreasService } from './practice-areas.service';

const reorderValidation = new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
});

@ApiTags('Practice Areas (Admin)')
@ApiExtraModels(ReorderPracticeAreaDto, PracticeAreaOrderItemDto)
@Controller({ path: PRACTICE_AREA_ADMIN_ROUTE, version: '1' })
export class PracticeAreasAdminController {
  constructor(private readonly service: PracticeAreasService) {}

  @Get()
  @RequirePermission(PERMISSIONS.SERVICES_READ)
  @SwaggerDoc({ summary: 'Danh sách lĩnh vực quản trị', bearerAuth: true })
  async findAll(@Query() query: PracticeAreaQueryDto) {
    return ApiResponse.success(await this.service.findAllAdmin(query));
  }

  @Post()
  @RequirePermission(PERMISSIONS.SERVICES_WRITE)
  @SwaggerDoc({ summary: 'Tạo lĩnh vực', responseType: PracticeAreaAdminDto, status: 201, bearerAuth: true })
  async create(@Body() dto: CreatePracticeAreaDto) {
    return ApiResponse.created(await this.service.create(dto));
  }

  @Get(':id')
  @RequirePermission(PERMISSIONS.SERVICES_READ)
  @SwaggerDoc({ summary: 'Chi tiết lĩnh vực quản trị', responseType: PracticeAreaAdminDto, bearerAuth: true })
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return ApiResponse.success(await this.service.findByIdAdmin(id));
  }

  @Patch('reorder')
  @RequirePermission(PERMISSIONS.SERVICES_WRITE)
  @ApiBody({ schema: { oneOf: [
    { type: 'array', items: { $ref: getSchemaPath(PracticeAreaOrderItemDto) } },
    { $ref: getSchemaPath(ReorderPracticeAreaDto) },
  ] } })
  @SwaggerDoc({ summary: 'Đổi thứ tự lĩnh vực', bearerAuth: true })
  async reorder(@Body() body: ReorderPracticeAreaDto | PracticeAreaOrderItemDto[]) {
    const dto: ReorderPracticeAreaDto = await reorderValidation.transform(
      Array.isArray(body) ? { items: body } : body,
      { type: 'body', metatype: ReorderPracticeAreaDto },
    );
    await this.service.reorder(dto.items);
    return ApiResponse.noContent('Sắp xếp thành công');
  }

  @Patch(':id')
  @RequirePermission(PERMISSIONS.SERVICES_WRITE)
  @SwaggerDoc({ summary: 'Cập nhật lĩnh vực và bản dịch', responseType: PracticeAreaAdminDto, bearerAuth: true })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePracticeAreaDto) {
    return ApiResponse.success(await this.service.update(id, dto));
  }

  @Delete(':id')
  @RequirePermission(PERMISSIONS.SERVICES_DELETE)
  @SwaggerDoc({ summary: 'Xóa mềm lĩnh vực', bearerAuth: true })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.service.delete(id);
    return ApiResponse.noContent('Xóa lĩnh vực thành công');
  }
}
