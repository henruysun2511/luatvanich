import { Controller, Get, Post, Patch, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RequirePermission } from '../../../common/decorators/require-permission.decorator';
import { PERMISSIONS } from '../../../common/constants/permission.constant';
import { ApiResponse } from '../../../common/response/api-response';
import { FaqsService } from '../faqs.service';
import { CreateFaqDto } from '../dto/create-faq.dto';
import { UpdateFaqDto } from '../dto/update-faq.dto';

@ApiTags('FAQs (Admin)')
@ApiBearerAuth()
@Controller({ path: 'admin/faqs', version: '1' })
export class FaqsAdminController {
  constructor(private readonly service: FaqsService) {}

  @Get()
  @RequirePermission(PERMISSIONS.SETTINGS_READ)
  @ApiOperation({ summary: 'Lấy toàn bộ danh sách FAQs kèm bản dịch' })
  async getAll() {
    const data = await this.service.getAll();
    return ApiResponse.success(data);
  }

  @Post()
  @RequirePermission(PERMISSIONS.SETTINGS_WRITE)
  @ApiOperation({ summary: 'Tạo mới câu hỏi FAQ song ngữ' })
  async create(@Body() dto: CreateFaqDto) {
    const data = await this.service.create(dto);
    return ApiResponse.created(data, 'Tạo câu hỏi thành công');
  }

  @Patch(':id')
  @RequirePermission(PERMISSIONS.SETTINGS_WRITE)
  @ApiOperation({ summary: 'Cập nhật câu hỏi FAQ song ngữ' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateFaqDto,
  ) {
    const data = await this.service.update(id, dto);
    return ApiResponse.success(data, 'Cập nhật câu hỏi thành công');
  }

  @Delete(':id')
  @RequirePermission(PERMISSIONS.SETTINGS_WRITE)
  @ApiOperation({ summary: 'Xóa câu hỏi FAQ' })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.service.delete(id);
    return ApiResponse.noContent('Xóa câu hỏi thành công');
  }
}
