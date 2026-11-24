import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteSetting } from './entities/site-setting.entity';
import { SiteSettingsService } from './site-settings.service';
import { SiteSettingsController } from './controllers/site-settings.controller';
import { SiteSettingsAdminController } from './controllers/site-settings-admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SiteSetting])],
  controllers: [SiteSettingsController, SiteSettingsAdminController],
  providers: [SiteSettingsService],
  exports: [SiteSettingsService],
})
export class SiteSettingsModule {}
