import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectRepository(Notification)
    private readonly repo: Repository<Notification>,
  ) {}

  async createAndSave(data: Partial<Notification>): Promise<Notification> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async getFeed(limit = 10): Promise<Notification[]> {
    return this.repo.find({
      order: {
        createdAt: 'DESC',
      },
      take: limit,
    });
  }

  async countUnread(): Promise<number> {
    return this.repo.count({
      where: { isRead: false },
    });
  }

  async markAsRead(id: string): Promise<void> {
    await this.repo.update(id, { isRead: true });
  }

  async markAllAsRead(): Promise<void> {
    await this.repo.update({ isRead: false }, { isRead: true });
  }
}
