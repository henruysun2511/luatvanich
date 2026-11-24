import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faq } from './entities/faq.entity';
import { FaqTranslation } from './entities/faq-translation.entity';
import { FaqsService } from './faqs.service';
import { FaqsController } from './controllers/faqs.controller';
import { FaqsAdminController } from './controllers/faqs-admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Faq, FaqTranslation])],
  controllers: [FaqsController, FaqsAdminController],
  providers: [FaqsService],
  exports: [FaqsService],
})
export class FaqsModule {}
