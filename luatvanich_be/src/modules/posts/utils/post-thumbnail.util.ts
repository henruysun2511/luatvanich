import { AppConfig } from '../../../config/app.config';
import { PostThumbnailException } from '../exceptions/post.exception';

/**
 * Xác thực định dạng URL ảnh bìa từ kho lưu trữ của dự án (Cloudinary hoặc S3/MinIO)
 * Không gọi mạng ra ngoài nhằm đảm bảo an toàn, ổn định trong môi trường offline/test/sandbox.
 */
export function validatePostThumbnail(value: string): void {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new PostThumbnailException();
  }

  // Chặn username/password hoặc hash trong URL ảnh
  if (url.username || url.password || url.hash) {
    throw new PostThumbnailException();
  }

  // Kiểm tra chỉ chấp nhận HTTP / HTTPS
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new PostThumbnailException();
  }

  const s3 = new URL(AppConfig.S3_PUBLIC_URL);
  const publicPrefix = s3.pathname.replace(/\/$/, '') + '/';

  const isAllowedS3 =
    AppConfig.STORAGE_DRIVER === 's3' &&
    url.origin === s3.origin &&
    url.pathname.startsWith(publicPrefix) &&
    url.pathname.length > publicPrefix.length;

  const isAllowedCloudinary =
    url.origin === 'https://res.cloudinary.com' &&
    (!!AppConfig.CLOUDINARY_CLOUD_NAME
      ? url.pathname.startsWith(`/${AppConfig.CLOUDINARY_CLOUD_NAME}/image/upload/`)
      : true) &&
    url.pathname.includes('/luatvanich/');

  if (!isAllowedS3 && !isAllowedCloudinary) {
    throw new PostThumbnailException();
  }
}
