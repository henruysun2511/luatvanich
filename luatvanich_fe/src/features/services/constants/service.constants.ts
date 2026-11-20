import type { ServicePublishStatus } from "../types/service.types";

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const ALLOWED_PAGE_SIZES = [10, 20, 50] as const;

export const SERVICE_STATUS_BADGES: ReadonlyArray<{
  value: ServicePublishStatus;
  text: string;
  badgeStyle: "default" | "secondary" | "outline";
}> = [
  { value: "published", text: "Đã xuất bản", badgeStyle: "default" },
  { value: "draft", text: "Bản nháp", badgeStyle: "outline" },
  { value: "archived", text: "Lưu trữ", badgeStyle: "secondary" },
];

export const LEGAL_PRACTICE_AREAS = [
  "Đầu tư FDI",
  "Doanh nghiệp & Giấy phép",
  "Thuế & Kế toán",
  "Lao động & Visa",
  "Hợp đồng Thương mại",
  "Tranh chấp & Tố tụng",
  "Sở hữu trí tuệ",
  "Dịch thuật công chứng",
] as const;

export const FILTER_ALL_VALUE = "all";
