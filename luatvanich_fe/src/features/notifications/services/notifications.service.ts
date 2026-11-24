import { apiClient } from '@/lib/axios';
import type { NotificationFeedResponse } from '../types/notifications.types';

const NOTIFICATIONS_ADMIN_URL = '/admin/notifications';

export const notificationsService = {
  /** Lấy danh sách feed thông báo kèm số lượng chưa đọc */
  getFeed: async (limit = 10): Promise<NotificationFeedResponse> => {
    const res = await apiClient.get<{ success: boolean; data: NotificationFeedResponse }>(
      NOTIFICATIONS_ADMIN_URL,
      { params: { limit } },
    );
    return res.data.data;
  },

  /** Đánh dấu 1 thông báo là đã đọc */
  markAsRead: async (id: string): Promise<void> => {
    await apiClient.patch(`${NOTIFICATIONS_ADMIN_URL}/${id}/read`);
  },

  /** Đánh dấu tất cả thông báo là đã đọc */
  markAllAsRead: async (): Promise<void> => {
    await apiClient.patch(`${NOTIFICATIONS_ADMIN_URL}/read-all`);
  },
};
