import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from './entities/partner.entity';
import { PartnerRepository } from './repositories/partner.repository';
import { PartnersService } from './partners.service';
import { PartnersController } from './controllers/partners.controller';
import { PartnersAdminController } from './controllers/partners-admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Partner])],
  controllers: [PartnersController, PartnersAdminController],
  providers: [PartnerRepository, PartnersService],
  exports: [PartnersService],
})
export class PartnersModule {}
