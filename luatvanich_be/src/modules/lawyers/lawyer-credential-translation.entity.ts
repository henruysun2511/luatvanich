import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { LangCode } from '../../common/enums/lang.enum';
import { LawyerCredential } from './lawyer-credential.entity';

@Entity('lawyer_credential_translations')
export class LawyerCredentialTranslation {
  @PrimaryColumn({ name: 'credential_id', type: 'uuid' })
  credentialId: string;

  @ManyToOne(() => LawyerCredential, (credential) => credential.translations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'credential_id', foreignKeyConstraintName: 'fk_lawyer_credential_translation_credential' })
  credential: LawyerCredential;

  @PrimaryColumn({ name: 'language_code', type: 'varchar', length: 10 })
  languageCode: LangCode;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  institution: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;
}
