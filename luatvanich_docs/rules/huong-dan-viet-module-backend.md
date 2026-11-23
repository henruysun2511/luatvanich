# HƯỚNG DẪN CHUẨN MỰC XÂY DỰNG VÀ RÀ SOÁT MODULE BACKEND (NESTJS)
> **Dự án**: Hãng Luật Vạn Ích (`luatvanich_be`)  
> **Module tham chiếu chuẩn mực (Golden Standard)**: `offices` & `practice-areas`  
> **Cập nhật lần cuối**: 23/11/2026

---

## MỤC LỤC
1. [Triết lý Kiến trúc & Cấu trúc Thư mục](#1-triết-lý-kiến-trúc--cấu-trúc-thư-mục)
2. [Chi tiết Triển khai Từng Lớp (Layer by Layer)](#2-chi-tiết-triển-khai-từng-lớp-layer-by-layer)
   - [2.1 Entities (Thực thể CSDL)](#21-entities-thực-thể-csdl)
   - [2.2 Repositories (Tầng Dữ liệu)](#22-repositories-tầng-dữ-liệu)
   - [2.3 Services (Tầng Nghiệp vụ)](#23-services-tầng-nghiệp-vụ)
   - [2.4 Controllers (Tầng Giao tiếp API)](#24-controllers-tầng-giao-tiếp-api)
   - [2.5 DTOs (Data Transfer Objects)](#25-dtos-data-transfer-objects)
   - [2.6 Exceptions (Quản lý Ngoại lệ)](#26-exceptions-quản-lý-ngoại-lệ)
   - [2.7 Mappers (Chuyển đổi Dữ liệu)](#27-mappers-chuyển-đổi-dữ-liệu)
   - [2.8 Module Definition](#28-module-definition)
3. [Quy tắc Bắt buộc khi Code Review / Rà soát Module](#3-quy-tắc-bắt-buộc-khi-code-review--rà-soát-module)
4. [Bảng Checklist Tự Kiểm tra Trước khi Hoàn thành](#4-bảng-checklist-tự-kiểm-tra-trước-khi-hoàn-thành)

---

## 1. Triết lý Kiến trúc & Cấu trúc Thư mục

Mọi module trong `luatvanich_be` phải tuân thủ nghiêm ngặt mô hình **Modular Layered Architecture** (Kiến trúc phân tầng module hóa). Tuyệt đối không để xảy ra hiện tượng **Leaky Abstraction** (lộ tầng, Service tự ý gọi DB hoặc Controller tự ý validate thủ công).

### Cấu trúc chuẩn của một module:
```
src/modules/<module-name>/
├── constants/
│   └── <module-name>.constant.ts           # Chỉ chứa danh mục mã lỗi, enum sắp xếp
├── controllers/
│   ├── <module-name>.controller.ts         # Public API (@Public(), đọc req.lang)
│   └── <module-name>-admin.controller.ts   # Admin API (@RequirePermission, RBAC)
├── services/
│   └── <module-name>.service.ts            # Nghiệp vụ thuần, KHÔNG truy vấn DB trực tiếp
├── repositories/
│   ├── <module-name>.repository.ts         # Wrapper Repository cho Entity chính
│   └── <module-name>-translation.repository.ts # Repository cho Entity đa ngữ (nếu có)
├── entities/
│   ├── <module-name>.entity.ts             # Entity chính kế thừa BaseEntity
│   └── <module-name>-translation.entity.ts # Entity bản dịch song ngữ vi / zh-CN
├── dto/
│   ├── request/
│   │   ├── create-<module-name>.dto.ts
│   │   ├── update-<module-name>.dto.ts     # Kế thừa PartialType(CreateDto)
│   │   ├── <module-name>-query.dto.ts      # Kế thừa BaseQueryDto
│   │   ├── reorder-<module-name>.dto.ts    # Chuẩn { ids: string[] }
│   │   └── upsert-<module-name>-translation.dto.ts
│   └── response/
│       ├── <module-name>-admin.dto.ts      # Đầy đủ trường quản trị + translations
│       └── <module-name>-public.dto.ts     # Dữ liệu hiển thị frontend đã localize
├── exceptions/
│   └── <module-name>.exception.ts          # Kế thừa 100% từ AppError
├── mapper/
│   └── <module-name>.mapper.ts             # Chuyển Entity sang DTO an toàn
└── <module-name>.module.ts                 # Module entry point
```

---

## 2. Chi tiết Triển khai Từng Lớp (Layer by Layer)

### 2.1 Entities (Thực thể CSDL)
* **Entity chính**:
  * Phải kế thừa `BaseEntity` (`common/entities/base.entity.ts`), sở hữu sẵn: `id` (UUID v4), `createdAt`, `updatedAt`, `deletedAt` (cho soft delete).
  * Định nghĩa rõ ràng cột hiển thị: `displayOrder` (mặc định 0), `status` (ContentStatus enum: draft, published, archived).
  * Khai báo quan hệ với bảng đa ngữ:
    ```typescript
    @OneToMany(() => OfficeTranslation, (t) => t.office, { cascade: true })
    translations: OfficeTranslation[];
    ```
* **Entity bản dịch (`*_translations`)**:
  * Khóa chính kép: `@PrimaryColumn({ name: '<entity>_id', type: 'uuid' })` và `@PrimaryColumn({ name: 'language_code', length: 10 })`.
  * Khóa ngoại `@ManyToOne` trỏ về entity cha với `{ onDelete: 'CASCADE' }`.
  * Cột `slug` (nếu có) phải đánh index và `@Column({ unique: true })`.

---

### 2.2 Repositories (Tầng Dữ liệu)
* **BẮT BUỘC dùng Wrapper Pattern**, không kế thừa trực tiếp `extends Repository<T>`:
  ```typescript
  @Injectable()
  export class OfficeRepository {
    constructor(
      @InjectRepository(Office)
      private readonly repo: Repository<Office>,
    ) {}

    /** Hỗ trợ truyền manager tùy chọn khi chạy trong transaction */
    private getRepo(manager?: EntityManager): Repository<Office> {
      return manager ? manager.getRepository(Office) : this.repo;
    }
  ```
* **Mọi hàm ghi/sửa/xóa đều phải nhận tham số `manager?: EntityManager`**:
  ```typescript
  async save(entity: Office, manager?: EntityManager): Promise<Office> {
    return this.getRepo(manager).save(entity);
  }

  async updateOrder(id: string, displayOrder: number, manager?: EntityManager) {
    return this.getRepo(manager).update({ id, deletedAt: IsNull() }, { displayOrder });
  }

  async softDelete(id: string, manager?: EntityManager) {
    return this.getRepo(manager).softDelete(id);
  }
  ```
* **Tìm kiếm & Phân trang**:
  * Dùng `normalizePagination(filters)` từ `common/utils/pagination.util`.
  * Tìm kiếm từ khóa `filters.q` dùng `ILIKE` và escape ký tự đặc biệt `%`, `_`, `!`:
    ```typescript
    const search = filters.q?.trim();
    if (search) {
      const term = search.replace(/[!%_]/g, (char: string) => '!' + char);
      query.andWhere('translation.name ILIKE :search ESCAPE \'!\'', { search: `%${term}%` });
    }
    ```

---

### 2.3 Services (Tầng Nghiệp vụ)
* **Nguyên tắc bất di bất dịch**:
  * ❌ **TUYỆT ĐỐI KHÔNG** gọi `dataSource.getRepository(...)` hay `manager.query(...)` trực tiếp trong Service.
  * ❌ **TUYỆT ĐỐI KHÔNG** viết câu lệnh SQL thuần trong Service.
  * ✅ Mọi thao tác cơ sở dữ liệu phải được ủy quyền cho các Repository (`officeRepo`, `translationRepo`).
* **Database Transaction**:
  * Khi thực hiện tác vụ tác động nhiều bảng (VD: tạo office + tạo translations) hoặc tác vụ cập nhật danh sách (reorder), phải bọc trong `this.dataSource.transaction`:
    ```typescript
    async reorder(dto: ReorderOfficeDto): Promise<void> {
      await this.dataSource.transaction(async (manager) => {
        for (let index = 0; index < dto.ids.length; index++) {
          const id = dto.ids[index];
          const result = await this.officeRepo.updateOrder(id, index + 1, manager);
          if (!result.affected) throw new OfficeNotFoundException(id);
        }
      });
    }
    ```
* **Ràng buộc khi xóa (Integrity Check)**:
  * Trước khi `softDelete`, phải kiểm tra dữ liệu phụ thuộc (VD: còn dịch vụ con, còn dữ liệu liên kết không). Nếu còn -> Ném exception nghiệp vụ chặn xóa ngay.

---

### 2.4 Controllers (Tầng Giao tiếp API)
* **Quy ước Route**:
  * Khai báo trực tiếp đường dẫn dạng string:
    * Public: `@Controller({ path: 'offices', version: '1' })`
    * Admin: `@Controller({ path: 'admin/offices', version: '1' })`
  * ❌ Không khai báo hằng số `OFFICE_ROUTE` hay `OFFICE_ADMIN_ROUTE` trong file constant.
* **Public Controller**:
  * Gắn decorator `@Public()` ở cấp class hoặc method.
  * Đọc ngôn ngữ tự động: `@Req() req: Request` -> dùng `req.lang` (do `LangMiddleware` inject), hoặc `@Query('lang')`.
* **Admin Controller**:
  * Gắn quyền hạn RBAC tường minh:
    * `@RequirePermission(PERMISSIONS.SETTINGS_READ)` cho GET
    * `@RequirePermission(PERMISSIONS.SETTINGS_WRITE)` cho POST, PATCH
    * `@RequirePermission(PERMISSIONS.SETTINGS_DELETE)` cho DELETE
* **Validation & DTO**:
  * ✅ **KHÔNG BAO GIỜ** khởi tạo `const reorderValidation = new ValidationPipe(...)` thủ công ngoài class. Hệ thống đã có Global ValidationPipe tại `main.ts`.
  * ✅ Hàm nhận đúng DTO: `@Body() dto: ReorderOfficeDto`, `@Param('id', ParseUUIDPipe) id: string`.
* **Response Wrapper**:
  * Luôn trả về thông qua wrapper chuẩn:
    * `ApiResponse.success(data, 'Thông điệp tiếng Việt rõ ràng')`
    * `ApiResponse.created(data, 'Tạo mới thành công')`
    * `ApiResponse.success(null, 'Cập nhật/Xóa thành công')` hoặc `ApiResponse.noContent('Xóa thành công')`

---

### 2.5 DTOs (Data Transfer Objects)
* **Thông báo lỗi tiếng Việt**:
  * Tất cả validator decorator phải truyền `message` tiếng Việt:
    ```typescript
    @IsString({ message: 'Tên không được để trống' })
    @MaxLength(200, { message: 'Tên tối đa 200 ký tự' })
    name: string;
    ```
* **Swagger Documentation**:
  * Mọi trường phải có `@ApiProperty` hoặc `@ApiPropertyOptional` kèm `example` và `description`.
* **Kế thừa & Chuyển đổi**:
  * `UpdateDto`: Luôn kế thừa `PartialType(CreateDto)`.
  * `QueryDto`: Luôn kế thừa `BaseQueryDto` (đã có `q`, `page`, `limit`, `sortOrder`).
  * `ReorderDto`: Chuẩn hóa duy nhất:
    ```typescript
    export class ReorderOfficeDto {
      @ApiProperty({ type: [String], description: 'Mảng UUID theo thứ tự hiển thị mới' })
      @IsArray({ message: 'ids phải là mảng' })
      @ArrayMinSize(1, { message: 'Danh sách ids không được để trống' })
      @IsUUID('4', { each: true, message: 'Mỗi id phải là UUID v4 hợp lệ' })
      ids: string[];
    }
    ```
  * `Transform Boolean` an toàn:
    ```typescript
    @Transform(({ value }) => {
      if (value === 'true' || value === true) return true;
      if (value === 'false' || value === false) return false;
      return undefined;
    })
    ```

---

### 2.6 Exceptions (Quản lý Ngoại lệ)
* **100% Kế thừa từ `AppError`** (`common/errors/app.error.ts`):
  ```typescript
  export class OfficeNotFoundException extends AppError {
    constructor(idOrCode: string) {
      super({
        code: OFFICE_ERROR_CODE.NOT_FOUND,
        message: `Không tìm thấy văn phòng: ${idOrCode}`,
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
  }
  ```
* **Đăng ký mã lỗi trong `<module>.constant.ts`**:
  ```typescript
  export const OFFICE_ERROR_CODE = {
    NOT_FOUND: 'OFFICE_NOT_FOUND',
    CODE_ALREADY_EXISTS: 'OFFICE_CODE_ALREADY_EXISTS',
    HAS_SERVICES: 'OFFICE_HAS_SERVICES',
  } as const;
  ```

---

### 2.7 Mappers (Chuyển đổi Dữ liệu)
* Bắt buộc có cơ chế **Safe Navigation** chống lỗi Null Pointer khi mảng `translations` rỗng hoặc chưa kịp tải:
  ```typescript
  toPublicResponse(entity: Office, lang: LangCode): OfficePublicDto {
    const localized = entity.translations?.find((t) => t.languageCode === lang)
      ?? entity.translations?.find((t) => t.languageCode === DEFAULT_LANG)
      ?? entity.translations?.[0];

    return {
      id: entity.id,
      name: localized?.name ?? '',
      address: localized?.address ?? '',
      ...
    };
  }
  ```

---

## 3. Quy tắc Bắt buộc khi Code Review / Rà soát Module

> [!CAUTION]
> **QUY TẮC SỐNG CÒN KHI USER YÊU CẦU KIỂM TRA / RÀ SOÁT CODE:**  
> 1. **KHÔNG ĐƯỢC CHỈ CHẠY `npx tsc` RỒI KẾT LUẬN NGAY.** TypeScript chỉ kiểm tra cú pháp và type, hoàn toàn KHÔNG phát hiện được anti-pattern, vi phạm phân tầng hay logic rác.  
> 2. **PHẢI MỞ VÀ ĐỌC TỪNG FILE MỘT, RÀ SOÁT TỪNG DÒNG (LINE-BY-LINE REVIEW).** Không được bỏ sót bất kỳ file nào trong module, kể cả Controller, Mapper, DTO hay Constant.

### 5 Tiêu chí cốt lõi khi rà soát từng dòng:
1. **Kiểm tra vi phạm phân tầng (Layering Check)**:
   * Tìm xem trong `*.service.ts` có chữ `manager.query`, `dataSource.getRepository`, hay SQL string nào không. Nếu có -> **Sai phạm nghiêm trọng**, phải chuyển ngay sang Repository.
2. **Kiểm tra Controller sạch (Controller Cleanliness Check)**:
   * Tìm xem có `new ValidationPipe` nào được khai báo bên ngoài class hay gọi `.transform()` bằng tay không. Nếu có -> **Gỡ bỏ ngay**.
   * Kiểm tra endpoint `reorder`: phải nhận `@Body() dto: ReorderDto` với format `{ ids: string[] }`.
3. **Kiểm tra tàn dư module cũ (Dead Code / Zombie Reference Check)**:
   * Nếu có module nào bị xóa (như `lawyers`), rà soát kỹ xem còn dòng code, comment, decorator, exception hoặc câu query nào (như `to_regclass`) trỏ tới bảng của module đó không. Nếu còn -> **Dọn dẹp sạch sẽ**.
4. **Kiểm tra DTO & Validator Messages**:
   * Kiểm tra từng decorator `@IsString`, `@IsNotEmpty`, `@IsUUID`, `@Min`, `@Max`... xem đã có thông báo tiếng Việt rõ ràng chưa.
   * Kiểm tra xem boolean query param đã có transformer an toàn chưa.
5. **Kiểm tra Exception**:
   * Xem exception class có kế thừa `AppError` không, mã code có trong `<module>.constant.ts` không. Tuyệt đối không dùng trực tiếp `new HttpException()` hay `BadRequestException()` trơ trọi nếu đó là lỗi nghiệp vụ đặc thù.

---

## 4. Bảng Checklist Tự Kiểm tra Trước khi Hoàn thành

Trước khi báo cáo với User rằng một module đã hoàn thành hoặc đã chuẩn hóa, bạn PHẢI tự tích đủ các mục sau:

- [ ] Đã phân bổ đúng thư mục con: `controllers/`, `services/`, `constants/`, `repositories/`, `entities/`, `dto/`, `exceptions/`, `mapper/`.
- [ ] Controller không chứa bất kỳ pipe/transformer thủ công nào.
- [ ] Service không chứa bất kỳ câu lệnh SQL hoặc query DB trực tiếp nào.
- [ ] Toàn bộ Repository dùng Wrapper Pattern `@InjectRepository` và nhận `manager?: EntityManager`.
- [ ] DTO có 100% message validation tiếng Việt và Swagger annotations.
- [ ] Reorder API nhận duy nhất `{ ids: string[] }` và cập nhật thứ tự `index + 1`.
- [ ] Tất cả Exception kế thừa `AppError` với `code` định nghĩa trong constants.
- [ ] Mapper có safe access chống crash khi translations rỗng.
- [ ] Không còn tàn dư của các module đã bị xóa.
- [ ] Chạy `cd luatvanich_be ; npx tsc --noEmit` thoát với mã 0 (0 errors).
- [ ] Git status sạch sẽ, commit rõ ràng theo chuẩn Conventional Commits và đã push lên origin `main`.
