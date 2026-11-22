import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';
import { UserRepository } from '../users/repositories/user.repository';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';
import { LoginDto } from './dto/request/login.dto';
import { ChangePasswordDto } from './dto/request/change-password.dto';
import { UpdateProfileDto } from './dto/request/update-profile.dto';
import { UserResponseDto } from '../users/dto/response/user.dto';
import { AppConfig } from '../../config/app.config';
import { User } from '../users/entities/user.entity';
import {
  InvalidCredentialsException,
  AccountInactiveException,
  RefreshTokenExpiredException,
  InvalidCurrentPasswordException,
} from './exceptions/auth.exception';
import {
  UserNotFoundException,
  UserAlreadyExistsException,
  UsernameAlreadyExistsException,
} from '../users/exceptions/user.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly refreshTokenRepo: RefreshTokenRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto, userAgent?: string, ipAddress?: string) {
    const identifier = (dto.username || dto.email)?.trim();
    if (!identifier) {
      throw new InvalidCredentialsException('Vui lòng nhập tên đăng nhập hoặc email');
    }

    // BR1: Tìm user theo username hoặc email
    const user = await this.userRepo.findByUsernameOrEmail(identifier);
    if (!user) throw new InvalidCredentialsException();

    // BR2: Kiểm tra tài khoản có hoạt động không
    if (!user.isActive) throw new AccountInactiveException();

    // BR3: Kiểm tra password
    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) throw new InvalidCredentialsException();

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
    const stored = await this.refreshTokenRepo.findValidToken(tokenHash);

    if (!stored || stored.expiresAt < new Date()) {
      throw new RefreshTokenExpiredException();
    }

    // Xoay vòng token: thu hồi token cũ, cấp token mới
    stored.isRevoked = true;
    await this.refreshTokenRepo.save(stored);

    const { accessToken, refreshToken } = await this.generateTokenPair(stored.user);
    return {
      accessToken,
      refreshToken,
      user: this.formatUserResponse(stored.user),
    };
  }

  async logout(userId: string, tokenHash?: string) {
    if (tokenHash) {
      await this.refreshTokenRepo.revokeToken(tokenHash);
    } else {
      await this.refreshTokenRepo.revokeAllUserTokens(userId);
    }
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UserNotFoundException(userId);

    // 1. Kiểm tra mật khẩu hiện tại
    const isMatch = await bcrypt.compare(dto.currentPassword, user.passwordHash);
    if (!isMatch) throw new InvalidCurrentPasswordException();

    // 2. Hash mật khẩu mới và lưu
    user.passwordHash = await bcrypt.hash(dto.newPassword, 12);
    await this.userRepo.save(user);

    // 3. Thu hồi toàn bộ refresh token cũ của user để bắt buộc đăng nhập lại
    await this.refreshTokenRepo.revokeAllUserTokens(userId);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<UserResponseDto> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UserNotFoundException(userId);

    // 1. Kiểm tra email nếu có thay đổi
    if (dto.email && dto.email.trim().toLowerCase() !== user.email) {
      const cleanEmail = dto.email.trim().toLowerCase();
      const exist = await this.userRepo.findByEmail(cleanEmail);
      if (exist && exist.id !== userId) {
        throw new UserAlreadyExistsException(cleanEmail);
      }
      user.email = cleanEmail;
    }

    // 2. Kiểm tra username nếu có thay đổi
    if (dto.username && dto.username.trim().toLowerCase() !== user.username) {
      const cleanUsername = dto.username.trim().toLowerCase();
      const exist = await this.userRepo.findByUsername(cleanUsername);
      if (exist && exist.id !== userId) {
        throw new UsernameAlreadyExistsException(cleanUsername);
      }
      user.username = cleanUsername;
    }

    // 3. Cập nhật các trường thông tin khác
    if (dto.fullName !== undefined) {
      user.fullName = dto.fullName.trim();
    }
    if (dto.phoneNumber !== undefined) {
      user.phoneNumber = dto.phoneNumber?.trim() || undefined;
    }
    if (dto.avatarUrl !== undefined) {
      user.avatarUrl = dto.avatarUrl?.trim() || undefined;
    }

    const saved = await this.userRepo.save(user);
    return UserResponseDto.fromEntity(saved);
  }

  private async generateTokenPair(user: User, userAgent?: string, ipAddress?: string) {
    const permissions = (user.role as any)?.permissions ?? [];

    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
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

    await this.refreshTokenRepo.saveToken(user.id, tokenHash, expiresAt, userAgent, ipAddress);

    return { accessToken, refreshToken: rawRefresh };
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private formatUserResponse(user: User) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      role: (user.role as any)?.code ?? 'editor',
    };
  }
}
