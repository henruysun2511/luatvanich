/** Mã ngôn ngữ hỗ trợ */
export type LangCode = "vi" | "zh-CN";

/** Trạng thái xuất bản bài viết */
export type PostStatus = "draft" | "in_review" | "scheduled" | "published" | "archived";

/** Phân vùng nội dung chuyên mục */
export type PostSection = "news" | "handbook" | "knowledge_base";

/** Dữ liệu công khai của Thẻ Tag */
export interface TagPublicItem {
  id: string;
  name: string;
  slug: string;
  colorHex: string | null;
}

/** Bản dịch bài viết */
export interface PostTranslationItem {
  languageCode: LangCode;
  title: string;
  slug: string;
  summary: string | null;
  contentHtml?: string;
  metaTitle: string | null;
  metaDescription: string | null;
  isComplete: boolean;
  updatedAt: string;
}

/** Thực thể bài viết trong Admin */
export interface PostItem {
  id: string;
  categoryId: string;
  authorLawyerId: string | null;
  thumbnailUrl: string | null;
  status: PostStatus;
  isFeatured: boolean;
  viewsCount: number;
  publishAt: string | null;
  createdAt: string;
  updatedAt: string;
  tagIds?: string[];
  tags?: TagPublicItem[];
  serviceIds?: string[];
  translations: PostTranslationItem[];
}

/** Phân trang danh sách bài viết */
export interface PaginatedPostsResponse {
  items: PostItem[];
  total: number;
  page: number;
  limit: number;
}

/** Query params danh sách bài viết */
export interface PostQueryParams {
  page?: number;
  limit?: number;
  q?: string;
  categoryId?: string;
  status?: PostStatus;
  authorLawyerId?: string;
  isFeatured?: boolean;
  section?: PostSection;
  sortOrder?: "ASC" | "DESC";
}

/** Dữ liệu tạo bài viết */
export interface CreatePostInput {
  categoryId: string;
  authorLawyerId?: string | null;
  thumbnailUrl?: string | null;
  isFeatured?: boolean;
  tags?: string[];
  tagIds?: string[];
  serviceIds?: string[];
  translations: {
    languageCode: LangCode;
    title: string;
    slug?: string;
    summary?: string | null;
    contentHtml: string;
    metaTitle?: string | null;
    metaDescription?: string | null;
    isComplete?: boolean;
  }[];
}

/** Dữ liệu cập nhật bài viết */
export type UpdatePostInput = Partial<CreatePostInput>;

/** Dữ liệu đổi nhanh trạng thái bài viết */
export interface UpdatePostStatusInput {
  status: PostStatus;
  publishAt?: string | null;
}

// -------------------------------------------------------------
// CHUYÊN MỤC BÀI VIẾT (POST CATEGORIES)
// -------------------------------------------------------------

/** Bản dịch chuyên mục */
export interface PostCategoryTranslationItem {
  languageCode: LangCode;
  name: string;
  slug: string;
  description: string | null;
  updatedAt: string;
}

/** Thực thể chuyên mục trong Admin */
export interface PostCategoryItem {
  id: string;
  section: PostSection;
  parentId: string | null;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  translations: PostCategoryTranslationItem[];
}

/** Cây chuyên mục phân tầng */
export interface PostCategoryTreeItem {
  id: string;
  section: PostSection;
  parentId: string | null;
  displayOrder: number;
  name: string;
  slug: string;
  description: string | null;
  children: PostCategoryTreeItem[];
}

/** Phân trang danh sách chuyên mục */
export interface PaginatedPostCategoriesResponse {
  items: PostCategoryItem[];
  total: number;
  page: number;
  limit: number;
}

/** Query params danh sách chuyên mục */
export interface PostCategoryQueryParams {
  page?: number;
  limit?: number;
  q?: string;
  section?: PostSection;
  sortOrder?: "ASC" | "DESC";
}

/** Dữ liệu tạo chuyên mục */
export interface CreatePostCategoryInput {
  section: PostSection;
  parentId?: string | null;
  displayOrder?: number;
  translations: {
    languageCode: LangCode;
    name: string;
    slug?: string;
    description?: string | null;
  }[];
}

/** Dữ liệu cập nhật chuyên mục */
export type UpdatePostCategoryInput = Partial<CreatePostCategoryInput>;

/** Dữ liệu đổi thứ tự chuyên mục */
export interface ReorderPostCategoriesInput {
  ids: string[];
}
