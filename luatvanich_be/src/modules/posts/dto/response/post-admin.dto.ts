import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LangCode } from '../../../../common/enums/lang.enum';
import { PostStatus } from '../../enums/post-status.enum';
import { TagPublicDto } from './tag-response.dto';

export class PostTranslationDto {
  @ApiProperty({ description: 'Ngôn ngữ', example: "vi", enum: LangCode })
  languageCode: LangCode;

  @ApiProperty({ description: 'Tiêu đề bài viết', example: "Hướng dẫn đầu tư" })
  title: string;

  @ApiProperty({ description: 'Đường dẫn theo ngôn ngữ', example: "dau-tu-fdi" })
  slug: string;

  @ApiProperty({ description: 'Tóm tắt', example: "Giới thiệu thủ tục đầu tư", type: String, nullable: true })
  summary: string | null;

  @ApiPropertyOptional({ description: 'Nội dung HTML đã làm sạch', example: "<h2>Đầu tư</h2>" })
  contentHtml?: string;

  @ApiProperty({ description: 'Tiêu đề SEO', example: "Đầu tư FDI", type: String, nullable: true })
  metaTitle: string | null;

  @ApiProperty({ description: 'Mô tả SEO', example: "Hướng dẫn đầu tư", type: String, nullable: true })
  metaDescription: string | null;

  @ApiProperty({ description: 'Bản dịch đã hoàn thiện', example: true })
  isComplete: boolean;

  @ApiProperty({ description: 'Ngày sửa', example: "2026-11-24T00:00:00Z" })
  updatedAt: Date;
}

export class PostAdminDto {
  @ApiProperty({ description: 'UUID', example: "a3da8be5-519e-4459-930f-ea3bd1eaf15c" })
  id: string;

  @ApiProperty({ description: 'ID chuyên mục', example: "a3da8be5-519e-4459-930f-ea3bd1eaf15c" })
  categoryId: string;

  @ApiProperty({ description: 'ID luật sư tác giả', example: null, type: String, nullable: true })
  authorLawyerId: string | null;

  @ApiProperty({ description: 'Ảnh bìa', example: "https://res.cloudinary.com/example/image/upload/cover.jpg", type: String, nullable: true })
  thumbnailUrl: string | null;

  @ApiProperty({ description: 'Ghim nổi bật', example: true })
  isFeatured: boolean;

  @ApiProperty({ description: 'Số lượt xem', example: 10 })
  viewsCount: number;

  @ApiProperty({ description: 'Ngày công khai hoặc dự kiến công khai', example: "2026-11-24T00:00:00Z", type: String, format: 'date-time', nullable: true })
  publishAt: Date | null;

  @ApiProperty({ description: 'Trạng thái', example: "draft", enum: PostStatus })
  status: PostStatus;

  @ApiProperty({ description: 'Ngày tạo', example: "2026-11-24T00:00:00Z" })
  createdAt: Date;

  @ApiProperty({ description: 'Ngày sửa', example: "2026-11-24T00:00:00Z" })
  updatedAt: Date;

  @ApiPropertyOptional({ description: 'ID các thẻ', example: ["a3da8be5-519e-4459-930f-ea3bd1eaf15c"], type: [String] })
  tagIds?: string[];

  @ApiPropertyOptional({ description: 'Danh sách thẻ kèm tên', type: () => [TagPublicDto] })
  tags?: TagPublicDto[];

  @ApiPropertyOptional({ description: 'ID các dịch vụ', example: ["a3da8be5-519e-4459-930f-ea3bd1eaf15c"], type: [String] })
  serviceIds?: string[];

  @ApiProperty({ type: [PostTranslationDto], description: 'Các bản dịch' })
  translations: PostTranslationDto[];
}
