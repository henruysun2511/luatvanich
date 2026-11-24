"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChangePassword } from "../queries/useAuthQuery";
import { changePasswordSchema } from "../schemas/auth.schema";
import { KeyRound, Eye, EyeOff, Loader2, ShieldCheck, AlertCircle } from "lucide-react";

export function ChangePasswordForm() {
  const changePasswordMutation = useChangePassword();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // State ẩn/hiện mật khẩu từng ô
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
    const result = changePasswordSchema.safeParse(formData);
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

    changePasswordMutation.mutate({
      currentPassword: result.data.currentPassword,
      newPassword: result.data.newPassword,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Cảnh báo bảo mật */}
      <div className="flex items-start gap-3 p-3.5 rounded-none border border-amber-200 bg-amber-50/60 dark:border-amber-900/50 dark:bg-amber-950/20 text-xs text-amber-800 dark:text-amber-300">
        <AlertCircle className="size-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
        <div className="space-y-1">
          <p className="font-semibold leading-none">Chính sách bảo mật tài khoản</p>
          <p className="text-[11px] text-amber-700 dark:text-amber-400/90 leading-relaxed">
            Sau khi đổi mật khẩu thành công, toàn bộ phiên đăng nhập trên các thiết bị khác sẽ bị thu hồi.
            Bạn sẽ cần đăng nhập lại với mật khẩu mới.
          </p>
        </div>
      </div>

      <div className="space-y-4 max-w-md">
        {/* Mật khẩu hiện tại */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground flex items-center justify-between">
            <span>
              Mật khẩu hiện tại <span className="text-destructive">*</span>
            </span>
          </label>
          <div className="relative">
            <Input
              type={showCurrent ? "text" : "password"}
              value={formData.currentPassword}
              onChange={(e) => handleChange("currentPassword", e.target.value)}
              placeholder="Nhập mật khẩu đang sử dụng"
              className="h-9 text-xs pr-9"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showCurrent ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-[11px] text-destructive">{errors.currentPassword}</p>
          )}
        </div>

        {/* Mật khẩu mới */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground flex items-center justify-between">
            <span>
              Mật khẩu mới <span className="text-destructive">*</span>
            </span>
            <span className="text-[11px] text-muted-foreground">Tối thiểu 8 ký tự</span>
          </label>
          <div className="relative">
            <Input
              type={showNew ? "text" : "password"}
              value={formData.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
              placeholder="Nhập mật khẩu mới an toàn"
              className="h-9 text-xs pr-9"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-[11px] text-destructive">{errors.newPassword}</p>
          )}
        </div>

        {/* Xác nhận mật khẩu mới */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground block">
            Xác nhận mật khẩu mới <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              placeholder="Nhập lại mật khẩu mới"
              className="h-9 text-xs pr-9"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-[11px] text-destructive">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-start pt-2">
        <Button
          type="submit"
          disabled={changePasswordMutation.isPending}
          className="btn-royal !h-9 !text-xs !py-0 !px-5 gap-2 min-w-[150px]"
        >
          {changePasswordMutation.isPending ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              Đang cập nhật...
            </>
          ) : (
            <>
              <ShieldCheck className="size-3.5" />
              Đổi mật khẩu
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
