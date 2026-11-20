import slugify from 'slugify';

/**
 * Sinh slug từ tiếng Việt: "Dịch Vụ FDI" → "dich-vu-fdi"
 */
export function generateViSlug(text: string): string {
  return slugify(text, { lower: true, strict: true, locale: 'vi' });
}

/**
 * Sinh slug từ tiếng Trung (dùng Pinyin nếu có, không thì transliterate thẳng)
 * Vì server không có internet, dùng slugify với locale zh
 */
export function generateZhSlug(text: string): string {
  return slugify(text, { lower: true, strict: true, locale: 'zh' });
}

/**
 * Thêm suffix số vào slug để tránh trùng: "dich-vu-fdi-2"
 */
export function appendSlugSuffix(slug: string, count: number): string {
  return `${slug}-${count}`;
}
