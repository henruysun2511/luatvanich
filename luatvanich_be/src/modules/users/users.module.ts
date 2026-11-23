import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { RefreshToken } from '../auth/entities/refresh-token.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UserRepository } from './repositories/user.repository';
import { RoleRepository } from '../roles/repositories/role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, RefreshToken])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, RoleRepository],
  exports: [UsersService, UserRepository, RoleRepository],
})
export class UsersModule {}
