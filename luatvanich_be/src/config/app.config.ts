/**
 * AppConfig — Singleton đọc biến môi trường sau khi validate.
 * Dùng thay vì đọc process.env trực tiếp để có type-safe.
 */
export const AppConfig = {
  get NODE_ENV() { return process.env.NODE_ENV || 'development'; },
  get IS_DEV() { return (process.env.NODE_ENV || 'development') === 'development'; },
  get PORT() { return parseInt(process.env.PORT || '3000', 10); },
  get FRONTEND_URL() { return process.env.FRONTEND_URL || 'http://localhost:3001'; },

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

  // Cloudinary
  get CLOUDINARY_CLOUD_NAME() { return process.env.CLOUDINARY_CLOUD_NAME || ''; },
  get CLOUDINARY_API_KEY() { return process.env.CLOUDINARY_API_KEY || ''; },
  get CLOUDINARY_API_SECRET() { return process.env.CLOUDINARY_API_SECRET || ''; },

  // Mail
  get MAIL_HOST() { return process.env.MAIL_HOST || 'smtp.gmail.com'; },
  get MAIL_PORT() { return parseInt(process.env.MAIL_PORT || '587', 10); },
  get MAIL_USER() { return process.env.MAIL_USER || ''; },
  get MAIL_PASS() { return process.env.MAIL_PASS || ''; },
  get MAIL_FROM() { return process.env.MAIL_FROM || 'no-reply@luatvanich.vn'; },

  // CORS
  get CORS_ORIGINS() {
    return (process.env.CORS_ORIGINS || 'http://localhost:3001')
      .split(',')
      .map((o) => o.trim());
  },
  get CORS_CREDENTIALS() { return process.env.CORS_CREDENTIALS !== 'false'; },
} as const;
