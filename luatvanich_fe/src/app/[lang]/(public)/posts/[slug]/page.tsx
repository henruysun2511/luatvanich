import React from "react";
import { PostDetailView } from "@/features/posts/components/public/PostDetailView";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export default async function PostDetailPage({ params }: Props) {
  const { lang, slug } = await params;
  return <PostDetailView lang={lang} slug={slug} />;
}
