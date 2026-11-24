"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeletePost } from "../queries/usePostsQuery";
import { mediaService } from "@/features/media/services/media.service";
import { extractCloudinaryKey } from "@/features/media/utils/cloudinary.util";
import { extractCloudinaryKeysFromHtml } from "../utils/html-image-parser.util";
import type { PostItem } from "../types/posts.types";
import { AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DeletePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: PostItem | null;
}

export function DeletePostDialog({ open, onOpenChange, post }: DeletePostDialogProps) {
  const deleteMutation = useDeletePost();
  const [isCleaningMedia, setIsCleaningMedia] = useState(false);

  if (!post) return null;

  const viTitle =
    post.translations.find((t) => t.languageCode === "vi")?.title ||
    post.translations[0]?.title ||
    "Bài viết";

  const handleDelete = async () => {
    try {
      setIsCleaningMedia(true);

      // 1. Thu thập tất cả Cloudinary keys từ thumbnail và ảnh nhúng trong nội dung các bản dịch
      const keysToDelete: string[] = [];

      if (post.thumbnailUrl) {
        const thumbKey = extractCloudinaryKey(post.thumbnailUrl);
        if (thumbKey) keysToDelete.push(thumbKey);
      }

      for (const t of post.translations) {
        const embeddedKeys = extractCloudinaryKeysFromHtml(t.contentHtml);
        keysToDelete.push(...embeddedKeys);
      }

      const uniqueKeys = Array.from(new Set(keysToDelete));

      // 2. Xóa các tệp ảnh trên Cloudinary
      if (uniqueKeys.length > 0) {
        await Promise.allSettled(uniqueKeys.map((k) => mediaService.delete(k)));
      }

      // 3. Xóa bản ghi bài viết
      await deleteMutation.mutateAsync(post.id);
      toast.success("Đã xóa bài viết và giải phóng tài nguyên ảnh!");
      onOpenChange(false);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Xóa bài viết thất bại";
      toast.error(msg);
    } finally {
      setIsCleaningMedia(false);
    }
  };

  const isPending = deleteMutation.isPending || isCleaningMedia;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive text-base">
            <AlertTriangle className="size-5 shrink-0" />
            Xác nhận xóa bài viết
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs space-y-2">
            <span>
              Bạn có chắc chắn muốn xóa bài viết <strong>&quot;{viTitle}&quot;</strong>?
            </span>
            <span className="block text-muted-foreground text-[11px]">
              Bài viết sẽ được xóa khỏi cơ sở dữ liệu và toàn bộ hình ảnh đính kèm (ảnh bìa, ảnh minh họa bài viết) sẽ được dọn dẹp vĩnh viễn trên Cloudinary.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} className="text-xs h-8">
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs h-8 gap-1.5"
          >
            {isPending && <Loader2 className="size-3.5 animate-spin" />}
            {isCleaningMedia ? "Đang dọn dẹp ảnh..." : "Xóa bài viết"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
