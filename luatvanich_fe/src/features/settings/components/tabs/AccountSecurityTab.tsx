"use client";

import React, { useState } from "react";
import { User, Shield } from "lucide-react";
import { ProfileForm, ChangePasswordForm } from "@/features/auth";

export function AccountSecurityTab() {
  const [subTab, setSubTab] = useState<"profile" | "password">("profile");

  return (
    <div className="space-y-6">
      {/* Sub tabs */}
      <div className="flex border-b border-[#e7dcc3] gap-2">
        <button
          type="button"
          onClick={() => setSubTab("profile")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold border-b-2 transition-all -mb-px ${
            subTab === "profile"
              ? "border-[#85151b] text-[#85151b]"
              : "border-transparent text-[#718096] hover:text-[#06122b]"
          }`}
        >
          <User className="size-3.5" />
          Hồ sơ cá nhân
        </button>

        <button
          type="button"
          onClick={() => setSubTab("password")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold border-b-2 transition-all -mb-px ${
            subTab === "password"
              ? "border-[#85151b] text-[#85151b]"
              : "border-transparent text-[#718096] hover:text-[#06122b]"
          }`}
        >
          <Shield className="size-3.5" />
          Đổi mật khẩu tài khoản
        </button>
      </div>

      {/* Sub Tab Content */}
      <div className="border border-[#e7dcc3] bg-white p-6 rounded-none shadow-xs">
        {subTab === "profile" ? (
          <div>
            <div className="mb-5 pb-3 border-b border-[#e7dcc3]/60">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#06122b] flex items-center gap-2">
                <User className="size-4 text-[#85151b]" />
                Hồ sơ thông tin cá nhân
              </h3>
              <p className="text-xs text-[#718096] mt-0.5">
                Cập nhật họ tên, email, số điện thoại và ảnh đại diện hiển thị trong hệ thống.
              </p>
            </div>
            <ProfileForm />
          </div>
        ) : (
          <div>
            <div className="mb-5 pb-3 border-b border-[#e7dcc3]/60">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#06122b] flex items-center gap-2">
                <Shield className="size-4 text-[#85151b]" />
                Đổi mật khẩu tài khoản
              </h3>
              <p className="text-xs text-[#718096] mt-0.5">
                Thiết lập mật khẩu mới an toàn để bảo vệ tài khoản quản trị viên.
              </p>
            </div>
            <ChangePasswordForm />
          </div>
        )}
      </div>
    </div>
  );
}
