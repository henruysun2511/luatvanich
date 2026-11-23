export type OfficeStatus = 'draft' | 'published';

export interface OfficeTranslationItem {
  languageCode: 'vi' | 'zh-CN';
  name: string;
  address: string;
  workingHours?: string;
  description?: string;
  isComplete: boolean;
  updatedAt?: string;
}

export interface OfficeItem {
  id: string;
  code: string;
  phone?: string;
  fax?: string;
  email?: string;
  wechatId?: string;
  wechatQrUrl?: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  mapEmbedUrl?: string;
  isHeadquarters: boolean;
  displayOrder: number;
  status: OfficeStatus;
  translations: OfficeTranslationItem[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedOfficesResponse {
  items: OfficeItem[];
  total: number;
  page: number;
  limit: number;
}

export interface OfficeQueryParams {
  q?: string;
  status?: OfficeStatus;
  isHeadquarters?: boolean;
  page?: number;
  limit?: number;
}

export interface UpsertOfficeTranslationInput {
  languageCode: 'vi' | 'zh-CN';
  name: string;
  address: string;
  workingHours?: string;
  description?: string;
  isComplete?: boolean;
}

export interface CreateOfficeInput {
  code: string;
  phone?: string;
  fax?: string;
  email?: string;
  wechatId?: string;
  wechatQrUrl?: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  mapEmbedUrl?: string;
  isHeadquarters?: boolean;
  displayOrder?: number;
  status?: OfficeStatus;
  translations: UpsertOfficeTranslationInput[];
}

export type UpdateOfficeInput = Partial<CreateOfficeInput>;
