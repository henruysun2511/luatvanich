import type { PaginationInfo, SupportedLocale } from "@/types/api";

export interface PublicLegalServiceItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  hanziBadge?: string | null;
  fallback?: boolean;
}

export interface PublicLegalServiceDetail extends PublicLegalServiceItem {
  practiceAreaId: string | null;
  localizedSlugs: Partial<Record<SupportedLocale, string>>;
  processSteps: string[];
  referenceFees: string[];
  feeStructure?: string;
  estimatedTime?: string;
}

export interface PublicLegalServiceLawyer {
  id: string;
  fullName: string;
  title?: string | null;
  fallback?: boolean;
}

export interface PublicLegalServicesQuery {
  lang: SupportedLocale;
  practiceAreaId?: string;
  page: number;
}

export interface PublicLegalServicesResponse {
  items: PublicLegalServiceItem[];
  pagination: PaginationInfo;
}

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
  hanziBadge?: string | null;
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
  hanziBadge?: string | null;
  titleVi: string;
  slugVi?: string;
  excerptVi?: string | null;
  contentHtmlVi?: string | null;
  titleZh?: string | null;
  slugZh?: string | null;
  excerptZh?: string | null;
}

export type UpdateLegalServiceInput = Partial<CreateLegalServiceInput>;
