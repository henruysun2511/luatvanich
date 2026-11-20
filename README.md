# Luật Vạn Ích — Website Doanh Nghiệp & Nền Tảng Kéo Thả Song Ngữ (Việt - Trung)

Website chính thức và hệ thống quản trị nội dung của Hãng luật Vạn Ích (Luật sư Doanh nghiệp, Đầu tư FDI & Tranh chấp Quốc tế).

---

## 📁 Cấu trúc Dự án

```
luatvanich/
├── luatvanich_docs/     # Toàn bộ tài liệu đặc tả yêu cầu, API, DB & giao diện
├── luatvanich_fe/       # Frontend Website & Page Builder (Next.js 15 + Tailwind CSS)
└── luatvanich_be/       # Backend REST API (NestJS + TypeORM + PostgreSQL)
```

---

## 🚀 Khởi chạy Hệ thống

### 1. Backend API (`luatvanich_be`)
- **Công nghệ**: NestJS 10, TypeORM, PostgreSQL, Swagger, JWT Auth, Winston
- **Cổng mặc định**: `4000`
- **Tài liệu API (Swagger)**: `http://localhost:4000/api/docs`

```bash
cd luatvanich_be
cp .env.example .env     # Cập nhật thông tin kết nối DB và JWT_SECRET
npm install
npm run seed             # Khởi tạo roles và tài khoản admin mặc định
npm run dev
```

> **Tài khoản quản trị mặc định (sau khi seed)**:
> - Email: `admin@luatvanich.vn`
> - Mật khẩu: `Admin@2026!` *(Vui lòng đổi mật khẩu sau lần đăng nhập đầu)*

---

### 2. Frontend Website (`luatvanich_fe`)
- **Công nghệ**: Next.js 15 (App Router), React 18, Tailwind CSS, TanStack Query v5, `@measured/puck` (Page Builder)
- **Cổng mặc định**: `3000`
- **Địa chỉ truy cập**: `http://localhost:3000`

```bash
cd luatvanich_fe
cp .env.example .env     # Đã cấu hình trỏ về API http://localhost:4000/api/v1
npm install
npm run dev
```

---

## 📚 Tài liệu tham khảo (`luatvanich_docs`)

- [danh-sach-chuc-nang-website.md](luatvanich_docs/danh-sach-chuc-nang-website.md): Phân loại tính năng MVP & P2
- [danh-sach-module-va-api.md](luatvanich_docs/danh-sach-module-va-api.md): Danh mục 33 module và chi tiết API
- [mo-ta-giao-dien.md](luatvanich_docs/mo-ta-giao-dien.md): Thiết kế giao diện, phối màu Navy P1 / Đỏ đô P2
- [thiet-ke-co-so-du-lieu.md](luatvanich_docs/thiet-ke-co-so-du-lieu.md): Lược đồ 80 bảng chuẩn hóa 3NF và song ngữ
- [trien-khai-ha-tang.md](luatvanich_docs/trien-khai-ha-tang.md): Kiến trúc hạ tầng Docker & Cloud
