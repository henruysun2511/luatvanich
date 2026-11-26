import { notFound, permanentRedirect } from "next/navigation";
import { getPublicServiceDetailHref } from "@/features/legal-services/utils/public-services-url";

export default async function LegacyLegalServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (lang !== "vi" && lang !== "zh-CN") notFound();
  permanentRedirect(getPublicServiceDetailHref(lang, slug));
}
