import { ApiProperty } from '@nestjs/swagger';
import { PostSection } from '../../enums/post-section.enum';

export class PostCategoryPublicDto {
  @ApiProperty({ description: 'UUID', example: "a3da8be5-519e-4459-930f-ea3bd1eaf15c" })
  id: string;

  @ApiProperty({ description: 'ID chuyên mục cha', example: null, type: String, nullable: true })
  parentId: string | null;

  @ApiProperty({ description: 'Phân vùng nội dung', example: "news", enum: PostSection })
  section: PostSection;

  @ApiProperty({ description: 'Thứ tự hiển thị', example: 1 })
  displayOrder: number;

  @ApiProperty({ description: 'Tên hiển thị', example: "Đầu tư FDI" })
  name: string;

  @ApiProperty({ description: 'Đường dẫn theo ngôn ngữ', example: "dau-tu-fdi" })
  slug: string;

  @ApiProperty({ description: 'Mô tả chuyên mục', example: "Tin tức đầu tư", type: String, nullable: true })
  description: string | null;
}

export class PostCategoryTreeDto extends PostCategoryPublicDto {
  @ApiProperty({ type: () => [PostCategoryTreeDto], description: 'Các chuyên mục con' })
  children: PostCategoryTreeDto[];
}

export class PostCategoryDetailDto extends PostCategoryPublicDto {
  @ApiProperty({ example: 5, description: 'Số bài viết đã xuất bản trực thuộc' })
  postsCount: number;
}
