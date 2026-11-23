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
import { useDeletePracticeArea } from "../queries/usePracticeAreasQuery";
import type { PracticeAreaItem } from "../types/practice-areas.types";
import { Loader2, AlertTriangle, ShieldAlert } from "lucide-react";

interface DeletePracticeAreaDialogProps {
  practiceArea: PracticeAreaItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeletePracticeAreaDialog({
  practiceArea,
  open,
  onOpenChange,
}: DeletePracticeAreaDialogProps) {
  const deleteMutation = useDeletePracticeArea();

  if (!practiceArea) return null;

  const areaName =
    practiceArea.translations?.find((t) => t.languageCode === "vi")?.name ||
    practiceArea.translations?.[0]?.name ||
    "Lĩnh vực này";

  const hasServices = practiceArea.servicesCount > 0;

  const handleDelete = async () => {
    if (hasServices) return;
    await deleteMutation.mutateAsync(practiceArea.id);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="size-5" />
            Xác nhận xóa lĩnh vực chuyên môn
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <span>
              Bạn có chắc chắn muốn xóa lĩnh vực <strong>{areaName}</strong>?
            </span>

            {hasServices ? (
              <div className="flex items-start gap-2 p-3 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-medium">
                <ShieldAlert className="size-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Không thể xóa:</strong> Lĩnh vực này hiện có{" "}
                  <strong>{practiceArea.servicesCount}</strong> dịch vụ pháp lý trực thuộc. Vui lòng chuyển hoặc xóa các dịch vụ này trước khi xóa lĩnh vực chuyên môn.
                </span>
              </div>
            ) : (
              <span className="block text-xs text-muted-foreground">
                Thao tác này sẽ xóa mềm lĩnh vực chuyên môn. Bạn vẫn có thể khôi phục lại khi cần thiết từ cơ sở dữ liệu.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={deleteMutation.isPending || hasServices}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground disabled:opacity-50"
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
