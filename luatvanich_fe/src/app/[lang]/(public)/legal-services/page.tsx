import React from "react";
import {
  LegalServicesHeroSection,
  LegalServicesDirectorySection,
} from "@/features/legal-services";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function LegalServicesPage({ params }: Props) {
  const { lang } = await params;
  return (
    <>
      <LegalServicesHeroSection lang={lang} />
      <LegalServicesDirectorySection lang={lang} />
    </>
  );
}
