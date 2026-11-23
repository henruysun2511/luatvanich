import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notificationsService } from '../services/notifications.service';
import { useAuthStore } from '@/features/auth/store/useAuthStore';

export const notificationsKeys = {
  all: ['notifications'] as const,
  feed: (limit?: number) => [...notificationsKeys.all, 'feed', limit] as const,
};

/** Hook lấy feed thông báo tự động polling mỗi 30s khi user authenticated */
export const useAdminNotificationFeed = (limit = 10) => {
  const status = useAuthStore((s) => s.status);

  return useQuery({
    queryKey: notificationsKeys.feed(limit),
    queryFn: () => notificationsService.getFeed(limit),
    enabled: status === 'authenticated',
    refetchInterval: 30000, // Polling ngầm định kỳ mỗi 30 giây
    refetchIntervalInBackground: false,
    staleTime: 10000,
  });
};

/** Hook đánh dấu 1 thông báo là đã đọc */
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationsService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.all });
    },
  });
};

/** Hook đánh dấu tất cả thông báo là đã đọc */
export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationsService.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.all });
    },
  });
};
