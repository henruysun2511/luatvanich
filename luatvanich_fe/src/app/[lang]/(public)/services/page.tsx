import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { SupportedLocale } from "@/types/api";
import { LegalServicesDirectorySection, LegalServicesHeroSection } from "@/features/legal-services";
import { LegalServicesSupportSection } from "@/features/legal-services/components/public/LegalServicesSupportSection";
import { publicServicesCopy } from "@/features/legal-services/constants/public-services.constant";
import { parsePublicServicesFilters } from "@/features/legal-services/utils/public-services-url";

interface Props {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function requireLocale(lang: string): SupportedLocale {
  if (lang !== "vi" && lang !== "zh-CN") notFound();
  return lang;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = requireLocale((await params).lang);
  const { title, description } = publicServicesCopy[lang];
  return { title, description };
}

export default async function ServicesPage({ params, searchParams }: Props) {
  const [route, query] = await Promise.all([params, searchParams]);
  const lang = requireLocale(route.lang);
  const filters = parsePublicServicesFilters(query);
  return (
    <div lang={lang}>
      <LegalServicesHeroSection lang={lang} filters={filters} />
      <LegalServicesDirectorySection lang={lang} {...filters} />
      <LegalServicesSupportSection lang={lang} />
    </div>
  );
}
