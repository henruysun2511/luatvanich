import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, Query, ParseUUIDPipe, HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LegalServicesService } from './legal-services.service';
import { CreateLegalServiceDto } from './dto/request/create-legal-service.dto';
import { UpdateLegalServiceDto } from './dto/request/update-legal-service.dto';
import { LegalServiceQueryDto } from './dto/request/legal-service-query.dto';
import { UpsertTranslationDto } from './dto/request/upsert-translation.dto';
import { UpdateStatusDto } from './dto/request/update-status.dto';
import { ReorderDto } from './dto/request/reorder.dto';
import { LegalServiceAdminDto } from './dto/response/legal-service-admin.dto';
import { SwaggerDoc } from '../../common/swagger/swagger-doc';
import { ApiResponse } from '../../common/response/api-response';
import { RequirePermission } from '../../common/decorators/require-permission.decorator';
import { LangCode } from '../../common/enums/lang.enum';

@ApiTags('Legal Services (Admin)')
@Controller({ path: 'admin/legal-services', version: '1' })
export class LegalServicesAdminController {
  constructor(private readonly service: LegalServicesService) {}

  /** GET /api/v1/admin/legal-services */
  @Get()
  @RequirePermission('services:read')
  @SwaggerDoc({ summary: 'Admin: Danh sách dịch vụ pháp lý', responseType: LegalServiceAdminDto, isArray: true, bearerAuth: true })
  async findAll(@Query() query: LegalServiceQueryDto) {
    const data = await this.service.getAdminList(query);
    return ApiResponse.success(data, 'OK');
  }

  /** POST /api/v1/admin/legal-services */
  @Post()
  @RequirePermission('services:write')
  @SwaggerDoc({ summary: 'Admin: Tạo dịch vụ mới', bodyType: CreateLegalServiceDto, responseType: LegalServiceAdminDto, status: 201, bearerAuth: true })
  async create(@Body() dto: CreateLegalServiceDto) {
    const data = await this.service.create(dto);
    return ApiResponse.created(data, 'Tạo dịch vụ thành công');
  }

  /** GET /api/v1/admin/legal-services/:id */
  @Get(':id')
  @RequirePermission('services:read')
  @SwaggerDoc({ summary: 'Admin: Chi tiết dịch vụ', responseType: LegalServiceAdminDto, bearerAuth: true })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.service.getAdminById(id);
    return ApiResponse.success(data, 'OK');
  }

  /** PATCH /api/v1/admin/legal-services/:id */
  @Patch(':id')
  @RequirePermission('services:write')
  @SwaggerDoc({ summary: 'Admin: Cập nhật dịch vụ', bodyType: UpdateLegalServiceDto, responseType: LegalServiceAdminDto, bearerAuth: true })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateLegalServiceDto) {
    const data = await this.service.update(id, dto);
    return ApiResponse.success(data, 'Cập nhật thành công');
  }

  /** PATCH /api/v1/admin/legal-services/:id/status */
  @Patch(':id/status')
  @RequirePermission('services:publish')
  @SwaggerDoc({ summary: 'Admin: Đổi trạng thái dịch vụ', bodyType: UpdateStatusDto, responseType: LegalServiceAdminDto, bearerAuth: true })
  async updateStatus(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateStatusDto) {
    const data = await this.service.updateStatus(id, dto);
    return ApiResponse.success(data, 'Đổi trạng thái thành công');
  }

  /** GET /api/v1/admin/legal-services/:id/translations */
  @Get(':id/translations')
  @RequirePermission('services:read')
  @SwaggerDoc({ summary: 'Admin: Danh sách bản dịch của dịch vụ', bearerAuth: true })
  async getTranslations(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.service.getTranslations(id);
    return ApiResponse.success(data, 'OK');
  }

  /** PUT /api/v1/admin/legal-services/:id/translations/:lang */
  @Patch(':id/translations/:lang')
  @RequirePermission('services:write')
  @SwaggerDoc({ summary: 'Admin: Tạo/cập nhật bản dịch', bodyType: UpsertTranslationDto, responseType: LegalServiceAdminDto, bearerAuth: true })
  async upsertTranslation(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('lang') lang: LangCode,
    @Body() dto: UpsertTranslationDto,
  ) {
    const data = await this.service.upsertTranslation(id, lang, dto);
    return ApiResponse.success(data, 'Cập nhật bản dịch thành công');
  }

  /** PATCH /api/v1/admin/legal-services/reorder */
  @Patch('reorder')
  @RequirePermission('services:write')
  @HttpCode(200)
  @SwaggerDoc({ summary: 'Admin: Sắp xếp lại thứ tự dịch vụ', bodyType: ReorderDto, bearerAuth: true })
  async reorder(@Body() dto: ReorderDto) {
    await this.service.reorder(dto);
    return ApiResponse.noContent('Sắp xếp thành công');
  }

  /** DELETE /api/v1/admin/legal-services/:id */
  @Delete(':id')
  @RequirePermission('services:delete')
  @HttpCode(200)
  @SwaggerDoc({ summary: 'Admin: Xóa dịch vụ (soft delete)', bearerAuth: true })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.service.remove(id);
    return ApiResponse.noContent('Xóa dịch vụ thành công');
  }
}
