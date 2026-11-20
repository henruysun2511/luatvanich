import axios, { AxiosError, AxiosInstance } from "axios";

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

const defaultBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window === "undefined"
    ? `http://localhost:${process.env.PORT || 3001}/api/v1`
    : "/api/v1");

export const apiClient: AxiosInstance = axios.create({
  baseURL: defaultBaseUrl,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((reqConfig) => {
  if (typeof window !== "undefined") {
    const activeLang = document.documentElement.lang || "vi";
    reqConfig.headers["Accept-Language"] = activeLang;
    reqConfig.params = { lang: activeLang, ...reqConfig.params };

    const adminToken = window.localStorage.getItem("lvi_admin_token");
    if (adminToken) {
      reqConfig.headers.Authorization = `Bearer ${adminToken}`;
    }
  }
  return reqConfig;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err: AxiosError<{ message?: string; details?: unknown }>) => {
    if (axios.isCancel(err)) {
      return Promise.reject(err);
    }

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

    return Promise.reject(
      new LawFirmApiError(messageText, code, err.response?.data?.details),
    );
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
