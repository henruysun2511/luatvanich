"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  UserFiltersBar,
  UserListTable,
  UserPagination,
  CreateUserDialog,
  useUserFilters,
  useUsers,
} from "@/features/users";
import { UserPlus, Users } from "lucide-react";

export default function UsersManagementPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const {
    searchInput,
    setSearchInput,
    role,
    setRole,
    status,
    setStatus,
    page,
    setPage,
    limit,
    setLimit,
    resetFilters,
    queryParams,
  } = useUserFilters();

  const { data, isLoading, isFetching } = useUsers(queryParams);

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Users className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-serif text-foreground leading-tight">
              Quản lý tài khoản người dùng
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Danh sách quản trị viên, luật sư, biên tập viên và phân bổ quyền truy cập hệ thống.
            </p>
          </div>
        </div>

        <Button
          onClick={() => setIsCreateOpen(true)}
          className="gap-2 shrink-0 self-start sm:self-auto"
        >
          <UserPlus className="size-4" />
          Thêm tài khoản
        </Button>
      </div>

      {/* Filter Bar */}
      <UserFiltersBar
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        role={role}
        onRoleChange={setRole}
        status={status}
        onStatusChange={setStatus}
        onReset={resetFilters}
      />

      {/* Users Table */}
      <UserListTable
        users={data?.items || []}
        isLoading={isLoading || isFetching}
      />

      {/* Pagination Bar */}
      {data?.pagination && data.pagination.total > 0 && (
        <UserPagination
          pagination={data.pagination}
          onPageChange={setPage}
          onLimitChange={setLimit}
        />
      )}

      {/* Modal Thêm người dùng mới */}
      <CreateUserDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />
    </div>
  );
}
