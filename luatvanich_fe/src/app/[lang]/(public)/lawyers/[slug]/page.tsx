import React from "react";
import { LawyerDetailView } from "@/features/lawyers";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export default async function LawyerDetailPage({ params }: Props) {
  const { lang, slug } = await params;
  return <LawyerDetailView lang={lang} slug={slug} />;
}
