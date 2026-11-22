"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff, User, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "../queries/useAuthQuery";
import { loginSchema, type LoginInput } from "../schemas/auth.schema";
import { AuthCard } from "./AuthCard";
import { extractErrorMessage } from "@/lib/axios";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginInput) => {
    loginMutation.mutate(values);
  };

  const handleFillDemo = (username: string, pass: string) => {
    setValue("username", username, { shouldValidate: true });
    setValue("password", pass, { shouldValidate: true });
  };

  return (
    <AuthCard
      title="Đăng nhập hệ thống"
      description="Nhập tên đăng nhập hoặc email quản trị viên để tiếp tục"
      footer={
        <div className="text-[11px] text-muted-foreground">
          Bảo mật đa tầng &bull; Bản quyền &copy; {new Date().getFullYear()} Hãng Luật Vạn Ích
        </div>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {loginMutation.isError && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive"
          >
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <span>{extractErrorMessage(loginMutation.error, "Tên đăng nhập hoặc mật khẩu không đúng.")}</span>
          </div>
        )}

        {/* Username / Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">
            Tên đăng nhập hoặc Email
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              autoComplete="username"
              placeholder="admin hoặc admin@luatvanich.vn"
              className="pl-9 text-sm h-10"
              {...register("username")}
            />
          </div>
          {errors.username && (
            <p className="text-[11px] text-destructive font-medium">{errors.username.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">
            Mật khẩu
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Nhập mật khẩu"
              className="pl-9 pr-10 text-sm h-10"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-[11px] text-destructive font-medium">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-10 font-semibold bg-[#1B2A49] hover:bg-[#15213a] text-white gap-2 shadow-md shadow-[#1B2A49]/20"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <>
              <Loader2 className="size-4 animate-spin text-[#C9A24B]" />
              <span>Đang kiểm tra...</span>
            </>
          ) : (
            <span>Đăng nhập</span>
          )}
        </Button>
      </form>

      {/* Nút bấm điền nhanh tài khoản Dev */}
      {process.env.NODE_ENV !== "production" && (
        <div className="mt-4 rounded-xl border border-dashed border-[#C9A24B]/40 bg-[#C9A24B]/5 p-3 text-xs">
          <div className="font-semibold text-foreground mb-1.5 flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">Tài khoản Superadmin mẫu:</span>
            <span className="text-[10px] font-mono bg-[#C9A24B]/20 text-[#8f6d23] px-1.5 py-0.5 rounded">DEV</span>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1 text-[11px] h-7 border-[#C9A24B]/30 hover:bg-[#C9A24B]/10"
              onClick={() => handleFillDemo("admin", "Admin@2026!")}
            >
              Điền Username: <strong>admin</strong>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1 text-[11px] h-7 border-[#C9A24B]/30 hover:bg-[#C9A24B]/10"
              onClick={() => handleFillDemo("admin@luatvanich.vn", "Admin@2026!")}
            >
              Điền Email
            </Button>
          </div>
        </div>
      )}
    </AuthCard>
  );
}
