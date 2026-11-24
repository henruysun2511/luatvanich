export type ServicePublishStatus = "published" | "draft";

export interface ServiceTranslationSummaryItem {
  languageCode: "vi" | "zh-CN";
  title: string;
  slug: string;
  isComplete: boolean;
}

export interface LegalServiceItem {
  id: string;
  practiceAreaId?: string | null;
  practiceArea?: {
    id: string;
    name: string;
  } | null;
  status: ServicePublishStatus;
  displayOrder: number;
  isFeatured: boolean;
  coverImageUrl?: string | null;
  translations: ServiceTranslationSummaryItem[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedLegalServicesResponse {
  items: LegalServiceItem[];
  total: number;
  page: number;
  limit: number;
}

export interface LegalServiceQueryParams {
  page?: number;
  limit?: number;
  q?: string;
  status?: ServicePublishStatus;
  practiceAreaId?: string;
  isFeatured?: boolean;
}

export interface CreateLegalServiceInput {
  practiceAreaId?: string | null;
  coverImageUrl?: string | null;
  displayOrder?: number;
  isFeatured?: boolean;
  titleVi: string;
  slugVi?: string;
  excerptVi?: string | null;
  contentHtmlVi?: string | null;
  titleZh?: string | null;
  slugZh?: string | null;
  excerptZh?: string | null;
}

export type UpdateLegalServiceInput = Partial<CreateLegalServiceInput>;
