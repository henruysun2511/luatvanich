import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { usersService } from "../services/users.service";
import { usersKeys } from "./users.keys";
import type { UserQueryParams } from "../types/users.types";
import type {
  CreateUserInput,
  AdminResetPasswordInput,
} from "../schemas/users.schema";
import { extractErrorMessage } from "@/lib/axios";

/** Lấy danh sách người dùng có tìm kiếm, lọc và phân trang */
export const useUsers = (params?: UserQueryParams) => {
  return useQuery({
    queryKey: usersKeys.list(params),
    queryFn: () => usersService.getUsers(params),
    placeholderData: (prev) => prev, // Giữ data cũ khi chuyển trang
  });
};

/** Tạo người dùng mới */
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateUserInput) => usersService.createUser(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
      toast.success("Tạo tài khoản thành công!", {
        description: `Tài khoản ${data.fullName || data.username} đã sẵn sàng.`,
      });
    },
    onError: (err) => {
      toast.error("Tạo tài khoản thất bại", {
        description: extractErrorMessage(err, "Không thể tạo tài khoản, vui lòng thử lại."),
      });
    },
  });
};

/** Xóa tài khoản người dùng */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
      toast.success("Đã xóa tài khoản thành công!");
    },
    onError: (err) => {
      toast.error("Xóa tài khoản thất bại", {
        description: extractErrorMessage(err, "Không thể xóa tài khoản này."),
      });
    },
  });
};

/** Khóa / Mở khóa tài khoản */
export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      usersService.updateStatus(id, isActive),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
      toast.success(
        data.isActive
          ? `Đã kích hoạt tài khoản ${data.fullName || data.username}`
          : `Đã khóa tài khoản ${data.fullName || data.username}`,
      );
    },
    onError: (err) => {
      toast.error("Thao tác thất bại", {
        description: extractErrorMessage(err, "Không thể thay đổi trạng thái tài khoản."),
      });
    },
  });
};

/** Quản trị viên đặt lại mật khẩu cho người dùng */
export const useAdminResetPassword = () => {
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: AdminResetPasswordInput }) =>
      usersService.resetPassword(id, input),
    onSuccess: () => {
      toast.success("Đặt lại mật khẩu thành công!", {
        description: "Mật khẩu mới đã được cập nhật cho người dùng.",
      });
    },
    onError: (err) => {
      toast.error("Đặt lại mật khẩu thất bại", {
        description: extractErrorMessage(err, "Không thể đặt lại mật khẩu, vui lòng thử lại."),
      });
    },
  });
};
