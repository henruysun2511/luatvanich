import React from "react";
import { LegalServiceDetailView } from "@/features/legal-services";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export default async function LegalServiceDetailPage({ params }: Props) {
  const { lang, slug } = await params;
  return <LegalServiceDetailView lang={lang} slug={slug} />;
}
