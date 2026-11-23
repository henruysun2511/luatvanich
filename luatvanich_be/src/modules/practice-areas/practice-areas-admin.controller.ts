import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PERMISSIONS } from '../../common/constants/permission.constant';
import { RequirePermission } from '../../common/decorators/require-permission.decorator';
import { ApiResponse } from '../../common/response/api-response';
import { SwaggerDoc } from '../../common/swagger/swagger-doc';
import { CreatePracticeAreaDto } from './dto/request/create-practice-area.dto';
import { PracticeAreaQueryDto } from './dto/request/practice-area-query.dto';
import { ReorderPracticeAreaDto } from './dto/request/reorder-practice-area.dto';
import { UpdatePracticeAreaDto } from './dto/request/update-practice-area.dto';
import { PracticeAreaAdminDto } from './dto/response/practice-area-admin.dto';
import { PRACTICE_AREA_ADMIN_ROUTE } from './practice-areas.constant';
import { PracticeAreasService } from './practice-areas.service';

@ApiTags('Practice Areas (Admin)')
@Controller({ path: PRACTICE_AREA_ADMIN_ROUTE, version: '1' })
export class PracticeAreasAdminController {
  constructor(private readonly service: PracticeAreasService) {}

  /**
   * GET /api/v1/admin/practice-areas
   * Danh sách lĩnh vực quản trị (phân trang, lọc status, isFeatured, tìm kiếm)
   */
  @Get()
  @RequirePermission(PERMISSIONS.SERVICES_READ)
  @SwaggerDoc({
    summary: 'Danh sách lĩnh vực quản trị',
    responseType: PracticeAreaAdminDto,
    isArray: true,
    bearerAuth: true,
  })
  async findAll(@Query() query: PracticeAreaQueryDto) {
    const data = await this.service.findAllAdmin(query);
    return ApiResponse.success(data, 'Lấy danh sách lĩnh vực quản trị thành công');
  }

  /**
   * POST /api/v1/admin/practice-areas
   * Tạo mới lĩnh vực chuyên môn kèm bản dịch song ngữ
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @RequirePermission(PERMISSIONS.SERVICES_WRITE)
  @SwaggerDoc({
    summary: 'Tạo mới lĩnh vực chuyên môn',
    bodyType: CreatePracticeAreaDto,
    responseType: PracticeAreaAdminDto,
    status: 201,
    bearerAuth: true,
  })
  async create(@Body() dto: CreatePracticeAreaDto) {
    const data = await this.service.create(dto);
    return ApiResponse.created(data, 'Tạo mới lĩnh vực chuyên môn thành công');
  }

  /**
   * GET /api/v1/admin/practice-areas/:id
   * Chi tiết lĩnh vực quản trị (bao gồm tất cả bản dịch song ngữ)
   */
  @Get(':id')
  @RequirePermission(PERMISSIONS.SERVICES_READ)
  @SwaggerDoc({
    summary: 'Chi tiết lĩnh vực quản trị',
    responseType: PracticeAreaAdminDto,
    bearerAuth: true,
  })
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.service.findByIdAdmin(id);
    return ApiResponse.success(data, 'Lấy chi tiết lĩnh vực chuyên môn thành công');
  }

  /**
   * PATCH /api/v1/admin/practice-areas/reorder
   * Kéo thả sắp xếp lại thứ tự hiển thị của các lĩnh vực
   */
  @Patch('reorder')
  @HttpCode(HttpStatus.OK)
  @RequirePermission(PERMISSIONS.SERVICES_WRITE)
  @SwaggerDoc({
    summary: 'Đổi thứ tự hiển thị các lĩnh vực',
    bodyType: ReorderPracticeAreaDto,
    bearerAuth: true,
  })
  async reorder(@Body() dto: ReorderPracticeAreaDto) {
    await this.service.reorder(dto);
    return ApiResponse.success(null, 'Cập nhật thứ tự hiển thị thành công');
  }

  /**
   * PATCH /api/v1/admin/practice-areas/:id
   * Cập nhật thông tin lĩnh vực và bản dịch
   */
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @RequirePermission(PERMISSIONS.SERVICES_WRITE)
  @SwaggerDoc({
    summary: 'Cập nhật lĩnh vực và bản dịch',
    bodyType: UpdatePracticeAreaDto,
    responseType: PracticeAreaAdminDto,
    bearerAuth: true,
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePracticeAreaDto,
  ) {
    const data = await this.service.update(id, dto);
    return ApiResponse.success(data, 'Cập nhật lĩnh vực chuyên môn thành công');
  }

  /**
   * DELETE /api/v1/admin/practice-areas/:id
   * Xóa mềm lĩnh vực chuyên môn (chặn xóa nếu còn dịch vụ hoặc luật sư)
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @RequirePermission(PERMISSIONS.SERVICES_DELETE)
  @SwaggerDoc({ summary: 'Xóa mềm lĩnh vực chuyên môn', bearerAuth: true })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.service.delete(id);
    return ApiResponse.noContent('Xóa lĩnh vực chuyên môn thành công');
  }
}
