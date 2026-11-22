import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email("Email không đúng định dạng"),
  username: z
    .string()
    .min(3, "Tên đăng nhập tối thiểu 3 ký tự")
    .max(50, "Tên đăng nhập tối đa 50 ký tự")
    .regex(/^[a-zA-Z0-9_-]+$/, "Tên đăng nhập chỉ được chứa chữ cái, số, gạch dưới hoặc gạch nối"),
  fullName: z.string().min(1, "Họ và tên không được để trống").max(100, "Tối đa 100 ký tự"),
  password: z.string().min(8, "Mật khẩu tối thiểu 8 ký tự"),
  role: z.string().min(1, "Vui lòng chọn một vai trò"),
  phoneNumber: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const adminResetPasswordSchema = z.object({
  newPassword: z.string().min(8, "Mật khẩu mới phải có ít nhất 8 ký tự"),
});

export type AdminResetPasswordInput = z.infer<typeof adminResetPasswordSchema>;
