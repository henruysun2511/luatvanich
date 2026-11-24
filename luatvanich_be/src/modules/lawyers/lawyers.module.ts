import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lawyer } from './entities/lawyer.entity';
import { LawyerTranslation } from './entities/lawyer-translation.entity';
import { LawyerPracticeArea } from './entities/lawyer-practice-area.entity';
import { LawyerLanguage } from './entities/lawyer-language.entity';
import { LawyerCredential } from './entities/lawyer-credential.entity';
import { LawyerCredentialTranslation } from './entities/lawyer-credential-translation.entity';
import { Office } from '../offices/entities/office.entity';
import { PracticeArea } from '../practice-areas/entities/practice-area.entity';
import { LawyersService } from './services/lawyers.service';
import { LawyerRepository } from './repositories/lawyer.repository';
import { LawyerTranslationRepository } from './repositories/lawyer-translation.repository';
import { LawyerCredentialRepository } from './repositories/lawyer-credential.repository';
import { LawyerMapper } from './mapper/lawyer.mapper';
import { LawyersController } from './controllers/lawyers.controller';
import { LawyersAdminController } from './controllers/lawyers-admin.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Lawyer,
      LawyerTranslation,
      LawyerPracticeArea,
      LawyerLanguage,
      LawyerCredential,
      LawyerCredentialTranslation,
      Office,
      PracticeArea,
    ]),
  ],
  controllers: [LawyersAdminController, LawyersController],
  providers: [
    LawyersService,
    LawyerRepository,
    LawyerTranslationRepository,
    LawyerCredentialRepository,
    LawyerMapper,
  ],
  exports: [LawyersService, LawyerRepository, LawyerMapper, TypeOrmModule],
})
export class LawyersModule {}
