import React from "react";
import { OfficesDirectorySection } from "@/features/offices/components/public/OfficesDirectorySection";
import { OfficesHeroSection } from "@/features/offices/components/public/OfficesHeroSection";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function OfficesPage({ params }: Props) {
  const { lang } = await params;
  return (
    <>
      <OfficesHeroSection lang={lang} />
      <OfficesDirectorySection lang={lang} />
    </>
  );
}
