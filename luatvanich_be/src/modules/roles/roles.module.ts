import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RefreshToken } from '../auth/entities/refresh-token.entity';
import { UsersModule } from '../users/users.module';
import { RolesController } from './controllers/roles.controller';
import { RolesService } from './services/roles.service';
import { RoleRepository } from './repositories/role.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, RefreshToken]),
    UsersModule,
  ],
  controllers: [RolesController],
  providers: [RolesService, RoleRepository],
  exports: [RolesService, RoleRepository],
})
export class RolesModule {}
