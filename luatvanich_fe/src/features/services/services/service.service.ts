import { apiClient } from "@/lib/axios";
import type { PagedListResponse, SingleItemResponse } from "@/types/api";
import type {
  CreateServicePayload,
  LegalServiceItem,
  ServiceFilterCriteria,
  UpdateServicePayload,
} from "../types/service.types";

const SERVICES_ENDPOINT = "/services";

function cleanServiceFilterParams(criteria?: ServiceFilterCriteria) {
  if (!criteria) return undefined;
  return Object.fromEntries(
    Object.entries(criteria).filter(
      ([, val]) => val !== undefined && val !== null && val !== "",
    ),
  );
}

export const legalServicesApi = {
  fetchList: async (criteria?: ServiceFilterCriteria, cancelSignal?: AbortSignal) => {
    const { data } = await apiClient.get<PagedListResponse<LegalServiceItem>>(
      SERVICES_ENDPOINT,
      {
        params: cleanServiceFilterParams(criteria),
        signal: cancelSignal,
      },
    );
    return data;
  },

  fetchById: async (serviceId: string, cancelSignal?: AbortSignal) => {
    const { data } = await apiClient.get<SingleItemResponse<LegalServiceItem>>(
      `${SERVICES_ENDPOINT}/${serviceId}`,
      { signal: cancelSignal },
    );
    return data;
  },

  createItem: async (payload: CreateServicePayload) => {
    const { data } = await apiClient.post<LegalServiceItem>(SERVICES_ENDPOINT, payload);
    return data;
  },

  updateItem: async (serviceId: string, payload: UpdateServicePayload) => {
    const { data } = await apiClient.put<LegalServiceItem>(
      `${SERVICES_ENDPOINT}/${serviceId}`,
      payload,
    );
    return data;
  },

  removeItem: async (serviceId: string) => {
    await apiClient.delete(`${SERVICES_ENDPOINT}/${serviceId}`);
  },
};
