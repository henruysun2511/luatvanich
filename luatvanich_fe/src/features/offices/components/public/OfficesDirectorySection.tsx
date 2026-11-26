"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { localOfficePreview } from "../../constants/localOfficePreview";
import { usePublicOffices } from "../../queries/useOfficesQuery";
import { OfficeCard } from "./OfficeCard";

const officeGridClass = "grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-7";

export function OfficesDirectorySection({ lang }: { lang: string }) {
  const isZh = lang.startsWith("zh");
  const locale = isZh ? "zh-CN" : "vi";
  const { data, isPending, isError, isFetching, refetch } = usePublicOffices(locale);
  const offices = process.env.NODE_ENV === "development" && data?.length === 0
    ? localOfficePreview[locale]
    : data;

  return (
    <section
      lang={locale}
      aria-labelledby="offices-directory-title"
      className="border-t border-[#e2dbce] bg-[#fbf9f4]"
    >
      <div className="mx-auto max-w-[1180px] px-6 py-10 sm:px-10 sm:py-14">
        <h2 id="offices-directory-title" className="mb-6 font-royal text-3xl font-bold text-[#0b1d3f] sm:mb-8 sm:text-4xl">
          {isZh ? "办事机构列表" : "Danh sách văn phòng"}
        </h2>

        {isPending && (
          <>
            <p role="status" className="sr-only">
              {isZh ? "正在加载办事机构…" : "Đang tải danh sách văn phòng…"}
            </p>
            <div aria-hidden="true" className={officeGridClass}>
              <Skeleton className="h-56 border-t-2 border-[#e2dbce]" />
              <Skeleton className="h-56 border-t-2 border-[#e2dbce]" />
            </div>
          </>
        )}

        {isError && !offices && (
          <div className="border border-[#e2dbce] bg-white p-6">
            <p role="alert" className="mb-4 text-[#49546a]">
              {isZh ? "无法加载办事机构列表。" : "Không thể tải danh sách văn phòng."}
            </p>
            <Button type="button" variant="royal-outline" disabled={isFetching} onClick={() => void refetch()}>
              {isZh ? "重试" : "Thử lại"}
            </Button>
          </div>
        )}

        {offices?.length === 0 && (
          <p role="status" className="border border-[#e2dbce] bg-white p-6 text-[#49546a]">
            {isZh ? "暂无可显示的办事机构。" : "Hiện chưa có văn phòng được công bố."}
          </p>
        )}

        {!!offices?.length && (
          <ul className={officeGridClass}>
            {offices.map((office) => (
              <li key={office.id} className="min-w-0">
                <OfficeCard office={office} isZh={isZh} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
