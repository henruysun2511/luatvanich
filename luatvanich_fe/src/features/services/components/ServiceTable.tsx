"use client";

import React from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SERVICE_STATUS_BADGES } from "../constants/service.constants";
import type {
  LegalServiceItem,
  ServiceSortField,
} from "../types/service.types";
import { formatDate } from "@/lib/utils";

interface ServiceTableProps {
  items: LegalServiceItem[];
  isLoading: boolean;
  skeletonCount?: number;
  sortField?: ServiceSortField;
  sortDirection?: "asc" | "desc";
  onSortChange: (field: ServiceSortField) => void;
  onEditItem: (item: LegalServiceItem) => void;
  onDeleteItem: (item: LegalServiceItem) => void;
}

export function ServiceTable({
  items,
  isLoading,
  skeletonCount = 5,
  sortField,
  sortDirection,
  onSortChange,
  onEditItem,
  onDeleteItem,
}: ServiceTableProps) {
  const renderSortHeader = (field: ServiceSortField, label: string) => {
    const isCurrent = sortField === field;
    const Icon = !isCurrent
      ? ArrowUpDown
      : sortDirection === "desc"
      ? ArrowDown
      : ArrowUp;

    return (
      <TableHead>
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-8 text-xs font-semibold"
          onClick={() => onSortChange(field)}
        >
          {label}
          <Icon className="size-3.5 ml-1" />
        </Button>
      </TableHead>
    );
  };

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16 text-center">STT</TableHead>
            <TableHead className="w-24">Mã</TableHead>
            {renderSortHeader("titleVi", "Tên dịch vụ")}
            <TableHead>Lĩnh vực chuyên môn</TableHead>
            <TableHead>Trạng thái</TableHead>
            {renderSortHeader("createdAt", "Ngày tạo")}
            <TableHead className="w-24 text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: skeletonCount }).map((_, idx) => (
                <TableRow key={idx}>
                  {Array.from({ length: 7 }).map((__, colIdx) => (
                    <TableCell key={colIdx}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : items.map((service) => {
                const statusConfig = SERVICE_STATUS_BADGES.find(
                  (b) => b.value === service.status,
                );

                return (
                  <TableRow key={service.id}>
                    <TableCell className="text-center font-mono text-xs">
                      {service.displayOrder}
                    </TableCell>
                    <TableCell className="font-mono text-xs font-semibold text-primary">
                      {service.code}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-foreground">
                        {service.titleVi}
                      </div>
                      {service.titleZh && (
                        <div className="text-xs text-muted-foreground">
                          {service.titleZh}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-xs">
                      <span className="inline-block px-2 py-0.5 rounded bg-muted">
                        {service.practiceArea}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusConfig?.badgeStyle ?? "outline"}>
                        {statusConfig?.text ?? service.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDate(service.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={() => onEditItem(service)}
                        aria-label={`Sửa ${service.titleVi}`}
                      >
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-destructive hover:text-destructive"
                        onClick={() => onDeleteItem(service)}
                        aria-label={`Xóa ${service.titleVi}`}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
    </div>
  );
}
