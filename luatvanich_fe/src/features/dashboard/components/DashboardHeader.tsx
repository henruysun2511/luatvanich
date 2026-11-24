"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw, Calendar } from "lucide-react";

interface DashboardHeaderProps {
  days: number;
  onDaysChange: (days: number) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function DashboardHeader({
  days,
  onDaysChange,
  onRefresh,
  isRefreshing,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3 border-b border-[#e7dcc3]">
      <div>
        <h1 className="font-royal text-2xl font-bold tracking-tight text-[#06122b]">
          Bảng điều khiển Quản trị
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5 font-sans">
          Tổng quan số liệu tương tác, biểu đồ phân tích và tình trạng tiếp nhận hồ sơ Hãng luật{" "}
          <span className="font-hanzi text-[#c29a45] font-semibold hidden md:inline">
            &bull; 万益律师事务所
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Bộ chọn khung thời gian */}
        <div className="flex items-center gap-1.5 bg-white border border-[#e7dcc3] rounded-lg px-2.5 py-1 shadow-2xs">
          <Calendar className="size-3.5 text-[#c29a45]" />
          <Select value={String(days)} onValueChange={(val) => onDaysChange(Number(val))}>
            <SelectTrigger className="h-7 text-xs border-0 bg-transparent shadow-none px-1.5 focus:ring-0 w-[130px] font-sans">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="7">7 ngày gần nhất</SelectItem>
              <SelectItem value="14">14 ngày gần nhất</SelectItem>
              <SelectItem value="30">30 ngày gần nhất</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Nút Làm mới */}
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="h-9 gap-1.5 text-xs border-[#e7dcc3] hover:bg-[#fbf7ee] text-[#06122b] shadow-2xs"
        >
          <RotateCcw className={`size-3.5 text-[#c29a45] ${isRefreshing ? "animate-spin" : ""}`} />
          <span>Làm mới</span>
        </Button>
      </div>
    </div>
  );
}
