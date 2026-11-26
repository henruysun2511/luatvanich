import { notFound } from "next/navigation";
import { LegalServiceDetailView } from "@/features/legal-services";

export default async function LegalServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (lang !== "vi" && lang !== "zh-CN") notFound();
  return <LegalServiceDetailView lang={lang} slug={slug} />;
}
