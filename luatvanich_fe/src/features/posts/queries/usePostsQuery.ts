import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { postsService } from "../services/posts.service";
import type {
  PostQueryParams,
  CreatePostInput,
  UpdatePostInput,
  UpdatePostStatusInput,
} from "../types/posts.types";
import { extractErrorMessage } from "@/lib/axios";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export const postsKeys = {
  all: ["posts"] as const,
  lists: () => [...postsKeys.all, "list"] as const,
  list: (params?: PostQueryParams) => [...postsKeys.lists(), params] as const,
  details: () => [...postsKeys.all, "detail"] as const,
  detail: (id: string) => [...postsKeys.details(), id] as const,
};

/** Hook lấy danh sách bài viết Admin */
export const useAdminPosts = (params?: PostQueryParams) => {
  const status = useAuthStore((s) => s.status);
  return useQuery({
    queryKey: postsKeys.list(params),
    queryFn: () => postsService.getAdminPosts(params),
    enabled: status === "authenticated",
    placeholderData: (prev) => prev,
  });
};

/** Hook lấy chi tiết bài viết Admin */
export const useAdminPostDetail = (id?: string | null) => {
  return useQuery({
    queryKey: postsKeys.detail(id || ""),
    queryFn: () => postsService.getAdminPostDetail(id!),
    enabled: Boolean(id),
  });
};

/** Hook tạo mới bài viết */
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePostInput) => postsService.createPost(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: postsKeys.lists() });
      const viTitle = data.translations.find((t) => t.languageCode === "vi")?.title || "Bài viết";
      toast.success("Tạo bài viết thành công!", {
        description: `Bài viết "${viTitle}" đã được tạo.`,
      });
    },
    onError: (err) => {
      toast.error("Tạo bài viết thất bại", {
        description: extractErrorMessage(err, "Không thể tạo bài viết, vui lòng thử lại."),
      });
    },
  });
};

/** Hook cập nhật bài viết */
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdatePostInput }) =>
      postsService.updatePost(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: postsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postsKeys.detail(data.id) });
      const viTitle = data.translations.find((t) => t.languageCode === "vi")?.title || "Bài viết";
      toast.success("Cập nhật bài viết thành công!", {
        description: `Bài viết "${viTitle}" đã được cập nhật.`,
      });
    },
    onError: (err) => {
      toast.error("Cập nhật bài viết thất bại", {
        description: extractErrorMessage(err, "Không thể cập nhật bài viết, vui lòng thử lại."),
      });
    },
  });
};

/** Hook đổi trạng thái bài viết */
export const useUpdatePostStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdatePostStatusInput }) =>
      postsService.updatePostStatus(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: postsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postsKeys.detail(data.id) });
      toast.success("Cập nhật trạng thái thành công!");
    },
    onError: (err) => {
      toast.error("Đổi trạng thái thất bại", {
        description: extractErrorMessage(err, "Không thể cập nhật trạng thái bài viết."),
      });
    },
  });
};

/** Hook xóa mềm bài viết */
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => postsService.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.lists() });
      toast.success("Xóa bài viết thành công!");
    },
    onError: (err) => {
      toast.error("Xóa bài viết thất bại", {
        description: extractErrorMessage(err, "Không thể xóa bài viết, vui lòng thử lại."),
      });
    },
  });
};
