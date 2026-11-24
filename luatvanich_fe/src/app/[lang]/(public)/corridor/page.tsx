import React from "react";
import { CorridorHeroSection } from "@/features/corridor";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function CorridorPage({ params }: Props) {
  const { lang } = await params;
  return <CorridorHeroSection lang={lang} />;
}
