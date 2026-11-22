import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Office } from './entities/office.entity';
import { OfficeTranslation } from './entities/office-translation.entity';
import { OfficeRepository } from './repositories/office.repository';
import { OfficeTranslationRepository } from './repositories/office-translation.repository';
import { OfficeMapper } from './mapper/office.mapper';
import { OfficesService } from './offices.service';
import { OfficesController } from './offices.controller';
import { OfficesAdminController } from './offices-admin.controller';

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
