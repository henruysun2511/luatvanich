import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserQueryDto } from '../dto/request/user-query.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  async findByUsernameOrEmail(identifier: string): Promise<User | null> {
    const clean = identifier.trim().toLowerCase();
    return this.repo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('LOWER(user.email) = :identifier', { identifier: clean })
      .orWhere('LOWER(user.username) = :identifier', { identifier: clean })
      .getOne();
  }

  async findByEmail(email: string): Promise<User | null> {
    const clean = email.trim().toLowerCase();
    return this.repo.findOne({ where: { email: clean }, relations: ['role'] });
  }

  async findByUsername(username: string): Promise<User | null> {
    const clean = username.trim().toLowerCase();
    return this.repo.findOne({ where: { username: clean }, relations: ['role'] });
  }

  async findById(id: string): Promise<User | null> {
    return this.repo.findOne({ where: { id }, relations: ['role'] });
  }

  async findAll(): Promise<User[]> {
    return this.repo.find({ relations: ['role'], order: { createdAt: 'DESC' } });
  }

  /**
   * Truy vấn danh sách người dùng có tìm kiếm, lọc và phân trang
   */
  async findPaginated(query: UserQueryDto): Promise<[User[], number]> {
    const {
      page = 1,
      limit = 10,
      q,
      role,
      isActive,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = query;
    const skip = (page - 1) * limit;

    const qb = this.repo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role');

    // 1. Tìm kiếm theo từ khóa (username, email, fullName, phoneNumber)
    if (q && q.trim()) {
      const keyword = `%${q.trim().toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(user.email) LIKE :keyword OR LOWER(user.username) LIKE :keyword OR LOWER(user.fullName) LIKE :keyword OR user.phoneNumber LIKE :keyword)',
        { keyword },
      );
    }

    // 2. Lọc theo vai trò (roleCode hoặc roleId)
    if (role && role.trim()) {
      const cleanRole = role.trim();
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(cleanRole);
      if (isUuid) {
        qb.andWhere('role.id = :roleId', { roleId: cleanRole });
      } else {
        qb.andWhere('LOWER(role.code) = :roleCode', { roleCode: cleanRole.toLowerCase() });
      }
    }

    // 3. Lọc theo trạng thái hoạt động (isActive)
    if (typeof isActive === 'boolean') {
      qb.andWhere('user.isActive = :isActive', { isActive });
    }

    // 4. Sắp xếp
    const validSortColumns: Record<string, string> = {
      createdAt: 'user.createdAt',
      fullName: 'user.fullName',
      username: 'user.username',
      email: 'user.email',
      lastLoginAt: 'user.lastLoginAt',
    };
    const sortField = validSortColumns[sortBy] || 'user.createdAt';
    const direction = sortOrder?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    qb.orderBy(sortField, direction);

    // 5. Phân trang
    qb.skip(skip).take(limit);

    return qb.getManyAndCount();
  }

  async countSuperAdmins(): Promise<number> {
    return this.repo
      .createQueryBuilder('user')
      .innerJoin('user.role', 'role')
      .where('role.code = :code', { code: 'superadmin' })
      .andWhere('user.isActive = true')
      .getCount();
  }

  create(data: Partial<User>): User {
    return this.repo.create(data);
  }

  async save(user: User): Promise<User> {
    return this.repo.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }
}
