import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { AppConfig } from './config/app.config';
import { validateEnv } from './config/validation.schema';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TypeOrmExceptionFilter } from './common/filters/typeorm-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  // ── Validate biến môi trường ──────────────────────────────────────────────
  validateEnv();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  // ── Cookie parser ─────────────────────────────────────────────────────────
  app.use(cookieParser());

  // ── Prefix & Versioning (/api/v1/...) ────────────────────────────────────
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  // ── CORS ─────────────────────────────────────────────────────────────────
  app.enableCors({
    origin: (origin, callback) => {
      // Cho phép requests không có origin (mobile apps, Postman, curl)
      if (!origin) return callback(null, true);

      // Dev: cho phép tất cả localhost
      if (
        AppConfig.IS_DEV &&
        /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
      ) {
        return callback(null, true);
      }

      if (AppConfig.CORS_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin ${origin} not allowed by CORS`), false);
    },
    credentials: AppConfig.CORS_CREDENTIALS,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Requested-With',
      'Accept-Language',
    ],
  });

  // ── Global Validation Pipe ────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // ── Global Filters & Interceptors ─────────────────────────────────────────
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new TypeOrmExceptionFilter(),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());

  // ── Swagger (/api/docs) ───────────────────────────────────────────────────
  if (AppConfig.IS_DEV || AppConfig.NODE_ENV === 'staging') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Luật Vạn Ích API')
      .setDescription('REST API — NestJS + TypeORM + PostgreSQL\n\n**Base URL**: /api/v1')
      .setVersion('1.0')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'access-token',
      )
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: { persistAuthorization: true },
    });
  }

  const port = AppConfig.PORT;
  await app.listen(port);
  console.log(`Luật Vạn Ích API: http://localhost:${port}/api/v1`);
  if (AppConfig.IS_DEV) {
    console.log(`Swagger docs: http://localhost:${port}/api/docs`);
  }
}

bootstrap();
