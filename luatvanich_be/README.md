# Luật Vạn Ích — Backend API

NestJS + TypeORM + PostgreSQL

## Khởi động nhanh

```bash
# 1. Cài dependencies
npm install

# 2. Copy env
cp .env.example .env
# Sửa .env: DB_*, JWT_SECRET (ít nhất 32 ký tự)

# 3. Tạo database PostgreSQL
createdb luatvanich

# 4. Seed dữ liệu khởi tạo (roles + admin user)
npm run seed

# 5. Chạy dev server
npm run dev
```

## URL

- API: http://localhost:4000/api/v1
- Swagger: http://localhost:4000/api/docs

## Tài khoản mặc định (sau seed)

- Email: admin@luatvanich.vn
- Password: Admin@2026!
- **⚠️ Đổi mật khẩu ngay sau khi đăng nhập lần đầu!**

## Cấu trúc module

| Module | Endpoint | Mô tả |
|---|---|---|
| auth | /api/v1/admin/auth | Đăng nhập, refresh token, đăng xuất |
| users | /api/v1/admin/users | Quản lý tài khoản |
| legal-services | /api/v1/legal-services | Public API — dịch vụ pháp lý |
| legal-services | /api/v1/admin/legal-services | Admin CRUD — dịch vụ pháp lý |

## Thêm module mới

Nhân bản cấu trúc `src/modules/legal-services/` và điều chỉnh:
1. Entity + Translation entity
2. Repository + Translation repository
3. Service (với BR comment)
4. Mapper (toAdminResponse + toPublicResponse)
5. Controller public + Controller admin
6. DTOs (request + response)
7. Exceptions
8. Import vào `app.module.ts`
