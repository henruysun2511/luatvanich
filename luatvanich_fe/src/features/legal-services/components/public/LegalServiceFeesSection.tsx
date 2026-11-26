import type { SupportedLocale } from "@/types/api";
import { publicServiceDetailCopy } from "../../constants/public-service-detail.constant";

interface Props {
  lang: SupportedLocale;
  contentLang: SupportedLocale;
  fees: string[];
  feeStructure?: string;
}

export function LegalServiceFeesSection({ lang, contentLang, fees, feeStructure }: Props) {
  const copy = publicServiceDetailCopy[lang];
  return (
    <section aria-labelledby="service-fees" className="border border-[#e2dbce] border-t-2 border-t-[#a3171e] bg-white p-6">
      <h2 id="service-fees" className="font-serif text-2xl font-bold text-[#0b1d3f]">{copy.fees}</h2>
      {fees.length > 0 ? (
        <ul lang={contentLang} className="mt-4 divide-y divide-[#e2dbce] text-[#47566f]">
          {fees.map((fee, index) => <li key={index} className="py-2">{fee}</li>)}
        </ul>
      ) : <p className="mt-4 text-[#52617a]">{copy.feesEmpty}</p>}
      {feeStructure && (
        <dl className="mt-4 border-t border-[#e2dbce] pt-4 text-sm">
          <dt className="font-semibold text-[#0b1d3f]">{copy.feeStructure}</dt>
          <dd lang={contentLang} className="mt-1 text-[#47566f]">{feeStructure}</dd>
        </dl>
      )}
    </section>
  );
}
