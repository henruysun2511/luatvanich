"use client";

import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";
import type { StatusBreakdownItem } from "../../types/dashboard.types";

interface ConsultationStatusDonutChartProps {
  data?: StatusBreakdownItem[];
  isLoading: boolean;
}

export function ConsultationStatusDonutChart({
  data,
  isLoading,
}: ConsultationStatusDonutChartProps) {
  const chartData = (data || []).filter((d) => d.count > 0);
  const totalCount = (data || []).reduce((acc, cur) => acc + cur.count, 0);

  return (
    <div className="relative bg-white border border-[#c29a45]/35 p-5 md:p-6 shadow-[0_4px_16px_rgba(11,29,63,0.04)] hover:shadow-[0_12px_28px_rgba(10,26,58,0.08)] hover:border-[#c29a45] transition-all duration-300 flex flex-col h-[360px] overflow-hidden">
      {/* Viền đỉnh gradient hoàng gia */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#c29a45] via-[#a3171e] to-[#06122b]" />

      <div className="pb-3.5 border-b border-[#e7dcc3]">
        <h3 className="font-royal text-lg font-bold text-[#06122b] flex items-center gap-2 leading-tight">
          <PieChartIcon className="size-4.5 text-[#c29a45]" />
          Phân bố trạng thái xử lý hồ sơ
        </h3>
        <p className="text-[11px] text-muted-foreground font-sans mt-0.5">
          Tỷ lệ tiếp nhận và giải quyết yêu cầu khách hàng
        </p>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 min-h-0">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground animate-pulse">
            Đang tải dữ liệu...
          </div>
        ) : totalCount === 0 ? (
          <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
            Chưa có yêu cầu tư vấn nào được ghi nhận.
          </div>
        ) : (
          <>
            {/* Vùng Donut Chart */}
            <div className="relative size-44 shrink-0 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const item = payload[0].payload as StatusBreakdownItem;
                        return (
                          <div className="bg-[#06122b] border border-[#c29a45]/40 p-2.5 rounded-none shadow-xl text-xs space-y-0.5 text-white">
                            <span className="font-royal font-bold text-sm text-[#f0d28a]">{item.label}</span>
                            <div className="text-[#a0aec0] font-mono">
                              {item.count} hồ sơ ({item.percentage}%)
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {chartData.map((entry) => (
                      <Cell key={`cell-${entry.status}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Tâm Donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-lg font-bold font-mono text-foreground leading-none">
                  {totalCount}
                </span>
                <span className="text-[10px] text-muted-foreground mt-0.5">Tổng hồ sơ</span>
              </div>
            </div>

            {/* Chú giải (Legend) */}
            <div className="flex-1 w-full space-y-2 text-xs">
              {(data || []).map((item) => (
                <div key={item.status} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="size-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-foreground/90 font-medium text-xs">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-muted-foreground text-xs">
                    <span className="font-semibold text-foreground">{item.count}</span>
                    <span className="text-[11px] opacity-70">({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
