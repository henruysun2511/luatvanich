import { apiClient } from "@/lib/axios";
import type { UploadResult, MediaFolder } from "../types/media.types";

const MEDIA_BASE_URL = "/media";

export const mediaService = {
  /**
   * Tải tệp lên hệ thống lưu trữ (Cloudinary)
   */
  upload: async (file: File, folder: MediaFolder | string = "general"): Promise<UploadResult> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const res = await apiClient.post<{ data: UploadResult }>(
      `${MEDIA_BASE_URL}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data.data;
  },

  /**
   * Xóa tệp khỏi hệ thống lưu trữ bằng public_id (key)
   */
  delete: async (key: string): Promise<void> => {
    await apiClient.delete(MEDIA_BASE_URL, {
      params: { key },
    });
  },
};
