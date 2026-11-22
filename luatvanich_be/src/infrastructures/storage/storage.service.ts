import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  HeadBucketCommand,
  CreateBucketCommand,
  PutBucketPolicyCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { AppConfig } from '../../config/app.config';
import * as path from 'path';
import { randomUUID } from 'crypto';
import { Readable } from 'stream';

export interface UploadResult {
  key: string;
  url: string;
  size: number;
  mimeType: string;
  originalName: string;
}

@Injectable()
export class StorageService implements OnModuleInit {
  private readonly logger = new Logger(StorageService.name);
  private s3?: S3Client;

  constructor() {
    // Cấu hình Cloudinary
    if (AppConfig.CLOUDINARY_CLOUD_NAME) {
      cloudinary.config({
        cloud_name: AppConfig.CLOUDINARY_CLOUD_NAME,
        api_key: AppConfig.CLOUDINARY_API_KEY,
        api_secret: AppConfig.CLOUDINARY_API_SECRET,
        secure: true,
      });
      this.logger.log(`Lưu trữ sử dụng Cloudinary (Cloud: ${AppConfig.CLOUDINARY_CLOUD_NAME}).`);
    }

    // Cấu hình S3/MinIO nếu STORAGE_DRIVER=s3
    if (AppConfig.STORAGE_DRIVER === 's3') {
      this.s3 = new S3Client({
        endpoint: AppConfig.S3_ENDPOINT,
        region: AppConfig.S3_REGION,
        credentials: {
          accessKeyId: AppConfig.S3_ACCESS_KEY,
          secretAccessKey: AppConfig.S3_SECRET_KEY,
        },
        forcePathStyle: AppConfig.S3_FORCE_PATH_STYLE,
      });
      this.logger.log(`Lưu trữ sử dụng S3/MinIO (${AppConfig.S3_ENDPOINT}).`);
    }
  }

  async onModuleInit() {
    if (AppConfig.STORAGE_DRIVER === 's3' && this.s3) {
      await this.ensureBucketExists(AppConfig.S3_BUCKET_PUBLIC, true);
      await this.ensureBucketExists(AppConfig.S3_BUCKET_PRIVATE, false);
    }
  }

  /**
   * Upload tệp công khai (Ảnh banner, đại diện dịch vụ, avatar luật sư)
   */
  async uploadPublic(
    file: Express.Multer.File,
    folder = 'general',
  ): Promise<UploadResult> {
    if (AppConfig.STORAGE_DRIVER === 'cloudinary') {
      return this.uploadToCloudinary(file, `luatvanich/${folder}`);
    } else {
      return this.uploadToS3(file, folder, false);
    }
  }

  /**
   * Upload tệp bảo mật (Hồ sơ pháp lý, tài liệu đính kèm của khách hàng)
   */
  async uploadPrivate(
    file: Express.Multer.File,
    folder = 'consultations',
  ): Promise<Omit<UploadResult, 'url'>> {
    if (AppConfig.STORAGE_DRIVER === 'cloudinary') {
      const res = await this.uploadToCloudinary(file, `luatvanich_private/${folder}`, 'authenticated');
      return {
        key: res.key,
        size: res.size,
        mimeType: res.mimeType,
        originalName: res.originalName,
      };
    } else {
      const res = await this.uploadToS3(file, folder, true);
      return {
        key: res.key,
        size: res.size,
        mimeType: res.mimeType,
        originalName: res.originalName,
      };
    }
  }

  /**
   * Tạo Presigned URL cho tệp riêng tư, hết hạn sau N giây (mặc định 1 giờ = 3600s)
   */
  async getPresignedUrl(key: string, expiresIn = 3600): Promise<string> {
    if (AppConfig.STORAGE_DRIVER === 'cloudinary') {
      if (!AppConfig.CLOUDINARY_API_KEY) {
        return `https://res.cloudinary.com/placeholder/image/upload/${key}`;
      }
      return cloudinary.utils.private_download_url(key, 'pdf', {
        expires_at: Math.floor(Date.now() / 1000) + expiresIn,
      });
    }

    if (!this.s3) throw new Error('S3 Client chưa khởi tạo');
    const command = new GetObjectCommand({
      Bucket: AppConfig.S3_BUCKET_PRIVATE,
      Key: key,
    });
    return getSignedUrl(this.s3, command, { expiresIn });
  }

