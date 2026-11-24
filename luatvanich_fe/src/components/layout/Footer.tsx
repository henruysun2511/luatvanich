import React from "react";

export function Footer() {
  return (
    <footer
      className="bg-[#06122b] text-[#8d98b2] text-[13px] py-6.5 font-sans"
      style={{
        borderTop: "3px solid",
        borderImage: "linear-gradient(90deg, #a3171e, #c29a45, #a3171e) 1",
      }}
    >
      <div className="max-w-[1120px] mx-auto px-6 sm:px-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <span className="font-medium text-[#c9d3e8]">
          &copy; 2026 Luật Vạn Ích &bull; 万益律师
        </span>
        <span className="text-[#5a6479] text-xs">
          Thông tin trên trang là dữ liệu phục vụ tư vấn pháp lý song ngữ Việt – Trung.
        </span>
      </div>
    </footer>
  );
}
