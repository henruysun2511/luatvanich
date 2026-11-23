import { ApiProperty } from '@nestjs/swagger';
import { LangCode } from '../../../../common/enums/lang.enum';
import { PostSection } from '../../enums/post-section.enum';

export class PostCategoryTranslationDto {
  @ApiProperty({ description: 'Ngôn ngữ', example: "vi", enum: LangCode })
  languageCode: LangCode;

  @ApiProperty({ description: 'Tên hiển thị', example: "Đầu tư FDI" })
  name: string;

  @ApiProperty({ description: 'Đường dẫn theo ngôn ngữ', example: "dau-tu-fdi" })
  slug: string;

  @ApiProperty({ description: 'Mô tả chuyên mục', example: "Tin tức đầu tư", type: String, nullable: true })
  description: string | null;

  @ApiProperty({ description: 'Ngày sửa', example: "2026-11-24T00:00:00Z" })
  updatedAt: Date;
}

export class PostCategoryAdminDto {
  @ApiProperty({ description: 'UUID', example: "a3da8be5-519e-4459-930f-ea3bd1eaf15c" })
  id: string;

  @ApiProperty({ description: 'ID chuyên mục cha', example: null, type: String, nullable: true })
  parentId: string | null;

  @ApiProperty({ description: 'Phân vùng nội dung', example: "news", enum: PostSection })
  section: PostSection;

  @ApiProperty({ description: 'Thứ tự hiển thị', example: 1 })
  displayOrder: number;

  @ApiProperty({ description: 'Ngày tạo', example: "2026-11-24T00:00:00Z" })
  createdAt: Date;

  @ApiProperty({ description: 'Ngày sửa', example: "2026-11-24T00:00:00Z" })
  updatedAt: Date;

  @ApiProperty({ type: [PostCategoryTranslationDto], description: 'Các bản dịch chuyên mục' })
  translations: PostCategoryTranslationDto[];
}
