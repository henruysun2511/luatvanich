"use client";

import { Scale } from "lucide-react";
import type { SupportedLocale } from "@/types/api";
import { publicServiceDetailCopy } from "../../constants/public-service-detail.constant";
import { usePublicLegalServiceLawyers } from "../../queries/useServiceQuery";

export function LegalServiceLawyersSection({
  lang,
  practiceAreaId,
}: {
  lang: SupportedLocale;
  practiceAreaId: string | null;
}) {
  const copy = publicServiceDetailCopy[lang];
  const lawyers = usePublicLegalServiceLawyers(lang, practiceAreaId);
  const items = lawyers.data?.items ?? [];

  return (
    <section aria-labelledby="service-lawyers" className="border border-[#e2dbce] bg-white p-6 sm:p-8">
      <h2 id="service-lawyers" className="font-serif text-2xl font-bold text-[#0b1d3f] sm:text-3xl">{copy.lawyers}</h2>
      {practiceAreaId && lawyers.isPending ? (
        <p role="status" className="mt-4 text-[#52617a]">{copy.lawyersLoading}</p>
      ) : lawyers.isError ? (
        <p role="alert" className="mt-4 text-[#85151b]">
          {copy.lawyersError}{" "}
          <button type="button" className="font-semibold underline" onClick={() => void lawyers.refetch()}>{copy.retry}</button>
        </p>
      ) : items.length > 0 ? (
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {items.map((lawyer) => (
            <li key={lawyer.id} lang={lawyer.fallback ? "vi" : lang} className="flex min-w-0 items-start gap-3 border border-[#e2dbce] bg-[#fbf9f4] p-4">
              <Scale aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#8e6d23]" />
              <div className="min-w-0 break-words">
                <h3 className="font-semibold text-[#0b1d3f]">{lawyer.fullName}</h3>
                {lawyer.title && <p className="mt-1 text-sm text-[#52617a]">{lawyer.title}</p>}
              </div>
            </li>
          ))}
        </ul>
      ) : <p className="mt-4 text-[#52617a]">{copy.lawyersEmpty}</p>}
    </section>
  );
}
