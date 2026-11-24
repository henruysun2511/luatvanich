import React from "react";
import { PublicLayoutShell } from "@/components/layout/PublicLayoutShell";

export default function PublicWebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayoutShell>{children}</PublicLayoutShell>;
}
