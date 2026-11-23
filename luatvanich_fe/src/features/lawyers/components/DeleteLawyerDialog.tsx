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
import { useDeleteLawyer } from "../queries/useLawyersQuery";
import type { LawyerItem } from "../types/lawyers.types";
import { Loader2, AlertTriangle } from "lucide-react";

interface DeleteLawyerDialogProps {
  lawyer: LawyerItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteLawyerDialog({
  lawyer,
  open,
  onOpenChange,
}: DeleteLawyerDialogProps) {
  const deleteMutation = useDeleteLawyer();

  if (!lawyer) return null;

  const lawyerName =
    lawyer.translations?.find((t) => t.languageCode === "vi")?.fullName ||
    lawyer.translations?.[0]?.fullName ||
    "Luật sư này";

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(lawyer.id);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="size-5" />
            Xác nhận xóa hồ sơ luật sư
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <span>
              Bạn có chắc chắn muốn xóa hồ sơ luật sư <strong>{lawyerName}</strong>?
            </span>
            <span className="block text-xs text-muted-foreground">
              Thao tác này sẽ chuyển hồ sơ vào trạng thái xóa mềm. Bạn vẫn có thể khôi phục lại khi cần thiết từ cơ sở dữ liệu.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={deleteMutation.isPending}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            {deleteMutation.isPending && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}
            Xác nhận xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
