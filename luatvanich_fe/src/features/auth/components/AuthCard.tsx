import React, { type ReactNode } from "react";
import { Scale } from "lucide-react";

interface AuthCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl shadow-primary/5">
      {/* Header thương hiệu Luật Vạn Ích */}
      <div className="bg-gradient-to-br from-[#1B2A49] to-[#0F1829] px-8 pt-8 pb-6 text-white text-center">
        <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#C9A24B] to-[#997428] text-white shadow-lg shadow-[#C9A24B]/20">
          <Scale className="size-6" />
        </div>
        <h1 className="text-lg font-bold tracking-wider text-[#C9A24B] uppercase">
          Hãng Luật Vạn Ích
        </h1>
        <p className="text-xs text-white/70 mt-1 font-light tracking-wide">
          HỆ THỐNG QUẢN TRỊ & ĐIỀU HÀNH NỘI DUNG
        </p>
      </div>

      {/* Form content */}
      <div className="p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
        </div>

        {children}

        {footer && <div className="pt-2 text-center text-xs text-muted-foreground">{footer}</div>}
      </div>
    </div>
  );
}
