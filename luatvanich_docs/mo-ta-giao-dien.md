# Mô tả giao diện – Website công ty luật

> Tài liệu thiết kế giao diện (design system) cho website công ty luật song ngữ Việt/Trung và bộ công cụ kéo thả cho quản trị viên.
> Đi kèm ảnh xem trước bảng màu: **`mau-sac-de-xuat.png`** (đặt cùng thư mục với tài liệu này).
> Phiên bản 1.0 · Ngày lập: 12/11/2026

## Mục lục

1. [Mục đích và cách dùng tài liệu](#1-mục-đích-và-cách-dùng-tài-liệu)
2. [Nguyên tắc thiết kế](#2-nguyên-tắc-thiết-kế)
3. [Bốn gói giao diện đề xuất](#3-bốn-gói-giao-diện-đề-xuất)
4. [Màu sắc](#4-màu-sắc)
5. [Font chữ và chữ viết](#5-font-chữ-và-chữ-viết)
6. [Lưới, khoảng cách, bo góc, đổ bóng](#6-lưới-khoảng-cách-bo-góc-đổ-bóng)
7. [Biểu tượng, hình ảnh, chuyển động](#7-biểu-tượng-hình-ảnh-chuyển-động)
8. [Thành phần giao diện (component)](#8-thành-phần-giao-diện-component)
9. [Bố cục các trang chính](#9-bố-cục-các-trang-chính)
10. [Responsive](#10-responsive)
11. [Khả năng tiếp cận](#11-khả-năng-tiếp-cận)
12. [Chế độ tối (tùy chọn)](#12-chế-độ-tối-tùy-chọn)
13. [Giao diện trang quản trị và thư viện khối kéo thả](#13-giao-diện-trang-quản-trị-và-thư-viện-khối-kéo-thả)
14. [Triển khai kỹ thuật: biến CSS và ánh xạ với cơ sở dữ liệu](#14-triển-khai-kỹ-thuật-biến-css-và-ánh-xạ-với-cơ-sở-dữ-liệu)
15. [Phiếu chọn dành cho khách hàng](#15-phiếu-chọn-dành-cho-khách-hàng)

---

## 1. Mục đích và cách dùng tài liệu

Tài liệu mô tả **giao diện website trông thế nào và hoạt động ra sao**: phong cách, màu, font, từng thành phần (nút, thẻ, form, menu...) và bố cục từng trang. Mục đích:

- Để khách hàng **chọn** phong cách, bảng màu, font (phiếu chọn ở mục 15).
- Để người thiết kế và lập trình có **chuẩn chung**, không phải đoán.
- Để công cụ kéo thả cho admin chỉ cho phép chỉnh trong phạm vi chuẩn này, tránh làm lệch thương hiệu.

Mối liên hệ với các tài liệu khác:

| Tài liệu | Liên hệ |
|---|---|
| Bản thu thập yêu cầu, mục 5 | Tài liệu này là bản mô tả chi tiết của các lựa chọn P1–P7, F1–F5, S1–S5, R/B/C/I/M/W/D, H-A..., R-A... |
| Thiết kế cơ sở dữ liệu, bảng `themes` | Các lựa chọn ở đây được lưu thành cột của bảng `themes` (mục 14) |
| Tài liệu hạ tầng | Font và ảnh được phục vụ từ chính máy chủ (tự lưu, không gọi dịch vụ ngoài) |

**Lưu ý:** hình minh họa chỉ để chọn hướng. Màu hiển thị trên màn hình có thể lệch nhẹ so với bản in hay thiết bị khác. Thiết kế chi tiết (mockup) làm sau khi khách chốt lựa chọn.

---

## 2. Nguyên tắc thiết kế

| # | Nguyên tắc | Ý nghĩa cụ thể |
|---|---|---|
| 1 | **Tin cậy trước, đẹp sau** | Công ty luật bán sự tin tưởng. Ưu tiên bố cục rõ, chữ dễ đọc, thông tin thật (tên, chức danh, liên hệ) thay vì hiệu ứng |
| 2 | **Hành động rõ ràng** | Mỗi màn hình có một hành động chính (đặt lịch tư vấn). Nút chính luôn dễ thấy, không quá hai nút nổi bật cạnh nhau |
| 3 | **Song ngữ ngay từ đầu** | Mọi thành phần chịu được chữ Hán và chữ Việt có dấu, độ dài chữ khác nhau giữa hai ngôn ngữ |
| 4 | **Ít màu, nhất quán** | Dùng bảng màu 5 màu gốc, mọi màu khác sinh ra từ đó. Màu nhấn chỉ dùng cho điểm cần chú ý |
| 5 | **Đọc được trên mọi thiết bị** | Thiết kế điện thoại trước. Vùng bấm tối thiểu 44 px. Nhiều khách mở bằng WeChat hoặc Zalo |
| 6 | **Dễ tiếp cận** | Tương phản đạt chuẩn WCAG 2.1 mức AA, dùng được bằng bàn phím và trình đọc màn hình |
| 7 | **Nhẹ và nhanh** | Ảnh tối ưu, font tự lưu, hiệu ứng tiết chế, không nhúng thư viện nặng |
| 8 | **Admin không làm hỏng được** | Admin chỉ chọn từ các giá trị đã định sẵn (mức khoảng cách S/M/L, màu trong bảng màu...) |

### Giọng điệu chữ (microcopy)

- Xưng hô trung tính, lịch sự, ngắn gọn. Tránh lời hứa tuyệt đối ("chắc chắn thắng kiện") vì quy định đạo đức nghề nghiệp luật sư.
- Nút kêu gọi dùng động từ rõ: **Đặt lịch tư vấn**, **Gửi yêu cầu**, **Xem hồ sơ**, **Xem chi tiết**, **Tải tài liệu**.
- Thông báo lỗi nói rõ cách sửa: "Số điện thoại chưa đúng, vui lòng nhập 9–11 chữ số", không chỉ "Lỗi".
- Bản tiếng Trung do người thông thạo biên dịch, không dịch máy nguyên văn cho các nội dung pháp lý.

---

## 3. Bốn gói giao diện đề xuất

Để khách dễ chọn, mình gom các lựa chọn rời rạc (màu, font, bo góc...) thành **4 gói có sẵn**. Chọn một gói rồi tinh chỉnh từng mục nếu muốn.

| | **Gói A – Trang trọng cổ điển** | **Gói B – Hiện đại tối giản** | **Gói C – Ấm áp thân thiện** | **Gói D – Cao cấp quyền lực** |
|---|---|---|---|---|
| Cảm giác | Truyền thống, uy tín, như văn phòng luật lâu năm | Sạch, nhẹ, chuyên nghiệp, dễ tiếp cận | Gần gũi, dễ trò chuyện, ít áp lực | Kín đáo, sang trọng, tập trung khách doanh nghiệp lớn |
| Bảng màu gợi ý | **P1** (navy + vàng) hoặc **P2** (đỏ đô + vàng) | **P4** (xanh dương) hoặc **P6** (xám xanh) | **P3** (xanh lục) | **P5** (than đen + đồng) |
| Font | **F1**: tiêu đề serif + nội dung sans | **F2**: sans hiện đại toàn bộ | **F3**: sans bo tròn | **F1** hoặc **F4** |
| Bo góc | Vuông hoặc bo rất nhẹ (0–4 px) | Bo nhẹ (8 px) | Bo vừa (16 px) | Vuông (0 px) |
| Nút | Đặc nền màu chính, góc vuông nhẹ | Đặc nền, bo nhẹ | Viên thuốc (bo tròn hết) | Đặc nền, vuông, chữ viết hoa nhỏ |
| Thẻ | Viền mảnh, đường kẻ vàng 1 px phía trên | Viền mảnh hoặc nền phẳng | Nền màu phẳng, không viền | Viền mảnh, nền tối xen kẽ |
| Biểu tượng | Nét mảnh | Nét mảnh | Hai tông màu | Nét mảnh, đơn sắc |
| Ảnh | Chân dung nền đồng nhất, tông ấm | Ảnh lớn, sáng, nhiều khoảng trắng | Ảnh đời thường, nụ cười, kèm minh họa | Ảnh đen trắng hoặc tương phản cao |
| Khoảng trắng | Vừa | Thoáng | Vừa, bo tròn | Thoáng ở banner, dày ở nội dung |
| Chuyển động | Nhẹ | Nhẹ | Vừa | Nhẹ |
| Độ rộng nội dung | 1200 px | 1080 hoặc 1200 px | 1200 px | 1200 px, banner rộng 1440 px |
| Phù hợp khi | Khách muốn thể hiện lịch sử, chuẩn mực | Khách trẻ, quốc tế, muốn hiện đại | Khách có nhiều cá nhân, gia đình, người nước ngoài mới đến | Khách là doanh nghiệp lớn, tập đoàn |
| Rủi ro | Có thể bị đánh giá "cũ" | Có thể thiếu cá tính | Có thể kém trang nghiêm với vụ việc nặng | Nền tối dễ làm khó đọc nếu quá tay |

> Gói giao diện cho ra các giá trị mặc định của bảng `themes` (mục 14). Khách đổi bất kỳ mục nào vẫn được.

---

## 4. Màu sắc

### 4.1 Hệ thống màu

Giao diện chỉ cần **5 màu gốc** do khách chọn. Các màu còn lại (màu khi rê chuột, màu nền nhạt, viền, chữ phụ) được **tính tự động** từ 5 màu này bằng công thức, không phải nhập tay (xem mục 14).

| Màu gốc | Vai trò | Dùng cho |
|---|---|---|
| **Chính** (primary) | Màu thương hiệu | Nút chính, header, footer, tiêu đề lớn, liên kết, điểm nhấn mạnh |
| **Phụ** (secondary) | Màu hỗ trợ | Biểu đồ số thứ tự, biểu tượng, nút phụ, chữ nhỏ cần nổi nhẹ |
| **Nhấn** (accent) | Điểm thu hút | Nút CTA, đường kẻ trang trí, dấu gạch trên thẻ, thông báo nổi bật. **Dùng ít** |
| **Nền** (background) | Màu nền trang | Nền các khối nội dung |
| **Chữ** (text) | Màu chữ chính | Mọi đoạn văn bản, tiêu đề trên nền sáng |

Màu **dẫn xuất** (tính từ 5 màu gốc):

| Màu | Công thức | Dùng cho |
|---|---|---|
| `primary-hover` | 85% màu chính + 15% đen | Nút chính khi rê chuột, bấm |
| `primary-soft` | 8% màu chính + 92% trắng | Nền nhạt của nhãn, vùng chọn, thông báo thông tin |
| `surface` | Trắng (`#FFFFFF`) | Nền thẻ, ô nhập, hộp thoại |
| `surface-alt` | 5% màu chính + 95% màu nền | Nền khối xen kẽ để chia nhịp trang |
| `border` | 14% màu chữ + 86% màu nền | Viền thẻ, đường kẻ |
| `text-muted` | 68% màu chữ + 32% màu nền | Chữ phụ, mô tả, ngày đăng |
| `on-primary` | Trắng, hoặc đen nếu trắng không đủ tương phản | Chữ trên nền màu chính |
| `on-accent` | Màu chữ (tối) | Chữ trên nút màu nhấn |

### 4.2 Sáu bảng màu đề xuất

![Sáu bảng màu đề xuất áp dụng lên giao diện mẫu](mau-sac-de-xuat.png)

Cột "Tương phản" là tỷ lệ độ tương phản WCAG (chuẩn: **chữ thường từ 4,5:1**, chữ lớn từ 24 px hoặc 19 px đậm từ **3:1**, thành phần giao diện từ 3:1). Mình đã tính cho từng cặp màu.

#### P1 – Xanh navy và vàng gold · *Trang trọng, uy tín, quyền lực*

| Token | Mã màu | Tương phản / ghi chú |
|---|---|---|
| Chính | `#1B2A49` | Chữ trắng trên nền này: **14,2:1** (rất tốt) |
| Phụ | `#2F4B7C` | Trên nền sáng: **8,0:1** |
| Nhấn | `#C9A24B` | Chữ tối trên nền vàng: **7,3:1**. Vàng trên nền navy: **5,9:1**. **Không** dùng chữ trắng trên vàng (2,4:1) và không dùng chữ vàng trên nền sáng (2,2:1) |
| Nền | `#F7F5EF` | Kem nhạt, ấm |
| Chữ | `#1A1A1A` | Trên nền: **16,0:1** |
| Dẫn xuất | hover `#17243E` · soft `#EDEEF0` · alt `#ECEBE7` · viền `#D8D6D1` · chữ phụ `#61605E` (**5,8:1**) | |

Hợp với: Gói A. Hợp bản tiếng Trung (navy và vàng được người đọc Trung Quốc quen và đánh giá trang trọng).

#### P2 – Đỏ đô và vàng kem · *Gần văn hóa Trung, trang trọng*

| Token | Mã màu | Tương phản / ghi chú |
|---|---|---|
| Chính | `#7A1F2B` | Chữ trắng: **10,2:1** |
| Phụ | `#A63D40` | Trên nền sáng: **5,8:1** |
| Nhấn | `#D4AF37` | Chữ tối trên vàng: **7,6:1**. Vàng trên nền đỏ đô: **4,9:1**. Không dùng chữ trắng trên vàng (2,1:1) |
| Nền | `#FBF6EC` | Kem ấm |
| Chữ | `#222222` | **14,8:1** |
| Dẫn xuất | hover `#681A25` · soft `#F4EDEE` · alt `#F5EBE2` · viền `#DDD8D0` · chữ phụ `#676663` (**5,3:1**) | |

Hợp với: Gói A. Đỏ và vàng gợi nhớ truyền thống Trung Hoa; cần chắc khách muốn dùng màu đỏ chủ đạo (một số khách doanh nghiệp quốc tế thấy đỏ đô mạnh, có thể gợi liên tưởng cảnh báo).

#### P3 – Xanh lục đậm và trắng · *Ổn định, đáng tin cậy, cân bằng*

| Token | Mã màu | Tương phản / ghi chú |
|---|---|---|
| Chính | `#14463A` | Chữ trắng: **10,7:1** |
| Phụ | `#2E7D63` | Trên nền sáng: **4,6:1** (sát ngưỡng, chỉ dùng cho chữ vừa trở lên) |
| Nhấn | `#C8A951` | Chữ tối trên vàng: **7,6:1**. Vàng trên nền xanh lục: **4,7:1** |
| Nền | `#F4F8F6` | Trắng ánh xanh |
| Chữ | `#1B1B1B` | **16,1:1** |
| Dẫn xuất | hover `#113C31` · soft `#ECF0EF` · alt `#E9EFED` · viền `#D6D9D7` · chữ phụ `#606261` (**5,7:1**) | |

Hợp với: Gói C. Xanh lục thường gợi sự ổn định, tăng trưởng; dịu mắt khi đọc lâu.

#### P4 – Xanh dương hiện đại · *Sáng, hiện đại, dễ tiếp cận*

| Token | Mã màu | Tương phản / ghi chú |
|---|---|---|
| Chính | `#1D4ED8` | Chữ trắng: **6,7:1** |
| Phụ | `#3B82F6` | Trên nền sáng chỉ **3,5:1**, chữ trắng trên nền này **3,7:1**: **chỉ dùng cho đồ họa và chữ lớn**, không dùng cho chữ thường |
| Nhấn | `#F59E0B` | Chữ tối trên cam: **8,3:1**. Cam trên nền xanh chỉ **3,1:1** (chỉ chữ lớn hoặc đường kẻ). Không dùng chữ trắng trên cam (2,1:1) |
| Nền | `#F8FAFC` | Trắng xanh nhạt |
| Chữ | `#0F172A` | **17,1:1** |
| Dẫn xuất | hover `#1942B8` · soft `#EDF1FC` · alt `#EDF1FA` · viền `#D7DADF` · chữ phụ `#5A606D` (**6,0:1**) | |

Hợp với: Gói B. Màu xanh dương sáng cho cảm giác công nghệ, ít "luật" truyền thống hơn P1.

#### P5 – Than đen và đồng · *Cao cấp, kín đáo, sang trọng*

| Token | Mã màu | Tương phản / ghi chú |
|---|---|---|
| Chính | `#22252B` | Chữ trắng: **15,4:1** |
| Phụ | `#3D424B` | Trên nền sáng: **8,9:1** |
| Nhấn | `#B87333` | Chữ tối trên đồng: **5,0:1**. Đồng trên nền than: **4,0:1** (chỉ chữ lớn). Chữ trắng trên đồng **3,8:1** (chỉ chữ lớn đậm) |
| Nền | `#F2F1EF` | Xám ấm nhạt |
| Chữ | `#111111` | **16,7:1** |
| Dẫn xuất | hover `#1D1F25` · soft `#EDEEEE` · alt `#E8E7E5` · viền `#D2D2D0` · chữ phụ `#595958` (**6,2:1**) | |

Hợp với: Gói D. Lưu ý màu đồng kém nổi trên nền tối nếu dùng cho chữ nhỏ; dùng cho đường kẻ, nút CTA.

#### P6 – Xám xanh tối giản · *Tối giản, chuyên nghiệp, trung tính*

| Token | Mã màu | Tương phản / ghi chú |
|---|---|---|
| Chính | `#334155` | Chữ trắng: **10,4:1** |
| Phụ | `#64748B` | Trên nền trắng: **4,8:1** |
| Nhấn | `#0EA5A4` | Chữ tối trên xanh ngọc: **5,9:1**. Xanh ngọc trên nền xám xanh: **3,4:1** (chỉ chữ lớn). Chữ trắng trên xanh ngọc **3,0:1**: không dùng |
| Nền | `#FFFFFF` | Trắng |
| Chữ | `#0F172A` | **17,9:1** |
| Dẫn xuất | hover `#2B3748` · soft `#EFF0F1` · alt `#F5F6F6` · viền `#DDDFE1` · chữ phụ `#5C616E` (**6,2:1**) | |

Hợp với: Gói B. Trung tính, dễ kết hợp với ảnh đủ loại.

#### P7 – Màu riêng theo bộ nhận diện thương hiệu

Khách cung cấp mã màu logo (HEX hoặc tệp vector). Người thiết kế đề xuất 5 màu gốc, kiểm tra tương phản theo bảng trên, và điều chỉnh sắc độ nếu không đạt. **Hệ thống quản trị sẽ tự kiểm tra tương phản** khi admin đổi màu (mục 14.4).

### 4.3 Màu trạng thái (dùng chung mọi bảng màu)

| Trạng thái | Màu chính | Nền nhạt (10%) | Dùng cho | Tương phản chữ trắng |
|---|---|---|---|---|
| Thành công | `#15803D` | `#E8F2EC` | Gửi form thành công, đã lưu | 5,0:1 |
| Cảnh báo | `#B45309` | `#F8EEE6` | Lưu ý, sắp hết hạn | 5,0:1 |
| Lỗi | `#B91C1C` | `#F8E8E8` | Lỗi nhập liệu, thao tác thất bại | 6,5:1 |
| Thông tin | `#1D4ED8` | `#E8EDFB` | Ghi chú, thông báo trung tính | 6,7:1 |

Trên nền nhạt, chữ dùng **màu chữ chính** (độ tương phản trên 14:1), không dùng chữ màu trạng thái cho đoạn dài. Không chỉ dùng màu để báo trạng thái: luôn kèm biểu tượng và chữ.

### 4.4 Quy tắc dùng màu

| Quy tắc | Chi tiết |
|---|---|
| Tỷ lệ 60 – 30 – 10 | Khoảng 60% nền và trắng, 30% màu chính (header, hero, footer, nút), 10% màu nhấn và màu phụ |
| Màu nhấn là điểm nhấn | Mỗi màn hình chỉ vài chỗ: nút CTA chính, đường kẻ mảnh, dấu gạch trên thẻ. Không tô nhiều khối lớn bằng màu nhấn |
| Chữ trên màu nhấn | Luôn là **chữ tối** (`on-accent`), không dùng chữ trắng |
| Màu nhấn không làm chữ trên nền sáng | Tương phản thấp ở mọi bảng màu. Dùng màu chính hoặc màu phụ cho chữ nổi |
| Một nút chính mỗi vùng | Không đặt hai nút tô màu đặc cạnh nhau; nút thứ hai dùng kiểu viền |
| Liên kết | Màu chính, gạch chân khi rê chuột và khi lấy nét; trong đoạn văn luôn gạch chân |
| Nền khối xen kẽ | Xen `nền` và `surface-alt` để chia nhịp, không dùng quá 2 màu nền kề nhau |
| Banner đậm | Nền màu chính; chữ trắng; nút nhấn |

---

## 5. Font chữ và chữ viết

### 5.1 Cặp font đề xuất

Tất cả font dưới đây đều **hỗ trợ tiếng Việt có dấu**, theo giấy phép mã nguồn mở (OFL), dùng miễn phí cho web, và nằm trong bộ Google Fonts. Font sẽ được **tải về và phục vụ từ chính website** (không gọi Google lúc chạy) để nhanh hơn, hợp pháp quyền riêng tư và không bị chặn ở Trung Quốc đại lục.

| Mã | Tiêu đề | Nội dung | Chữ Hán (bản tiếng Trung) | Cảm giác | Hợp gói |
|---|---|---|---|---|---|
| **F1** | Playfair Display (đậm 600–700) | Be Vietnam Pro hoặc Inter (400, 500, 600) | Noto Serif SC (tiêu đề) + Noto Sans SC (nội dung) | Trang trọng, cổ điển, có nét chữ | A, D |
| **F2** | Be Vietnam Pro (600–700) | Be Vietnam Pro (400, 500) | Noto Sans SC | Hiện đại, gọn gàng, thiết kế cho tiếng Việt | B |
| **F3** | Nunito (700–800) | Nunito (400, 600) | Noto Sans SC | Bo tròn, thân thiện | C |
| **F4** | Merriweather (700) | Merriweather (400) hoặc Inter | Noto Serif SC | Học thuật, truyền thống, đọc lâu dễ chịu | D |
| **F5** | Font riêng của khách | Font riêng của khách | Noto Sans SC | Theo bộ nhận diện | Tùy chọn |

Lưu ý với F5: khách phải cung cấp tệp font định dạng web (WOFF2) **kèm giấy phép dùng trên web**. Nếu font không hỗ trợ đủ dấu tiếng Việt hoặc chữ Hán, phải ghép thêm font dự phòng.

### 5.2 Thang cỡ chữ

Cỡ chữ nội dung gốc **16 px** (chọn T1 15 px, T2 16–17 px, T3 18 px ở bản yêu cầu). Bảng dưới là cỡ **chữ máy tính / điện thoại** (px / chiều cao dòng):

| Kiểu | Máy tính | Điện thoại | Độ đậm | Dùng cho |
|---|---|---|---|---|
| Display | 56 / 64 | 36 / 44 | 700 | Tiêu đề banner chính (chỉ một mỗi trang) |
| H1 | 44 / 52 | 32 / 40 | 700 | Tiêu đề trang |
| H2 | 34 / 42 | 26 / 34 | 700 | Tiêu đề khối nội dung |
| H3 | 26 / 34 | 22 / 30 | 600–700 | Tiêu đề phụ |
| H4 | 20 / 28 | 18 / 26 | 600 | Tiêu đề thẻ |
| Body L | 18 / 30 | 17 / 28 | 400 | Đoạn dẫn, mô tả banner, bài viết |
| Body | 16 / 26 | 16 / 26 | 400 | Nội dung chung |
| Small | 14 / 22 | 14 / 22 | 400–500 | Mô tả thẻ, chú thích |
| Caption | 12 / 18 | 12 / 18 | 500 | Ngày đăng, nhãn nhỏ |
| Button | 15 / 20 | 15 / 20 | 600 | Chữ trên nút |
| Overline | 12 / 16 | 12 / 16 | 600 | Nhãn nhỏ phía trên tiêu đề khối, viết hoa, cách chữ 0,08 em |

### 5.3 Quy tắc cho tiếng Việt và tiếng Trung

| Ngôn ngữ | Quy tắc |
|---|---|
| **Tiếng Việt** | Dấu thanh xếp chồng nên cần **chiều cao dòng rộng**: nội dung không dưới 1,5; tiêu đề không dưới 1,25. Chữ viết hoa có dấu (Ắ, Ể...) dễ bị cắt nếu khung quá chặt; chỉ viết hoa với nhãn ngắn (Overline), không viết hoa cả đoạn. Cắt dòng đa dòng theo `line-clamp` cần chừa dư chiều cao |
| **Tiếng Trung** | Chiều cao dòng **1,7** cho nội dung. **Không** in nghiêng, **không** giãn chữ (letter-spacing), **không** viết hoa. Cỡ chữ nên **lớn hơn tiếng Việt 1 px** (17 px thay vì 16 px) để nét chữ rõ. Tiêu đề không quá đậm (500–700). Đặt `lang="zh-CN"` trên thẻ chứa chữ Hán để trình duyệt chọn đúng nét chữ |
| **Cả hai** | Độ rộng dòng tối ưu 60–75 ký tự (khoảng 720 px cho bài viết). Căn trái, không căn đều (justify). Ngắt dòng không để mồ côi một chữ cuối dòng khi có thể |

### 5.4 Cách tải font

- Tự lưu font (dùng cơ chế font tự lưu của Next.js), định dạng **WOFF2**, chỉ giữ các bộ ký tự cần (Latin, Latin mở rộng cho tiếng Việt).
- Font chữ Hán rất nặng: dùng bản **chia nhỏ theo vùng ký tự** (unicode-range) để chỉ tải phần chữ được dùng; chỉ tải trên trang bản tiếng Trung.
- `font-display: swap` để chữ hiện ngay bằng font dự phòng, không bị trống.
- Ngăn xếp font dự phòng ví dụ: `'Be Vietnam Pro', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`; cho chữ Hán: `'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif`.
- Giới hạn tối đa **2 họ font, 4 độ đậm** cho bản tiếng Việt.

---

## 6. Lưới, khoảng cách, bo góc, đổ bóng

### 6.1 Lưới và điểm ngắt màn hình

| Mục | Giá trị |
|---|---|
| Độ rộng nội dung tối đa | **1080 / 1200 / 1440 px** (khách chọn W1 / W2 / W3), mặc định 1200 |
| Lưới | 12 cột; khoảng cách cột 24 px (máy tính), 16 px (điện thoại) |
| Lề hai bên | 24 px (từ tablet trở lên), 16 px (điện thoại) |
| Điểm ngắt | điện thoại < 640 · tablet nhỏ 640 · tablet 768 · máy tính 1024 · rộng 1280 · rất rộng 1536 |
| Nội dung bài viết | Rộng tối đa 720 px, căn giữa |

### 6.2 Thang khoảng cách (đơn vị cơ sở 4 px)

| Token | px | Dùng cho |
|---|---|---|
| space-1 | 4 | Khoảng cách rất nhỏ trong thành phần |
| space-2 | 8 | Giữa biểu tượng và chữ, chip |
| space-3 | 12 | Giữa tiêu đề và mô tả trong thẻ |
| space-4 | 16 | Lề trong nhỏ, khoảng cách giữa các trường nhập |
| space-5 | 24 | Lề trong thẻ, khoảng cách lưới |
| space-6 | 32 | Giữa các cụm trong khối |
| space-7 | 48 | Giữa tiêu đề khối và nội dung khối |
| space-8 | 64 | Lề trên dưới khối nhỏ |
| space-9 | 96 | Lề trên dưới khối lớn (máy tính) |
| space-10 | 128 | Banner chính, khối đặc biệt |

Khoảng cách trên dưới của mỗi khối (section): **96 px** máy tính, **72 px** tablet, **56 px** điện thoại. Admin chọn mức **Nhỏ / Vừa / Lớn** (tương ứng 64 / 96 / 128 px trên máy tính), không nhập số tự do.

### 6.3 Bo góc (theo lựa chọn R1, R2, R3)

| Kiểu | Nhỏ (chip, ô nhập) | Vừa (nút, thẻ nhỏ) | Lớn (thẻ, hộp thoại) | Nút viên thuốc |
|---|---|---|---|---|
| Vuông (`square`) | 0 | 0 | 0 | không dùng |
| Bo nhẹ (`soft`) | 4 px | 8 px | 12 px | 999 px (nếu chọn kiểu nút viên thuốc) |
| Bo vừa (`round`) | 8 px | 16 px | 24 px | 999 px |

### 6.4 Đổ bóng và viền

| Token | Giá trị | Dùng cho |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(16, 24, 40, 0.06)` | Ô nhập, nút nhỏ |
| `shadow-md` | `0 4px 12px rgba(16, 24, 40, 0.08)` | Thẻ khi rê chuột, menu thả xuống |
| `shadow-lg` | `0 12px 32px rgba(16, 24, 40, 0.12)` | Hộp thoại, mega menu, thẻ form trong banner |
| Viền | 1 px, màu `border` | Thẻ kiểu viền mảnh |
| Viền nhấn mạnh | 2 px, màu chính | Ô nhập khi lấy nét, tab đang chọn |

Kiểu thẻ (C1/C2/C3): **viền mảnh** (có viền, không bóng) · **đổ bóng nhẹ** (không viền, `shadow-sm`, rê chuột `shadow-md`) · **nền phẳng** (nền `surface-alt`, không viền, không bóng).

### 6.5 Thứ tự chồng lớp (z-index)

| Lớp | Giá trị |
|---|---|
| Nội dung | 0 |
| Header cố định | 100 |
| Mega menu, menu thả xuống | 200 |
| Nút liên hệ nổi | 300 |
| Nền mờ và hộp thoại | 400 |
| Thông báo (toast) | 500 |

---

## 7. Biểu tượng, hình ảnh, chuyển động

### 7.1 Biểu tượng

| Mục | Quy định |
|---|---|
| Bộ biểu tượng | Một bộ duy nhất, nét thống nhất (đề xuất bộ **Lucide**, giấy phép mã nguồn mở) |
| Kiểu (I1–I4) | Nét mảnh (độ dày nét 1,5 px) · nét đặc · hai tông màu · tranh minh họa vẽ tay |
| Kích thước | 16 (trong chữ) · 20 (nút, menu) · 24 (thẻ) · 48 (khối giá trị, đặt trong vòng tròn nền `primary-soft`) |
| Màu | Mặc định màu chính; trên nền tối là trắng; biểu tượng trạng thái theo màu trạng thái |
| Chữ thay thế | Biểu tượng trang trí: `aria-hidden`; biểu tượng đứng một mình (nút): bắt buộc có nhãn chữ |
| Cờ quốc gia | **Không dùng cờ** cho công tắc ngôn ngữ (ngôn ngữ không phải quốc gia); dùng chữ "VI / 中文" |

### 7.2 Hình ảnh

| Loại ảnh | Tỷ lệ | Kích thước nguồn tối thiểu | Ghi chú |
|---|---|---|---|
| Chân dung luật sư | 4:5 | 800 × 1000 px | **Cùng nền, cùng ánh sáng, cùng cách cắt** cho cả đội ngũ; mắt nhìn gần giữa khung; nên chụp bằng một đợt |
| Ảnh bìa hồ sơ / banner | 21:9 (rộng) hoặc 16:9 | 2000 × 900 px | Nội dung quan trọng đặt cách mép 15% |
| Ảnh bài viết | 16:9 | 1200 × 675 px | |
| Ảnh dịch vụ | 3:2 | 900 × 600 px | |
| Logo đối tác | Khung 160 × 88 px | Vector (SVG) hoặc PNG nền trong suốt 2×, | Đồng nhất độ cao hiển thị, căn giữa |
| Ảnh đại diện lời chứng thực | 1:1 | 160 × 160 px | Chỉ dùng khi khách đồng ý |
| Ảnh chia sẻ mạng xã hội | 1200 × 630 px | | Mỗi trang có thể có ảnh riêng |

Quy định chung:
- **Định dạng**: WebP (AVIF nếu hỗ trợ); tự tạo nhiều kích thước (`srcset`), tải lười ảnh ngoài màn hình đầu.
- **Dung lượng**: mục tiêu mỗi ảnh dưới 200 KB (ảnh banner dưới 350 KB).
- **Chữ thay thế (alt)**: bắt buộc cho ảnh có nghĩa; ảnh trang trí để trống. Alt có bản tiếng Việt và tiếng Trung riêng.
- **Chữ phủ lên ảnh**: dùng lớp phủ tối dạng chuyển sắc `linear-gradient(90deg, màu chính 85%, màu chính 40% ở 60%, trong suốt)` để chữ luôn đạt tương phản 4,5:1.
- **Ảnh stock**: chọn lọc, tránh ảnh "búa gõ cân công lý" sáo mòn; ưu tiên ảnh thật của văn phòng và đội ngũ.
- **Quyền sử dụng**: chỉ dùng ảnh có giấy phép; ảnh người cần văn bản đồng ý (liên quan trường `consent_confirmed_at` trong cơ sở dữ liệu).

### 7.3 Chuyển động (U1–U3)

| Mức | Thời lượng và hiệu ứng |
|---|---|
| **Không** (`none`) | Không hiệu ứng chuyển động. Chỉ đổi màu tức thì khi rê chuột |
| **Nhẹ** (`light`) | Nội dung hiện dần và trượt lên 12 px, 400 ms, **một lần** khi cuộn tới; đổi màu nút 150 ms; thẻ nâng nhẹ 2 px khi rê chuột |
| **Vừa** (`medium`) | Như nhẹ nhưng trượt 24 px; thẻ phóng 1,02 lần; ảnh phóng 1,03 lần khi rê chuột; số liệu đếm lên 1,2 giây; slider chuyển có hiệu ứng trượt |

| Thông số | Giá trị |
|---|---|
| Thời lượng nhanh / thường / chậm | 150 ms / 250 ms / 400 ms |
| Đường cong | `cubic-bezier(0.2, 0.8, 0.2, 1)` |
| Tôn trọng người dùng | Khi hệ điều hành bật "giảm chuyển động" (`prefers-reduced-motion`), **tắt mọi hiệu ứng** trừ đổi màu; slider không tự chạy; số liệu hiện ngay giá trị cuối |
| Không dùng | Hiệu ứng nhấp nháy, tự phát âm thanh, video nền tự phát có tiếng, thanh cuộn tùy biến |

---

## 8. Thành phần giao diện (component)

Quy ước: kích thước tính bằng px; "token" là giá trị đã định nghĩa ở mục 4–6. Mọi thành phần phải có đủ các trạng thái: **mặc định, rê chuột, lấy nét bàn phím, đang bấm, vô hiệu, đang tải** (nếu có ý nghĩa). Vòng lấy nét (focus): viền **2 px màu chính, cách 2 px**; trên nền tối dùng viền trắng.

### 8.1 Nút (Button)

| Biến thể | Giao diện | Dùng cho |
|---|---|---|
| **Chính** | Nền `primary`, chữ `on-primary`, rê chuột `primary-hover` | Hành động quan trọng nhất của vùng (Gửi yêu cầu, Xem hồ sơ) |
| **CTA nhấn** | Nền `accent`, chữ `on-accent` (tối), rê chuột tối đi 8% | Đặt lịch tư vấn trong banner, header |
| **Viền** | Nền trong suốt, viền 2 px `primary`, chữ `primary`; rê chuột nền `primary-soft` | Hành động thứ hai (Xem dịch vụ) |
| **Chữ** | Không nền, chữ `primary`, gạch chân khi rê chuột, kèm mũi tên → | Xem thêm, liên kết hành động nhỏ |
| **Đảo màu** | Nền trắng, chữ `primary` | Trên nền tối (banner, khối CTA) |

| Kích thước | Cao | Lề trái phải | Cỡ chữ |
|---|---|---|---|
| Nhỏ | 36 | 16 | 14 |
| Vừa (mặc định) | 44 | 24 | 15 |
| Lớn | 52 | 32 | 16 |

- Kiểu theo lựa chọn **B1/B2/B3**: nút chính hiện dạng **đặc** (B1), **viền** (B2) hoặc **viên thuốc** (B3, bo tròn hoàn toàn); bo góc các nút khác theo kiểu bo góc đã chọn.
- Biểu tượng đặt trước hoặc sau chữ, cách 8 px, cỡ 20.
- Trạng thái **đang tải**: thay biểu tượng bằng vòng quay, giữ nguyên độ rộng, `aria-busy="true"`, không bấm lại được.
- Vô hiệu: độ mờ 50%, không có hiệu ứng rê chuột, con trỏ `not-allowed`.
- Vùng bấm tối thiểu **44 × 44** trên điện thoại (nút nhỏ có vùng bấm đệm thêm).
- Tối đa **một nút Chính hoặc CTA nhấn** nổi bật trong mỗi vùng nhìn.

### 8.2 Liên kết

Màu `primary`; trong đoạn văn luôn **gạch chân**, rê chuột đậm hơn (`primary-hover`); đã xem: không đổi màu (tránh rối). Liên kết mở trang ngoài có biểu tượng mũi tên chéo nhỏ và `rel="noopener noreferrer"`.

### 8.3 Trường nhập liệu (Form field)

| Thành phần | Quy cách |
|---|---|
| Nhãn | Phía trên ô, 14/22, đậm 600; trường bắt buộc có dấu `*` kèm chữ "(bắt buộc)" cho trình đọc màn hình |
| Ô nhập (text, email, số điện thoại) | Cao 48; lề trong 16; viền 1 px `border`; nền `surface`; chữ 16 (không dưới 16 để iPhone không tự phóng to) |
| Nhiều dòng (textarea) | Cao tối thiểu 120, kéo giãn theo chiều dọc |
| Danh sách chọn (select) | Như ô nhập, mũi tên chevron bên phải; danh sách dài có ô tìm |
| Số điện thoại | Ô chọn mã vùng (+84, +86...) ghép với ô số; mặc định theo ngôn ngữ trang |
| Hộp tick, nút chọn | 20 × 20; hộp tick bo 4 px; nhãn bấm được; khoảng cách 12 giữa các dòng |
| Công tắc | 44 × 24, trạng thái bật `primary` |
| Tải tệp | Vùng thả viền nét đứt 2 px, ghi định dạng và dung lượng tối đa, hiện tên tệp, dung lượng, nút xóa; thanh tiến trình khi tải |
| Văn bản trợ giúp | Dưới ô, 13/20, màu `text-muted` |
| Trạng thái lấy nét | Viền `primary` 2 px + quầng 3 px `primary` độ mờ 20% |
| Trạng thái lỗi | Viền `danger`, biểu tượng lỗi + thông báo ngay dưới ô (không chỉ đổi màu), `aria-invalid` và `aria-describedby` |
| Vô hiệu | Nền `surface-alt`, chữ `text-muted` |
| Chống spam | Ô xác minh (Turnstile/reCAPTCHA) đặt phía trên nút Gửi, không che nội dung |

### 8.4 Các loại thẻ (Card)

**Thẻ chung:** nền `surface`, lề trong 24 (điện thoại 20), bo góc "Lớn". Nếu bấm được: toàn thẻ là vùng bấm; rê chuột nâng 2 px và tăng bóng (chuyển động từ mức Nhẹ).

#### a) Thẻ dịch vụ (kiểu V-A, V-B, V-C)

| Thành phần | Quy cách |
|---|---|
| Số thứ tự | Overline cỡ 16 đậm, màu `secondary` ("01"), tùy chọn |
| Đường nhấn | Dải 3 px màu `accent` ở mép trên thẻ (kiểu V-A) |
| Biểu tượng hoặc ảnh | Biểu tượng 48 trong vòng tròn `primary-soft` (V-B), ảnh 3:2 (V-C) |
| Tiêu đề | H4, tối đa 2 dòng |
| Mô tả | Small, tối đa 3 dòng (`line-clamp`) |
| Liên kết | "Xem chi tiết →" kiểu Chữ |
| Chiều cao | Các thẻ cùng hàng **bằng nhau** |

#### b) Thẻ luật sư

| Thành phần | Quy cách |
|---|---|
| Ảnh chân dung | Tỷ lệ 4:5, bo góc "Vừa"; rê chuột phóng 1,03 lần (mức Vừa) |
| Họ tên | H4; bản tiếng Trung dùng tên Hán |
| Chức danh | Small, `text-muted` |
| Nhãn lĩnh vực | Tối đa 3 chip, còn lại hiện "+2" |
| Ngôn ngữ | Biểu tượng + mã (VI · 中文 · EN) |
| Hành động | "Xem hồ sơ" (kiểu Chữ) hoặc nút nhỏ (kiểu L-C) |
| Số thẻ trên hàng | 4 (máy tính rộng), 3 (máy tính), 2 (tablet), 1–2 (điện thoại) |

#### c) Thẻ bài viết

Ảnh 16:9 bo góc trên · chip chuyên mục · tiêu đề H4 (2 dòng) · trích dẫn Small (3 dòng) · hàng thông tin Caption: ngày đăng · tác giả · thời gian đọc (tính khi hiển thị, không lưu). Kiểu **nổi bật**: ảnh lớn, tiêu đề H3, trích dẫn 4 dòng.

#### d) Thẻ lời chứng thực

Dấu trích dẫn trang trí cỡ lớn màu `accent` (decor, `aria-hidden`) · đoạn trích Body L (tối đa 5 dòng) · ảnh đại diện 48 tròn (nếu có) · tên đậm + công ty Small. Ẩn danh: chỉ ghi "Khách hàng doanh nghiệp". **Chỉ hiện khi đã có sự đồng ý của khách.**

#### e) Ô logo đối tác

Khung 160 × 88, logo căn giữa, tối đa cao 56. Tùy chọn: logo xám 100% rồi hiện màu khi rê chuột. Dạng slider: chạy ngang chậm (khoảng 40 giây một vòng), dừng khi rê chuột hoặc lấy nét; **tĩnh** khi người dùng bật giảm chuyển động. Chỉ hiển thị logo có phép.

#### f) Số liệu nổi bật

Con số Display (48–56) màu `primary` + hậu tố (+, %) màu `accent` (cỡ lớn nên đạt chuẩn) · nhãn Small · ngăn cách dọc 1 px giữa các số (máy tính). Hiệu ứng đếm 1,2 giây khi cuộn tới (chỉ ở mức chuyển động Vừa).

#### g) Giá trị cốt lõi

Biểu tượng 48 trong vòng tròn `primary-soft` · tiêu đề H4 · mô tả Small, căn giữa (máy tính 5 cột; điện thoại 1 cột).

### 8.5 Nhãn, chip, huy hiệu

| Loại | Quy cách |
|---|---|
| Nhãn thông tin | Cao 28; lề 12; bo viên thuốc; nền `primary-soft`; chữ `primary`; cỡ 13/500 |
| Chip lọc (luật sư, bài viết) | Cao 36; nền trắng, viền `border`; **được chọn**: nền `primary`, chữ `on-primary`; có thể bấm bằng bàn phím; cụm chip cuộn ngang trên điện thoại |
| Chip chuyên mục | Nhãn thông tin, bấm được |
| Huy hiệu số (nút liên hệ, thông báo) | Tròn 18–20, nền `danger` hoặc `accent`, chữ 12 đậm |

### 8.6 Header, menu

**Ba kiểu header (H-A, H-B, H-C)** có cùng quy cách chung:

| Thành phần | Quy cách |
|---|---|
| Chiều cao | Máy tính 72 (kiểu B: dải trên 36 + hàng menu 56); điện thoại 60. Tùy chọn **thu nhỏ còn 60** khi cuộn (H2) |
| Cố định | `position: sticky`, `z-index 100`; thêm bóng nhẹ và viền dưới sau khi cuộn quá 16 px (H1) |
| Logo | Cao tối đa 40 (điện thoại 32); bản logo màu cho nền sáng, bản trắng cho nền tối; bấm về trang chủ |
| Mục menu | 15/500; khoảng cách 32; mục đang xem có gạch chân 2 px `accent` |
| Nút CTA | Kiểu CTA nhấn cỡ nhỏ/vừa "Đặt lịch tư vấn" ở cuối bên phải (kiểu A, C) |
| Công tắc ngôn ngữ | "VI \| 中文", chữ đang chọn đậm + gạch chân, `aria-label` rõ, nhớ lựa chọn |
| Dải tiện ích (kiểu C) | Cao 36, nền `primary`, chữ trắng 13: hotline, email, ngôn ngữ |
| Ô tìm kiếm (H3) | Biểu tượng kính lúp mở lớp phủ tìm kiếm (mục 8.14) |

**Mega menu "Dịch vụ pháp lý":**
- Mở khi rê chuột (trễ 150 ms để tránh mở nhầm), khi bấm, và khi lấy nét bàn phím; đóng bằng phím `Esc` hoặc bấm ra ngoài.
- Bảng rộng bằng vùng nội dung, nền `surface`, bóng lớn, bo góc "Lớn".
- Lưới 3–4 cột: mỗi mục gồm biểu tượng 24 + tên + 1 dòng mô tả; có cột nổi bật bên phải (ảnh + nút "Xem tất cả dịch vụ").
- `aria-expanded`, `aria-controls`; di chuyển giữa các mục bằng phím mũi tên.

**Menu điện thoại (M1/M2/M3):**
- Nút ba gạch 44 × 44. **M1** ngăn kéo trượt từ cạnh (rộng 88%, tối đa 360) có lớp mờ phía sau; **M2** phủ toàn màn hình; **M3** thanh tab cố định ở đáy (4–5 mục chính).
- Mục menu cao 56, mục con thu gọn bằng accordion; cuối menu: nút gọi hotline, công tắc ngôn ngữ.
- Khóa cuộn nền khi mở; đóng bằng nút, `Esc`, hoặc vuốt.

### 8.7 Footer (FT-A, FT-B, FT-C)

| Kiểu | Bố cục | Ghi chú |
|---|---|---|
| FT-A | 4 cột: thương hiệu + giới thiệu ngắn + mạng xã hội · dịch vụ · liên kết nhanh · liên hệ + bản đồ nhỏ | Nền `primary`, chữ trắng; lề trên dưới 64 |
| FT-B | Nền tối (than hoặc navy sâu), 3 cột + thanh bản quyền | Dùng với Gói D |
| FT-C | Một hàng: logo, vài liên kết, mạng xã hội, bản quyền | Gọn, hợp Gói B |

Chung: thanh dưới cùng gồm bản quyền, **Chính sách bảo mật**, **Điều khoản sử dụng**; chữ liên kết cỡ 14, tương phản ≥ 4,5:1 trên nền tối; tùy chọn ô đăng ký bản tin và bản đồ nhúng (FT1, FT2).

### 8.8 Banner chính (Hero) (R-A, R-B, R-C, R-D)

| Mục | Quy cách |
|---|---|
| Chiều cao | Máy tính: tối thiểu 560, tối đa 720 (khoảng 70% chiều cao màn hình); điện thoại: tối thiểu 480 |
| Tiêu đề | Display, tối đa 2–3 dòng; Body L cho dòng mô tả, rộng tối đa 60 ký tự |
| Nút | Một nút CTA nhấn + một nút viền; trên điện thoại xếp dọc, rộng bằng nhau |
| Ảnh nền (R-A) | Phủ toàn khung; lớp phủ chuyển sắc (mục 7.2); **video nền** tùy chọn: tự phát, không tiếng, lặp, chỉ máy tính, có ảnh dự phòng, nút tạm dừng |
| Chia đôi (R-B) | Chữ 55% · ảnh 45%; ảnh bo góc "Lớn" |
| Slider (R-C) | 2–4 banner; tự chuyển 5–7 giây, dừng khi rê chuột hoặc lấy nét; mũi tên + chấm; vuốt trên điện thoại; **không tự chạy** khi bật giảm chuyển động |
| Có form (R-D) | Thẻ form 380 rộng, nền `surface`, bóng lớn; 3 trường (họ tên, số điện thoại, lĩnh vực) + nút; trên điện thoại chuyển xuống dưới chữ |

### 8.9 Tiêu đề khối (Section header)

Overline (màu `secondary`) → H2 → mô tả (Body L, tối đa 64 ký tự mỗi dòng) → (tùy chọn) liên kết "Xem tất cả". Khoảng cách 12 / 16 / 24. Căn giữa (trang chủ) hoặc căn trái (trang trong). Cách nội dung 48.

### 8.10 Tab, accordion, đường dẫn, phân trang

| Thành phần | Quy cách |
|---|---|
| **Tab** | Cao 48; tab đang chọn có gạch chân 2 px `primary` + chữ `primary` đậm; trên điện thoại cuộn ngang; dùng phím mũi tên chuyển tab (`role="tablist"`) |
| **Accordion (FAQ, mục hồ sơ)** | Mỗi mục: viền dưới 1 px; câu hỏi 18/28 đậm 600; mũi tên xoay 180° khi mở; câu trả lời Body, lề trên 8; lề trong 20; cho phép mở một hoặc nhiều mục; `aria-expanded` |
| **Breadcrumb** | Caption 14, `text-muted`; ngăn cách bằng chevron; mục cuối không phải liên kết (`aria-current="page"`); đồng thời xuất dữ liệu có cấu trúc BreadcrumbList |
| **Phân trang** | Ô 40 × 40, bo "Vừa"; trang hiện tại nền `primary`; có "Trước / Sau" bằng chữ; hoặc nút "Tải thêm" (B2) |

### 8.11 Form đặt lịch tư vấn (T-A, T-B, T-C)

| Kiểu | Quy cách |
|---|---|
| **T-A** (cạnh nhau) | Cột trái nền `primary`: địa chỉ, hotline, giờ làm việc, biểu tượng; cột phải: form. Trên điện thoại xếp dọc, thông tin lên trên |
| **T-B** (popup) | Hộp thoại (mục 8.12) mở từ mọi nút CTA; 3–4 trường |
| **T-C** (nhiều bước) | 3 bước: (1) thông tin liên hệ · (2) lĩnh vực và nội dung · (3) xác nhận và đồng ý xử lý dữ liệu. Thanh bước có số trong vòng tròn 32, nối bằng đường 2 px; bước hiện tại `aria-current="step"`; có nút "Quay lại" và giữ dữ liệu khi lùi |

Thứ tự trường: Họ tên → Số điện thoại → Email (không bắt buộc) → Lĩnh vực cần tư vấn → Ngôn ngữ mong muốn (T2) → Nội dung → Tệp đính kèm (T1) → Ô tick đồng ý (T3, kèm liên kết Chính sách bảo mật) → Xác minh chống spam → Nút **Gửi yêu cầu**.

Sau khi gửi: hiện thông báo thành công với tiêu đề rõ ("Đã nhận yêu cầu của bạn"), thời gian phản hồi dự kiến, số hotline; hoặc chuyển trang cảm ơn (T4) và email xác nhận tự động. Lỗi: tóm tắt lỗi đầu form, đưa lấy nét vào trường lỗi đầu tiên, **không xóa dữ liệu đã nhập**.

### 8.12 Hộp thoại, thông báo, khung chờ

| Thành phần | Quy cách |
|---|---|
| **Hộp thoại (modal)** | Rộng tối đa 560; nền `surface`; bo "Lớn"; lề trong 32; nền mờ `rgba(15, 23, 42, 0.6)`; nút đóng 44 × 44 góc trên phải; **giữ lấy nét trong hộp**, `Esc` để đóng, khóa cuộn nền; điện thoại: tấm trượt từ dưới lên cao gần toàn màn hình |
| **Thông báo (toast)** | Rộng 360; dưới giữa (điện thoại) hoặc dưới phải; biểu tượng + chữ; tự tắt sau 5 giây (lỗi thì **không tự tắt**); `aria-live="polite"` |
| **Khung thông báo trong trang (alert)** | Nền màu trạng thái nhạt (mục 4.3), viền trái 4 px màu trạng thái, biểu tượng, tiêu đề đậm + nội dung |
| **Khung chờ (skeleton)** | Khối xám `surface-alt` có ánh chạy 1,4 giây; tắt ánh chạy khi giảm chuyển động |
| **Trạng thái trống** | Biểu tượng + câu giải thích + hành động ("Không tìm thấy luật sư phù hợp. Thử bỏ bớt bộ lọc.") |

### 8.13 Nút liên hệ nổi (N-A, N-B, N-C)

| Quy cách chung | Giá trị |
|---|---|
| Kênh | Hotline (bấm để gọi), Zalo, Messenger, WeChat, Email (chọn N1–N5); thứ tự và bật/tắt do admin |
| Kích thước | Nút tròn 56 (máy tính), 48 (điện thoại); cách mép 24 / 16 |
| Màu | Mặc định dùng **màu thương hiệu từng kênh** để nhận diện nhanh (Zalo xanh dương `#0068FF`, WeChat xanh lá `#07C160`, Messenger tím, hotline xanh lá đậm `#2E7D32`); tùy chọn **một màu** theo màu chính nếu khách muốn gọn |
| WeChat | Bấm hiện thẻ nhỏ: mã QR 160 × 160, ID WeChat, nút sao chép ID |
| Vị trí | Cạnh phải (mặc định) hoặc trái; không che nút chính và cookie banner (xếp chồng phía trên) |
| Lớp | `z-index 300` |

- **N-A:** cột nút tròn dọc, cách nhau 12; nút "lên đầu trang" nhỏ hơn (40), chỉ hiện sau khi cuộn quá 400 px.
- **N-B:** thanh cố định dưới cùng trên điện thoại, 4 nút có biểu tượng + nhãn chữ, cao 64, có vùng an toàn cho tai thỏ; chỉ hiện dưới 768 px.
- **N-C:** một nút "Liên hệ" cao 52; bấm xổ danh sách các kênh có nhãn chữ; đóng khi bấm ra ngoài.

### 8.14 Tìm kiếm

- Bấm biểu tượng kính lúp: lớp phủ toàn chiều rộng, ô nhập cao 56, tự lấy nét.
- Gợi ý khi gõ (trễ 250 ms), nhóm theo **Dịch vụ · Luật sư · Bài viết**; dùng phím mũi tên và Enter.
- Tìm được tiếng Việt có dấu và **không dấu**; bản tiếng Trung tìm theo chữ Hán.
- Trang kết quả: tách nhóm, đếm kết quả mỗi nhóm; không có kết quả thì gợi ý từ khóa khác và nút liên hệ.

### 8.15 Dòng thời gian (timeline) và bảng giá

| Thành phần | Quy cách |
|---|---|
| **Timeline** (mốc phát triển) | Đường dọc 2 px màu `border`; nút tròn 12 màu `accent`; năm ở H3 màu `secondary`; điện thoại: một cột |
| **Bảng giá dịch vụ** | Dạng thẻ hoặc bảng 2–3 cột: tên hạng mục · mức phí (khoảng, theo giờ, theo vụ việc) · ghi chú; hàng xen kẽ nền `surface-alt`; mục "báo giá theo yêu cầu" hiện nút **Liên hệ báo giá**; luôn ghi rõ phạm vi và chưa gồm thuế/phí nhà nước (nếu áp dụng); cuộn ngang trên điện thoại hoặc chuyển thành thẻ |

### 8.16 Nội dung bài viết (prose)

| Phần tử | Quy cách |
|---|---|
| Khung đọc | Rộng tối đa 720 (khoảng 68 ký tự), Body L 17–18/30 |
| Tiêu đề trong bài | H2 cách trên 48, dưới 16; H3 cách trên 32, dưới 12; có neo liên kết để làm mục lục |
| Mục lục | Cố định bên phải trên màn hình từ 1280 px; thu gọn thành hộp mở ra ở trên đầu bài với màn nhỏ; mục đang đọc được tô đậm |
| Trích dẫn | Viền trái 4 px `accent`; lề trái 20; chữ Body L; bản Việt có thể nghiêng, **bản Trung không nghiêng** |
| Khung lưu ý pháp lý | Nền `primary-soft`, viền trái 4 px `primary`, biểu tượng + tiêu đề "Lưu ý" |
| Danh sách | Khoảng cách 8 giữa các mục; dấu đầu dòng theo màu `secondary` |
| Ảnh trong bài | Rộng hết khung, bo "Vừa", chú thích 13 `text-muted`, có `alt` |
| Bảng | Cuộn ngang trong khung riêng; tiêu đề cột nền `surface-alt` đậm |
| Cuối bài | Hộp tác giả (ảnh, tên, nút "Xem hồ sơ") · nút chia sẻ · khối "Bài liên quan" · khối CTA "Cần tư vấn về vấn đề này?" |

### 8.17 Bản đồ và video nhúng

- **Bản đồ:** tỷ lệ 16:9 hoặc 4:3, bo "Lớn"; hiện ảnh tĩnh kèm nút "Tải bản đồ" và chỉ nạp iframe khi người dùng bấm (nhanh hơn, tôn trọng quyền riêng tư); nút "Chỉ đường" mở ứng dụng bản đồ.
- **Video:** hiện ảnh bìa + nút phát, chỉ nạp trình phát khi bấm; có phụ đề nếu có.

### 8.18 Thông báo cookie

Thanh cố định đáy trang, cao khoảng 72, nền `surface`, bóng lớn: một câu ngắn + liên kết Chính sách bảo mật + hai nút **Chấp nhận** và **Chỉ cần thiết**. Nằm **dưới** nút liên hệ nổi (nút nổi dịch lên). Nhớ lựa chọn 12 tháng.

---

## 9. Bố cục các trang chính

### 9.1 Trang chủ (thứ tự khối mặc định, khách có thể sắp lại ở mục 5.3.10 bản yêu cầu)

```
┌──────────────────────────────────────────────────────────────┐
│ [Dải tiện ích: hotline | email | VI/中文]   (kiểu header C)  │
│ [Logo]  Giới thiệu  Dịch vụ ▾  Luật sư  Cẩm nang  Liên hệ  [Tư vấn] │
├──────────────────────────────────────────────────────────────┤
│  BANNER CHÍNH   Tiêu đề lớn · mô tả · [Đặt lịch tư vấn][Xem dịch vụ] │
├──────────────────────────────────────────────────────────────┤
│  SỐ LIỆU        10+ năm · 1000+ hồ sơ · 10+ luật sư · 100% tiếng Trung │
├──────────────────────────────────────────────────────────────┤
│  CÂU CHUYỆN THƯƠNG HIỆU   ảnh ◄──► đoạn giới thiệu · [Tìm hiểu thêm] │
├──────────────────────────────────────────────────────────────┤
│  DỊCH VỤ PHÁP LÝ  (lưới 3 × 2)              [Xem tất cả dịch vụ] │
├──────────────────────────────────────────────────────────────┤
│  GIÁ TRỊ CỐT LÕI  (5 ô biểu tượng)                            │
├──────────────────────────────────────────────────────────────┤
│  VĂN HÓA KINH DOANH VIỆT – TRUNG   đoạn + bài viết liên quan   │
├──────────────────────────────────────────────────────────────┤
│  ĐỘI NGŨ LUẬT SƯ  (slider/lưới 4)           [Xem tất cả]       │
├──────────────────────────────────────────────────────────────┤
│  TIÊU ĐIỂM LUẬT  (3 bài mới nhất)           [Xem cẩm nang]     │
├──────────────────────────────────────────────────────────────┤
│  ĐỐI TÁC  (slider logo)                                        │
├──────────────────────────────────────────────────────────────┤
│  CTA / FORM TƯ VẤN                                             │
├──────────────────────────────────────────────────────────────┤
│  FOOTER (4 cột) + thanh bản quyền                              │
└──────────────────────────────────────────────────────────────┘
        [nút liên hệ nổi] cạnh phải · [cookie banner] đáy
```

Nền các khối xen kẽ `nền` và `surface-alt`; banner chính và CTA dùng nền màu chính.

### 9.2 Danh sách luật sư

- Đầu trang: H1 + mô tả ngắn + breadcrumb.
- Bộ lọc theo kiểu L-A/L-B/L-C (mục 5.3.4 bản yêu cầu); số kết quả hiện ("Hiển thị 12 luật sư"); nút "Xóa bộ lọc".
- Lưới thẻ luật sư; không có kết quả: trạng thái trống.
- Cuối trang: khối CTA "Chưa chọn được luật sư? Gửi yêu cầu, chúng tôi sẽ sắp xếp".

### 9.3 Hồ sơ luật sư

| Vùng | Nội dung |
|---|---|
| Đầu hồ sơ | Ảnh chân dung · họ tên (H1) · chức danh · nhãn chuyên môn · ngôn ngữ · số năm kinh nghiệm (tính từ ngày bắt đầu hành nghề) |
| Thân (theo kiểu P-A/P-B/P-C) | Giới thiệu · học vấn, chứng chỉ · kinh nghiệm, vụ việc tiêu biểu · bài viết |
| Thẻ hành động | **Đặt lịch với luật sư này** (form gắn sẵn tên luật sư), số điện thoại, email, WeChat (nếu công khai); tùy chọn cố định khi cuộn (P1) |
| Cuối trang | Dịch vụ liên quan · luật sư cùng chuyên môn |

### 9.4 Trang chi tiết dịch vụ

1. Banner nhỏ: tên dịch vụ (H1), mô tả ngắn, nút **Đặt lịch tư vấn**, breadcrumb.
2. Giới thiệu và phạm vi dịch vụ (khối kéo thả).
3. **Quy trình làm việc**: các bước đánh số, có tài liệu cần chuẩn bị.
4. Vì sao chọn chúng tôi (số liệu, đội ngũ).
5. Bảng giá (nếu công khai).
6. **Luật sư phụ trách** (thẻ luật sư).
7. Hỏi đáp riêng của dịch vụ (accordion).
8. Bài viết liên quan.
9. CTA cuối trang + form.

Có mục lục nhảy nhanh cố định bên trái hoặc thanh neo phía trên khi trang dài.

### 9.5 Cẩm nang, bài viết, kho tri thức

- **Danh sách:** tiêu đề chuyên mục + mô tả; tab hoặc thanh bên chọn chuyên mục (B-A/B-B/B-C); phân trang.
- **Bài viết:** bố cục mục 8.16; cột phải (màn rộng) có mục lục; cuối bài có hộp tác giả và CTA.
- **Kho tri thức tiếng Trung:** cùng khuôn nhưng tiêu đề chuyên mục 6 chủ đề hiển thị dạng thẻ lớn ở trang chỉ mục.

### 9.6 Liên hệ

Tiêu đề · form (T-A) · khối thông tin từng văn phòng (địa chỉ, giờ làm việc, hotline, email) · bản đồ · mã QR WeChat và Zalo · liên kết mạng xã hội.

### 9.7 Trang pháp lý và trang hệ thống

- **Chính sách bảo mật, Điều khoản:** cột đọc 720 px, mục lục, ngày cập nhật.
- **404:** thông báo thân thiện, ô tìm kiếm, các liên kết dịch vụ, về trang chủ.
- **Bảo trì:** logo, thông báo ngắn, thời gian dự kiến, hotline.
- **Cảm ơn sau gửi form:** xác nhận, thời gian phản hồi, hotline, liên kết đọc bài tiêu biểu.

---

## 10. Responsive

### 10.1 Cách hành xử của từng thành phần

| Thành phần | Máy tính (≥ 1024) | Tablet (640–1023) | Điện thoại (< 640) |
|---|---|---|---|
| Header | Menu ngang đầy đủ | Menu ngang rút gọn hoặc ba gạch | Ba gạch + ngăn kéo; hotline bấm để gọi |
| Banner chính | Chữ trái, ảnh phải hoặc ảnh nền | Chia dọc, ảnh dưới chữ | Chữ trước, ảnh sau, nút xếp dọc |
| Lưới dịch vụ | 3 cột | 2 cột | 1 cột (hoặc băng chuyền) |
| Lưới luật sư | 4 cột | 3 cột | 2 cột hoặc danh sách dọc |
| Lưới bài viết | 3 cột | 2 cột | 1 cột |
| Số liệu | 4 ô một hàng | 2 × 2 | 2 × 2 |
| Giá trị cốt lõi | 5 ô một hàng | 3 + 2 | 1 cột |
| Bộ lọc luật sư | Cột bên hoặc thanh ngang | Thanh ngang | Nút "Bộ lọc" mở tấm trượt |
| Form tư vấn | 2 cột (thông tin / form) | 1 cột | 1 cột, trường rộng 100% |
| Footer | 4 cột | 2 cột | 1 cột, mục thu gọn |
| Nút liên hệ nổi | Cột nút tròn cạnh phải | Như máy tính | Cột nhỏ hơn hoặc thanh dưới cùng |
| Mục lục bài viết | Cố định bên phải (≥ 1280) | Hộp mở ra đầu bài | Hộp mở ra đầu bài |
| Bảng | Hiển thị đầy đủ | Cuộn ngang | Cuộn ngang hoặc chuyển thành thẻ |

### 10.2 Nguyên tắc

- Thiết kế **điện thoại trước**, mở rộng lên màn lớn.
- Chữ không nhỏ hơn 14 px ở điện thoại (trừ nhãn 12 px); ô nhập 16 px để không bị tự phóng to trên iPhone.
- Không có cuộn ngang toàn trang; nội dung rộng (bảng, mã) cuộn trong khung riêng.
- Ảnh co theo khung, luôn có tỷ lệ cố định để tránh nhảy bố cục khi tải.
- Kiểm thử bắt buộc trên: iPhone cỡ nhỏ và lớn, một máy Android phổ biến, iPad, màn 1366 và 1920; và trong **trình duyệt tích hợp của WeChat và Zalo**.
- Tôn trọng vùng an toàn (tai thỏ, thanh điều hướng) cho thanh cố định dưới cùng.

---

## 11. Khả năng tiếp cận

Mục tiêu: **WCAG 2.1 mức AA** (lựa chọn U13 ở bản yêu cầu). Mức AA bao gồm các yêu cầu bắt buộc sau:

| Hạng mục | Yêu cầu |
|---|---|
| Tương phản | Chữ thường ≥ 4,5:1; chữ lớn (24 px hoặc 19 px đậm) ≥ 3:1; biểu tượng, viền ô nhập, vòng lấy nét ≥ 3:1. Các bảng màu ở mục 4 đã kiểm tra |
| Bàn phím | Mọi chức năng dùng được bằng bàn phím; thứ tự `Tab` đúng thứ tự đọc; có **liên kết "Chuyển đến nội dung"** ở đầu trang; không có bẫy bàn phím (hộp thoại giữ lấy nét nhưng thoát được bằng `Esc`) |
| Lấy nét thấy được | Vòng lấy nét luôn hiện (2 px, cách 2 px), không dùng `outline: none` nếu không thay thế |
| Cấu trúc | Một `H1` mỗi trang, tiêu đề đi theo thứ tự cấp (H1 → H2 → H3, không nhảy cấp); dùng thẻ ngữ nghĩa (`header`, `nav`, `main`, `footer`, `article`) |
| Ảnh | `alt` mô tả với ảnh có nghĩa; `alt` rỗng với ảnh trang trí; có bản tiếng Trung riêng |
| Form | Mỗi ô có nhãn gắn kết (`label for`); lỗi gắn với ô (`aria-describedby`), không chỉ báo bằng màu; trường bắt buộc nêu rõ bằng chữ |
| Ngôn ngữ | Thẻ `lang="vi"` và `lang="zh-CN"` đúng theo nội dung; đổi ngôn ngữ cập nhật cả thẻ `html lang` |
| Vùng bấm | Tối thiểu 44 × 44 trên điện thoại |
| Chuyển động | Tôn trọng `prefers-reduced-motion`; không nội dung nhấp nháy quá 3 lần mỗi giây; slider và video tự phát có nút tạm dừng |
| Phóng to | Trang dùng được khi phóng to chữ đến 200% và không vỡ bố cục; không chặn việc phóng to (không đặt `user-scalable=no`) |
| Thông báo động | Toast và kết quả tìm kiếm cập nhật dùng `aria-live` |
| Tài liệu tải về | PDF/Word có cấu trúc tiêu đề; nêu rõ định dạng và dung lượng trước khi tải |

**Kiểm thử:** quét tự động (axe, Lighthouse) cho mọi mẫu trang, kiểm tra tay bằng bàn phím, và thử với một trình đọc màn hình (NVDA hoặc VoiceOver) trước khi ra mắt. Công cụ quét tự động chỉ phát hiện một phần lỗi, không thay thế kiểm tra tay.

---

## 12. Chế độ tối (tùy chọn)

Mặc định khuyến nghị **chỉ chế độ sáng** (U4): website công ty luật chủ yếu dùng ban ngày, và chế độ tối làm tăng gấp đôi khối lượng thiết kế và kiểm thử. Chỉ làm khi khách yêu cầu (U5, U6).

Nếu làm, nguyên tắc:

| Hạng mục | Quy tắc |
|---|---|
| Nền | Rất tối nhưng không đen tuyền (khoảng `#0F1115` đến `#14171C`); thẻ sáng hơn nền một bậc |
| Chữ | Không dùng trắng tuyền; chữ chính khoảng `#E8EAED`, chữ phụ giảm độ sáng nhưng giữ ≥ 4,5:1 |
| Màu chính | Dùng **phiên bản sáng hơn** của màu chính cho liên kết và nút (vì màu chính tối sẽ chìm trên nền tối) |
| Màu nhấn | Giữ nguyên |
| Ảnh | Giảm độ sáng khoảng 10%; logo dùng bản trắng |
| Bóng | Thay bằng viền sáng mảnh (bóng không thấy rõ trên nền tối) |
| Kiểm thử | Mỗi bảng màu phải kiểm tra tương phản lại từ đầu cho bộ màu tối |

Chế độ tự theo thiết bị (U6) dùng `prefers-color-scheme`; có công tắc cho người dùng nếu chọn U5.

---

## 13. Giao diện trang quản trị và thư viện khối kéo thả

### 13.1 Giao diện trang quản trị (admin)

Trang quản trị **không chịu theme của website công khai**: dùng một giao diện trung tính, ổn định, để admin đổi màu website không làm hỏng giao diện quản trị.

| Mục | Quy cách |
|---|---|
| Phong cách | Trung tính, mật độ vừa phải, ưu tiên rõ ràng hơn trang trí |
| Bố cục | Thanh bên trái 260 (thu gọn được) · thanh trên 56 (tìm kiếm, ngôn ngữ, tài khoản) · vùng nội dung rộng tối đa 1280 |
| Màu | Nền `#F6F7F9`; thẻ trắng; chữ `#1F2933`; **màu điểm nhấn** của trang quản trị lấy theo màu chính của website (chỉ cho mục đang chọn và nút chính) |
| Font | Be Vietnam Pro hoặc Inter, 14–15 px |
| Thành phần | Dùng thư viện thành phần quản trị sẵn có (đề xuất **shadcn/ui** trên Tailwind) để nhất quán, có sẵn tiếp cận bàn phím |
| Bảng dữ liệu | Có tìm kiếm, lọc, sắp xếp, phân trang; hàng thao tác ở cuối dòng; trạng thái bằng chip màu + chữ |
| Biểu mẫu | Chia nhóm có tiêu đề, nhãn trên ô, lưu nháp tự động, cảnh báo khi rời trang chưa lưu |
| Trạng thái nội dung | Chip: Nháp (xám) · Chờ duyệt (cam) · Đã lên lịch (xanh dương) · Đã đăng (xanh lá) · Lưu trữ (xám nhạt) |
| Phân quyền | Mục không có quyền sẽ **ẩn** khỏi menu, không chỉ vô hiệu hóa |
| Song ngữ | Trên mọi biểu mẫu nội dung có tab ngôn ngữ **Việt | 中文**; tab chưa dịch có chấm cảnh báo |
| Mobile | Dùng được ở mức xem và duyệt; chỉnh sửa kéo thả tối ưu cho máy tính |

### 13.2 Giao diện trình soạn kéo thả (Page Builder)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Thanh công cụ: ← Quay lại · Tên trang · [VI|中文] · Hoàn tác/Làm lại ·     │
│ Máy tính | Tablet | Điện thoại · Xem trước · Lưu nháp · [Xuất bản]        │
├───────────────┬──────────────────────────────────────────┬───────────────┤
│ THƯ VIỆN KHỐI │            KHUNG XEM TRƯỚC               │ THUỘC TÍNH    │
│ (280 px)      │   (hiển thị đúng giao diện thật,         │ (320 px)      │
│  Tìm khối...  │    kéo thả khối vào, sắp lại thứ tự)     │  Nội dung     │
│  ▸ Banner     │                                          │  Kiểu         │
│  ▸ Dịch vụ    │   [Khối đang chọn có viền xanh,          │  Khoảng cách  │
│  ▸ Đội ngũ    │    nút kéo, nhân bản, xóa]               │  Nền          │
│  ▸ Form       │                                          │  Hiện/ẩn theo │
│  ▸ ...        │                                          │  thiết bị     │
└───────────────┴──────────────────────────────────────────┴───────────────┘
```

| Quy cách | Giá trị |
|---|---|
| Khung xem trước | Dùng **chính các thành phần thật** của website, nên admin thấy đúng kết quả; chuyển giữa 1440 / 768 / 390 px |
| Chọn và kéo | Rê vào khối hiện viền; chọn khối hiện thanh công cụ nhỏ: kéo, nhân bản, xóa, lên/xuống |
| Chèn khối | Kéo từ thư viện hoặc bấm dấu "+" giữa hai khối |
| Điều khiển trong bảng thuộc tính | **Giá trị định sẵn** thay vì nhập số tự do (bảng 13.4) |
| Màu | Chỉ chọn từ **bảng màu của theme** (chính, phụ, nhấn, nền, nền xen kẽ); chọn màu tự do cần quyền `theme.edit` |
| Lưu | Lưu nháp tự động; nút **Xuất bản** tách riêng; có lịch sử phiên bản và nút "Khôi phục bản trước" |
| Cảnh báo | Cảnh báo khi thiếu chữ thay thế của ảnh, thiếu bản dịch, hoặc tiêu đề nhảy cấp |

### 13.3 Thư viện khối

| Khối | Biến thể | Admin chỉnh được | Dữ liệu lấy tự động |
|---|---|---|---|
| Banner chính | R-A, R-B, R-C, R-D | Tiêu đề, mô tả, hai nút (chữ + liên kết), ảnh/video nền, lớp phủ, căn lề, số banner (slider) | – |
| Số liệu nổi bật | – | Chọn các số liệu hiển thị, hiệu ứng đếm | Bảng `stat_items` |
| Văn bản + ảnh | Ảnh trái / phải | Tiêu đề, nội dung, ảnh, nút, tỷ lệ cột | – |
| Lưới dịch vụ | V-A, V-B, V-C | Tiêu đề khối, số dịch vụ hiển thị (3–12), nhóm lĩnh vực, hiện/ẩn mô tả | Bảng `services` |
| Giá trị cốt lõi | – | Tiêu đề khối | Bảng `core_values` |
| Đội ngũ luật sư | Lưới / slider | Số lượng, lọc theo lĩnh vực, hiện/ẩn chức danh | Bảng `lawyers` |
| Slider đối tác | – | Tốc độ, xám/màu | Bảng `partners` |
| Bài viết mới | B-A, B-B, B-C | Số bài, chuyên mục, hiện/ẩn trích dẫn | Bảng `posts` |
| Form tư vấn | T-A, T-B, T-C | Tiêu đề, mô tả, các tùy chọn T1–T4 | Bảng `consultation_requests` (khi gửi) |
| Khối kêu gọi (CTA) | – | Tiêu đề, mô tả, nút, nền (chính / nhấn / sáng) | – |
| Bản đồ và liên hệ | – | Chọn văn phòng, hiện/ẩn mã QR | Bảng `offices`, `contact_channels` |
| Hỏi đáp (FAQ) | – | Chọn nhóm (chung hoặc theo dịch vụ) | Bảng `faqs` |
| Lời chứng thực | Slider / lưới | Số lượng | Bảng `testimonials` (chỉ mục có đồng ý) |
| Bảng giá | – | Chọn dịch vụ | Bảng `service_price_items` |
| Video / Thư viện ảnh | – | Liên kết video, ảnh, chú thích | Thư viện `media_files` |
| Khối cơ bản | Tiêu đề, đoạn văn, ảnh, nút, khoảng trống, đường kẻ | Nội dung, căn lề | – |

### 13.4 Các điều khiển có giá trị định sẵn

| Thuộc tính | Lựa chọn |
|---|---|
| Khoảng cách trên/dưới khối | Không · Nhỏ (64) · Vừa (96) · Lớn (128) |
| Cỡ chữ tiêu đề khối | Nhỏ (H3) · Vừa (H2) · Lớn (H1) |
| Căn lề | Trái · Giữa · Phải |
| Nền khối | Trắng · Nền trang · Nền xen kẽ · Màu chính · Nhấn nhạt · Ảnh (kèm lớp phủ) |
| Số cột lưới | 2 · 3 · 4 (điện thoại tự về 1–2) |
| Độ rộng nội dung khối | Chuẩn · Rộng · Toàn màn hình (một số khối) |
| Hiện/ẩn theo thiết bị | Máy tính · Tablet · Điện thoại (tick từng loại) |
| Hiệu ứng khối | Theo theme · Không |

### 13.5 Phần khóa (admin thường không sửa được)

| Phần | Lý do | Ai sửa được |
|---|---|---|
| Logo, favicon, bảng màu chính | Giữ thương hiệu | Người có quyền `theme.edit` |
| Họ font | Giữ nhất quán chữ và tải đúng font | Người có quyền `theme.edit` |
| Cấu trúc header và footer (số cột, vị trí) | Tránh vỡ bố cục | Chỉnh qua biểu mẫu cấu hình, không kéo thả tự do |
| CSS/JS tùy chỉnh | Rủi ro bảo mật và vỡ giao diện | Người có quyền riêng, có xem trước và khôi phục |
| Chính sách bảo mật, điều khoản | Nội dung pháp lý | Biên tập viên có quyền, có lịch sử phiên bản |

---

## 14. Triển khai kỹ thuật: biến CSS và ánh xạ với cơ sở dữ liệu

### 14.1 Biến CSS gốc (mẫu theo P1)

Server đọc dòng `is_active = true` của bảng `themes` và xuất khối biến này vào `<style>` đầu trang. Chỉ **5 màu gốc** được lưu; các màu khác tính ra bằng `color-mix()` (đúng nguyên tắc không lưu trường dẫn xuất).

```css
:root {
  /* 5 màu gốc: lấy từ bảng themes */
  --color-primary:    #1B2A49;
  --color-secondary:  #2F4B7C;
  --color-accent:     #C9A24B;
  --color-bg:         #F7F5EF;
  --color-text:       #1A1A1A;

  /* Dẫn xuất: tính tại trình duyệt, không lưu */
  --color-primary-hover: color-mix(in srgb, var(--color-primary) 85%, black);
  --color-primary-soft:  color-mix(in srgb, var(--color-primary) 8%, white);
  --color-surface:       #FFFFFF;
  --color-surface-alt:   color-mix(in srgb, var(--color-primary) 5%, var(--color-bg));
  --color-border:        color-mix(in srgb, var(--color-text) 14%, var(--color-bg));
  --color-text-muted:    color-mix(in srgb, var(--color-text) 68%, var(--color-bg));
  --color-on-primary:    #FFFFFF;           /* chọn trắng hoặc đen theo tương phản */
  --color-on-accent:     var(--color-text);

  /* Font: lấy từ themes (họ font) */
  --font-heading: 'Playfair Display', 'Noto Serif SC', Georgia, serif;
  --font-body:    'Be Vietnam Pro', 'Noto Sans SC', system-ui, sans-serif;
  --font-size-base: 16px;

  /* Bo góc theo radius_style = soft */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Khung */
  --container-width: 1200px;
}
```

Kết quả `color-mix` này khớp các giá trị tính trong mục 4.2 (ví dụ P1: `primary-hover` = `#17243E`). Trình duyệt phổ biến hiện hỗ trợ `color-mix()`; nếu cần hỗ trợ trình duyệt cũ hơn, bước build có thể tính sẵn các giá trị này ở phía máy chủ.

### 14.2 Ánh xạ cột bảng `themes`

| Cột `themes` | Biến hoặc hành vi giao diện | Giá trị |
|---|---|---|
| `color_primary`, `color_secondary`, `color_accent`, `color_background`, `color_text` | `--color-primary`, `--color-secondary`, `--color-accent`, `--color-bg`, `--color-text` | Mã HEX `#RRGGBB` |
| `font_heading`, `font_body` | `--font-heading`, `--font-body` | Tên họ font trong danh sách cho phép (F1–F5) |
| `base_font_size` | `--font-size-base` | 15–18 (mục T1–T3) |
| `radius_style` | `--radius-sm/md/lg` | `square` 0/0/0 · `soft` 4/8/12 · `round` 8/16/24 |
| `button_style` | Kiểu nút chính | `solid` đặc · `outline` viền · `pill` viên thuốc |
| `card_style` | Kiểu thẻ | `bordered` viền mảnh · `shadow` đổ bóng nhẹ · `flat` nền phẳng |
| `container_width` | `--container-width` | 1080 · 1200 · 1440 |
| `color_mode` | Chế độ sáng/tối | `light` · `dark` · `system` |
| `motion_level` | Mức hiệu ứng | `none` · `light` · `medium` |
| `header_variant` | Kiểu header | `logo_left` (H-A) · `logo_center` (H-B) · `utility_bar` (H-C) |
| `footer_variant` | Kiểu footer | `four_columns` (FT-A) · `dark_three_columns` (FT-B) · `minimal` (FT-C) |
| `floating_variant`, `floating_position` | Nút liên hệ nổi | `side_column` (N-A) · `bottom_bar` (N-B) · `expandable` (N-C); `left` / `right` |
| `custom_css` | CSS tùy chỉnh | Chỉ người có quyền riêng |

Các lựa chọn **riêng từng khối** (kiểu banner R-A..R-D, kiểu lưới dịch vụ V-A..V-C, kiểu lọc luật sư L-A..L-C, kiểu hồ sơ P-A..P-C, kiểu bài viết B-A..B-C, kiểu form T-A..T-C) lưu trong dữ liệu của khối ở cột `content_json` của trang, không nằm trong bảng `themes`.

### 14.3 Cấu hình Tailwind (ví dụ, cú pháp tùy phiên bản)

```js
// tailwind.config.js (rút gọn)
export default {
  theme: {
    extend: {
      colors: {
        primary:   'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent:    'var(--color-accent)',
        surface:   'var(--color-surface)',
        border:    'var(--color-border)',
        muted:     'var(--color-text-muted)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)', md: 'var(--radius-md)', lg: 'var(--radius-lg)',
      },
      maxWidth: { container: 'var(--container-width)' },
      fontFamily: {
        heading: 'var(--font-heading)', body: 'var(--font-body)',
      },
    },
  },
};
```

Nhờ dùng biến CSS, đổi theme chỉ cần thay giá trị biến, **không phải build lại** website.

### 14.4 Bộ kiểm tra tương phản trong trang quản trị

Khi admin có quyền đổi màu và bấm Lưu, hệ thống tự kiểm tra và hiển thị kết quả:

| Phép kiểm tra | Ngưỡng | Hành vi nếu không đạt |
|---|---|---|
| Chữ trên nền | ≥ 4,5:1 | **Chặn lưu** (đây là lỗi dễ đọc) |
| Chữ phụ (`text-muted`) trên nền | ≥ 4,5:1 | Cảnh báo, đề xuất màu thay thế |
| Chữ trên màu chính (`on-primary`) | ≥ 4,5:1 | Tự chọn trắng hoặc đen; nếu cả hai không đạt thì cảnh báo |
| Chữ tối trên màu nhấn (`on-accent`) | ≥ 4,5:1 | Cảnh báo |
| Màu phụ trên nền (khi dùng làm chữ) | ≥ 4,5:1 | Cảnh báo: chỉ dùng cho đồ họa và chữ lớn |
| Màu chính trên nền (liên kết) | ≥ 4,5:1 | Cảnh báo |

Hiển thị xem trước trực tiếp (trước khi lưu) trên một trang mẫu thu nhỏ để admin thấy kết quả.

### 14.5 Tối ưu hiệu năng liên quan giao diện

- Ảnh: WebP/AVIF, `srcset`, tải lười (trừ ảnh màn hình đầu: ưu tiên tải, đặt `fetchpriority="high"` cho ảnh chính của banner).
- Font: tự lưu, WOFF2, `font-display: swap`, tối đa 2 họ.
- Tránh nhảy bố cục: mọi ảnh và khung nhúng có tỷ lệ hoặc kích thước cố định.
- Mục tiêu tham khảo: điểm Lighthouse trên 90 cho hiệu năng, tiếp cận và SEO (theo mục 6.1 bản yêu cầu).

---

## 15. Phiếu chọn dành cho khách hàng

Tick **một** ô mỗi dòng. Các mã tham chiếu mục tương ứng ở tài liệu này và mục 5 của bản thu thập yêu cầu.

### 15.1 Chọn nhanh theo gói

| Gói giao diện | Mô tả ngắn | Chọn |
|---|---|---|
| **A** Trang trọng cổ điển | P1 hoặc P2 · F1 · góc vuông, viền mảnh, đường kẻ vàng | ☐ |
| **B** Hiện đại tối giản | P4 hoặc P6 · F2 · bo nhẹ, nhiều khoảng trắng | ☐ |
| **C** Ấm áp thân thiện | P3 · F3 · bo tròn, nút viên thuốc, biểu tượng hai tông | ☐ |
| **D** Cao cấp quyền lực | P5 · F1 hoặc F4 · góc vuông, ảnh tương phản cao | ☐ |
| Tự chọn từng mục (điền ở 15.2) | | ☐ |

### 15.2 Chọn chi tiết

| Hạng mục | Phương án | Chọn |
|---|---|---|
| **Bảng màu** | P1 Xanh navy + vàng gold | ☐ |
| | P2 Đỏ đô + vàng kem | ☐ |
| | P3 Xanh lục đậm + trắng | ☐ |
| | P4 Xanh dương hiện đại | ☐ |
| | P5 Than đen + đồng | ☐ |
| | P6 Xám xanh tối giản | ☐ |
| | P7 Màu riêng (gửi mã HEX hoặc logo) | ☐ |
| **Font** | F1 Tiêu đề serif + nội dung sans | ☐ |
| | F2 Sans hiện đại toàn bộ | ☐ |
| | F3 Sans bo tròn | ☐ |
| | F4 Serif toàn bộ | ☐ |
| | F5 Font riêng (gửi tệp WOFF2 và giấy phép) | ☐ |
| **Cỡ chữ nội dung** | T1 Nhỏ 15 px · T2 Vừa 16–17 px · T3 Lớn 18 px | ☐ T1 ☐ T2 ☐ T3 |
| **Bo góc** | R1 Vuông · R2 Bo nhẹ · R3 Bo vừa | ☐ R1 ☐ R2 ☐ R3 |
| **Kiểu nút** | B1 Đặc · B2 Viền · B3 Viên thuốc | ☐ B1 ☐ B2 ☐ B3 |
| **Kiểu thẻ** | C1 Viền mảnh · C2 Đổ bóng nhẹ · C3 Nền phẳng | ☐ C1 ☐ C2 ☐ C3 |
| **Biểu tượng** | I1 Nét mảnh · I2 Nét đặc · I3 Hai tông · I4 Minh họa vẽ | ☐ I1 ☐ I2 ☐ I3 ☐ I4 |
| **Hình ảnh** | M1 Ảnh thật · M2 Stock chọn lọc · M3 Minh họa · M4 Kết hợp | ☐ M1 ☐ M2 ☐ M3 ☐ M4 |
| **Độ rộng nội dung** | W1 1080 · W2 1200 · W3 1440 | ☐ W1 ☐ W2 ☐ W3 |
| **Khoảng trắng** | D1 Thoáng · D2 Vừa · D3 Dày thông tin | ☐ D1 ☐ D2 ☐ D3 |
| **Chuyển động** | U1 Không · U2 Nhẹ · U3 Vừa | ☐ U1 ☐ U2 ☐ U3 |
| **Chế độ sáng/tối** | U4 Chỉ sáng · U5 Sáng và tối (tự bật) · U6 Theo thiết bị | ☐ U4 ☐ U5 ☐ U6 |
| **Header** | H-A Logo trái · H-B Logo giữa · H-C Thanh tiện ích | ☐ H-A ☐ H-B ☐ H-C |
| **Banner chính** | R-A Ảnh/video nền · R-B Chia đôi · R-C Slider · R-D Có form | ☐ R-A ☐ R-B ☐ R-C ☐ R-D |
| **Khối dịch vụ** | V-A Lưới thẻ · V-B Danh sách biểu tượng · V-C Băng chuyền | ☐ V-A ☐ V-B ☐ V-C |
| **Danh sách luật sư** | L-A Lọc cột bên · L-B Lọc thanh ngang · L-C Chip + danh sách dọc | ☐ L-A ☐ L-B ☐ L-C |
| **Hồ sơ luật sư** | P-A Ảnh trái + thẻ CTA · P-B Ảnh bìa + tab · P-C Cột đơn thu gọn | ☐ P-A ☐ P-B ☐ P-C |
| **Danh sách bài viết** | B-A Lưới thẻ · B-B Bài nổi bật · B-C Danh sách ngang | ☐ B-A ☐ B-B ☐ B-C |
| **Form tư vấn** | T-A Cạnh nhau · T-B Popup · T-C Nhiều bước | ☐ T-A ☐ T-B ☐ T-C |
| **Nút liên hệ nổi** | N-A Cột nút cạnh phải · N-B Thanh dưới (mobile) · N-C Một nút mở rộng | ☐ N-A ☐ N-B ☐ N-C |
| **Footer** | FT-A 4 cột · FT-B Nền tối 3 cột · FT-C Tối giản | ☐ FT-A ☐ FT-B ☐ FT-C |
| **Menu điện thoại** | M1 Ngăn kéo · M2 Toàn màn hình · M3 Thanh tab dưới | ☐ M1 ☐ M2 ☐ M3 |

### 15.3 Thông tin và tài liệu khách cần cung cấp cho phần giao diện

| Tài liệu | Ghi chú | Đã gửi |
|---|---|---|
| Logo | Bản vector (SVG/AI/PDF); bản màu, bản trắng, bản đen; logo tiếng Trung nếu khác | ☐ |
| Mã màu thương hiệu | Nếu chọn P7 | ☐ |
| Font riêng | Tệp WOFF2 và giấy phép dùng trên web (nếu chọn F5) | ☐ |
| Ảnh chân dung luật sư | Theo quy cách mục 7.2, kèm văn bản đồng ý đăng | ☐ |
| Ảnh văn phòng, đội ngũ, video giới thiệu | Chất lượng cao; hoặc đồng ý chụp mới | ☐ |
| Website tham khảo (thích và không thích) | Điền ở mục 5.2 bản yêu cầu | ☐ |
| Điều tuyệt đối tránh (màu, hình ảnh, biểu tượng) | | ☐ |

### 15.4 Ghi chú và yêu cầu khác của khách

_(khách ghi vào đây)_

---

*Hết tài liệu. Hình minh họa chỉ để chọn hướng; sau khi khách chốt lựa chọn, người thiết kế dựng bản thiết kế chi tiết (mockup) cho các trang chính để khách duyệt trước khi lập trình.*
