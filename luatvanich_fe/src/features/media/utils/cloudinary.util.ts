/**
 * Trích xuất public_id (key) từ URL ảnh Cloudinary
 * Ví dụ:
 * https://res.cloudinary.com/luatvanich/image/upload/v174000/luatvanich/offices/abc.webp
 * -> "luatvanich/offices/abc"
 */
export function extractCloudinaryKey(url?: string | null): string | null {
  if (!url || typeof url !== "string" || !url.includes("cloudinary.com")) {
    return null;
  }

  try {
    const parts = url.split("/upload/");
    if (parts.length < 2) return null;

    // Bỏ version (v1234567/ hoặc các transformation tag nếu có)
    const afterUpload = parts[1].replace(/^v\d+\//, "");

    // Bỏ đuôi mở rộng file (.jpg, .png, .webp,...)
    const lastDotIndex = afterUpload.lastIndexOf(".");
    if (lastDotIndex === -1) return afterUpload;

    return afterUpload.substring(0, lastDotIndex);
  } catch {
    return null;
  }
}
