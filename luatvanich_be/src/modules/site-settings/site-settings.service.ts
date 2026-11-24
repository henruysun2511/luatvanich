import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { SiteSettingRepository } from './repositories/site-setting.repository';
import { SiteSetting } from './entities/site-setting.entity';
import { UpdateSettingsDto } from './dto/update-settings.dto';

const DEFAULT_SETTINGS: Array<Partial<SiteSetting>> = [
  // Slogan & Branding
  { key: 'brand_slogan_vi', value: 'Kết nối Việt‑Trung, đồng hành pháp lý vững chắc', group: 'branding', isPublic: true },
  { key: 'brand_slogan_zh', value: '链接中越 · 法律护航', group: 'branding', isPublic: true },
  { key: 'brand_logo_url', value: '', group: 'branding', isPublic: true },
  { key: 'brand_favicon_url', value: '', group: 'branding', isPublic: true },
  { key: 'brand_seal_char', value: '万', group: 'branding', isPublic: true },

  // Contact
  { key: 'hotline_vn', value: '0987 654 321', group: 'contact', isPublic: true },
  { key: 'hotline_cn', value: '+86 771 588 8888', group: 'contact', isPublic: true },
  { key: 'contact_person', value: '蒋女贞律师 (Luật sư Tưởng Nữ Trinh)', group: 'contact', isPublic: true },
  { key: 'hotline_mobile_cn', value: '+86 152 7702 0681', group: 'contact', isPublic: true },
  { key: 'email_contact', value: 'contact@luatvanich.vn', group: 'contact', isPublic: true },
  { key: 'address_hq', value: 'Số nhà 17, Đường 23, Khu biệt thự liền kề, KĐT Thành phố Giao Lưu, Cổ Nhuế 2, Bắc Từ Liêm, Hà Nội', group: 'contact', isPublic: true },
  { key: 'address_hq_zh', value: '河内市交流城都市区联排别墅区23路17号（公安部附近，从范文同大道右转进入）', group: 'contact', isPublic: true },
  { key: 'address_directions', value: 'Gần Bộ Công An, đi đường Phạm Văn Đồng rẽ phải vào', group: 'contact', isPublic: true },
  { key: 'license_number', value: 'Giấy phép chi nhánh tổ chức hành nghề luật sư nước ngoài tại VN do Bộ Tư pháp phê duyệt (07/2026)', group: 'contact', isPublic: true },
  { key: 'parent_firm_name', value: '广西万益律师事务所 (Hãng luật Vạn Ích Quảng Tây - thành lập 1996)', group: 'contact', isPublic: true },
  { key: 'working_hours', value: 'Thứ 2 – Thứ 6: 08:30 – 17:30 (Cả giờ Việt Nam & Trung Quốc)', group: 'contact', isPublic: true },

  // Social & Channels
  { key: 'wechat_id', value: 'VanIchLaw_VN', group: 'social', isPublic: true },
  { key: 'wechat_qr_url', value: '', group: 'social', isPublic: true },
  { key: 'zalo_url', value: 'https://zalo.me', group: 'social', isPublic: true },
  { key: 'facebook_url', value: 'https://facebook.com/luatvanich', group: 'social', isPublic: true },
  { key: 'youtube_url', value: 'https://youtube.com', group: 'social', isPublic: true },

  // Company & Stats
  { key: 'company_intro_vi', value: 'Văn phòng Luật sư Vạn Ích (Hà Nội) là chi nhánh của Công ty Luật Vạn Ích Quảng Tây (thành lập năm 1996), được Bộ Tư pháp Việt Nam cấp phép, chuyên cung cấp giải pháp pháp lý song ngữ Việt – Trung toàn diện cho doanh nghiệp và nhà đầu tư xuyên biên giới.', group: 'company', isPublic: true },
  { key: 'company_intro_zh', value: '广西万益（河内）律师事务所系经越南司法部批准设立的中国境外律师分支机构，深耕中越投资、贸易、基建、地产、矿业等赛道，为出海企业提供全周期定制化中越双语法律服务。', group: 'company', isPublic: true },
  { key: 'stat_years', value: '30年', group: 'stats', isPublic: true },
  { key: 'stat_cases', value: '4,000+', group: 'stats', isPublic: true },
  { key: 'stat_rate', value: '300+', group: 'stats', isPublic: true },
  { key: 'stat_bilingual', value: '100%', group: 'stats', isPublic: true },

  // SEO & Scripts
  { key: 'seo_meta_title', value: 'Hãng Luật Vạn Ích | 万益律师事务所 - Hành Lang Pháp Lý Việt Trung', group: 'seo', isPublic: true },
  { key: 'seo_meta_description', value: 'Tư vấn đầu tư FDI, hợp đồng song ngữ, tranh tụng trọng tài thương mại Việt - Trung trọn gói.', group: 'seo', isPublic: true },
  { key: 'script_ga_id', value: '', group: 'seo', isPublic: false },
  { key: 'script_pixel_id', value: '', group: 'seo', isPublic: false },
];

@Injectable()
export class SiteSettingsService implements OnModuleInit {
  private readonly logger = new Logger(SiteSettingsService.name);

  constructor(private readonly settingsRepo: SiteSettingRepository) {}

  async onModuleInit() {
    await this.seedDefaults();
  }

  private async seedDefaults() {
    try {
      for (const item of DEFAULT_SETTINGS) {
        if (!item.key) continue;
        const existing = await this.settingsRepo.findByKey(item.key);
        if (!existing) {
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
    const list = await this.settingsRepo.findPublic();
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
    const list = await this.settingsRepo.findAll();
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
      const existing = await this.settingsRepo.findByKey(key);
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
