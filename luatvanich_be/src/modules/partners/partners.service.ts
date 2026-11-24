import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PartnerRepository } from './repositories/partner.repository';
import { Partner } from './entities/partner.entity';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PartnerNotFoundException } from './exceptions/partner.exception';

const SEED_PARTNERS = [
  {
    name: 'Công ty TNHH Lốp xe Tiền Tiến Việt Nam (贵州前进轮胎 / Guizhou Tyre)',
    logoUrl: 'https://placehold.co/240x80/white/06122b?text=GUIZHOU+TYRE',
    websiteUrl: 'http://www.gztyre.com',
    displayOrder: 1,
    isActive: true,
  },
  {
    name: 'Công ty TNHH Công nghệ Max Ninh Ba (宁波摩克斯科技 / MKS Tech)',
    logoUrl: 'https://placehold.co/240x80/white/06122b?text=MKS+TECH',
    websiteUrl: '',
    displayOrder: 2,
    isActive: true,
  },
  {
    name: 'Công ty TNHH Kim khí Chính xác Lực Tuấn (赣州力俊精密)',
    logoUrl: 'https://placehold.co/240x80/white/06122b?text=LIJUN+PRECISION',
    websiteUrl: '',
    displayOrder: 3,
    isActive: true,
  },
  {
    name: 'Công ty TNHH Sinh học Kim Vũ (金宇生物 / Jinyu Bio - Hong Kong)',
    logoUrl: 'https://placehold.co/240x80/white/06122b?text=JINYU+BIO',
    websiteUrl: 'http://www.jinyu.com.cn',
    displayOrder: 4,
    isActive: true,
  },
  {
    name: 'Công ty TNHH XNK ZMX Hong Kong (香港ZMX进出口贸易)',
    logoUrl: 'https://placehold.co/240x80/white/06122b?text=ZMX+TRADING',
    websiteUrl: '',
    displayOrder: 5,
    isActive: true,
  },
];

@Injectable()
export class PartnersService implements OnModuleInit {
  private readonly logger = new Logger(PartnersService.name);

  constructor(private readonly partnerRepo: PartnerRepository) {}

  async onModuleInit() {
    await this.seedDefaults();
  }

  private async seedDefaults() {
    try {
      const count = await this.partnerRepo.count();
      if (count === 0) {
        this.logger.log('Nạp danh sách đối tác & khách hàng doanh nghiệp FDI mẫu từ hồ sơ năng lực...');
        for (const p of SEED_PARTNERS) {
          await this.partnerRepo.save(this.partnerRepo.create(p));
        }
      }
    } catch (e) {
      this.logger.error('Lỗi khi nạp dữ liệu đối tác mẫu:', e);
    }
  }

  /**
   * Lấy danh sách đối tác đang kích hoạt cho trang chủ
   */
  async getActivePartners(): Promise<Partner[]> {
    return this.partnerRepo.findAllActive();
  }

  /**
   * Admin: Lấy toàn bộ danh sách đối tác
   */
  async getAll(): Promise<Partner[]> {
    return this.partnerRepo.findAll();
  }

  /**
   * Admin: Tạo mới đối tác
   */
  async create(dto: CreatePartnerDto): Promise<Partner> {
    const partner = this.partnerRepo.create(dto);
    return this.partnerRepo.save(partner);
  }

  /**
   * Admin: Cập nhật đối tác
   */
  async update(id: string, dto: UpdatePartnerDto): Promise<Partner> {
    const partner = await this.partnerRepo.findById(id);
    if (!partner) throw new PartnerNotFoundException(id);
    Object.assign(partner, dto);
    return this.partnerRepo.save(partner);
  }

  /**
   * Admin: Xóa đối tác (soft delete)
   */
  async delete(id: string): Promise<void> {
    const partner = await this.partnerRepo.findById(id);
    if (!partner) throw new PartnerNotFoundException(id);
    await this.partnerRepo.softDelete(id);
  }
}
