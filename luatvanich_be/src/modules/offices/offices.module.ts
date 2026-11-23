import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Office } from './entities/office.entity';
import { OfficeTranslation } from './entities/office-translation.entity';
import { OfficeRepository } from './repositories/office.repository';
import { OfficeTranslationRepository } from './repositories/office-translation.repository';
import { OfficeMapper } from './mapper/office.mapper';
import { OfficesService } from './services/offices.service';
import { OfficesController } from './controllers/offices.controller';
import { OfficesAdminController } from './controllers/offices-admin.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Office, OfficeTranslation]),
  ],
  controllers: [
    OfficesController,
    OfficesAdminController,
  ],
  providers: [
    OfficesService,
    OfficeRepository,
    OfficeTranslationRepository,
    OfficeMapper,
  ],
  exports: [
    OfficesService,
    OfficeRepository,
    TypeOrmModule,
  ],
})
export class OfficesModule {}
