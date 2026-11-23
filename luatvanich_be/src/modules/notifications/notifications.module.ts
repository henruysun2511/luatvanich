import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationRepository } from './repositories/notification.repository';
import { MailerModule } from '../../infrastructures/mailer/mailer.module';
import { UsersModule } from '../users/users.module';
import { NotificationsService } from './services/notifications.service';
import { NotificationsAdminController } from './controllers/notifications-admin.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    MailerModule,
    UsersModule,
  ],
  controllers: [NotificationsAdminController],
  providers: [NotificationRepository, NotificationsService],
  exports: [NotificationsService, NotificationRepository],
})
export class NotificationsModule {}
