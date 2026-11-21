import { Module, ClassSerializerInterceptor, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { InfrastructuresModule } from './infrastructures/infrastructures.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { LegalServicesModule } from './modules/legal-services/legal-services.module';
import { MediaModule } from './modules/media/media.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from './modules/auth/guards/permissions.guard';
import { LangMiddleware } from './common/middleware/lang.middleware';

@Module({
  imports: [
    InfrastructuresModule,
    AuthModule,
    UsersModule,
    LegalServicesModule,
    MediaModule,
    // TODO Phase 2+: thêm các module khác
    // SiteSettingsModule,
    // ThemeModule,
    // MediaModule,
    // PagesModule,
    // MenusModule,
    // PracticeAreasModule,
    // LawyersModule,
    // OfficesModule,
    // PostsModule,
    // ConsultationsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Inject lang vào mọi request: ?lang=vi|zh-CN hoặc Accept-Language header
    consumer.apply(LangMiddleware).forRoutes('*');
  }
}
