"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUpdateUserStatus } from "../queries/useUsersQuery";
import type { UserItem } from "../types/users.types";
import { ShieldAlert, UserCheck, Loader2 } from "lucide-react";

interface ToggleUserStatusDialogProps {
  user: UserItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ToggleUserStatusDialog({
  user,
  open,
  onOpenChange,
}: ToggleUserStatusDialogProps) {
  const updateStatusMutation = useUpdateUserStatus();

  if (!user) return null;

  const willActivate = !user.isActive;

  const handleConfirm = () => {
    updateStatusMutation.mutate(
      { id: user.id, isActive: willActivate },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold flex items-center gap-2">
            {willActivate ? (
              <UserCheck className="size-5 text-emerald-600" />
            ) : (
              <ShieldAlert className="size-5 text-destructive" />
            )}
            {willActivate ? "Kích hoạt tài khoản người dùng" : "Khóa tài khoản người dùng"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground pt-1">
            {willActivate ? (
              <>
                Bạn có chắc chắn muốn kích hoạt lại tài khoản{" "}
                <strong className="text-foreground">{user.fullName || user.username}</strong>{" "}
                (@{user.username})? Người dùng sẽ có thể đăng nhập lại vào hệ thống.
              </>
            ) : (
              <>
                Bạn có chắc chắn muốn khóa tài khoản{" "}
                <strong className="text-foreground">{user.fullName || user.username}</strong>{" "}
                (@{user.username})? Toàn bộ phiên đăng nhập của người dùng sẽ bị thu hồi và họ không
                thể truy cập hệ thống nữa.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Thông tin tài khoản */}
        <div className="my-2 rounded-none border border-[#e7dcc3] bg-[#fbf7ee] p-3 text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Họ và tên:</span>
            <span className="font-medium text-foreground">{user.fullName || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span className="font-medium text-foreground">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Vai trò:</span>
            <span className="font-medium text-foreground">{user.roleName || user.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Trạng thái hiện tại:</span>
            <span
              className={`font-semibold ${
                user.isActive ? "text-emerald-600" : "text-destructive"
              }`}
            >
              {user.isActive ? "Đang hoạt động" : "Đang bị khóa"}
            </span>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={updateStatusMutation.isPending}
          >
            Hủy
          </Button>
          <Button
            type="button"
            variant={willActivate ? "default" : "destructive"}
            onClick={handleConfirm}
            disabled={updateStatusMutation.isPending}
          >
            {updateStatusMutation.isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                {willActivate ? "Đang kích hoạt..." : "Đang khóa..."}
              </>
            ) : willActivate ? (
              "Xác nhận kích hoạt"
            ) : (
              "Xác nhận khóa"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
