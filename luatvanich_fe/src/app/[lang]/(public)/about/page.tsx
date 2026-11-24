import React from "react";
import { AboutHeroSection } from "@/features/about";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  return <AboutHeroSection lang={lang} />;
}
