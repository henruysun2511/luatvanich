import { ApiProperty } from '@nestjs/swagger';
import { LangCode } from '../../../../common/enums/lang.enum';

export class PostPublicDto {
  @ApiProperty({ description: 'UUID', example: "a3da8be5-519e-4459-930f-ea3bd1eaf15c" })
  id: string;

  @ApiProperty({ description: 'ID chuyên mục', example: "a3da8be5-519e-4459-930f-ea3bd1eaf15c" })
  categoryId: string;

  @ApiProperty({ description: 'ID luật sư tác giả', example: null, type: String, nullable: true })
  authorLawyerId: string | null;

  @ApiProperty({ description: 'Tiêu đề bài viết', example: "Hướng dẫn đầu tư" })
  title: string;

  @ApiProperty({ description: 'Đường dẫn theo ngôn ngữ', example: "dau-tu-fdi" })
  slug: string;

  @ApiProperty({ description: 'Ngôn ngữ', example: "vi", enum: LangCode })
  languageCode: LangCode;

  @ApiProperty({ description: 'Tóm tắt', example: "Giới thiệu thủ tục đầu tư", type: String, nullable: true })
  summary: string | null;

  @ApiProperty({ description: 'Ảnh bìa', example: "https://res.cloudinary.com/example/image/upload/cover.jpg", type: String, nullable: true })
  thumbnailUrl: string | null;

  @ApiProperty({ description: 'Ghim nổi bật', example: true })
  isFeatured: boolean;

  @ApiProperty({ description: 'Số lượt xem', example: 10 })
  viewsCount: number;

  @ApiProperty({ description: 'Ngày công khai hoặc dự kiến công khai', example: "2026-11-24T00:00:00Z", type: String, format: 'date-time', nullable: true })
  publishAt: Date | null;
}
