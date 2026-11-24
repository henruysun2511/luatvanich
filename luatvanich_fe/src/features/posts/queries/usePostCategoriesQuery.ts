import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { postCategoriesService } from "../services/post-categories.service";
import type {
  PostCategoryQueryParams,
  CreatePostCategoryInput,
  UpdatePostCategoryInput,
  ReorderPostCategoriesInput,
  PostSection,
} from "../types/posts.types";
import { extractErrorMessage } from "@/lib/axios";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export const postCategoriesKeys = {
  all: ["postCategories"] as const,
  lists: () => [...postCategoriesKeys.all, "list"] as const,
  list: (params?: PostCategoryQueryParams) => [...postCategoriesKeys.lists(), params] as const,
  trees: () => [...postCategoriesKeys.all, "tree"] as const,
  tree: (section?: PostSection) => [...postCategoriesKeys.trees(), section] as const,
};

/** Hook lấy danh sách chuyên mục Admin */
export const useAdminPostCategories = (params?: PostCategoryQueryParams) => {
  const status = useAuthStore((s) => s.status);
  return useQuery({
    queryKey: postCategoriesKeys.list(params),
    queryFn: () => postCategoriesService.getAdminCategories(params),
    enabled: status === "authenticated",
    placeholderData: (prev) => prev,
  });
};

/** Hook lấy cây chuyên mục */
export const usePublicPostCategoriesTree = (section?: PostSection) => {
  return useQuery({
    queryKey: postCategoriesKeys.tree(section),
    queryFn: () => postCategoriesService.getPublicCategoriesTree(section),
    placeholderData: (prev) => prev,
  });
};

/** Hook tạo mới chuyên mục */
export const useCreatePostCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePostCategoryInput) => postCategoriesService.createCategory(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: postCategoriesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postCategoriesKeys.trees() });
      const viName = data.translations.find((t) => t.languageCode === "vi")?.name || "Chuyên mục";
      toast.success("Tạo chuyên mục thành công!", {
        description: `Chuyên mục "${viName}" đã được tạo.`,
      });
    },
    onError: (err) => {
      toast.error("Tạo chuyên mục thất bại", {
        description: extractErrorMessage(err, "Không thể tạo chuyên mục, vui lòng thử lại."),
      });
    },
  });
};

/** Hook cập nhật chuyên mục */
export const useUpdatePostCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdatePostCategoryInput }) =>
      postCategoriesService.updateCategory(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: postCategoriesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postCategoriesKeys.trees() });
      const viName = data.translations.find((t) => t.languageCode === "vi")?.name || "Chuyên mục";
      toast.success("Cập nhật chuyên mục thành công!", {
        description: `Chuyên mục "${viName}" đã được cập nhật.`,
      });
    },
    onError: (err) => {
      toast.error("Cập nhật chuyên mục thất bại", {
        description: extractErrorMessage(err, "Không thể cập nhật chuyên mục, vui lòng thử lại."),
      });
    },
  });
};

/** Hook đổi thứ tự chuyên mục */
export const useReorderPostCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ReorderPostCategoriesInput) => postCategoriesService.reorderCategories(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postCategoriesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postCategoriesKeys.trees() });
      toast.success("Đổi thứ tự chuyên mục thành công!");
    },
    onError: (err) => {
      toast.error("Đổi thứ tự thất bại", {
        description: extractErrorMessage(err, "Không thể cập nhật thứ tự chuyên mục."),
      });
    },
  });
};

/** Hook xóa chuyên mục */
export const useDeletePostCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => postCategoriesService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postCategoriesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postCategoriesKeys.trees() });
      toast.success("Xóa chuyên mục thành công!");
    },
    onError: (err) => {
      toast.error("Xóa chuyên mục thất bại", {
        description: extractErrorMessage(err, "Không thể xóa chuyên mục. Vui lòng kiểm tra xem chuyên mục còn bài viết hoặc chuyên mục con không."),
      });
    },
  });
};
