import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConsultationRequest } from '../../consultations/entities/consultation-request.entity';
import { LeadStatus } from '../../consultations/enums/lead-status.enum';
import { Post } from '../../posts/entities/post.entity';
import { PostStatus } from '../../posts/enums/post-status.enum';
import { LegalService } from '../../legal-services/entities/legal-service.entity';
import { Lawyer } from '../../lawyers/entities/lawyer.entity';
import { Office } from '../../offices/entities/office.entity';
import { ContentStatus } from '../../../common/enums/content-status.enum';
import {
  DashboardStatsResponseDto,
  ConsultationStatsDto,
  LegalServiceStatsDto,
  PostStatsDto,
  LawyerStatsDto,
  OfficeStatsDto,
} from '../dto/response/dashboard-stats.dto';
import {
  DashboardChartsResponseDto,
  TrendPointDto,
  StatusBreakdownItemDto,
  TopPracticeAreaItemDto,
  ContentSectionDistributionDto,
} from '../dto/response/dashboard-charts.dto';
import {
  DashboardRecentResponseDto,
  RecentConsultationItemDto,
  UpcomingScheduledPostItemDto,
} from '../dto/response/dashboard-recent.dto';

@Injectable()
export class DashboardRepository {
  constructor(
    @InjectRepository(ConsultationRequest)
    private readonly consultationRepo: Repository<ConsultationRequest>,
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
    @InjectRepository(LegalService)
    private readonly serviceRepo: Repository<LegalService>,
    @InjectRepository(Lawyer)
    private readonly lawyerRepo: Repository<Lawyer>,
    @InjectRepository(Office)
    private readonly officeRepo: Repository<Office>,
  ) {}

  /** Lấy các chỉ số KPI tổng quan */
  async getOverviewStats(): Promise<DashboardStatsResponseDto> {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // 1. Thống kê Consultation Requests
    const [
      totalConsultations,
      todayConsultations,
      newConsultations,
      inProgressConsultations,
      doneConsultations,
      spamConsultations,
    ] = await Promise.all([
      this.consultationRepo.count(),
      this.consultationRepo
        .createQueryBuilder('c')
        .where('c.created_at >= :startOfToday', { startOfToday })
        .getCount(),
      this.consultationRepo.count({ where: { status: LeadStatus.NEW } }),
      this.consultationRepo.count({ where: { status: LeadStatus.IN_PROGRESS } }),
      this.consultationRepo.count({ where: { status: LeadStatus.DONE } }),
      this.consultationRepo.count({ where: { status: LeadStatus.SPAM } }),
    ]);

    const consultations: ConsultationStatsDto = {
      total: totalConsultations,
      todayCount: todayConsultations,
      newCount: newConsultations,
      inProgressCount: inProgressConsultations,
      doneCount: doneConsultations,
      spamCount: spamConsultations,
    };

    // 2. Thống kê Dịch vụ pháp lý
    const [totalServices, publishedServices] = await Promise.all([
      this.serviceRepo.count(),
      this.serviceRepo.count({ where: { status: ContentStatus.PUBLISHED } }),
    ]);

    const legalServices: LegalServiceStatsDto = {
      total: totalServices,
      publishedCount: publishedServices,
    };

    // 3. Thống kê Bài viết & Lượt xem
    const [
      totalPosts,
      publishedPosts,
      scheduledPosts,
      draftPosts,
      viewsAggregate,
    ] = await Promise.all([
      this.postRepo.count(),
      this.postRepo.count({ where: { status: PostStatus.PUBLISHED } }),
      this.postRepo.count({ where: { status: PostStatus.SCHEDULED } }),
      this.postRepo.count({ where: { status: PostStatus.DRAFT } }),
      this.postRepo
        .createQueryBuilder('p')
        .select('COALESCE(SUM(p.views_count), 0)', 'totalViews')
        .getRawOne<{ totalViews: string }>(),
    ]);

    const posts: PostStatsDto = {
      total: totalPosts,
      publishedCount: publishedPosts,
      scheduledCount: scheduledPosts,
      draftCount: draftPosts,
      totalViews: Number(viewsAggregate?.totalViews || 0),
    };

    // 4. Thống kê Luật sư
    const [totalLawyers, publishedLawyers] = await Promise.all([
      this.lawyerRepo.count(),
      this.lawyerRepo.count({ where: { status: ContentStatus.PUBLISHED } }),
    ]);

    const lawyers: LawyerStatsDto = {
      total: totalLawyers,
      publishedCount: publishedLawyers,
    };

    // 5. Thống kê Văn phòng
    const [totalOffices, publishedOffices] = await Promise.all([
      this.officeRepo.count(),
      this.officeRepo.count({ where: { status: ContentStatus.PUBLISHED } }),
    ]);

    const offices: OfficeStatsDto = {
      total: totalOffices,
      publishedCount: publishedOffices,
    };

    return {
      consultations,
      legalServices,
      posts,
      lawyers,
      offices,
    };
  }

