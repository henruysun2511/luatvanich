import { notFound, permanentRedirect } from "next/navigation";
import { getPublicServicesHref, parsePublicServicesFilters } from "@/features/legal-services/utils/public-services-url";

interface Props {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function LegalServicesPage({ params, searchParams }: Props) {
  const [route, query] = await Promise.all([params, searchParams]);
  if (route.lang !== "vi" && route.lang !== "zh-CN") notFound();
  permanentRedirect(getPublicServicesHref(route.lang, parsePublicServicesFilters(query)));
}
