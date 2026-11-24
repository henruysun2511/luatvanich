"use client";

import React, { use } from "react";
import { PostEditorForm, useAdminPostCategories } from "@/features/posts";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const resolvedParams = use(params);
  const postId = resolvedParams.id;

  const { data: categoriesData } = useAdminPostCategories({
    page: 1,
    limit: 100,
  });
  const categories = categoriesData?.items || [];

  return (
    <div className="max-w-6xl mx-auto py-2">
      <PostEditorForm postIdToEdit={postId} categories={categories} />
    </div>
  );
}
