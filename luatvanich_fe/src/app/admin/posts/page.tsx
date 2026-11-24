"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination } from "@/components/common";
import {
  PostListTable,
  PostDetailDialog,
  DeletePostDialog,
  PostCategoryListTable,
  PostCategoryFormDialog,
  DeletePostCategoryDialog,
  useAdminPosts,
  useAdminPostCategories,
  type PostItem,
  type PostCategoryItem,
  type PostStatus,
  type PostSection,
} from "@/features/posts";
import { FileText, FolderTree, Plus, Search, RotateCcw } from "lucide-react";

export default function PostsManagementPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"posts" | "categories">("posts");

  // ==========================================
  // STATE TAB 1: BÀI VIẾT (POSTS)
  // ==========================================
  const [postPage, setPostPage] = useState(1);
  const [postLimit, setPostLimit] = useState(15);
  const [postSearch, setPostSearch] = useState("");
  const [postStatus, setPostStatus] = useState<string>("all");
  const [postCategoryId, setPostCategoryId] = useState<string>("all");
  const [postSection, setPostSection] = useState<string>("all");

  const [postToDelete, setPostToDelete] = useState<PostItem | null>(null);
  const [postToView, setPostToView] = useState<PostItem | null>(null);

  // ==========================================
  // STATE TAB 2: CHUYÊN MỤC (CATEGORIES)
  // ==========================================
  const [categoryPage, setCategoryPage] = useState(1);
  const [categoryLimit, setCategoryLimit] = useState(50);
  const [categorySearch, setCategorySearch] = useState("");
  const [categorySection, setCategorySection] = useState<string>("all");

  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<PostCategoryItem | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<PostCategoryItem | null>(null);

  // ==========================================
  // QUERIES
  // ==========================================
  // Fetch danh sách chuyên mục dùng chung
  const { data: categoriesData, isLoading: isLoadingCategories } = useAdminPostCategories({
    page: categoryPage,
    limit: categoryLimit,
    q: categorySearch.trim() || undefined,
    section: categorySection !== "all" ? (categorySection as PostSection) : undefined,
  });
  const categories = categoriesData?.items || [];
  const totalCategories = categoriesData?.total || 0;
  const totalCategoryPages = Math.ceil(totalCategories / categoryLimit) || 1;

  // Fetch danh sách bài viết
  const postQueryParams = {
    page: postPage,
    limit: postLimit,
    q: postSearch.trim() || undefined,
    status: postStatus !== "all" ? (postStatus as PostStatus) : undefined,
    categoryId: postCategoryId !== "all" ? postCategoryId : undefined,
    section: postSection !== "all" ? (postSection as PostSection) : undefined,
  };
  const { data: postsData, isLoading: isLoadingPosts } = useAdminPosts(postQueryParams);
  const posts = postsData?.items || [];
  const totalPosts = postsData?.total || 0;
  const totalPostPages = Math.ceil(totalPosts / postLimit) || 1;

  // ==========================================
  // HANDLERS TAB POSTS
  // ==========================================
  const handleOpenEditPost = (post: PostItem) => {
    router.push(`/admin/posts/${post.id}/edit`);
  };

  const handleResetPostFilters = () => {
    setPostSearch("");
    setPostStatus("all");
    setPostCategoryId("all");
    setPostSection("all");
    setPostPage(1);
  };

  // ==========================================
  // HANDLERS TAB CATEGORIES
  // ==========================================
  const handleOpenCreateCategory = () => {
    setCategoryToEdit(null);
    setIsCategoryFormOpen(true);
  };

  const handleOpenEditCategory = (category: PostCategoryItem) => {
    setCategoryToEdit(category);
    setIsCategoryFormOpen(true);
  };

  const handleResetCategoryFilters = () => {
    setCategorySearch("");
    setCategorySection("all");
    setCategoryPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header trang & Nút thêm mới */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#e7dcc3]">
        <div>
          <h1 className="text-2xl font-bold font-royal text-[#06122b] tracking-tight flex items-center gap-2.5">
            <div className="size-9 rounded-none bg-[#06122b]/10 text-[#06122b] flex items-center justify-center shrink-0">
              <FileText className="size-5" />
            </div>
            Cẩm nang & Bài viết
          </h1>
          <p className="text-xs text-muted-foreground mt-1 font-sans">
            Quản lý kho bài viết kiến thức, cẩm nang pháp lý và danh mục phân loại bài viết{" "}
            <span className="font-hanzi text-[#c29a45] font-semibold hidden md:inline">
              &bull; 文章资讯
            </span>
          </p>
        </div>

        {/* Nút thêm mới động theo tab */}
        <div>
          {activeTab === "posts" ? (
            <Button
              asChild
              variant="royal"
              size="sm"
              className="gap-1.5 text-xs font-semibold h-9 px-4"
            >
              <Link href="/admin/posts/new">
                <Plus className="size-4" />
                Thêm bài viết mới
              </Link>
            </Button>
          ) : (
            <Button
              onClick={handleOpenCreateCategory}
              variant="royal"
              size="sm"
              className="gap-1.5 text-xs font-semibold h-9 px-4"
            >
              <Plus className="size-4" />
              Thêm chuyên mục mới
            </Button>
          )}
        </div>
      </div>

      {/* TAB BAR ĐIỀU HƯỚNG */}
      <div className="flex border-b border-[#e7dcc3]">
        <button
          type="button"
          onClick={() => setActiveTab("posts")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors -mb-px cursor-pointer ${
            activeTab === "posts"
              ? "border-[#c29a45] text-[#06122b] font-bold"
              : "border-transparent text-muted-foreground hover:text-[#06122b]"
          }`}
        >
          <FileText className={`size-4 ${activeTab === "posts" ? "text-[#c29a45]" : ""}`} />
          Bài viết
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("categories")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors -mb-px cursor-pointer ${
            activeTab === "categories"
              ? "border-[#c29a45] text-[#06122b] font-bold"
              : "border-transparent text-muted-foreground hover:text-[#06122b]"
          }`}
        >
          <FolderTree className={`size-4 ${activeTab === "categories" ? "text-[#c29a45]" : ""}`} />
          Cây Chuyên mục
        </button>
      </div>

      {/* ========================================================= */}
      {/* NỘI DUNG TAB 1: BÀI VIẾT (POSTS) */}
      {/* ========================================================= */}
      {activeTab === "posts" && (
        <div className="space-y-4">
          {/* Thanh công cụ tìm kiếm và bộ lọc */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 p-3 rounded-none border border-border bg-card shadow-xs flex-wrap">
            {/* Tìm kiếm */}
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Tìm theo tiêu đề bài viết, slug..."
                value={postSearch}
                onChange={(e) => {
                  setPostSearch(e.target.value);
                  setPostPage(1);
                }}
                className="pl-9 h-9 text-sm"
              />
            </div>

            {/* Lọc Chuyên mục */}
            <div className="w-full sm:w-48">
              <Select
                value={postCategoryId}
                onValueChange={(val) => {
                  setPostCategoryId(val);
                  setPostPage(1);
                }}
              >
                <SelectTrigger className="text-xs h-9">
                  <SelectValue placeholder="Tất cả chuyên mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả chuyên mục</SelectItem>
                  {categories.map((c) => {
                    const name =
                      c.translations.find((t) => t.languageCode === "vi")?.name ||
                      c.translations[0]?.name ||
                      "Chuyên mục";
                    return (
                      <SelectItem key={c.id} value={c.id}>
                        {c.parentId ? `— ${name}` : name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Lọc Trạng thái */}
            <div className="w-full sm:w-40">
              <Select
                value={postStatus}
                onValueChange={(val) => {
                  setPostStatus(val);
                  setPostPage(1);
                }}
              >
                <SelectTrigger className="text-xs h-9">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="draft">Bản nháp</SelectItem>
                  <SelectItem value="scheduled">Đã lên lịch</SelectItem>
                  <SelectItem value="published">Đã xuất bản</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Lọc Phân vùng */}
            <div className="w-full sm:w-36">
              <Select
                value={postSection}
                onValueChange={(val) => {
                  setPostSection(val);
                  setPostPage(1);
                }}
              >
                <SelectTrigger className="text-xs h-9">
                  <SelectValue placeholder="Phân vùng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả phân vùng</SelectItem>
                  <SelectItem value="news">Tin tức</SelectItem>
                  <SelectItem value="handbook">Cẩm nang</SelectItem>
                  <SelectItem value="knowledge_base">Kiến thức</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Nút đặt lại bộ lọc */}
            {(postSearch || postStatus !== "all" || postCategoryId !== "all" || postSection !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetPostFilters}
                className="gap-1.5 text-xs text-muted-foreground hover:text-foreground h-9"
              >
                <RotateCcw className="size-3.5" />
                Đặt lại
              </Button>
            )}
          </div>

          {/* Bảng danh sách bài viết */}
          <PostListTable
            posts={posts}
            categories={categories}
            isLoading={isLoadingPosts}
            onViewDetail={setPostToView}
            onEdit={handleOpenEditPost}
            onDelete={setPostToDelete}
          />

          {/* Phân trang bài viết */}
          {totalPosts > 0 && (
            <div className="pt-1">
              <Pagination
                pagination={{
                  page: postPage,
                  limit: postLimit,
                  total: totalPosts,
                  totalPages: totalPostPages,
                }}
                onPageChange={setPostPage}
                onLimitChange={(lim) => {
                  setPostLimit(lim);
                  setPostPage(1);
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* NỘI DUNG TAB 2: CHUYÊN MỤC (CATEGORIES) */}
      {/* ========================================================= */}
      {activeTab === "categories" && (
        <div className="space-y-4">
          {/* Bộ lọc chuyên mục */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 p-3 rounded-none border border-border bg-card shadow-xs flex-wrap">
            {/* Tìm kiếm */}
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Tìm tên chuyên mục, slug..."
                value={categorySearch}
                onChange={(e) => {
                  setCategorySearch(e.target.value);
                  setCategoryPage(1);
                }}
                className="pl-9 h-9 text-sm"
              />
            </div>

            {/* Lọc Phân vùng */}
            <div className="w-full sm:w-48">
              <Select
                value={categorySection}
                onValueChange={(val) => {
                  setCategorySection(val);
                  setCategoryPage(1);
                }}
              >
                <SelectTrigger className="text-xs h-9">
                  <SelectValue placeholder="Phân vùng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả phân vùng</SelectItem>
                  <SelectItem value="news">Tin tức (News)</SelectItem>
                  <SelectItem value="handbook">Cẩm nang (Handbook)</SelectItem>
                  <SelectItem value="knowledge_base">Kiến thức (Knowledge Base)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Nút đặt lại */}
            {(categorySearch || categorySection !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetCategoryFilters}
                className="gap-1.5 text-xs text-muted-foreground hover:text-foreground h-9"
              >
                <RotateCcw className="size-3.5" />
                Đặt lại
              </Button>
            )}
          </div>

          {/* Bảng cây chuyên mục */}
          <PostCategoryListTable
            categories={categories}
            isLoading={isLoadingCategories}
            onEdit={handleOpenEditCategory}
            onDelete={setCategoryToDelete}
          />

          {/* Phân trang chuyên mục */}
          {totalCategories > 0 && (
            <div className="pt-1">
              <Pagination
                pagination={{
                  page: categoryPage,
                  limit: categoryLimit,
                  total: totalCategories,
                  totalPages: totalCategoryPages,
                }}
                onPageChange={setCategoryPage}
                onLimitChange={(lim) => {
                  setCategoryLimit(lim);
                  setCategoryPage(1);
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* MODALS VÀ DIALOGS */}
      {/* ========================================================= */}

      {/* Dialog Xem chi tiết Bài viết */}
      <PostDetailDialog
        open={Boolean(postToView)}
        onOpenChange={(open) => !open && setPostToView(null)}
        postId={postToView?.id}
        categoryName={
          postToView
            ? categories.find((c) => c.id === postToView.categoryId)?.translations.find((t) => t.languageCode === "vi")?.name || ""
            : ""
        }
        onEdit={() => {
          if (postToView) {
            handleOpenEditPost(postToView);
          }
        }}
      />

      {/* Dialog Xác nhận Xóa Bài viết */}
      <DeletePostDialog
        open={Boolean(postToDelete)}
        onOpenChange={(open) => !open && setPostToDelete(null)}
        post={postToDelete}
      />

      {/* Modal Thêm/Sửa Chuyên mục */}
      <PostCategoryFormDialog
        open={isCategoryFormOpen}
        onOpenChange={setIsCategoryFormOpen}
        categoryToEdit={categoryToEdit}
        categories={categories}
      />

      {/* Dialog Xác nhận Xóa Chuyên mục */}
      <DeletePostCategoryDialog
        open={Boolean(categoryToDelete)}
        onOpenChange={(open) => !open && setCategoryToDelete(null)}
        category={categoryToDelete}
      />
    </div>
  );
}
