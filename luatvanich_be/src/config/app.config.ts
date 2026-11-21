/**
 * AppConfig — Singleton đọc biến môi trường sau khi validate.
 * Dùng thay vì đọc process.env trực tiếp để có type-safe.
 */
export const AppConfig = {
  get NODE_ENV() { return process.env.NODE_ENV || 'development'; },
  get IS_DEV() { return (process.env.NODE_ENV || 'development') === 'development'; },
  get PORT() { return parseInt(process.env.PORT || '4000', 10); },
  get FRONTEND_URL() { return process.env.FRONTEND_URL || 'http://localhost:3000'; },

  // Database
  get DB_HOST() { return process.env.DB_HOST || 'localhost'; },
  get DB_PORT() { return parseInt(process.env.DB_PORT || '5432', 10); },
  get DB_NAME() { return process.env.DB_NAME || 'luatvanich'; },
  get DB_USER() { return process.env.DB_USER || 'postgres'; },
  get DB_PASS() { return process.env.DB_PASS || 'postgres'; },
  get DB_SSL() { return process.env.DB_SSL === 'true'; },

  // JWT
  get JWT_SECRET() { return process.env.JWT_SECRET!; },
  get JWT_ACCESS_EXPIRES() { return process.env.JWT_ACCESS_EXPIRES || '15m'; },
  get JWT_REFRESH_EXPIRES() { return process.env.JWT_REFRESH_EXPIRES || '7d'; },

  // MinIO / S3 Object Storage
  get S3_ENDPOINT() { return process.env.S3_ENDPOINT || 'http://localhost:9000'; },
  get S3_REGION() { return process.env.S3_REGION || 'us-east-1'; },
  get S3_ACCESS_KEY() { return process.env.S3_ACCESS_KEY || 'admin_minio'; },
  get S3_SECRET_KEY() { return process.env.S3_SECRET_KEY || 'Password@2026!'; },
  get S3_BUCKET_PUBLIC() { return process.env.S3_BUCKET_PUBLIC || 'luatvanich-public'; },
  get S3_BUCKET_PRIVATE() { return process.env.S3_BUCKET_PRIVATE || 'luatvanich-private'; },
  get S3_FORCE_PATH_STYLE() { return process.env.S3_FORCE_PATH_STYLE !== 'false'; },
  get S3_PUBLIC_URL() {
    return (
      process.env.S3_PUBLIC_URL ||
      `${process.env.S3_ENDPOINT || 'http://localhost:9000'}/${process.env.S3_BUCKET_PUBLIC || 'luatvanich-public'}`
    );
  },

  // Mail
  get MAIL_HOST() { return process.env.MAIL_HOST || 'smtp.gmail.com'; },
  get MAIL_PORT() { return parseInt(process.env.MAIL_PORT || '587', 10); },
  get MAIL_USER() { return process.env.MAIL_USER || ''; },
  get MAIL_PASS() { return process.env.MAIL_PASS || ''; },
  get MAIL_FROM() { return process.env.MAIL_FROM || 'no-reply@luatvanich.vn'; },

  // CORS
  get CORS_ORIGINS() {
    return (process.env.CORS_ORIGINS || 'http://localhost:3000')
      .split(',')
      .map((o) => o.trim());
  },
  get CORS_CREDENTIALS() { return process.env.CORS_CREDENTIALS !== 'false'; },
} as const;
