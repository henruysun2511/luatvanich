"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff, User, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "../queries/useAuthQuery";
import { loginSchema, type LoginInput } from "../schemas/auth.schema";
import { AuthCard } from "./AuthCard";
import { extractErrorMessage } from "@/lib/axios";
import { DASHBOARD_PATH } from "../constants/auth.constants";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginInput) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        const rawRedirect = searchParams.get("redirect");
        const target =
          rawRedirect && rawRedirect.startsWith("/admin") && rawRedirect !== "/admin/login"
            ? rawRedirect
            : DASHBOARD_PATH;
        router.replace(target);
      },
    });
  };

  return (
    <AuthCard
      title="Đăng nhập hệ thống"
      description="Nhập tên đăng nhập hoặc email quản trị viên để tiếp tục"
      footer={
        <div className="text-[11px] text-muted-foreground/80 font-sans">
          Bảo mật đa tầng &bull; Bản quyền &copy; {new Date().getFullYear()} Luật Vạn Ích (万益律师)
        </div>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {loginMutation.isError && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-lg border border-[#a3171e]/30 bg-[#a3171e]/10 p-3 text-xs text-[#a3171e]"
          >
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <span className="font-medium">{extractErrorMessage(loginMutation.error, "Tên đăng nhập hoặc mật khẩu không đúng.")}</span>
          </div>
        )}

        {/* Username / Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#06122b]">
            Tên đăng nhập hoặc Email
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              autoComplete="username"
              placeholder="admin hoặc admin@luatvanich.vn"
              className="pl-9 text-sm h-10 border-[#e0d6be] focus:border-[#c29a45] focus:ring-[#c29a45]/20 bg-white"
              {...register("username")}
            />
          </div>
          {errors.username && (
            <p className="text-[11px] text-[#a3171e] font-medium">{errors.username.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#06122b]">
            Mật khẩu
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Nhập mật khẩu"
              className="pl-9 pr-10 text-sm h-10 border-[#e0d6be] focus:border-[#c29a45] focus:ring-[#c29a45]/20 bg-white"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#06122b]"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-[11px] text-[#a3171e] font-medium">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-11 font-sans font-semibold bg-gradient-to-r from-[#06122b] via-[#11244d] to-[#06122b] border border-[#c29a45]/50 hover:border-[#f0d28a] text-[#f0d28a] hover:text-white shadow-lg shadow-[#06122b]/25 transition-all"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <>
              <Loader2 className="size-4 animate-spin text-[#f0d28a]" />
              <span>Đang kiểm tra...</span>
            </>
          ) : (
            <span className="tracking-wide uppercase text-xs">Đăng nhập hệ thống</span>
          )}
        </Button>
      </form>
    </AuthCard>
  );
}
