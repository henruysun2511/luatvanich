"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RoleBadge } from "@/features/roles";
import { useMediaLifecycle } from "@/features/media";
import { useMe, useUpdateProfile } from "../queries/useAuthQuery";
import { updateProfileSchema } from "../schemas/auth.schema";
import { User, Loader2, Save, Mail, Phone, AtSign, Camera, X } from "lucide-react";

export function ProfileForm() {
  const { data: user, isLoading: isUserLoading } = useMe();
  const updateProfileMutation = useUpdateProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    avatarUrl: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const avatarController = useMediaLifecycle({
    initialUrl: user?.avatarUrl || undefined,
    onUrlChange: (newUrl) => {
      handleChange("avatarUrl", newUrl || "");
    },
    folder: "avatars",
  });

  useEffect(() => {
    return () => {
      void avatarController.rollback();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleAvatarClick = () => {
    if (avatarController.isUploading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    try {
      await avatarController.upload(file);
    } catch {
      // Thông báo lỗi đã được useMediaQuery quản lý
    }
  };

  const handleRemoveAvatar = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await avatarController.remove();
    } catch {
      //
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

    updateProfileMutation.mutate(result.data, {
      onSuccess: () => {
        avatarController.commit();
      },
    });
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
      {/* Input file ẩn phục vụ upload avatar */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Khối Ảnh đại diện & Thông tin vai trò */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 rounded-xl border border-border bg-muted/20">
        {/* Hình tròn Avatar tương tác trực tiếp */}
        <div className="relative group shrink-0">
          <button
            type="button"
            onClick={handleAvatarClick}
            disabled={avatarController.isUploading}
            className="relative size-24 rounded-full bg-primary/10 text-primary flex items-center justify-center ring-2 ring-primary/20 hover:ring-primary/50 transition-all duration-200 overflow-hidden font-bold text-lg cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary/30"
            title="Nhấp để tải lên hoặc đổi ảnh đại diện"
          >
            {formData.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={formData.avatarUrl}
                alt={formData.fullName || formData.username}
                className="size-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <User className="size-11" />
            )}

            {/* Overlay loading hoặc overlay hover */}
            {avatarController.isUploading ? (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-[10px] gap-1 z-10">
                <Loader2 className="size-5 animate-spin" />
                <span>Đang tải...</span>
              </div>
            ) : (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-200 text-[10px] gap-1">
                <Camera className="size-5" />
                <span className="font-medium">Đổi ảnh</span>
              </div>
            )}
          </button>

          {/* Icon máy ảnh ở góc dưới */}
          <button
            type="button"
            onClick={handleAvatarClick}
            disabled={avatarController.isUploading}
            className="absolute -bottom-1 -right-1 size-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer border-2 border-background"
            title="Chọn ảnh mới"
          >
            <Camera className="size-3.5" />
          </button>

          {/* Nút xóa ảnh nếu đã có avatar */}
          {Boolean(formData.avatarUrl && !avatarController.isUploading) && (
            <button
              type="button"
              onClick={handleRemoveAvatar}
              className="absolute -top-1 -right-1 size-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer border-2 border-background"
              title="Gỡ ảnh đại diện"
            >
              <X className="size-3" />
            </button>
          )}
        </div>

        {/* Thông tin hiển thị cạnh avatar */}
        <div className="flex-1 space-y-1.5 text-center sm:text-left pt-1">
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
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1 text-primary font-medium">
              <Camera className="size-3" /> Nhấp vào ảnh để thay đổi
            </span>
            <span>&bull;</span>
            <span>Ảnh vuông 1:1, tối đa 2MB</span>
          </div>
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
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={updateProfileMutation.isPending || avatarController.isUploading}
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
