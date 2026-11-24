"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { Globe, BookOpen } from "lucide-react";
import type { ContentSectionDistribution } from "../../types/dashboard.types";

interface ContentCategoryDistributionChartProps {
  data?: ContentSectionDistribution[];
  isLoading: boolean;
}

export function ContentCategoryDistributionChart({
  data,
  isLoading,
}: ContentCategoryDistributionChartProps) {
  const chartData = (data || []).map((item) => ({
    name: item.label,
    "Tiếng Việt": item.viCount,
    "Tiếng Trung": item.zhCount,
  }));

  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-xs flex flex-col h-[340px]">
      <div className="pb-3 border-b border-border/60">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <BookOpen className="size-4 text-purple-600 dark:text-purple-400" />
          Cơ cấu bài viết theo chuyên mục & song ngữ
        </h3>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          So sánh mức độ hoàn thiện nội dung tiếng Việt và tiếng Trung
        </p>
      </div>

      <div className="flex-1 w-full pt-3 min-h-0">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground animate-pulse">
            Đang tải dữ liệu...
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
            Chưa có bài viết nào được khởi tạo.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
              <XAxis
                dataKey="name"
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-popover border border-border p-2.5 rounded-lg shadow-md text-xs space-y-1">
                        <span className="font-semibold text-foreground">{label}</span>
                        {payload.map((p) => (
                          <div key={p.name} className="flex items-center gap-2">
                            <span
                              className="size-2 rounded-full"
                              style={{ backgroundColor: p.color }}
                            />
                            <span className="text-muted-foreground">{p.name}:</span>
                            <span className="font-mono font-semibold text-foreground">
                              {p.value} bài
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                iconType="circle"
                iconSize={8}
              />
              <Bar dataKey="Tiếng Việt" fill="#1B2A49" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="Tiếng Trung" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
