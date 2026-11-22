"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RoleSelect, useAssignRole } from "@/features/roles";
import { ConfirmDialog } from "@/components/common";
import { ResetPasswordDialog } from "./ResetPasswordDialog";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { ToggleUserStatusDialog } from "./ToggleUserStatusDialog";
import { useMe } from "@/features/auth";
import type { UserItem } from "../types/users.types";
import {
  KeyRound,
  Trash2,
  ShieldAlert,
  User,
  Loader2,
} from "lucide-react";

interface UserListTableProps {
  users: UserItem[];
  isLoading: boolean;
}

export function UserListTable({ users, isLoading }: UserListTableProps) {
  const { data: currentUser } = useMe();
  const assignRoleMutation = useAssignRole();

  // State cho các Dialogs
  const [passwordUser, setPasswordUser] = useState<UserItem | null>(null);
  const [deleteUser, setDeleteUser] = useState<UserItem | null>(null);
  const [statusUser, setStatusUser] = useState<UserItem | null>(null);
  const [pendingRoleChange, setPendingRoleChange] = useState<{
    user: UserItem;
    newRole: string;
  } | null>(null);

  if (isLoading && users.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 flex flex-col items-center justify-center gap-2">
        <Loader2 className="size-6 animate-spin text-primary" />
        <span className="text-xs text-muted-foreground">Đang tải danh sách người dùng...</span>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <p className="text-sm font-medium text-foreground">Không tìm thấy người dùng nào</p>
        <p className="text-xs text-muted-foreground mt-1">
          Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc trạng thái.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40 text-xs">
              <TableHead className="w-[280px]">Người dùng</TableHead>
              <TableHead className="w-[220px]">Liên hệ</TableHead>
              <TableHead className="w-[180px]">Vai trò</TableHead>
              <TableHead className="w-[130px]">Trạng thái</TableHead>
              <TableHead className="w-[140px]">Ngày tạo</TableHead>
              <TableHead className="text-right w-[160px]">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              const isSelf = user.id === currentUser?.id;

              return (
                <TableRow key={user.id} className="text-xs hover:bg-muted/30">
                  {/* Người dùng: Avatar + Tên + Username */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold text-xs ring-1 ring-border">
                        {user.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={user.avatarUrl}
                            alt={user.fullName || user.username}
                            className="size-8 rounded-full object-cover"
                          />
                        ) : (
                          <User className="size-4" />
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-foreground truncate">
                            {user.fullName || user.username}
                          </span>
                          {isSelf && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-accent text-accent-foreground">
                              Bạn
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-muted-foreground truncate">
                          @{user.username}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Email & SĐT */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-foreground truncate">{user.email}</span>
                      <span className="text-[11px] text-muted-foreground">
                        {user.phoneNumber || "Chưa có SĐT"}
                      </span>
                    </div>
                  </TableCell>

                  {/* Vai trò: Chọn trực tiếp qua RoleSelect */}
                  <TableCell>
                    <div className="w-[155px]">
                      <RoleSelect
                        value={user.role}
                        onChange={(newRole) => {
                          if (newRole && newRole !== user.role) {
                            setPendingRoleChange({ user, newRole });
                          }
                        }}
                        disabled={isSelf || assignRoleMutation.isPending}
                        className="h-8 text-xs font-medium"
                      />
                    </div>
                  </TableCell>

                  {/* Trạng thái (Switch) */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={user.isActive}
                        onCheckedChange={() => setStatusUser(user)}
                        disabled={isSelf}
                        title={
                          isSelf
                            ? "Bạn không thể tự khóa tài khoản của mình"
                            : user.isActive
                              ? "Gạt để khóa tài khoản"
                              : "Gạt để kích hoạt tài khoản"
                        }
                      />
                      <span
                        className={`text-[11px] font-medium select-none ${
                          user.isActive
                            ? "text-emerald-700 dark:text-emerald-400"
                            : "text-muted-foreground"
                        }`}
                      >
                        {user.isActive ? "Hoạt động" : "Đã khóa"}
                      </span>
                    </div>
                  </TableCell>

                  {/* Ngày tạo */}
                  <TableCell className="text-muted-foreground text-[11px]">
                    {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                  </TableCell>

                  {/* Các nút hành động */}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {/* Đặt lại mật khẩu */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 text-muted-foreground hover:text-amber-600"
                        onClick={() => setPasswordUser(user)}
                        title="Đặt lại mật khẩu"
                      >
                        <KeyRound className="size-3.5" />
                      </Button>

                      {/* Xóa tài khoản */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 text-muted-foreground hover:text-destructive disabled:opacity-30"
                        onClick={() => setDeleteUser(user)}
                        disabled={isSelf}
                        title={isSelf ? "Không thể tự xóa chính mình" : "Xóa tài khoản"}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* ConfirmDialog dùng chung: Xác nhận Đổi Vai Trò */}
      <ConfirmDialog
        open={!!pendingRoleChange}
        onOpenChange={(open) => !open && setPendingRoleChange(null)}
        title="Xác nhận thay đổi vai trò"
        icon={<ShieldAlert className="size-5 text-amber-500" />}
        confirmText="Xác nhận đổi"
        cancelText="Hủy"
        isLoading={assignRoleMutation.isPending}
        onConfirm={() => {
          if (!pendingRoleChange) return;
          assignRoleMutation.mutate(
            {
              userId: pendingRoleChange.user.id,
              role: pendingRoleChange.newRole,
            },
            {
              onSuccess: () => {
                setPendingRoleChange(null);
              },
            },
          );
        }}
        description={
          pendingRoleChange ? (
            <span>
              Bạn có chắc chắn muốn thay đổi vai trò của người dùng{" "}
              <strong className="text-foreground">
                {pendingRoleChange.user.fullName || pendingRoleChange.user.username}
              </strong>{" "}
              (@{pendingRoleChange.user.username})? Quyền hạn của người dùng sẽ có hiệu lực ngay lập tức.
            </span>
          ) : null
        }
      >
        {pendingRoleChange && (
          <div className="rounded-lg border border-border bg-muted/40 p-3 text-xs space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Tài khoản:</span>
              <span className="font-semibold text-foreground">
                {pendingRoleChange.user.fullName || pendingRoleChange.user.username}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Vai trò hiện tại:</span>
              <span className="font-medium text-foreground">
                {pendingRoleChange.user.roleName || pendingRoleChange.user.role}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Vai trò mới:</span>
              <span className="font-bold text-primary uppercase">
                {pendingRoleChange.newRole}
              </span>
            </div>
          </div>
        )}
      </ConfirmDialog>

      {/* Dialog Đặt lại mật khẩu */}
      <ResetPasswordDialog
        user={passwordUser}
        open={!!passwordUser}
        onOpenChange={(open) => !open && setPasswordUser(null)}
      />

      {/* Dialog Xác nhận xóa */}
      <DeleteUserDialog
        user={deleteUser}
        open={!!deleteUser}
        onOpenChange={(open) => !open && setDeleteUser(null)}
      />

      {/* Dialog Khóa / Mở khóa tài khoản */}
      <ToggleUserStatusDialog
        user={statusUser}
        open={!!statusUser}
        onOpenChange={(open) => !open && setStatusUser(null)}
      />
    </>
  );
}
