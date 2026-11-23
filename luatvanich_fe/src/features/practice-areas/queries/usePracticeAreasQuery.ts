import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { practiceAreasService } from "../services/practice-areas.service";
import type {
  PracticeAreaQueryParams,
  CreatePracticeAreaInput,
  UpdatePracticeAreaInput,
} from "../types/practice-areas.types";
import { extractErrorMessage } from "@/lib/axios";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export const practiceAreasKeys = {
  all: ["practice-areas"] as const,
  lists: () => [...practiceAreasKeys.all, "list"] as const,
  list: (params?: PracticeAreaQueryParams) =>
    [...practiceAreasKeys.lists(), params] as const,
  details: () => [...practiceAreasKeys.all, "detail"] as const,
  detail: (id: string) => [...practiceAreasKeys.details(), id] as const,
  public: (lang?: string, featured?: boolean) =>
    [...practiceAreasKeys.all, "public", lang, featured] as const,
};

/** Hook lấy danh sách lĩnh vực chuyên môn Admin */
export const useAdminPracticeAreas = (params?: PracticeAreaQueryParams) => {
  const status = useAuthStore((s) => s.status);
  return useQuery({
    queryKey: practiceAreasKeys.list(params),
    queryFn: () => practiceAreasService.getAdminPracticeAreas(params),
    enabled: status === "authenticated",
    placeholderData: (prev) => prev,
  });
};

/** Hook lấy chi tiết một lĩnh vực chuyên môn Admin */
export const useAdminPracticeAreaDetail = (id: string) => {
  return useQuery({
    queryKey: practiceAreasKeys.detail(id),
    queryFn: () => practiceAreasService.getAdminPracticeAreaDetail(id),
    enabled: Boolean(id),
  });
};

/** Hook tạo mới lĩnh vực chuyên môn */
export const useCreatePracticeArea = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePracticeAreaInput) =>
      practiceAreasService.createPracticeArea(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: practiceAreasKeys.lists() });
      toast.success("Tạo lĩnh vực chuyên môn thành công!");
    },
    onError: (err) => {
      toast.error("Tạo lĩnh vực thất bại", {
        description: extractErrorMessage(
          err,
          "Không thể tạo lĩnh vực chuyên môn, vui lòng thử lại.",
        ),
      });
    },
  });
};

/** Hook cập nhật lĩnh vực chuyên môn */
export const useUpdatePracticeArea = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdatePracticeAreaInput;
    }) => practiceAreasService.updatePracticeArea(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: practiceAreasKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: practiceAreasKeys.detail(variables.id),
      });
      toast.success("Cập nhật lĩnh vực chuyên môn thành công!");
    },
    onError: (err) => {
      toast.error("Cập nhật lĩnh vực thất bại", {
        description: extractErrorMessage(
          err,
          "Không thể cập nhật lĩnh vực chuyên môn, vui lòng thử lại.",
        ),
      });
    },
  });
};

/** Hook kéo thả đổi thứ tự sắp xếp */
export const useReorderPracticeAreas = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) =>
      practiceAreasService.reorderPracticeAreas(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: practiceAreasKeys.lists() });
      toast.success("Cập nhật thứ tự sắp xếp thành công!");
    },
    onError: (err) => {
      toast.error("Cập nhật thứ tự thất bại", {
        description: extractErrorMessage(
          err,
          "Không thể cập nhật thứ tự sắp xếp, vui lòng thử lại.",
        ),
      });
    },
  });
};

/** Hook xóa mềm lĩnh vực chuyên môn */
export const useDeletePracticeArea = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => practiceAreasService.deletePracticeArea(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: practiceAreasKeys.lists() });
      toast.success("Xóa lĩnh vực chuyên môn thành công!");
    },
    onError: (err) => {
      toast.error("Xóa lĩnh vực thất bại", {
        description: extractErrorMessage(
          err,
          "Không thể xóa lĩnh vực chuyên môn. Vui lòng kiểm tra lại dịch vụ liên kết.",
        ),
      });
    },
  });
};

/** Hook lấy danh sách lĩnh vực Public (dùng chung cho dropdown, menu) */
export const usePublicPracticeAreas = (lang = "vi", featured?: boolean) => {
  return useQuery({
    queryKey: practiceAreasKeys.public(lang, featured),
    queryFn: () => practiceAreasService.getPublicPracticeAreas(lang, featured),
    staleTime: 5 * 60 * 1000, // 5 phút cache
  });
};
