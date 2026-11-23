export interface NotificationItem {
  id: string;
  type: string;
  title: string;
  message: string;
  link?: string | null;
  isRead: boolean;
  metadata?: Record<string, any> | null;
  createdAt: string;
}

export interface NotificationFeedResponse {
  unreadCount: number;
  items: NotificationItem[];
}
