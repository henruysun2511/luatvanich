"use client";

import React, { useRef, useState } from "react";
import type { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { mediaService } from "@/features/media/services/media.service";
import { toast } from "sonner";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading2,
  Heading3,
  Pilcrow,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  Loader2,
  Undo,
  Redo,
} from "lucide-react";

interface EditorToolbarProps {
  editor: Editor | null;
  onImageUploaded?: (key: string, url: string) => void;
  disabled?: boolean;
}

export function EditorToolbar({ editor, onImageUploaded, disabled = false }: EditorToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!editor) {
    return null;
  }

  // Xử lý chèn Link
  const handleSetLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Nhập URL liên kết:", previousUrl || "https://");

    if (url === null) {
      return; // Người dùng ấn Hủy
    }

    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url.trim(), target: "_blank" })
      .run();
  };

  // Xử lý chọn và upload ảnh lên Cloudinary
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input value để có thể chọn lại cùng 1 file nếu muốn
    e.target.value = "";

    // Kiểm tra định dạng & dung lượng (tối đa 5MB)
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chỉ chọn tệp hình ảnh (JPEG, PNG, WebP, GIF)!");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Dung lượng ảnh không được vượt quá 5MB!");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Đang tải ảnh lên Cloudinary...");

    try {
      const result = await mediaService.upload(file, "posts");
      
      // Chèn thẻ img vào đúng vị trí con trỏ của TipTap
      editor
        .chain()
        .focus()
        .setImage({ src: result.url, alt: file.name })
        .run();

      if (onImageUploaded) {
        onImageUploaded(result.key, result.url);
      }

      toast.success("Tải ảnh và chèn vào bài viết thành công!", { id: toastId });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Tải ảnh thất bại";
      toast.error(`Lỗi tải ảnh: ${message}`, { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-1.5 border-b border-border bg-muted/20 rounded-t-lg select-none">
      {/* Ẩn file input để kích hoạt khi click nút Chèn Ảnh */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageFileChange}
      />

      {/* 1. Lịch sử Thao tác (Undo / Redo) */}
      <div className="flex items-center gap-0.5 pr-1 border-r border-border">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={disabled || !editor.can().undo()}
          title="Hoàn tác (Ctrl+Z)"
        >
          <Undo className="size-3.5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={disabled || !editor.can().redo()}
          title="Làm lại (Ctrl+Y)"
        >
          <Redo className="size-3.5" />
        </Button>
      </div>

      {/* 2. Tiêu đề cấu trúc (H2, H3, Paragraph) */}
      <div className="flex items-center gap-0.5 px-1 border-r border-border">
        <Button
          type="button"
          variant={editor.isActive("paragraph") ? "secondary" : "ghost"}
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => editor.chain().focus().setParagraph().run()}
          disabled={disabled}
          title="Văn bản thường"
        >
          <Pilcrow className="size-3.5" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"}
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          disabled={disabled}
          title="Tiêu đề H2 (Chính)"
        >
          <Heading2 className="size-3.5" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive("heading", { level: 3 }) ? "secondary" : "ghost"}
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          disabled={disabled}
          title="Tiêu đề H3 (Phụ)"
        >
          <Heading3 className="size-3.5" />
        </Button>
      </div>

      {/* 3. Định dạng Font chữ (Bold, Italic, Underline, Strike) */}
      <div className="flex items-center gap-0.5 px-1 border-r border-border">
        <Button
          type="button"
          variant={editor.isActive("bold") ? "secondary" : "ghost"}
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={disabled}
          title="In đậm (Ctrl+B)"
        >
          <Bold className="size-3.5" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive("italic") ? "secondary" : "ghost"}
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={disabled}
          title="In nghiêng (Ctrl+I)"
        >
          <Italic className="size-3.5" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive("underline") ? "secondary" : "ghost"}
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={disabled}
          title="Gạch chân (Ctrl+U)"
        >
          <UnderlineIcon className="size-3.5" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive("strike") ? "secondary" : "ghost"}
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={disabled}
          title="Gạch ngang"
        >
          <Strikethrough className="size-3.5" />
        </Button>
      </div>

      {/* 4. Căn lề (Left, Center, Right, Justify) */}
      <div className="flex items-center gap-0.5 px-1 border-r border-border">
        <Button
          type="button"
          variant={editor.isActive({ textAlign: "left" }) ? "secondary" : "ghost"}
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          disabled={disabled}
          title="Căn trái"
        >
          <AlignLeft className="size-3.5" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive({ textAlign: "center" }) ? "secondary" : "ghost"}
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          disabled={disabled}
          title="Căn giữa"
        >
          <AlignCenter className="size-3.5" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive({ textAlign: "right" }) ? "secondary" : "ghost"}
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          disabled={disabled}
          title="Căn phải"
        >
          <AlignRight className="size-3.5" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive({ textAlign: "justify" }) ? "secondary" : "ghost"}
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          disabled={disabled}
          title="Căn đều hai bên"
        >
          <AlignJustify className="size-3.5" />
        </Button>
      </div>

      {/* 5. Danh sách & Trích dẫn */}
      <div className="flex items-center gap-0.5 px-1 border-r border-border">
        <Button
          type="button"
          variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={disabled}
          title="Danh sách gạch đầu dòng"
        >
          <List className="size-3.5" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={disabled}
          title="Danh sách đánh số"
        >
          <ListOrdered className="size-3.5" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive("blockquote") ? "secondary" : "ghost"}
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          disabled={disabled}
          title="Khối trích dẫn (Blockquote)"
        >
          <Quote className="size-3.5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          disabled={disabled}
          title="Đường phân cách ngang"
        >
          <Minus className="size-3.5" />
        </Button>
      </div>

      {/* 6. Liên kết & Hình ảnh Cloudinary */}
      <div className="flex items-center gap-1 pl-1">
        <Button
          type="button"
          variant={editor.isActive("link") ? "secondary" : "ghost"}
          size="sm"
          className="h-7 px-2 text-xs gap-1 font-normal"
          onClick={handleSetLink}
          disabled={disabled}
          title="Chèn hoặc sửa liên kết"
        >
          <LinkIcon className="size-3.5" />
          <span className="hidden sm:inline">Link</span>
        </Button>
        {editor.isActive("link") && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={disabled}
            title="Gỡ bỏ liên kết"
          >
            <Unlink className="size-3.5" />
          </Button>
        )}

        {/* NÚT CHÈN ẢNH VÀO NỘI DUNG */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-7 px-2.5 text-xs gap-1.5 font-medium border-primary/30 text-primary hover:bg-primary/10"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || isUploading}
          title="Tải ảnh lên Cloudinary và chèn vào vị trí con trỏ"
        >
          {isUploading ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <ImageIcon className="size-3.5" />
          )}
          <span>{isUploading ? "Đang tải ảnh..." : "Chèn ảnh"}</span>
        </Button>
      </div>
    </div>
  );
}
