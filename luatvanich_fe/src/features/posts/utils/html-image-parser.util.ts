import { extractCloudinaryKey } from "@/features/media/utils/cloudinary.util";

/**
 * Trích xuất toàn bộ URL ảnh từ chuỗi HTML
 */
export function extractImageUrlsFromHtml(html?: string | null): string[] {
  if (!html || typeof html !== "string") return [];

  const urls: string[] = [];
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match: RegExpExecArray | null;

  while ((match = imgRegex.exec(html)) !== null) {
    if (match[1]) {
      urls.push(match[1]);
    }
  }

  return urls;
}

/**
 * Trích xuất toàn bộ Cloudinary public_id (keys) từ chuỗi HTML
 */
export function extractCloudinaryKeysFromHtml(html?: string | null): string[] {
  const urls = extractImageUrlsFromHtml(html);
  const keys: string[] = [];

  for (const url of urls) {
    const key = extractCloudinaryKey(url);
    if (key && !keys.includes(key)) {
      keys.push(key);
    }
  }

  return keys;
}

/**
 * So sánh 2 chuỗi HTML (cũ và mới) để tìm ra các Cloudinary keys đã bị người dùng gỡ bỏ
 */
export function findRemovedCloudinaryKeys(oldHtml?: string | null, newHtml?: string | null): string[] {
  const oldKeys = extractCloudinaryKeysFromHtml(oldHtml);
  const newKeys = extractCloudinaryKeysFromHtml(newHtml);

  // Những key có trong HTML cũ nhưng không còn trong HTML mới
  return oldKeys.filter((key) => !newKeys.includes(key));
}
