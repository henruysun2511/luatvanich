import Image from "next/image";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import type { PublicOffice } from "../../types/offices.types";

interface OfficeCardProps {
  office: PublicOffice;
  isZh: boolean;
}

const contactLinkClass =
  "hover:text-[#a3171e] hover:underline focus-visible:outline-[#a3171e] [overflow-wrap:anywhere]";

export function OfficeCard({ office, isZh }: OfficeCardProps) {
  const { address, latitude, longitude, phone, email } = office;
  const destination =
    latitude != null && longitude != null
      ? `${latitude},${longitude}`
      : address.trim();
  const directionsUrl = destination
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`
    : null;

  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden border border-[#e2dbce] border-t-2 border-t-[#c29a45] bg-white text-[#121c2d]">
      {office.imageUrl && (
        <div className="relative aspect-[16/9] bg-[#f1ebde]">
          <Image
            src={office.imageUrl}
            alt=""
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col items-start p-5 sm:p-7">
        {office.isHeadquarters && (
          <span className="mb-3 bg-[#f5edda] px-2.5 py-1 text-xs font-semibold text-[#674918]">
            {isZh ? "总部" : "Trụ sở chính"}
          </span>
        )}
        <h3 className="font-royal text-2xl font-bold leading-snug text-[#0b1d3f] [overflow-wrap:anywhere]">
          {office.name}
        </h3>
        {office.description && (
          <p className="mt-2 text-sm leading-relaxed text-[#49546a] [overflow-wrap:anywhere]">
            {office.description}
          </p>
        )}

        <ul className="mt-5 w-full space-y-3 text-sm leading-relaxed text-[#49546a] empty:hidden">
          {address && (
            <li className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#8a6224]" />
              <span className="[overflow-wrap:anywhere]">{address}</span>
            </li>
          )}
          {office.workingHours && (
            <li className="flex items-start gap-3">
              <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#8a6224]" />
              <span className="whitespace-pre-line [overflow-wrap:anywhere]">{office.workingHours}</span>
            </li>
          )}
          {phone && (
            <li className="flex items-start gap-3">
              <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#8a6224]" />
              <a href={`tel:${phone.replace(/[\s().-]/g, "")}`} className={contactLinkClass}>
                {phone}
              </a>
            </li>
          )}
          {email && (
            <li className="flex items-start gap-3">
              <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#8a6224]" />
              <a href={`mailto:${email}`} className={contactLinkClass}>{email}</a>
            </li>
          )}
        </ul>

        {directionsUrl && (
          <div className="mt-auto pt-5">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 border border-[#dfd1b4] px-3 text-sm font-semibold text-[#0b1d3f] hover:border-[#a3171e] hover:text-[#a3171e] focus-visible:outline-[#a3171e]"
            >
              {isZh ? "获取路线" : "Chỉ đường"}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
