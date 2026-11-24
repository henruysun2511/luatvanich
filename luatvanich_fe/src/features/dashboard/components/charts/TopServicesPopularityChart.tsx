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
    <div className="relative bg-white border border-[#c29a45]/35 p-5 md:p-6 shadow-[0_4px_16px_rgba(11,29,63,0.04)] hover:shadow-[0_12px_28px_rgba(10,26,58,0.08)] hover:border-[#c29a45] transition-all duration-300 flex flex-col h-[360px] overflow-hidden">
      {/* Viền đỉnh gradient hoàng gia */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#c29a45] to-[#f0d28a]" />

      <div className="pb-3.5 border-b border-[#e7dcc3]">
        <h3 className="font-royal text-lg font-bold text-[#06122b] flex items-center gap-2 leading-tight">
          <Briefcase className="size-4.5 text-[#c29a45]" />
          Top lĩnh vực pháp lý được quan tâm nhất
        </h3>
        <p className="text-[11px] text-muted-foreground font-sans mt-0.5">
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
                      <div className="bg-[#06122b] border border-[#c29a45]/40 p-2.5 shadow-xl text-xs space-y-1 text-white">
                        <span className="font-royal font-bold text-sm text-[#f0d28a]">{item.fullName}</span>
                        <div className="text-[#a0aec0] font-mono">
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
                fill="#c29a45"
                radius={0}
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
