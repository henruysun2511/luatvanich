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
import {
  Table as TableIcon,
  Plus,
  Trash2,
  Columns,
  Rows,
  Split,
  Combine,
  Grid,
} from "lucide-react";

interface TableControlsProps {
  editor: Editor | null;
  disabled?: boolean;
}

export function TableControls({ editor, disabled = false }: TableControlsProps) {
  if (!editor) return null;

  const isTableActive = editor.isActive("table");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant={isTableActive ? "secondary" : "ghost"}
          size="sm"
          className="h-7 px-2 text-xs gap-1 font-normal"
          disabled={disabled}
          title="Bảng biểu (Table)"
        >
          <TableIcon className="size-3.5" />
          <span className="hidden xl:inline">Bảng</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-52">
        <DropdownMenuLabel className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          Thao tác Bảng biểu
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* 1. Chèn bảng mới */}
        <DropdownMenuItem
          className="text-xs gap-2"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          <Grid className="size-3.5 text-primary" />
          Chèn bảng mới (3x3)
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* 2. Cột */}
        <DropdownMenuItem
          className="text-xs gap-2"
          disabled={!isTableActive}
          onClick={() => editor.chain().focus().addColumnBefore().run()}
        >
          <Plus className="size-3.5 text-emerald-600" />
          Thêm cột phía trước
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-xs gap-2"
          disabled={!isTableActive}
          onClick={() => editor.chain().focus().addColumnAfter().run()}
        >
          <Plus className="size-3.5 text-emerald-600" />
          Thêm cột phía sau
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-xs gap-2 text-destructive focus:text-destructive"
          disabled={!isTableActive}
          onClick={() => editor.chain().focus().deleteColumn().run()}
        >
          <Trash2 className="size-3.5" />
          Xóa cột hiện tại
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* 3. Dòng */}
        <DropdownMenuItem
          className="text-xs gap-2"
          disabled={!isTableActive}
          onClick={() => editor.chain().focus().addRowBefore().run()}
        >
          <Rows className="size-3.5 text-emerald-600" />
          Thêm dòng phía trên
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-xs gap-2"
          disabled={!isTableActive}
          onClick={() => editor.chain().focus().addRowAfter().run()}
        >
          <Rows className="size-3.5 text-emerald-600" />
          Thêm dòng phía dưới
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-xs gap-2 text-destructive focus:text-destructive"
          disabled={!isTableActive}
          onClick={() => editor.chain().focus().deleteRow().run()}
        >
          <Trash2 className="size-3.5" />
          Xóa dòng hiện tại
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* 4. Gộp / Chia ô */}
        <DropdownMenuItem
          className="text-xs gap-2"
          disabled={!isTableActive}
          onClick={() => editor.chain().focus().mergeCells().run()}
        >
          <Combine className="size-3.5 text-blue-600" />
          Hợp nhất các ô (Merge)
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-xs gap-2"
          disabled={!isTableActive}
          onClick={() => editor.chain().focus().splitCell().run()}
        >
          <Split className="size-3.5 text-blue-600" />
          Chia tách ô (Split)
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* 5. Xóa toàn bộ bảng */}
        <DropdownMenuItem
          className="text-xs gap-2 text-destructive focus:text-destructive font-medium"
          disabled={!isTableActive}
          onClick={() => editor.chain().focus().deleteTable().run()}
        >
          <Trash2 className="size-3.5" />
          Xóa toàn bộ bảng
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
