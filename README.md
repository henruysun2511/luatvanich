# Luật Vạn Ích — Website Doanh Nghiệp & Nền Tảng Kéo Thả Song Ngữ (Việt - Trung)

Website chính thức và hệ thống quản trị nội dung của Hãng luật Vạn Ích (Luật sư Doanh nghiệp, Đầu tư FDI & Tranh chấp Quốc tế).

---

## 📁 Cấu trúc Dự án

```
luatvanich/
├── luatvanich_docs/     # Toàn bộ tài liệu đặc tả yêu cầu, API, DB & giao diện
├── luatvanich_fe/       # Frontend Website & Page Builder (Next.js 15 + Tailwind CSS)
├── luatvanich_be/       # Backend REST API (NestJS + TypeORM + PostgreSQL)
└── docker-compose.yml   # Khởi chạy toàn bộ hệ thống (PostgreSQL, MinIO S3, Backend, Frontend)
```

---

## 🐳 Khởi chạy Bằng Docker (Khuyến nghị cho Triển khai / Production)

Toàn bộ hệ thống (Database, Lưu trữ S3 MinIO, Backend, Frontend) có thể khởi chạy chỉ với 1 lệnh:

```bash
docker compose up -d --build
```

### Các cổng dịch vụ Docker:
| Dịch vụ | Container | Cổng Host | Vai trò |
|---|---|---|---|
| **Frontend Web** | `luatvanich_web` | `3000` | Giao diện công khai & Admin CMS (`http://localhost:3000`) |
| **Backend API** | `luatvanich_api` | `4000` | REST API (`http://localhost:4000/api/v1`) & Swagger (`/api/docs`) |
| **MinIO API** | `luatvanich_minio` | `9000` | Cổng S3 Object Storage API cho upload/download |
| **MinIO Console** | `luatvanich_minio` | `9001` | Giao diện quản trị MinIO Web Dashboard (`http://localhost:9001`) |
| **PostgreSQL** | `luatvanich_postgres` | `5432` | Cơ sở dữ liệu chính |

> **Thông tin đăng nhập MinIO Console mặc định**:
> - Tài khoản: `admin_minio`
> - Mật khẩu: `Password@2026!`

---

## 🚀 Khởi chạy Thủ công (Môi trường Lập trình Local)

### 1. Khởi chạy MinIO & PostgreSQL qua Docker
Nếu lập trình trên máy tính và chạy code trực tiếp bằng `npm run dev`:
```bash
docker compose up -d minio postgres
```

### 2. Backend API (`luatvanich_be`)
- **Công nghệ**: NestJS 10, TypeORM, PostgreSQL, MinIO/AWS S3 SDK, Swagger, JWT Auth, Winston
- **Cổng**: `4000`

```bash
cd luatvanich_be
cp .env.example .env
npm install
npm run seed             # Khởi tạo roles và tài khoản admin mặc định
npm run dev
```

> **Tài khoản quản trị mặc định (sau khi seed)**:
> - Email: `admin@luatvanich.vn`
> - Mật khẩu: `Admin@2026!`

### 3. Frontend Website (`luatvanich_fe`)
- **Công nghệ**: Next.js 15 (App Router), React 18, Tailwind CSS, TanStack Query v5, `@measured/puck`
- **Cổng**: `3000`

```bash
cd luatvanich_fe
cp .env.example .env
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
