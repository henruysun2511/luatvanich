import { apiClient } from "@/lib/axios";
import type {
  PaginatedPostCategoriesResponse,
  PostCategoryItem,
  PostCategoryTreeItem,
  PostCategoryQueryParams,
  CreatePostCategoryInput,
  UpdatePostCategoryInput,
  ReorderPostCategoriesInput,
  PostSection,
} from "../types/posts.types";

const CATEGORIES_ADMIN_URL = "/admin/post-categories";
const CATEGORIES_PUBLIC_URL = "/post-categories";

export const postCategoriesService = {
  /** Admin: Lấy danh sách chuyên mục quản trị */
  getAdminCategories: async (
    params?: PostCategoryQueryParams,
  ): Promise<PaginatedPostCategoriesResponse> => {
    const res = await apiClient.get<{ data: PaginatedPostCategoriesResponse }>(CATEGORIES_ADMIN_URL, {
      params,
    });
    return res.data.data;
  },

  /** Public/Admin: Lấy cây chuyên mục theo phân vùng */
  getPublicCategoriesTree: async (section?: PostSection): Promise<PostCategoryTreeItem[]> => {
    const res = await apiClient.get<{ data: PostCategoryTreeItem[] }>(CATEGORIES_PUBLIC_URL, {
      params: section ? { section } : undefined,
    });
    return res.data.data;
  },

  /** Admin: Tạo mới chuyên mục */
  createCategory: async (payload: CreatePostCategoryInput): Promise<PostCategoryItem> => {
    const res = await apiClient.post<{ data: PostCategoryItem }>(CATEGORIES_ADMIN_URL, payload);
    return res.data.data;
  },

  /** Admin: Cập nhật chuyên mục */
  updateCategory: async (id: string, payload: UpdatePostCategoryInput): Promise<PostCategoryItem> => {
    const res = await apiClient.patch<{ data: PostCategoryItem }>(`${CATEGORIES_ADMIN_URL}/${id}`, payload);
    return res.data.data;
  },

  /** Admin: Đổi thứ tự chuyên mục */
  reorderCategories: async (payload: ReorderPostCategoriesInput): Promise<void> => {
    await apiClient.patch(`${CATEGORIES_ADMIN_URL}/reorder`, payload);
  },

  /** Admin: Xóa chuyên mục */
  deleteCategory: async (id: string): Promise<void> => {
    await apiClient.delete(`${CATEGORIES_ADMIN_URL}/${id}`);
  },
};
