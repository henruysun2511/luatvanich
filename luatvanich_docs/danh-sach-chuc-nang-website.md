# Tổng hợp chức năng website công ty luật + bộ công cụ kéo thả cho Admin

> Tham chiếu: https://luatsutiengtrung.vn/
> Phạm vi: xây cho **một khách hàng duy nhất**, admin có thể tùy biến giao diện bằng kéo thả ở mức đơn giản.
> Ký hiệu: **[MVP]** = bắt buộc giai đoạn 1 · **[P2]** = giai đoạn 2 (mở rộng).

---

## Mục lục

1. [Tổng quan](#1-tổng-quan)
2. [Chức năng phía người truy cập (Frontend)](#2-chức-năng-phía-người-truy-cập-frontend)
3. [Chức năng quản trị (Admin/CMS)](#3-chức-năng-quản-trị-admincms)
4. [Bộ công cụ kéo thả (Page Builder)](#4-bộ-công-cụ-kéo-thả-page-builder)
5. [Tùy biến giao diện toàn site (Theme Settings)](#5-tùy-biến-giao-diện-toàn-site-theme-settings)
6. [Thư viện khối (Blocks)](#6-thư-viện-khối-blocks)
7. [Chức năng kỹ thuật và SEO](#7-chức-năng-kỹ-thuật-và-seo)
8. [Công nghệ đề xuất](#8-công-nghệ-đề-xuất)
9. [Mô hình dữ liệu tối thiểu](#9-mô-hình-dữ-liệu-tối-thiểu)
10. [Cách hoạt động](#10-cách-hoạt-động)
11. [Lộ trình triển khai](#11-lộ-trình-triển-khai)
12. [Mẹo để admin dễ dùng và không phá giao diện](#12-mẹo-để-admin-dễ-dùng-và-không-phá-giao-diện)
13. [Checklist tổng hợp](#13-checklist-tổng-hợp)

---

## 1. Tổng quan

Website mẫu là website giới thiệu doanh nghiệp (công ty luật), gồm: trang chủ nhiều khối nội dung, các trang dịch vụ, đội ngũ luật sư, blog/cẩm nang, kho kiến thức song ngữ Việt/Trung, trang liên hệ và các kênh liên hệ nhanh (Hotline, Zalo, Messenger, WeChat).

Mục tiêu của dự án: xây website tương tự **kèm** một bộ công cụ cho phép admin tự thay đổi bố cục và giao diện bằng kéo thả, không cần lập trình.

**Ba hướng thực hiện:**

| Hướng | Công nghệ | Phù hợp khi | Nhược điểm |
|---|---|---|---|
| A. Dùng sẵn | WordPress + Elementor / Webflow | Cần xong nhanh, chi phí thấp | Bị giới hạn bởi plugin, web nặng, khó tùy biến sâu |
| B. Nền tự code + thư viện kéo thả (**khuyến nghị**) | Next.js + Puck (hoặc GrapesJS) + DB | Web nhanh, đúng thương hiệu, kiểm soát được | Tốn công dev hơn A |
| C. Tự xây hoàn toàn | React + dnd-kit/Craft.js + backend riêng | Muốn bán như sản phẩm SaaS | Chi phí, thời gian cao nhất |

---

## 2. Chức năng phía người truy cập (Frontend)

### 2.1 Cấu trúc và điều hướng
- [ ] **[MVP]** Header cố định: tên công ty, hotline, email, logo
- [ ] **[MVP]** Menu nhiều cấp (dropdown)
- [ ] **[MVP]** Mega menu cho "Dịch vụ pháp lý" (lưới dịch vụ kèm ảnh, nút "Xem tất cả")
- [ ] **[MVP]** Menu dạng off-canvas trên điện thoại
- [ ] **[MVP]** Nút "Chuyển đến nội dung" (skip to content)
- [ ] **[MVP]** Nút cuộn lên đầu trang
- [ ] **[MVP]** Footer: liên kết nhanh, danh sách dịch vụ, thông tin liên hệ, bản đồ, chính sách bảo mật, điều khoản sử dụng
- [ ] **[P2]** Chuyển đổi ngôn ngữ Tiếng Việt / 中文

### 2.2 Các khối nội dung trang chủ
- [ ] **[MVP]** Banner chính (hero): tiêu đề, mô tả, nút "Đặt lịch tư vấn"
- [ ] **[MVP]** Dãy số liệu nổi bật (có thể có hiệu ứng đếm số)
- [ ] **[MVP]** Khối câu chuyện thương hiệu + nút "Tìm hiểu thêm"
- [ ] **[MVP]** Lưới dịch vụ tiêu biểu (thẻ: số thứ tự, tiêu đề, mô tả, nút xem chi tiết)
- [ ] **[MVP]** Khối giá trị cốt lõi (Chuyên nghiệp, Hiệu quả, Bảo mật, Đồng hành, Hỗ trợ 24/7)
- [ ] **[MVP]** Khối "Văn hóa kinh doanh Việt – Trung"
- [ ] **[MVP]** Danh sách đội ngũ luật sư (ảnh, họ tên, chức danh, link sang hồ sơ)
- [ ] **[MVP]** Tiêu điểm luật: bài viết mới nhất tự động lấy từ blog
- [ ] **[MVP]** Slider logo đối tác chạy tự động

### 2.3 Các trang con
- [ ] **[MVP]** Giới thiệu: Về chúng tôi, Đội ngũ, Tin tức hoạt động
- [ ] **[MVP]** Trang tổng hợp dịch vụ + trang chi tiết từng dịch vụ (12 trang)
- [ ] **[MVP]** Trang hồ sơ từng luật sư
- [ ] **[MVP]** Cẩm nang (blog) theo chuyên mục: Tiêu điểm luật, Văn hóa kinh doanh Việt Trung, Dịch thuật công chứng, Tài liệu hỗ trợ doanh nghiệp
- [ ] **[MVP]** Trang danh sách bài viết (có phân trang) và trang chi tiết bài viết
- [ ] **[MVP]** Trang Liên hệ (có form đặt lịch tư vấn)
- [ ] **[MVP]** Trang Chính sách bảo mật, Điều khoản sử dụng
- [ ] **[P2]** Kho tri thức tiếng Trung (6 chủ đề: Dân sự, Đăng ký công ty, Lao động, Thuế, Hình sự, Tố tụng)

### 2.4 Liên hệ và chuyển đổi khách hàng
- [ ] **[MVP]** Nút liên hệ nổi (floating): Hotline, Zalo, Messenger, WeChat (hiện mã QR và ID)
- [ ] **[MVP]** Liên kết click-to-call, click-to-email
- [ ] **[MVP]** Form đặt lịch tư vấn (họ tên, SĐT, email, nội dung, loại dịch vụ)
- [ ] **[MVP]** Biểu tượng mạng xã hội: Facebook, YouTube, Zalo, WeChat
- [ ] **[MVP]** Bản đồ địa chỉ văn phòng (Google Maps)
- [ ] **[MVP]** Chống spam form (reCAPTCHA hoặc honeypot)

---

## 3. Chức năng quản trị (Admin/CMS)

- [ ] **[MVP]** Đăng nhập admin an toàn (1–2 tài khoản)
- [ ] **[MVP]** Quản lý **trang**: tạo, sửa, xóa, đặt đường dẫn, trạng thái nháp/đã đăng
- [ ] **[MVP]** Quản lý **bài viết** và **chuyên mục** (trình soạn thảo văn bản, ảnh đại diện, tác giả, thời gian đọc ước tính, lên lịch đăng)
- [ ] **[MVP]** Quản lý **dịch vụ pháp lý** (tiêu đề, mô tả ngắn, ảnh, nội dung chi tiết, thứ tự hiển thị)
- [ ] **[MVP]** Quản lý **hồ sơ luật sư** (họ tên, ảnh, chức danh, tiểu sử, thứ tự hiển thị)
- [ ] **[MVP]** Quản lý **đối tác** (logo, tên, thứ tự)
- [ ] **[MVP]** **Thư viện media**: upload, tìm kiếm, đổi tên, xóa, tự nén ảnh
- [ ] **[MVP]** Quản lý **menu** bằng kéo thả (header, footer)
- [ ] **[MVP]** Xem và quản lý **yêu cầu tư vấn** từ form (danh sách, trạng thái đã xử lý, xuất Excel, thông báo email)
- [ ] **[MVP]** Cấu hình thông tin liên hệ: hotline, email, địa chỉ, link mạng xã hội, Zalo, WeChat
- [ ] **[MVP]** Cài đặt **SEO** cho từng trang/bài viết
- [ ] **[P2]** Phân quyền: Quản trị, Biên tập viên, Chỉ xem
- [ ] **[P2]** Nhật ký chỉnh sửa (ai sửa gì, lúc nào)
- [ ] **[P2]** Quản lý nội dung song ngữ Việt/Trung
- [ ] **[P2]** Sao lưu và khôi phục tự động

---

## 4. Bộ công cụ kéo thả (Page Builder)

### 4.1 Soạn thảo trực quan
- [ ] **[MVP]** Giao diện 3 vùng: thanh khối bên trái, khung xem trước ở giữa, bảng thuộc tính bên phải
- [ ] **[MVP]** Kéo thả khối từ thanh bên vào trang
- [ ] **[MVP]** Kéo thả để đổi thứ tự khối
- [ ] **[MVP]** Nhân bản khối, xóa khối
- [ ] **[MVP]** Bấm vào khối để sửa nội dung và kiểu (chữ, ảnh, link, màu nền, khoảng cách, căn lề)
- [ ] **[MVP]** Hoàn tác / làm lại (undo/redo)
- [ ] **[MVP]** Xem trước theo thiết bị: máy tính, tablet, điện thoại
- [ ] **[MVP]** Lưu nháp và xuất bản
- [ ] **[P2]** Lịch sử phiên bản, khôi phục bản cũ
- [ ] **[P2]** Đặt lịch xuất bản
- [ ] **[P2]** Lưu khối tự tạo thành mẫu để dùng lại
- [ ] **[P2]** Mẫu trang dựng sẵn (template)
- [ ] **[P2]** Ẩn/hiện khối theo thiết bị
- [ ] **[P2]** Hiệu ứng xuất hiện khi cuộn (animation)

### 4.2 Thuộc tính có thể chỉnh trên mỗi khối
- Nội dung: tiêu đề, mô tả, nút (chữ + link), ảnh
- Nền: màu, ảnh, gradient (video ở **[P2]**)
- Khoảng cách trong/ngoài: chọn mức nhỏ / vừa / lớn
- Căn lề: trái / giữa / phải
- Cỡ chữ: S / M / L
- Số cột trên máy tính / tablet / điện thoại

---

## 5. Tùy biến giao diện toàn site (Theme Settings)

- [ ] **[MVP]** Chọn màu chủ đạo, màu phụ, màu chữ, màu nền
- [ ] **[MVP]** Chọn font chữ (từ danh sách Google Fonts có chọn lọc, hỗ trợ tiếng Việt)
- [ ] **[MVP]** Chỉnh bo góc, kiểu nút
- [ ] **[MVP]** Upload logo và favicon
- [ ] **[MVP]** Chỉnh Header và Footer (menu, hotline, email, link mạng xã hội)
- [ ] **[MVP]** Chỉnh nút liên hệ nổi (bật/tắt từng kênh, nhập số/liên kết)
- [ ] **[P2]** Chế độ sáng/tối
- [ ] **[P2]** Ô nhập CSS/JS tùy chỉnh (cho người dùng nâng cao)
- [ ] **[P2]** Lưu và đổi qua lại giữa nhiều bộ theme

> Cách làm: lưu cài đặt dưới dạng **biến CSS** (CSS variables) trong database và áp dụng toàn site, đổi một lần là cả site đổi theo.

---

## 6. Thư viện khối (Blocks)

| # | Khối | Ghi chú | Giai đoạn |
|---|---|---|---|
| 1 | Banner chính (Hero) | Tiêu đề, mô tả, nút, ảnh nền | MVP |
| 2 | Dãy số liệu | Số + nhãn, đếm số khi cuộn | MVP |
| 3 | Văn bản + ảnh | Ảnh trái hoặc phải | MVP |
| 4 | Lưới dịch vụ | Lấy dữ liệu từ danh sách dịch vụ | MVP |
| 5 | Giá trị cốt lõi | Icon + tiêu đề + mô tả | MVP |
| 6 | Danh sách luật sư | Lấy dữ liệu từ danh sách luật sư | MVP |
| 7 | Slider logo đối tác | Lấy dữ liệu từ danh sách đối tác | MVP |
| 8 | Bài viết mới nhất | Tự lấy từ blog, chọn số lượng/chuyên mục | MVP |
| 9 | Form đặt lịch tư vấn | Lưu vào hệ thống + gửi thông báo | MVP |
| 10 | Khối kêu gọi hành động (CTA) | Tiêu đề + nút | MVP |
| 11 | Bản đồ + thông tin liên hệ | Nhúng Google Maps | MVP |
| 12 | Tiêu đề / đoạn văn / ảnh / nút / khoảng trống | Khối cơ bản | MVP |
| 13 | FAQ (hỏi đáp) | Dạng accordion | P2 |
| 14 | Lời chứng thực khách hàng | Slider | P2 |
| 15 | Video nhúng, thư viện ảnh | | P2 |
| 16 | Bảng giá | | P2 |

---

## 7. Chức năng kỹ thuật và SEO

- [ ] **[MVP]** Giao diện responsive (máy tính, tablet, điện thoại)
- [ ] **[MVP]** HTTPS (SSL)
- [ ] **[MVP]** Thẻ title, meta description, canonical, URL thân thiện
- [ ] **[MVP]** Thẻ Open Graph / Twitter Card (chia sẻ mạng xã hội đẹp)
- [ ] **[MVP]** Sitemap XML, robots.txt
- [ ] **[MVP]** Tự động tối ưu ảnh (WebP), lazy load, cache
- [ ] **[MVP]** Tích hợp Google Search Console, Google Analytics / Tag Manager
- [ ] **[P2]** Dữ liệu có cấu trúc (schema: Organization, LegalService, Article, Person)
- [ ] **[P2]** Redirect 301 quản lý được trong admin
- [ ] **[P2]** Thẻ hreflang cho site đa ngôn ngữ
- [ ] **[P2]** CDN
- [ ] **[MVP]** Sao lưu dữ liệu định kỳ

---

## 8. Công nghệ đề xuất

| Thành phần | Lựa chọn | Lý do |
|---|---|---|
| Framework | **Next.js** (React) | SEO tốt, render nhanh, một codebase cho cả web và admin |
| Trình kéo thả | **Puck** (hoặc GrapesJS nếu muốn tự do hơn) | Tự định nghĩa khối, dữ liệu lưu dạng JSON |
| Cơ sở dữ liệu | PostgreSQL (hoặc SQLite nếu nhỏ) + **Prisma** | Dễ làm, dễ sao lưu |
| Đăng nhập | **Auth.js** (NextAuth) | Chỉ cần 1–2 tài khoản admin |
| Lưu ảnh | Server nội bộ hoặc S3 / Cloudflare R2 | Thư viện media đơn giản |
| Triển khai | VPS + Docker, hoặc Vercel | Tùy ngân sách |
| Form/email | Resend, SMTP hoặc Telegram/Zalo bot | Thông báo khi có yêu cầu tư vấn |

**Phương án nhanh (Hướng A):** WordPress + Elementor, cùng các plugin: Polylang/WPML (đa ngôn ngữ), Rank Math/Yoast (SEO), Contact Form 7/WPForms (form), Click to Chat (nút liên hệ nổi).

---

## 9. Mô hình dữ liệu tối thiểu

| Bảng | Nội dung chính |
|---|---|
| `users` | Tài khoản admin |
| `pages` | Tiêu đề, đường dẫn, nội dung JSON (do builder tạo), trạng thái nháp/đã đăng, SEO |
| `page_versions` | Các phiên bản cũ của trang (P2) |
| `posts`, `categories` | Bài viết blog và chuyên mục |
| `services` | Dịch vụ pháp lý |
| `lawyers` | Hồ sơ luật sư |
| `partners` | Logo đối tác |
| `theme_settings` | Màu, font, logo, header/footer, nút liên hệ nổi |
| `menus` | Cấu trúc menu |
| `media` | Ảnh/file đã upload |
| `leads` | Yêu cầu tư vấn từ form |

---

## 10. Cách hoạt động

```
Admin kéo thả khối  →  Puck tạo JSON mô tả trang
        ↓
Lưu JSON vào database (bảng pages)
        ↓
Khách truy cập website  →  Next.js đọc JSON
        →  render bằng chính các component React đó
```

- **Mỗi khối chỉ viết một lần** (một component React), dùng chung cho cả trình chỉnh sửa lẫn trang thật. Admin thấy gì khi sửa thì ngoài site hiển thị đúng như vậy.
- **Khối động** (dịch vụ, luật sư, đối tác, bài viết mới) lấy dữ liệu từ database nên cập nhật dữ liệu một chỗ, mọi trang dùng khối đó đều đổi theo.
- **Theme** lưu thành biến CSS, áp dụng toàn site.

---

## 11. Lộ trình triển khai

| Giai đoạn | Thời gian gợi ý | Công việc |
|---|---|---|
| 1 | Tuần 1 | Dựng khung Next.js, đăng nhập admin, database, theme settings |
| 2 | Tuần 2–3 | Viết bộ khối, tích hợp Puck, lưu/xuất bản trang |
| 3 | Tuần 3–4 | Quản lý bài viết, luật sư, dịch vụ, đối tác, form tư vấn, thư viện ảnh, menu |
| 4 | Tuần 5 | SEO, kiểm thử, chuyển nội dung từ site cũ, hướng dẫn và bàn giao |
| 5 (P2) | Sau bàn giao | Song ngữ Việt/Trung, phân quyền, lịch sử phiên bản, schema SEO, kho tri thức |

---

## 12. Mẹo để admin dễ dùng và không phá giao diện

- Cho chọn từ **giá trị có sẵn** (cỡ chữ S/M/L, khoảng cách nhỏ/vừa/lớn) thay vì nhập số tự do.
- **Giới hạn bảng màu** theo thương hiệu.
- **Khóa** Header/Footer ở dạng biểu mẫu chỉnh, không cho kéo thả lung tung.
- Luôn có nút **"Khôi phục phiên bản trước"**.
- Làm **tài liệu hoặc video hướng dẫn** ngắn khi bàn giao.
- Chuẩn bị **gói bảo trì** (cập nhật, sao lưu, bảo mật).
- Tự viết nội dung, thiết kế, hình ảnh riêng; **không sao chép** nội dung, ảnh, logo đối tác của website mẫu vì có thể vi phạm bản quyền.

---

## 13. Checklist tổng hợp

**Giai đoạn 1 – MVP**
- [ ] Khung dự án, đăng nhập admin, database
- [ ] Theme settings (màu, font, logo, header/footer, nút liên hệ nổi)
- [ ] Trình kéo thả (Puck) + bộ 12 khối cơ bản
- [ ] Lưu nháp / xuất bản / undo-redo / xem trước đa thiết bị
- [ ] Quản lý trang, bài viết, dịch vụ, luật sư, đối tác, menu, media
- [ ] Form tư vấn + quản lý yêu cầu + thông báo email
- [ ] SEO cơ bản, sitemap, responsive, tối ưu ảnh
- [ ] Chuyển nội dung, kiểm thử, bàn giao

**Giai đoạn 2 – Mở rộng**
- [ ] Song ngữ Việt/Trung + hreflang
- [ ] Phân quyền người dùng, nhật ký chỉnh sửa
- [ ] Lịch sử phiên bản và khôi phục
- [ ] Khối nâng cao (FAQ, testimonial, bảng giá, video, thư viện ảnh)
- [ ] Mẫu trang, lưu khối tự tạo, animation
- [ ] CSS/JS tùy chỉnh, chế độ sáng/tối
- [ ] Schema SEO, redirect 301 trong admin
- [ ] Kho tri thức tiếng Trung
