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
import { useDeleteUser } from "../queries/useUsersQuery";
import type { UserItem } from "../types/users.types";
import { AlertTriangle, Loader2 } from "lucide-react";

interface DeleteUserDialogProps {
  user: UserItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteUserDialog({
  user,
  open,
  onOpenChange,
}: DeleteUserDialogProps) {
  const deleteMutation = useDeleteUser();

  if (!user) return null;

  const handleDelete = () => {
    deleteMutation.mutate(user.id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="size-5 shrink-0" />
            Xác nhận xóa tài khoản vĩnh viễn
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs text-muted-foreground space-y-2">
            <span>
              Bạn có chắc chắn muốn xóa tài khoản của{" "}
              <strong className="text-foreground">{user.fullName || user.username}</strong>{" "}
              (<code>{user.email}</code>) không?
            </span>
            <span className="block text-destructive font-medium">
              Hành động này không thể hoàn tác. Toàn bộ phiên đăng nhập của người dùng sẽ bị chấm dứt ngay lập tức.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>
            Hủy bỏ
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            {deleteMutation.isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Đang xóa...
              </>
            ) : (
              "Xác nhận xóa"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
