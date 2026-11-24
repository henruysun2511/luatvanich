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
    <div className="bg-card border border-border rounded-xl p-5 shadow-xs flex flex-col h-[340px]">
      <div className="pb-3 border-b border-border/60">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <PieChartIcon className="size-4 text-emerald-600 dark:text-emerald-400" />
          Phân bố trạng thái xử lý hồ sơ
        </h3>
        <p className="text-[11px] text-muted-foreground mt-0.5">
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
                          <div className="bg-popover border border-border p-2 rounded-lg shadow-md text-xs space-y-0.5">
                            <span className="font-semibold text-foreground">{item.label}</span>
                            <div className="text-muted-foreground">
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
