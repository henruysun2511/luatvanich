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
    <div className="relative bg-white border border-[#c29a45]/35 p-5 md:p-6 shadow-[0_4px_16px_rgba(11,29,63,0.04)] hover:shadow-[0_12px_28px_rgba(10,26,58,0.08)] hover:border-[#c29a45] transition-all duration-300 flex flex-col h-[360px] overflow-hidden">
      {/* Viền đỉnh gradient hoàng gia */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#06122b] to-[#c29a45]" />

      <div className="pb-3.5 border-b border-[#e7dcc3]">
        <h3 className="font-royal text-lg font-bold text-[#06122b] flex items-center gap-2 leading-tight">
          <BookOpen className="size-4.5 text-[#c29a45]" />
          Cơ cấu bài viết theo chuyên mục & song ngữ
        </h3>
        <p className="text-[11px] text-muted-foreground font-sans mt-0.5">
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
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7dcc3" opacity={0.6} />
              <XAxis
                dataKey="name"
                stroke="#718096"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#718096"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#06122b] border border-[#c29a45]/40 p-2.5 shadow-xl text-xs space-y-1 text-white">
                        <span className="font-royal font-bold text-sm text-[#f0d28a]">{label}</span>
                        {payload.map((p) => (
                          <div key={p.name} className="flex items-center gap-2">
                            <span
                              className="size-2 rounded-full"
                              style={{ backgroundColor: p.color }}
                            />
                            <span className="text-[#a0aec0] font-sans">{p.name}:</span>
                            <span className="font-mono font-bold text-white">
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
              <Bar dataKey="Tiếng Việt" fill="#06122b" radius={0} barSize={20} />
              <Bar dataKey="Tiếng Trung" fill="#c29a45" radius={0} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
