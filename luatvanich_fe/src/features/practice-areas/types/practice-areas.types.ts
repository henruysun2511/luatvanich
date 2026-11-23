export type PracticeAreaStatus = 'draft' | 'published';

export interface PracticeAreaTranslationItem {
  languageCode: 'vi' | 'zh-CN';
  slug: string;
  name: string;
  description?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  isComplete: boolean;
  updatedAt?: string;
}

export interface PracticeAreaItem {
  id: string;
  iconUrl?: string | null;
  displayOrder: number;
  status: PracticeAreaStatus;
  isFeatured: boolean;
  servicesCount: number;
  translations: PracticeAreaTranslationItem[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedPracticeAreasResponse {
  items: PracticeAreaItem[];
  total: number;
  page: number;
  limit: number;
}

export interface PracticeAreaQueryParams {
  q?: string;
  status?: PracticeAreaStatus;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
  sortOrder?: 'ASC' | 'DESC';
}

export interface UpsertPracticeAreaTranslationInput {
  languageCode: 'vi' | 'zh-CN';
  name: string;
  slug?: string;
  description?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  isComplete?: boolean;
}

export interface CreatePracticeAreaInput {
  iconUrl?: string | null;
  displayOrder?: number;
  status?: PracticeAreaStatus;
  isFeatured?: boolean;
  translations: UpsertPracticeAreaTranslationInput[];
}

export interface UpdatePracticeAreaInput {
  iconUrl?: string | null;
  displayOrder?: number;
  status?: PracticeAreaStatus;
  isFeatured?: boolean;
  translations?: UpsertPracticeAreaTranslationInput[];
}
