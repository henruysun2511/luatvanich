import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequirePermission } from '../../../common/decorators/require-permission.decorator';
import { PERMISSIONS } from '../../../common/constants/permission.constant';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { SwaggerDoc } from '../../../common/swagger/swagger-doc';
import { ApiResponse } from '../../../common/response/api-response';
import { ConsultationsService } from '../services/consultations.service';
import { ConsultationQueryDto } from '../dto/request/consultation-query.dto';
import { UpdateConsultationStatusDto } from '../dto/request/update-consultation-status.dto';
import { AssignConsultationDto } from '../dto/request/assign-consultation.dto';
import { BulkStatusConsultationDto } from '../dto/request/bulk-status-consultation.dto';
import { CreateConsultationNoteDto } from '../dto/request/create-consultation-note.dto';
import { ConsultationAdminDto } from '../dto/response/consultation-admin.dto';
import { ConsultationNoteDto } from '../dto/response/consultation-note.dto';

@ApiTags('Consultations (Admin)')
@Controller({ path: 'admin/consultations', version: '1' })
export class ConsultationsAdminController {
  constructor(private readonly service: ConsultationsService) {}

  /** GET /api/v1/admin/consultations */
  @Get()
  @RequirePermission(PERMISSIONS.CONSULTATIONS_READ)
  @SwaggerDoc({
    summary: 'Admin: Danh sách yêu cầu tư vấn & leads',
    responseType: ConsultationAdminDto,
    isArray: true,
    bearerAuth: true,
  })
  async findAll(@Query() query: ConsultationQueryDto) {
    const data = await this.service.getAdminList(query);
    return ApiResponse.success(data, 'Lấy danh sách yêu cầu tư vấn thành công');
  }

  /** GET /api/v1/admin/consultations/:id */
  @Get(':id')
  @RequirePermission(PERMISSIONS.CONSULTATIONS_READ)
  @SwaggerDoc({
    summary: 'Admin: Xem chi tiết yêu cầu tư vấn',
    responseType: ConsultationAdminDto,
    bearerAuth: true,
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.service.getAdminById(id);
    return ApiResponse.success(data, 'Lấy chi tiết yêu cầu tư vấn thành công');
  }

  /** PATCH /api/v1/admin/consultations/:id/status */
  @Patch(':id/status')
  @RequirePermission(PERMISSIONS.CONSULTATIONS_WRITE)
  @SwaggerDoc({
    summary: 'Admin: Cập nhật trạng thái lead',
    bodyType: UpdateConsultationStatusDto,
    responseType: ConsultationAdminDto,
    bearerAuth: true,
  })
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateConsultationStatusDto,
  ) {
    const data = await this.service.updateStatus(id, dto.status);
    return ApiResponse.success(data, 'Cập nhật trạng thái lead thành công');
  }

  /** PATCH /api/v1/admin/consultations/:id/assign */
  @Patch(':id/assign')
  @RequirePermission(PERMISSIONS.CONSULTATIONS_WRITE)
  @SwaggerDoc({
    summary: 'Admin: Phân công người phụ trách xử lý lead',
    bodyType: AssignConsultationDto,
    responseType: ConsultationAdminDto,
    bearerAuth: true,
  })
  async assignUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AssignConsultationDto,
  ) {
    const data = await this.service.assignUser(id, dto.assignedUserId ?? null);
    return ApiResponse.success(data, 'Phân công người phụ trách thành công');
  }

  /** POST /api/v1/admin/consultations/bulk-status */
  @Post('bulk-status')
  @HttpCode(HttpStatus.OK)
  @RequirePermission(PERMISSIONS.CONSULTATIONS_WRITE)
  @SwaggerDoc({
    summary: 'Admin: Cập nhật trạng thái hàng loạt',
    bodyType: BulkStatusConsultationDto,
    bearerAuth: true,
  })
  async bulkStatus(@Body() dto: BulkStatusConsultationDto) {
    await this.service.bulkUpdateStatus(dto.ids, dto.status);
    return ApiResponse.success(null, 'Cập nhật trạng thái hàng loạt thành công');
  }

  /** POST /api/v1/admin/consultations/:id/notes */
  @Post(':id/notes')
  @HttpCode(HttpStatus.CREATED)
  @RequirePermission(PERMISSIONS.CONSULTATIONS_WRITE)
  @SwaggerDoc({
    summary: 'Admin: Thêm ghi chú nội bộ vào lead',
    bodyType: CreateConsultationNoteDto,
    responseType: ConsultationNoteDto,
    status: 201,
    bearerAuth: true,
  })
  async addNote(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateConsultationNoteDto,
    @CurrentUser() user: any,
  ) {
    const data = await this.service.addNote(
      id,
      user?.id ?? null,
      user?.fullName || user?.email || null,
      dto.note,
    );
    return ApiResponse.created(data, 'Thêm ghi chú thành công');
  }

  /** DELETE /api/v1/admin/consultations/notes/:noteId */
  @Delete('notes/:noteId')
  @RequirePermission(PERMISSIONS.CONSULTATIONS_WRITE)
  @SwaggerDoc({
    summary: 'Admin: Xóa ghi chú nội bộ',
    bearerAuth: true,
  })
  async deleteNote(
    @Param('noteId', ParseUUIDPipe) noteId: string,
    @CurrentUser() user: any,
  ) {
    const isSuperAdmin = user?.role === 'superadmin';
    await this.service.deleteNote(noteId, user?.id, isSuperAdmin);
    return ApiResponse.noContent('Xóa ghi chú thành công');
  }

  /** DELETE /api/v1/admin/consultations/:id */
  @Delete(':id')
  @RequirePermission(PERMISSIONS.CONSULTATIONS_DELETE)
  @SwaggerDoc({
    summary: 'Admin: Xóa mềm yêu cầu tư vấn (Nghị định 13/2023)',
    bearerAuth: true,
  })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.service.delete(id);
    return ApiResponse.noContent('Xóa yêu cầu tư vấn thành công');
  }
}
