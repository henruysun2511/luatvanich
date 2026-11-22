import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { mediaService } from "../services/media.service";
import type { MediaFolder, UploadResult } from "../types/media.types";
import { extractErrorMessage } from "@/lib/axios";

export const mediaKeys = {
  all: ["media"] as const,
};

/**
 * Mutation tải lên tệp
 */
export const useUploadMedia = () => {
  return useMutation<UploadResult, Error, { file: File; folder?: MediaFolder | string }>({
    mutationFn: ({ file, folder }) => mediaService.upload(file, folder),
    onError: (err) => {
      toast.error("Tải ảnh lên thất bại", {
        description: extractErrorMessage(err, "Không thể tải tệp lên máy chủ. Vui lòng thử lại."),
      });
    },
  });
};

/**
 * Mutation xóa tệp theo key
 */
export const useDeleteMedia = () => {
  return useMutation<void, Error, string>({
    mutationFn: (key) => mediaService.delete(key),
    onError: (err) => {
      // Xóa thất bại thường không chặn luồng UI nhưng nên log cảnh báo
      console.warn("Lỗi khi xóa media khỏi kho lưu trữ:", err);
    },
  });
};
