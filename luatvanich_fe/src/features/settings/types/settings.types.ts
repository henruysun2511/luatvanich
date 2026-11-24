export interface PartnerItem {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
}

export interface FaqTranslationItem {
  languageCode: 'vi' | 'zh-CN';
  question: string;
  answer: string;
  isComplete: boolean;
}

export interface FaqItem {
  id: string;
  category: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  translations: FaqTranslationItem[];
}

export interface SettingsGroupMap {
  contact?: Record<string, string>;
  social?: Record<string, string>;
  company?: Record<string, string>;
  stats?: Record<string, string>;
  branding?: Record<string, string>;
  seo?: Record<string, string>;
  [group: string]: Record<string, string> | undefined;
}
