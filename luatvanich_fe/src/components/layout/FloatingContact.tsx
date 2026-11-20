"use client";

import React, { useState } from "react";
import { Phone, MessageCircle, ArrowUp, X, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingContact() {
  const [wechatModalOpen, setWechatModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Cụm nút nổi góc dưới bên phải */}
      <aside
        aria-label="Kênh liên hệ nhanh"
        className="fixed bottom-6 right-5 z-40 flex flex-col items-center gap-2.5"
      >
        {/* Nút WeChat (hiện mã QR cho khách Trung Quốc) */}
        <button
          onClick={() => setWechatModalOpen(true)}
          className="size-11 rounded-full bg-[#07C160] text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          title="Liên hệ WeChat (微信)"
          aria-label="Liên hệ qua WeChat"
        >
          <QrCode className="size-5" />
        </button>

        {/* Nút Zalo */}
        <a
          href="https://zalo.me/0988xxxxxx"
          target="_blank"
          rel="noopener noreferrer"
          className="size-11 rounded-full bg-[#0068FF] text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          title="Chat qua Zalo"
          aria-label="Chat qua Zalo"
        >
          <MessageCircle className="size-5" />
        </a>

        {/* Nút Hotline Click-to-call */}
        <a
          href="tel:0988xxxxxx"
          className="size-11 rounded-full bg-accent text-accent-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform animate-bounce"
          title="Gọi Hotline tư vấn"
          aria-label="Gọi điện thoại Hotline"
        >
          <Phone className="size-5" />
        </a>

        {/* Nút cuộn trang lên đầu */}
        <button
          onClick={scrollToTop}
          className="size-9 rounded-full bg-muted/80 text-foreground border shadow hover:bg-muted transition-colors flex items-center justify-center mt-1"
          title="Cuộn lên đầu trang"
          aria-label="Cuộn lên đầu trang"
        >
          <ArrowUp className="size-4" />
        </button>
      </aside>

      {/* Modal hiển thị mã QR WeChat */}
      {wechatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-lg max-w-sm w-full p-6 text-center space-y-4 shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => setWechatModalOpen(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            >
              <X className="size-5" />
            </button>
            <h3 className="font-bold text-base text-foreground">
              Quét mã WeChat (微信二维码)
            </h3>
            <p className="text-xs text-muted-foreground">
              Mở WeChat quét mã QR hoặc tìm ID: <strong>luatvanich_law</strong> để được luật sư chuyên trách hỗ trợ trực tiếp.
            </p>
            <div className="size-48 mx-auto bg-muted border-2 border-dashed border-accent/60 rounded flex items-center justify-center text-xs text-muted-foreground">
              [ Ảnh QR Code WeChat ]
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setWechatModalOpen(false)}
            >
              Đóng
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
