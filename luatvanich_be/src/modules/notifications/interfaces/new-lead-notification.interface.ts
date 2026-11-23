export interface NewLeadNotificationPayload {
  id: string;
  fullName: string;
  companyName?: string | null;
  phone: string;
  email?: string | null;
  contactChannel: string;
  contactChannelId?: string | null;
  preferredContactTime?: string | null;
  practiceAreaName?: string | null;
  lawyerName?: string | null;
  content: string;
  attachmentCount?: number;
  createdAt: Date;
}
