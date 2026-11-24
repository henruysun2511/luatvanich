import { apiClient } from "@/lib/axios";
import type { PartnerItem, FaqItem, SettingsGroupMap } from "../types/settings.types";

export const settingsService = {
  // 1. Site Settings
  getAllSettings: async (): Promise<SettingsGroupMap> => {
    const res = await apiClient.get<{ data: SettingsGroupMap }>("/admin/site-settings");
    return res.data.data;
  },

  updateSettings: async (settings: Record<string, string>, group?: string): Promise<void> => {
    await apiClient.put("/admin/site-settings", { settings, group });
  },

  getPublicSettings: async (): Promise<Record<string, string>> => {
    const res = await apiClient.get<{ data: Record<string, string> }>("/site-settings/public");
    return res.data.data;
  },

  // 2. Partners
  getPartners: async (): Promise<PartnerItem[]> => {
    const res = await apiClient.get<{ data: PartnerItem[] }>("/admin/partners");
    return res.data.data;
  },

  createPartner: async (data: Partial<PartnerItem>): Promise<PartnerItem> => {
    const res = await apiClient.post<{ data: PartnerItem }>("/admin/partners", data);
    return res.data.data;
  },

  updatePartner: async (id: string, data: Partial<PartnerItem>): Promise<PartnerItem> => {
    const res = await apiClient.patch<{ data: PartnerItem }>(`/admin/partners/${id}`, data);
    return res.data.data;
  },

  deletePartner: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/partners/${id}`);
  },

  // 3. FAQs
  getFaqs: async (): Promise<FaqItem[]> => {
    const res = await apiClient.get<{ data: FaqItem[] }>("/admin/faqs");
    return res.data.data;
  },

  createFaq: async (data: Partial<FaqItem>): Promise<FaqItem> => {
    const res = await apiClient.post<{ data: FaqItem }>("/admin/faqs", data);
    return res.data.data;
  },

  updateFaq: async (id: string, data: Partial<FaqItem>): Promise<FaqItem> => {
    const res = await apiClient.patch<{ data: FaqItem }>(`/admin/faqs/${id}`, data);
    return res.data.data;
  },

  deleteFaq: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/faqs/${id}`);
  },
};
