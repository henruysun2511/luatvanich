export interface AdminUser {
  id: string;
  email: string;
  username: string;
  fullName: string;
  role: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: AdminUser;
}

/**
 * Trạng thái phiên xác thực:
 * - loading: đang khôi phục phiên (khi mở trang / F5)
 * - authenticated: đã đăng nhập hợp lệ
 * - unauthenticated: chưa đăng nhập
 * - error: lỗi mạng/máy chủ khi khôi phục phiên
 */
export type AuthStatus = "loading" | "authenticated" | "unauthenticated" | "error";
