import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '../../../infrastructures/mailer/mailer.service';
import { UsersService } from '../../users/services/users.service';
import { NotificationRepository } from '../repositories/notification.repository';
import { Notification } from '../entities/notification.entity';
import { AppConfig } from '../../../config/app.config';
import { NewLeadNotificationPayload } from '../interfaces/new-lead-notification.interface';
import { generateAdminNewLeadAlertHtml } from '../templates/admin-new-lead-alert.template';
import { NotificationFeedDto } from '../dto/response/notification-feed.dto';
import { NotificationItemDto } from '../dto/response/notification-item.dto';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService,
    private readonly notificationRepo: NotificationRepository,
  ) {}

  /**
   * Lưu một bản ghi thông báo mới vào CSDL
   */
  async createNotification(data: {
    type?: string;
    title: string;
    message: string;
    link?: string | null;
    metadata?: Record<string, any> | null;
  }): Promise<Notification> {
    return this.notificationRepo.createAndSave({
      type: data.type || 'consultation',
      title: data.title,
      message: data.message,
      link: data.link ?? null,
      metadata: data.metadata ?? null,
      isRead: false,
    });
  }

  /**
   * Lấy feed thông báo mới nhất kèm số lượng chưa đọc
   */
  async getFeed(limit = 10): Promise<NotificationFeedDto> {
    const [unreadCount, entities] = await Promise.all([
      this.notificationRepo.countUnread(),
      this.notificationRepo.getFeed(limit),
    ]);

    const items: NotificationItemDto[] = entities.map((item) => ({
      id: item.id,
      type: item.type,
      title: item.title,
      message: item.message,
      link: item.link ?? null,
      isRead: item.isRead,
      metadata: item.metadata ?? null,
      createdAt: item.createdAt,
    }));

    return {
      unreadCount,
      items,
    };
  }

  /**
   * Đánh dấu đã đọc 1 thông báo cụ thể
   */
  async markAsRead(id: string): Promise<void> {
    await this.notificationRepo.markAsRead(id);
  }

  /**
   * Đánh dấu tất cả thông báo là đã đọc
   */
  async markAllAsRead(): Promise<void> {
    await this.notificationRepo.markAllAsRead();
  }

  /**
   * Tự động gửi email thông báo lead tư vấn mới cho toàn bộ Admin & Superadmin
   * Chạy nền hoàn toàn, không làm nghẽn luồng xử lý chính.
   */
  async notifyNewConsultation(payload: NewLeadNotificationPayload): Promise<void> {
    try {
      // 1. Quét danh sách email của tất cả Admin & SuperAdmin
      const adminEmails = await this.usersService.getAdminEmails();

      if (!adminEmails || adminEmails.length === 0) {
        this.logger.warn(
          `[Notifications] Không tìm thấy email của Admin/SuperAdmin nào trong CSDL để gửi thông báo lead #${payload.id}.`,
        );
        return;
      }

      // 2. Link trỏ về chi tiết lead trên Admin CMS
      const adminPortalUrl = `${AppConfig.FRONTEND_URL}/admin/consultations`;

      // 3. Render HTML template
      const htmlContent = generateAdminNewLeadAlertHtml(payload, adminPortalUrl);
      const subject = `[VẠN ÍCH CRM] Khách hàng mới gửi yêu cầu tư vấn: ${payload.fullName} - ${payload.phone}`;

      // 4. Gửi email tới danh sách admin
      await this.mailerService.send({
        to: adminEmails,
        subject,
        html: htmlContent,
      });

      this.logger.log(
        `[Notifications] Đã kích hoạt thông báo lead #${payload.id} tới ${adminEmails.length} admin (${adminEmails.join(', ')}).`,
      );
    } catch (err: any) {
      this.logger.error(
        `[Notifications] Lỗi trong quá trình gửi thông báo lead #${payload.id}: ${err.message || err}`,
      );
    }
  }
}
