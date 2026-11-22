import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

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
    return this.repo.findOne({ where: { email }, relations: ['role'] });
  }

  async findById(id: string): Promise<User | null> {
    return this.repo.findOne({ where: { id }, relations: ['role'] });
  }

  async findAll(): Promise<User[]> {
    return this.repo.find({ relations: ['role'], order: { createdAt: 'DESC' } });
  }

  create(data: Partial<User>): User {
    return this.repo.create(data);
  }

  async save(user: User): Promise<User> {
    return this.repo.save(user);
  }

  async softDelete(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }
}
