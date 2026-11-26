import React from "react";
import { PostsDirectorySection } from "@/features/posts/components/public/PostsDirectorySection";
import { PostsHeroSection } from "@/features/posts/components/public/PostsHeroSection";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function PostsPage({ params }: Props) {
  const { lang } = await params;
  return (
    <>
      <PostsHeroSection lang={lang} />
      <PostsDirectorySection lang={lang} />
    </>
  );
}
