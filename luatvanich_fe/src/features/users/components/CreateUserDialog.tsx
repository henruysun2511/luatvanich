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
import { RoleSelect } from "@/features/roles";
import { useCreateUser } from "../queries/useUsersQuery";
import { createUserSchema } from "../schemas/users.schema";
import { UserPlus, Loader2 } from "lucide-react";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateUserDialog({ open, onOpenChange }: CreateUserDialogProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "editor",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const createMutation = useCreateUser();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = createUserSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    createMutation.mutate(result.data, {
      onSuccess: () => {
        setFormData({
          fullName: "",
          username: "",
          email: "",
          password: "",
          role: "editor",
          phoneNumber: "",
        });
        setErrors({});
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-base font-semibold flex items-center gap-2">
              <UserPlus className="size-5 text-primary" />
              Thêm tài khoản người dùng mới
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Nhập thông tin để cấp tài khoản truy cập hệ thống quản trị Luật Vạn Ích.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-3">
            {/* Họ và tên */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground block">
                Họ và tên <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="Ví dụ: Luật sư Nguyễn Văn A"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="h-9 text-xs"
              />
              {errors.fullName && (
                <p className="text-[11px] text-destructive">{errors.fullName}</p>
              )}
            </div>

            {/* Username & Role */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground block">
                  Tên đăng nhập <span className="text-destructive">*</span>
                </label>
                <Input
                  placeholder="luatsunguyen"
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  className="h-9 text-xs"
                />
                {errors.username && (
                  <p className="text-[11px] text-destructive">{errors.username}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground block">
                  Vai trò <span className="text-destructive">*</span>
                </label>
                <RoleSelect
                  value={formData.role}
                  onChange={(val) => handleChange("role", val)}
                  className="h-9 text-xs"
                />
                {errors.role && (
                  <p className="text-[11px] text-destructive">{errors.role}</p>
                )}
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground block">
                  Email <span className="text-destructive">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="luatsu@luatvanich.vn"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="h-9 text-xs"
                />
                {errors.email && (
                  <p className="text-[11px] text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground block">
                  Số điện thoại
                </label>
                <Input
                  placeholder="0912345678"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  className="h-9 text-xs"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground block">
                Mật khẩu ban đầu <span className="text-destructive">*</span>
              </label>
              <Input
                type="password"
                placeholder="Tối thiểu 8 ký tự"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="h-9 text-xs"
              />
              {errors.password && (
                <p className="text-[11px] text-destructive">{errors.password}</p>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createMutation.isPending}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={createMutation.isPending} className="btn-royal !h-8 !text-xs !py-0 !px-4">
              {createMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Đang tạo...
                </>
              ) : (
                "Tạo tài khoản"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
