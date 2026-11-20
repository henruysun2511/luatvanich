# LUẬT VẠN ÍCH - FRONTEND APPLICATION (`luatvanich_fe`)

> Ứng dụng Frontend cho Hãng Luật Vạn Ích (万益律师事务所) - Song ngữ Việt / Trung kèm bộ công cụ kéo thả trực quan (Page Builder - Puck).

---

## 1. Công nghệ sử dụng
- **Framework**: Next.js 15+ (App Router, React 19)
- **Styling**: Tailwind CSS + shadcn/ui primitives
- **Design System**: Theme CSS Variables (Preset P1: Navy `#1B2A49` + Vàng Gold `#C9A24B`, Preset P2: Đỏ đô `#7A1F2B` + Vàng kem `#D4AF37`)
- **Page Builder Engine**: `@measured/puck`
- **Data Fetching & Cache**: `@tanstack/react-query` v5
- **HTTP Client**: `axios` (với chuẩn lỗi `LawFirmApiError`, JWT interceptors và tự động gắn `?lang=`)
- **Validation & Form**: `react-hook-form` + `zod`

---

## 2. Cấu trúc thư mục

```
src/
├── app/
│   ├── [lang]/               # Dynamic routing song ngữ (vi | zh-CN)
│   │   └── (public)/         # Phân hệ Public: Header, MegaMenu, Footer, Floating Contact
│   ├── (admin)/admin/        # Phân hệ Admin CMS: Sidebar, Dashboard, Quản lý Dịch vụ, Builder
│   ├── globals.css           # Định nghĩa CSS variables bảng màu P1/P2 và tokens
│   ├── layout.tsx            # Root HTML & Fonts (Inter, Merriweather)
│   └── providers.tsx         # QueryClientProvider, Toaster (Sonner), TooltipProvider
├── components/
│   ├── ui/                   # Base UI components (Button, Input, Table, Dialog, Select...)
│   └── layout/               # Header, Footer, FloatingContact, AdminSidebar, AdminHeader
├── features/                 # Cấu trúc tách lớp theo Feature (Feature-Driven Architecture)
│   ├── services/             # CRUD Dịch vụ pháp lý (Mẫu chuẩn theo products-feature)
│   │   ├── types/            # DTOs, interfaces
│   │   ├── schemas/          # Zod validation
│   │   ├── services/         # Axios API calls
│   │   ├── queries/          # TanStack Query keys + mutation hooks
│   │   ├── hooks/            # useServiceFilter (URL SearchParams sync)
│   │   ├── constants/        # 12 danh mục pháp lý, status badges
│   │   └── components/       # ServiceList, ServiceTable, ServiceFilters, Dialogs
│   └── page-builder/         # Khối kéo thả Puck (HeroBanner, StatsCounter, CoreValues...)
│       ├── puck.config.tsx   # Cấu hình các block trực quan
│       └── components/       # PageRenderer
├── lib/
│   ├── axios.ts              # Axios instance & ApiError
│   ├── query-client.ts       # TanStack Query SSR/Browser singleton
│   └── utils.ts              # cn, formatVND, formatReadableDate
└── types/                    # PagedListResponse, PaginationInfo
```

---

## 3. Hướng dẫn khởi chạy

### Cài đặt thư viện:
```bash
cd luatvanich_fe
npm install
```

### Chạy môi trường phát triển (Dev):
```bash
npm run dev
```
Mở trình duyệt:
- Website công khai: `http://localhost:3000` (Tự động chuyển về `http://localhost:3000/vi`)
- Bảng điều khiển quản trị: `http://localhost:3000/admin`
- Quản lý Dịch vụ pháp lý: `http://localhost:3000/admin/services`
