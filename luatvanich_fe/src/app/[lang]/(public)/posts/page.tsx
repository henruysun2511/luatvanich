import React from "react";
import { PostsHeroSection } from "@/features/posts";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function PostsPage({ params }: Props) {
  const { lang } = await params;
  return <PostsHeroSection lang={lang} />;
}
