/** Thống kê yêu cầu tư vấn */
export interface ConsultationStats {
  total: number;
  todayCount: number;
  newCount: number;
  inProgressCount: number;
  doneCount: number;
  spamCount: number;
}

/** Thống kê dịch vụ pháp lý */
export interface LegalServiceStats {
  total: number;
  publishedCount: number;
}

/** Thống kê bài viết cẩm nang */
export interface PostStats {
  total: number;
  publishedCount: number;
  scheduledCount: number;
  draftCount: number;
  totalViews: number;
}

/** Thống kê đội ngũ luật sư */
export interface LawyerStats {
  total: number;
  publishedCount: number;
}

/** Thống kê văn phòng đại diện */
export interface OfficeStats {
  total: number;
  publishedCount: number;
}

/** Dữ liệu KPI tổng quan */
export interface DashboardStats {
  consultations: ConsultationStats;
  legalServices: LegalServiceStats;
  posts: PostStats;
  lawyers: LawyerStats;
  offices: OfficeStats;
}

/** Điểm dữ liệu biểu đồ xu hướng theo ngày */
export interface TrendPoint {
  date: string;
  consultationsCount: number;
}

/** Dữ liệu phân bố trạng thái (Donut Chart) */
export interface StatusBreakdownItem {
  status: string;
  label: string;
  count: number;
  percentage: number;
  color: string;
}

/** Top lĩnh vực được quan tâm (Horizontal Bar Chart) */
export interface TopPracticeAreaItem {
  id: string;
  name: string;
  count: number;
}

/** Phân bố nội dung theo chuyên mục & song ngữ (Grouped Bar Chart) */
export interface ContentSectionDistribution {
  section: string;
  label: string;
  viCount: number;
  zhCount: number;
}

/** Toàn bộ dữ liệu 4 biểu đồ */
export interface DashboardChartsData {
  trend: TrendPoint[];
  statusBreakdown: StatusBreakdownItem[];
  topPracticeAreas: TopPracticeAreaItem[];
  contentDistribution: ContentSectionDistribution[];
}

/** 5 Yêu cầu tư vấn mới nhất */
export interface RecentConsultationItem {
  id: string;
  fullName: string;
  companyName: string | null;
  phone: string;
  status: string;
  practiceAreaName: string | null;
  createdAt: string;
}

/** 5 Bài viết sắp xuất bản theo lịch hẹn */
export interface UpcomingScheduledPostItem {
  id: string;
  title: string;
  categoryName: string;
  publishAt: string;
}

/** Dữ liệu hoạt động gần đây */
export interface DashboardRecentActivities {
  recentConsultations: RecentConsultationItem[];
  upcomingScheduledPosts: UpcomingScheduledPostItem[];
}
