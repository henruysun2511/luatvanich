export type LeadStatus = 'new' | 'in_progress' | 'done' | 'spam';

export type ContactChannel = 'phone' | 'email' | 'zalo' | 'wechat';

export interface ConsultationAttachmentItem {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType?: string | null;
  fileSizeBytes?: number | null;
  createdAt: string;
}

export interface ConsultationNoteItem {
  id: string;
  consultationRequestId: string;
  authorId?: string | null;
  authorName?: string | null;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConsultationItem {
  id: string;
  fullName: string;
  companyName?: string | null;
  phone: string;
  email?: string | null;
  contactChannel: ContactChannel;
  contactChannelId?: string | null;
  preferredContactTime?: string | null;
  practiceAreaId?: string | null;
  practiceAreaName?: string | null;
  lawyerId?: string | null;
  lawyerName?: string | null;
  assignedUserId?: string | null;
  assignedUserName?: string | null;
  languageCode: string;
  title?: string | null;
  content: string;
  consent: boolean;
  status: LeadStatus;
  ipAddress?: string | null;
  userAgent?: string | null;
  attachments?: ConsultationAttachmentItem[];
  notes?: ConsultationNoteItem[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedConsultationsResponse {
  items: ConsultationItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ConsultationQueryParams {
  q?: string;
  status?: LeadStatus;
  contactChannel?: ContactChannel;
  practiceAreaId?: string;
  lawyerId?: string;
  assignedUserId?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}

export interface CreateConsultationInput {
  fullName: string;
  companyName?: string;
  phone: string;
  email?: string;
  contactChannel?: ContactChannel;
  contactChannelId?: string;
  preferredContactTime?: string;
  practiceAreaId?: string;
  lawyerId?: string;
  languageCode?: string;
  title?: string;
  content: string;
  consent: boolean;
  attachments?: Array<{
    fileName: string;
    fileUrl: string;
    fileType?: string;
    fileSizeBytes?: number;
  }>;
}

export interface UpdateConsultationStatusInput {
  status: LeadStatus;
}

export interface AssignConsultationInput {
  assignedUserId?: string | null;
}

export interface CreateConsultationNoteInput {
  note: string;
}

export interface BulkStatusConsultationInput {
  ids: string[];
  status: LeadStatus;
}
