import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { LawyerGroup, LawyerStatus } from './lawyer.enums';
import { LawyerTranslation } from './lawyer-translation.entity';
import { LawyerLanguage } from './lawyer-language.entity';

@Entity('lawyers')
@Index('idx_lawyers_featured_order', ['status', 'isFeatured', 'displayOrder'])
export class Lawyer extends BaseEntity {
  @Column({ name: 'team_group', type: 'enum', enum: LawyerGroup, enumName: 'lawyer_team_group', default: LawyerGroup.CHINESE_TEAM })
  teamGroup: LawyerGroup;

  @Column({ name: 'avatar_url', type: 'varchar', length: 500, nullable: true })
  avatarUrl: string | null;

  @Column({ name: 'license_number', type: 'varchar', length: 100, nullable: true })
  licenseNumber: string | null;

  @Column({ name: 'practice_start_date', type: 'date', nullable: true })
  practiceStartDate: string | null;

  @Column({ name: 'display_order', type: 'int', default: 0 })
  displayOrder: number;

  @Column({ name: 'is_featured', default: false })
  isFeatured: boolean;

  @Column({ type: 'enum', enum: LawyerStatus, enumName: 'lawyer_content_status', default: LawyerStatus.DRAFT })
  status: LawyerStatus;

  @OneToMany(() => LawyerTranslation, (translation) => translation.lawyer)
  translations: LawyerTranslation[];

  @OneToMany(() => LawyerLanguage, (language) => language.lawyer)
  languages: LawyerLanguage[];
}
