import { AppConfig } from '../../../config/app.config';
import { PostThumbnailException } from '../exceptions/post.exception';

export async function validatePostThumbnail(value: string): Promise<void> {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new PostThumbnailException();
  }

  const s3 = new URL(AppConfig.S3_PUBLIC_URL);
  const publicPrefix = s3.pathname.replace(/\/$/, '') + '/';
  const allowed = AppConfig.STORAGE_DRIVER === 's3'
    ? url.origin === s3.origin && url.pathname.startsWith(publicPrefix) && url.pathname.length > publicPrefix.length
    : !!AppConfig.CLOUDINARY_CLOUD_NAME && url.origin === 'https://res.cloudinary.com'
      && url.pathname.startsWith(`/${AppConfig.CLOUDINARY_CLOUD_NAME}/image/upload/`)
      && url.pathname.includes('/luatvanich/');
  if (!allowed || url.username || url.password || url.hash) throw new PostThumbnailException();

  const response = await fetch(url, { method: 'HEAD', redirect: 'error', signal: AbortSignal.timeout(5000) })
    .catch(() => undefined);
  if (!response?.ok || !response.headers.get('content-type')?.toLowerCase().startsWith('image/')) {
    throw new PostThumbnailException();
  }
}