  /** Lấy dữ liệu cho 4 loại biểu đồ */
  async getChartsData(days = 14): Promise<DashboardChartsResponseDto> {
    const pad = (n: number) => String(n).padStart(2, '0');

    // 1. Biểu đồ Trend (N ngày gần nhất)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (days - 1));
    startDate.setHours(0, 0, 0, 0);

    const trendRaw = await this.consultationRepo
      .createQueryBuilder('c')
      .select("TO_CHAR(c.created_at, 'YYYY-MM-DD')", 'date')
      .addSelect('COUNT(*)', 'count')
      .where('c.created_at >= :startDate', { startDate })
      .groupBy("TO_CHAR(c.created_at, 'YYYY-MM-DD')")
      .orderBy('date', 'ASC')
      .getRawMany<{ date: string; count: string }>();

    const trendMap = new Map<string, number>();
    for (const r of trendRaw) {
      trendMap.set(r.date, Number(r.count));
    }

    const trend: TrendPointDto[] = [];
    for (let i = 0; i < days; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const key = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
      trend.push({
        date: key,
        consultationsCount: trendMap.get(key) || 0,
      });
    }

    // 2. Biểu đồ Phân bố Trạng thái Tư vấn (Donut Chart)
    const totalConsultations = await this.consultationRepo.count();
    const statusCountsRaw = await this.consultationRepo
      .createQueryBuilder('c')
      .select('c.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('c.status')
      .getRawMany<{ status: string; count: string }>();

    const statusConfig: Record<string, { label: string; color: string }> = {
      [LeadStatus.NEW]: { label: 'Mới tiếp nhận', color: '#3B82F6' }, // Blue
      [LeadStatus.IN_PROGRESS]: { label: 'Đang xử lý', color: '#F59E0B' }, // Amber
      [LeadStatus.DONE]: { label: 'Đã hoàn thành', color: '#10B981' }, // Emerald
      [LeadStatus.SPAM]: { label: 'Spam / Hủy', color: '#94A3B8' }, // Slate
    };

    const statusBreakdown: StatusBreakdownItemDto[] = Object.values(LeadStatus).map((st) => {
      const found = statusCountsRaw.find((r) => r.status === st);
      const count = found ? Number(found.count) : 0;
      const percentage = totalConsultations > 0 ? Number(((count / totalConsultations) * 100).toFixed(1)) : 0;
      return {
        status: st,
        label: statusConfig[st]?.label || st,
        count,
        percentage,
        color: statusConfig[st]?.color || '#CBD5E1',
      };
    });

    // 3. Biểu đồ Top Lĩnh vực Chuyên môn được quan tâm (Horizontal Bar Chart)
    const topAreasRaw = await this.consultationRepo
      .createQueryBuilder('c')
      .innerJoin('c.practiceArea', 'pa')
      .leftJoin(
        'pa.translations',
        'pat',
        'pat.practice_area_id = pa.id AND pat.language_code = :lang',
        { lang: 'vi' },
      )
      .select('pa.id', 'id')
      .addSelect("COALESCE(pat.name, 'Lĩnh vực chuyên môn')", 'name')
      .addSelect('COUNT(c.id)', 'count')
      .groupBy('pa.id')
      .addGroupBy('pat.name')
      .orderBy('count', 'DESC')
      .limit(5)
      .getRawMany<{ id: string; name: string; count: string }>();

    const topPracticeAreas: TopPracticeAreaItemDto[] = topAreasRaw.map((r) => ({
      id: r.id,
      name: r.name,
      count: Number(r.count),
    }));

    // 4. Biểu đồ Cơ cấu Bài viết theo Phân vùng & Song ngữ (Grouped Bar Chart)
    const contentDistRaw = await this.postRepo
      .createQueryBuilder('p')
      .innerJoin('p.category', 'cat')
      .leftJoin('p.translations', 'tVi', 'tVi.post_id = p.id AND tVi.language_code = :viLang', { viLang: 'vi' })
      .leftJoin('p.translations', 'tZh', 'tZh.post_id = p.id AND tZh.language_code = :zhLang', { zhLang: 'zh-CN' })
      .select('cat.section', 'section')
      .addSelect('COUNT(DISTINCT tVi.post_id)', 'viCount')
      .addSelect('COUNT(DISTINCT tZh.post_id)', 'zhCount')
      .groupBy('cat.section')
      .getRawMany<{ section: string; viCount: string; zhCount: string }>();

    const sectionLabels: Record<string, string> = {
      news: 'Tin tức pháp lý',
      handbook: 'Cẩm nang doanh nghiệp',
      knowledge_base: 'Cơ sở tri thức',
    };

    const contentDistribution: ContentSectionDistributionDto[] = ['news', 'handbook', 'knowledge_base'].map(
      (sec) => {
        const found = contentDistRaw.find((r) => r.section === sec);
        return {
          section: sec,
          label: sectionLabels[sec] || sec,
          viCount: found ? Number(found.viCount) : 0,
          zhCount: found ? Number(found.zhCount) : 0,
        };
      },
    );

    return {
      trend,
      statusBreakdown,
      topPracticeAreas,
      contentDistribution,
    };
  }

  /** Lấy các hoạt động và bài viết hẹn giờ gần đây */
  async getRecentActivities(): Promise<DashboardRecentResponseDto> {
    // 1. 5 yêu cầu tư vấn mới nhất
    const recentConsultationsRaw = await this.consultationRepo
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.practiceArea', 'pa')
      .leftJoinAndSelect(
        'pa.translations',
        'pat',
        'pat.practice_area_id = pa.id AND pat.language_code = :lang',
        { lang: 'vi' },
      )
      .orderBy('c.created_at', 'DESC')
      .take(5)
      .getMany();

    const recentConsultations: RecentConsultationItemDto[] = recentConsultationsRaw.map((c) => {
      const areaVi = c.practiceArea?.translations?.find((t) => t.languageCode === 'vi');
      return {
        id: c.id,
        fullName: c.fullName,
        companyName: c.companyName,
        phone: c.phone,
        status: c.status,
        practiceAreaName: areaVi?.name || null,
        createdAt: c.createdAt.toISOString(),
      };
    });

    // 2. 5 bài viết sắp xuất bản theo lịch hẹn (publishAt >= NOW(), status = scheduled)
    const now = new Date();
    const upcomingPostsRaw = await this.postRepo
      .createQueryBuilder('p')
      .innerJoinAndSelect('p.category', 'cat')
      .leftJoinAndSelect(
        'cat.translations',
        'catt',
        'catt.category_id = cat.id AND catt.language_code = :lang',
        { lang: 'vi' },
      )
      .leftJoinAndSelect('p.translations', 'pt', 'pt.post_id = p.id AND pt.language_code = :lang', { lang: 'vi' })
      .where('p.status = :status', { status: PostStatus.SCHEDULED })
      .andWhere('p.publish_at >= :now', { now })
      .orderBy('p.publish_at', 'ASC')
      .take(5)
      .getMany();

    const upcomingScheduledPosts: UpcomingScheduledPostItemDto[] = upcomingPostsRaw.map((p) => {
      const postVi = p.translations?.find((t) => t.languageCode === 'vi');
      const catVi = p.category?.translations?.find((t) => t.languageCode === 'vi');
      return {
        id: p.id,
        title: postVi?.title || 'Bài viết chưa đặt tiêu đề',
        categoryName: catVi?.name || p.category?.section || 'Chuyên mục',
        publishAt: p.publishAt ? p.publishAt.toISOString() : now.toISOString(),
      };
    });

    return {
      recentConsultations,
      upcomingScheduledPosts,
    };
  }
}
