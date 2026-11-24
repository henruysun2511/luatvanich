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
    <div className="max-w-6xl mx-auto py-2">
      <PostEditorForm categories={categories} />
    </div>
  );
}
