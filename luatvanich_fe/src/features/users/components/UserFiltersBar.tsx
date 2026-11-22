"use client";

import React from "react";
import { Search, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RoleSelect } from "@/features/roles";
import { USER_STATUS_OPTIONS } from "../constants/users.constants";

interface UserFiltersBarProps {
  searchInput: string;
  onSearchChange: (value: string) => void;
  role: string;
  onRoleChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

export function UserFiltersBar({
  searchInput,
  onSearchChange,
  role,
  onRoleChange,
  status,
  onStatusChange,
  onReset,
}: UserFiltersBarProps) {
  const isFiltered = !!searchInput || !!role || status !== "ALL";

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-card p-3 rounded-lg border border-border shadow-sm">
      {/* Search Input */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Tìm theo tên, username, email..."
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-9 text-xs"
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Role Select từ Feature roles */}
        <div className="w-40">
          <RoleSelect
            value={role}
            onChange={onRoleChange}
            includeAllOption
            placeholder="Lọc vai trò..."
            className="h-9 text-xs"
          />
        </div>

        {/* Status Select */}
        <div className="w-36">
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="h-9 text-xs">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              {USER_STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className="text-xs">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reset Button */}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-9 text-xs text-muted-foreground hover:text-foreground"
            title="Làm mới bộ lọc"
          >
            <RotateCcw className="size-3.5 mr-1" />
            Đặt lại
          </Button>
        )}
      </div>
    </div>
  );
}
