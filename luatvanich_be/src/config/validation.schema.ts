import * as Joi from 'joi';

const schema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
  PORT: Joi.number().default(4000),
  FRONTEND_URL: Joi.string().uri().default('http://localhost:3000'),

  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_SSL: Joi.boolean().default(false),

  JWT_SECRET: Joi.string().min(32).required(),
  JWT_ACCESS_EXPIRES: Joi.string().default('15m'),
  JWT_REFRESH_EXPIRES: Joi.string().default('7d'),

  // Storage Driver: 'cloudinary' | 's3'
  STORAGE_DRIVER: Joi.string().valid('cloudinary', 's3').default('cloudinary'),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: Joi.string().allow('').default(''),
  CLOUDINARY_API_KEY: Joi.string().allow('').default(''),
  CLOUDINARY_API_SECRET: Joi.string().allow('').default(''),

  // MinIO / S3
  S3_ENDPOINT: Joi.string().default('http://localhost:9000'),
  S3_REGION: Joi.string().default('us-east-1'),
  S3_ACCESS_KEY: Joi.string().default('admin_minio'),
  S3_SECRET_KEY: Joi.string().default('Password@2026!'),
  S3_BUCKET_PUBLIC: Joi.string().default('luatvanich-public'),
  S3_BUCKET_PRIVATE: Joi.string().default('luatvanich-private'),
  S3_FORCE_PATH_STYLE: Joi.boolean().default(true),
  S3_PUBLIC_URL: Joi.string().allow('').optional(),

  MAIL_HOST: Joi.string().default('smtp.gmail.com'),
  MAIL_PORT: Joi.number().default(587),
  MAIL_USER: Joi.string().allow('').default(''),
  MAIL_PASS: Joi.string().allow('').default(''),
  MAIL_FROM: Joi.string().default('no-reply@luatvanich.vn'),

  CORS_ORIGINS: Joi.string().default('http://localhost:3000'),
  CORS_CREDENTIALS: Joi.boolean().default(true),
});

export function validateEnv() {
  const { error } = schema.validate(process.env, { allowUnknown: true, abortEarly: false });
  if (error) {
    throw new Error(
      `Biến môi trường không hợp lệ:\n${error.details.map((d) => `  • ${d.message}`).join('\n')}`,
    );
  }
}
