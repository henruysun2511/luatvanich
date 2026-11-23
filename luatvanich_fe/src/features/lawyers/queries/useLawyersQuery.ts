import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { lawyersService } from "../services/lawyers.service";
import type {
  LawyerQueryParams,
  CreateLawyerInput,
  UpdateLawyerInput,
  LawyerStatus,
} from "../types/lawyers.types";
import { extractErrorMessage } from "@/lib/axios";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export const lawyersKeys = {
  all: ["lawyers"] as const,
  lists: () => [...lawyersKeys.all, "list"] as const,
  list: (params?: LawyerQueryParams) =>
    [...lawyersKeys.lists(), params] as const,
  details: () => [...lawyersKeys.all, "detail"] as const,
  detail: (id: string) => [...lawyersKeys.details(), id] as const,
  public: (lang?: string, group?: string) =>
    [...lawyersKeys.all, "public", lang, group] as const,
};

/** Hook lấy danh sách luật sư Admin */
export const useAdminLawyers = (params?: LawyerQueryParams) => {
  const status = useAuthStore((s) => s.status);
  return useQuery({
    queryKey: lawyersKeys.list(params),
    queryFn: () => lawyersService.getAdminLawyers(params),
    enabled: status === "authenticated",
    placeholderData: (prev) => prev,
  });
};

/** Hook lấy chi tiết một hồ sơ luật sư */
export const useAdminLawyerDetail = (id: string) => {
  return useQuery({
    queryKey: lawyersKeys.detail(id),
    queryFn: () => lawyersService.getAdminLawyerDetail(id),
    enabled: Boolean(id),
  });
};

/** Hook tạo mới luật sư */
export const useCreateLawyer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateLawyerInput) =>
      lawyersService.createLawyer(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lawyersKeys.lists() });
      toast.success("Tạo hồ sơ luật sư thành công!");
    },
    onError: (err) => {
      toast.error("Tạo luật sư thất bại", {
        description: extractErrorMessage(
          err,
          "Không thể tạo hồ sơ luật sư, vui lòng thử lại.",
        ),
      });
    },
  });
};

/** Hook cập nhật luật sư */
export const useUpdateLawyer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateLawyerInput;
    }) => lawyersService.updateLawyer(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: lawyersKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: lawyersKeys.detail(variables.id),
      });
      toast.success("Cập nhật hồ sơ luật sư thành công!");
    },
    onError: (err) => {
      toast.error("Cập nhật luật sư thất bại", {
        description: extractErrorMessage(
          err,
          "Không thể cập nhật hồ sơ luật sư, vui lòng thử lại.",
        ),
      });
    },
  });
};

/** Hook cập nhật nhanh trạng thái */
export const useUpdateLawyerStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: LawyerStatus }) =>
      lawyersService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lawyersKeys.lists() });
      toast.success("Cập nhật trạng thái thành công!");
    },
    onError: (err) => {
      toast.error("Cập nhật trạng thái thất bại", {
        description: extractErrorMessage(err, "Không thể đổi trạng thái."),
      });
    },
  });
};

/** Hook đổi thứ tự hiển thị */
export const useReorderLawyers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => lawyersService.reorderLawyers(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lawyersKeys.lists() });
      toast.success("Cập nhật thứ tự thành công!");
    },
    onError: (err) => {
      toast.error("Cập nhật thứ tự thất bại", {
        description: extractErrorMessage(err, "Không thể đổi thứ tự."),
      });
    },
  });
};

/** Hook xóa mềm luật sư */
export const useDeleteLawyer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => lawyersService.deleteLawyer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lawyersKeys.lists() });
      toast.success("Xóa hồ sơ luật sư thành công!");
    },
    onError: (err) => {
      toast.error("Xóa luật sư thất bại", {
        description: extractErrorMessage(
          err,
          "Không thể xóa hồ sơ luật sư, vui lòng thử lại.",
        ),
      });
    },
  });
};
