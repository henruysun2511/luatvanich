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
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  isLoading?: boolean;
  icon?: React.ReactNode;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  variant = "default",
  isLoading = false,
  icon,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const handleConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoading) return;
    await onConfirm();
  };

  const handleCancel = () => {
    if (isLoading) return;
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={(val) => !isLoading && onOpenChange(val)}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
            {icon}
            {title}
          </AlertDialogTitle>
          {description && (
            <AlertDialogDescription className="text-xs text-muted-foreground pt-1 leading-relaxed">
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        {children && <div className="py-2">{children}</div>}

        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel
            disabled={isLoading}
            onClick={handleCancel}
            className="text-xs h-9"
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={handleConfirm}
            className={cn(
              "text-xs h-9",
              variant === "destructive" &&
                "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-3.5 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              confirmText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
