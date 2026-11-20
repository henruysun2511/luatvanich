export type SupportedLocale = "vi" | "zh-CN";

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PagedListResponse<TItem> {
  data: TItem[];
  meta: PaginationInfo;
  fallback?: boolean;
}

export interface SingleItemResponse<TItem> {
  data: TItem;
  message?: string;
  fallback?: boolean;
}
