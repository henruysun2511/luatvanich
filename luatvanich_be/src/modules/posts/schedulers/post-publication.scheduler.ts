import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PostRepository } from '../repositories/post.repository';

/**
 * Quản lý tác vụ định kỳ tự động xuất bản bài viết theo lịch hẹn.
 * Chạy định kỳ mỗi phút một lần.
 */
@Injectable()
export class PostPublicationScheduler {
  private readonly logger = new Logger(PostPublicationScheduler.name);

  constructor(private readonly postRepository: PostRepository) {}

  /**
   * Quét và xuất bản các bài viết ở trạng thái SCHEDULED có publishAt <= thời điểm hiện tại.
   * Lịch chạy: Mỗi phút vào giây 00 (0 * * * * *).
   */
  @Cron(CronExpression.EVERY_MINUTE)
  async handlePublishDuePosts() {
    try {
      const now = new Date();
      const result = await this.postRepository.publishDue(now);
      const affected = result?.affected ?? 0;

      if (affected > 0) {
        this.logger.log(`[Cron] Đã tự động xuất bản ${affected} bài viết đến lịch hẹn lúc ${now.toISOString()}`);
      }
    } catch (error: unknown) {
      this.logger.error(
        'Lỗi khi thực thi Cron xuất bản bài viết đến lịch hẹn',
        error instanceof Error ? error.stack : undefined,
      );
    }
  }
}
