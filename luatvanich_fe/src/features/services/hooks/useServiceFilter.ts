"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ALLOWED_PAGE_SIZES,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  LEGAL_PRACTICE_AREAS,
  SERVICE_STATUS_BADGES,
} from "../constants/service.constants";
import type {
  ServiceFilterCriteria,
  ServicePublishStatus,
  ServiceSortField,
} from "../types/service.types";

const sanitizePositiveInteger = (
  rawVal: string | null,
  fallbackVal: number,
): number => {
  const parsed = Number(rawVal);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallbackVal;
};

export function useServiceFilter() {
  const router = useRouter();
  const currentPath = usePathname();
  const searchParams = useSearchParams();

  const filterValues = useMemo<ServiceFilterCriteria>(() => {
    const rawLimit = sanitizePositiveInteger(
      searchParams.get("limit"),
      DEFAULT_PAGE_SIZE,
    );
    const rawStatus = searchParams.get("status") as ServicePublishStatus;
    const isStatusValid = SERVICE_STATUS_BADGES.some((b) => b.value === rawStatus);

    return {
      page: sanitizePositiveInteger(searchParams.get("page"), DEFAULT_PAGE_NUMBER),
      limit: (ALLOWED_PAGE_SIZES as readonly number[]).includes(rawLimit)
        ? rawLimit
        : DEFAULT_PAGE_SIZE,
      searchTerm: searchParams.get("searchTerm")?.trim() || undefined,
      practiceArea: searchParams.get("practiceArea") || undefined,
      status: isStatusValid ? rawStatus : undefined,
      sortField: (searchParams.get("sortField") as ServiceSortField) || undefined,
      sortDirection: searchParams.get("sortDirection") === "desc" ? "desc" : "asc",
    };
  }, [searchParams]);

  const applyChanges = useCallback(
    (patch: Partial<ServiceFilterCriteria>) => {
      const nextParams = new URLSearchParams(searchParams.toString());

      for (const [key, val] of Object.entries(patch)) {
        if (val === undefined || val === null || val === "") {
          nextParams.delete(key);
        } else {
          nextParams.set(key, String(val));
        }
      }

      if (!("page" in patch)) {
        nextParams.delete("page");
      }

      const queryString = nextParams.toString();
      router.replace(queryString ? `${currentPath}?${queryString}` : currentPath, {
        scroll: false,
      });
    },
    [router, currentPath, searchParams],
  );

  const resetAllFilters = useCallback(() => {
    router.replace(currentPath, { scroll: false });
  }, [router, currentPath]);

  const hasAnyFilterActive = Boolean(
    filterValues.searchTerm || filterValues.practiceArea || filterValues.status,
  );

  return {
    filters: filterValues,
    setFilters: applyChanges,
    setPage: (page: number) => applyChanges({ page }),
    resetFilters: resetAllFilters,
    hasActiveFilters: hasAnyFilterActive,
  };
}
