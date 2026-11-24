"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { TrendingUp, Calendar } from "lucide-react";
import type { TrendPoint } from "../../types/dashboard.types";

interface ConsultationTrendChartProps {
  data?: TrendPoint[];
  isLoading: boolean;
}

export function ConsultationTrendChart({ data, isLoading }: ConsultationTrendChartProps) {
  const formattedData = (data || []).map((p) => {
    // Format YYYY-MM-DD -> DD/MM
    const parts = p.date.split("-");
    const label = parts.length === 3 ? `${parts[2]}/${parts[1]}` : p.date;
    return {
      date: label,
      fullDate: p.date,
      count: p.consultationsCount,
    };
  });

  const totalCount = formattedData.reduce((acc, cur) => acc + cur.count, 0);

  return (
    <div className="relative bg-white border border-[#c29a45]/35 rounded-xl p-5 md:p-6 shadow-[0_4px_16px_rgba(11,29,63,0.04)] hover:shadow-[0_12px_28px_rgba(10,26,58,0.08)] hover:border-[#c29a45] transition-all duration-300 flex flex-col h-[360px] overflow-hidden">
      {/* Viền đỉnh gradient hoàng gia */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#85151b] via-[#a3171e] to-[#c29a45]" />

      <div className="flex items-center justify-between pb-3.5 border-b border-[#e7dcc3]">
        <div>
          <h3 className="font-royal text-lg font-bold text-[#06122b] flex items-center gap-2 leading-tight">
            <TrendingUp className="size-4.5 text-[#c29a45]" />
            Xu hướng tiếp nhận yêu cầu tư vấn
          </h3>
          <p className="text-[11px] text-muted-foreground font-sans mt-0.5">
            Số lượt khách gửi yêu cầu đặt lịch hẹn pháp lý theo từng ngày
          </p>
        </div>

        <div className="text-right">
          <span className="font-royal text-base font-bold text-[#06122b]">{totalCount} lượt</span>
          <span className="block text-[10px] text-muted-foreground font-sans">Tổng giai đoạn</span>
        </div>
      </div>

      <div className="flex-1 w-full pt-4 min-h-0">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground animate-pulse">
            Đang tải dữ liệu biểu đồ...
          </div>
        ) : formattedData.length === 0 ? (
          <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
            Chưa có dữ liệu ghi nhận trong giai đoạn này.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="consultationGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
              <XAxis
                dataKey="date"
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload as { fullDate: string; count: number };
                    return (
                      <div className="bg-popover border border-border p-2.5 rounded-lg shadow-md text-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-muted-foreground font-mono text-[11px]">
                          <Calendar className="size-3" />
                          <span>{item.fullDate}</span>
                        </div>
                        <div className="font-semibold text-foreground">
                          {item.count} yêu cầu tư vấn
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#2563EB"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#consultationGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
