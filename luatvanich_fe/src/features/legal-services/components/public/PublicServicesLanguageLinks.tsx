import Link from "next/link";
import type { SupportedLocale } from "@/types/api";
import { publicServicesCopy } from "../../constants/public-services.constant";
import { getPublicServicesHref, type PublicServicesFilters } from "../../utils/public-services-url";

interface Props {
  lang: SupportedLocale;
  filters: PublicServicesFilters;
}

const languages = [
  { code: "vi", label: "Tiếng Việt" },
  { code: "zh-CN", label: "简体中文" },
] as const;

export function PublicServicesLanguageLinks({ lang, filters }: Props) {
  return (
    <nav aria-label={publicServicesCopy[lang].language} className="flex gap-1 border border-[#f0d28a]/30 p-1">
      {languages.map(({ code, label }) => (
        <Link
          key={code}
          lang={code}
          hrefLang={code}
          href={getPublicServicesHref(code, filters)}
          aria-current={code === lang ? "page" : undefined}
          className={`px-3 py-1.5 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f0d28a] ${
            code === lang ? "bg-[#f0d28a] text-[#0b1d3f]" : "text-white hover:bg-white/10"
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
