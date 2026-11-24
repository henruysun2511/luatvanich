"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common";
import {
  UserFiltersBar,
  UserListTable,
  UserPagination,
  CreateUserDialog,
  useUserFilters,
  useUsers,
} from "@/features/users";
import { UserPlus, ShieldCheck } from "lucide-react";

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
      <PageHeader
        icon={ShieldCheck}
        title="Quản lý tài khoản người dùng"
        description={
          <>
            Danh sách quản trị viên, luật sư, biên tập viên và phân bổ quyền truy cập hệ thống{" "}
            <span className="font-hanzi text-[#c29a45] font-semibold hidden md:inline">
              &bull; 权限管理
            </span>
          </>
        }
        actions={
          <Button
            onClick={() => setIsCreateOpen(true)}
            className="btn-royal !text-xs !h-9 !px-4 gap-2 shrink-0 self-start sm:self-auto"
          >
            <UserPlus className="size-4" />
            Thêm tài khoản
          </Button>
        }
      />

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
