"use client";

import React from "react";
import { PostEditorForm, useAdminPostCategories } from "@/features/posts";

export default function CreatePostPage() {
  const { data: categoriesData } = useAdminPostCategories({
    page: 1,
    limit: 100,
  });
  const categories = categoriesData?.items || [];

  return (
    <div className="space-y-6">
      <PostEditorForm categories={categories} />
    </div>
  );
}
