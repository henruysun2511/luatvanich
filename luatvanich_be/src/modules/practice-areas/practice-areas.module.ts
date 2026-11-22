import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PracticeArea } from './entities/practice-area.entity';
import { PracticeAreaTranslation } from './entities/practice-area-translation.entity';

/**
 * PracticeAreasModule — Quản lý lĩnh vực chuyên môn / lĩnh vực pháp lý.
 * Hiện tại chỉ chứa cấu hình Entity. Các tầng DTO, Service, Controller,
 * Repository, Mappers sẽ được hoàn thiện theo task được giao.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([PracticeArea, PracticeAreaTranslation]),
  ],
  exports: [TypeOrmModule],
})
export class PracticeAreasModule {}
