export type LawyerTeamGroup =
  | "core_leadership"
  | "chinese_team"
  | "vietnamese_team"
  | "senior_advisor";

export type CredentialKind =
  | "education"
  | "certificate"
  | "membership"
  | "award"
  | "notable_case"
  | "publication";

export type LawyerStatus = "published" | "draft" | "archived";

export interface LawyerTranslationItem {
  languageCode: "vi" | "zh-CN";
  fullName: string;
  latinName?: string | null;
  slug: string;
  title?: string | null;
  secondaryTitle?: string | null;
  academicTitle?: string | null;
  affiliatedOrganization?: string | null;
  bio?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  isComplete: boolean;
  updatedAt?: string;
}

export interface LawyerCredentialTranslationItem {
  languageCode: "vi" | "zh-CN";
  title: string;
  institution?: string | null;
  description?: string | null;
}

export interface LawyerCredentialItem {
  id?: string;
  kind: CredentialKind;
  yearStart?: number | null;
  yearEnd?: number | null;
  displayOrder: number;
  translations: LawyerCredentialTranslationItem[];
}

export interface LawyerPracticeAreaItem {
  id: string;
  name: string;
  isPrimary: boolean;
}

export interface LawyerLanguageItem {
  languageCode: string;
  isNative: boolean;
}

export interface LawyerItem {
  id: string;
  officeId?: string | null;
  officeName?: string | null;
  userId?: string | null;
  teamGroup: LawyerTeamGroup;
  avatarUrl?: string | null;
  licenseNumber?: string | null;
  licenseImageUrl?: string | null;
  barAssociation?: string | null;
  email?: string | null;
  mobilePhone?: string | null;
  officePhone?: string | null;
  wechatId?: string | null;
  wechatQrUrl?: string | null;
  practiceStartDate?: string | null;
  experienceYears?: number | null;
  displayOrder: number;
  isFeatured: boolean;
  status: LawyerStatus;
  translations: LawyerTranslationItem[];
  practiceAreas?: LawyerPracticeAreaItem[];
  languages?: LawyerLanguageItem[];
  credentials?: LawyerCredentialItem[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedLawyersResponse {
  items: LawyerItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface LawyerQueryParams {
  page?: number;
  limit?: number;
  q?: string;
  status?: LawyerStatus;
  teamGroup?: LawyerTeamGroup;
  officeId?: string;
  practiceAreaId?: string;
  isFeatured?: boolean;
}

export interface UpsertLawyerTranslationInput {
  languageCode: "vi" | "zh-CN";
  fullName: string;
  latinName?: string | null;
  slug?: string;
  title?: string | null;
  secondaryTitle?: string | null;
  academicTitle?: string | null;
  affiliatedOrganization?: string | null;
  bio?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  isComplete?: boolean;
}

export interface CreateLawyerInput {
  officeId?: string | null;
  teamGroup?: LawyerTeamGroup;
  avatarUrl?: string | null;
  licenseNumber?: string | null;
  licenseImageUrl?: string | null;
  barAssociation?: string | null;
  email?: string | null;
  mobilePhone?: string | null;
  officePhone?: string | null;
  wechatId?: string | null;
  wechatQrUrl?: string | null;
  practiceStartDate?: string | null;
  displayOrder?: number;
  isFeatured?: boolean;
  status?: LawyerStatus;
  translations: UpsertLawyerTranslationInput[];
  practiceAreas?: Array<{
    practiceAreaId: string;
    isPrimary?: boolean;
    displayOrder?: number;
  }>;
  languages?: Array<{
    languageCode: string;
    isNative?: boolean;
  }>;
  credentials?: LawyerCredentialItem[];
}

export type UpdateLawyerInput = Partial<CreateLawyerInput>;
