import { Injectable } from '@nestjs/common';
import { PartnerRepository } from './repositories/partner.repository';
import { Partner } from './entities/partner.entity';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PartnerNotFoundException } from './exceptions/partner.exception';

@Injectable()
export class PartnersService {
  constructor(private readonly partnerRepo: PartnerRepository) {}

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
