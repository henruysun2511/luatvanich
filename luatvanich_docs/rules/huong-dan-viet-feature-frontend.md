# HƯỚNG DẪN CHUẨN MỰC XÂY DỰNG VÀ RÀ SOÁT FEATURE FRONTEND (NEXT.JS 15)
> **Dự án**: Hãng Luật Vạn Ích (`luatvanich_fe`)  
> **Feature tham chiếu chuẩn mực (Golden Standard)**: `offices`  
> **Cập nhật lần cuối**: 23/11/2026

---

## MỤC LỤC
1. [Triết lý Kiến trúc Feature-Based](#1-triết-lý-kiến-trúc-feature-based)
2. [Cấu trúc Thư mục Chuẩn](#2-cấu-trúc-thư-mục-chuẩn)
3. [Chi tiết Triển khai Từng Lớp (Layer by Layer)](#3-chi-tiết-triển-khai-từng-lớp-layer-by-layer)
   - [3.1 Types (`types/<feature>.types.ts`)](#31-types-typesfeaturetypests)
   - [3.2 Schemas (`schemas/<feature>.schema.ts`)](#32-schemas-schemasfeatureschemats)
   - [3.3 Services (`services/<feature>.service.ts`)](#33-services-servicesfeatureservicets)
   - [3.4 Queries (`queries/use<Feature>Query.ts`)](#34-queries-queriesusefeaturequeryts)
   - [3.5 Components UI & Form](#35-components-ui--form)
     - [3.5.1 Form Dialog & Xử lý Media Lifecycle](#351-form-dialog--xử-lý-media-lifecycle)
     - [3.5.2 List Table & Phân trang, Bộ lọc](#352-list-table--phân-trang-bộ-lọc)
     - [3.5.3 Delete Confirmation Dialog](#353-delete-confirmation-dialog)
   - [3.6 Admin Page Router](#36-admin-page-router)
4. [Quy tắc Bắt buộc khi Code Review / Rà soát Feature Frontend](#4-quy-tắc-bắt-buộc-khi-code-review--rà-soát-feature-frontend)
5. [Bảng Checklist Tự Kiểm tra Trước khi Hoàn thành](#5-bảng-checklist-tự-kiểm-tra-trước-khi-hoàn-thành)

---

## 1. Triết lý Kiến trúc Feature-Based

Frontend được tổ chức theo kiến trúc **Feature-Driven Architecture** (hướng tính năng). Toàn bộ logic nghiệp vụ, trạng thái, API, schema và component của một nghiệp vụ nằm trọn vẹn trong một thư mục tại `src/features/<feature-name>/`. Trang Next.js App Router (`src/app/(admin)/admin/<feature-name>/page.tsx`) chỉ đóng vai trò là container tích hợp.

---

## 2. Cấu trúc Thư mục Chuẩn

Mọi feature quản trị trong `luatvanich_fe` phải tuân theo cấu trúc 5 thư mục con + 1 barrel export:

```
src/features/<feature-name>/
├── types/
│   └── <feature-name>.types.ts        # Interfaces, Enums, Query Params, Request/Response DTOs
├── schemas/
│   └── <feature-name>.schema.ts       # Zod schemas cho form validation (tiếng Việt)
├── services/
│   └── <feature-name>.service.ts      # Axios apiClient calls (Admin & Public)
├── queries/
│   └── use<FeatureName>Query.ts       # Query Key Factory, useQuery, useMutation, Sonner toasts
├── components/
│   ├── <FeatureName>ListTable.tsx     # Bảng dữ liệu, search debounce, status filter, pagination
│   ├── <FeatureName>FormDialog.tsx    # Dialog Thêm/Sửa, Tabs song ngữ (vi/zh), Media Lifecycle
│   └── Delete<FeatureName>Dialog.tsx  # Dialog xác nhận xóa mềm
└── index.ts                           # Barrel export các components và hooks
```

---

## 3. Chi tiết Triển khai Từng Lớp (Layer by Layer)

### 3.1 Types (`types/<feature>.types.ts`)
* Định nghĩa rõ trạng thái nội dung (`ContentStatus`): `'draft' | 'published' | 'archived'`.
* Định nghĩa interface song ngữ `TranslationItem` có `languageCode: 'vi' | 'zh-CN'`.
* Định nghĩa interface thực thể `Item` khớp với response backend.
* Định nghĩa interface phân trang `PaginatedResponse`:
  ```typescript
  export interface PaginatedOfficesResponse {
    items: OfficeItem[];
    total: number;
    page: number;
    limit: number;
  }
  ```
* Định nghĩa input types cho `CreateInput`, `UpdateInput`, `QueryParams` (chứa `q`, `page`, `limit`, `status`...).

---

### 3.2 Schemas (`schemas/<feature>.schema.ts`)
* Sử dụng **Zod** để validate form trước khi submit.
* **Tất cả thông báo lỗi phải bằng tiếng Việt tự nhiên**, có kiểm tra tối thiểu, tối đa:
  ```typescript
  export const officeTranslationSchema = z.object({
    languageCode: z.enum(["vi", "zh-CN"]),
    name: z.string().min(2, "Tên không được dưới 2 ký tự").max(200, "Tối đa 200 ký tự"),
    address: z.string().min(5, "Địa chỉ tối thiểu 5 ký tự").max(500, "Tối đa 500 ký tự"),
    workingHours: z.string().max(255).optional().or(z.literal("")),
    description: z.string().optional().or(z.literal("")),
    isComplete: z.boolean().default(false),
  });
  ```
* Với trường số (number), dùng `z.coerce.number()` để tự động parse từ input string:
  ```typescript
  displayOrder: z.coerce.number().int().default(0),
  latitude: z.coerce.number().optional().nullable(),
  ```
* Mảng `translations`: bắt buộc có ít nhất 1 bản dịch:
  ```typescript
  translations: z.array(officeTranslationSchema).min(1, "Cần ít nhất một bản dịch ngôn ngữ"),
  ```
* Export type bằng `z.infer`:
  ```typescript
  export type OfficeFormValues = z.infer<typeof officeFormSchema>;
  ```

---

### 3.3 Services (`services/<feature>.service.ts`)
* Sử dụng instance `apiClient` từ `@/lib/axios` (tự động gắn bearer token và xử lý refresh token).
* Định nghĩa endpoint cố định dạng hằng số ở đầu file:
  ```typescript
  const OFFICES_ADMIN_URL = "/admin/offices";
  const OFFICES_PUBLIC_URL = "/offices";
  ```
* Mọi hàm đều bóc tách dữ liệu từ wrapper backend: `return res.data.data`:
  ```typescript
  export const officesService = {
    getAdminOffices: async (params?: OfficeQueryParams): Promise<PaginatedOfficesResponse> => {
      const res = await apiClient.get<{ data: PaginatedOfficesResponse }>(OFFICES_ADMIN_URL, { params });
      return res.data.data;
    },
    reorderOffices: async (ids: string[]): Promise<void> => {
      await apiClient.patch(`${OFFICES_ADMIN_URL}/reorder`, { ids });
    },
    deleteOffice: async (id: string): Promise<void> => {
      await apiClient.delete(`${OFFICES_ADMIN_URL}/${id}`);
    },
  };
  ```

---

### 3.4 Queries (`queries/use<Feature>Query.ts`)
* **Query Key Factory** (chuẩn mực TanStack Query):
  ```typescript
  export const officesKeys = {
    all: ["offices"] as const,
    lists: () => [...officesKeys.all, "list"] as const,
    list: (params?: OfficeQueryParams) => [...officesKeys.lists(), params] as const,
    details: () => [...officesKeys.all, "detail"] as const,
    detail: (id: string) => [...officesKeys.details(), id] as const,
  };
  ```
* **Danh sách (Query)**:
  * Kiểm tra `enabled: status === 'authenticated'` thông qua `useAuthStore` để không gọi API khi chưa có session.
  * Thêm `placeholderData: (prev) => prev` để giữ dữ liệu cũ khi đổi trang/tìm kiếm, tránh giật lag UI.
* **Mutations (Create / Update / Delete / Reorder)**:
  * Tự động làm mới cache bằng `queryClient.invalidateQueries({ queryKey: officesKeys.lists() })`.
  * Hiển thị thông báo thành công hoặc lỗi qua thư viện `sonner`:
  * Trích xuất thông báo lỗi chính xác qua hàm tiện ích `extractErrorMessage(err)`:
    ```typescript
    onError: (err) => {
      toast.error("Thao tác thất bại", {
        description: extractErrorMessage(err, "Có lỗi xảy ra, vui lòng thử lại."),
      });
    },
    ```

---

### 3.5 Components UI & Form

#### 3.5.1 Form Dialog & Xử lý Media Lifecycle
Đây là phần quan trọng nhất của mọi module quản trị:
* **Form & Validation**: Sử dụng `react-hook-form` kết hợp `@hookform/resolvers/zod`.
* **Giao diện Song ngữ (Tabs vi / zh-CN)**:
  * Sử dụng component Tabs để chuyển đổi giữa Tiếng Việt (`vi`) và Tiếng Trung (`zh-CN`).
  * Có Badge trực quan hiển thị bản dịch đã hoàn thiện hay đang nháp (`isComplete`).
* **VÒNG ĐỜI MEDIA CLOUDINARY (Media Lifecycle - Bắt buộc)**:
  * Sử dụng hook `useMediaLifecycle` (`@/features/media/hooks/useMediaLifecycle`):
    ```typescript
    const { registerUpload, removeMedia, cleanupAbandoned, commitAll } = useMediaLifecycle();
    ```
  * Sử dụng component `<SingleImageUpload />` (`@/features/media/components/SingleImageUpload`):
    * Khi upload ảnh mới: gọi `registerUpload(newUrl)` (nếu có ảnh cũ trước đó, tự động gọi API xóa ảnh cũ trên Cloudinary).
    * Khi người dùng ấn nút xóa "X" trên ảnh: gọi `removeMedia(currentUrl)` -> xóa ngay lập tức khỏi Cloudinary.
    * Khi người dùng đóng form hoặc ấn "Hủy" mà chưa submit: `onOpenChange(false)` gọi `cleanupAbandoned()` -> dọn dẹp sạch toàn bộ các ảnh tạm vừa upload trong phiên này.
    * Khi submit form thành công: gọi `commitAll()` -> giữ lại các ảnh mới và hoàn tất chu trình.

#### 3.5.2 List Table & Phân trang, Bộ lọc
* Hỗ trợ tìm kiếm từ khóa với Debounce (300ms - 500ms).
* Bộ lọc trạng thái (Tất cả / Xuất bản / Bản nháp / Lưu trữ).
* Skeleton loading khi dữ liệu đang tải và Empty State trực quan khi không có dữ liệu.
* Badge trạng thái:
  * Published: màu xanh lá cây (`bg-emerald-50 text-emerald-700`)
  * Draft: màu vàng cam (`bg-amber-50 text-amber-700`)
  * Archived: màu xám (`bg-slate-100 text-slate-600`)
* Nút đổi thứ tự kéo thả (Reorder) nếu module hỗ trợ sắp xếp.

#### 3.5.3 Delete Confirmation Dialog
* Modal xác nhận cảnh báo nguy hiểm trước khi xóa mềm.
* Hiển thị tên/mã của thực thể sắp bị xóa.
* Vô hiệu hóa nút và hiện spinner loading khi mutation xóa đang thực thi.

---

### 3.6 Admin Page Router
Tại `src/app/(admin)/admin/<feature-name>/page.tsx`:
* Component `Page` phía Client hoặc Server bọc component chính của Feature.
* Có Breadcrumb điều hướng và Header tiêu đề trang kèm nút "Thêm mới" kích hoạt Form Dialog.

---

## 4. Quy tắc Bắt buộc khi Code Review / Rà soát Feature Frontend

> [!CAUTION]
> **QUY TẮC BẮT BUỘC KHI ĐƯỢC USER YÊU CẦU KIỂM TRA FRONTEND:**  
> 1. **KHÔNG ĐƯỢC CHẠY `npm run build`** (tránh làm gián đoạn dev server của người dùng). Dùng `tsc --noEmit` hoặc kiểm tra code tĩnh cẩn trọng.  
> 2. **PHẢI MỞ VÀ ĐỌC TỪNG FILE TRONG FEATURE, RÀ SOÁT TỪNG DÒNG (LINE-BY-LINE REVIEW).** Không được bỏ sót types, schema, queries hay components.

### 5 Tiêu chuẩn kiểm tra nghiêm ngặt:
1. **Kiểm tra Media Lifecycle (Chống rác Cloudinary)**:
   * Nếu form có upload ảnh, kiểm tra xem đã tích hợp `useMediaLifecycle` chưa?
   * Người dùng ấn "X" có gọi API xóa ảnh không?
   * Người dùng upload ảnh đè có xóa ảnh cũ không?
   * Đóng form mà không lưu có tự động rollback xóa các ảnh tạm không?
2. **Kiểm tra Zod Schema & Thông báo lỗi tiếng Việt**:
   * Kiểm tra xem các trường text có thông báo tiếng Việt rõ ràng không (không được để thông báo mặc định tiếng Anh `Required`).
   * Các trường số có dùng `z.coerce.number()` để chống lỗi chuỗi thành NaN không?
3. **Kiểm tra Xử lý Lỗi API (Error Toasts)**:
   * Các mutation trong `queries` có dùng `extractErrorMessage(err)` để hiển thị đúng thông báo lỗi từ backend trả về không?
4. **Kiểm tra Invalidation Cache**:
   * Sau khi `create`, `update`, `delete`, `reorder`, cache query key có được `invalidateQueries` đúng cách không?
5. **Kiểm tra Tabs Song ngữ (vi / zh-CN)**:
   * Form có chuyển đổi mượt mà giữa tiếng Việt và tiếng Trung không?
   * Có giữ lại giá trị của cả 2 ngôn ngữ khi submit không?

---

## 5. Bảng Checklist Tự Kiểm tra Trước khi Hoàn thành

Trước khi báo cáo với User rằng một feature frontend đã hoàn thành, bạn PHẢI tự tích đủ các mục sau:

- [ ] Cấu trúc chuẩn 5 thư mục: `types/`, `schemas/`, `services/`, `queries/`, `components/`, và file `index.ts`.
- [ ] Zod schema validate 100% tiếng Việt, type inference đồng bộ với types.
- [ ] Service dùng `apiClient` từ `@/lib/axios` và bóc tách `res.data.data`.
- [ ] Query key factory tổ chức khoa học (`all`, `lists`, `list`, `details`, `detail`).
- [ ] Đầy đủ sonner toast cho trạng thái success và error (`extractErrorMessage`).
- [ ] Tích hợp đầy đủ vòng đời Media Cloudinary (`useMediaLifecycle` + `<SingleImageUpload />`).
- [ ] Form song ngữ hỗ trợ nhập và lưu đồng thời cả `vi` và `zh-CN`.
- [ ] Bảng danh sách có tìm kiếm, lọc trạng thái, phân trang và skeleton loading.
- [ ] Dialog xóa có thông báo xác nhận và loading state.
- [ ] Không có lỗi TypeScript (`npx tsc --noEmit` code 0).
- [ ] Git commit rõ ràng và đã push lên origin `main`.
