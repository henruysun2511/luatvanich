import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { rolesService } from "../services/roles.service";
import { rolesKeys } from "./roles.keys";
import { extractErrorMessage } from "@/lib/axios";

/** Lấy danh sách toàn bộ vai trò */
export const useRoles = () => {
  return useQuery({
    queryKey: rolesKeys.list(),
    queryFn: rolesService.getRoles,
    staleTime: 10 * 60 * 1000, // 10 phút cache
  });
};

/** Gán vai trò cho người dùng */
export const useAssignRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: string }) =>
      rolesService.assignRole(userId, role),
    onSuccess: () => {
      // Làm mới danh sách user
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Gán vai trò thành công!");
    },
    onError: (err) => {
      toast.error("Gán vai trò thất bại", {
        description: extractErrorMessage(err, "Không thể gán vai trò, vui lòng thử lại."),
      });
    },
  });
};
