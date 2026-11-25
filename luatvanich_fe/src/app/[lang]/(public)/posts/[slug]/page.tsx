import React from "react";
import { PostDetailView } from "@/features/posts";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export default async function PostDetailPage({ params }: Props) {
  const { lang, slug } = await params;
  return <PostDetailView lang={lang} slug={slug} />;
}
