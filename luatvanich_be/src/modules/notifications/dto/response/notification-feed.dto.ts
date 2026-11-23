import { ApiProperty } from '@nestjs/swagger';
import { NotificationItemDto } from './notification-item.dto';

export class NotificationFeedDto {
  @ApiProperty({ description: 'Số lượng thông báo chưa đọc', example: 3 })
  unreadCount: number;

  @ApiProperty({ description: 'Danh sách các thông báo mới nhất', type: [NotificationItemDto] })
  items: NotificationItemDto[];
}
