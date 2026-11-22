import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly repo: Repository<RefreshToken>,
  ) {}

  async saveToken(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
    userAgent?: string,
    ipAddress?: string,
  ): Promise<RefreshToken> {
    const token = this.repo.create({
      userId,
      tokenHash,
      expiresAt,
      userAgent,
      ipAddress,
      isRevoked: false,
    });
    return this.repo.save(token);
  }

  async findValidToken(tokenHash: string): Promise<RefreshToken | null> {
    return this.repo.findOne({
      where: { tokenHash, isRevoked: false },
      relations: ['user', 'user.role'],
    });
  }

  async revokeToken(tokenHash: string): Promise<void> {
    await this.repo.update({ tokenHash }, { isRevoked: true });
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    await this.repo.update({ userId }, { isRevoked: true });
  }

  async save(token: RefreshToken): Promise<RefreshToken> {
    return this.repo.save(token);
  }
}
