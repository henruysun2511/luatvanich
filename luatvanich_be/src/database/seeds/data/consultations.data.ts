import { ContactChannel } from '../../../modules/consultations/enums/contact-channel.enum';
import { LeadStatus } from '../../../modules/consultations/enums/lead-status.enum';

export interface ConsultationSeedItem {
  fullName: string;
  companyName?: string;
  phone: string;
  email?: string;
  contactChannel: ContactChannel;
  contactChannelId?: string;
  preferredContactTime?: string;
  practiceAreaCode?: string;
  lawyerSlugKey?: string;
  title: string;
  content: string;
  status: LeadStatus;
  notes?: {
    note: string;
  }[];
}

export const CONSULTATIONS_SEED_DATA: ConsultationSeedItem[] = [
  {
    fullName: 'Trương Vĩ (Zhang Wei - 张伟)',
    companyName: 'Công ty TNHH Quang Điện Nam Ninh (Nanning Optoelectronics Co., Ltd)',
    phone: '+84 988 123 456',
    email: 'zhangwei@nn-opto.cn',
    contactChannel: ContactChannel.WECHAT,
    contactChannelId: 'zhangwei_nn',
    preferredContactTime: 'Buổi sáng (09:00 - 11:30)',
    practiceAreaCode: 'FDI',
    lawyerSlugKey: 'ling-chen',
    title: 'Tư vấn xin cấp Giấy chứng nhận đầu tư IRC và thuê 2 hecta đất tại KCN Quế Võ',
    content: 'Chúng tôi là doanh nghiệp sản xuất linh kiện quang điện tử tại Nam Ninh, dự kiến chuyển dịch một phần dây chuyền sản xuất sang Bắc Ninh với tổng vốn đầu tư ban đầu 8 triệu USD. Cần luật sư tư vấn cơ cấu tỷ lệ vốn, thẩm định hợp đồng thuê lại đất KCN và trọn gói thủ tục IRC, ERC.',
    status: LeadStatus.IN_PROGRESS,
    notes: [
      {
        note: 'Đã trao đổi qua WeChat ngày 20/11/2026. Khách hàng đã gửi bản sao Giấy phép kinh doanh mẹ để soát xét hồ sơ.',
      },
    ],
  },
  {
    fullName: 'Lý Quốc Hào (Li Guohao - 李国豪)',
    companyName: 'Tập đoàn Dệt may Hào Thái (Hong Kong Haotai Textile Group)',
    phone: '+852 9123 8888',
    email: 'gh.li@haotai-tex.hk',
    contactChannel: ContactChannel.PHONE,
    preferredContactTime: 'Bất kỳ lúc nào (Urgent)',
    practiceAreaCode: 'MA',
    lawyerSlugKey: 'ling-chen',
    title: 'Thẩm định pháp lý Legal Due Diligence phục vụ thương vụ M&A nhà máy dệt may',
    content: 'Bên mua chuẩn bị ký hợp đồng nguyên tắc mua lại toàn bộ nhà máy sợi tại KCN Đình Vũ, Hải Phòng với giá trị giao dịch ước tính 15 triệu USD. Cần Luật Vạn Ích thực hiện báo cáo Due Diligence khẩn cấp trong vòng 10 ngày làm việc.',
    status: LeadStatus.IN_PROGRESS,
    notes: [
      {
        note: 'Đã xếp lịch họp trực tiếp tại Văn phòng Hà Nội vào 14:00 Thứ 5 tuần này cùng Luật sư Lăng Thần.',
      },
    ],
  },
  {
    fullName: 'Nguyễn Văn Hùng',
    companyName: 'Công ty Cổ phần Thương mại Quốc tế Á Châu',
    phone: '+84 903 666 888',
    email: 'hung.nguyen@achau-trade.vn',
    contactChannel: ContactChannel.ZALO,
    preferredContactTime: 'Chiều sau 14:00',
    practiceAreaCode: 'DISPUTE',
    lawyerSlugKey: 'le-chi-chinh',
    title: 'Đại diện nguyên đơn khởi kiện đối tác vi phạm hợp đồng giao nhận hàng hóa tại VIAC',
    content: 'Chúng tôi ký hợp đồng nhập khẩu 5000 tấn thép cuộn từ đối tác Quảng Tây nhưng phía đối tác giao hàng chậm 4 tháng và chất lượng không đúng chứng chỉ CO/CQ. Đã tiến hành đàm phán nhưng không có kết quả, cần hỗ trợ nộp đơn khởi kiện lên VIAC.',
    status: LeadStatus.NEW,
  },
  {
    fullName: 'Vương Lệ Quyên (Wang Lijuan - 王丽娟)',
    companyName: 'Công ty TNHH Thiết bị Năng lượng Tân Nguyên',
    phone: '+86 138 0013 8000',
    email: 'wanglj@xinyuan-energy.cn',
    contactChannel: ContactChannel.WECHAT,
    contactChannelId: 'xinyuan_wang',
    practiceAreaCode: 'LABOR',
    lawyerSlugKey: 'liu-ai',
    title: 'Tư vấn xin phê duyệt vị trí lao động nước ngoài và Work Permit cho đoàn kỹ sư',
    content: 'Công ty vừa trúng thầu dự án điện mặt trời mái nhà công nghiệp, cần cử 12 chuyên gia kỹ thuật sang Việt Nam công tác trong thời hạn 2 năm. Cần hướng dẫn hồ sơ kinh nghiệm và thủ tục cấp phép nhanh.',
    status: LeadStatus.DONE,
    notes: [
      {
        note: 'Đã bàn giao đầy đủ 12 Giấy phép lao động và Thẻ tạm trú 2 năm. Khách hàng hài lòng và dự kiến ký hợp đồng tư vấn thường xuyên.',
      },
    ],
  },
  {
    fullName: 'Trần Minh Đức',
    companyName: 'Công ty TNHH Đầu tư Logistics Sao Vàng',
    phone: '+84 918 333 999',
    email: 'duc.tran@saovang-logistics.vn',
    contactChannel: ContactChannel.PHONE,
    practiceAreaCode: 'REALESTATE',
    title: 'Thủ tục xin cấp phép xây dựng kho bãi ngoại quan tại Cửa khẩu Hữu Nghị',
    content: 'Doanh nghiệp đang chuẩn bị đầu tư trung tâm logistics 5ha tại Lạng Sơn để phục vụ thông quan hàng nông sản sang Trung Quốc, cần tư vấn thủ tục thẩm duyệt PCCC và cấp phép xây dựng.',
    status: LeadStatus.NEW,
  },
];
