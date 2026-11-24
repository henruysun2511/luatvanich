import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsService } from "../services/settings.service";
import type { PartnerItem, FaqItem } from "../types/settings.types";

export const SETTINGS_QUERY_KEYS = {
  all: ["admin-settings"] as const,
  partners: ["admin-partners"] as const,
  faqs: ["admin-faqs"] as const,
  public: ["public-settings"] as const,
};

// 1. Site Settings
export function useAllSettings() {
  return useQuery({
    queryKey: SETTINGS_QUERY_KEYS.all,
    queryFn: () => settingsService.getAllSettings(),
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ settings, group }: { settings: Record<string, string>; group?: string }) =>
      settingsService.updateSettings(settings, group),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEYS.public });
    },
  });
}

// 2. Partners
export function usePartners() {
  return useQuery({
    queryKey: SETTINGS_QUERY_KEYS.partners,
    queryFn: () => settingsService.getPartners(),
  });
}

export function useCreatePartner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<PartnerItem>) => settingsService.createPartner(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEYS.partners });
    },
  });
}

export function useUpdatePartner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PartnerItem> }) =>
      settingsService.updatePartner(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEYS.partners });
    },
  });
}

export function useDeletePartner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => settingsService.deletePartner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEYS.partners });
    },
  });
}

// 3. FAQs
export function useFaqs() {
  return useQuery({
    queryKey: SETTINGS_QUERY_KEYS.faqs,
    queryFn: () => settingsService.getFaqs(),
  });
}

export function useCreateFaq() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<FaqItem>) => settingsService.createFaq(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEYS.faqs });
    },
  });
}

export function useUpdateFaq() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FaqItem> }) =>
      settingsService.updateFaq(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEYS.faqs });
    },
  });
}

export function useDeleteFaq() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => settingsService.deleteFaq(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEYS.faqs });
    },
  });
}
