"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2, ImageIcon, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { MediaLifecycleController } from "../hooks/useMediaLifecycle";

export interface SingleImageUploadProps {
  value?: string | null;
  controller: MediaLifecycleController;
  label?: string;
  recommendedSize?: string;
  aspectRatio?: "video" | "square" | "portrait" | "wide";
  disabled?: boolean;
  className?: string;
}

const ASPECT_RATIO_CLASSES = {
  video: "aspect-video", // 16:9
  square: "aspect-square", // 1:1
  portrait: "aspect-[3/4]", // 3:4 (Lawyer avatar)
  wide: "aspect-[21/9]", // Banner rộng
};

export function SingleImageUpload({
  value,
  controller,
  label,
  recommendedSize = "PNG, JPG hoặc WebP tối đa 5MB",
  aspectRatio = "video",
  disabled = false,
  className,
}: SingleImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const { upload, remove, isUploading } = controller;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await upload(file);
      // Reset input để có thể chọn lại cùng 1 file nếu cần
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled || isUploading) return;

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      await upload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled && !isUploading) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <label className="text-xs font-semibold text-foreground flex items-center justify-between">
          <span>{label}</span>
          {recommendedSize && (
            <span className="text-[11px] font-normal text-muted-foreground">
              {recommendedSize}
            </span>
          )}
        </label>
      )}

      {/* Input ẩn */}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled || isUploading}
      />

      {/* Khung hiển thị / Upload */}
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-dashed transition-all",
          ASPECT_RATIO_CLASSES[aspectRatio],
          isDragOver
            ? "border-[#C9A24B] bg-[#C9A24B]/10 ring-2 ring-[#C9A24B]/30"
            : "border-muted-foreground/30 bg-muted/30 hover:border-muted-foreground/50 hover:bg-muted/40",
          disabled && "opacity-60 cursor-not-allowed pointer-events-none",
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {value ? (
          // ── Có ảnh: Hiển thị Preview + Nút thao tác ──
          <div className="group relative size-full">
            <Image
              src={value}
              alt={label || "Media preview"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              unoptimized={value.startsWith("http://localhost")}
            />

            {/* Overlay làm tối nhẹ khi hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="h-8 text-xs gap-1.5 bg-white/90 hover:bg-white text-slate-800 shadow"
                onClick={() => setPreviewOpen(true)}
              >
                <Eye className="size-3.5" /> Xem lớn
              </Button>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="h-8 text-xs gap-1.5 bg-white/90 hover:bg-white text-slate-800 shadow"
                onClick={() => inputRef.current?.click()}
                disabled={isUploading}
              >
                <Upload className="size-3.5" /> Thay ảnh
              </Button>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                className="h-8 text-xs gap-1.5 shadow"
                onClick={() => void remove()}
                disabled={isUploading}
              >
                <X className="size-3.5" /> Gỡ
              </Button>
            </div>

            {/* Nút X nhanh ở góc trên phải */}
            <button
              type="button"
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-destructive text-white shadow-md transition-colors"
              onClick={() => void remove()}
              disabled={isUploading}
              title="Xóa ảnh"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ) : (
          // ── Chưa có ảnh: Khung chọn ảnh / Kéo thả ──
          <button
            type="button"
            className="flex flex-col items-center justify-center size-full p-4 text-center cursor-pointer focus:outline-none"
            onClick={() => inputRef.current?.click()}
            disabled={disabled || isUploading}
          >
            <div className="p-3 rounded-full bg-[#1B2A49]/5 text-[#1B2A49] dark:text-[#C9A24B] mb-2 group-hover:scale-105 transition-transform">
              <ImageIcon className="size-6 text-muted-foreground" />
            </div>
            <p className="text-xs font-semibold text-foreground">
              Nhấn để tải ảnh lên hoặc kéo thả vào đây
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              JPG, PNG hoặc WebP
            </p>
          </button>
        )}

        {/* Trạng thái đang tải lên (Loading Overlay) */}
        {isUploading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-10">
            <Loader2 className="size-6 animate-spin text-[#C9A24B]" />
            <span className="text-xs font-medium text-foreground">Đang tải ảnh lên...</span>
          </div>
        )}
      </div>

      {/* Modal xem ảnh lớn (Lightbox) */}
      {value && (
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-3xl p-2 bg-transparent border-none shadow-none">
            <DialogTitle className="sr-only">Xem ảnh xem trước</DialogTitle>
            <div className="relative w-full h-[70vh] rounded-lg overflow-hidden bg-black/80 flex items-center justify-center">
              <Image
                src={value}
                alt="Enlarged preview"
                fill
                className="object-contain"
                sizes="100vw"
                unoptimized={value.startsWith("http://localhost")}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
