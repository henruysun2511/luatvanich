"use client";

import { useState } from "react";
import Link from "next/link";
import { BriefcaseBusiness, ChevronLeft, ChevronRight, LayoutGrid, List, RotateCcw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { SupportedLocale } from "@/types/api";
import { usePublicPracticeAreas } from "@/features/practice-areas/queries/usePracticeAreasQuery";
import { publicServicesCopy } from "../../constants/public-services.constant";
import { usePublicLegalServices } from "../../queries/useServiceQuery";
import { getPublicServicesHref, type PublicServicesFilters } from "../../utils/public-services-url";
import { PublicLegalServiceCard } from "./PublicLegalServiceCard";

interface Props extends PublicServicesFilters {
  lang: SupportedLocale;
}

export function LegalServicesDirectorySection({ lang, practiceAreaId, page }: Props) {
  const copy = publicServicesCopy[lang];
  const [view, setView] = useState<"list" | "grid">("list");
  const areas = usePublicPracticeAreas(lang);
  const services = usePublicLegalServices({ lang, practiceAreaId, page });
  const items = services.data?.items ?? [];
  const pagination = services.data?.pagination;
  const outOfRange = Boolean(pagination && page > pagination.totalPages);
  const layout = view === "grid"
    ? "grid grid-cols-1 gap-5 md:grid-cols-2"
    : "divide-y divide-[#e2dbce] border border-[#e2dbce] border-t-2 border-t-[#a3171e] bg-white";
  const selection = [{ id: undefined, name: copy.all }, ...(areas.data ?? [])];

  return (
    <section aria-label={copy.title} className="border-t border-[#e2dbce] bg-[#fbf9f4] text-[#0b1d3f]">
      <div className="border-b border-[#e2dbce] bg-white">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-start justify-between gap-4 px-4 py-4 sm:px-8">
          <div>
            <nav aria-label={copy.filter} className="flex flex-wrap gap-2">
              {selection.map(({ id, name }) => (
                <Link
                  key={id ?? "all"}
                  href={getPublicServicesHref(lang, { practiceAreaId: id, page: 1 })}
                  scroll={false}
                  aria-current={practiceAreaId === id ? "true" : undefined}
                  className={cn(
                    "border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a3171e]",
                    practiceAreaId === id
                      ? "border-[#0b1d3f] bg-[#0b1d3f] text-[#f0d28a]"
                      : "border-[#e2dbce] bg-white text-[#47566f] hover:border-[#a3171e] hover:text-[#a3171e]",
                  )}
                >
                  {name}
                </Link>
              ))}
            </nav>
            {areas.isPending && <p role="status" className="mt-2 text-sm text-[#52617a]">{copy.loadingAreas}</p>}
            {areas.isError && (
              <p className="mt-2 text-sm text-[#85151b]">
                {copy.areasError}{" "}
                <button type="button" className="font-semibold underline" onClick={() => void areas.refetch()}>
                  {copy.retry}
                </button>
              </p>
            )}
          </div>

          <div role="group" aria-label={copy.view} className="flex border border-[#e2dbce]">
            {([{ id: "list", label: copy.list, Icon: List }, { id: "grid", label: copy.grid, Icon: LayoutGrid }] as const).map(
              ({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={view === id}
                  onClick={() => setView(id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a3171e]",
                    view === id ? "bg-[#0b1d3f] text-[#f0d28a]" : "text-[#47566f] hover:bg-[#fbf9f4]",
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {label}
                </button>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-4 py-8 sm:px-8 sm:py-12">
        {services.isPending ? (
          <div role="status">
            <span className="sr-only">{copy.loading}</span>
            <div aria-hidden="true" className={layout}>
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="space-y-3 bg-white p-6">
                  <Skeleton className="h-6 w-2/5" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              ))}
            </div>
          </div>
        ) : services.isError ? (
          <div role="alert" className="border border-[#e2dbce] bg-white p-8 text-center">
            <p className="font-semibold text-[#85151b]">{copy.error}</p>
            <button type="button" onClick={() => void services.refetch()} className="mt-4 inline-flex items-center gap-2 font-semibold underline">
              <RotateCcw className="size-4" aria-hidden="true" /> {copy.retry}
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="border border-[#e2dbce] bg-white p-8 text-center">
            <BriefcaseBusiness className="mx-auto mb-3 size-7 text-[#8e6d23]" aria-hidden="true" />
            <p role="status" className="font-semibold">{outOfRange ? copy.outOfRange : copy.empty}</p>
            {(outOfRange || practiceAreaId) && (
              <Link href={getPublicServicesHref(lang, { page: 1, practiceAreaId: outOfRange ? practiceAreaId : undefined })} className="mt-4 inline-block font-semibold text-[#85151b] underline">
                {outOfRange ? copy.firstPage : copy.reset}
              </Link>
            )}
          </div>
        ) : (
          <>
            <p role="status" className="mb-4 text-sm font-medium text-[#52617a]">
              {copy.total(new Intl.NumberFormat(lang).format(pagination?.total ?? items.length))}
            </p>
            <div className={layout}>
              {items.map((service) => (
                <PublicLegalServiceCard key={service.id} service={service} lang={lang} view={view} />
              ))}
            </div>
            {pagination && pagination.totalPages > 1 && (
              <nav aria-label={copy.pagination} className="mt-8 flex flex-wrap items-center justify-between gap-3 text-sm font-semibold">
                {pagination.page > 1 ? (
                  <Link href={getPublicServicesHref(lang, { practiceAreaId, page: page - 1 })} className="inline-flex items-center gap-2 border border-[#e2dbce] bg-white px-3 py-2 hover:border-[#a3171e]">
                    <ChevronLeft className="size-4" aria-hidden="true" /> {copy.previous}
                  </Link>
                ) : <span />}
                <span>{copy.page(pagination.page, pagination.totalPages)}</span>
                {pagination.page < pagination.totalPages ? (
                  <Link href={getPublicServicesHref(lang, { practiceAreaId, page: page + 1 })} className="inline-flex items-center gap-2 border border-[#e2dbce] bg-white px-3 py-2 hover:border-[#a3171e]">
                    {copy.next} <ChevronRight className="size-4" aria-hidden="true" />
                  </Link>
                ) : <span />}
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}
