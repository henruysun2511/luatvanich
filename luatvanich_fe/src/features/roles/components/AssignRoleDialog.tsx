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
import { RoleSelect } from "./RoleSelect";
import { useAssignRole } from "../queries/useRolesQuery";
import { Loader2, ShieldAlert } from "lucide-react";

interface AssignRoleDialogProps {
  user: { id: string; fullName: string; username: string; role: string } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AssignRoleDialog({
  user,
  open,
  onOpenChange,
}: AssignRoleDialogProps) {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const assignMutation = useAssignRole();

  // Đồng bộ role khi mở dialog
  React.useEffect(() => {
    if (user) {
      setSelectedRole(user.role);
    }
  }, [user]);

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole || selectedRole === user.role) {
      onOpenChange(false);
      return;
    }

    assignMutation.mutate(
      { userId: user.id, role: selectedRole },
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
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-base font-semibold flex items-center gap-2">
              <ShieldAlert className="size-5 text-primary" />
              Gán vai trò người dùng
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Thay đổi vai trò cho tài khoản{" "}
              <strong className="text-foreground">{user.fullName || user.username}</strong>.
              Phiên đăng nhập cũ của người dùng này sẽ tự động được cập nhật quyền mới.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-3">
            <label className="text-xs font-medium text-foreground block">
              Chọn vai trò mới:
            </label>
            <RoleSelect
              value={selectedRole}
              onChange={setSelectedRole}
              placeholder="Chọn vai trò..."
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={assignMutation.isPending}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={assignMutation.isPending || selectedRole === user.role}
              className="btn-royal !h-8 !text-xs !py-0 !px-4"
            >
              {assignMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                "Xác nhận gán"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
