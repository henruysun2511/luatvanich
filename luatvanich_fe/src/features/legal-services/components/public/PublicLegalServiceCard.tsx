import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import { publicServiceDetailCopy } from "../../constants/public-service-detail.constant";
import { getPublicServiceDetailHref } from "../../utils/public-services-url";
import { cn } from "@/lib/utils";
import type { SupportedLocale } from "@/types/api";
import { publicServicesCopy } from "../../constants/public-services.constant";
import type { PublicLegalServiceItem } from "../../types/service.types";

interface Props {
  service: PublicLegalServiceItem;
  lang: SupportedLocale;
  view: "list" | "grid";
}

export function PublicLegalServiceCard({ service, lang, view }: Props) {
  const isVietnameseFallback = lang === "zh-CN" && service.fallback;
  return (
    <article className={cn(
      "flex items-start gap-4 bg-white p-5 sm:gap-6 sm:p-7",
      view === "grid" && "border border-[#e2dbce] border-t-2 border-t-[#a3171e]",
    )}>
      <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center border border-[#e2dbce] bg-[#fbf9f4] text-[#8e6d23] sm:size-14">
        {service.hanziBadge
          ? <span className="font-chinese text-2xl font-bold">{service.hanziBadge}</span>
          : <Scale className="size-6" />}
      </span>
      <div className="min-w-0">
        {isVietnameseFallback && (
          <p className="mb-1 text-xs font-semibold text-[#85151b]">{publicServicesCopy[lang].fallback}</p>
        )}
        <div lang={isVietnameseFallback ? "vi" : lang}>
          <h2 className="break-words font-serif text-xl font-bold leading-tight text-[#0b1d3f] sm:text-2xl">{service.title}</h2>
          {service.excerpt && <p className="mt-2 max-w-3xl break-words text-sm leading-relaxed text-[#52617a] sm:text-base">{service.excerpt}</p>}
        </div>
        <Link
          href={getPublicServiceDetailHref(lang, service.slug)}
          aria-label={`${publicServiceDetailCopy[lang].detail} · ${service.title}`}
          className="mt-3 inline-flex items-center gap-2 font-semibold text-[#85151b] hover:underline"
        >
          {publicServiceDetailCopy[lang].detail}<ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </article>
  );
}
