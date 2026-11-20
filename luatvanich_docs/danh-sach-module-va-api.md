# Danh sách module và API – Website công ty luật và bộ công cụ kéo thả

> Căn cứ: *Bản thu thập yêu cầu* (mục 1.3, mã chức năng A01–G10), *Danh sách chức năng website* (ký hiệu MVP/P2) và *Thiết kế cơ sở dữ liệu* (PostgreSQL + Prisma).
> Backend: **NestJS** (REST) · Frontend: **Next.js** · Tài liệu API: **Swagger** (E09) · Phiên bản tài liệu: 1.0 · Ngày lập: 09/11/2026

## Mục lục

1. [Quy ước chung của API](#1-quy-ước-chung-của-api)
2. [Tổng quan danh sách module](#2-tổng-quan-danh-sách-module)
3. [Chi tiết module và API](#3-chi-tiết-module-và-api)
4. [Module nền tảng (cross-cutting)](#4-module-nền-tảng-cross-cutting)
5. [Module mở rộng chưa làm (nhóm G)](#5-module-mở-rộng-chưa-làm-nhóm-g)
6. [Ma trận phân quyền đề xuất](#6-ma-trận-phân-quyền-đề-xuất)
7. [Đối chiếu mã chức năng với module](#7-đối-chiếu-mã-chức-năng-với-module)
8. [Điểm cần bổ sung hoặc xác nhận](#8-điểm-cần-bổ-sung-hoặc-xác-nhận)

---

## 1. Quy ước chung của API

### 1.1 Tiền tố đường dẫn

| Tiền tố | Dùng cho | Xác thực |
|---|---|---|
| `/api/v1/...` | API công khai cho website (Next.js gọi) | Không cần, trừ khi ghi khác |
| `/api/v1/admin/...` | API quản trị (CMS, builder, hệ thống) | JWT + quyền theo vai trò |
| `/sitemap.xml`, `/robots.txt` | Tệp SEO ở gốc tên miền | Không cần |
| `/api/docs`, `/api/docs-json` | Swagger (E09) | Chỉ bật ở môi trường dev/staging hoặc sau đăng nhập |

### 1.2 Ngôn ngữ

- API công khai nhận ngôn ngữ qua `?lang=vi|zh-CN` (mặc định `vi`) hoặc header `Accept-Language`.
- Nếu thiếu bản dịch hoặc `is_complete = false`, trả bản tiếng Việt kèm `"fallback": true` (câu hỏi 4.2.6 chờ khách chốt).
- Ký hiệu **🌐** ở tên module: tài nguyên có bảng `*_translations`. Các module này có thêm bộ endpoint dịch chuẩn (không lặp lại trong từng bảng):

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/admin/<tài-nguyên>/:id/translations` | Danh sách bản dịch của một bản ghi, kèm cờ `is_complete` |
| GET | `/admin/<tài-nguyên>/:id/translations/:lang` | Lấy một bản dịch |
| PUT | `/admin/<tài-nguyên>/:id/translations/:lang` | Tạo hoặc cập nhật bản dịch (gồm slug, SEO) |
| PATCH | `/admin/<tài-nguyên>/:id/translations/:lang/complete` | Đánh dấu bản dịch đã hoàn thiện hoặc chưa |
| DELETE | `/admin/<tài-nguyên>/:id/translations/:lang` | Xóa bản dịch |

### 1.3 Danh sách, phân trang, lỗi

| Hạng mục | Quy ước |
|---|---|
| Phân trang | `?page=1&limit=20` (tối đa 100). Phản hồi: `{ data: [], meta: { page, limit, total, totalPages } }` |
| Sắp xếp | `?sort=field:asc|desc`, nhiều trường cách nhau dấu phẩy |
| Tìm kiếm trong danh sách admin | `?q=` |
| Sắp xếp thủ công (kéo thả thứ tự) | `PATCH /<tài-nguyên>/reorder` với `{ ids: [uuid, ...] }` theo thứ tự mới |
| Lỗi | `{ statusCode, error, message, details? }`; lỗi kiểm tra dữ liệu trả `422` kèm danh sách trường |
| Giới hạn tần suất | Mặc định 100 req/phút/IP; form công khai và đăng nhập giới hạn chặt hơn (E05) |
| Kiểu dữ liệu | JSON, UTF-8; thời gian ISO 8601 UTC; tải tệp dùng `multipart/form-data` |

### 1.4 Cột "Truy cập" trong các bảng

| Giá trị | Ý nghĩa |
|---|---|
| `Public` | Ai cũng gọi được |
| `Public + Captcha` | Public, bắt buộc qua reCAPTCHA/honeypot và giới hạn tần suất |
| `Auth` | Đã đăng nhập, không cần quyền riêng |
| `res:action` | Cần quyền tương ứng, ví dụ `posts:write`, `consultations:read`. Quy ước: `read`, `write`, `publish`, `delete`, `manage` |

### 1.5 Cột "GĐ" (giai đoạn)

| Ký hiệu | Ý nghĩa |
|---|---|
| **MVP** | Bắt buộc giai đoạn 1 (theo *Danh sách chức năng website*) |
| **P2** | Giai đoạn 2 |
| **TBC** | Chưa có trong danh sách MVP/P2, chờ khách tick mức ưu tiên trong bản yêu cầu |

---

## 2. Tổng quan danh sách module

| # | Module (NestJS) | Nhóm DB | Mã chức năng chính | GĐ |
|---|---|---|---|---|
| M01 | `auth` | B. Người dùng và bảo mật | D01, D03, D04 | MVP (2FA: P2) |
| M02 | `users` + `roles` | B | D02 | MVP/P2 |
| M03 | `languages` 🌐 | A. Ngôn ngữ và cấu hình | A09, B12, G07 | P2 |
| M04 | `site-settings` | A | D11, F09, A72, A74, C21 | MVP |
| M05 | `theme` | E. Menu và giao diện | C17–C26 | MVP/P2 |
| M06 | `media` 🌐 | C. Thư viện media | B09 | MVP |
| M07 | `pages` 🌐 | D. Trang và trình kéo thả | B01, A10, A22, A25, A48, A70 | MVP |
| M08 | `page-builder` | D | C01–C16 | MVP/P2 |
| M09 | `menus` 🌐 | E | A02–A05, B08 | MVP |
| M10 | `company` 🌐 | F. Giới thiệu doanh nghiệp | A12, A13, A15, A16 | MVP |
| M11 | `partners` | F | A19, B05 | MVP |
| M12 | `achievements` 🌐 | F | A23, B06 | TBC |
| M13 | `testimonials` 🌐 | F/G | A20, B07 | P2 |
| M14 | `faqs` 🌐 | F/G | A21, A43, B07 | P2 |
| M15 | `practice-areas` 🌐 | G. Lĩnh vực và dịch vụ | A40 | MVP |
| M16 | `services` 🌐 | G | A41–A48, B03 | MVP |
| M17 | `lawyers` 🌐 | H. Luật sư và văn phòng | A26–A39, B04, 3.1–3.2 | MVP |
| M18 | `offices` 🌐 | H | A30, A70, A71 | MVP |
| M19 | `posts` 🌐 | I. Bài viết, tài liệu, bản tin | A24, A49–A54, B02, B10 | MVP |
| M20 | `comments` | I | A55 | TBC |
| M21 | `documents` 🌐 | I | A57 | TBC |
| M22 | `newsletter` | I | A58 | TBC |
| M23 | `knowledge-base` | I (dùng bảng `posts`) | A59 | P2 |
| M24 | `search` | (chỉ mục GIN) | A56, A60–A63, 3.1.2, 3.1.5 | MVP (gợi ý, tiếng Trung: TBC) |
| M25 | `consultations` | J. Yêu cầu tư vấn và đặt lịch | A64–A68, D06, D07 | MVP |
| M26 | `appointments` | J | A37, A66, A69 | TBC |
| M27 | `notifications` | J | D08, D09, A68 | MVP (Zalo/Telegram: TBC) |
| M28 | `seo` | (rải trong bảng dịch) | F01–F08 | MVP/P2 |
| M29 | `dashboard` | (tổng hợp) | D10 | TBC |
| M30 | `audit-logs` | B | D05 | P2 |
| M31 | `system` (health, backup, alert) | – | D12, D13, E12 | MVP (sao lưu) |
| M32 | `import-export` | – | B13 | TBC |
| M33 | `common` (guard, captcha, throttle, upload, mail, queue) | – | E04, E05, E06 | MVP |

---

## 3. Chi tiết module và API

### M01. `auth` – Đăng nhập và phiên

Bảng: `users`, `refresh_tokens`, `password_reset_tokens`, `user_totp_secrets`, `user_recovery_codes`, `login_attempts`.

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| POST | `/admin/auth/login` | Đăng nhập email + mật khẩu; khóa tạm khi sai nhiều lần | Public + Captcha | D01 | MVP |
| POST | `/admin/auth/login/2fa` | Bước 2: nhập mã TOTP hoặc mã dự phòng | Public | D03 | P2 |
| POST | `/admin/auth/refresh` | Đổi refresh token lấy access token mới (xoay vòng token) | Public (cookie httpOnly) | D01 | MVP |
| POST | `/admin/auth/logout` | Thu hồi refresh token hiện tại | Auth | D01 | MVP |
| POST | `/admin/auth/logout-all` | Thu hồi mọi phiên của tài khoản | Auth | D01 | MVP |
| GET | `/admin/auth/me` | Thông tin tài khoản đang đăng nhập và quyền | Auth | D01 | MVP |
| PATCH | `/admin/auth/me` | Sửa hồ sơ cá nhân (tên, ngôn ngữ giao diện) | Auth | D01 | MVP |
| PATCH | `/admin/auth/me/password` | Đổi mật khẩu (yêu cầu mật khẩu cũ) | Auth | D01 | MVP |
| GET | `/admin/auth/sessions` | Danh sách phiên đang hoạt động | Auth | D01 | P2 |
| DELETE | `/admin/auth/sessions/:id` | Thu hồi một phiên | Auth | D01 | P2 |
| POST | `/admin/auth/forgot-password` | Gửi email đặt lại mật khẩu (luôn trả thành công, tránh dò email) | Public + Captcha | D04 | MVP |
| POST | `/admin/auth/reset-password` | Đặt mật khẩu mới bằng token | Public | D04 | MVP |
| POST | `/admin/auth/2fa/setup` | Sinh khóa TOTP và mã QR | Auth | D03 | P2 |
| POST | `/admin/auth/2fa/enable` | Xác nhận mã đầu tiên, bật 2FA, trả mã dự phòng | Auth | D03 | P2 |
| POST | `/admin/auth/2fa/disable` | Tắt 2FA (yêu cầu mật khẩu) | Auth | D03 | P2 |
| POST | `/admin/auth/2fa/recovery-codes` | Sinh lại bộ mã dự phòng | Auth | D03 | P2 |

### M02. `users` + `roles` – Tài khoản và phân quyền

Bảng: `users`, `roles`, `permissions`, `role_permissions`.

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/admin/users` | Danh sách tài khoản (lọc theo vai trò, trạng thái) | `users:read` | D02 | MVP |
| POST | `/admin/users` | Tạo tài khoản, gửi email mời đặt mật khẩu | `users:write` | D02 | MVP |
| GET | `/admin/users/:id` | Chi tiết tài khoản | `users:read` | D02 | MVP |
| PATCH | `/admin/users/:id` | Sửa thông tin, đổi vai trò | `users:write` | D02 | MVP |
| PATCH | `/admin/users/:id/status` | Khóa hoặc mở khóa tài khoản | `users:write` | D02 | MVP |
| POST | `/admin/users/:id/reset-password` | Quản trị viên gửi lại email đặt mật khẩu | `users:write` | D02, D04 | MVP |
| POST | `/admin/users/:id/disable-2fa` | Gỡ 2FA khi người dùng mất thiết bị | `users:manage` | D03 | P2 |
| DELETE | `/admin/users/:id` | Xóa mềm tài khoản | `users:delete` | D02 | MVP |
| GET | `/admin/roles` | Danh sách vai trò | `users:read` | D02 | P2 |
| POST | `/admin/roles` | Tạo vai trò mới | `users:manage` | D02 | P2 |
| GET | `/admin/roles/:id` | Chi tiết vai trò và quyền | `users:read` | D02 | P2 |
| PATCH | `/admin/roles/:id` | Sửa tên, mô tả vai trò | `users:manage` | D02 | P2 |
| PUT | `/admin/roles/:id/permissions` | Gán lại toàn bộ quyền cho vai trò | `users:manage` | D02 | P2 |
| DELETE | `/admin/roles/:id` | Xóa vai trò (chặn nếu còn người dùng) | `users:manage` | D02 | P2 |
| GET | `/admin/permissions` | Danh mục quyền hệ thống (chỉ đọc) | `users:read` | D02 | P2 |

### M03. `languages` 🌐 – Ngôn ngữ

Bảng: `languages`.

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/languages` | Ngôn ngữ đang bật, ngôn ngữ mặc định (cho công tắc Việt/中文) | Public | A09 | P2 |
| GET | `/admin/languages` | Tất cả ngôn ngữ | `settings:read` | B12 | P2 |
| PATCH | `/admin/languages/:code` | Bật/tắt, đặt mặc định, sửa tên hiển thị | `settings:write` | B12, G07 | P2 |
| POST | `/admin/languages` | Thêm ngôn ngữ mới (tiếng Anh, Trung phồn thể...) | `settings:manage` | G07 | TBC |
| GET | `/admin/translations/missing` | Báo cáo nội dung chưa có bản dịch hoặc `is_complete = false`, lọc theo loại | `settings:read` | B12 | P2 |

### M04. `site-settings` – Cấu hình hệ thống

Bảng: `site_settings` (1 dòng), `site_setting_translations`, `contact_channels`, `tracking_integrations`.

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/site/bootstrap` | Gói khởi tạo cho frontend: cấu hình, theme đang dùng, menu header/footer, ngôn ngữ, kênh liên hệ nổi, mã theo dõi (1 lần gọi, có cache) | Public | A01, A05, A72 | MVP |
| GET | `/site/config` | Thông tin công ty: tên, hotline, email, địa chỉ, logo, favicon, mạng xã hội | Public | A01, A74 | MVP |
| GET | `/site/contact-channels` | Kênh liên hệ đang bật theo thứ tự (hotline, Zalo, Messenger, WeChat + mã QR) | Public | A72, A73 | MVP |
| GET | `/admin/settings` | Đọc cấu hình đầy đủ (kể cả trường nội bộ) | `settings:read` | D11 | MVP |
| PATCH | `/admin/settings` | Sửa cấu hình (thông tin công ty, logo, email nhận thư...) | `settings:write` | D11, C21 | MVP |
| PUT | `/admin/settings/translations/:lang` | Sửa chữ theo ngôn ngữ (tên công ty, slogan, địa chỉ) | `settings:write` | D11 | MVP |
| PATCH | `/admin/settings/maintenance` | Bật/tắt chế độ bảo trì và nội dung thông báo | `settings:write` | A10 | MVP |
| GET | `/admin/contact-channels` | Danh sách kênh liên hệ (kể cả đang tắt) | `settings:read` | C22 | MVP |
| POST | `/admin/contact-channels` | Thêm kênh (loại, giá trị, liên kết, mã QR) | `settings:write` | C22 | MVP |
| PATCH | `/admin/contact-channels/:id` | Sửa, bật/tắt kênh | `settings:write` | C22 | MVP |
| PATCH | `/admin/contact-channels/reorder` | Đổi thứ tự hiển thị | `settings:write` | C22 | MVP |
| DELETE | `/admin/contact-channels/:id` | Xóa kênh | `settings:write` | C22 | MVP |
| GET | `/admin/tracking-integrations` | Danh sách mã theo dõi (GA4, GTM, Search Console, Pixel, Baidu Tongji) | `settings:read` | F09 | MVP |
| PUT | `/admin/tracking-integrations/:provider` | Lưu mã và bật/tắt từng nhà cung cấp | `settings:write` | F09 | MVP |

### M05. `theme` – Tùy biến giao diện toàn site

Bảng: `themes` (màu, font, bo góc, kiểu nút/thẻ, chế độ sáng tối, hiệu ứng, biến thể header/footer/nút nổi, CSS/JS tùy chỉnh).

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/theme` | Theme đang kích hoạt dạng JSON | Public | C17–C19 | MVP |
| GET | `/theme/variables.css` | Biến CSS sinh từ theme đang dùng (cache dài, có hash phiên bản) | Public | C17 | MVP |
| GET | `/admin/themes` | Danh sách theme đã lưu | `theme:read` | C25 | P2 |
| POST | `/admin/themes` | Tạo theme (MVP chỉ có 1 theme) | `theme:write` | C25 | P2 |
| GET | `/admin/themes/active` | Theme đang dùng, kèm trạng thái khóa | `theme:read` | C17 | MVP |
| GET | `/admin/themes/:id` | Chi tiết theme | `theme:read` | C17 | MVP |
| PATCH | `/admin/themes/:id` | Sửa màu, font, bo góc, kiểu nút/thẻ, hiệu ứng (kiểm tra bảng màu, font cho phép) | `theme:write` | C17–C19 | MVP |
| PATCH | `/admin/themes/:id/layout` | Chọn biến thể header, footer, nút liên hệ nổi (vị trí, kiểu) | `theme:write` | C21, C22 | MVP |
| PATCH | `/admin/themes/:id/logo` | Gán logo, favicon từ thư viện media | `theme:write` | C20 | MVP |
| PATCH | `/admin/themes/:id/custom-code` | Lưu CSS/JS tùy chỉnh (kiểm duyệt, chỉ vai trò cao nhất) | `theme:manage` | C24 | P2 |
| PATCH | `/admin/themes/:id/color-mode` | Chế độ sáng/tối/theo hệ thống | `theme:write` | C23 | P2 |
| POST | `/admin/themes/:id/activate` | Đặt làm theme đang dùng | `theme:write` | C25 | P2 |
| POST | `/admin/themes/:id/duplicate` | Nhân bản theme | `theme:write` | C25 | P2 |
| DELETE | `/admin/themes/:id` | Xóa theme (không xóa được theme đang dùng) | `theme:write` | C25 | P2 |
| GET | `/admin/themes/options` | Bảng màu và danh sách font cho phép (đã chọn lọc, hỗ trợ tiếng Việt) | `theme:read` | C17, C18 | MVP |
| PUT | `/admin/themes/brand-lock` | Khóa/mở khóa phần thương hiệu (logo, màu chính) | `theme:manage` | C26 | TBC |

### M06. `media` 🌐 – Thư viện media

Bảng: `media_folders`, `media_files`, `media_file_translations` (alt text).

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/admin/media/files` | Danh sách, lọc theo thư mục, loại, từ khóa | `media:read` | B09 | MVP |
| POST | `/admin/media/files` | Tải lên 1 tệp (kiểm tra định dạng, dung lượng, quét MIME; tự nén, sinh WebP và các kích cỡ) | `media:write` | B09, E07 | MVP |
| POST | `/admin/media/files/bulk` | Tải lên nhiều tệp | `media:write` | B09 | MVP |
| GET | `/admin/media/files/:id` | Chi tiết tệp, các kích cỡ đã sinh | `media:read` | B09 | MVP |
| PATCH | `/admin/media/files/:id` | Đổi tên, chuyển thư mục | `media:write` | B09 | MVP |
| PUT | `/admin/media/files/:id/translations/:lang` | Sửa alt text, chú thích theo ngôn ngữ | `media:write` | B09 | MVP |
| GET | `/admin/media/files/:id/usage` | Tệp đang được dùng ở đâu (trang, bài, luật sư...) | `media:read` | B09 | MVP |
| DELETE | `/admin/media/files/:id` | Xóa tệp (cảnh báo/chặn nếu đang được dùng) | `media:delete` | B09 | MVP |
| POST | `/admin/media/files/bulk-delete` | Xóa nhiều tệp | `media:delete` | B09 | MVP |
| GET | `/admin/media/folders` | Cây thư mục | `media:read` | B09 | MVP |
| POST | `/admin/media/folders` | Tạo thư mục | `media:write` | B09 | MVP |
| PATCH | `/admin/media/folders/:id` | Đổi tên, di chuyển thư mục | `media:write` | B09 | MVP |
| DELETE | `/admin/media/folders/:id` | Xóa thư mục (phải rỗng hoặc chuyển tệp đi) | `media:delete` | B09 | MVP |

### M07. `pages` 🌐 – Trang

Bảng: `pages`, `page_translations`. Loại trang: `home`, `static`, `system`, `landing`, `legal`.

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/pages/home` | Trang chủ đã xuất bản (JSON khối + SEO) | Public | A11–A21 | MVP |
| GET | `/pages/by-slug/:slug` | Trang theo đường dẫn và ngôn ngữ; trả kèm breadcrumb và SEO | Public | A22, A25, A70 | MVP |
| GET | `/pages/system/:key` | Trang hệ thống: `404`, `maintenance`, `thank-you`, `search` | Public | A10, A68 | MVP |
| GET | `/pages/slugs` | Danh sách đường dẫn đã xuất bản (cho `generateStaticParams`, sitemap) | Public | F04 | MVP |
| GET | `/admin/pages` | Danh sách trang (lọc loại, trạng thái, ngôn ngữ, từ khóa) | `pages:read` | B01 | MVP |
| GET | `/admin/pages/tree` | Cây trang cha–con | `pages:read` | B01, A06 | MVP |
| POST | `/admin/pages` | Tạo trang | `pages:write` | B01 | MVP |
| GET | `/admin/pages/:id` | Chi tiết trang | `pages:read` | B01 | MVP |
| PATCH | `/admin/pages/:id` | Sửa thuộc tính chung (loại, trang cha, thứ tự, bố cục) | `pages:write` | B01 | MVP |
| PATCH | `/admin/pages/:id/status` | Đổi trạng thái (nháp, chờ duyệt, đã đăng, lưu trữ) | `pages:publish` | B01, B10 | MVP |
| POST | `/admin/pages/:id/duplicate` | Nhân bản trang | `pages:write` | C11 | P2 |
| POST | `/admin/pages/:id/schedule` | Đặt lịch xuất bản (`publish_at`) | `pages:publish` | B02, C07 | P2 |
| DELETE | `/admin/pages/:id` | Xóa trang (không cho xóa trang hệ thống) | `pages:delete` | B01 | MVP |
| GET | `/admin/pages/slug-check` | Kiểm tra đường dẫn đã bị trùng chưa | `pages:read` | F02 | MVP |

Bộ endpoint dịch chuẩn (mục 1.2) áp dụng cho `/admin/pages/:id/translations/:lang`.

### M08. `page-builder` – Trình kéo thả

Bảng: `page_versions`, `page_preview_links`, `page_templates`, `saved_blocks` (tên bảng mẫu và khối lưu theo mô tả `content_json` của thiết kế DB).

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/admin/builder/blocks` | Thư viện khối: loại, nhóm, biểu tượng, giai đoạn (khối nào bật) | `pages:read` | C08, C10 | MVP |
| GET | `/admin/builder/blocks/:type/schema` | Lược đồ thuộc tính của một khối (cho bảng thuộc tính bên phải) | `pages:read` | C04 | MVP |
| POST | `/admin/builder/validate` | Kiểm tra `content_json` theo lược đồ (zod) trước khi lưu | `pages:write` | C01 | MVP |
| POST | `/admin/builder/resolve` | Lấy dữ liệu cho khối động (dịch vụ, luật sư, đối tác, bài mới) để xem trước trong editor | `pages:read` | C09 | MVP |
| GET | `/admin/pages/:id/translations/:lang/content` | Nạp nội dung `content_json` để mở trong editor | `pages:read` | C01 | MVP |
| PUT | `/admin/pages/:id/translations/:lang/draft` | Lưu nháp / tự động lưu (không đổi bản đã đăng, kiểm tra `updated_at` chống ghi đè) | `pages:write` | C07 | MVP |
| POST | `/admin/pages/:id/translations/:lang/publish` | Xuất bản: chép nháp sang bản đăng, ghi phiên bản, xóa cache | `pages:publish` | C07 | MVP |
| POST | `/admin/pages/:id/translations/:lang/unpublish` | Gỡ về nháp | `pages:publish` | C07 | MVP |
| GET | `/admin/pages/:id/translations/:lang/versions` | Lịch sử phiên bản | `pages:read` | B11 | P2 |
| GET | `/admin/pages/:id/translations/:lang/versions/:versionId` | Xem một phiên bản | `pages:read` | B11 | P2 |
| POST | `/admin/pages/:id/translations/:lang/versions/:versionId/restore` | Khôi phục bản cũ (tạo phiên bản mới từ bản cũ) | `pages:publish` | B11 | P2 |
| GET | `/admin/pages/:id/preview-links` | Liên kết xem trước đã tạo | `pages:read` | C15 | P2 |
| POST | `/admin/pages/:id/preview-links` | Tạo liên kết xem trước chia sẻ cho người duyệt (có hạn dùng, có thể gắn mật khẩu) | `pages:write` | C15 | P2 |
| DELETE | `/admin/preview-links/:id` | Thu hồi liên kết | `pages:write` | C15 | P2 |
| GET | `/preview/:token` | Xem nội dung nháp bằng liên kết chia sẻ (gắn `noindex`) | Public (có token) | C15 | P2 |
| GET | `/admin/page-templates` | Danh sách mẫu trang dựng sẵn | `pages:read` | C11 | P2 |
| POST | `/admin/page-templates` | Lưu một trang thành mẫu | `pages:write` | C11 | P2 |
| PATCH | `/admin/page-templates/:id` | Sửa tên, mô tả mẫu | `pages:write` | C11 | P2 |
| DELETE | `/admin/page-templates/:id` | Xóa mẫu | `pages:write` | C11 | P2 |
| POST | `/admin/pages/from-template/:templateId` | Tạo trang mới từ mẫu | `pages:write` | C11 | P2 |
| GET | `/admin/saved-blocks` | Khối tự tạo đã lưu để dùng lại | `pages:read` | C12 | P2 |
| POST | `/admin/saved-blocks` | Lưu khối đang chọn thành mẫu | `pages:write` | C12 | P2 |
| PATCH | `/admin/saved-blocks/:id` | Sửa tên, nội dung khối đã lưu | `pages:write` | C12 | P2 |
| DELETE | `/admin/saved-blocks/:id` | Xóa khối đã lưu | `pages:write` | C12 | P2 |

> Các thao tác không cần API riêng vì xử lý trong trình duyệt: kéo thả, đổi thứ tự, nhân bản/xóa khối, undo/redo, xem trước theo thiết bị, ẩn/hiện khối theo thiết bị, hiệu ứng khi cuộn (C02, C03, C05, C06, C13, C14). Dữ liệu của chúng nằm trong `content_json`.
> Admin tự tạo khối mới (C16) không có API: khối mới do bên phát triển thêm vào mã nguồn và xuất hiện qua `/admin/builder/blocks`.

### M09. `menus` 🌐 – Menu

Bảng: `menus`, `menu_items`, `menu_item_translations`. Mục menu trỏ tới trang, dịch vụ, chuyên mục hoặc đường dẫn ngoài.

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/menus/:location` | Menu đã dựng cây theo vị trí `header`, `footer`, `mobile` (kèm dữ liệu mega menu Dịch vụ) | Public | A02–A05 | MVP |
| GET | `/admin/menus` | Danh sách menu | `menus:read` | B08 | MVP |
| POST | `/admin/menus` | Tạo menu | `menus:write` | B08 | MVP |
| GET | `/admin/menus/:id` | Chi tiết menu kèm cây mục | `menus:read` | B08 | MVP |
| PATCH | `/admin/menus/:id` | Sửa thông tin menu | `menus:write` | B08 | MVP |
| PUT | `/admin/menus/:id/items` | Lưu toàn bộ cây mục sau khi kéo thả (cha–con, thứ tự) | `menus:write` | B08 | MVP |
| POST | `/admin/menus/:id/items` | Thêm một mục | `menus:write` | B08 | MVP |
| PATCH | `/admin/menu-items/:id` | Sửa mục (loại liên kết, đích, mở tab mới, bật mega menu) | `menus:write` | B08, A03 | MVP |
| PUT | `/admin/menu-items/:id/translations/:lang` | Sửa nhãn theo ngôn ngữ | `menus:write` | B08, B12 | MVP |
| DELETE | `/admin/menu-items/:id` | Xóa mục | `menus:write` | B08 | MVP |
| DELETE | `/admin/menus/:id` | Xóa menu | `menus:write` | B08 | MVP |

### M10. `company` 🌐 – Số liệu nổi bật và giá trị cốt lõi

Bảng: `stat_items` (con số quảng bá nhập tay) và bảng giá trị cốt lõi (chưa thấy tên trong phần trích của tài liệu DB, xem mục 8).

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/company/stats` | Dãy số liệu nổi bật (10+ năm, 1000+ hồ sơ...) | Public | A12 | MVP |
| GET | `/company/core-values` | Giá trị cốt lõi (biểu tượng, tiêu đề, mô tả) | Public | A15, A22 | MVP |
| GET | `/admin/company/stats` | Danh sách số liệu | `content:read` | A12 | MVP |
| POST | `/admin/company/stats` | Thêm số liệu | `content:write` | A12 | MVP |
| PATCH | `/admin/company/stats/:id` | Sửa số liệu | `content:write` | A12 | MVP |
| PATCH | `/admin/company/stats/reorder` | Đổi thứ tự | `content:write` | A12 | MVP |
| DELETE | `/admin/company/stats/:id` | Xóa số liệu | `content:write` | A12 | MVP |
| GET, POST | `/admin/company/core-values` | Danh sách, thêm giá trị cốt lõi | `content:read` / `content:write` | A15 | MVP |
| PATCH, DELETE | `/admin/company/core-values/:id` | Sửa, xóa | `content:write` | A15 | MVP |
| PATCH | `/admin/company/core-values/reorder` | Đổi thứ tự | `content:write` | A15 | MVP |

Trang "Về chúng tôi", "Văn hóa kinh doanh Việt – Trung", câu chuyện thương hiệu (A13, A16, A22) là trang kéo thả của M07/M08, không có endpoint riêng.

### M11. `partners` – Đối tác

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/partners` | Logo đối tác đang hiển thị theo thứ tự (cho slider) | Public | A19 | MVP |
| GET | `/admin/partners` | Danh sách đối tác | `content:read` | B05 | MVP |
| POST | `/admin/partners` | Thêm đối tác (logo từ media, tên, liên kết) | `content:write` | B05 | MVP |
| GET | `/admin/partners/:id` | Chi tiết | `content:read` | B05 | MVP |
| PATCH | `/admin/partners/:id` | Sửa, bật/tắt hiển thị | `content:write` | B05 | MVP |
| PATCH | `/admin/partners/reorder` | Đổi thứ tự | `content:write` | B05 | MVP |
| DELETE | `/admin/partners/:id` | Xóa | `content:write` | B05 | MVP |

### M12. `achievements` 🌐 – Thành tựu, giải thưởng, chứng nhận

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/achievements` | Danh sách thành tựu (ảnh, năm), lọc theo loại, năm | Public | A23 | TBC |
| GET | `/admin/achievements` | Danh sách | `content:read` | B06 | TBC |
| POST | `/admin/achievements` | Thêm | `content:write` | B06 | TBC |
| GET | `/admin/achievements/:id` | Chi tiết | `content:read` | B06 | TBC |
| PATCH | `/admin/achievements/:id` | Sửa | `content:write` | B06 | TBC |
| PATCH | `/admin/achievements/reorder` | Đổi thứ tự | `content:write` | B06 | TBC |
| DELETE | `/admin/achievements/:id` | Xóa | `content:write` | B06 | TBC |

### M13. `testimonials` 🌐 – Lời chứng thực khách hàng

Bảng: `testimonials` (gắn tùy chọn với `services`). Chỉ hiển thị khi khách đã cho phép công khai (câu hỏi 1.4.4).

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/testimonials` | Danh sách đã duyệt; lọc `?service=` | Public | A20 | P2 |
| GET | `/admin/testimonials` | Danh sách | `content:read` | B07 | P2 |
| POST | `/admin/testimonials` | Thêm (trích dẫn, tên, công ty, ảnh) | `content:write` | B07 | P2 |
| GET | `/admin/testimonials/:id` | Chi tiết | `content:read` | B07 | P2 |
| PATCH | `/admin/testimonials/:id` | Sửa, bật/tắt hiển thị | `content:write` | B07 | P2 |
| PATCH | `/admin/testimonials/reorder` | Đổi thứ tự | `content:write` | B07 | P2 |
| DELETE | `/admin/testimonials/:id` | Xóa | `content:write` | B07 | P2 |

### M14. `faqs` 🌐 – Hỏi đáp thường gặp

Bảng: `faqs` (gắn tùy chọn với `services`; không gắn là FAQ chung).

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/faqs` | Danh sách FAQ chung; lọc `?service=` cho FAQ riêng từng dịch vụ | Public | A21, A43 | P2 |
| GET | `/admin/faqs` | Danh sách | `content:read` | B07 | P2 |
| POST | `/admin/faqs` | Thêm câu hỏi | `content:write` | B07 | P2 |
| GET | `/admin/faqs/:id` | Chi tiết | `content:read` | B07 | P2 |
| PATCH | `/admin/faqs/:id` | Sửa, gắn hoặc bỏ gắn dịch vụ | `content:write` | B07, A43 | P2 |
| PATCH | `/admin/faqs/reorder` | Đổi thứ tự | `content:write` | B07 | P2 |
| DELETE | `/admin/faqs/:id` | Xóa | `content:write` | B07 | P2 |

### M15. `practice-areas` 🌐 – Lĩnh vực pháp lý

Bảng: `practice_areas`, `practice_area_translations`. Là nhóm cha của dịch vụ, nhãn chuyên môn của luật sư và bộ lọc.

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/practice-areas` | Danh sách lĩnh vực (kèm số dịch vụ, số luật sư nếu cần) | Public | A28, A40 | MVP |
| GET | `/practice-areas/:slug` | Chi tiết lĩnh vực kèm các dịch vụ thuộc lĩnh vực | Public | A40 | MVP |
| GET | `/admin/practice-areas` | Danh sách | `services:read` | B03, B04 | MVP |
| POST | `/admin/practice-areas` | Tạo | `services:write` | B03 | MVP |
| GET | `/admin/practice-areas/:id` | Chi tiết | `services:read` | B03 | MVP |
| PATCH | `/admin/practice-areas/:id` | Sửa | `services:write` | B03 | MVP |
| PATCH | `/admin/practice-areas/reorder` | Đổi thứ tự | `services:write` | B03 | MVP |
| DELETE | `/admin/practice-areas/:id` | Xóa (chặn nếu còn dịch vụ hoặc luật sư) | `services:delete` | B03 | MVP |

### M16. `services` 🌐 – Dịch vụ pháp lý

Bảng: `services`, `service_translations`, `service_process_steps`, `service_price_items`, `post_services`. Luật sư phụ trách là dữ liệu dẫn xuất (cùng `practice_area_id`).

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/services` | Danh sách dịch vụ, lọc `?area=`, `?featured=` (trang tổng hợp, lưới trang chủ, mega menu) | Public | A03, A14, A40 | MVP |
| GET | `/services/:slug` | Trang chi tiết: nội dung, phạm vi, quy trình, bảng giá, FAQ riêng, breadcrumb, SEO | Public | A41–A43, A46 | MVP |
| GET | `/services/:slug/lawyers` | Luật sư phụ trách (suy ra từ lĩnh vực) | Public | A44 | MVP |
| GET | `/services/:slug/posts` | Bài viết liên quan (chọn tay qua `post_services`, bổ sung theo thẻ) | Public | A45 | MVP |
| POST | `/services/:slug/estimate` | Công cụ ước tính chi phí | Public + Captcha | A47 | TBC |
| GET | `/admin/services` | Danh sách (lọc lĩnh vực, trạng thái) | `services:read` | B03 | MVP |
| POST | `/admin/services` | Tạo dịch vụ | `services:write` | B03 | MVP |
| GET | `/admin/services/:id` | Chi tiết | `services:read` | B03 | MVP |
| PATCH | `/admin/services/:id` | Sửa thuộc tính chung (lĩnh vực, ảnh, nổi bật, thứ tự) | `services:write` | B03 | MVP |
| PATCH | `/admin/services/:id/status` | Đổi trạng thái đăng | `services:publish` | B03 | MVP |
| PATCH | `/admin/services/reorder` | Đổi thứ tự hiển thị | `services:write` | B03 | MVP |
| DELETE | `/admin/services/:id` | Xóa | `services:delete` | B03 | MVP |
| GET | `/admin/services/:id/process-steps` | Các bước quy trình và tài liệu cần chuẩn bị | `services:read` | A42 | MVP |
| POST | `/admin/services/:id/process-steps` | Thêm bước | `services:write` | A42 | MVP |
| PATCH | `/admin/service-process-steps/:stepId` | Sửa bước (kèm bản dịch qua `translations/:lang`) | `services:write` | A42 | MVP |
| PATCH | `/admin/services/:id/process-steps/reorder` | Đổi thứ tự bước | `services:write` | A42 | MVP |
| DELETE | `/admin/service-process-steps/:stepId` | Xóa bước | `services:write` | A42 | MVP |
| GET | `/admin/services/:id/price-items` | Bảng giá dịch vụ | `services:read` | A46 | P2 |
| POST | `/admin/services/:id/price-items` | Thêm dòng giá (loại tính phí, số tiền, tiền tệ, hoặc "liên hệ") | `services:write` | A46 | P2 |
| PATCH | `/admin/service-price-items/:priceId` | Sửa dòng giá | `services:write` | A46 | P2 |
| DELETE | `/admin/service-price-items/:priceId` | Xóa dòng giá | `services:write` | A46 | P2 |
| PUT | `/admin/services/:id/posts` | Gán danh sách bài viết liên quan (chọn tay) | `services:write` | A45, 4.2.7 | MVP |

Trang đích quảng cáo riêng (A48) dùng `pages` loại `landing`.

### M17. `lawyers` 🌐 – Luật sư

Bảng: `lawyers`, `lawyer_translations`, `lawyer_positions`, `lawyer_languages`, `lawyer_practice_areas`, `lawyer_credentials`. Số năm kinh nghiệm tính từ `practice_start_date`.

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/lawyers` | Danh sách có lọc: `q`, `area`, `language`, `office`, `position`, `experienceMin`, `sort`, phân trang (hoặc tải thêm) | Public | A26, A28–A33 | MVP |
| GET | `/lawyers/suggest` | Gợi ý tự động khi gõ tên/từ khóa (`?q=`, tối đa 8 kết quả) | Public | A27 | P2 |
| GET | `/lawyers/filters` | Dữ liệu cho bộ lọc: lĩnh vực, ngôn ngữ, văn phòng, chức danh (kèm số lượng) | Public | A28–A31 | MVP |
| GET | `/lawyers/featured` | Luật sư hiển thị ở trang chủ theo thứ tự admin đặt | Public | A17 | MVP |
| GET | `/lawyers/:slug` | Hồ sơ: tiểu sử, học vấn, chứng chỉ, ngôn ngữ, chuyên môn, văn phòng, SEO | Public | A34, A35 | MVP |
| GET | `/lawyers/:slug/posts` | Bài viết do luật sư viết | Public | A36 | MVP |
| GET | `/lawyers/:slug/services` | Dịch vụ liên quan chuyên môn của luật sư | Public | A35 | MVP |
| GET | `/lawyers/:slug/vcard` | Tải danh thiếp điện tử `.vcf` | Public | A38 | TBC |
| GET | `/lawyers/:slug/profile.pdf` | Tải hồ sơ năng lực PDF (sinh từ dữ liệu hoặc tệp đính kèm) | Public | A38 | TBC |
| GET | `/admin/lawyers` | Danh sách (lọc trạng thái, văn phòng) | `lawyers:read` | B04 | MVP |
| POST | `/admin/lawyers` | Tạo hồ sơ | `lawyers:write` | B04 | MVP |
| GET | `/admin/lawyers/:id` | Chi tiết đầy đủ | `lawyers:read` | B04 | MVP |
| PATCH | `/admin/lawyers/:id` | Sửa thuộc tính chung (ảnh, chức danh, văn phòng, ngày hành nghề, tài khoản liên kết) | `lawyers:write` | B04 | MVP |
| PATCH | `/admin/lawyers/:id/status` | Đổi trạng thái đăng | `lawyers:publish` | B04 | MVP |
| PUT | `/admin/lawyers/:id/languages` | Gán ngôn ngữ làm việc | `lawyers:write` | A29, B04 | MVP |
| PUT | `/admin/lawyers/:id/practice-areas` | Gán lĩnh vực chuyên môn | `lawyers:write` | A28, B04 | MVP |
| GET | `/admin/lawyers/:id/credentials` | Học vấn, chứng chỉ, hội viên, giải thưởng, vụ việc tiêu biểu | `lawyers:read` | A34 | MVP |
| POST | `/admin/lawyers/:id/credentials` | Thêm mục (kèm `kind`) | `lawyers:write` | A34 | MVP |
| PATCH | `/admin/lawyer-credentials/:credId` | Sửa (kèm bản dịch qua `translations/:lang`) | `lawyers:write` | A34 | MVP |
| DELETE | `/admin/lawyer-credentials/:credId` | Xóa | `lawyers:write` | A34 | MVP |
| PATCH | `/admin/lawyers/reorder` | Đổi thứ tự hiển thị | `lawyers:write` | A32 | MVP |
| DELETE | `/admin/lawyers/:id` | Xóa | `lawyers:delete` | B04 | MVP |
| GET | `/admin/lawyer-positions` | Danh sách chức danh | `lawyers:read` | A31 | MVP |
| POST | `/admin/lawyer-positions` | Thêm chức danh | `lawyers:write` | A31 | MVP |
| PATCH | `/admin/lawyer-positions/:id` | Sửa (kèm bản dịch); `PATCH .../reorder` đổi thứ tự | `lawyers:write` | A31 | MVP |
| DELETE | `/admin/lawyer-positions/:id` | Xóa (chặn nếu còn luật sư) | `lawyers:write` | A31 | MVP |

### M18. `offices` 🌐 – Văn phòng

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/offices` | Danh sách văn phòng: địa chỉ, giờ làm việc, tọa độ bản đồ, mã QR WeChat | Public | A30, A70, A71 | MVP |
| GET | `/offices/:id` | Chi tiết một văn phòng | Public | A70 | MVP |
| GET | `/admin/offices` | Danh sách | `settings:read` | A70 | MVP |
| POST | `/admin/offices` | Thêm văn phòng | `settings:write` | A70 | MVP |
| PATCH | `/admin/offices/:id` | Sửa | `settings:write` | A70 | MVP |
| PATCH | `/admin/offices/reorder` | Đổi thứ tự | `settings:write` | A70 | MVP |
| DELETE | `/admin/offices/:id` | Xóa (chặn nếu còn luật sư) | `settings:write` | A70 | MVP |

### M19. `posts` 🌐 – Bài viết, chuyên mục, thẻ

Bảng: `post_categories` (thuộc `section`: `news`, `handbook`, `knowledge_base`), `posts`, `post_translations`, `tags`, `post_tags`, `post_services`. Mục lục tự động, thời gian đọc, bài liên quan là dữ liệu dẫn xuất.

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/post-categories` | Cây chuyên mục, lọc `?section=` | Public | A24, A49 | MVP |
| GET | `/posts` | Danh sách: `section`, `category`, `tag`, `author`, `service`, `q`, phân trang | Public | A24, A49, A56 | MVP |
| GET | `/posts/latest` | Bài mới nhất (khối "Tiêu điểm luật"); `?limit=&category=` | Public | A18 | MVP |
| GET | `/posts/:slug` | Chi tiết: nội dung, tác giả, mục lục tự động, thời gian đọc, SEO, bài trước/sau | Public | A50–A52 | MVP |
| GET | `/posts/:slug/related` | Bài liên quan (cùng chuyên mục, chung thẻ) | Public | A53 | MVP |
| POST | `/posts/:slug/view` | Ghi nhận lượt xem (giới hạn theo IP, bỏ qua bot) | Public | D10 | TBC |
| GET | `/tags` | Danh sách thẻ | Public | A53 | MVP |
| GET | `/tags/:slug/posts` | Bài theo thẻ | Public | A53 | MVP |
| GET | `/admin/post-categories` | Danh sách chuyên mục | `posts:read` | B02 | MVP |
| POST | `/admin/post-categories` | Tạo chuyên mục | `posts:manage` | B02 | MVP |
| PATCH | `/admin/post-categories/:id` | Sửa (cha, thứ tự, `section`) | `posts:manage` | B02 | MVP |
| DELETE | `/admin/post-categories/:id` | Xóa (chặn nếu còn bài) | `posts:manage` | B02 | MVP |
| GET | `/admin/tags` | Danh sách thẻ | `posts:read` | A53 | MVP |
| POST | `/admin/tags` | Tạo thẻ (kèm bản dịch) | `posts:write` | A53 | MVP |
| PATCH | `/admin/tags/:id` | Sửa thẻ | `posts:write` | A53 | MVP |
| DELETE | `/admin/tags/:id` | Xóa thẻ | `posts:manage` | A53 | MVP |
| GET | `/admin/posts` | Danh sách (lọc trạng thái, chuyên mục, tác giả, ngôn ngữ) | `posts:read` | B02 | MVP |
| POST | `/admin/posts` | Tạo bài viết | `posts:write` | B02 | MVP |
| GET | `/admin/posts/:id` | Chi tiết | `posts:read` | B02 | MVP |
| PATCH | `/admin/posts/:id` | Sửa thuộc tính chung (chuyên mục, ảnh đại diện, tác giả, thẻ) | `posts:write` | B02 | MVP |
| PUT | `/admin/posts/:id/tags` | Gán thẻ | `posts:write` | A53 | MVP |
| PUT | `/admin/posts/:id/services` | Gán dịch vụ liên quan | `posts:write` | A45 | MVP |
| POST | `/admin/posts/:id/submit-review` | Người viết gửi duyệt (`draft → in_review`) | `posts:write` | B10 | P2 |
| POST | `/admin/posts/:id/approve` | Biên tập duyệt (`in_review → scheduled/published`) | `posts:publish` | B10 | P2 |
| POST | `/admin/posts/:id/reject` | Trả về nháp kèm lý do | `posts:publish` | B10 | P2 |
| POST | `/admin/posts/:id/publish` | Đăng ngay | `posts:publish` | B02 | MVP |
| POST | `/admin/posts/:id/schedule` | Lên lịch đăng (`publish_at`) | `posts:publish` | B02 | MVP |
| POST | `/admin/posts/:id/archive` | Lưu trữ | `posts:publish` | B02 | MVP |
| POST | `/admin/posts/:id/duplicate` | Nhân bản bài | `posts:write` | B02 | P2 |
| DELETE | `/admin/posts/:id` | Xóa | `posts:delete` | B02 | MVP |
| GET | `/admin/posts/:id/preview` | Xem trước bản nháp (trả JSON hoặc link) | `posts:read` | B02 | MVP |

Tác vụ định kỳ (cron/queue): mỗi phút chuyển bài `scheduled` có `publish_at <= now()` sang `published` và xóa cache.

### M20. `comments` – Bình luận (có duyệt trước)

Bảng: `comments` (hỗ trợ trả lời lồng nhau, `status`: `pending`, `approved`, `rejected`, `spam`).

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/posts/:slug/comments` | Bình luận đã duyệt dạng cây | Public | A55 | TBC |
| POST | `/posts/:slug/comments` | Gửi bình luận (vào trạng thái `pending`) | Public + Captcha | A55 | TBC |
| GET | `/admin/comments` | Danh sách, lọc theo trạng thái, bài viết | `comments:read` | A55 | TBC |
| PATCH | `/admin/comments/:id/status` | Duyệt, từ chối, đánh dấu spam | `comments:manage` | A55 | TBC |
| POST | `/admin/comments/:id/reply` | Quản trị viên trả lời | `comments:manage` | A55 | TBC |
| POST | `/admin/comments/bulk-status` | Đổi trạng thái hàng loạt | `comments:manage` | A55 | TBC |
| DELETE | `/admin/comments/:id` | Xóa | `comments:manage` | A55 | TBC |

### M21. `documents` 🌐 – Tài liệu, biểu mẫu tải về

Bảng: `documents`, `document_translations`, `document_downloads`.

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/documents` | Danh sách tài liệu, lọc theo chuyên mục | Public | A57 | TBC |
| GET | `/documents/:slug` | Chi tiết tài liệu | Public | A57 | TBC |
| POST | `/documents/:slug/download` | Yêu cầu tải: nếu bắt buộc để lại email thì gửi `email, consent` và nhận liên kết có hạn; ghi vào `document_downloads` | Public + Captcha | A57 | TBC |
| GET | `/documents/download/:token` | Tải tệp bằng token một lần/có hạn | Public (token) | A57 | TBC |
| GET | `/admin/documents` | Danh sách | `documents:read` | A57 | TBC |
| POST | `/admin/documents` | Thêm (chọn tệp từ media, bật/tắt yêu cầu email) | `documents:write` | A57 | TBC |
| GET | `/admin/documents/:id` | Chi tiết | `documents:read` | A57 | TBC |
| PATCH | `/admin/documents/:id` | Sửa | `documents:write` | A57 | TBC |
| GET | `/admin/documents/:id/downloads` | Lượt tải và email đã để lại | `documents:read` | A57 | TBC |
| GET | `/admin/documents/:id/downloads/export` | Xuất danh sách ra Excel | `documents:read` | A57, D07 | TBC |
| DELETE | `/admin/documents/:id` | Xóa | `documents:write` | A57 | TBC |

### M22. `newsletter` – Đăng ký nhận bản tin

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| POST | `/newsletter/subscribe` | Đăng ký (email, ngôn ngữ, đồng ý); gửi email xác nhận | Public + Captcha | A58 | TBC |
| GET | `/newsletter/confirm` | Xác nhận email bằng token (`?token=`) | Public | A58 | TBC |
| POST | `/newsletter/unsubscribe` | Hủy đăng ký bằng token | Public | A58 | TBC |
| GET | `/admin/newsletter/subscribers` | Danh sách người đăng ký, lọc trạng thái | `newsletter:read` | A58 | TBC |
| GET | `/admin/newsletter/subscribers/export` | Xuất Excel/CSV | `newsletter:read` | A58, D07 | TBC |
| DELETE | `/admin/newsletter/subscribers/:id` | Xóa (quyền được xóa dữ liệu cá nhân) | `newsletter:manage` | A58 | TBC |

Gửi email marketing hàng loạt (G04) chưa nằm trong phạm vi.

### M23. `knowledge-base` – Kho tri thức tiếng Trung

Dùng chung bảng `posts` với `post_categories.section = knowledge_base`. Module này chỉ cung cấp tuyến đường tiện dụng cho 6 chủ đề (Dân sự, Đăng ký công ty, Lao động, Thuế, Hình sự, Tố tụng). Quản trị dùng endpoint của M19.

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/knowledge-base/topics` | 6 chủ đề kèm số bài | Public | A59 | P2 |
| GET | `/knowledge-base/topics/:slug` | Chủ đề và danh sách bài (phân trang) | Public | A59 | P2 |
| GET | `/knowledge-base/articles/:slug` | Chi tiết bài kho tri thức | Public | A59 | P2 |

### M24. `search` – Tìm kiếm toàn site

Dùng chỉ mục toàn văn GIN trên các bảng dịch. Tìm tiếng Việt không dấu dùng extension `unaccent`; tiếng Trung cần cấu hình riêng (ví dụ `pg_trgm` hoặc `zhparser`).

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/search` | Tìm dịch vụ, luật sư, bài viết; kết quả chia nhóm; `?q=&type=&lang=&page=` | Public | A60, A62, A63 | MVP |
| GET | `/search/suggest` | Gợi ý khi gõ (`?q=`) | Public | A61, A27 | P2 |
| POST | `/admin/search/reindex` | Dựng lại chỉ mục (dùng sau khi nhập dữ liệu hàng loạt) | `settings:manage` | A63 | P2 |

Tìm trong blog (A56) dùng `GET /posts?q=`.

### M25. `consultations` – Yêu cầu tư vấn

Bảng: `consultation_requests`, `consultation_attachments`, `consultation_notes`. Trạng thái: `new`, `in_progress`, `done`, `spam`.

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/consultations/form-config` | Cấu hình form: trường bắt buộc, lĩnh vực, ngôn ngữ, nội dung đồng ý, giới hạn tệp, khóa reCAPTCHA | Public | A64, A66, A67 | MVP |
| POST | `/consultations/attachments` | Tải tệp đính kèm tạm (kiểm tra định dạng, dung lượng, quét virus); trả `attachmentToken` | Public + Captcha | A65 | TBC |
| POST | `/consultations` | Gửi yêu cầu (họ tên, công ty, SĐT, email, WeChat/Zalo, `practice_area_id`, `lawyer_id` tùy chọn, nội dung, ngôn ngữ, cách và giờ liên hệ, `consent`, tệp đính kèm); lưu, gửi thông báo và email xác nhận | Public + Captcha | A64, A37, A66–A68 | MVP |
| GET | `/admin/consultations` | Danh sách: lọc trạng thái, lĩnh vực, luật sư, người phụ trách, khoảng ngày, từ khóa | `consultations:read` | D06 | MVP |
| GET | `/admin/consultations/:id` | Chi tiết kèm tệp và ghi chú | `consultations:read` | D06 | MVP |
| PATCH | `/admin/consultations/:id` | Đổi trạng thái, phân công người xử lý | `consultations:write` | D06 | MVP |
| POST | `/admin/consultations/bulk-status` | Đổi trạng thái hàng loạt (kể cả đánh dấu spam) | `consultations:write` | D06 | MVP |
| GET | `/admin/consultations/:id/notes` | Ghi chú nội bộ | `consultations:read` | D06 | MVP |
| POST | `/admin/consultations/:id/notes` | Thêm ghi chú | `consultations:write` | D06 | MVP |
| PATCH | `/admin/consultation-notes/:noteId` | Sửa ghi chú của chính mình | `consultations:write` | D06 | MVP |
| DELETE | `/admin/consultation-notes/:noteId` | Xóa ghi chú | `consultations:write` | D06 | MVP |
| GET | `/admin/consultations/:id/attachments/:attId/download` | Tải tệp đính kèm (liên kết ký có hạn, ghi nhật ký truy cập) | `consultations:read` | D06 | TBC |
| GET | `/admin/consultations/export` | Xuất Excel theo bộ lọc hiện tại | `consultations:read` | D07 | MVP |
| DELETE | `/admin/consultations/:id` | Xóa yêu cầu (đáp ứng yêu cầu xóa dữ liệu cá nhân, Nghị định 13/2023) | `consultations:delete` | D06 | MVP |

### M26. `appointments` – Đặt lịch hẹn theo khung giờ

Bảng: `appointments`, `lawyer_availabilities`. Chỉ làm khi khách chọn mức ưu tiên cho A69 (câu hỏi 3.5.6).

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/appointments/slots` | Khung giờ còn trống (`?lawyer=&from=&to=`), loại các khung đã đặt | Public | A69 | TBC |
| POST | `/consultations` (kèm `slot`) | Gửi yêu cầu kèm khung giờ; hệ thống tạo `appointments` ở trạng thái chờ xác nhận | Public + Captcha | A69 | TBC |
| GET | `/appointments/:token/ics` | Tải tệp lịch `.ics` | Public (token) | A69 | TBC |
| GET | `/admin/appointments` | Danh sách, lọc theo luật sư, ngày, trạng thái | `appointments:read` | A69 | TBC |
| GET | `/admin/appointments/:id` | Chi tiết | `appointments:read` | A69 | TBC |
| PATCH | `/admin/appointments/:id` | Xác nhận, đổi giờ, hủy, đánh dấu hoàn tất | `appointments:write` | A69 | TBC |
| GET | `/admin/lawyers/:id/availabilities` | Lịch rảnh của luật sư | `appointments:read` | A69 | TBC |
| PUT | `/admin/lawyers/:id/availabilities` | Đặt lại lịch rảnh theo tuần (ngày, giờ, múi giờ) | `appointments:write` | A69 | TBC |
| GET | `/admin/integrations/calendar/:provider/connect` | Bắt đầu OAuth Google Calendar/Outlook | `appointments:manage` | A69 | TBC |
| GET | `/admin/integrations/calendar/:provider/callback` | Nhận mã OAuth, lưu token | `appointments:manage` | A69 | TBC |
| DELETE | `/admin/integrations/calendar/:provider` | Ngắt kết nối đồng bộ lịch | `appointments:manage` | A69 | TBC |

### M27. `notifications` – Thông báo

Bảng: `notification_recipients` (kênh `email`, `zalo`, `telegram`; có thể gắn theo `practice_area_id`). Phần lớn là xử lý nền qua hàng đợi (queue), endpoint chỉ phục vụ cấu hình.

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/admin/notification-recipients` | Danh sách người/kênh nhận | `settings:read` | D08, D09 | MVP |
| POST | `/admin/notification-recipients` | Thêm người nhận (kênh, địa chỉ/ID, lĩnh vực, sự kiện) | `settings:write` | D08 | MVP |
| PATCH | `/admin/notification-recipients/:id` | Sửa, bật/tắt | `settings:write` | D08, D09 | MVP |
| POST | `/admin/notification-recipients/:id/test` | Gửi thử thông báo | `settings:write` | D08, D09 | MVP |
| DELETE | `/admin/notification-recipients/:id` | Xóa | `settings:write` | D08 | MVP |

Sự kiện hệ thống gửi thông báo (không có endpoint): yêu cầu tư vấn mới (D08, D09), email xác nhận cho khách (A68), email đặt lại mật khẩu (D04), cảnh báo sự cố (D13).

### M28. `seo` – SEO và chuyển hướng

Trường SEO (title, description, ảnh chia sẻ, canonical) nằm trong các bảng `*_translations` và được trả cùng nội dung ở từng module. Module này lo các phần dùng chung.

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/sitemap.xml` | Sitemap tổng, kèm `hreflang` khi song ngữ | Public | F04, F08 | MVP |
| GET | `/robots.txt` | Nội dung `robots.txt` cấu hình được | Public | F04 | MVP |
| GET | `/seo/redirects` | Danh sách chuyển hướng 301/302 cho middleware Next.js (có cache) | Public | F03 | P2 |
| GET | `/seo/schema/:type/:id` | JSON-LD: `Organization`, `LegalService`, `Article`, `Person` | Public | F06 | P2 |
| GET | `/admin/seo/redirects` | Danh sách chuyển hướng | `seo:read` | F03 | P2 |
| POST | `/admin/seo/redirects` | Thêm chuyển hướng (nguồn, đích, mã 301/302) | `seo:write` | F03 | P2 |
| PATCH | `/admin/seo/redirects/:id` | Sửa | `seo:write` | F03 | P2 |
| DELETE | `/admin/seo/redirects/:id` | Xóa | `seo:write` | F03 | P2 |
| POST | `/admin/seo/redirects/import` | Nhập hàng loạt từ CSV (danh sách URL cũ, câu hỏi 4.2.5) | `seo:write` | F03, B13 | P2 |
| GET | `/admin/seo/robots` | Đọc nội dung `robots.txt` | `seo:read` | F04 | MVP |
| PUT | `/admin/seo/robots` | Sửa `robots.txt` | `seo:write` | F04 | MVP |
| POST | `/admin/seo/sitemap/regenerate` | Dựng lại sitemap, xóa cache | `seo:write` | F04 | MVP |
| GET | `/admin/seo/audit` | Kiểm tra nội dung thiếu title/description/ảnh chia sẻ | `seo:read` | F01 | P2 |

Thẻ canonical, Open Graph, Twitter Card (F05, F07) và URL thân thiện (F02) do frontend dựng từ dữ liệu SEO và `slug` của từng bản dịch.

### M29. `dashboard` – Thống kê trong admin

Chỉ tổng hợp từ dữ liệu có sẵn (`COUNT`), không có bảng riêng.

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/admin/dashboard/summary` | Số yêu cầu mới, đang xử lý, bài chờ duyệt, bình luận chờ duyệt | Auth | D10 | TBC |
| GET | `/admin/dashboard/consultations` | Số yêu cầu theo tuần/tháng (`?granularity=week|month&from=&to=`), theo lĩnh vực | `consultations:read` | D10 | TBC |
| GET | `/admin/dashboard/top-posts` | Bài xem nhiều | `posts:read` | D10 | TBC |
| GET | `/admin/dashboard/downloads` | Lượt tải tài liệu theo thời gian | `documents:read` | D10 | TBC |
| GET | `/admin/dashboard/traffic-sources` | Nguồn truy cập (lấy từ Google Analytics Data API, cần cấu hình) | `settings:read` | D10 | TBC |

### M30. `audit-logs` – Nhật ký thao tác

Bảng: `audit_logs` (`entity_type`, `entity_id` đa hình, không đặt khóa ngoại). Ghi tự động bằng interceptor của NestJS, không có endpoint ghi.

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/admin/audit-logs` | Danh sách: lọc người thực hiện, hành động, loại đối tượng, `entity_id`, khoảng ngày | `audit:read` | D05 | P2 |
| GET | `/admin/audit-logs/:id` | Chi tiết (giá trị trước và sau, IP) | `audit:read` | D05 | P2 |
| GET | `/admin/audit-logs/export` | Xuất CSV | `audit:read` | D05 | P2 |

Thời gian lưu nhật ký cấu hình ở `site_settings`; tác vụ định kỳ xóa bản ghi quá hạn (câu hỏi 3.9.3).

### M31. `system` – Sức khỏe hệ thống, sao lưu, cảnh báo

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/health` | Kiểm tra sống (cho giám sát uptime) | Public | E12 | MVP |
| GET | `/health/ready` | Kiểm tra sẵn sàng: DB, hàng đợi, kho lưu tệp | Public (có thể giới hạn IP) | E12 | MVP |
| GET | `/admin/system/info` | Phiên bản ứng dụng, dung lượng đĩa, kích thước DB | `system:read` | D13 | MVP |
| GET | `/admin/backups` | Danh sách bản sao lưu | `system:manage` | D12 | MVP |
| POST | `/admin/backups` | Chạy sao lưu ngay | `system:manage` | D12 | MVP |
| GET | `/admin/backups/:id/download` | Tải bản sao lưu (liên kết ký có hạn) | `system:manage` | D12 | MVP |
| POST | `/admin/backups/:id/restore` | Khôi phục (yêu cầu nhập lại mật khẩu và xác nhận) | `system:manage` | D12 | P2 |
| DELETE | `/admin/backups/:id` | Xóa bản sao lưu | `system:manage` | D12 | MVP |
| GET | `/admin/backups/schedule` | Lịch sao lưu và thời gian lưu giữ | `system:manage` | D12 | MVP |
| PUT | `/admin/backups/schedule` | Sửa lịch sao lưu | `system:manage` | D12 | MVP |
| GET | `/admin/alerts/config` | Cấu hình cảnh báo sự cố (ngưỡng, kênh nhận) | `system:manage` | D13 | TBC |
| PUT | `/admin/alerts/config` | Sửa cấu hình cảnh báo | `system:manage` | D13 | TBC |
| POST | `/admin/cache/purge` | Xóa cache toàn site hoặc theo đường dẫn (kích hoạt revalidate của Next.js, CDN) | `system:manage` | E07, E08 | MVP |

### M32. `import-export` – Nhập/xuất dữ liệu hàng loạt

`{entity}` gồm: `posts`, `services`, `lawyers`, `partners`, `faqs`, `pages`, `redirects`.

| Method | Endpoint | Mô tả | Truy cập | Mã CN | GĐ |
|---|---|---|---|---|---|
| GET | `/admin/import/:entity/template` | Tải tệp Excel mẫu | `import:write` | B13 | TBC |
| POST | `/admin/import/:entity/preview` | Tải tệp, kiểm tra và xem trước lỗi từng dòng (chưa ghi) | `import:write` | B13 | TBC |
| POST | `/admin/import/:entity` | Thực hiện nhập (chạy nền, trả `jobId`) | `import:write` | B13 | TBC |
| POST | `/admin/import/wordpress` | Nhập từ tệp xuất WordPress (WXR): bài viết, chuyên mục, thẻ, ảnh | `import:write` | B13 | TBC |
| GET | `/admin/import/jobs/:jobId` | Tiến độ và kết quả | `import:write` | B13 | TBC |
| GET | `/admin/export/:entity` | Xuất dữ liệu `?format=xlsx|csv|json` | `import:read` | B13 | TBC |

---

## 4. Module nền tảng (cross-cutting)

### M33. `common` – Thành phần dùng chung

Không có endpoint nghiệp vụ. Các thành phần cần có:

| Thành phần | Chức năng | Mã CN |
|---|---|---|
| `JwtAuthGuard`, `RolesGuard`, `PermissionsGuard` | Xác thực và kiểm tra quyền `res:action` | D01, D02 |
| `ThrottlerGuard` | Giới hạn tần suất theo IP và theo tuyến (đăng nhập, form, bình luận, tải tài liệu) | E05 |
| `CaptchaGuard` | Kiểm tra reCAPTCHA và trường honeypot, hỗ trợ cấu hình thay thế cho người dùng ở Trung Quốc | E04 |
| `AuditInterceptor` | Ghi nhật ký thao tác ghi vào `audit_logs` | D05 |
| `LangInterceptor` / decorator `@Lang()` | Xác định ngôn ngữ, quay về tiếng Việt khi thiếu bản dịch | A09, B12 |
| `UploadService` | Kiểm tra MIME, giới hạn dung lượng, quét virus, nén, sinh WebP, lưu vào đĩa hoặc S3/R2 | B09, A65, E07 |
| `MailService` + hàng đợi | Gửi email giao dịch (SMTP/Resend), thử lại khi lỗi | D04, D08, A68 |
| `NotifyService` | Gửi Zalo/Telegram | D09 |
| `CacheService` + `RevalidateService` | Cache và gọi revalidate của Next.js khi nội dung đổi | E07 |
| `SchedulerService` | Cron: đăng bài đã lên lịch, xóa token hết hạn, xóa nhật ký quá hạn, sao lưu | B02, D12 |
| `SlugService` | Sinh slug tiếng Việt không dấu, kiểm tra trùng theo ngôn ngữ | F02 |
| `Swagger` | Tài liệu OpenAPI tại `/api/docs` | E09 |
| Cookie consent (frontend) | Thông báo cookie và chặn mã theo dõi đến khi đồng ý | E06 |

---

## 5. Module mở rộng chưa làm (nhóm G)

Nhóm G là mục "cần xác nhận" trong bản yêu cầu. Chưa có thiết kế DB và API; chỉ giữ chỗ tiền tố để mở rộng sau.

| Mã | Chức năng | Tiền tố dự kiến | Ghi chú |
|---|---|---|---|
| G01 | Cổng khách hàng có đăng nhập | `/api/v1/portal/...` | Cần bảng khách hàng, hồ sơ vụ việc, tài liệu riêng tư |
| G02 | Thanh toán trực tuyến | `/api/v1/payments/...` | Cần cổng thanh toán và đối soát |
| G03 | Tích hợp CRM / quản lý hồ sơ vụ việc | `/api/v1/integrations/crm/...`, webhook từ M25 | Có thể bắt đầu bằng webhook đẩy yêu cầu tư vấn sang CRM |
| G04 | Email marketing tự động | `/api/v1/admin/campaigns/...` | Dựa trên M22 |
| G05 | Tuyển dụng, nộp hồ sơ | `/api/v1/careers/...` | Cần bảng vị trí và hồ sơ ứng viên |
| G06 | Ứng dụng di động | Dùng lại API công khai | Cần thêm xác thực cho người dùng cuối |
| G07 | Thêm ngôn ngữ (Anh, Trung phồn thể) | Dùng M03 | Thêm dòng `languages` và bản dịch, không đổi cấu trúc |
| G08–G10 | Chức năng khách bổ sung | – | Chờ khách ghi rõ |

---

## 6. Ma trận phân quyền đề xuất

Năm vai trò theo mục 3.9.1 của bản yêu cầu. Cần khách xác nhận lại.

| Nhóm quyền | Quản trị cấp cao | Biên tập viên | Người viết | Chỉ xem | Tiếp nhận tư vấn |
|---|---|---|---|---|---|
| `users`, `roles` | Toàn quyền | – | – | – | – |
| `settings`, `theme`, `seo`, `system` | Toàn quyền | Đọc | – | Đọc | – |
| `pages` (kể cả builder) | Toàn quyền | Sửa, đăng | – | Đọc | – |
| `posts`, `comments`, `documents`, `newsletter` | Toàn quyền | Sửa, đăng, duyệt | Tạo, sửa bài của mình, gửi duyệt | Đọc | – |
| `services`, `lawyers`, `content` (đối tác, thành tựu, FAQ, đánh giá) | Toàn quyền | Sửa, đăng | – | Đọc | – |
| `menus`, `media` | Toàn quyền | Sửa | Tải ảnh, đọc | Đọc | – |
| `consultations`, `appointments` | Toàn quyền | Đọc | – | Đọc | Đọc, sửa, ghi chú (theo lĩnh vực được phân) |
| `audit`, `import`, `dashboard` | Toàn quyền | Dashboard | – | Dashboard | Dashboard (phần tư vấn) |

---

## 7. Đối chiếu mã chức năng với module

| Mã chức năng | Module | Ghi chú |
|---|---|---|
| A01, A05 | M04, M05, M09 | Header, footer lấy qua `/site/bootstrap` và `/menus/:location` |
| A02, A03, A04 | M09 | Menu nhiều cấp, mega menu, menu điện thoại |
| A06 | M07, M19, M09 | Breadcrumb dựng từ cây trang, chuyên mục, menu (dẫn xuất) |
| A07, A08 | Frontend | Không cần API |
| A09 | M03 | |
| A10 | M07, M04 | Trang 404, bảo trì |
| A11, A13, A16, A22 | M07, M08 | Khối kéo thả |
| A12, A15 | M10 | |
| A14, A40, A41 | M15, M16 | |
| A17, A26–A39 | M17 | |
| A18, A24, A49–A54 | M19 | |
| A19 | M11 | |
| A20 | M13 | |
| A21, A43 | M14 | |
| A23 | M12 | |
| A25 | M07 | Trang loại `legal` |
| A42, A44–A46 | M16 | |
| A47 | M16 | Cần khách mô tả công thức |
| A48 | M07 | Trang loại `landing` |
| A55 | M20 | |
| A56, A60–A63 | M24, M19 | |
| A57 | M21 | |
| A58 | M22 | |
| A59 | M23, M19 | |
| A64–A68 | M25 | |
| A69 | M26 | |
| A70, A71 | M18, M07, M04 | |
| A72–A74 | M04, M05 | Kênh liên hệ nổi, mạng xã hội |
| A75 | – | Chat/chatbot: nhúng script bên thứ ba qua `tracking_integrations` hoặc khối; chưa có API riêng |
| B01 | M07 | |
| B02, B10 | M19 | |
| B03 | M15, M16 | |
| B04 | M17 | |
| B05 | M11 | |
| B06 | M12 | |
| B07 | M13, M14 | |
| B08 | M09 | |
| B09 | M06 | |
| B11 | M08 | Bài viết chưa có bảng phiên bản (xem mục 8) |
| B12 | M03 và bộ endpoint dịch ở mọi module 🌐 | |
| B13 | M32 | |
| C01–C16 | M08 | |
| C17–C26 | M05 | |
| D01, D03, D04 | M01 | |
| D02 | M02 | |
| D05 | M30 | |
| D06, D07 | M25 | |
| D08, D09 | M27, M25 | |
| D10 | M29 | |
| D11 | M04 | |
| D12, D13 | M31 | |
| E01, E02 | Frontend | |
| E03 | Hạ tầng | HTTPS, SSL |
| E04, E05 | M33 | |
| E06 | Frontend, M33 | |
| E07, E08 | M06, M31, M33 | |
| E09 | M33 | Swagger |
| E10–E12 | Hạ tầng, M31 | Docker, CI/CD, giám sát |
| F01–F08 | M28 | |
| F09 | M04 | |
| G01–G10 | Mục 5 | Chưa làm |

---

## 8. Điểm cần bổ sung hoặc xác nhận

Các điểm lệch giữa danh sách chức năng và phần *Thiết kế cơ sở dữ liệu* hiện có (file chỉ trích đến mục 4, chưa thấy mô tả bảng chi tiết nên chưa đối chiếu được từng cột):

| # | Vấn đề | Ảnh hưởng | Đề xuất |
|---|---|---|---|
| 1 | Chưa thấy bảng lưu lượt xem bài viết | `POST /posts/:slug/view`, `GET /admin/dashboard/top-posts` (D10) | Thêm `post_views` (bài, ngày, số lượt) hoặc lấy từ Google Analytics |
| 2 | Lịch sử phiên bản chỉ có `page_versions` | B11 cho bài viết, dịch vụ, luật sư | Chỉ làm phiên bản cho trang ở P2; bài viết dùng trạng thái `draft` và `archived` |
| 3 | Chưa thấy bảng chuyển hướng 301 | M28 (F03) | Thêm `redirects` (nguồn, đích, mã, bật/tắt) |
| 4 | Chưa thấy bảng người đăng ký bản tin | M22 (A58) | Thêm `newsletter_subscribers` (email, ngôn ngữ, trạng thái, token, thời điểm đồng ý) |
| 5 | Chưa thấy bảng giá trị cốt lõi, thành tựu, đối tác | M10, M11, M12 | Kiểm tra mục 5.F của tài liệu DB; nếu chưa có thì thêm `core_values`, `achievements`, `partners` (mỗi bảng kèm `*_translations` trừ đối tác) |
| 6 | Chưa thấy bảng bản ghi sao lưu, tác vụ nhập liệu | M31, M32 | Thêm `backup_records`, `import_jobs` hoặc lưu ngoài DB (tệp, hàng đợi) |
| 7 | Chưa thấy bảng mẫu trang và khối đã lưu | M08 (C11, C12) | Tài liệu DB có nhắc "mẫu trang, khối đã lưu" ở mục 2.3; xác nhận tên bảng cuối cùng |
| 8 | Lưu token lời mời và token tải tài liệu | M02, M21 | Dùng `password_reset_tokens` cho lời mời; thêm cột hoặc bảng token cho tải tài liệu |
| 9 | Câu hỏi 4.2.6: trang chưa dịch ẩn hay hiện bản Việt | Mọi API công khai có `lang` | Chờ khách chốt; hiện tại giả định quay về tiếng Việt kèm `fallback: true` |
| 10 | Tìm kiếm tiếng Trung (A63) | M24 | Cần quyết định công cụ (`pg_trgm`, `zhparser` hoặc dịch vụ tìm kiếm ngoài) trước khi làm |
| 11 | Công thức ước tính chi phí (A47) | M16 | Chưa có đặc tả; để TBC cho đến khi khách mô tả |
| 12 | Mức ưu tiên các chức năng trong bản yêu cầu | Cột "GĐ" của tài liệu này | Cột GĐ lấy từ *Danh sách chức năng* (MVP/P2); các mục TBC cần khách tick M/S/C/X |

---

*Tài liệu này là bản nháp để thống nhất phạm vi API; tên endpoint, tên bảng và quyền có thể chỉnh khi bắt đầu viết Swagger.*
