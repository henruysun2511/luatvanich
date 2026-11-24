import React from "react";
import { OfficesHeroSection } from "@/features/offices";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function OfficesPage({ params }: Props) {
  const { lang } = await params;
  return <OfficesHeroSection lang={lang} />;
}
