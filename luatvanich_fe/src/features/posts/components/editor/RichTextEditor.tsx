"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { CharacterCount } from "@tiptap/extension-character-count";
import { Youtube } from "@tiptap/extension-youtube";

import { EditorToolbar } from "./EditorToolbar";
import { extractCloudinaryKeysFromHtml } from "../../utils/html-image-parser.util";
import { mediaService } from "@/features/media/services/media.service";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  content?: string;
  onChange: (html: string) => void;
  placeholder?: string;
  onImageUploaded?: (key: string, url: string) => void;
  onImageRemoved?: (key: string) => void;
  className?: string;
  minHeight?: string;
  disabled?: boolean;
}

export function RichTextEditor({
  content = "",
  onChange,
  onImageUploaded,
  onImageRemoved,
  className,
  minHeight = "420px",
  disabled = false,
}: RichTextEditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const trackedKeysRef = useRef<string[]>(extractCloudinaryKeysFromHtml(content));
  const isUpdatingFromPropsRef = useRef(false);

  // Xử lý kéo thả hoặc dán ảnh (Ctrl+V)
  const handleUploadAndInsertImage = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Vui lòng chỉ tải tệp hình ảnh!");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Dung lượng ảnh không được vượt quá 5MB!");
        return;
      }

      const toastId = toast.loading("Đang tải ảnh dán/kéo thả lên Cloudinary...");
      try {
        const result = await mediaService.upload(file, "posts");
        if (editor) {
          editor.chain().focus().setImage({ src: result.url, alt: file.name }).run();
        }
        if (onImageUploaded) {
          onImageUploaded(result.key, result.url);
        }
        toast.success("Đã tải ảnh lên và chèn thành công!", { id: toastId });
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Tải ảnh thất bại";
        toast.error(`Lỗi tải ảnh: ${msg}`, { id: toastId });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onImageUploaded],
  );

  const editor = useEditor({
    immediatelyRender: false,
    editable: !disabled,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline font-medium hover:text-primary/80 transition-colors",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class: "rounded-none max-w-full h-auto my-3 border border-border shadow-xs object-cover",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "border-collapse table-auto w-full border border-border my-4",
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: "border border-border bg-muted/40 p-2.5 text-left font-semibold text-xs",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-border p-2.5 text-xs align-top",
        },
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Subscript,
      Superscript,
      TaskList,
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "flex items-start gap-2 my-1",
        },
      }),
      CharacterCount,
      Youtube.configure({
        controls: true,
        nocookie: true,
        allowFullscreen: true,
        HTMLAttributes: {
          class: "w-full max-w-2xl aspect-video rounded-none my-4 shadow-sm border border-border",
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm max-w-none focus:outline-none p-5 text-foreground text-sm leading-relaxed",
          "[&_h1]:text-2xl [&_h1]:font-extrabold [&_h1]:text-foreground [&_h1]:mt-8 [&_h1]:mb-3",
          "[&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-6 [&_h2]:mb-2.5",
          "[&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-4 [&_h3]:mb-2",
          "[&_h4]:text-sm [&_h4]:font-semibold [&_h4]:text-foreground [&_h4]:mt-3 [&_h4]:mb-1.5",
          "[&_p]:my-2.5 [&_p]:leading-relaxed",
          "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2.5 [&_ul_li]:my-1",
          "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2.5 [&_ol_li]:my-1",
          "[&_ul[data-type='taskList']]:list-none [&_ul[data-type='taskList']]:pl-0",
          "[&_blockquote]:border-l-4 [&_blockquote]:border-primary/60 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-3.5 [&_blockquote]:text-muted-foreground",
          "[&_hr]:my-4 [&_hr]:border-border",
          "[&_code]:bg-muted/50 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono",
          "[&_pre]:bg-muted/80 [&_pre]:p-3 [&_pre]:rounded-none [&_pre]:my-3 [&_pre]:overflow-x-auto",
        ),
        style: isFullscreen ? "min-height: calc(100vh - 120px);" : `min-height: ${minHeight};`,
      },
      handlePaste: (_view, event) => {
        const items = event.clipboardData?.items;
        if (!items) return false;
        for (const item of Array.from(items)) {
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (file) {
              void handleUploadAndInsertImage(file);
              return true;
            }
          }
        }
        return false;
      },
      handleDrop: (_view, event) => {
        const files = event.dataTransfer?.files;
        if (files && files.length > 0 && files[0].type.startsWith("image/")) {
          void handleUploadAndInsertImage(files[0]);
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor: ed }) => {
      if (isUpdatingFromPropsRef.current) return;

      const html = ed.getHTML();
      const currentKeys = extractCloudinaryKeysFromHtml(html);

      // Phát hiện các ảnh vừa bị xóa khỏi nội dung
      const removedKeys = trackedKeysRef.current.filter((key) => !currentKeys.includes(key));
      for (const removedKey of removedKeys) {
        if (onImageRemoved) {
          onImageRemoved(removedKey);
        }
      }

      trackedKeysRef.current = currentKeys;
      onChange(html);
    },
  });

  // Đồng bộ nội dung khi content từ props thay đổi
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      isUpdatingFromPropsRef.current = true;
      editor.commands.setContent(content || "");
      trackedKeysRef.current = extractCloudinaryKeysFromHtml(content);
      isUpdatingFromPropsRef.current = false;
    }
  }, [content, editor]);

  // Cập nhật trạng thái disabled
  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [disabled, editor]);

  const words = editor?.storage.characterCount?.words?.() ?? 0;
  const characters = editor?.storage.characterCount?.characters?.() ?? 0;

  return (
    <div
      className={cn(
        "flex flex-col border border-border rounded-none bg-card overflow-hidden shadow-2xs transition-all",
        isFullscreen
          ? "fixed inset-0 z-50 rounded-none border-0 h-screen w-screen flex flex-col bg-background"
          : "relative",
        className,
      )}
    >
      {/* THANH CÔNG CỤ ĐA NĂNG TINYMCE-STYLE */}
      <EditorToolbar
        editor={editor}
        onImageUploaded={(key, url) => {
          if (!trackedKeysRef.current.includes(key)) {
            trackedKeysRef.current.push(key);
          }
          if (onImageUploaded) {
            onImageUploaded(key, url);
          }
        }}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        disabled={disabled}
      />

      {/* KHU VỰC SOẠN THẢO VĂN BẢN */}
      <div className={cn("relative cursor-text flex-1 overflow-y-auto", isFullscreen && "p-4 max-w-5xl mx-auto w-full")}>
        <EditorContent editor={editor} />
      </div>

      {/* THANH TRẠNG THÁI CUỐI TRANG (Status Bar TinyMCE) */}
      <div className="flex flex-wrap items-center justify-between px-3 py-1.5 border-t border-border bg-muted/30 text-[11px] text-muted-foreground select-none">
        <div className="flex items-center gap-2">
          <span>
            Hỗ trợ Kéo & Thả / Dán ảnh (Ctrl+V) tải trực tiếp lên Cloudinary
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono">
          <span>
            Từ: <strong className="text-foreground">{words}</strong>
          </span>
          <span>&bull;</span>
          <span>
            Ký tự: <strong className="text-foreground">{characters}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
