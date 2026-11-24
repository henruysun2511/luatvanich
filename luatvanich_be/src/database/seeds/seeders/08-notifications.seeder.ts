import { DataSource } from 'typeorm';
import { Notification } from '../../../modules/notifications/entities/notification.entity';
import { NOTIFICATIONS_SEED_DATA } from '../data/notifications.data';

export async function seedNotifications(dataSource: DataSource): Promise<void> {
  console.log('  📌 [8/8] Bắt đầu seed Thông báo mẫu (Notifications)...');
  const notifRepo = dataSource.getRepository(Notification);

  for (const item of NOTIFICATIONS_SEED_DATA) {
    const exist = await notifRepo.findOne({
      where: { title: item.title, type: item.type },
    });
    if (!exist) {
      const notif = notifRepo.create({
        type: item.type,
        title: item.title,
        message: item.message,
        link: item.link,
        isRead: item.isRead,
        metadata: item.metadata,
      });
      await notifRepo.save(notif);
      console.log(`    + Đã tạo thông báo: ${item.title}`);
    }
  }
}
