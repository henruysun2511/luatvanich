export type ServicePublishStatus = "published" | "draft" | "archived";

export interface LegalServiceItem {
  id: string;
  code: string;
  titleVi: string;
  titleZh?: string;
  slugVi: string;
  slugZh?: string;
  practiceArea: string;
  summaryVi: string;
  summaryZh?: string;
  displayOrder: number;
  status: ServicePublishStatus;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateServicePayload = Omit<
  LegalServiceItem,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateServicePayload = Partial<CreateServicePayload>;

export type ServiceSortField = "displayOrder" | "titleVi" | "createdAt";

export interface ServiceFilterCriteria {
  page?: number;
  limit?: number;
  searchTerm?: string;
  practiceArea?: string;
  status?: ServicePublishStatus;
  sortField?: ServiceSortField;
  sortDirection?: "asc" | "desc";
  lang?: "vi" | "zh-CN";
}
