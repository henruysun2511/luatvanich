import type { PublicOffice } from "../types/offices.types";

// Public contact information from the About page, used only in local development.
const hanoi = {
  id: "hanoi_hq",
  isHeadquarters: true,
  phone: "15277020681",
};

const nanning = {
  id: "nanning_hq",
  isHeadquarters: true,
  email: "lienhe@vanichlaw.vn",
};

export const localOfficePreview: Record<"vi" | "zh-CN", PublicOffice[]> = {
  vi: [
    {
      ...hanoi,
      name: "Văn phòng Vạn Ích (Hà Nội)",
      address: "Số 17, Đường 23, Khu biệt thự liền kề KĐT Thành phố Giao Lưu, Cổ Nhuế 1, Bắc Từ Liêm, Hà Nội.",
    },
    {
      ...nanning,
      name: "Tổng sở Vạn Ích (Nam Ninh)",
      address: "Tầng 27, Tòa nhà Cửu Châu Quốc Tế, TP. Nam Ninh, Quảng Tây, Trung Quốc.",
    },
  ],
  "zh-CN": [
    {
      ...hanoi,
      name: "万益律师事务所（河内办公室）",
      address: "越南河内市北慈廉郡古芮1坊交流城都市区联排别墅区23路17号。",
    },
    {
      ...nanning,
      name: "广西万益律师事务所（南宁总所）",
      address: "中国广西壮族自治区南宁市九洲国际大厦27层。",
    },
  ],
};
