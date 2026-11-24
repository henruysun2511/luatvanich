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
          href="https://zalo.me/0900123456"
          target="_blank"
          rel="noopener noreferrer"
          className="size-11 rounded-full bg-[#0068FF] text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          title="Chat qua Zalo"
          aria-label="Chat qua Zalo"
        >
          <MessageCircle className="size-5" />
        </a>

        {/* Nút Hotline Click-to-call Hoàng gia */}
        <a
          href="tel:0900123456"
          className="size-11 rounded-full bg-[#a3171e] text-white border-2 border-[#f0d28a] shadow-[0_6px_20px_rgba(163,23,30,0.45)] flex items-center justify-center hover:scale-110 transition-transform animate-pulse"
          title="Gọi Hotline tư vấn 0900.123.456"
          aria-label="Gọi điện thoại Hotline"
        >
          <Phone className="size-5" />
        </a>

        {/* Nút cuộn trang lên đầu */}
        <button
          onClick={scrollToTop}
          className="size-9 rounded-full bg-white/90 text-[#0b1d3f] border border-[#e7dcc3] shadow hover:bg-[#fbf7ee] transition-colors flex items-center justify-center mt-1"
          title="Cuộn lên đầu trang"
          aria-label="Cuộn lên đầu trang"
        >
          <ArrowUp className="size-4" />
        </button>
      </aside>

      {/* Modal QR Code WeChat */}
      {wechatModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div className="bg-white rounded-lg p-6 max-w-sm w-full space-y-4 border border-[#e7dcc3] shadow-2xl relative text-center">
            <button
              onClick={() => setWechatModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 p-1"
              aria-label="Đóng"
            >
              <X className="size-5" />
            </button>
            <div className="font-serif font-bold text-lg text-[#0b1d3f]">
              Quét mã WeChat (微信咨询)
            </div>
            <p className="text-xs text-[#5b6174]">
              Mở ứng dụng WeChat và quét mã QR dưới đây để kết nối trực tiếp với Luật sư thụ lý hồ sơ.
            </p>
            <div className="border border-[#e7dcc3] rounded-md p-4 bg-[#fbf7ee] inline-block shadow-inner">
              <div className="size-48 bg-white border border-gray-200 flex flex-col items-center justify-center text-xs text-gray-500 gap-2 mx-auto">
                <QrCode className="size-20 text-[#07C160]" />
                <span className="text-[11px] font-mono text-[#0b1d3f]">ID: LuatVanIch_Law</span>
              </div>
            </div>
            <div className="pt-2">
              <Button
                variant="royal"
                size="sm"
                className="w-full"
                onClick={() => setWechatModalOpen(false)}
              >
                Đã hiểu
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
