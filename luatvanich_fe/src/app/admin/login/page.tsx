"use client";

import React, { Suspense } from "react";
import { GuestOnly, LoginForm } from "@/features/auth";
import { PageLoader } from "@/components/common";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <GuestOnly>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0F1829] via-[#1B2A49] to-[#0A101D] p-4">
          <LoginForm />
        </div>
      </GuestOnly>
    </Suspense>
  );
}