  /**
   * Xóa tệp khỏi kho lưu trữ (Cloudinary hoặc S3/MinIO)
   */
  async deleteFile(key: string, isPrivate = false): Promise<void> {
    if (AppConfig.STORAGE_DRIVER === 'cloudinary') {
      if (!AppConfig.CLOUDINARY_API_KEY) return;
      await cloudinary.uploader.destroy(key);
      return;
    }

    if (!this.s3) return;
    const bucket = isPrivate ? AppConfig.S3_BUCKET_PRIVATE : AppConfig.S3_BUCKET_PUBLIC;
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );
  }

  // ── [CLOUDINARY DRIVER] ───────────────────────────────────────────────────

  private async uploadToCloudinary(
    file: Express.Multer.File,
    folder: string,
    type: 'upload' | 'authenticated' = 'upload',
  ): Promise<UploadResult> {
    if (!AppConfig.CLOUDINARY_CLOUD_NAME || !AppConfig.CLOUDINARY_API_KEY) {
      this.logger.warn('[DEV] Cloudinary chưa cấu hình trong .env — Trả về placeholder URL.');
      return {
        key: `mock_${randomUUID()}`,
        url: '/placeholder.jpg',
        size: file.size,
        mimeType: file.mimetype,
        originalName: file.originalname,
      };
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          type,
          resource_type: 'auto',
        },
        (error, result?: UploadApiResponse) => {
          if (error || !result) {
            this.logger.error(`Cloudinary Upload Error: ${error?.message}`);
            return reject(error || new Error('Upload lên Cloudinary thất bại'));
          }

          resolve({
            key: result.public_id,
            url: result.secure_url,
            size: result.bytes || file.size,
            mimeType: result.format ? `${result.resource_type}/${result.format}` : file.mimetype,
            originalName: file.originalname,
          });
        },
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });
  }

  // ── [S3 / MINIO DRIVER] ───────────────────────────────────────────────────

  private async uploadToS3(
    file: Express.Multer.File,
    folder: string,
    isPrivate: boolean,
  ): Promise<UploadResult> {
    if (!this.s3) throw new Error('S3 Client chưa khởi tạo');

    const ext = path.extname(file.originalname).toLowerCase();
    const key = `${folder}/${randomUUID()}${ext}`;
    const bucket = isPrivate ? AppConfig.S3_BUCKET_PRIVATE : AppConfig.S3_BUCKET_PUBLIC;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    const url = `${AppConfig.S3_PUBLIC_URL}/${key}`;

    return {
      key,
      url,
      size: file.size,
      mimeType: file.mimetype,
      originalName: file.originalname,
    };
  }

  private async ensureBucketExists(bucket: string, isPublic: boolean): Promise<void> {
    if (!this.s3) return;
    try {
      await this.s3.send(new HeadBucketCommand({ Bucket: bucket }));
      this.logger.log(`Bucket '${bucket}' đã sẵn sàng.`);
    } catch {
      this.logger.warn(`Bucket '${bucket}' chưa tồn tại. Đang tự động tạo...`);
      try {
        await this.s3.send(new CreateBucketCommand({ Bucket: bucket }));
        this.logger.log(`Tạo thành công bucket '${bucket}'.`);

        if (isPublic) {
          const publicPolicy = {
            Version: '2012-10-17',
            Statement: [
              {
                Sid: 'PublicReadGetObject',
                Effect: 'Allow',
                Principal: '*',
                Action: ['s3:GetObject'],
                Resource: [`arn:aws:s3:::${bucket}/*`],
              },
            ],
          };
          await this.s3.send(
            new PutBucketPolicyCommand({
              Bucket: bucket,
              Policy: JSON.stringify(publicPolicy),
            }),
          );
        }
      } catch (err) {
        this.logger.error(`Không thể tạo bucket '${bucket}': ${(err as Error).message}`);
      }
    }
  }
}
