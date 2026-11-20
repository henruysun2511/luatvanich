import { Column, Entity, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('refresh_tokens')
export class RefreshToken extends BaseEntity {
  @Column({ name: 'token_hash', unique: true })
  tokenHash: string;

  @Column({ name: 'user_id', type: 'uuid' })
  @Index('idx_refresh_tokens_user_id')
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'expires_at', type: 'timestamptz' })
  expiresAt: Date;

  @Column({ name: 'user_agent', nullable: true })
  userAgent?: string;

  @Column({ name: 'ip_address', type: 'inet', nullable: true })
  ipAddress?: string;

  @Column({ name: 'is_revoked', default: false })
  isRevoked: boolean;
}
