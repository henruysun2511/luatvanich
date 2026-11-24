import { Entity, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';
import { FaqTranslation } from './faq-translation.entity';

@Entity('faqs')
export class Faq extends BaseEntity {
  @ApiProperty({ description: 'Phân loại câu hỏi (general, investment, dispute, contract)', default: 'general' })
  @Column({ length: 100, default: 'general' })
  category: string;

  @ApiProperty({ description: 'Thứ tự hiển thị', default: 0 })
  @Column({ type: 'int', default: 0, name: 'display_order' })
  displayOrder: number;

  @ApiProperty({ description: 'Trạng thái kích hoạt', default: true })
  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @OneToMany(() => FaqTranslation, (t) => t.faq, { cascade: true })
  translations: FaqTranslation[];
}
