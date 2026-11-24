import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteSetting } from './entities/site-setting.entity';
import { UpdateSettingsDto } from './dto/update-settings.dto';

const DEFAULT_SETTINGS: Array<Partial<SiteSetting>> = [
  // Contact
  { key: 'hotline_vn', value: '0987 654 321', group: 'contact', isPublic: true },
  { key: 'hotline_cn', value: '+86 771 588 8888', group: 'contact', isPublic: true },
  { key: 'email_contact', value: 'contact@luatvanich.vn', group: 'contact', isPublic: true },
  { key: 'address_hq', value: 'Tầng 18, Tòa nhà Charmvit, 117 Trần Duy Hưng, Cầu Giấy, Hà Nội', group: 'contact', isPublic: true },
  { key: 'working_hours', value: 'Thứ 2 – Thứ 6: 08:30 – 17:30 (Cả giờ Việt Nam & Trung Quốc)', group: 'contact', isPublic: true },

  // Social & Channels
  { key: 'wechat_id', value: 'VanIchLaw_VN', group: 'social', isPublic: true },
  { key: 'wechat_qr_url', value: '', group: 'social', isPublic: true },
  { key: 'zalo_url', value: 'https://zalo.me', group: 'social', isPublic: true },
  { key: 'facebook_url', value: 'https://facebook.com/luatvanich', group: 'social', isPublic: true },
  { key: 'youtube_url', value: 'https://youtube.com', group: 'social', isPublic: true },

  // Company & Stats
  { key: 'company_intro_vi', value: 'Hãng luật Vạn Ích (万益律师事务所) là đơn vị tiên phong cung cấp giải pháp pháp lý song ngữ Việt – Trung toàn diện cho các nhà đầu tư và doanh nghiệp FDI tại Việt Nam.', group: 'company', isPublic: true },
  { key: 'company_intro_zh', value: '万益律师事务所是专注于中越两国跨境投资、贸易与争议解决的先锋律师事务所，为在越外商投资企业提供专业合规的一站式法律服务。', group: 'company', isPublic: true },
  { key: 'stat_years', value: '10+', group: 'stats', isPublic: true },
  { key: 'stat_cases', value: '1,000+', group: 'stats', isPublic: true },
  { key: 'stat_rate', value: '98%', group: 'stats', isPublic: true },
  { key: 'stat_bilingual', value: '100%', group: 'stats', isPublic: true },

  // Branding & Theme
  { key: 'brand_logo_url', value: '', group: 'branding', isPublic: true },
  { key: 'brand_favicon_url', value: '', group: 'branding', isPublic: true },
  { key: 'brand_seal_char', value: '万', group: 'branding', isPublic: true },

  // SEO & Scripts
  { key: 'seo_meta_title', value: 'Hãng Luật Vạn Ích | 万益律师事务所 - Hành Lang Pháp Lý Việt Trung', group: 'seo', isPublic: true },
  { key: 'seo_meta_description', value: 'Tư vấn đầu tư FDI, hợp đồng song ngữ, tranh tụng trọng tài thương mại Việt - Trung trọn gói.', group: 'seo', isPublic: true },
  { key: 'script_ga_id', value: '', group: 'seo', isPublic: false },
  { key: 'script_pixel_id', value: '', group: 'seo', isPublic: false },
];

@Injectable()
export class SiteSettingsService implements OnModuleInit {
  private readonly logger = new Logger(SiteSettingsService.name);

  constructor(
    @InjectRepository(SiteSetting)
    private readonly settingsRepo: Repository<SiteSetting>,
  ) {}

  async onModuleInit() {
    await this.seedDefaults();
  }

  private async seedDefaults() {
    try {
      const count = await this.settingsRepo.count();
      if (count === 0) {
        this.logger.log('Nạp dữ liệu cấu hình mặc định (SiteSettings)...');
        for (const item of DEFAULT_SETTINGS) {
          await this.settingsRepo.save(this.settingsRepo.create(item));
        }
      }
    } catch (e) {
      this.logger.error('Lỗi khi nạp dữ liệu cấu hình mặc định:', e);
    }
  }

  /**
   * Lấy cấu hình công khai phục vụ Frontend
   */
  async getPublicSettings(): Promise<Record<string, string>> {
    const list = await this.settingsRepo.find({ where: { isPublic: true } });
    const result: Record<string, string> = {};
    for (const item of list) {
      result[item.key] = item.value || '';
    }
    return result;
  }

  /**
   * Lấy toàn bộ cấu hình theo nhóm (Admin)
   */
  async getAllSettings(): Promise<Record<string, Record<string, string>>> {
    const list = await this.settingsRepo.find();
    const result: Record<string, Record<string, string>> = {};
    for (const item of list) {
      if (!result[item.group]) {
        result[item.group] = {};
      }
      result[item.group][item.key] = item.value || '';
    }
    return result;
  }

  /**
   * Cập nhật hàng loạt cấu hình
   */
  async updateSettings(dto: UpdateSettingsDto): Promise<void> {
    const keys = Object.keys(dto.settings);
    for (const key of keys) {
      const val = dto.settings[key];
      const existing = await this.settingsRepo.findOne({ where: { key } });
      if (existing) {
        existing.value = val;
        if (dto.group) existing.group = dto.group;
        await this.settingsRepo.save(existing);
      } else {
        await this.settingsRepo.save(
          this.settingsRepo.create({
            key,
            value: val,
            group: dto.group || 'general',
            isPublic: !key.startsWith('script_'),
          }),
        );
      }
    }
  }
}
