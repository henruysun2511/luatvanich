# [TASK SPEC] Triển Khai Hoàn Thiện Module PracticeAreas (`practice-areas`)
**Dự án**: Website Hãng luật Vạn Ích (万益河内律师事务所 - LuatVanIch)  
**Backend**: NestJS (TypeScript) + TypeORM + PostgreSQL  
**Mục tiêu**: Hoàn thiện tầng logic, DTO, Repository, Service và Controller cho module `PracticeAreas` (Lĩnh vực chuyên môn pháp lý).

---

## 1. Bối cảnh & Hiện trạng (Context)

- **Trạng thái hiện tại**: Đã tạo xong 2 Entity và khai báo Module tại:
  - `src/modules/practice-areas/entities/practice-area.entity.ts` (Bảng `practice_areas`)
  - `src/modules/practice-areas/entities/practice-area-translation.entity.ts` (Bảng `practice_area_translations`)
  - `src/modules/practice-areas/practice-areas.module.ts` (Đã đăng ký TypeOrmModule và import vào `AppModule`).
  - Đã liên kết `@ManyToOne` từ `LegalService.entity.ts` sang `PracticeArea`.
- **Nhiệm vụ của bạn**: Xây dựng toàn bộ các tầng còn lại (DTOs, Mappers, Exceptions, Repositories, Service, Controllers cho Public & Admin) theo chuẩn kiến trúc của dự án (tham khảo mẫu module `legal-services`).

---

## 2. Cấu trúc Thư mục cần hoàn thiện

Tạo và hoàn thiện các file trong `src/modules/practice-areas/`:

```
src/modules/practice-areas/
├── dto/
│   ├── request/
│   │   ├── create-practice-area.dto.ts
│   │   ├── update-practice-area.dto.ts
│   │   ├── upsert-practice-area-translation.dto.ts
│   │   ├── practice-area-query.dto.ts
│   │   └── reorder-practice-area.dto.ts
│   └── response/
│       ├── practice-area-public.dto.ts
│       └── practice-area-admin.dto.ts
├── entities/                      # ĐÃ CÓ - KHÔNG CẦN TẠO LẠI
│   ├── practice-area.entity.ts
│   └── practice-area-translation.entity.ts
├── enums/
│   └── (dùng ContentStatus từ common)
├── exceptions/
│   └── practice-area.exception.ts
├── mapper/
│   └── practice-area.mapper.ts
├── repositories/
│   ├── practice-area.repository.ts
│   └── practice-area-translation.repository.ts
├── practice-areas.constant.ts
├── practice-areas.controller.ts          # Public API
├── practice-areas-admin.controller.ts    # Admin CMS API
├── practice-areas.service.ts             # Business Logic
└── practice-areas.module.ts              # Cập nhật providers & controllers
```

---

## 3. Danh sách Endpoints cần hiện thực

### 3.1 Public APIs (`practice-areas.controller.ts`)
*Route prefix: `/practice-areas` (Không yêu cầu đăng nhập, hỗ trợ header `Accept-Language` hoặc query `?lang=`)*

| Method | Endpoint | Query / Body | Mô tả | Response |
|---|---|---|---|---|
| `GET` | `/practice-areas` | `?featured=true` | Lấy danh sách các lĩnh vực đang `published`. Có thể sắp xếp theo `displayOrder ASC`. Trả về kèm số lượng dịch vụ (`servicesCount`). | `PracticeAreaPublicDto[]` |
| `GET` | `/practice-areas/:slug` | — | Lấy chi tiết một lĩnh vực theo `slug` ngôn ngữ hiện tại, kèm danh sách dịch vụ thuộc lĩnh vực này. | `PracticeAreaDetailPublicDto` (nếu không tìm thấy $\rightarrow$ 404) |

### 3.2 Admin CMS APIs (`practice-areas-admin.controller.ts`)
*Route prefix: `/admin/practice-areas` (Bắt buộc xác thực JWT + `@Permissions`)*

| Method | Endpoint | Permission | Mô tả |
|---|---|---|---|
| `GET` | `/admin/practice-areas` | `services:read` | Lấy danh sách quản trị (phân trang, tìm kiếm từ khóa, lọc `status`, `isFeatured`). Trả về kèm tất cả bản dịch (`translations`). |
| `POST` | `/admin/practice-areas` | `services:write` | Tạo mới lĩnh vực kèm bản dịch ban đầu. Tự động sinh `slug` nếu không truyền lên. |
| `GET` | `/admin/practice-areas/:id` | `services:read` | Lấy chi tiết quản trị của một lĩnh vực (đầy đủ các bản dịch `vi` và `zh-CN`). |
| `PATCH`| `/admin/practice-areas/:id` | `services:write` | Cập nhật thông tin chung (`iconUrl`, `isFeatured`, `status`, `displayOrder`) hoặc cập nhật bản dịch. |
| `PATCH`| `/admin/practice-areas/reorder` | `services:write` | Kéo thả đổi thứ tự hiển thị: body `[{ id: string, displayOrder: number }]`. |
| `DELETE`| `/admin/practice-areas/:id`| `services:delete`| Xóa mềm (`softDelete`). **Ràng buộc**: Phải kiểm tra nếu còn dịch vụ (`services`) hoặc luật sư đang liên kết thì chặn lại và trả về lỗi 400. |

---

## 4. Đặc tả chi tiết các File

