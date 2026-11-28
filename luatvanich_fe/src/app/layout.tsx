import type { Metadata } from "next";
import { AppProviders } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://luatvanich.vn"),
  title: {
    default: "Luật Vạn Ích (Hà Nội) | 广西万益（河内）律师事务所",
    template: "%s | Luật Vạn Ích",
  },
  description:
    "Văn phòng Luật sư Vạn Ích Quảng Tây tại Hà Nội (广西万益（河内）律师事务所) - Tư vấn chuyên sâu Đầu tư FDI, M&A Doanh nghiệp, Thương mại và Giải quyết tranh chấp song ngữ Việt - Trung.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/images/brand/logo-w.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Luật Vạn Ích (Hà Nội) | 广西万益（河内）律师事务所",
    description:
      "Văn phòng Luật sư Vạn Ích Quảng Tây tại Hà Nội - Dịch vụ tư vấn pháp lý và giải pháp đầu tư toàn diện Việt - Trung.",
    url: "/",
    siteName: "Luật Vạn Ích (Hà Nội)",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Logo và Con dấu Hoàng gia Luật Vạn Ích",
      },
    ],
    locale: "vi_VN",
    type: "website",
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
