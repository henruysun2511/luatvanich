import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleRepository } from './repositories/role.repository';
import { UserRepository } from '../users/repositories/user.repository';
import { RefreshToken } from '../auth/entities/refresh-token.entity';
import { RoleResponseDto } from './dto/response/role.dto';
import { UserResponseDto } from '../users/dto/response/user.dto';
import {
  RoleNotFoundException,
  CannotDowngradeSuperAdminException,
} from './exceptions/role.exception';
import { UserNotFoundException } from '../users/exceptions/user.exception';
import { SYSTEM_ROLES } from '../../common/constants/role.constant';

@Injectable()
export class RolesService {
  constructor(
    private readonly roleRepo: RoleRepository,
    private readonly userRepo: UserRepository,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepo: Repository<RefreshToken>,
  ) {}

  /** Lấy danh sách tất cả vai trò */
  async findAll(): Promise<RoleResponseDto[]> {
    const roles = await this.roleRepo.findAll();
    return roles.map(RoleResponseDto.fromEntity);
  }

  /** Lấy chi tiết một vai trò theo ID hoặc mã */
  async findByIdOrCode(idOrCode: string): Promise<RoleResponseDto> {
    const role = await this.roleRepo.findByIdOrCode(idOrCode);
    if (!role) throw new RoleNotFoundException(idOrCode);
    return RoleResponseDto.fromEntity(role);
  }

  /**
   * Gán vai trò mới cho người dùng
   */
  async assignRole(userId: string, roleInput: string): Promise<UserResponseDto> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UserNotFoundException(userId);

    const newRole = await this.roleRepo.findByIdOrCode(roleInput);
    if (!newRole) throw new RoleNotFoundException(roleInput);

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

    // Thu hồi refresh tokens để user cập nhật token mang quyền hạn mới
    await this.refreshTokenRepo.update({ userId }, { isRevoked: true });

    return UserResponseDto.fromEntity(saved);
  }
}
