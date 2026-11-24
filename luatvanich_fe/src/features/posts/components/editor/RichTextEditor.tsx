"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
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
  minHeight = "360px",
  disabled = false,
}: RichTextEditorProps) {
  // Lưu trữ danh sách keys ảnh Cloudinary hiện có trong editor để phát hiện khi người dùng xóa ảnh
  const trackedKeysRef = useRef<string[]>(extractCloudinaryKeysFromHtml(content));
  const isUpdatingFromPropsRef = useRef(false);

  // Hàm tải và chèn ảnh dùng cho Drag & Drop hoặc Ctrl+V Paste
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
          levels: [2, 3],
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
          class: "rounded-lg max-w-full h-auto my-3 border border-border shadow-xs object-cover",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm max-w-none focus:outline-none p-4 text-foreground text-sm leading-relaxed",
          "[&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-6 [&_h2]:mb-2.5",
          "[&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-4 [&_h3]:mb-2",
          "[&_p]:my-2.5 [&_p]:leading-relaxed",
          "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2.5 [&_ul_li]:my-1",
          "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2.5 [&_ol_li]:my-1",
          "[&_blockquote]:border-l-4 [&_blockquote]:border-primary/60 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-3.5 [&_blockquote]:text-muted-foreground",
          "[&_hr]:my-4 [&_hr]:border-border",
        ),
        style: `min-height: ${minHeight};`,
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

  // Đồng bộ nội dung khi content từ props thay đổi (ví dụ: chuyển tab, dữ liệu async từ server)
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

  return (
    <div
      className={cn(
        "flex flex-col border border-border rounded-lg bg-card overflow-hidden shadow-2xs transition-colors focus-within:ring-1 focus-within:ring-primary/40 focus-within:border-primary/50",
        className,
      )}
    >
      <EditorToolbar
        editor={editor}
        onImageUploaded={(key, url) => {
          // Thêm key vừa upload vào danh sách tracking
          if (!trackedKeysRef.current.includes(key)) {
            trackedKeysRef.current.push(key);
          }
          if (onImageUploaded) {
            onImageUploaded(key, url);
          }
        }}
        disabled={disabled}
      />
      <div className="relative cursor-text flex-1">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
