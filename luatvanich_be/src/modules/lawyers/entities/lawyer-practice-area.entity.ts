import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Lawyer } from './lawyer.entity';
import { PracticeArea } from '../../practice-areas/entities/practice-area.entity';

/**
 * Bảng nối `lawyer_practice_areas` — Quan hệ nhiều-nhiều giữa Luật sư và Lĩnh vực chuyên môn.
 * Khóa chính kép: (lawyer_id, practice_area_id).
 */
@Entity('lawyer_practice_areas')
export class LawyerPracticeArea {
  @PrimaryColumn({ name: 'lawyer_id', type: 'uuid' })
  lawyerId: string;

  @PrimaryColumn({ name: 'practice_area_id', type: 'uuid' })
  practiceAreaId: string;

  @ManyToOne(() => Lawyer, (l) => l.practiceAreas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lawyer_id' })
  lawyer: Lawyer;

  @ManyToOne(() => PracticeArea, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'practice_area_id' })
  practiceArea: PracticeArea;

  /** Đánh dấu là mảng chuyên môn trọng tâm */
  @Column({ name: 'is_primary', default: false })
  isPrimary: boolean;

  /** Thứ tự hiển thị */
  @Column({ name: 'display_order', type: 'int', default: 0 })
  displayOrder: number;
}
