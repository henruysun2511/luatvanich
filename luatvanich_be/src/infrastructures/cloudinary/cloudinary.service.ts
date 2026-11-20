import { Injectable, Logger } from '@nestjs/common';
import { AppConfig } from '../../config/app.config';

/**
 * CloudinaryService — Upload và quản lý media trên Cloudinary.
 * TODO: Cài cloudinary SDK khi có CLOUDINARY_API_KEY.
 */
@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  async uploadImage(
    file: Express.Multer.File,
    folder = 'luatvanich',
  ): Promise<{ url: string; publicId: string }> {
    if (!AppConfig.CLOUDINARY_API_KEY) {
      this.logger.warn('Cloudinary chưa cấu hình — trả URL placeholder');
      return { url: '/placeholder.jpg', publicId: 'placeholder' };
    }

    // TODO: implement cloudinary.uploader.upload(file.buffer)
    throw new Error('Cloudinary upload chưa được implement');
  }

  async deleteImage(publicId: string): Promise<void> {
    if (!AppConfig.CLOUDINARY_API_KEY) return;
    // TODO: cloudinary.uploader.destroy(publicId)
  }
}
