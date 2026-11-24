import { ApiProperty } from '@nestjs/swagger';
import { LegalServicePublicDto } from '../../../legal-services/dto/response/legal-service-public.dto';
import { PostCategoryPublicDto } from './post-category-public.dto';
import { PostPublicDto } from './post-public.dto';
import { TagPublicDto } from './tag-response.dto';

export class PostHeadingDto {
  @ApiProperty({ description: 'ID tiêu đề để cuộn tới', example: "dau-tu" })
  id: string;

  @ApiProperty({ description: 'Nội dung tiêu đề', example: "Đầu tư" })
  title: string;

  @ApiProperty({ description: 'Cấp tiêu đề HTML', example: 2 })
  level: number;
}

export class PostAuthorDto {
  @ApiProperty({ description: 'UUID', example: "a3da8be5-519e-4459-930f-ea3bd1eaf15c" })
  id: string;

  @ApiProperty({ description: 'Họ tên luật sư', example: "Nguyễn Văn A" })
  fullName: string;

  @ApiProperty({ description: 'Đường dẫn theo ngôn ngữ', example: "dau-tu-fdi" })
  slug: string;

  @ApiProperty({ description: 'Ảnh chân dung', example: null, type: String, nullable: true })
  avatarUrl: string | null;
}

export class PostDetailPublicDto extends PostPublicDto {
  @ApiProperty({ description: 'Nội dung HTML đã làm sạch', example: "<h2>Đầu tư</h2>" })
  contentHtml: string;

  @ApiProperty({ description: 'Tiêu đề SEO', example: "Đầu tư FDI", type: String, nullable: true })
  metaTitle: string | null;

  @ApiProperty({ description: 'Mô tả SEO', example: "Hướng dẫn đầu tư", type: String, nullable: true })
  metaDescription: string | null;

  @ApiProperty({ description: 'Thời gian đọc ước tính (phút)', example: 4 })
  readingTimeMinutes: number;

  @ApiProperty({ type: [PostHeadingDto], description: 'Mục lục tự động' })
  tableOfContents: PostHeadingDto[];

  @ApiProperty({ type: PostCategoryPublicDto, description: 'Chuyên mục của bài viết' })
  category: PostCategoryPublicDto;

  @ApiProperty({ type: PostAuthorDto, nullable: true, description: 'Tác giả công khai' })
  author: PostAuthorDto | null;

  @ApiProperty({ type: [TagPublicDto], description: 'Các thẻ của bài viết' })
  tags: TagPublicDto[];

  @ApiProperty({ type: [LegalServicePublicDto], description: 'Các dịch vụ liên quan đã xuất bản' })
  services: LegalServicePublicDto[];
}
