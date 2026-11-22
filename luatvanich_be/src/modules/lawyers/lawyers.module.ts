import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lawyer } from './lawyer.entity';
import { LawyerCredential } from './lawyer-credential.entity';
import { LawyerCredentialTranslation } from './lawyer-credential-translation.entity';
import { LawyerLanguage } from './lawyer-language.entity';
import { LawyerTranslation } from './lawyer-translation.entity';
import { LawyerCredentialsAdminController, LawyersAdminController, LawyersController } from './lawyers.controller';
import { LawyersService } from './lawyers.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    Lawyer, LawyerTranslation, LawyerLanguage, LawyerCredential, LawyerCredentialTranslation,
  ])],
  controllers: [LawyersAdminController, LawyerCredentialsAdminController, LawyersController],
  providers: [LawyersService],
})
export class LawyersModule {}
