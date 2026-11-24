import { LangCode } from '../../../common/enums/lang.enum';
import { PostSection } from '../../../modules/posts/enums/post-section.enum';
import { PostStatus } from '../../../modules/posts/enums/post-status.enum';

export interface CategorySeedItem {
  code: string;
  parentCode?: string;
  section: PostSection;
  displayOrder: number;
  translations: {
    languageCode: LangCode;
    name: string;
    slug: string;
    description?: string;
  }[];
}

export interface TagSeedItem {
  colorHex: string;
  translations: {
    languageCode: LangCode;
    name: string;
    slug: string;
  }[];
}

export interface PostSeedItem {
  categoryCode: string;
  authorSlugKey?: string;
  thumbnailUrl?: string;
  status: PostStatus;
  isFeatured: boolean;
  viewsCount: number;
  tagSlugs: string[];
  translations: {
    languageCode: LangCode;
    title: string;
    slug: string;
    summary: string;
    contentHtml: string;
    metaTitle?: string;
    metaDescription?: string;
  }[];
}

export const CATEGORIES_SEED_DATA: CategorySeedItem[] = [
  {
    code: 'fdi-guide',
    section: PostSection.HANDBOOK,
    displayOrder: 1,
    translations: [
      {
        languageCode: LangCode.VI,
        name: 'Cẩm nang Đầu tư FDI tại Việt Nam',
        slug: 'cam-nang-dau-tu-fdi-tai-viet-nam',
        description: 'Tổng hợp hướng dẫn pháp lý, quy trình thành lập và vận hành doanh nghiệp có vốn đầu tư nước ngoài tại Việt Nam.',
      },
      {
        languageCode: LangCode.ZH_CN,
        name: '越南外商直接投资(FDI)实务指南',
        slug: 'vietnam-fdi-practical-guide',
        description: '全面汇总中资企业赴越直接投资设立、合规运营及政府审批核心要点。',
      },
    ],
  },
  {
    code: 'setup-permits',
    parentCode: 'fdi-guide',
    section: PostSection.HANDBOOK,
    displayOrder: 1,
    translations: [
      {
        languageCode: LangCode.VI,
        name: 'Thành lập Doanh nghiệp & Giấy phép',
        slug: 'thanh-lap-doanh-nghiep-va-giay-phep',
        description: 'Thủ tục cấp Giấy chứng nhận đầu tư IRC, Giấy phép kinh doanh ERC và các giấy phép con.',
      },
      {
        languageCode: LangCode.ZH_CN,
        name: '企业设立与官方许可申办',
        slug: 'company-setup-licensing',
        description: 'IRC投资证、ERC营业执照及行业前置特许资质申办指南。',
      },
    ],
  },
  {
    code: 'labor-hr',
    parentCode: 'fdi-guide',
    section: PostSection.HANDBOOK,
    displayOrder: 2,
    translations: [
      {
        languageCode: LangCode.VI,
        name: 'Lao động & Nhân sự Doanh nghiệp',
        slug: 'lao-dong-va-nhan-su-doanh-nghiep',
        description: 'Bộ luật Lao động Việt Nam, giấy phép lao động cho người nước ngoài và bảo hiểm xã hội.',
      },
      {
        languageCode: LangCode.ZH_CN,
        name: '越南劳动用工与外籍人事合规',
        slug: 'labor-expatriate-employment-rules',
        description: '越南劳动法典、员工手册合规、中方外派专家工作许可及社保规制。',
      },
    ],
  },
  {
    code: 'industrial-land',
    parentCode: 'fdi-guide',
    section: PostSection.HANDBOOK,
    displayOrder: 3,
    translations: [
      {
        languageCode: LangCode.VI,
        name: 'Đất đai & Nhà xưởng Khu Công nghiệp',
        slug: 'dat-dai-va-nha-xuong-khu-cong-nghiep',
        description: 'Pháp lý thuê đất, mua bán nhà xưởng và hợp đồng thi công xây dựng trong KCN.',
      },
      {
        languageCode: LangCode.ZH_CN,
        name: '工业园区土地与厂房建设工程',
        slug: 'industrial-land-plant-construction',
        description: '工业地块租赁转让、厂房建设合规及环评消防审批实务。',
      },
    ],
  },
  {
    code: 'legal-updates',
    section: PostSection.NEWS,
    displayOrder: 2,
    translations: [
      {
        languageCode: LangCode.VI,
        name: 'Tiêu điểm Pháp lý & Chính sách Mới',
        slug: 'tieu-diem-phap-ly-va-chinh-sach-moi',
        description: 'Cập nhật nhanh các văn bản luật, nghị định, thông tư mới nhất tác động đến môi trường đầu tư kinh doanh.',
      },
      {
        languageCode: LangCode.ZH_CN,
        name: '越南法律焦点与新政速递',
        slug: 'vietnam-legal-updates-policies',
        description: '第一时间解读越南国会最新法案、政府议定及外商投资监管新趋势。',
      },
    ],
  },
  {
    code: 'cross-border-biz',
    section: PostSection.KNOWLEDGE_BASE,
    displayOrder: 3,
    translations: [
      {
        languageCode: LangCode.VI,
        name: 'Văn hóa Kinh doanh & Pháp luật Việt - Trung',
        slug: 'van-hoa-kinh-doanh-va-phap-luat-viet-trung',
        description: 'Chia sẻ kinh nghiệm thực tế về văn hóa đàm phán, tập quán thương mại và phòng ngừa rủi ro tranh chấp hai nước.',
      },
      {
        languageCode: LangCode.ZH_CN,
        name: '中越商业文化与跨境法律实务',
        slug: 'china-vietnam-business-culture-law',
        description: '深度剖析中越两国民商事习惯、谈判文化差异与跨境履约风险防范技巧。',
      },
    ],
  },
];

