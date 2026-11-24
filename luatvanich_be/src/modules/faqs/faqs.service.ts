import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq } from './entities/faq.entity';
import { FaqTranslation } from './entities/faq-translation.entity';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqsService {
  constructor(
    @InjectRepository(Faq)
    private readonly faqRepo: Repository<Faq>,
    @InjectRepository(FaqTranslation)
    private readonly transRepo: Repository<FaqTranslation>,
  ) {}

  /**
   * Lấy danh sách câu hỏi đang kích hoạt
   */
  async getPublicFaqs(lang = 'vi'): Promise<any[]> {
    const list = await this.faqRepo.find({
      where: { isActive: true },
      relations: ['translations'],
      order: { displayOrder: 'ASC', createdAt: 'DESC' },
    });

    return list.map((item) => {
      const trans =
        item.translations.find((t) => t.languageCode === lang) ||
        item.translations.find((t) => t.languageCode === 'vi') ||
        item.translations[0];
      return {
        id: item.id,
        category: item.category,
        displayOrder: item.displayOrder,
        question: trans ? trans.question : '',
        answer: trans ? trans.answer : '',
      };
    });
  }

  /**
   * Admin: Lấy danh sách toàn bộ kèm bản dịch
   */
  async getAll(): Promise<Faq[]> {
    return this.faqRepo.find({
      relations: ['translations'],
      order: { displayOrder: 'ASC', createdAt: 'DESC' },
    });
  }

  /**
   * Admin: Tạo mới câu hỏi
   */
  async create(dto: CreateFaqDto): Promise<Faq> {
    const faq = this.faqRepo.create({
      category: dto.category || 'general',
      displayOrder: dto.displayOrder || 0,
      isActive: dto.isActive !== undefined ? dto.isActive : true,
    });
    const saved = await this.faqRepo.save(faq);

    if (dto.translations && dto.translations.length > 0) {
      const translations = dto.translations.map((t) =>
        this.transRepo.create({
          faqId: saved.id,
          languageCode: t.languageCode,
          question: t.question,
          answer: t.answer,
          isComplete: t.isComplete !== undefined ? t.isComplete : true,
        }),
      );
      await this.transRepo.save(translations);
    }

    return this.faqRepo.findOne({
      where: { id: saved.id },
      relations: ['translations'],
    }) as Promise<Faq>;
  }

  /**
   * Admin: Cập nhật câu hỏi & bản dịch
   */
  async update(id: string, dto: UpdateFaqDto): Promise<Faq> {
    const faq = await this.faqRepo.findOne({
      where: { id },
      relations: ['translations'],
    });
    if (!faq) throw new NotFoundException('Không tìm thấy câu hỏi FAQ');

    if (dto.category !== undefined) faq.category = dto.category;
    if (dto.displayOrder !== undefined) faq.displayOrder = dto.displayOrder;
    if (dto.isActive !== undefined) faq.isActive = dto.isActive;
    await this.faqRepo.save(faq);

    if (dto.translations && dto.translations.length > 0) {
      for (const t of dto.translations) {
        let existing = faq.translations.find((ext) => ext.languageCode === t.languageCode);
        if (existing) {
          existing.question = t.question;
          existing.answer = t.answer;
          if (t.isComplete !== undefined) existing.isComplete = t.isComplete;
          await this.transRepo.save(existing);
        } else {
          const newTrans = this.transRepo.create({
            faqId: faq.id,
            languageCode: t.languageCode,
            question: t.question,
            answer: t.answer,
            isComplete: t.isComplete !== undefined ? t.isComplete : true,
          });
          await this.transRepo.save(newTrans);
        }
      }
    }

    return this.faqRepo.findOne({
      where: { id },
      relations: ['translations'],
    }) as Promise<Faq>;
  }

  /**
   * Admin: Xóa câu hỏi (soft delete)
   */
  async delete(id: string): Promise<void> {
    const faq = await this.faqRepo.findOne({ where: { id } });
    if (!faq) throw new NotFoundException('Không tìm thấy câu hỏi FAQ');
    await this.faqRepo.softDelete(id);
  }
}
