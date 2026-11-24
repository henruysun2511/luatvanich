export interface NotificationSeedItem {
  type: string;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  metadata?: Record<string, any>;
}

export const NOTIFICATIONS_SEED_DATA: NotificationSeedItem[] = [
  {
    type: 'consultation',
    title: 'Yêu cầu tư vấn mới từ Trương Vĩ',
    message: 'Công ty TNHH Quang Điện Nam Ninh yêu cầu tư vấn thành lập nhà xưởng FDI 8 triệu USD tại KCN Quế Võ.',
    link: '/admin/consultations',
    isRead: false,
    metadata: {
      clientName: 'Trương Vĩ',
      company: 'Nanning Optoelectronics',
      channel: 'wechat',
    },
  },
  {
    type: 'consultation',
    title: 'Yêu cầu tư vấn khẩn cấp từ Tập đoàn Dệt may Hào Thái',
    message: 'Khách hàng Hong Kong yêu cầu thực hiện báo cáo Due Diligence M&A nhà máy tại Hải Phòng.',
    link: '/admin/consultations',
    isRead: false,
    metadata: {
      clientName: 'Lý Quốc Hào',
      company: 'Haotai Textile Group',
      channel: 'phone',
      isUrgent: true,
    },
  },
  {
    type: 'consultation',
    title: 'Yêu cầu tranh chấp VIAC mới từ Công ty Á Châu',
    message: 'Tranh chấp hợp đồng mua bán thép quốc tế trị giá hơn 2 triệu USD cần nộp đơn khởi kiện.',
    link: '/admin/consultations',
    isRead: true,
    metadata: {
      clientName: 'Nguyễn Văn Hùng',
      channel: 'zalo',
    },
  },
  {
    type: 'system',
    title: 'Hệ thống khởi tạo dữ liệu hoàn tất',
    message: 'Chào mừng bạn đến với Hệ thống Quản trị Luật Vạn Ích. Toàn bộ dữ liệu cơ sở đã sẵn sàng.',
    link: '/admin',
    isRead: true,
  },
];
