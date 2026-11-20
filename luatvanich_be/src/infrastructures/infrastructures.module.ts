import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from '../config/app.config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MailerModule } from './mailer/mailer.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: AppConfig.DB_HOST,
        port: AppConfig.DB_PORT,
        database: AppConfig.DB_NAME,
        username: AppConfig.DB_USER,
        password: AppConfig.DB_PASS,
        ssl: AppConfig.DB_SSL ? { rejectUnauthorized: false } : false,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
        synchronize: AppConfig.IS_DEV, // CHỈ dev — production dùng migration
        logging: AppConfig.IS_DEV ? ['error', 'warn'] : false,
        autoLoadEntities: true,
      }),
    }),

    CloudinaryModule,
    MailerModule,
  ],
  exports: [CloudinaryModule, MailerModule],
})
export class InfrastructuresModule {}
