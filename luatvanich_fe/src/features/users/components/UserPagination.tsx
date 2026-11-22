"use client";

import React from "react";
import { Pagination, type PaginationMeta } from "@/components/common";

export interface UserPaginationProps {
  pagination?: PaginationMeta;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export function UserPagination({
  pagination,
  onPageChange,
  onLimitChange,
}: UserPaginationProps) {
  return (
    <Pagination
      pagination={pagination}
      onPageChange={onPageChange}
      onLimitChange={onLimitChange}
      itemLabel="tài khoản"
    />
  );
}
