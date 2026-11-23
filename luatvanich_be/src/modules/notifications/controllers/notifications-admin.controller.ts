import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequirePermission } from '../../../common/decorators/require-permission.decorator';
import { PERMISSIONS } from '../../../common/constants/permission.constant';
import { SwaggerDoc } from '../../../common/swagger/swagger-doc';
import { ApiResponse } from '../../../common/response/api-response';
import { NotificationsService } from '../services/notifications.service';
import { NotificationFeedDto } from '../dto/response/notification-feed.dto';

@ApiTags('Notifications (Admin)')
@Controller({ path: 'admin/notifications', version: '1' })
export class NotificationsAdminController {
  constructor(private readonly notificationsService: NotificationsService) {}

  /** GET /api/v1/admin/notifications */
  @Get()
  @RequirePermission(PERMISSIONS.SERVICES_READ)
  @SwaggerDoc({
    summary: 'Admin: Lấy danh sách feed thông báo & số lượng chưa đọc',
    responseType: NotificationFeedDto,
    bearerAuth: true,
  })
  async getFeed(@Query('limit') limit?: number) {
    const data = await this.notificationsService.getFeed(limit ? Number(limit) : 10);
    return ApiResponse.success(data, 'Lấy danh sách thông báo thành công');
  }

  /** PATCH /api/v1/admin/notifications/:id/read */
  @Patch(':id/read')
  @HttpCode(HttpStatus.OK)
  @RequirePermission(PERMISSIONS.SERVICES_READ)
  @SwaggerDoc({
    summary: 'Admin: Đánh dấu 1 thông báo là đã đọc',
    bearerAuth: true,
  })
  async markAsRead(@Param('id', ParseUUIDPipe) id: string) {
    await this.notificationsService.markAsRead(id);
    return ApiResponse.success(null, 'Đã đánh dấu thông báo là đã đọc');
  }

  /** PATCH /api/v1/admin/notifications/read-all */
  @Patch('read-all')
  @HttpCode(HttpStatus.OK)
  @RequirePermission(PERMISSIONS.SERVICES_READ)
  @SwaggerDoc({
    summary: 'Admin: Đánh dấu tất cả thông báo là đã đọc',
    bearerAuth: true,
  })
  async markAllAsRead() {
    await this.notificationsService.markAllAsRead();
    return ApiResponse.success(null, 'Đã đánh dấu tất cả thông báo là đã đọc');
  }
}
