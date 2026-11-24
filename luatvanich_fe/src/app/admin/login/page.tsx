"use client";

import React, { Suspense } from "react";
import { GuestOnly, LoginForm } from "@/features/auth";
import { PageLoader } from "@/components/common";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <GuestOnly>
        <div className="relative min-h-screen flex items-center justify-center bg-[#06122b] overflow-hidden p-4">
          {/* Họa tiết thủy ấn khổng lồ chữ Hán nền */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-12 -bottom-20 font-hanzi text-[380px] font-bold text-transparent select-none leading-none [-webkit-text-stroke:1px_rgba(201,162,74,0.08)] z-0 hidden md:block"
          >
            万益
          </div>

          {/* Vầng sáng hoàng gia trung tâm */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute w-[500px] h-[500px] rounded-full bg-radial from-[#c29a45]/10 via-transparent to-transparent blur-3xl -top-24 -right-24 z-0"
          />

          {/* Hộp đăng nhập trung tâm */}
          <div className="relative z-10 w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </GuestOnly>
    </Suspense>
  );
}
