"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RoleBadge } from "@/features/roles";
import { useMe, useUpdateProfile } from "../queries/useAuthQuery";
import { updateProfileSchema } from "../schemas/auth.schema";
import { User, Loader2, Save, Mail, Phone, AtSign, Image as ImageIcon } from "lucide-react";

export function ProfileForm() {
  const { data: user, isLoading: isUserLoading } = useMe();
  const updateProfileMutation = useUpdateProfile();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    avatarUrl: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        username: user.username || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        avatarUrl: user.avatarUrl || "",
      });
    }
  }, [user]);

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
    const result = updateProfileSchema.safeParse(formData);
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

    updateProfileMutation.mutate(result.data);
  };

  if (isUserLoading) {
    return (
      <div className="p-8 flex items-center justify-center text-muted-foreground text-xs gap-2">
        <Loader2 className="size-4 animate-spin text-primary" />
        Đang tải thông tin hồ sơ...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Khối Ảnh đại diện & Thông tin vai trò */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-lg border border-border bg-muted/20">
        <div className="size-20 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 ring-2 ring-primary/20 overflow-hidden font-bold text-lg">
          {formData.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={formData.avatarUrl}
              alt={formData.fullName || formData.username}
              className="size-full object-cover"
              onError={(e) => {
                // Nếu ảnh lỗi thì ẩn ảnh đi
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          ) : (
            <User className="size-9" />
          )}
        </div>

        <div className="flex-1 space-y-1.5 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h3 className="font-semibold text-foreground text-base">
              {formData.fullName || formData.username || "Chưa đặt tên"}
            </h3>
            {user?.role && (
              <div>
                <RoleBadge role={user.role} />
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            @{formData.username} &bull; {formData.email}
          </p>
          <p className="text-[11px] text-muted-foreground/80 italic pt-0.5">
            * Quyền hạn và vai trò hệ thống do Super Admin chỉ định, không thể tự chỉnh sửa.
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Họ và tên */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
            <User className="size-3.5 text-muted-foreground" />
            Họ và tên <span className="text-destructive">*</span>
          </label>
          <Input
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="Luật sư Nguyễn Văn A"
            className="h-9 text-xs"
          />
          {errors.fullName && (
            <p className="text-[11px] text-destructive">{errors.fullName}</p>
          )}
        </div>

        {/* Tên đăng nhập */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
            <AtSign className="size-3.5 text-muted-foreground" />
            Tên đăng nhập <span className="text-destructive">*</span>
          </label>
          <Input
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
            placeholder="luatsunguyen"
            className="h-9 text-xs"
          />
          {errors.username && (
            <p className="text-[11px] text-destructive">{errors.username}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
            <Mail className="size-3.5 text-muted-foreground" />
            Email liên hệ <span className="text-destructive">*</span>
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="luatsu@luatvanich.vn"
            className="h-9 text-xs"
          />
          {errors.email && (
            <p className="text-[11px] text-destructive">{errors.email}</p>
          )}
        </div>

        {/* Số điện thoại */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
            <Phone className="size-3.5 text-muted-foreground" />
            Số điện thoại
          </label>
          <Input
            value={formData.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            placeholder="0912345678"
            className="h-9 text-xs"
          />
          {errors.phoneNumber && (
            <p className="text-[11px] text-destructive">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Đường dẫn Avatar URL */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
            <ImageIcon className="size-3.5 text-muted-foreground" />
            Đường dẫn Ảnh đại diện (Avatar URL)
          </label>
          <Input
            value={formData.avatarUrl}
            onChange={(e) => handleChange("avatarUrl", e.target.value)}
            placeholder="https://example.com/avatar.jpg"
            className="h-9 text-xs"
          />
          {errors.avatarUrl && (
            <p className="text-[11px] text-destructive">{errors.avatarUrl}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={updateProfileMutation.isPending}
          className="gap-2 text-xs h-9 min-w-[140px]"
        >
          {updateProfileMutation.isPending ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              Đang lưu...
            </>
          ) : (
            <>
              <Save className="size-3.5" />
              Lưu thay đổi
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
