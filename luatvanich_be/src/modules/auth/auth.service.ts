import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { LoginDto } from './dto/login.dto';
import { AppConfig } from '../../config/app.config';
import { createHash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(RefreshToken) private readonly refreshTokenRepo: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto, userAgent?: string, ipAddress?: string) {
    // BR1: Tìm user theo email
    const user = await this.userRepo.findOne({
      where: { email: dto.email, isActive: true },
      relations: ['role'],
    });

    if (!user) throw new UnauthorizedException({ code: 'INVALID_CREDENTIALS', message: 'Email hoặc mật khẩu không đúng' });

    // BR2: Kiểm tra password
    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) throw new UnauthorizedException({ code: 'INVALID_CREDENTIALS', message: 'Email hoặc mật khẩu không đúng' });

    // Tạo token pair
    const { accessToken, refreshToken } = await this.generateTokenPair(user, userAgent, ipAddress);

    return {
      accessToken,
      refreshToken,
      user: this.formatUserResponse(user),
    };
  }

  async refresh(rawToken: string) {
    const tokenHash = this.hashToken(rawToken);
    const stored = await this.refreshTokenRepo.findOne({
      where: { tokenHash, isRevoked: false },
      relations: ['user', 'user.role'],
    });

    if (!stored || stored.expiresAt < new Date()) {
      throw new UnauthorizedException({ code: 'REFRESH_TOKEN_INVALID', message: 'Phiên đã hết hạn, vui lòng đăng nhập lại' });
    }

    // Xoay vòng token: thu hồi token cũ, cấp token mới
    stored.isRevoked = true;
    await this.refreshTokenRepo.save(stored);

    const { accessToken, refreshToken } = await this.generateTokenPair(stored.user);
    return { accessToken, refreshToken };
  }

  async logout(userId: string, tokenHash?: string) {
    if (tokenHash) {
      await this.refreshTokenRepo.update({ tokenHash }, { isRevoked: true });
    } else {
      await this.refreshTokenRepo.update({ userId }, { isRevoked: true });
    }
  }

  private async generateTokenPair(user: User, userAgent?: string, ipAddress?: string) {
    const permissions = (user.role as any)?.permissions ?? [];

    const payload = {
      sub: user.id,
      email: user.email,
      role: (user.role as any)?.code ?? 'editor',
      permissions,
    };

    const accessToken = this.jwtService.sign(payload);

    // Refresh token: random + lưu hash
    const rawRefresh = this.jwtService.sign(
      { sub: user.id, type: 'refresh' },
      { expiresIn: AppConfig.JWT_REFRESH_EXPIRES, secret: AppConfig.JWT_SECRET + '_refresh' },
    );
    const tokenHash = this.hashToken(rawRefresh);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7d

    await this.refreshTokenRepo.save(
      this.refreshTokenRepo.create({ tokenHash, userId: user.id, expiresAt, userAgent, ipAddress }),
    );

    return { accessToken, refreshToken: rawRefresh };
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private formatUserResponse(user: User) {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: (user.role as any)?.code ?? 'editor',
      permissions: (user.role as any)?.permissions ?? [],
    };
  }
}
