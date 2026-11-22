import { useRef, useMemo, useCallback } from "react";
import { useUploadMedia, useDeleteMedia } from "../queries/useMediaQuery";
import { extractCloudinaryKey } from "../utils/cloudinary.util";
import type { MediaFolder, UploadResult } from "../types/media.types";

export interface UseMediaLifecycleOptions {
  initialUrl?: string | null;
  onUrlChange: (url: string) => void;
  folder?: MediaFolder | string;
}

export interface MediaLifecycleController {
  upload: (file: File) => Promise<UploadResult>;
  remove: () => Promise<void>;
  commit: () => Promise<void>;
  rollback: () => Promise<void>;
  isUploading: boolean;
}

/**
 * Hook quản lý toàn diện vòng đời của một trường Media trong Form:
 * 1. Upload đè: tự động xóa ảnh tạm vừa upload trước đó.
 * 2. Ấn nút X: xóa ngay ảnh tạm trên Cloudinary.
 * 3. Đóng form chưa lưu: gọi rollback() để dọn sạch toàn bộ ảnh tạm.
 * 4. Submit thành công: gọi commit() để giữ ảnh mới và xóa ảnh cũ trên DB (nếu đã thay).
 */
export function useMediaLifecycle({
  initialUrl,
  onUrlChange,
  folder = "general",
}: UseMediaLifecycleOptions): MediaLifecycleController {
  // Danh sách các key vừa upload tạm thời trong phiên mở form này
  const transientKeys = useRef<Set<string>>(new Set());

  // Key của ảnh ban đầu từ DB (nếu đang ở chế độ sửa)
  const initialKey = useMemo(() => extractCloudinaryKey(initialUrl), [initialUrl]);

  // Đánh dấu ảnh cũ cần xóa sau khi người dùng bấm Submit thành công
  const oldKeyPendingDelete = useRef<string | null>(null);

  const uploadMutation = useUploadMedia();
  const deleteMutation = useDeleteMedia();

  /**
   * 1. Upload ảnh mới
   */
  const upload = useCallback(
    async (file: File): Promise<UploadResult> => {
      const result = await uploadMutation.mutateAsync({ file, folder });

      // Nếu trước đó trong phiên này ĐÃ có ảnh tạm -> xóa ngay ảnh tạm trước đó
      if (transientKeys.current.size > 0) {
        for (const oldKey of transientKeys.current) {
          void deleteMutation.mutateAsync(oldKey);
        }
        transientKeys.current.clear();
      }

      // Đánh dấu ảnh cũ ban đầu (nếu có) sẽ bị xóa khi form submit thành công
      if (initialKey && initialKey !== result.key) {
        oldKeyPendingDelete.current = initialKey;
      }

      // Ghi nhận ảnh mới vào danh sách tạm và cập nhật URL vào form
      transientKeys.current.add(result.key);
      onUrlChange(result.url);

      return result;
    },
    [deleteMutation, folder, initialKey, onUrlChange, uploadMutation],
  );

  /**
   * 2. Ấn nút X (Gỡ ảnh)
   */
  const remove = useCallback(async (): Promise<void> => {
    // Xóa toàn bộ ảnh tạm vừa upload trong phiên này
    if (transientKeys.current.size > 0) {
      for (const key of transientKeys.current) {
        void deleteMutation.mutateAsync(key);
      }
      transientKeys.current.clear();
    }

    // Nếu đang xóa ảnh ban đầu từ DB -> đánh dấu để xóa khi commit
    if (initialKey) {
      oldKeyPendingDelete.current = initialKey;
    }

    onUrlChange("");
  }, [deleteMutation, initialKey, onUrlChange]);

  /**
   * 3. Submit thành công (Commit): Giữ lại ảnh mới, xóa ảnh cũ nếu đã thay thế
   */
  const commit = useCallback(async (): Promise<void> => {
    // Không coi các ảnh mới là tạm nữa (đã lưu chính thức)
    transientKeys.current.clear();

    // Xóa ảnh cũ ban đầu (nếu có đánh dấu thay đổi)
    if (oldKeyPendingDelete.current) {
      void deleteMutation.mutateAsync(oldKeyPendingDelete.current);
      oldKeyPendingDelete.current = null;
    }
  }, [deleteMutation]);

  /**
   * 4. Hủy form / Đóng dialog mà chưa submit (Rollback): Xóa sạch mọi ảnh tạm đã upload
   */
  const rollback = useCallback(async (): Promise<void> => {
    if (transientKeys.current.size > 0) {
      for (const key of transientKeys.current) {
        void deleteMutation.mutateAsync(key);
      }
      transientKeys.current.clear();
    }
    // Hủy đánh dấu xóa ảnh cũ
    oldKeyPendingDelete.current = null;
  }, [deleteMutation]);

  return {
    upload,
    remove,
    commit,
    rollback,
    isUploading: uploadMutation.isPending,
  };
}
