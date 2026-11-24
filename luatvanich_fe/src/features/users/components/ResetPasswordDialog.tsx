"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminResetPassword } from "../queries/useUsersQuery";
import type { UserItem } from "../types/users.types";
import { KeyRound, Loader2 } from "lucide-react";

interface ResetPasswordDialogProps {
  user: UserItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResetPasswordDialog({
  user,
  open,
  onOpenChange,
}: ResetPasswordDialogProps) {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const resetMutation = useAdminResetPassword();

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      setError("Mật khẩu mới phải có ít nhất 8 ký tự.");
      return;
    }

    resetMutation.mutate(
      { id: user.id, input: { newPassword } },
      {
        onSuccess: () => {
          setNewPassword("");
          setError("");
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-base font-semibold flex items-center gap-2">
              <KeyRound className="size-5 text-primary" />
              Đặt lại mật khẩu người dùng
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Đặt lại mật khẩu cho tài khoản{" "}
              <strong className="text-foreground">{user.fullName || user.username}</strong> ({user.email}).
              Sau khi đổi, toàn bộ phiên đăng nhập của tài khoản này sẽ bị thu hồi.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-2">
            <label className="text-xs font-medium text-foreground block">
              Mật khẩu mới:
            </label>
            <Input
              type="password"
              placeholder="Nhập mật khẩu mới (tối thiểu 8 ký tự)"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (error) setError("");
              }}
              className="h-9 text-xs"
              autoFocus
            />
            {error && <p className="text-[11px] text-destructive">{error}</p>}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={resetMutation.isPending}
            >
              Hủy
            </Button>
            <Button type="submit" variant="royal" disabled={resetMutation.isPending || !newPassword}>
              {resetMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                "Xác nhận đổi mật khẩu"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
