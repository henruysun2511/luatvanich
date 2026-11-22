import { Injectable } from '@nestjs/common';
import { OfficeRepository } from './repositories/office.repository';
import { OfficeTranslationRepository } from './repositories/office-translation.repository';
import { OfficeMapper } from './mapper/office.mapper';
import { CreateOfficeDto } from './dto/request/create-office.dto';
import { UpdateOfficeDto } from './dto/request/update-office.dto';
import { OfficeQueryDto } from './dto/request/office-query.dto';
import { ReorderOfficeDto } from './dto/request/reorder-office.dto';
import { OfficePublicDto } from './dto/response/office-public.dto';
import { OfficeAdminDto } from './dto/response/office-admin.dto';
import {
  OfficeNotFoundException,
  OfficeCodeAlreadyExistsException,
} from './exceptions/office.exception';
import { LangCode } from '../../common/enums/lang.enum';

@Injectable()
export class OfficesService {
  constructor(
    private readonly officeRepo: OfficeRepository,
    private readonly translationRepo: OfficeTranslationRepository,
    private readonly mapper: OfficeMapper,
  ) {}

  /**
   * Public: Lấy danh sách văn phòng đã xuất bản
   */
  async getPublicList(lang: LangCode): Promise<OfficePublicDto[]> {
    const offices = await this.officeRepo.findPublishedPublic();
    return offices.map((o) => this.mapper.toPublicResponse(o, lang));
  }

  /**
   * Public: Lấy chi tiết một văn phòng theo ID hoặc Code
   */
  async getPublicDetail(idOrCode: string, lang: LangCode): Promise<OfficePublicDto> {
    let office = await this.officeRepo.findById(idOrCode);
    if (!office) {
      office = await this.officeRepo.findByCode(idOrCode);
    }
    if (!office) {
      throw new OfficeNotFoundException(idOrCode);
    }
    return this.mapper.toPublicResponse(office, lang);
  }

  /**
   * Admin: Lấy danh sách văn phòng phân trang
   */
  async getAdminList(query: OfficeQueryDto) {
    const [items, total] = await this.officeRepo.findPaginatedAdmin(query);
    return {
      items: items.map((o) => this.mapper.toAdminResponse(o)),
      total,
      page: query.page || 1,
      limit: query.limit || 20,
    };
  }

  /**
   * Admin: Lấy chi tiết văn phòng theo ID
   */
  async getAdminDetail(id: string): Promise<OfficeAdminDto> {
    const office = await this.officeRepo.findById(id);
    if (!office) {
      throw new OfficeNotFoundException(id);
    }
    return this.mapper.toAdminResponse(office);
  }

  /**
   * Admin: Tạo mới văn phòng
   */
  async create(dto: CreateOfficeDto): Promise<OfficeAdminDto> {
    // 1. Kiểm tra mã văn phòng code đã tồn tại chưa
    const existing = await this.officeRepo.findByCode(dto.code);
    if (existing) {
      throw new OfficeCodeAlreadyExistsException(dto.code);
    }

    // 2. Tạo entity Office
    const office = this.officeRepo.create({
      code: dto.code.trim().toLowerCase(),
      phone: dto.phone,
      fax: dto.fax,
      email: dto.email,
      wechatId: dto.wechatId,
      wechatQrUrl: dto.wechatQrUrl,
      imageUrl: dto.imageUrl,
      latitude: dto.latitude,
      longitude: dto.longitude,
      mapEmbedUrl: dto.mapEmbedUrl,
      isHeadquarters: dto.isHeadquarters || false,
      displayOrder: dto.displayOrder || 0,
      status: dto.status,
    });

    const savedOffice = await this.officeRepo.save(office);

    // 3. Tạo các bản dịch (translations)
    if (dto.translations && dto.translations.length > 0) {
      for (const tDto of dto.translations) {
        await this.translationRepo.upsert({
          officeId: savedOffice.id,
          languageCode: tDto.languageCode,
          name: tDto.name,
          address: tDto.address,
          workingHours: tDto.workingHours,
          description: tDto.description,
          isComplete: tDto.isComplete !== undefined ? tDto.isComplete : false,
        });
      }
    }

    return this.getAdminDetail(savedOffice.id);
  }

  /**
   * Admin: Cập nhật thông tin văn phòng
   */
  async update(id: string, dto: UpdateOfficeDto): Promise<OfficeAdminDto> {
    const office = await this.officeRepo.findById(id);
    if (!office) {
      throw new OfficeNotFoundException(id);
    }

    // 1. Kiểm tra trùng code nếu có đổi code
    if (dto.code && dto.code.trim().toLowerCase() !== office.code) {
      const existing = await this.officeRepo.findByCode(dto.code.trim().toLowerCase());
      if (existing && existing.id !== id) {
        throw new OfficeCodeAlreadyExistsException(dto.code);
      }
      office.code = dto.code.trim().toLowerCase();
    }

    // 2. Cập nhật các trường chung
    if (dto.phone !== undefined) office.phone = dto.phone;
    if (dto.fax !== undefined) office.fax = dto.fax;
    if (dto.email !== undefined) office.email = dto.email;
    if (dto.wechatId !== undefined) office.wechatId = dto.wechatId;
    if (dto.wechatQrUrl !== undefined) office.wechatQrUrl = dto.wechatQrUrl;
    if (dto.imageUrl !== undefined) office.imageUrl = dto.imageUrl;
    if (dto.latitude !== undefined) office.latitude = dto.latitude;
    if (dto.longitude !== undefined) office.longitude = dto.longitude;
    if (dto.mapEmbedUrl !== undefined) office.mapEmbedUrl = dto.mapEmbedUrl;
    if (dto.isHeadquarters !== undefined) office.isHeadquarters = dto.isHeadquarters;
    if (dto.displayOrder !== undefined) office.displayOrder = dto.displayOrder;
    if (dto.status !== undefined) office.status = dto.status;

    await this.officeRepo.save(office);

    // 3. Cập nhật bản dịch nếu có truyền
    if (dto.translations && dto.translations.length > 0) {
      for (const tDto of dto.translations) {
        await this.translationRepo.upsert({
          officeId: id,
          languageCode: tDto.languageCode,
          name: tDto.name,
          address: tDto.address,
          workingHours: tDto.workingHours,
          description: tDto.description,
          isComplete: tDto.isComplete,
        });
      }
    }

    return this.getAdminDetail(id);
  }

  /**
   * Admin: Kéo thả đổi thứ tự
   */
  async reorder(dto: ReorderOfficeDto): Promise<void> {
    for (let index = 0; index < dto.ids.length; index++) {
      await this.officeRepo.updateOrder(dto.ids[index], index + 1);
    }
  }

  /**
   * Admin: Xóa văn phòng (soft delete)
   */
  async delete(id: string): Promise<void> {
    const office = await this.officeRepo.findById(id);
    if (!office) {
      throw new OfficeNotFoundException(id);
    }

    // TODO: Khi module Lawyers hoàn thiện, kiểm tra nếu có lawyers.office_id = id thì chặn xóa
    await this.officeRepo.softDelete(id);
  }
}
