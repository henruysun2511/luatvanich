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
    "Chi nhánh Văn phòng Luật sư Vạn Ích Quảng Tây tại Hà Nội (广西万益（河内）律师事务所) - Được Bộ Tư pháp cấp Giấy phép số 73/TP/ĐKHĐ-ĐN. Chuyên sâu tư vấn Đầu tư FDI, M&A Doanh nghiệp, Thương mại và Giải quyết tranh chấp song ngữ Việt - Trung.",
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
      "Chi nhánh Văn phòng Luật sư Vạn Ích Quảng Tây tại Hà Nội - Dịch vụ tư vấn pháp lý và giải pháp đầu tư toàn diện Việt - Trung.",
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

const legalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Luật Vạn Ích (Hà Nội)",
  legalName: "Chi nhánh Văn phòng Luật sư Vạn Ích Quảng Tây tại Hà Nội",
  alternateName: "广西万益（河内）律师事务所",
  url: "https://luatvanich.vn",
  logo: "https://luatvanich.vn/icon.png",
  image: "https://luatvanich.vn/og-image.png",
  telephone: "+86 152 7702 0681",
  taxID: "0108962624",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Số 17, Đường 23, KĐT Thành phố Giao Lưu, Cổ Nhuế 2",
    addressLocality: "Bắc Từ Liêm",
    addressRegion: "Hà Nội",
    addressCountry: "VN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
        />
      </head>
      <body className="font-sans min-h-screen antialiased flex flex-col">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
