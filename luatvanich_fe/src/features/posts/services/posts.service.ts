import { apiClient } from "@/lib/axios";
import type {
  PaginatedPostsResponse,
  PostItem,
  PostQueryParams,
  CreatePostInput,
  UpdatePostInput,
  UpdatePostStatusInput,
} from "../types/posts.types";

const POSTS_ADMIN_URL = "/admin/posts";
const POSTS_PUBLIC_URL = "/posts";

export const postsService = {
  /** Admin: Lấy danh sách bài viết */
  getAdminPosts: async (params?: PostQueryParams): Promise<PaginatedPostsResponse> => {
    const res = await apiClient.get<{ data: PaginatedPostsResponse }>(POSTS_ADMIN_URL, {
      params,
    });
    return res.data.data;
  },

  /** Admin: Chi tiết bài viết */
  getAdminPostDetail: async (id: string): Promise<PostItem> => {
    const res = await apiClient.get<{ data: PostItem }>(`${POSTS_ADMIN_URL}/${id}`);
    return res.data.data;
  },

  /** Admin: Tạo mới bài viết */
  createPost: async (payload: CreatePostInput): Promise<PostItem> => {
    const res = await apiClient.post<{ data: PostItem }>(POSTS_ADMIN_URL, payload);
    return res.data.data;
  },

  /** Admin: Cập nhật bài viết */
  updatePost: async (id: string, payload: UpdatePostInput): Promise<PostItem> => {
    const res = await apiClient.patch<{ data: PostItem }>(`${POSTS_ADMIN_URL}/${id}`, payload);
    return res.data.data;
  },

  /** Admin: Cập nhật nhanh trạng thái bài viết */
  updatePostStatus: async (id: string, payload: UpdatePostStatusInput): Promise<PostItem> => {
    const res = await apiClient.patch<{ data: PostItem }>(`${POSTS_ADMIN_URL}/${id}/status`, payload);
    return res.data.data;
  },

  /** Admin: Xóa mềm bài viết */
  deletePost: async (id: string): Promise<void> => {
    await apiClient.delete(`${POSTS_ADMIN_URL}/${id}`);
  },

  /** Public: Lấy danh sách bài viết */
  getPublicPosts: async (params?: PostQueryParams): Promise<PaginatedPostsResponse> => {
    const res = await apiClient.get<{ data: PaginatedPostsResponse }>(POSTS_PUBLIC_URL, {
      params,
    });
    return res.data.data;
  },
};
