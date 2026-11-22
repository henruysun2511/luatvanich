import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './repositories/user.repository';
import { RoleRepository } from '../roles/repositories/role.repository';
import { RefreshToken } from '../auth/entities/refresh-token.entity';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UserQueryDto } from './dto/request/user-query.dto';
import { AdminResetPasswordDto } from './dto/request/admin-reset-password.dto';
import { UserResponseDto } from './dto/response/user.dto';
import { PaginatedResponse } from '../../common/response/api-response';
import {
  UserNotFoundException,
  UserAlreadyExistsException,
  UsernameAlreadyExistsException,
  RoleNotFoundException,
  CannotDeleteSelfException,
  CannotDeleteSuperAdminException,
} from './exceptions/user.exception';
import { SYSTEM_ROLES } from '../../common/constants/role.constant';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly roleRepo: RoleRepository,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepo: Repository<RefreshToken>,
  ) {}

  /** Lấy danh sách người dùng có tìm kiếm, lọc và phân trang */
  async findAll(query: UserQueryDto): Promise<PaginatedResponse<UserResponseDto>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const [users, total] = await this.userRepo.findPaginated(query);
    const items = users.map(UserResponseDto.fromEntity);
    return PaginatedResponse.of(items, total, page, limit);
  }

  /**
   * Tạo tài khoản người dùng mới
   */
  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const cleanEmail = dto.email.trim().toLowerCase();
    const cleanUsername = dto.username.trim().toLowerCase();

    // 1. Kiểm tra email đã tồn tại chưa
    const existEmail = await this.userRepo.findByEmail(cleanEmail);
    if (existEmail) throw new UserAlreadyExistsException(cleanEmail);

    // 2. Kiểm tra username đã tồn tại chưa
    const existUsername = await this.userRepo.findByUsername(cleanUsername);
    if (existUsername) throw new UsernameAlreadyExistsException(cleanUsername);

    // 3. Tìm vai trò theo ID hoặc mã (code)
    const role = await this.roleRepo.findByIdOrCode(dto.role);
    if (!role) throw new RoleNotFoundException(dto.role);

    // 4. Hash mật khẩu
    const passwordHash = await bcrypt.hash(dto.password, 12);

    // 5. Tạo và lưu user
    const user = this.userRepo.create({
      email: cleanEmail,
      username: cleanUsername,
      fullName: dto.fullName.trim(),
      passwordHash,
      roleId: role.id,
      phoneNumber: dto.phoneNumber?.trim(),
      isActive: dto.isActive ?? true,
    });

    const saved = await this.userRepo.save(user);
    saved.role = role;

    return UserResponseDto.fromEntity(saved);
  }

  /**
   * Xóa tài khoản người dùng
   */
  async delete(id: string, currentUserId: string): Promise<void> {
    // 1. Không cho phép tự xóa tài khoản của chính mình
    if (id === currentUserId) {
      throw new CannotDeleteSelfException();
    }

    const user = await this.userRepo.findById(id);
    if (!user) throw new UserNotFoundException(id);

    // 2. Không cho phép xóa Super Admin duy nhất
    if (user.role?.code === SYSTEM_ROLES.SUPERADMIN) {
      const superAdminCount = await this.userRepo.countSuperAdmins();
      if (superAdminCount <= 1) {
        throw new CannotDeleteSuperAdminException();
      }
    }

    // 3. Thu hồi toàn bộ refresh tokens của user
    await this.refreshTokenRepo.update({ userId: id }, { isRevoked: true });

    // 4. Thực hiện xóa user (TypeORM Cascade sẽ dọn dẹp các bản ghi liên quan)
    await this.userRepo.delete(id);
  }

  /**
   * Quản trị viên đặt lại mật khẩu cho một tài khoản
   */
  async adminResetPassword(id: string, dto: AdminResetPasswordDto): Promise<void> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new UserNotFoundException(id);

    // 1. Hash mật khẩu mới và cập nhật
    user.passwordHash = await bcrypt.hash(dto.newPassword, 12);
    await this.userRepo.save(user);

    // 2. Thu hồi toàn bộ refresh token của tài khoản đó
    await this.refreshTokenRepo.update({ userId: id }, { isRevoked: true });
  }
}
