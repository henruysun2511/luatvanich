import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from './entities/partner.entity';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepo: Repository<Partner>,
  ) {}

  /**
   * Lấy danh sách đối tác đang kích hoạt cho trang chủ
   */
  async getActivePartners(): Promise<Partner[]> {
    return this.partnerRepo.find({
      where: { isActive: true },
      order: { displayOrder: 'ASC', createdAt: 'DESC' },
    });
  }

  /**
   * Admin: Lấy toàn bộ danh sách đối tác
   */
  async getAll(): Promise<Partner[]> {
    return this.partnerRepo.find({
      order: { displayOrder: 'ASC', createdAt: 'DESC' },
    });
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
    const partner = await this.partnerRepo.findOne({ where: { id } });
    if (!partner) throw new NotFoundException('Không tìm thấy đối tác');
    Object.assign(partner, dto);
    return this.partnerRepo.save(partner);
  }

  /**
   * Admin: Xóa đối tác (soft delete)
   */
  async delete(id: string): Promise<void> {
    const partner = await this.partnerRepo.findOne({ where: { id } });
    if (!partner) throw new NotFoundException('Không tìm thấy đối tác');
    await this.partnerRepo.softDelete(id);
  }
}
