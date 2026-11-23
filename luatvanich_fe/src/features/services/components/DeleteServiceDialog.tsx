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
import { useDeleteLegalService } from "../queries/useServiceQuery";
import type { LegalServiceItem } from "../types/service.types";
import { Loader2, AlertTriangle } from "lucide-react";

interface DeleteServiceDialogProps {
  service: LegalServiceItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteServiceDialog({
  service,
  open,
  onOpenChange,
}: DeleteServiceDialogProps) {
  const deleteMutation = useDeleteLegalService();

  if (!service) return null;

  const serviceTitle =
    service.translations?.find((t) => t.languageCode === "vi")?.title ||
    service.translations?.[0]?.title ||
    "Dịch vụ này";

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(service.id);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="size-5" />
            Xác nhận xóa dịch vụ pháp lý
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <span>
              Bạn có chắc chắn muốn xóa dịch vụ <strong>{serviceTitle}</strong>?
            </span>
            <span className="block text-xs text-muted-foreground">
              Thao tác này sẽ chuyển dịch vụ vào trạng thái xóa mềm. Lưu ý: dịch vụ đang xuất bản sẽ được tự động chuyển sang lưu trữ trước khi xóa.
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
