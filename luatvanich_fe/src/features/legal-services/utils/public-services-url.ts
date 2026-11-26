import type { SupportedLocale } from "@/types/api";

export interface PublicServicesFilters {
  practiceAreaId?: string;
  page: number;
}

export function parsePublicServicesFilters(
  params: Record<string, string | string[] | undefined>,
): PublicServicesFilters {
  const { practiceAreaId, page } = params;
  const validArea = typeof practiceAreaId === "string"
    && /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(practiceAreaId);

  // Keep the calculated offset within the limits of a PostgreSQL integer.
  const parsedPage = typeof page === "string" && /^[1-9]\d{0,7}$/.test(page) ? Number(page) : 1;
  return { practiceAreaId: validArea ? practiceAreaId.toLowerCase() : undefined, page: parsedPage };
}

export function getPublicServiceDetailHref(lang: SupportedLocale, slug: string): string {
  return `/${lang}/services/${encodeURIComponent(slug)}`;
}

export function getPublicServicesHref(
  lang: SupportedLocale,
  { practiceAreaId, page }: PublicServicesFilters,
): string {
  const params = new URLSearchParams();
  if (practiceAreaId) params.set("practiceAreaId", practiceAreaId);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return `/${lang}/services${query ? "?" + query : ""}`;
}
