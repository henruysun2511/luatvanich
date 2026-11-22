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
import { useDeleteOffice } from "../queries/useOfficesQuery";
import type { OfficeItem } from "../types/offices.types";
import { Loader2, AlertTriangle } from "lucide-react";

interface DeleteOfficeDialogProps {
  office: OfficeItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteOfficeDialog({ office, open, onOpenChange }: DeleteOfficeDialogProps) {
  const deleteMutation = useDeleteOffice();

  if (!office) return null;

  const officeName =
    office.translations?.find((t) => t.languageCode === "vi")?.name || office.code;

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(office.id);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="size-5" />
            Xác nhận xóa văn phòng đại diện
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <span>
              Bạn có chắc chắn muốn xóa văn phòng <strong>{officeName}</strong> (Mã: <code>{office.code}</code>)?
            </span>
            <span className="block text-xs text-muted-foreground">
              Thao tác này sẽ chuyển văn phòng vào trạng thái lưu trữ / xóa mềm. Lưu ý hệ thống sẽ chặn xóa nếu còn luật sư trực thuộc văn phòng này.
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
            {deleteMutation.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            Xóa văn phòng
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
