import { Injectable } from '@nestjs/common';
import { FaqRepository } from './repositories/faq.repository';
import { FaqTranslationRepository } from './repositories/faq-translation.repository';
import { Faq } from './entities/faq.entity';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { FaqNotFoundException } from './exceptions/faq.exception';

@Injectable()
export class FaqsService {
  constructor(
    private readonly faqRepo: FaqRepository,
    private readonly transRepo: FaqTranslationRepository,
  ) {}

  /**
   * Lấy danh sách câu hỏi đang kích hoạt
   */
  async getPublicFaqs(lang = 'vi'): Promise<any[]> {
    const list = await this.faqRepo.findAllActive();

    return list.map((item) => {
      const trans =
        item.translations?.find((t) => t.languageCode === lang) ||
        item.translations?.find((t) => t.languageCode === 'vi') ||
        item.translations?.[0];
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
    return this.faqRepo.findAll();
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
      await this.transRepo.saveMany(translations);
    }

    return (await this.faqRepo.findById(saved.id)) as Faq;
  }

  /**
   * Admin: Cập nhật câu hỏi & bản dịch
   */
  async update(id: string, dto: UpdateFaqDto): Promise<Faq> {
    const faq = await this.faqRepo.findById(id);
    if (!faq) throw new FaqNotFoundException(id);

    if (dto.category !== undefined) faq.category = dto.category;
    if (dto.displayOrder !== undefined) faq.displayOrder = dto.displayOrder;
    if (dto.isActive !== undefined) faq.isActive = dto.isActive;
    await this.faqRepo.save(faq);

    if (dto.translations && dto.translations.length > 0) {
      for (const t of dto.translations) {
        let existing = faq.translations?.find((ext) => ext.languageCode === t.languageCode);
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

    return (await this.faqRepo.findById(id)) as Faq;
  }

  /**
   * Admin: Xóa câu hỏi (soft delete)
   */
  async delete(id: string): Promise<void> {
    const faq = await this.faqRepo.findById(id);
    if (!faq) throw new FaqNotFoundException(id);
    await this.faqRepo.softDelete(id);
  }
}
