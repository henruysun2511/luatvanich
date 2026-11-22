import type { Metadata } from "next";
import { AppProviders } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Luật Vạn Ích | Tư vấn Pháp lý Doanh nghiệp & Đầu tư Việt - Trung",
    template: "%s | Luật Vạn Ích",
  },
  description:
    "Công ty Luật Vạn Ích - Chuyên cung cấp dịch vụ pháp lý chuyên sâu về Đầu tư FDI, Doanh nghiệp, Thương mại và Tranh chấp song ngữ Việt - Trung.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="font-sans min-h-screen antialiased flex flex-col">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
