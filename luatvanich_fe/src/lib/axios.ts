import axios, { AxiosError, AxiosInstance } from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    /** Bỏ qua cơ chế "401 => refresh token => gọi lại" (dùng cho chính các request auth) */
    skipAuthRefresh?: boolean;
    _retry?: boolean;
  }
}

export class LawFirmApiError extends Error {
  public statusCode?: number;
  public validationDetails?: unknown;

  constructor(message: string, statusCode?: number, validationDetails?: unknown) {
    super(message);
    this.name = "LawFirmApiError";
    this.statusCode = statusCode;
    this.validationDetails = validationDetails;
  }
}

interface AuthHandlers {
  getAccessToken: () => string | null;
  refresh: () => Promise<string>;
  onAuthFailure: () => void;
}

let authHandlers: AuthHandlers | null = null;

export const configureAuth = (handlers: AuthHandlers) => {
  authHandlers = handlers;
};

const defaultBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window === "undefined"
    ? `http://localhost:${process.env.PORT || 4000}/api/v1`
    : "http://localhost:4000/api/v1");

export const apiClient: AxiosInstance = axios.create({
  baseURL: defaultBaseUrl,
  timeout: 20000,
  withCredentials: true, // Cho phép gửi nhận httpOnly cookies (refreshToken)
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((reqConfig) => {
  if (typeof window !== "undefined") {
    const activeLang = document.documentElement.lang || "vi";
    reqConfig.headers["Accept-Language"] = activeLang;
  }

  const token = authHandlers?.getAccessToken();
  if (token && !reqConfig.headers.Authorization) {
    reqConfig.headers.Authorization = `Bearer ${token}`;
  }

  return reqConfig;
});

const toApiError = (err: AxiosError<{ message?: string; details?: unknown }>) => {
  const code = err.response?.status;
  let messageText = err.response?.data?.message;

  if (!messageText) {
    if (err.code === "ECONNABORTED") {
      messageText = "Thời gian phản hồi máy chủ quá hạn.";
    } else if (!err.response) {
      messageText = "Không thể kết nối máy chủ dịch vụ.";
    } else {
      messageText = "Hệ thống gặp sự cố, xin vui lòng thử lại.";
    }
  }

  return new LawFirmApiError(messageText, code, err.response?.data?.details);
};

apiClient.interceptors.response.use(
  (res) => res,
  async (err: AxiosError<{ message?: string; details?: unknown }>) => {
    if (axios.isCancel(err)) {
      return Promise.reject(err);
    }

    const original = err.config;
    const shouldRefresh =
      err.response?.status === 401 &&
      !!original &&
      !original.skipAuthRefresh &&
      !original._retry &&
      !!authHandlers;

    if (shouldRefresh && original && authHandlers) {
      original._retry = true;
      try {
        const newToken = await authHandlers.refresh();
        original.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(original);
      } catch (refreshError) {
        const status =
          refreshError instanceof LawFirmApiError ? refreshError.statusCode : undefined;
        if (status === 401 || status === 403) {
          authHandlers.onAuthFailure();
        }
        return Promise.reject(toApiError(err));
      }
    }

    return Promise.reject(toApiError(err));
  },
);

export function extractErrorMessage(
  err: unknown,
  fallback = "Đã xảy ra lỗi, vui lòng thử lại.",
): string {
  if (err instanceof Error && err.message) {
    return err.message;
  }
  return fallback;
}
