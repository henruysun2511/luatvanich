import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LegalServicesModule } from '../legal-services/legal-services.module';
import { PracticeArea } from './entities/practice-area.entity';
import { PracticeAreaTranslation } from './entities/practice-area-translation.entity';
import { PracticeAreaMapper } from './mapper/practice-area.mapper';
import { PracticeAreasAdminController } from './controllers/practice-areas-admin.controller';
import { PracticeAreasController } from './controllers/practice-areas.controller';
import { PracticeAreasService } from './services/practice-areas.service';
import { PracticeAreaRepository } from './repositories/practice-area.repository';
import { PracticeAreaTranslationRepository } from './repositories/practice-area-translation.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PracticeArea, PracticeAreaTranslation]),
    LegalServicesModule,
  ],
  controllers: [PracticeAreasController, PracticeAreasAdminController],
  providers: [
    PracticeAreasService,
    PracticeAreaRepository,
    PracticeAreaTranslationRepository,
    PracticeAreaMapper,
  ],
  exports: [
    TypeOrmModule,
    PracticeAreasService,
    PracticeAreaRepository,
    PracticeAreaTranslationRepository,
  ],
})
export class PracticeAreasModule {}
