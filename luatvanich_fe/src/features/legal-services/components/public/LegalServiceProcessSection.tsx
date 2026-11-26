import type { SupportedLocale } from "@/types/api";
import { publicServiceDetailCopy } from "../../constants/public-service-detail.constant";

interface Props {
  lang: SupportedLocale;
  contentLang: SupportedLocale;
  steps: string[];
  estimatedTime?: string;
}

export function LegalServiceProcessSection({ lang, contentLang, steps, estimatedTime }: Props) {
  const copy = publicServiceDetailCopy[lang];
  return (
    <section aria-labelledby="service-process" className="border border-[#e2dbce] bg-white p-6 sm:p-8">
      <h2 id="service-process" className="font-serif text-2xl font-bold text-[#0b1d3f] sm:text-3xl">{copy.process}</h2>
      {steps.length > 0 ? (
        <ol lang={contentLang} className="mt-5 list-decimal space-y-3 pl-5 leading-relaxed text-[#47566f] marker:font-semibold marker:text-[#85151b]">
          {steps.map((step, index) => <li key={index} className="pl-1">{step}</li>)}
        </ol>
      ) : <p className="mt-4 text-[#52617a]">{copy.processEmpty}</p>}
      {estimatedTime && (
        <p className="mt-5 border-t border-[#e2dbce] pt-4 text-sm text-[#47566f]">
          <strong className="mr-2 text-[#0b1d3f]">{copy.estimatedTime}</strong>
          <span lang={contentLang}>{estimatedTime}</span>
        </p>
      )}
    </section>
  );
}
