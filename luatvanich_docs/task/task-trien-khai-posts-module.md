# [TASK SPEC] Triển Khai Toàn Diện Phân Hệ Quản Lý Bài Viết & Chuyên Mục (`posts`)

**Dự án**: Website Hãng luật Vạn Ích (万益河内律师事务所 - LuatVanIch)  
**Backend**: NestJS (TypeScript) + TypeORM + PostgreSQL  
**Mục tiêu**: Xây dựng hoàn chỉnh phân hệ `posts` bao gồm: Quản lý Chuyên mục/Thể loại (`post_categories`), Quản lý Bài viết (`posts`), Quản lý Thẻ tag (`tags`) và liên kết Dịch vụ pháp lý (`post_services`), hỗ trợ đa ngôn ngữ (`vi` & `zh-CN`).

> [!IMPORTANT]
> **QUY TẮC RÀ SOÁT BẮT BUỘC TRƯỚC KHI BÀN GIAO**:  
> Người thực hiện task phải tuân thủ nghiêm ngặt tài liệu [huong-dan-viet-module-backend.md](file:///f:/Project/LUATVANICH/luatvanich_docs/huong-dan-viet-module-backend.md). Khi hoàn thành hoặc kiểm tra, **PHẢI RÀ SOÁT KĨ TỪNG DÒNG CODE** của toàn bộ các file trong module, không được bỏ sót bất kỳ dòng nào. Đảm bảo chạy `npx tsc --noEmit` đạt exit code 0 tuyệt đối trước khi bàn giao.

---

## 1. Bối cảnh & Yêu cầu Nghiệp vụ (Business Context)

Phân hệ `posts` chịu trách nhiệm phục vụ toàn bộ nội dung tin tức, cẩm nang và cơ sở tri thức pháp lý của Hãng luật Vạn Ích. Phân hệ gồm 3 trụ cột gắn kết chặt chẽ:

1. **Chuyên mục bài viết (`post_categories`)**:
   - Phân loại bài viết theo 3 phân vùng lớn (`section` enum):
     - `news`: Tin tức & Sự kiện hoạt động hãng luật, thời sự pháp luật.
     - `handbook`: Cẩm nang pháp lý (hướng dẫn thủ tục, quy trình cho doanh nghiệp FDI, thương mại).
     - `knowledge_base`: Cơ sở dữ liệu tri thức, án lệ, văn bản quy phạm và hỏi đáp chuyên sâu.
   - Hỗ trợ cây phân cấp nhiều tầng (`parent_id`) để dựng thanh điều hướng (Breadcrumb).
   - Ràng buộc: **Không cho phép xóa chuyên mục nếu còn bài viết trực thuộc**.

2. **Bài viết (`posts`)**:
   - Thuộc một chuyên mục chính (`categoryId`).
   - Có thể gắn với một luật sư tác giả (`authorLawyerId` nullable).
   - Nội dung song ngữ độc lập (`post_translations`): Tiêu đề, slug riêng biệt theo ngôn ngữ, tóm tắt, nội dung chi tiết Rich Text/HTML, SEO Meta Title/Description.
   - Vòng đời trạng thái: `draft` $\rightarrow$ `in_review` $\rightarrow$ `scheduled` $\rightarrow$ `published` $\rightarrow$ `archived`.
   - Tự động sinh mục lục, tính thời gian đọc ước tính, tăng lượt xem (`viewsCount`).

3. **Thẻ tag (`tags`) & Dịch vụ liên quan (`post_services`)**:
   - Thẻ từ khóa dùng chung (`tags` + `tag_translations`) để phân nhóm theo chủ đề liên ngành.
   - Liên kết nhiều - nhiều với dịch vụ pháp lý (`post_services`) để hiển thị dịch vụ liên quan dưới chân bài viết.

---

## 2. Cấu trúc Thư mục Module Chuẩn Mực

Toàn bộ mã nguồn phải đặt trong `src/modules/posts/` và tuân theo phân cấp thư mục chuẩn:

```
src/modules/posts/
├── controllers/
│   ├── posts.controller.ts                  # Public API Bài viết
│   ├── posts-admin.controller.ts            # Admin CMS API Bài viết
│   ├── post-categories.controller.ts        # Public API Chuyên mục
│   ├── post-categories-admin.controller.ts  # Admin CMS API Chuyên mục
│   ├── tags.controller.ts                   # Public API Thẻ tag
│   └── tags-admin.controller.ts             # Admin CMS API Thẻ tag
├── services/
│   ├── posts.service.ts                     # Nghiệp vụ Bài viết
│   ├── post-categories.service.ts           # Nghiệp vụ Chuyên mục
│   └── tags.service.ts                      # Nghiệp vụ Thẻ tag
├── repositories/
│   ├── post.repository.ts
│   ├── post-translation.repository.ts
│   ├── post-category.repository.ts
│   ├── post-category-translation.repository.ts
│   ├── tag.repository.ts
│   └── tag-translation.repository.ts
├── entities/
│   ├── post.entity.ts
│   ├── post-translation.entity.ts
│   ├── post-category.entity.ts
│   ├── post-category-translation.entity.ts
│   ├── tag.entity.ts
│   ├── tag-translation.entity.ts
│   ├── post-tag.entity.ts
│   └── post-service.entity.ts
├── dto/
│   ├── request/
│   │   ├── create-post.dto.ts
│   │   ├── update-post.dto.ts
│   │   ├── upsert-post-translation.dto.ts
│   │   ├── post-query.dto.ts
│   │   ├── create-post-category.dto.ts
│   │   ├── update-post-category.dto.ts
│   │   ├── upsert-post-category-translation.dto.ts
│   │   ├── post-category-query.dto.ts
│   │   ├── reorder-post-categories.dto.ts
│   │   ├── create-tag.dto.ts
│   │   ├── update-tag.dto.ts
│   │   └── tag-query.dto.ts
│   └── response/
│       ├── post-public.dto.ts
│       ├── post-detail-public.dto.ts
│       ├── post-admin.dto.ts
│       ├── post-category-public.dto.ts
│       ├── post-category-admin.dto.ts
│       └── tag-response.dto.ts
├── exceptions/
│   └── post.exception.ts
├── mapper/
│   ├── post.mapper.ts
│   ├── post-category.mapper.ts
│   └── tag.mapper.ts
├── constants/
│   └── posts.constant.ts                    # Chỉ chứa Error Code / Phân trang mặc định
└── posts.module.ts
```

---

## 3. Thiết Kế Cơ Sở Dữ Liệu (Entities)

### 3.1 Bảng `post_categories` & `post_category_translations`
- `post_categories`:
  - `id`: UUID (Primary Key)
  - `section`: Enum (`news`, `handbook`, `knowledge_base`) - NOT NULL
  - `parentId`: UUID nullable (Khóa ngoại tự tham chiếu `post_categories.id`, `onDelete: SET NULL`)
  - `displayOrder`: `integer`, mặc định `0`
  - `createdAt`, `updatedAt`, `deletedAt` (Soft Delete)
- `post_category_translations`:
  - `id`: UUID
  - `categoryId`: UUID (Khóa ngoại `post_categories.id`, `onDelete: CASCADE`)
  - `languageCode`: Enum (`vi`, `zh-CN`)
  - `name`: `varchar(200)` - NOT NULL
  - `slug`: `varchar(220)` - NOT NULL (Unique theo `languageCode` + `slug`)
  - `description`: `text` nullable

### 3.2 Bảng `posts` & `post_translations`
- `posts`:
  - `id`: UUID (Primary Key)
  - `categoryId`: UUID (Khóa ngoại `post_categories.id`, `onDelete: RESTRICT`)
  - `authorLawyerId`: UUID nullable (Khóa ngoại `lawyers.id`, `onDelete: SET NULL`)
  - `thumbnailUrl`: `varchar(500)` nullable
  - `status`: Enum `ContentStatus` (`draft`, `in_review`, `scheduled`, `published`, `archived`)
  - `isFeatured`: `boolean`, mặc định `false`
  - `publishAt`: `timestamptz` nullable
  - `viewsCount`: `integer`, mặc định `0`
  - `createdAt`, `updatedAt`, `deletedAt`
- `post_translations`:
  - `id`: UUID
  - `postId`: UUID (Khóa ngoại `posts.id`, `onDelete: CASCADE`)
  - `languageCode`: Enum (`vi`, `zh-CN`)
  - `title`: `varchar(300)` - NOT NULL
  - `slug`: `varchar(320)` - NOT NULL (Unique theo `languageCode` + `slug`)
  - `summary`: `text` nullable
  - `contentHtml`: `text` - NOT NULL (Nội dung bài viết)
  - `metaTitle`: `varchar(70)` nullable
  - `metaDescription`: `varchar(160)` nullable
  - `isComplete`: `boolean`, mặc định `false`

### 3.3 Bảng `tags`, `tag_translations`, `post_tags`, `post_services`
- `tags`:
  - `id`: UUID
  - `colorHex`: `varchar(20)` nullable (Màu sắc badge tag)
- `tag_translations`:
  - `tagId`: UUID, `languageCode`: Enum, `name`: `varchar(100)`, `slug`: `varchar(120)`
- `post_tags`:
  - `postId`: UUID, `tagId`: UUID (Composite Key)
- `post_services`:
  - `postId`: UUID, `serviceId`: UUID (Composite Key)

---

## 4. Đặc Tả Danh Sách Endpoints (API Specification)

### 4.1 Chuyên Mục Bài Viết (Post Categories)

#### Public API (`post-categories.controller.ts`)
*Prefix: `/post-categories`*
- `GET /post-categories`: Lấy cây chuyên mục theo ngôn ngữ hiện tại, query lọc `?section=news|handbook|knowledge_base`.
- `GET /post-categories/:slug`: Lấy chi tiết chuyên mục kèm số lượng bài viết trực thuộc.

#### Admin API (`post-categories-admin.controller.ts`)
*Prefix: `/admin/post-categories` (Yêu cầu JWT Guard + `@Permissions('posts:read')` / `'posts:manage'`)*
- `GET /admin/post-categories`: Danh sách chuyên mục (phân trang, lọc `section`, từ khóa, trả về đủ bản dịch).
- `POST /admin/post-categories`: Tạo mới chuyên mục kèm bản dịch ban đầu.
- `GET /admin/post-categories/:id`: Chi tiết chuyên mục theo ID.
- `PATCH /admin/post-categories/:id`: Cập nhật thông tin (`section`, `parentId`, `displayOrder`, bản dịch).
- `PATCH /admin/post-categories/reorder`: Đổi thứ tự hiển thị (Body chuẩn: `{ ids: string[] }`).
- `DELETE /admin/post-categories/:id`: Xóa mềm chuyên mục. **Chặn xóa và ném lỗi 400 nếu chuyên mục còn bài viết trực thuộc hoặc còn chuyên mục con**.

---

### 4.2 Thẻ Tag (Tags)

#### Public API (`tags.controller.ts`)
*Prefix: `/tags`*
- `GET /tags`: Lấy danh sách thẻ đang có bài viết.
- `GET /tags/:slug/posts`: Lấy danh sách bài viết thuộc thẻ tag.

#### Admin API (`tags-admin.controller.ts`)
*Prefix: `/admin/tags` (Yêu cầu JWT Guard + `@Permissions('posts:write')`)*
- `GET /admin/tags`: Danh sách thẻ quản trị.
- `POST /admin/tags`: Tạo mới thẻ tag kèm bản dịch.
- `PATCH /admin/tags/:id`: Sửa thẻ tag.
- `DELETE /admin/tags/:id`: Xóa thẻ tag (gỡ liên kết trong `post_tags`).

---

### 4.3 Bài Viết (Posts)

#### Public API (`posts.controller.ts`)
*Prefix: `/posts`*
- `GET /posts`: Danh sách bài viết phân trang. Lọc theo: `section`, `categorySlug`, `tagSlug`, `lawyerId`, `serviceId`, `q` (từ khóa).
- `GET /posts/latest`: Danh sách bài viết mới nhất (tiêu điểm luật trang chủ). Query: `?limit=5&category=`.
- `GET /posts/:slug`: Chi tiết bài viết theo slug ngôn ngữ hiện tại. Trả về: nội dung HTML, thông tin tác giả luật sư, thẻ tag, dịch vụ liên kết, chuyên mục, danh sách tiêu đề tự sinh (Table of Contents), thời gian đọc ước tính (Reading time).
- `GET /posts/:slug/related`: Danh sách bài viết liên quan (ưu tiên cùng chuyên mục, chung thẻ tag).
- `POST /posts/:slug/view`: Tăng biến đếm lượt xem bài viết (`viewsCount`).

#### Admin API (`posts-admin.controller.ts`)
*Prefix: `/admin/posts` (Yêu cầu JWT Guard + `@Permissions('posts:read')` / `'posts:write'` / `'posts:publish'` / `'posts:delete'`)*
- `GET /admin/posts`: Danh sách quản trị (phân trang, lọc `status`, `categoryId`, `authorLawyerId`, `isFeatured`, tìm kiếm `q`).
- `POST /admin/posts`: Tạo bài viết mới kèm nội dung bản dịch ban đầu.
- `GET /admin/posts/:id`: Chi tiết bài viết quản trị (bao gồm các bản dịch `vi` & `zh-CN`, danh sách tag ID, dịch vụ ID liên kết).
- `PATCH /admin/posts/:id`: Cập nhật bài viết (thông tin chung, chuyên mục, ảnh bìa, tác giả, tag, dịch vụ và bản dịch).
- `PATCH /admin/posts/:id/status`: Đổi nhanh trạng thái bài viết (`draft`, `in_review`, `scheduled`, `published`, `archived`).
- `DELETE /admin/posts/:id`: Xóa mềm bài viết.

---

## 5. Quy Tắc Code & Ràng Buộc Kỹ Thuật Chi Tiết

1. **Chuẩn hóa Hằng số & Route**:
   - Khai báo trực tiếp path trong Decorator `@Controller('posts')` và `@Controller('admin/posts')`.
   - Trong `constants/posts.constant.ts`, **CHỈ** định nghĩa mã lỗi nghiệp vụ:
     ```typescript
     export const POST_ERROR_CODE = {
       NOT_FOUND: 'POST_NOT_FOUND',
       SLUG_ALREADY_EXISTS: 'POST_SLUG_ALREADY_EXISTS',
       CATEGORY_NOT_FOUND: 'POST_CATEGORY_NOT_FOUND',
       CATEGORY_HAS_POSTS: 'POST_CATEGORY_HAS_POSTS',
       CATEGORY_HAS_CHILDREN: 'POST_CATEGORY_HAS_CHILDREN',
       TAG_NOT_FOUND: 'TAG_NOT_FOUND',
     } as const;
     ```

2. **DTO Reorder đồng bộ**:
   - DTO đổi thứ tự `reorder-post-categories.dto.ts` **chỉ nhận mảng ID**:
     ```typescript
     import { IsArray, IsUUID } from 'class-validator';

     export class ReorderPostCategoriesDto {
       @IsArray()
       @IsUUID('4', { each: true })
       ids: string[];
     }
     ```

3. **Exceptions riêng biệt (`exceptions/post.exception.ts`)**:
   - Ném ngoại lệ chuẩn NestJS:
     - `PostNotFoundException` (404)
     - `PostCategoryNotFoundException` (404)
     - `PostSlugAlreadyExistsException` (409)
     - `PostCategoryHasPostsException` (400 - "Không thể xóa chuyên mục vì đang chứa {count} bài viết")
     - `PostCategoryHasChildrenException` (400 - "Không thể xóa chuyên mục vì còn chuyên mục con trực thuộc")

4. **Xử lý Tự động sinh Slug & Fallback bản dịch**:
   - Khi tạo bài viết hoặc chuyên mục, nếu người dùng không nhập `slug`, hệ thống tự sinh slug chuẩn SEO từ tiêu đề/tên.
   - Khi query Public API theo ngôn ngữ `lang`, nếu bản dịch theo ngôn ngữ yêu cầu chưa hoàn thiện (`isComplete = false`) hoặc không có, có thể fallback sang tiếng Việt (`vi`).

5. **Dọn dẹp tệp tin Media rác**:
   - Tích hợp kiểm tra thumbnail URL qua dịch vụ Media hoặc Cloudinary lifecycle để không lưu trữ các URL ảnh rác.

---

## 6. Checklist Nghiệm Thu Bắt Buộc (Acceptance Criteria)

- [ ] **Rà soát từng dòng code (Line-by-line inspection)**: Đã kiểm tra từng dòng của tất cả file mới tạo trong module `posts`, đảm bảo tuân thủ [huong-dan-viet-module-backend.md](file:///f:/Project/LUATVANICH/luatvanich_docs/huong-dan-viet-module-backend.md).
- [ ] **Kiểm tra TypeScript**: Chạy `cd luatvanich_be; npx tsc --noEmit` đạt mã thoát `0` (không có bất kỳ warning/error nào).
- [ ] **Bảo vệ quyền truy cập**: Toàn bộ Admin Controllers được gắn `@UseGuards(JwtAuthGuard, PermissionsGuard)` và phân quyền `@Permissions(...)` đầy đủ.
- [ ] **Ràng buộc toàn vẹn dữ liệu**:
  - Không thể xóa chuyên mục đang có bài viết.
  - Không thể tạo 2 bài viết/chuyên mục có cùng `slug` trong cùng một ngôn ngữ `languageCode`.
- [ ] **Đăng ký Module**: Đã import `PostsModule` vào `AppModule`.
