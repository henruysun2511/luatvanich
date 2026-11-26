"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { LawFirmApiError } from "@/lib/axios";
import type { SupportedLocale } from "@/types/api";
import { publicServiceDetailCopy } from "../../constants/public-service-detail.constant";
import { usePublicLegalServiceDetail } from "../../queries/useServiceQuery";
import { getPublicServiceDetailHref, getPublicServicesHref } from "../../utils/public-services-url";
import { LegalServiceFeesSection } from "./LegalServiceFeesSection";
import { LegalServiceLawyersSection } from "./LegalServiceLawyersSection";
import { LegalServiceProcessSection } from "./LegalServiceProcessSection";

const languages = [
  { code: "vi", label: "Tiếng Việt" },
  { code: "zh-CN", label: "简体中文" },
] as const;

const ctaClass = "inline-flex items-center justify-center gap-2 bg-[#f0d28a] px-5 py-3 font-semibold text-[#0b1d3f] hover:bg-[#ffe6a9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3171e]";

export function LegalServiceDetailView({ lang, slug }: { lang: SupportedLocale; slug: string }) {
  const copy = publicServiceDetailCopy[lang];
  const detail = usePublicLegalServiceDetail(lang, slug);
  const listHref = getPublicServicesHref(lang, { page: 1 });

  if (detail.isPending) {
    return <p lang={lang} role="status" className="mx-auto max-w-[1180px] px-6 py-16 text-[#52617a]">{copy.loading}</p>;
  }

  if (detail.isError) {
    const isNotFound = detail.error instanceof LawFirmApiError && detail.error.statusCode === 404;
    return (
      <div lang={lang} className="mx-auto max-w-[1180px] space-y-4 px-6 py-16">
        <h1 role="alert" className="font-serif text-3xl font-bold text-[#0b1d3f]">{isNotFound ? copy.notFound : copy.error}</h1>
        {!isNotFound && (
          <button type="button" onClick={() => void detail.refetch()} className="mr-5 font-semibold text-[#85151b] underline">{copy.retry}</button>
        )}
        <Link href={listHref} className="font-semibold text-[#85151b] underline">{copy.back}</Link>
      </div>
    );
  }

  const service = detail.data;
  const contentLang = service.fallback ? "vi" : lang;
  const bookingHref = `/${lang}#lienhe`;
  return (
    <div lang={lang} className="bg-[#fbf9f4]">
      <section className="border-b border-[#c29a45] bg-gradient-to-br from-[#071530] to-[#102a58] text-white">
        <div className="mx-auto max-w-[1180px] px-6 py-10 sm:px-10 sm:py-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <nav aria-label={copy.services} className="flex flex-wrap items-center gap-2 text-sm text-[#f0d28a]">
              <Link href={`/${lang}`} className="hover:underline">{copy.home}</Link>
              <span aria-hidden="true">/</span>
              <Link href={listHref} className="hover:underline">{copy.services}</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" lang={contentLang} className="text-white">{service.title}</span>
            </nav>
            <nav aria-label={copy.language} className="flex flex-wrap gap-1 border border-[#f0d28a]/30 p-1">
              {languages.map(({ code, label }) => (
                <Link
                  key={code}
                  lang={code}
                  hrefLang={code}
                  aria-current={code === lang ? "page" : undefined}
                  href={getPublicServiceDetailHref(code, service.localizedSlugs?.[code] ?? service.slug ?? slug)}
                  className={`px-3 py-1.5 text-xs font-semibold ${code === lang ? "bg-[#f0d28a] text-[#0b1d3f]" : "hover:bg-white/10"}`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <h1 lang={contentLang} className="mt-7 max-w-4xl break-words font-royal text-4xl font-bold sm:text-6xl">{service.title}</h1>
          {service.fallback && <p className="mt-3 text-sm font-semibold text-[#f0d28a]">{copy.fallback}</p>}
          {service.excerpt && <p lang={contentLang} className="mt-4 max-w-3xl break-words text-base leading-relaxed text-[#d0daef] sm:text-lg">{service.excerpt}</p>}
          <Link href={bookingHref} className={`mt-7 ${ctaClass}`}>{copy.book}<ArrowRight aria-hidden="true" className="size-4" /></Link>
        </div>
      </section>

      <div className="mx-auto max-w-[1180px] px-6 py-8 sm:px-10 sm:py-12">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <LegalServiceProcessSection lang={lang} contentLang={contentLang} steps={service.processSteps ?? []} estimatedTime={service.estimatedTime} />
          <LegalServiceFeesSection lang={lang} contentLang={contentLang} fees={service.referenceFees ?? []} feeStructure={service.feeStructure} />
          <div className="lg:col-span-2">
            <LegalServiceLawyersSection lang={lang} practiceAreaId={service.practiceAreaId ?? null} />
          </div>
        </div>
        <Link href={listHref} className="mt-7 inline-flex items-center gap-2 font-semibold text-[#85151b] hover:underline">
          <ArrowLeft aria-hidden="true" className="size-4" /> {copy.back}
        </Link>
      </div>
    </div>
  );
}
