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
      <AlertDialogContent className="sm:max-w-[440px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-base font-royal font-bold text-[#06122b]">
            {icon}
            <span>{title}</span>
          </AlertDialogTitle>
          {description && (
            <AlertDialogDescription className="text-xs text-muted-foreground pt-1 leading-relaxed font-sans">
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        {children && <div className="py-2">{children}</div>}

        <AlertDialogFooter className="gap-2 sm:gap-2">
          <AlertDialogCancel
            disabled={isLoading}
            onClick={handleCancel}
            className="text-xs h-9 px-4 border-[#e7dcc3] hover:bg-[#fbf7ee] text-[#06122b]"
          >
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isLoading}
            onClick={handleConfirm}
            className={cn(
              "text-xs h-9 px-4 min-w-[90px] font-semibold gap-1.5 transition-all shadow-sm",
              variant === "destructive"
                ? "bg-[#a3171e] hover:bg-[#85151b] text-white border border-[#a3171e]"
                : "bg-[#06122b] hover:bg-[#11244d] text-[#f0d28a] border border-[#c29a45]/40",
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                <span>Đang xử lý...</span>
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
