import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeTickerProps {
  items?: Array<{ vi: string; zh: string }>;
  className?: string;
}

const DEFAULT_TICKER_ITEMS = [
  { vi: "Hợp đồng", zh: "合同" },
  { vi: "Đầu tư", zh: "投资" },
  { vi: "Trọng tài", zh: "仲裁" },
  { vi: "Thu hồi nợ", zh: "债务追收" },
  { vi: "Sở hữu trí tuệ", zh: "知识产权" },
  { vi: "Lao động", zh: "劳动" },
  { vi: "M&A", zh: "并购" },
  { vi: "Thuế", zh: "税务" },
];

export function MarqueeTicker({
  items = DEFAULT_TICKER_ITEMS,
  className,
}: MarqueeTickerProps) {
  const combined = [...items, ...items];

  return (
    <div
      className={cn(
        "bg-gradient-to-r from-[#7c1015] via-[#a3171e] to-[#7c1015] text-white overflow-hidden whitespace-nowrap relative z-10 border-y border-[#c29a45] py-3 select-none",
        className,
      )}
      aria-hidden="true"
    >
      <div className="inline-block animate-marquee font-sans font-semibold text-xs sm:text-sm tracking-[1.5px] uppercase">
        {combined.map((item, idx) => (
          <span key={idx} className="mx-6 sm:mx-8">
            {item.vi}
            <b className="font-hanzi font-bold text-sm sm:text-base ml-2 text-[#f0d28a]">
              {item.zh}
            </b>
          </span>
        ))}
      </div>
    </div>
  );
}
