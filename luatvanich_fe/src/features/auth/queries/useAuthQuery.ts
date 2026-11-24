import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../store/useAuthStore";
import { applySession } from "../utils/refreshSession";
import { broadcastAuth } from "../utils/authChannel";
import { endSession } from "../utils/endSession";
import { extractErrorMessage } from "@/lib/axios";
import type {
  UpdateProfileInput,
  ChangePasswordInput,
} from "../schemas/auth.schema";

export const authKeys = {
  all: ["auth"] as const,
  me: ["auth", "me"] as const,
};

/** Thông tin user hiện tại. Tự động lấy từ cache TanStack Query */
export const useMe = () => {
  const status = useAuthStore((s) => s.status);
  return useQuery({
    queryKey: authKeys.me,
    queryFn: ({ signal }) => authService.me(signal),
    enabled: status === "authenticated",
    staleTime: 5 * 60 * 1000,
  });
};

export const useLogin = () =>
  useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      applySession(data);
      broadcastAuth("login");
      toast.success("Đăng nhập thành công!", {
        description: `Chào mừng ${data.user.fullName || data.user.username} trở lại.`,
      });
    },
    onError: (err) => {
      toast.error("Đăng nhập thất bại", {
        description: extractErrorMessage(
          err,
          "Tên đăng nhập hoặc mật khẩu không chính xác.",
        ),
      });
    },
  });

export const useLogout = () =>
  useMutation({
    mutationFn: authService.logout,
    onSettled: () => {
      endSession();
      toast.info("Đã đăng xuất khỏi hệ thống.");
    },
  });

/** Cập nhật thông tin cá nhân */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateProfileInput) => authService.updateProfile(input),
    onSuccess: (updatedUser) => {
      // Cập nhật lại cache query user hiện tại
      queryClient.setQueryData(authKeys.me, updatedUser);
      queryClient.invalidateQueries({ queryKey: authKeys.me });
      toast.success("Cập nhật thông tin cá nhân thành công!", {
        description: "Thông tin hồ sơ của bạn đã được lưu.",
      });
    },
    onError: (err) => {
      toast.error("Cập nhật thông tin thất bại", {
        description: extractErrorMessage(
          err,
          "Không thể cập nhật hồ sơ, vui lòng thử lại.",
        ),
      });
    },
  });
};

/** Đổi mật khẩu cá nhân */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (input: Pick<ChangePasswordInput, "currentPassword" | "newPassword">) =>
      authService.changePassword(input),
    onSuccess: () => {
      toast.success("Đổi mật khẩu thành công!", {
        description: "Vui lòng đăng nhập lại với mật khẩu mới.",
      });
      // Thu hồi session ở client và điều hướng ra trang login
      endSession();
      broadcastAuth("logout");
      window.location.href = "/admin/login?reason=password_changed";
    },
    onError: (err) => {
      toast.error("Đổi mật khẩu thất bại", {
        description: extractErrorMessage(
          err,
          "Mật khẩu hiện tại không chính xác hoặc không hợp lệ.",
        ),
      });
    },
  });
};
