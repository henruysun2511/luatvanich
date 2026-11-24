import React from "react";
import { LawyersHeroSection } from "@/features/lawyers";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function LawyersPage({ params }: Props) {
  const { lang } = await params;
  return <LawyersHeroSection lang={lang} />;
}
