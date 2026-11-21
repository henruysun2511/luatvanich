import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
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
  private readonly s3: S3Client;
  private readonly publicBucket: string;
  private readonly privateBucket: string;

  constructor() {
    this.publicBucket = AppConfig.S3_BUCKET_PUBLIC;
    this.privateBucket = AppConfig.S3_BUCKET_PRIVATE;

    this.s3 = new S3Client({
      endpoint: AppConfig.S3_ENDPOINT,
      region: AppConfig.S3_REGION,
      credentials: {
        accessKeyId: AppConfig.S3_ACCESS_KEY,
        secretAccessKey: AppConfig.S3_SECRET_KEY,
      },
      forcePathStyle: AppConfig.S3_FORCE_PATH_STYLE,
    });
  }

  async onModuleInit() {
    await this.ensureBucketExists(this.publicBucket, true);
    await this.ensureBucketExists(this.privateBucket, false);
  }

  /**
   * Đảm bảo Bucket đã tồn tại trên MinIO. Nếu chưa có thì tự động tạo.
   * Với bucket public, tự động gán chính sách Public Read.
   */
  private async ensureBucketExists(bucket: string, isPublic: boolean): Promise<void> {
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
          this.logger.log(`Đã gán quyền Public Read cho bucket '${bucket}'.`);
        }
      } catch (createErr) {
        this.logger.error(`Không thể tạo bucket '${bucket}': ${(createErr as Error).message}`);
      }
    }
  }

  /**
   * Upload tệp công khai (Ảnh banner, đại diện dịch vụ, avatar luật sư)
   */
  async uploadPublic(
    file: Express.Multer.File,
    folder = 'general',
  ): Promise<UploadResult> {
    const ext = path.extname(file.originalname).toLowerCase();
    const key = `${folder}/${randomUUID()}${ext}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.publicBucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    const publicUrl = `${AppConfig.S3_PUBLIC_URL}/${key}`;

    return {
      key,
      url: publicUrl,
      size: file.size,
      mimeType: file.mimetype,
      originalName: file.originalname,
    };
  }

  /**
   * Upload tệp bảo mật (Hồ sơ pháp lý, tài liệu đính kèm của khách hàng)
   */
  async uploadPrivate(
    file: Express.Multer.File,
    folder = 'consultations',
  ): Promise<Omit<UploadResult, 'url'>> {
    const ext = path.extname(file.originalname).toLowerCase();
    const key = `${folder}/${randomUUID()}${ext}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.privateBucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return {
      key,
      size: file.size,
      mimeType: file.mimetype,
      originalName: file.originalname,
    };
  }

  /**
   * Tạo Presigned URL cho tệp riêng tư, hết hạn sau N giây (mặc định 1 giờ = 3600s)
   */
  async getPresignedUrl(key: string, expiresIn = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.privateBucket,
      Key: key,
    });
    return getSignedUrl(this.s3, command, { expiresIn });
  }

  /**
   * Xóa tệp khỏi MinIO / S3
   */
  async deleteFile(key: string, isPrivate = false): Promise<void> {
    const bucket = isPrivate ? this.privateBucket : this.publicBucket;
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );
  }
}
