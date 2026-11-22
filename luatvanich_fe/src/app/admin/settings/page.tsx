"use client";

import React, { useState } from "react";
import { Settings, User, KeyRound, Shield } from "lucide-react";
import { ProfileForm, ChangePasswordForm } from "@/features/auth";
import { cn } from "@/lib/utils";

type SettingsTab = "profile" | "password";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Settings className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-serif text-foreground leading-tight">
              Cài đặt tài khoản
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Quản lý thông tin cá nhân, ảnh đại diện và bảo mật tài khoản quản trị của bạn.
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-border gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all -mb-px",
            activeTab === "profile"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30",
          )}
        >
          <User className="size-4" />
          Thông tin cá nhân
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("password")}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all -mb-px",
            activeTab === "password"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30",
          )}
        >
          <KeyRound className="size-4" />
          Đổi mật khẩu & Bảo mật
        </button>
      </div>

      {/* Main Content Card */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        {activeTab === "profile" ? (
          <div>
            <div className="mb-5 pb-3 border-b border-border/60">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <User className="size-4 text-primary" />
                Hồ sơ thông tin cá nhân
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Cập nhật họ tên, email, số điện thoại và ảnh đại diện hiển thị trong hệ thống.
              </p>
            </div>
            <ProfileForm />
          </div>
        ) : (
          <div>
            <div className="mb-5 pb-3 border-b border-border/60">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Shield className="size-4 text-primary" />
                Đổi mật khẩu tài khoản
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Thiết lập mật khẩu mới để tăng cường an toàn và bảo mật cho tài khoản quản trị.
              </p>
            </div>
            <ChangePasswordForm />
          </div>
        )}
      </div>
    </div>
  );
}
