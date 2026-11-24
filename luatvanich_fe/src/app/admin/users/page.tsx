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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#e7dcc3]">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-[#06122b]/10 text-[#06122b] flex items-center justify-center shrink-0">
            <Users className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-royal text-[#06122b] leading-tight">
              Quản lý tài khoản người dùng
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5 font-sans">
              Danh sách quản trị viên, luật sư, biên tập viên và phân bổ quyền truy cập hệ thống{" "}
              <span className="font-hanzi text-[#c29a45] font-semibold hidden md:inline">
                &bull; 权限管理
              </span>
            </p>
          </div>
        </div>

        <Button
          onClick={() => setIsCreateOpen(true)}
          variant="royal"
          className="gap-2 shrink-0 self-start sm:self-auto text-xs font-semibold h-9 px-4"
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
