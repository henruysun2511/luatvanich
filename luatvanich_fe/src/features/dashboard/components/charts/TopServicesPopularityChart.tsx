"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Briefcase } from "lucide-react";
import type { TopPracticeAreaItem } from "../../types/dashboard.types";

interface TopServicesPopularityChartProps {
  data?: TopPracticeAreaItem[];
  isLoading: boolean;
}

export function TopServicesPopularityChart({
  data,
  isLoading,
}: TopServicesPopularityChartProps) {
  const chartData = (data || []).map((item) => ({
    name: item.name.length > 28 ? `${item.name.slice(0, 26)}...` : item.name,
    fullName: item.name,
    count: item.count,
  }));

  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-xs flex flex-col h-[340px]">
      <div className="pb-3 border-b border-border/60">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <Briefcase className="size-4 text-amber-600 dark:text-amber-400" />
          Top lĩnh vực pháp lý được quan tâm nhất
        </h3>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Số lượng hồ sơ yêu cầu tư vấn theo từng nhóm chuyên môn
        </p>
      </div>

      <div className="flex-1 w-full pt-3 min-h-0">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground animate-pulse">
            Đang tải dữ liệu...
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
            Chưa có đủ dữ liệu lĩnh vực tư vấn.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 10, right: 25, left: 10, bottom: 0 }}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={140}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload as { fullName: string; count: number };
                    return (
                      <div className="bg-popover border border-border p-2 rounded-lg shadow-md text-xs space-y-0.5">
                        <span className="font-semibold text-foreground">{item.fullName}</span>
                        <div className="text-muted-foreground font-mono">
                          {item.count} yêu cầu quan tâm
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="count"
                fill="#C9A24B"
                radius={[0, 6, 6, 0]}
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
