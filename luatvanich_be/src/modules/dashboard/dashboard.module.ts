import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultationRequest } from '../consultations/entities/consultation-request.entity';
import { Post } from '../posts/entities/post.entity';
import { LegalService } from '../legal-services/entities/legal-service.entity';
import { Lawyer } from '../lawyers/entities/lawyer.entity';
import { Office } from '../offices/entities/office.entity';
import { DashboardRepository } from './repositories/dashboard.repository';
import { DashboardService } from './services/dashboard.service';
import { DashboardAdminController } from './controllers/dashboard-admin.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConsultationRequest,
      Post,
      LegalService,
      Lawyer,
      Office,
    ]),
  ],
  controllers: [DashboardAdminController],
  providers: [DashboardRepository, DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
