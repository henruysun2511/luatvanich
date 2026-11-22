import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LegalService } from './entities/legal-service.entity';
import { LegalServiceTranslation } from './entities/legal-service-translation.entity';
import { LegalServicesController } from './legal-services.controller';
import { LegalServicesAdminController } from './legal-services-admin.controller';
import { LegalServicesService } from './legal-services.service';
import { LegalServiceRepository } from './repositories/legal-service.repository';
import { LegalServiceTranslationRepository } from './repositories/legal-service-translation.repository';
import { LegalServiceMapper } from './mapper/legal-service.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([LegalService, LegalServiceTranslation])],
  controllers: [LegalServicesController, LegalServicesAdminController],
  providers: [
    LegalServicesService,
    LegalServiceRepository,
    LegalServiceTranslationRepository,
    LegalServiceMapper,
  ],
  exports: [LegalServicesService, LegalServiceMapper],
})
export class LegalServicesModule {}
