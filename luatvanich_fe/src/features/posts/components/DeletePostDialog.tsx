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
import { useDeletePost } from "../queries/usePostsQuery";
import type { PostItem } from "../types/posts.types";
import { AlertTriangle, Loader2 } from "lucide-react";

interface DeletePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: PostItem | null;
}

export function DeletePostDialog({ open, onOpenChange, post }: DeletePostDialogProps) {
  const deleteMutation = useDeletePost();

  if (!post) return null;

  const viTitle =
    post.translations.find((t) => t.languageCode === "vi")?.title ||
    post.translations[0]?.title ||
    "Bài viết";

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(post.id);
    onOpenChange(false);
  };

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
              Bài viết sẽ được chuyển vào thùng rác (xóa mềm) và không còn hiển thị đối với độc giả bên ngoài.
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
            Xóa bài viết
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
