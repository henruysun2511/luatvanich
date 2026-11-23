import { apiClient } from '@/lib/axios';
import type { NotificationFeedResponse } from '../types/notifications.types';

export const notificationsService = {
  /** Lấy danh sách feed thông báo kèm số lượng chưa đọc */
  getFeed: async (limit = 10): Promise<NotificationFeedResponse> => {
    const res = await apiClient.get<{ success: boolean; data: NotificationFeedResponse }>(
      '/v1/admin/notifications',
      { params: { limit } },
    );
    return res.data.data;
  },

  /** Đánh dấu 1 thông báo là đã đọc */
  markAsRead: async (id: string): Promise<void> => {
    await apiClient.patch(`/v1/admin/notifications/${id}/read`);
  },

  /** Đánh dấu tất cả thông báo là đã đọc */
  markAllAsRead: async (): Promise<void> => {
    await apiClient.patch('/v1/admin/notifications/read-all');
  },
};
