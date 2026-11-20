"use client";

import React, { type MouseEvent } from "react";
import { Loader2 } from "lucide-react";
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

interface DeleteServiceDialogProps {
  targetService: LegalServiceItem | null;
  onDismiss: () => void;
  onSuccessfullyDeleted?: () => void;
}

export function DeleteServiceDialog({
  targetService,
  onDismiss,
  onSuccessfullyDeleted,
}: DeleteServiceDialogProps) {
  const { mutate: executeDelete, isPending } = useDeleteLegalService();

  const handleConfirmDelete = (e: MouseEvent) => {
    e.preventDefault();
    if (!targetService) return;

    executeDelete(targetService.id, {
      onSuccess: () => {
        onDismiss();
        onSuccessfullyDeleted?.();
      },
    });
  };

  return (
    <AlertDialog
      open={Boolean(targetService)}
      onOpenChange={(open) => !open && !isPending && onDismiss()}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận xóa dịch vụ pháp lý?</AlertDialogTitle>
          <AlertDialogDescription>
            Dịch vụ <strong>{targetService?.titleVi}</strong> (Mã: {targetService?.code}) sẽ bị xóa vĩnh viễn khỏi hệ thống.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Hủy bỏ</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmDelete}
            disabled={isPending}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {isPending && <Loader2 className="size-4 animate-spin mr-1" />}
            Xóa vĩnh viễn
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
