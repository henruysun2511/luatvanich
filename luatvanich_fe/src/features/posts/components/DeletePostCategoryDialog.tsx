"use client";

import React from "react";
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
import { useDeletePostCategory } from "../queries/usePostCategoriesQuery";
import type { PostCategoryItem } from "../types/posts.types";
import { AlertTriangle, Loader2 } from "lucide-react";

interface DeletePostCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: PostCategoryItem | null;
}

export function DeletePostCategoryDialog({
  open,
  onOpenChange,
  category,
}: DeletePostCategoryDialogProps) {
  const deleteMutation = useDeletePostCategory();

  if (!category) return null;

  const viName =
    category.translations.find((t) => t.languageCode === "vi")?.name ||
    category.translations[0]?.name ||
    "Chuyên mục";

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(category.id);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive text-base">
            <AlertTriangle className="size-5 shrink-0" />
            Xác nhận xóa chuyên mục
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs space-y-2">
            <span>
              Bạn có chắc chắn muốn xóa chuyên mục <strong>&quot;{viName}&quot;</strong>?
            </span>
            <span className="block text-amber-600 bg-amber-50 p-2 rounded-none border border-amber-200 text-[11px]">
              <strong>Lưu ý quan trọng:</strong> Hệ thống sẽ từ chối xóa nếu chuyên mục này vẫn còn bài viết trực thuộc hoặc đang có các chuyên mục con phụ thuộc.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending} className="text-xs h-8">
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs h-8 gap-1.5"
          >
            {deleteMutation.isPending && <Loader2 className="size-3.5 animate-spin" />}
            Xóa vĩnh viễn
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
