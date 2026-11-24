import React, { type ReactNode } from "react";
import { SealStamp } from "@/components/ui/seal-stamp";

interface AuthCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#c29a45]/40 bg-white shadow-2xl shadow-[#06122b]/30">
      {/* Viền đỉnh gradient hoàng gia 4px */}
      <div className="h-[4px] w-full bg-gradient-to-r from-[#85151b] via-[#a3171e] to-[#c29a45]" />

      {/* Header thương hiệu Luật Vạn Ích */}
      <div className="relative bg-[#06122b] px-8 pt-8 pb-7 text-center overflow-hidden border-b border-[#c29a45]/30">
        {/* Thủy ấn mờ góc */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -bottom-8 font-hanzi text-[100px] font-bold text-white/[0.04] select-none leading-none"
        >
          万益
        </div>

        {/* Con dấu triện vàng hoàng gia */}
        <div className="mx-auto mb-3 flex items-center justify-center">
          <SealStamp char="万" size="md" variant="gold" className="w-12 h-12 text-2xl shadow-lg shadow-[#c29a45]/20" />
        </div>

        <h1 className="font-royal text-2xl font-bold tracking-[2px] text-[#f0d28a] uppercase leading-none">
          LUẬT VẠN ÍCH
        </h1>
        <p className="font-hanzi text-[11px] text-[#c29a45] mt-1.5 tracking-[3px] font-medium">
          万益律师事务所 &bull; HỆ THỐNG QUẢN TRỊ
        </p>
      </div>

      {/* Form content */}
      <div className="p-8 space-y-6 bg-[#fcfbf7]/60">
        <div className="text-center">
          <h2 className="font-royal text-2xl font-bold tracking-tight text-[#06122b]">{title}</h2>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground font-sans">{description}</p>
          )}
        </div>

        {children}

        {footer && <div className="pt-2 text-center text-xs text-muted-foreground">{footer}</div>}
      </div>
    </div>
  );
}