### 4.1 Exceptions (`exceptions/practice-area.exception.ts`)
Kế thừa từ `HttpException` hoặc các lớp chuẩn của NestJS:
```typescript
import { NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';

export class PracticeAreaNotFoundException extends NotFoundException {
  constructor(idOrSlug: string) {
    super(`Không tìm thấy lĩnh vực pháp lý: ${idOrSlug}`);
  }
}

export class PracticeAreaSlugAlreadyExistsException extends ConflictException {
  constructor(slug: string) {
    super(`Đường dẫn slug "${slug}" đã tồn tại trên hệ thống`);
  }
}

export class PracticeAreaHasServicesException extends BadRequestException {
  constructor(count: number) {
    super(`Không thể xóa lĩnh vực này vì đang có ${count} dịch vụ pháp lý trực thuộc`);
  }
}
```

### 4.2 DTOs (`dto/`)

#### Request DTOs:
1. `create-practice-area.dto.ts`:
   - `iconUrl?: string` (`@IsOptional()`, `@IsString()`, `@MaxLength(500)`)
   - `displayOrder?: number` (`@IsOptional()`, `@IsInt()`)
   - `status?: ContentStatus` (`@IsOptional()`, `@IsEnum(ContentStatus)`)
   - `isFeatured?: boolean` (`@IsOptional()`, `@IsBoolean()`)
   - `translations: UpsertPracticeAreaTranslationDto[]` (`@IsArray()`, `@ValidateNested({ each: true })`, `@Type(() => UpsertPracticeAreaTranslationDto)`)
2. `upsert-practice-area-translation.dto.ts`:
   - `languageCode: LangCode` (`@IsEnum(LangCode)`)
   - `name: string` (`@IsNotEmpty()`, `@MaxLength(200)`)
   - `slug?: string` (`@IsOptional()`, `@MaxLength(220)`)
   - `description?: string` (`@IsOptional()`, `@IsString()`)
   - `metaTitle?: string` (`@IsOptional()`, `@MaxLength(70)`)
   - `metaDescription?: string` (`@IsOptional()`, `@MaxLength(160)`)
   - `isComplete?: boolean` (`@IsOptional()`, `@IsBoolean()`)
3. `update-practice-area.dto.ts`: Kế thừa `PartialType(CreatePracticeAreaDto)`.
4. `reorder-practice-area.dto.ts`:
   - `items: Array<{ id: string; displayOrder: number }>`
5. `practice-area-query.dto.ts`:
   - `status?: ContentStatus`
   - `isFeatured?: boolean`
   - `search?: string`
   - Kế thừa phân trang `PaginationQueryDto` (page, limit).

#### Response DTOs:
1. `practice-area-public.dto.ts`:
   - `id: string`
   - `slug: string`
   - `name: string`
   - `iconUrl?: string`
   - `description?: string`
   - `isFeatured: boolean`
   - `servicesCount?: number`
   - `metaTitle?: string`
   - `metaDescription?: string`
2. `practice-area-admin.dto.ts`:
   - Đầy đủ `id`, `iconUrl`, `displayOrder`, `status`, `isFeatured`, `createdAt`, `updatedAt`.
   - `translations`: mảng các bản dịch đầy đủ.
   - `servicesCount`: số dịch vụ đang gán.

### 4.3 Repositories (`repositories/`)
- Tạo `practice-area.repository.ts` kế thừa `Repository<PracticeArea>`:
  - Hàm `findWithTranslations(id: string)`
  - Hàm `findBySlugAndLang(slug: string, lang: LangCode)`
  - Hàm `findPublicList(lang: LangCode, isFeatured?: boolean)`
  - Hàm `updateOrder(id: string, order: number)`
- Tạo `practice-area-translation.repository.ts` kế thừa `Repository<PracticeAreaTranslation>`.

### 4.4 Mapper (`mapper/practice-area.mapper.ts`)
- `toPublicDto(entity: PracticeArea, lang: LangCode): PracticeAreaPublicDto` (Ưu tiên lấy bản dịch theo `lang`, nếu không có fallback sang ngôn ngữ có sẵn).
- `toAdminDto(entity: PracticeArea): PracticeAreaAdminDto`.

### 4.5 Service (`practice-areas.service.ts`)
Hiện thực các nghiệp vụ:
1. `findAllPublic(lang: LangCode, isFeatured?: boolean)`
2. `findBySlug(slug: string, lang: LangCode)` (kèm `LegalService` có `status = published`)
3. `findAllAdmin(query: PracticeAreaQueryDto)`
4. `findByIdAdmin(id: string)`
5. `create(dto: CreatePracticeAreaDto)`
   - Tự sinh `slug` chuẩn nếu thiếu (dùng slugify tên theo ngôn ngữ).
   - Kiểm tra trùng lặp `slug` qua `PracticeAreaSlugAlreadyExistsException`.
6. `update(id: string, dto: UpdatePracticeAreaDto)`
7. `reorder(items: Array<{ id: string; displayOrder: number }>)`
8. `delete(id: string)`
   - Đếm số lượng services thuộc lĩnh vực này (`legalServiceRepo.count({ where: { practiceAreaId: id } })`).
   - Nếu count > 0 $\rightarrow$ throw `PracticeAreaHasServicesException`.
   - Nếu count === 0 $\rightarrow$ soft delete.

---

## 5. Quy Chuẩn Kỹ Thuật (Checklist Trước Khi Bàn Giao)

- [ ] Tất cả các DTOs đều có validate chặt chẽ bằng `class-validator` và transform bằng `class-transformer`.
- [ ] Controller Admin được bảo vệ bởi `@UseGuards(JwtAuthGuard, PermissionsGuard)` và gắn decorator `@Permissions(...)`.
- [ ] Chạy kiểm tra kiểu dữ liệu:
  ```powershell
  cd luatvanich_be
  npx tsc --noEmit
  ```
  *(Đảm bảo exit code 0, không có bất kỳ lỗi TypeScript nào)*.
- [ ] Tuân thủ quy tắc song ngữ: Không hardcode ngôn ngữ trong SQL/Repository, luôn dựa trên context `LangCode` được inject từ `LangMiddleware`.
