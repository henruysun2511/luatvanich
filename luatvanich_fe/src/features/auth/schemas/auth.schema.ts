import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập tên đăng nhập hoặc email"),
  password: z
    .string()
    .min(1, "Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Họ và tên không được để trống")
    .max(100, "Họ và tên tối đa 100 ký tự"),
  username: z
    .string()
    .trim()
    .min(3, "Tên đăng nhập tối thiểu 3 ký tự")
    .max(50, "Tên đăng nhập tối đa 50 ký tự")
    .regex(/^[a-zA-Z0-9_-]+$/, "Tên đăng nhập chỉ chứa chữ cái, số, gạch dưới hoặc gạch nối"),
  email: z
    .string()
    .trim()
    .min(1, "Email không được để trống")
    .email("Email không đúng định dạng"),
  phoneNumber: z
    .string()
    .trim()
    .max(20, "Số điện thoại tối đa 20 ký tự")
    .optional()
    .or(z.literal("")),
  avatarUrl: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Vui lòng nhập mật khẩu hiện tại"),
    newPassword: z.string().min(8, "Mật khẩu mới phải có tối thiểu 8 ký tự"),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu mới"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không trùng khớp",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "Mật khẩu mới không được trùng với mật khẩu hiện tại",
    path: ["newPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
