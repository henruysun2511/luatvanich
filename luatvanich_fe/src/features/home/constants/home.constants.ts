import type {
  PracticeAreaTabItem,
  FeaturedServiceItem,
  GlossaryTermItem,
  HomeLawyerItem,
  LegalInsightItem,
  PartnerLogoItem,
  StatItem,
  WorkflowStepItem,
} from "../types/home.types";

// 1. Dữ liệu Lĩnh vực & Tabs
export const TABS_DATA: PracticeAreaTabItem[] = [
  {
    hanzi: "外商投资",
    title: "Đầu tư nước ngoài",
    desc: "Đồng hành cùng nhà đầu tư từ khâu xin chủ trương đến khi doanh nghiệp đi vào hoạt động.",
    points: [
      "Giấy chứng nhận đăng ký đầu tư (IRC)",
      "Thành lập và đăng ký doanh nghiệp (ERC)",
      "Cơ cấu vốn, chuyển lợi nhuận về nước hợp pháp",
      "Tuân thủ sau cấp phép & báo cáo định kỳ",
    ],
    time: "30 – 60 ngày",
    fee: "Trọn gói",
  },
  {
    hanzi: "双语合同",
    title: "Hợp đồng song ngữ",
    desc: "Soạn thảo và đối chiếu hợp đồng để hai bản Việt – Trung cùng một nghĩa và chuẩn xác pháp lý.",
    points: [
      "Soạn thảo hợp đồng thương mại & đầu tư",
      "Đối chiếu từng điều khoản hai bản Việt – Trung",
      "Quy định điều khoản ngôn ngữ ưu tiên",
      "Phụ lục sửa đổi, bổ sung & thỏa thuận bảo mật",
    ],
    time: "3 – 7 ngày",
    fee: "Theo hợp đồng",
  },
  {
    hanzi: "诉讼仲裁",
    title: "Tranh tụng & trọng tài",
    desc: "Đại diện tại Tòa án và các trung tâm trọng tài thương mại trong nước (VIAC) và quốc tế.",
    points: [
      "Đánh giá chứng cứ và khả năng thắng kiện",
      "Chuẩn bị đơn khởi kiện, bảo vệ quyền lợi hợp pháp",
      "Áp dụng biện pháp khẩn cấp tạm thời",
      "Thi hành bản án, phán quyết trọng tài có hiệu lực",
    ],
    time: "Theo vụ việc",
    fee: "Theo giờ / trọn gói",
  },
  {
    hanzi: "债务追收",
    title: "Thu hồi nợ",
    desc: "Kết hợp đàm phán, thông báo pháp lý và khởi kiện để thu hồi công nợ thương mại xuyên biên giới.",
    points: [
      "Rà soát chứng từ, đối chiếu công nợ",
      "Thư yêu cầu thanh toán chính thức (Thư luật sư)",
      "Thương lượng phương án trả nợ theo đợt",
      "Khởi kiện và thi hành án kê biên tài sản",
    ],
    time: "2 – 6 tháng",
    fee: "Theo kết quả",
  },
  {
    hanzi: "劳动用工",
    title: "Lao động & nhân sự",
    desc: "Xây dựng quy chế lao động và xử lý vấn đề nhân sự có yếu tố nước ngoài đúng luật Việt Nam.",
    points: [
      "Hợp đồng và nội quy lao động song ngữ",
      "Giấy phép lao động cho chuyên gia nước ngoài",
      "Kỷ luật, chấm dứt hợp đồng lao động",
      "Giải quyết tranh chấp lao động tập thể & cá nhân",
    ],
    time: "1 – 4 tuần",
    fee: "Theo giờ",
  },
  {
    hanzi: "并购重组",
    title: "Mua bán & sáp nhập",
    desc: "Thẩm định pháp lý và đàm phán để giao dịch hoàn tất an toàn, đúng luật và tối ưu thuế.",
    points: [
      "Thẩm định pháp lý doanh nghiệp mục tiêu (Due Diligence)",
      "Soạn thảo và đàm phán hợp đồng M&A",
      "Thủ tục chuyển nhượng vốn, cổ phần & thay đổi ĐKKD",
      "Hỗ trợ tái cấu trúc sau giao dịch",
    ],
    time: "2 – 6 tháng",
    fee: "Trọn gói",
  },
];

