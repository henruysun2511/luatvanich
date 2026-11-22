"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRoles } from "../queries/useRolesQuery";

interface RoleSelectProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  includeAllOption?: boolean;
  disabled?: boolean;
  className?: string;
}

export function RoleSelect({
  value,
  onChange,
  placeholder = "Chọn vai trò...",
  includeAllOption = false,
  disabled = false,
  className,
}: RoleSelectProps) {
  const { data: roles = [], isLoading } = useRoles();

  return (
    <Select
      value={value}
      onValueChange={(val) => {
        onChange(val === "ALL" ? "" : val);
      }}
      disabled={disabled || isLoading}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={isLoading ? "Đang tải vai trò..." : placeholder} />
      </SelectTrigger>
      <SelectContent>
        {includeAllOption && (
          <SelectItem value="ALL">Tất cả vai trò</SelectItem>
        )}
        {roles.map((r) => (
          <SelectItem key={r.id} value={r.code}>
            {r.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