export const TAGS_SEED_DATA: TagSeedItem[] = [
  {
    colorHex: '#0284c7',
    translations: [
      { languageCode: LangCode.VI, name: 'FDI Việt Nam', slug: 'fdi-viet-nam' },
      { languageCode: LangCode.ZH_CN, name: '越南FDI投资', slug: 'vietnam-fdi' },
    ],
  },
  {
    colorHex: '#16a34a',
    translations: [
      { languageCode: LangCode.VI, name: 'Thành lập công ty', slug: 'thanh-lap-cong-ty' },
      { languageCode: LangCode.ZH_CN, name: '在越设立公司', slug: 'company-setup' },
    ],
  },
  {
    colorHex: '#f59e0b',
    translations: [
      { languageCode: LangCode.VI, name: 'Giấy phép lao động', slug: 'giay-phep-lao-dong' },
      { languageCode: LangCode.ZH_CN, name: '工作许可证', slug: 'work-permit' },
    ],
  },
  {
    colorHex: '#8b5cf6',
    translations: [
      { languageCode: LangCode.VI, name: 'M&A Doanh nghiệp', slug: 'ma-doanh-nghiep' },
      { languageCode: LangCode.ZH_CN, name: '跨境并购重组', slug: 'cross-border-ma' },
    ],
  },
  {
    colorHex: '#ef4444',
    translations: [
      { languageCode: LangCode.VI, name: 'Trọng tài VIAC', slug: 'trong-tai-viac' },
      { languageCode: LangCode.ZH_CN, name: 'VIAC国际仲裁', slug: 'viac-arbitration' },
    ],
  },
  {
    colorHex: '#0f172a',
    translations: [
      { languageCode: LangCode.VI, name: 'Luật Vạn Ích', slug: 'luat-van-ich' },
      { languageCode: LangCode.ZH_CN, name: '广西万益律所', slug: 'wanyi-law-firm' },
    ],
  },
];