// 2. Dữ liệu 6 Dịch vụ tiêu biểu
export const FEATURED_SERVICES: FeaturedServiceItem[] = [
  {
    hz: "投",
    title: "Đầu tư nước ngoài",
    desc: "Đồng hành nhà đầu tư từ xin chủ trương đến khi doanh nghiệp đi vào hoạt động.",
    tabIndex: 0,
  },
  {
    hz: "约",
    title: "Hợp đồng song ngữ",
    desc: "Soạn thảo và đối chiếu hợp đồng để bản Việt và bản Trung cùng một nghĩa.",
    tabIndex: 1,
  },
  {
    hz: "诉",
    title: "Tranh tụng & trọng tài",
    desc: "Đại diện tại Tòa án và trọng tài thương mại, bảo vệ quyền lợi khách hàng.",
    tabIndex: 2,
  },
  {
    hz: "债",
    title: "Thu hồi nợ",
    desc: "Kết hợp đàm phán, thông báo pháp lý và khởi kiện để thu hồi công nợ.",
    tabIndex: 3,
  },
  {
    hz: "劳",
    title: "Lao động & nhân sự",
    desc: "Quy chế lao động, giấy phép cho chuyên gia và xử lý tranh chấp lao động.",
    tabIndex: 4,
  },
  {
    hz: "并",
    title: "Mua bán & sáp nhập",
    desc: "Thẩm định, đàm phán và hoàn tất giao dịch M&A an toàn, đúng luật.",
    tabIndex: 5,
  },
];

// 3. Dữ liệu Từ điển pháp lý Việt – Trung
export const GLOSSARY_TERMS: GlossaryTermItem[] = [
  { vi: "Hợp đồng", zh: "合同", pinyin: "hétong", note: "Ghi rõ tên pháp nhân đầy đủ ở cả hai bản." },
  { vi: "Đầu tư", zh: "投资", pinyin: "tóuzī", note: "Phân biệt đầu tư trực tiếp và gián tiếp." },
  { vi: "Thanh toán", zh: "付款", pinyin: "fùkuǎn", note: "Nêu rõ tiền tệ, thời hạn và phương thức." },
  { vi: "Phạt vi phạm", zh: "违约金", pinyin: "wéiyuējīn", note: "Mức phạt có trần theo luật Việt Nam (tối đa 8%)." },
  { vi: "Bất khả kháng", zh: "不可抗力", pinyin: "bùkě kànglì", note: "Quy định rõ các sự kiện, thời hạn gửi thông báo." },
  { vi: "Trọng tài", zh: "仲裁", pinyin: "zhòngcái", note: "Chọn trung tâm trọng tài và luật áp dụng rõ ràng." },
  { vi: "Chủ sở hữu hưởng lợi", zh: "实益所有人", pinyin: "shíyì suǒyǒurén", note: "Chú ý nghĩa vụ kê khai thông tin theo quy định mới." },
  { vi: "Giấy phép lao động", zh: "工作许可", pinyin: "gōngzuò xǔkě", note: "Kiểm tra điều kiện bằng cấp, kinh nghiệm từng vị trí." },
];

// 4. Dữ liệu Đội ngũ Luật sư
export const LAWYERS_DATA: HomeLawyerItem[] = [
  {
    name: "Nguyễn Minh Hoàng",
    role: "Luật sư điều hành",
    langs: ["VI", "中文", "EN"],
    field: "Đầu tư nước ngoài, M&A",
    hairIndex: 0,
    isMale: 1,
  },
  {
    name: "Trần Thu Hà",
    role: "Luật sư thành viên",
    langs: ["VI", "中文"],
    field: "Hợp đồng song ngữ",
    hairIndex: 1,
    isMale: 0,
  },
  {
    name: "Lê Quốc Bảo",
    role: "Luật sư tranh tụng",
    langs: ["VI", "EN"],
    field: "Tranh tụng, trọng tài",
    hairIndex: 2,
    isMale: 1,
  },
  {
    name: "Phạm Ngọc Lan",
    role: "Chuyên viên pháp lý",
    langs: ["VI", "中文"],
    field: "Thu hồi nợ, lao động",
    hairIndex: 3,
    isMale: 0,
  },
  {
    name: "Đỗ Hồng Ngọc",
    role: "Luật sư",
    langs: ["VI", "中文"],
    field: "Doanh nghiệp, sở hữu trí tuệ",
    hairIndex: 0,
    isMale: 0,
  },
  {
    name: "Vũ Đức Anh",
    role: "Luật sư",
    langs: ["VI", "中文", "EN"],
    field: "M&A, thuế doanh nghiệp",
    hairIndex: 1,
    isMale: 1,
  },
];

export const HAIR_COLORS = ["#1b1718", "#2a1c16", "#3a2a22", "#161214"];

