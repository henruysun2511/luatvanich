"use client";

import React, { useRef, useState } from "react";
import type { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mediaService } from "@/features/media/services/media.service";
import { ColorPickerMenu } from "./ColorPickerMenu";
import { TableControls } from "./TableControls";
import { SourceCodeDialog } from "./SourceCodeDialog";
import { YouTubeEmbedDialog } from "./YouTubeEmbedDialog";
import { toast } from "sonner";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code as CodeIcon,
  Superscript as SuperscriptIcon,
  Subscript as SubscriptIcon,
  RemoveFormatting,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  ListTodo,
  Quote,
  Minus,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  Video as VideoIcon,
  FileCode,
  Maximize2,
  Minimize2,
  Loader2,
  Undo,
  Redo,
} from "lucide-react";

interface EditorToolbarProps {
  editor: Editor | null;
  onImageUploaded?: (key: string, url: string) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  disabled?: boolean;
}

export function EditorToolbar({
  editor,
  onImageUploaded,
  isFullscreen,
  onToggleFullscreen,
  disabled = false,
}: EditorToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSourceCodeOpen, setIsSourceCodeOpen] = useState(false);
  const [isYouTubeOpen, setIsYouTubeOpen] = useState(false);

  if (!editor) {
    return null;
  }

  // Lấy định dạng heading / paragraph hiện tại để hiển thị trên Select
  const getCurrentHeading = () => {
    if (editor.isActive("heading", { level: 1 })) return "h1";
    if (editor.isActive("heading", { level: 2 })) return "h2";
    if (editor.isActive("heading", { level: 3 })) return "h3";
    if (editor.isActive("heading", { level: 4 })) return "h4";
    return "p";
  };

  const handleHeadingChange = (value: string) => {
    if (value === "p") {
      editor.chain().focus().setParagraph().run();
    } else if (value === "h1") {
      editor.chain().focus().toggleHeading({ level: 1 }).run();
    } else if (value === "h2") {
      editor.chain().focus().toggleHeading({ level: 2 }).run();
    } else if (value === "h3") {
      editor.chain().focus().toggleHeading({ level: 3 }).run();
    } else if (value === "h4") {
      editor.chain().focus().toggleHeading({ level: 4 }).run();
    }
  };

  // Xử lý chèn Link
  const handleSetLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Nhập URL liên kết:", previousUrl || "https://");

    if (url === null) return;

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

    e.target.value = "";

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
      
      editor
        .chain()
        .focus()
        .setImage({ src: result.url, alt: file.name })
        .run();

      if (onImageUploaded) {
        onImageUploaded(result.key, result.url);
      }

      toast.success("Tải ảnh và chèn thành công!", { id: toastId });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Tải ảnh thất bại";
      toast.error(`Lỗi tải ảnh: ${message}`, { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="border-b border-border bg-muted/20 select-none divide-y divide-border/60">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageFileChange}
      />

      {/* ======================= TẦNG 1: ĐỊNH DẠNG VĂN BẢN & MÀU SẮC ======================= */}
      <div className="flex flex-wrap items-center justify-between gap-1 p-1.5">
        <div className="flex flex-wrap items-center gap-1">
          {/* Lịch sử: Undo / Redo */}
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

          {/* Chọn Tiêu đề / Đoạn văn (Dropdown) */}
          <div className="px-1 border-r border-border">
            <Select value={getCurrentHeading()} onValueChange={handleHeadingChange} disabled={disabled}>
              <SelectTrigger className="h-7 w-28 text-xs font-medium">
                <SelectValue placeholder="Đoạn văn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="p" className="text-xs">Đoạn văn</SelectItem>
                <SelectItem value="h1" className="text-xs font-bold text-base">Tiêu đề 1 (H1)</SelectItem>
                <SelectItem value="h2" className="text-xs font-bold text-sm">Tiêu đề 2 (H2)</SelectItem>
                <SelectItem value="h3" className="text-xs font-semibold text-xs">Tiêu đề 3 (H3)</SelectItem>
                <SelectItem value="h4" className="text-xs font-medium text-xs">Tiêu đề 4 (H4)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Phong cách chữ: Bold, Italic, Underline, Strike, Code, Super, Sub */}
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
            <Button
              type="button"
              variant={editor.isActive("code") ? "secondary" : "ghost"}
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={disabled}
              title="Mã nội dòng (Inline Code)"
            >
              <CodeIcon className="size-3.5" />
            </Button>
            <Button
              type="button"
              variant={editor.isActive("superscript") ? "secondary" : "ghost"}
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
              disabled={disabled}
              title="Chỉ số trên (x²)"
            >
              <SuperscriptIcon className="size-3.5" />
            </Button>
            <Button
              type="button"
              variant={editor.isActive("subscript") ? "secondary" : "ghost"}
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => editor.chain().focus().toggleSubscript().run()}
              disabled={disabled}
              title="Chỉ số dưới (H₂O)"
            >
              <SubscriptIcon className="size-3.5" />
            </Button>
          </div>

          {/* Bảng màu chữ & Màu highlight nền */}
          <div className="flex items-center gap-0.5 px-1 border-r border-border">
            <ColorPickerMenu editor={editor} disabled={disabled} />
          </div>

          {/* Xóa tất cả định dạng (Clear formatting) */}
          <div className="pl-0.5">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
              onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
              disabled={disabled}
              title="Xóa tất cả định dạng (Clear Formatting)"
            >
              <RemoveFormatting className="size-3.5" />
            </Button>
          </div>
        </div>

        {/* Nút Phóng to Toàn màn hình & Xem mã nguồn HTML */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs gap-1 text-muted-foreground hover:text-foreground font-mono"
            onClick={() => setIsSourceCodeOpen(true)}
            disabled={disabled}
            title="Xem và sửa mã nguồn HTML"
          >
            <FileCode className="size-3.5 text-primary" />
            <span className="hidden sm:inline">&lt;Mã HTML&gt;</span>
          </Button>

          <Button
            type="button"
            variant={isFullscreen ? "secondary" : "ghost"}
            size="sm"
            className="h-7 w-7 p-0"
            onClick={onToggleFullscreen}
            title={isFullscreen ? "Thu nhỏ cửa sổ" : "Phóng to toàn màn hình"}
          >
            {isFullscreen ? (
              <Minimize2 className="size-3.5 text-primary" />
            ) : (
              <Maximize2 className="size-3.5" />
            )}
          </Button>
        </div>
      </div>

      {/* ======================= TẦNG 2: CĂN LỀ, DANH SÁCH, ĐA PHƯƠNG TIỆN, BẢNG BIỂU ======================= */}
      <div className="flex flex-wrap items-center gap-1 p-1.5 bg-muted/10">
        {/* Căn lề */}
        <div className="flex items-center gap-0.5 pr-1 border-r border-border">
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

        {/* Danh sách & Trích dẫn */}
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
            variant={editor.isActive("taskList") ? "secondary" : "ghost"}
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            disabled={disabled}
            title="Danh sách việc cần làm (Checkbox)"
          >
            <ListTodo className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive("blockquote") ? "secondary" : "ghost"}
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            disabled={disabled}
            title="Trích dẫn khối (Blockquote)"
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

        {/* BẢNG BIỂU (Table Controls TinyMCE-style) */}
        <div className="px-1 border-r border-border">
          <TableControls editor={editor} disabled={disabled} />
        </div>

        {/* Liên kết */}
        <div className="flex items-center gap-0.5 px-1 border-r border-border">
          <Button
            type="button"
            variant={editor.isActive("link") ? "secondary" : "ghost"}
            size="sm"
            className="h-7 px-2 text-xs gap-1 font-normal"
            onClick={handleSetLink}
            disabled={disabled}
            title="Chèn / Sửa liên kết"
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
        </div>

        {/* ĐA PHƯƠNG TIỆN: Video YouTube & Ảnh Cloudinary */}
        <div className="flex items-center gap-1 pl-1">
          {/* Nhúng Video YouTube */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
            onClick={() => setIsYouTubeOpen(true)}
            disabled={disabled}
            title="Nhúng video YouTube"
          >
            <VideoIcon className="size-3.5" />
            <span className="hidden sm:inline">YouTube</span>
          </Button>

          {/* Chèn Ảnh Cloudinary */}
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

      {/* MODAL MÃ NGUỒN HTML */}
      <SourceCodeDialog
        open={isSourceCodeOpen}
        onOpenChange={setIsSourceCodeOpen}
        initialHtml={editor.getHTML()}
        onApply={(newHtml) => {
          editor.commands.setContent(newHtml);
        }}
      />

      {/* MODAL NHÚNG VIDEO YOUTUBE */}
      <YouTubeEmbedDialog
        open={isYouTubeOpen}
        onOpenChange={setIsYouTubeOpen}
        onInsert={(url) => {
          editor.commands.setYoutubeVideo({
            src: url,
            width: 640,
            height: 360,
          });
        }}
      />
    </div>
  );
}
