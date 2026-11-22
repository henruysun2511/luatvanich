import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../store/useAuthStore";
import { applySession } from "../utils/refreshSession";
import { broadcastAuth } from "../utils/authChannel";
import { endSession } from "../utils/endSession";
import { authKeys } from "./auth.keys";
import { extractErrorMessage } from "@/lib/axios";

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
        description: extractErrorMessage(err, "Tên đăng nhập hoặc mật khẩu không chính xác."),
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