// 5. Dữ liệu Góc nhìn / Bài viết
export const INSIGHTS_DATA: LegalInsightItem[] = [
  {
    hz: "债",
    tag: "Thu hồi nợ",
    title: "Mất tiền đặt cọc thuê nhà xưởng: sai lầm khi đặt cọc",
    desc: "Rủi ro lớn khi hợp đồng đặt cọc không rõ điều khoản hoàn trả tiền cọc nếu bên cho thuê không hoàn thiện pháp lý PCCC…",
    bg1: "#0a1a3a",
    bg2: "#25408a",
  },
  {
    hz: "投",
    tag: "Đầu tư",
    title: "Luật Đầu tư 2025: những thay đổi lớn với nhà đầu tư nước ngoài",
    desc: "Nhiều thay đổi đáng chú ý về điều kiện tiếp cận thị trường và đơn giản hóa thủ tục cấp IRC cho dự án công nghệ cao…",
    bg1: "#2a1a3a",
    bg2: "#7a2418",
  },
  {
    hz: "权",
    tag: "Doanh nghiệp",
    title: "Chủ sở hữu hưởng lợi: nghĩa vụ kê khai cần biết",
    desc: "Khái niệm chủ sở hữu hưởng lợi ngày càng được siết chặt trong các quy định phòng chống rửa tiền và cấp giấy phép kinh doanh…",
    bg1: "#16203a",
    bg2: "#3a2a22",
  },
  {
    hz: "封",
    tag: "Tố tụng",
    title: "Phong tỏa tài sản “con nợ”: khi nào được yêu cầu",
    desc: "Khi nào chủ nợ được yêu cầu Tòa án áp dụng biện pháp khẩn cấp tạm thời phong tỏa tài khoản ngân hàng và bất động sản…",
    bg1: "#06122b",
    bg2: "#122650",
  },
  {
    hz: "约",
    tag: "Hợp đồng",
    title: "Hợp đồng song ngữ Việt – Trung: điểm cần lưu ý",
    desc: "Xử lý khác biệt ngữ nghĩa và điều khoản ngôn ngữ áp dụng để tránh trường hợp tranh chấp phát sinh do bản dịch sai lệch…",
    bg1: "#2a1210",
    bg2: "#0a1a3a",
  },
];

// 6. Dữ liệu Đối tác mặc định
export const PARTNERS_DATA: PartnerLogoItem[] = [
  { hz: "华", name: "Hoa Long" },
  { hz: "盛", name: "Thanh Sơn" },
  { hz: "东", name: "Đông Á Corp" },
  { hz: "瑞", name: "Rui Feng" },
  { hz: "联", name: "Liên Việt" },
  { hz: "通", name: "Tongda" },
  { hz: "港", name: "Hải Cảng" },
  { hz: "鑫", name: "Xin Tai" },
];

// 7. Thống kê Hoàng gia mặc định
export const HOME_STATS: StatItem[] = [
  { num: "30", hz: "年", label: "năm hành nghề (1996 - 2026)" },
  { num: "4.000", hz: "案", label: "hồ sơ & trợ giúp pháp lý" },
  { num: "300", hz: "团", label: "luật sư và chuyên viên" },
  { num: "12", hz: "城", label: "văn phòng trong mạng lưới" },
];

// 8. Quy trình 4 bước
export const WORKFLOW_STEPS: WorkflowStepItem[] = [
  {
    time: "Ngày 1",
    tag: "Tiếp nhận",
    title: "Nghe trình bày vụ việc",
    desc: "Luật sư chuyên trách xác định mục tiêu cốt lõi, đánh giá rủi ro sơ bộ và lập danh mục tài liệu cần thu thập.",
  },
  {
    time: "Ngày 2 – 5",
    tag: "Rà soát",
    title: "Đọc hồ sơ ở cả hai ngôn ngữ",
    desc: "Đối chiếu tỉ mỉ bản Việt và bản Trung, đánh dấu các điều khoản bất lợi, lệch nghĩa hoặc tiềm ẩn tranh chấp.",
  },
  {
    time: "Tuần 2",
    tag: "Phương án",
    title: "Báo phí và lộ trình bằng văn bản",
    desc: "Trình bày các phương án giải quyết khả thi, thời gian dự kiến và báo giá chi phí trọn gói trước khi nhận vụ việc.",
  },
  {
    time: "Sau đó",
    tag: "Đại diện",
    title: "Đàm phán, làm việc với cơ quan hoặc tố tụng",
    desc: "Trực tiếp tham gia đàm phán, đại diện giải trình với cơ quan quản lý và cập nhật tiến độ định kỳ cho đến khi hoàn tất.",
  },
];
