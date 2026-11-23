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
import { useDeleteConsultation } from "../queries/useConsultationsQuery";
import type { ConsultationItem } from "../types/consultations.types";
import { AlertTriangle } from "lucide-react";

interface DeleteConsultationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consultation?: ConsultationItem | null;
}

export function DeleteConsultationDialog({
  open,
  onOpenChange,
  consultation,
}: DeleteConsultationDialogProps) {
  const deleteMutation = useDeleteConsultation();

  if (!consultation) return null;

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(consultation.id);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="size-5" />
            Xác nhận xóa yêu cầu tư vấn
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <span>
              Bạn có chắc chắn muốn xóa yêu cầu tư vấn của khách hàng{" "}
              <strong>{consultation.fullName}</strong> (SĐT: {consultation.phone})?
            </span>
            <span className="block text-xs text-muted-foreground">
              Thao tác này sẽ đưa yêu cầu vào trạng thái xóa mềm theo quy định bảo vệ dữ liệu cá nhân (Nghị định 13/2023/NĐ-CP).
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteMutation.isPending ? "Đang xóa..." : "Xác nhận xóa"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
