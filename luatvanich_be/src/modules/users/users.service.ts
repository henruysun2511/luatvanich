import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserNotFoundException } from './exceptions/user.exception';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}

  async findAll() {
    return this.userRepo.findAll();
  }

  async findById(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new UserNotFoundException(id);
    return user;
  }
}