export const POSTS_SEED_DATA: PostSeedItem[] = [
  {
    categoryCode: 'setup-permits',
    authorSlugKey: 'ling-chen',
    thumbnailUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    status: PostStatus.PUBLISHED,
    isFeatured: true,
    viewsCount: 1580,
    tagSlugs: ['fdi-viet-nam', 'thanh-lap-cong-ty', 'luat-van-ich'],
    translations: [
      {
        languageCode: LangCode.VI,
        title: 'Quy trình và điều kiện nhà đầu tư Trung Quốc thành lập công ty tại Việt Nam năm 2026',
        slug: 'quy-trinh-nha-dau-tu-trung-quoc-thanh-lap-cong-ty-tai-viet-nam-2026',
        summary: 'Hướng dẫn chi tiết toàn bộ các bước pháp lý cần chuẩn bị, từ hợp pháp hóa lãnh sự tài liệu, đăng ký cấp giấy chứng nhận IRC, ERC đến mở tài khoản vốn đầu tư trực tiếp.',
        contentHtml: `
<p>Năm 2026 ghi nhận làn sóng đầu tư mạnh mẽ từ các doanh nghiệp Trung Quốc vào Việt Nam, đặc biệt trong các ngành điện tử, năng lượng mới, phụ trợ cơ khí và dệt may công nghệ cao. Bài viết này tổng hợp toàn bộ các lưu ý pháp lý quan trọng nhất.</p>

<h2>1. Hồ sơ chuẩn bị từ phía công ty mẹ tại Trung Quốc</h2>
<p>Nhà đầu tư cần chuẩn bị các giấy tờ gốc tại Trung Quốc, bao gồm: Giấy phép kinh doanh (营业执照), Điều lệ công ty mẹ, Báo cáo tài chính đã kiểm toán 02 năm gần nhất và Nghị quyết cử người đại diện phần vốn góp. Tất cả các tài liệu này bắt buộc phải được:</p>
<ol>
  <li>Công chứng tại Phòng Công chứng Nhà nước tại Trung Quốc.</li>
  <li>Hợp pháp hóa lãnh sự tại Bộ Ngoại giao Trung Quốc (hoặc Văn phòng Ngoại vụ địa phương).</li>
  <li>Chứng nhận lãnh sự tại Đại sứ quán/Lãnh sự quán Việt Nam tại Trung Quốc.</li>
</ol>

<h2>2. Trình tự xin cấp Giấy chứng nhận đăng ký đầu tư (IRC)</h2>
<p>Thời gian thẩm định theo luật định là 15 ngày làm việc kể từ ngày nộp đủ hồ sơ hợp lệ. Đối với các dự án sản xuất công nghiệp, cơ quan cấp phép sẽ gửi văn bản lấy ý kiến thẩm định về công nghệ, môi trường và quy hoạch đất đai của các Sở ban ngành liên quan.</p>

<h2>3. Xin cấp Giấy chứng nhận đăng ký doanh nghiệp (ERC) và góp vốn</h2>
<p>Sau khi có IRC, thủ tục cấp ERC diễn ra trong 03 ngày làm việc tại Phòng Đăng ký kinh doanh. Lưu ý quan trọng: Nhà đầu tư phải góp đủ 100% số vốn điều lệ cam kết thông qua <strong>Tài khoản vốn đầu tư trực tiếp (DICA)</strong> trong vòng 90 ngày kể từ ngày được cấp ERC.</p>
        `.trim(),
        metaTitle: 'Hướng dẫn nhà đầu tư Trung Quốc thành lập công ty tại Việt Nam 2026',
        metaDescription: 'Bài viết chi tiết của Luật sư Lăng Thần hướng dẫn thủ tục mở công ty vốn FDI Trung Quốc tại Việt Nam.',
      },
      {
        languageCode: LangCode.ZH_CN,
        title: '2026年中资企业赴越南直接投资设立公司全流程实操指南',
        slug: '2026-china-invest-vietnam-company-setup-guide',
        summary: '万益河内律师团队撰写：中企赴越投资必备，深度详解公证认证双认证、IRC投资许可证、ERC执照申领及资金出境合规要点。',
        contentHtml: `
<p>2026年，随着RCEP全面生效及中越跨境产业链深度融合，越南已成为中国先进制造业出海东盟的首选枢纽。中资企业赴越新设工厂或贸易实体，必须严格把控以下四大合规关卡：</p>

<h2>一、母公司主体资格文书的公证与双认证</h2>
<p>中方投资人设立越南公司，所需的主体资格证明文件（营业执照、公司章程、近两年审计报告及法定代表人证明书）必须在国内完成：</p>
<ol>
  <li>涉外公证处出具正式中英文/中越文公证书；</li>
  <li>中国外交部领事司（或省级外办）单认证；</li>
  <li>越南驻华使领馆（北京大使馆或南宁、广州、昆明、上海总领馆）办理双认证。</li>
</ol>

<h2>二、投资登记许可证（IRC）法定审批周期与关注点</h2>
<p>向项目所在地计划投资厅（或工业园区管委会）报件后，法定审查时限为15个工作日。对于涉及工业制造业的项目，审批机关重点审查能耗指标、排污环保评级以及与越方产业规划的契合度。</p>

<h2>三、资本金账户开立与90天法定注资时限</h2>
<p>依据越南外汇管理规定，企业必须在越南授权商业银行开立<strong>直接投资资本账户（DICA）</strong>。外国投资人必须自ERC营业执照签发之日起90天内，由境外同名账户向DICA账户足额划汇注册资本，不可委托第三方代付，否则将面临行政处罚或增资受阻。</p>
        `.trim(),
        metaTitle: '2026中资企业赴越南设立公司全流程指南 - 万益河内律所',
        metaDescription: '万益河内主任凌晨律师详解：越南IRC投资许可、ERC执照及双认证全流程实操攻略。',
      },
    ],
  },
  {
    categoryCode: 'labor-hr',
    authorSlugKey: 'le-chi-chinh',
    thumbnailUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
    status: PostStatus.PUBLISHED,
    isFeatured: true,
    viewsCount: 1240,
    tagSlugs: ['fdi-viet-nam', 'giay-phep-lao-dong', 'luat-van-ich'],
    translations: [
      {
        languageCode: LangCode.VI,
        title: 'Các rủi ro pháp lý trọng yếu về hợp đồng lao động và bảo hiểm xã hội tại doanh nghiệp FDI',
        slug: 'cac-rui-ro-phap-ly-trong-yeu-ve-hop-dong-lao-dong-va-bao-hiem-xa-hoi-doanh-nghiep-fdi',
        summary: 'Phân tích các lỗi sai phổ biến của doanh nghiệp nước ngoài khi ký kết hợp đồng thử việc, sa thải trái luật và không đóng đủ bảo hiểm xã hội bắt buộc theo Luật Lao động Việt Nam.',
        contentHtml: `
<p>Doanh nghiệp FDI khi mới sang Việt Nam thường áp dụng thói quen quản lý nhân sự tại nước sở tại vào Việt Nam, dẫn đến các tranh chấp lao động cá nhân hoặc đình công tập thể nghiêm trọng.</p>

<h2>1. Sai phạm về chấm dứt hợp đồng lao động trái pháp luật</h2>
<p>Luật Lao động Việt Nam bảo vệ rất chặt chẽ người lao động. Người sử dụng lao động chỉ được đơn phương chấm dứt hợp đồng lao động trong một số trường hợp cụ thể (như thường xuyên không hoàn thành công việc, doanh nghiệp thu hẹp sản xuất do dịch bệnh/thiên tai) và bắt buộc phải báo trước đúng thời hạn. Nếu vi phạm, doanh nghiệp phải nhận người lao động trở lại làm việc và bồi thường ít nhất 02 tháng tiền lương cùng toàn bộ tiền lương trong những ngày không được làm việc.</p>

<h2>2. Bắt buộc đăng ký Nội quy lao động tại Sở LĐ-TB&XH</h2>
<p>Doanh nghiệp sử dụng từ 10 người lao động trở lên bắt buộc phải ban hành Nội quy lao động bằng văn bản và đăng ký với cơ quan quản lý nhà nước về lao động cấp tỉnh. Nếu Nội quy lao động chưa được đăng ký hợp lệ thì mọi hình thức xử lý kỷ luật sa thải đều bị Tòa án tuyên vô hiệu.</p>
        `.trim(),
        metaTitle: 'Rủi ro pháp lý lao động và BHXH tại doanh nghiệp FDI - Luật Vạn Ích',
        metaDescription: 'Luật sư Lê Chí Chinh cảnh báo các rủi ro sa thải trái luật, hợp đồng thử việc và tranh chấp lao động.',
      },
      {
        languageCode: LangCode.ZH_CN,
        title: '中资制造企业在越用工合规与劳资纠纷防范要点',
        slug: 'vietnam-labor-compliance-risk-management',
        summary: '结合越南劳动法实战经验：剖析中资企业常遇的违法解除劳动合同、员工集体罢工预防及外籍专家合规用工策略。',
        contentHtml: `
<p>中资制造型企业落地越南后，因两国劳动法律体系与工会机制存在显著差异，若照搬国内考核与解雇模式，极易诱发劳动仲裁败诉甚至工厂群体性停工事件。</p>

<h2>一、严苛的“法定单方解除劳动合同”限制</h2>
<p>越南《劳动法典2019》对用人单位单方辞退员工设定了极高的实质要件与程序门槛。除非员工存在严重旷工（30天内累计无故旷工5天以上）或盗窃商业秘密行为，用人单位不得随意以“绩效不达标”解除合同。若被法院认定为非法解除，企业除须足额补发劳动争议期间全额工资外，还须额外支付至少两个月薪酬的法定赔偿金。</p>

<h2>二、内部《员工手册/劳动规章》法定备案程序</h2>
<p>企业雇佣员工达到10人以上的，必须制定越南语书面《劳动规章》（Nội quy lao động），并在颁布之日起10天内向省市劳动厅提交正式备案登记。未经官方正式备案生效的劳动规章，不得作为开除或纪律惩戒员工的裁判依据。</p>
        `.trim(),
        metaTitle: '中资企业越南用工合规与劳工法务风险防范 - 万益河内律所',
        metaDescription: '越南执业律师黎志征详解：越南劳动法解雇红线、员工手册备案及集体工会合规防范。',
      },
    ],
  },
  {
    categoryCode: 'cross-border-biz',
    authorSlugKey: 'liu-ai',
    thumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    status: PostStatus.PUBLISHED,
    isFeatured: false,
    viewsCount: 980,
    tagSlugs: ['trong-tai-viac', 'ma-doanh-nghiep', 'luat-van-ich'],
    translations: [
      {
        languageCode: LangCode.VI,
        title: 'Cơ chế giải quyết tranh chấp hợp đồng mua bán quốc tế Việt - Trung: Trọng tài hay Tòa án?',
        slug: 'co-che-giai-quyet-tranh-chap-hop-dong-quoc-te-viet-trung',
        summary: 'So sánh ưu nhược điểm giữa lựa chọn Tòa án nhân dân và Trung tâm Trọng tài Quốc tế (VIAC/CIETAC), hiệu lực thi hành phán quyết trọng tài xuyên biên giới theo Công ước New York 1958.',
        contentHtml: `
<p>Trong các hợp đồng thương mại và mua bán sáp nhập xuyên biên giới giữa đối tác Việt Nam và Trung Quốc, điều khoản giải quyết tranh chấp (Dispute Resolution Clause) là chốt chặn bảo vệ quyền lợi cuối cùng nhưng thường bị xem nhẹ trong quá trình đàm phán.</p>

<h2>1. So sánh Tòa án và Trọng tài Thương mại</h2>
<table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f1f5f9;">
      <th>Tiêu chí</th>
      <th>Tòa án Nhà nước</th>
      <th>Trọng tài Thương mại (VIAC / CIETAC)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Tính bảo mật</strong></td>
      <td>Xét xử công khai</td>
      <td>Bảo mật tuyệt đối, không tiết lộ bí mật kinh doanh</td>
    </tr>
    <tr>
      <td><strong>Hiệu lực</strong></td>
      <td>Có thể bị kháng cáo, phúc thẩm, giám đốc thẩm kéo dài</td>
      <td>Phán quyết chung thẩm, có giá trị bắt buộc thi hành ngay</td>
    </tr>
    <tr>
      <td><strong>Thi hành ở nước ngoài</strong></td>
      <td>Phức tạp, phụ thuộc vào hiệp định tương trợ tư pháp</td>
      <td>Được công nhận tại hơn 160 quốc gia theo Công ước New York 1958</td>
    </tr>
  </tbody>
</table>

<h2>2. Khuyến nghị của Luật Vạn Ích khi soạn thảo hợp đồng</h2>
<p>Các bên nên thỏa thuận rõ ràng cơ quan trọng tài (ví dụ VIAC hoặc CIETAC), địa điểm trọng tài (Hà Nội, Bắc Kinh hoặc trung lập tại Singapore), ngôn ngữ trọng tài (Tiếng Việt, Tiếng Trung hoặc Tiếng Anh) và số lượng trọng tài viên để tránh phát sinh tranh chấp về thẩm quyền.</p>
        `.trim(),
        metaTitle: 'Tranh chấp hợp đồng Việt - Trung: Tòa án hay Trọng tài?',
        metaDescription: 'Luật sư Liễu Ái phân tích chi tiết điều khoản trọng tài VIAC/CIETAC trong hợp đồng thương mại quốc tế.',
      },
      {
        languageCode: LangCode.ZH_CN,
        title: '中越跨国商事争议解决路径权衡：法院诉讼还是国际商事仲裁？',
        slug: 'china-vietnam-dispute-resolution-arbitration-vs-court',
        summary: '对比中越两国涉外民商事案件在越南法院审理与选择VIAC/CIETAC商事仲裁的优劣势，详解《纽约公约》跨国裁决执行。',
        contentHtml: `
<p>在中越两国的国际贸易、EPC工程承包及跨境股权转让交易中，争议解决条款往往是防范交易对手方违约的最关键制度锁钥。许多中企因合同争议管辖约定不明，在发生纠纷时陷入境外管辖权异议的被动泥潭。</p>

<h2>一、法院诉讼与商事仲裁综合对比</h2>
<ul>
  <li><strong>中立性与专业度：</strong>商事仲裁允许双方自主选任精通跨境商法与双语背景的中外籍仲裁员，有效克服地方保护主义顾虑。</li>
  <li><strong>终局性与效率：</strong>仲裁实行一裁终局制，裁决一经作出即具法律拘束力；而法院诉讼存在一审、二审及重审可能，程序周期漫长。</li>
  <li><strong>跨国承认与执行力：</strong>中越两国均为《承认及执行外国仲裁裁决公约》（即《纽约公约》1958）缔约国，VIAC或CIETAC作出的仲裁裁决可在两国法院依据公约直接申请执行。</li>
</ul>

<h2>二、万益涉外律师起草示范条款建议</h2>
<p>建议中资企业在合同拟定时明确约定：“凡因本合同引起的或与本合同有关的任何争议，均应提交越南国际仲裁中心（VIAC），按照申请仲裁时该会现行有效的仲裁规则进行仲裁。仲裁地点为河内，仲裁语言为中文或中越双语。”</p>
        `.trim(),
        metaTitle: '中越商事纠纷解决：法院诉讼还是VIAC仲裁？ - 万益律所',
        metaDescription: '万益河内专职涉外律师柳爱深度解析：涉越国际买卖合同争议管辖条款设计与执行风险。',
      },
    ],
  },
];
