import { Module } from '@nestjs/common';
import { MailerModule } from '../../infrastructures/mailer/mailer.module';
import { UsersModule } from '../users/users.module';
import { NotificationsService } from './services/notifications.service';

@Module({
  imports: [MailerModule, UsersModule],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
