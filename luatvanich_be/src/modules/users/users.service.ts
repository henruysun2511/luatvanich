import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './repositories/user.repository';
import { RoleRepository } from './repositories/role.repository';
import { RefreshToken } from '../auth/entities/refresh-token.entity';
import { CreateUserDto } from './dto/request/create-user.dto';
import { AssignRoleDto } from './dto/request/assign-role.dto';
import { ChangePasswordDto } from './dto/request/change-password.dto';
import { AdminResetPasswordDto } from './dto/request/admin-reset-password.dto';
import { UserResponseDto } from './dto/response/user.dto';
import { RoleResponseDto } from './dto/response/role.dto';
import {
  UserNotFoundException,
  UserAlreadyExistsException,
  UsernameAlreadyExistsException,
  RoleNotFoundException,
  CannotDeleteSelfException,
  CannotDeleteSuperAdminException,
  CannotDowngradeSuperAdminException,
  InvalidCurrentPasswordException,
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

  /** Lấy danh sách toàn bộ người dùng */
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepo.findAll();
    return users.map(UserResponseDto.fromEntity);
  }

  /** Lấy chi tiết một người dùng theo ID */
  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new UserNotFoundException(id);
    return UserResponseDto.fromEntity(user);
  }

  /** Lấy danh sách tất cả vai trò */
  async findAllRoles(): Promise<RoleResponseDto[]> {
    const roles = await this.roleRepo.findAll();
    return roles.map(RoleResponseDto.fromEntity);
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
   * Gán vai trò (role) mới cho người dùng
   */
  async assignRole(id: string, dto: AssignRoleDto, currentUserId: string): Promise<UserResponseDto> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new UserNotFoundException(id);

    const newRole = await this.roleRepo.findByIdOrCode(dto.role);
    if (!newRole) throw new RoleNotFoundException(dto.role);

    // Nếu đang là Super Admin mà hạ xuống vai trò khác: kiểm tra còn Super Admin khác không
    if (user.role?.code === SYSTEM_ROLES.SUPERADMIN && newRole.code !== SYSTEM_ROLES.SUPERADMIN) {
      const superAdminCount = await this.userRepo.countSuperAdmins();
      if (superAdminCount <= 1) {
        throw new CannotDowngradeSuperAdminException();
      }
    }

    user.roleId = newRole.id;
    user.role = newRole;
    const saved = await this.userRepo.save(user);

    // Thu hồi refresh tokens để user bắt buộc cập nhật token mang quyền hạn mới
    await this.refreshTokenRepo.update({ userId: id }, { isRevoked: true });

    return UserResponseDto.fromEntity(saved);
  }

  /**
   * Người dùng tự đổi mật khẩu cá nhân
   */
  async changePassword(currentUserId: string, dto: ChangePasswordDto): Promise<void> {
    const user = await this.userRepo.findById(currentUserId);
    if (!user) throw new UserNotFoundException(currentUserId);

    // 1. Kiểm tra mật khẩu hiện tại
    const isMatch = await bcrypt.compare(dto.currentPassword, user.passwordHash);
    if (!isMatch) throw new InvalidCurrentPasswordException();

    // 2. Hash mật khẩu mới và lưu
    user.passwordHash = await bcrypt.hash(dto.newPassword, 12);
    await this.userRepo.save(user);

    // 3. Thu hồi toàn bộ refresh token cũ để ép đăng nhập lại trên các thiết bị khác
    await this.refreshTokenRepo.update({ userId: currentUserId }, { isRevoked: true });
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
