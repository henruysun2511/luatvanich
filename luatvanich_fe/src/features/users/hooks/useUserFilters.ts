"use client";

import { useState, useEffect, useTransition } from "react";
import type { UserQueryParams } from "../types/users.types";
import { DEFAULT_USERS_LIMIT } from "../constants/users.constants";

export function useUserFilters() {
  const [, startTransition] = useTransition();

  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<string>("ALL");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(DEFAULT_USERS_LIMIT);

  // Debounce search input 350ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(1); // Reset về trang 1 khi search
    }, 350);

    return () => clearTimeout(handler);
  }, [searchInput]);

  const handleRoleChange = (newRole: string) => {
    startTransition(() => {
      setRole(newRole);
      setPage(1);
    });
  };

  const handleStatusChange = (newStatus: string) => {
    startTransition(() => {
      setStatus(newStatus);
      setPage(1);
    });
  };

  const handleResetFilters = () => {
    setSearchInput("");
    setDebouncedSearch("");
    setRole("");
    setStatus("ALL");
    setPage(1);
  };

  const queryParams: UserQueryParams = {
    q: debouncedSearch || undefined,
    role: role || undefined,
    isActive: status === "ALL" ? undefined : status === "true",
    page,
    limit,
  };

  return {
    searchInput,
    setSearchInput,
    role,
    setRole: handleRoleChange,
    status,
    setStatus: handleStatusChange,
    page,
    setPage,
    limit,
    setLimit,
    resetFilters: handleResetFilters,
    queryParams,
  };
}
