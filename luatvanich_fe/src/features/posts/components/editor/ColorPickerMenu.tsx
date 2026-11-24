"use client";

import React from "react";
import type { Editor } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Baseline, Highlighter, Check, RotateCcw } from "lucide-react";

interface ColorPickerMenuProps {
  editor: Editor | null;
  disabled?: boolean;
}

const TEXT_COLORS = [
  { label: "Mặc định", value: "inherit" },
  { label: "Đen tuyền", value: "#000000" },
  { label: "Xám than", value: "#4b5563" },
  { label: "Xanh dương (Vạn Ích)", value: "#1e3a8a" },
  { label: "Xanh nước biển", value: "#0284c7" },
  { label: "Đỏ sẫm", value: "#b91c1c" },
  { label: "Đỏ tươi", value: "#dc2626" },
  { label: "Vàng kim", value: "#b45309" },
  { label: "Xanh lá cây", value: "#15803d" },
  { label: "Tím hoa cà", value: "#6d28d9" },
];

const HIGHLIGHT_COLORS = [
  { label: "Không tô màu", value: "none" },
  { label: "Vàng chanh", value: "#fef08a" },
  { label: "Xanh lá nhạt", value: "#bbf7d0" },
  { label: "Xanh da trời", value: "#bae6fd" },
  { label: "Cam đào", value: "#fed7aa" },
  { label: "Hồng phấn", value: "#fbcfe8" },
  { label: "Tím nhạt", value: "#e9d5ff" },
];

export function ColorPickerMenu({ editor, disabled = false }: ColorPickerMenuProps) {
  if (!editor) return null;

  return (
    <div className="flex items-center gap-0.5">
      {/* 1. MÀU CHỮ (Text Color) */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 relative"
            disabled={disabled}
            title="Màu chữ văn bản"
          >
            <Baseline className="size-3.5" />
            <span
              className="absolute bottom-1 left-1.5 right-1.5 h-0.5 rounded-full"
              style={{
                backgroundColor: editor.getAttributes("textStyle").color || "currentColor",
              }}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-44 p-1.5">
          <DropdownMenuLabel className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Màu chữ
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="grid grid-cols-5 gap-1.5 p-1">
            {TEXT_COLORS.map((col) => (
              <button
                key={col.value}
                type="button"
                className="size-6 rounded-none border border-border flex items-center justify-center transition-transform hover:scale-110 focus:outline-none"
                style={{ backgroundColor: col.value === "inherit" ? "#ffffff" : col.value }}
                title={col.label}
                onClick={() => {
                  if (col.value === "inherit") {
                    editor.chain().focus().unsetColor().run();
                  } else {
                    editor.chain().focus().setColor(col.value).run();
                  }
                }}
              >
                {editor.isActive("textStyle", { color: col.value }) && (
                  <Check
                    className="size-3"
                    style={{
                      color:
                        col.value === "#000000" ||
                        col.value === "#1e3a8a" ||
                        col.value === "#b91c1c"
                          ? "#ffffff"
                          : "#000000",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-xs gap-1.5 text-muted-foreground"
            onClick={() => editor.chain().focus().unsetColor().run()}
          >
            <RotateCcw className="size-3" />
            Khôi phục màu mặc định
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 2. MÀU HIGHLIGHT (Background Highlight Color) */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 relative"
            disabled={disabled}
            title="Tô sáng nền văn bản (Highlight)"
          >
            <Highlighter className="size-3.5" />
            <span
              className="absolute bottom-1 left-1.5 right-1.5 h-0.5 rounded-full"
              style={{
                backgroundColor: editor.getAttributes("highlight").color || "transparent",
              }}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-44 p-1.5">
          <DropdownMenuLabel className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Màu tô sáng
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="grid grid-cols-4 gap-1.5 p-1">
            {HIGHLIGHT_COLORS.map((col) => (
              <button
                key={col.value}
                type="button"
                className="size-6 rounded-none border border-border flex items-center justify-center transition-transform hover:scale-110 focus:outline-none"
                style={{ backgroundColor: col.value === "none" ? "#ffffff" : col.value }}
                title={col.label}
                onClick={() => {
                  if (col.value === "none") {
                    editor.chain().focus().unsetHighlight().run();
                  } else {
                    editor.chain().focus().toggleHighlight({ color: col.value }).run();
                  }
                }}
              >
                {editor.isActive("highlight", { color: col.value }) && (
                  <Check className="size-3 text-black" />
                )}
              </button>
            ))}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-xs gap-1.5 text-muted-foreground"
            onClick={() => editor.chain().focus().unsetHighlight().run()}
          >
            <RotateCcw className="size-3" />
            Xóa màu tô sáng
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
