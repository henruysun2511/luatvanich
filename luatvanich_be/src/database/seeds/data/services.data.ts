import { LangCode } from '../../../common/enums/lang.enum';
import { ContentStatus } from '../../../common/enums/content-status.enum';

export interface ServiceSeedItem {
  code: string;
  practiceAreaCode: string;
  displayOrder: number;
  status: ContentStatus;
  isFeatured: boolean;
  coverImageUrl?: string;
  translations: {
    languageCode: LangCode;
    title: string;
    slug: string;
    excerpt: string;
    contentHtml: string;
    metaTitle?: string;
    metaDescription?: string;
  }[];
}

export const SERVICES_SEED_DATA: ServiceSeedItem[] = [
  {
    code: 'SVC_FDI_SETUP',
    practiceAreaCode: 'FDI',
    displayOrder: 1,
    status: ContentStatus.PUBLISHED,
    isFeatured: true,
    coverImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    translations: [
      {
        languageCode: LangCode.VI,
        title: 'Thành lập công ty có vốn đầu tư nước ngoài (FDI)',
        slug: 'thanh-lap-cong-ty-von-dau-tu-nuoc-ngoai-fdi',
        excerpt: 'Dịch vụ trọn gói từ tư vấn tỷ lệ sở hữu, ngành nghề kinh doanh có điều kiện, xin cấp Giấy chứng nhận đăng ký đầu tư (IRC) và Giấy chứng nhận đăng ký doanh nghiệp (ERC).',
        contentHtml: `
<h2>1. Tổng quan về thành lập công ty FDI tại Việt Nam</h2>
<p>Việt Nam đang là điểm đến hàng đầu của dòng vốn FDI từ Trung Quốc và khu vực châu Á. Để đầu tư thành công, nhà đầu tư nước ngoài cần thực hiện đúng quy trình 2 bước cơ bản theo Luật Đầu tư 2020 và Luật Doanh nghiệp 2020:</p>
<ul>
  <li><strong>Bước 1:</strong> Đăng ký chủ trương và xin cấp Giấy chứng nhận đăng ký đầu tư (IRC).</li>
  <li><strong>Bước 2:</strong> Xin cấp Giấy chứng nhận đăng ký doanh nghiệp (ERC) và khắc dấu pháp nhân.</li>
  <li><strong>Bước 3:</strong> Mở tài khoản vốn đầu tư trực tiếp (DICA) và góp đủ vốn trong thời hạn 90 ngày.</li>
</ul>

<h2>2. Phạm vi dịch vụ của Luật Vạn Ích</h2>
<p>Đội ngũ luật sư song ngữ Việt - Trung của chúng tôi cung cấp dịch vụ chuyên sâu:</p>
<ol>
  <li>Tư vấn lựa chọn địa điểm đầu tư (Khu công nghiệp, Cụm công nghiệp hoặc ngoài KCN).</li>
  <li>Soát xét hồ sơ pháp lý của nhà đầu tư nước ngoài, dịch thuật công chứng và hợp pháp hóa lãnh sự.</li>
  <li>Soạn thảo toàn bộ hồ sơ dự án đầu tư, giải trình công nghệ và năng lực tài chính.</li>
  <li>Đại diện làm việc trực tiếp với Sở Kế hoạch và Đầu tư (hoặc Ban Quản lý các KCN).</li>
  <li>Hỗ trợ sau cấp phép: mở tài khoản ngân hàng DICA, đăng ký chữ ký số, hóa đơn điện tử và kê khai thuế ban đầu.</li>
</ol>
        `.trim(),
        metaTitle: 'Thành lập công ty FDI tại Việt Nam - Luật Vạn Ích',
        metaDescription: 'Dịch vụ tư vấn trọn gói thành lập công ty 100% vốn nước ngoài, xin giấy chứng nhận IRC và ERC tại Việt Nam.',
      },
      {
        languageCode: LangCode.ZH_CN,
        title: '外商直接投资设立公司全流程法律服务 (FDI)',
        slug: 'fdi-company-establishment-vietnam',
        excerpt: '为中资赴越设立全资或合资子公司提供从股权比例论证、投资许可证（IRC）到营业执照（ERC）申领的一站式落地护航。',
        contentHtml: `
<h2>一、越南外商投资公司设立核心流程</h2>
<p>根据越南《投资法2020》及《企业法2020》，外国投资者在越新设企业须履行法定“双证”申报：</p>
<ul>
  <li><strong>第一阶段：</strong>向计划投资厅或工业园区管委会申请《投资登记许可证》（IRC）。</li>
  <li><strong>第二阶段：</strong>在取得IRC后，申请《企业登记许可证》（ERC）并完成公章备案。</li>
  <li><strong>第三阶段：</strong>在商业银行开立直接投资资本账户（DICA），并在发照之日起90天内完成足额注资。</li>
</ul>

<h2>二、万益河内律师团队服务内容</h2>
<ol>
  <li><strong>投资前期合规评估：</strong>分析越方外资准入负面清单，核定股权上限与外商经营范围。</li>
  <li><strong>境外公证认证指引：</strong>指导中方母公司主体资格证明文件的公证书、外交部认证及越南使领馆双认证。</li>
  <li><strong>投资申请文件编撰：</strong>起草可行性研究报告、资金能力证明及生产设备环保方案。</li>
  <li><strong>官方沟通与跟进：</strong>全程代表客户对接审批机关，高效答复补正要求。</li>
  <li><strong>设立后合规落地：</strong>协助开设资本账户、办理外管登记、申领印章及初始税务申报。</li>
</ol>
        `.trim(),
        metaTitle: '在越南设立外资企业全流程法律服务 - 万益河内律所',
        metaDescription: '万益河内律师事务所专业代理中企赴越设立子公司，全流程申办IRC投资证与ERC执照。',
      },
    ],
  },
  {
    code: 'SVC_MA_DUE_DILIGENCE',
    practiceAreaCode: 'MA',
    displayOrder: 2,
    status: ContentStatus.PUBLISHED,
    isFeatured: true,
    coverImageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    translations: [
      {
        languageCode: LangCode.VI,
        title: 'Thẩm định pháp lý (Due Diligence) & Mua bán sáp nhập M&A',
        slug: 'tham-dinh-phap-ly-due-diligence-ma',
        excerpt: 'Điều tra toàn diện rủi ro pháp lý doanh nghiệp mục tiêu: đất đai, nhà xưởng, nợ thuế, tranh chấp tiềm ẩn, lao động và giấy phép kinh doanh.',
        contentHtml: `
<h2>1. Tầm quan trọng của Thẩm định pháp lý trong M&A</h2>
<p>Mua lại phần vốn góp hoặc dự án có sẵn là cách nhanh nhất để doanh nghiệp nước ngoài thâm nhập thị trường Việt Nam. Tuy nhiên, rủi ro tiềm ẩn về quyền sử dụng đất, vi phạm môi trường, nợ thuế hoặc tranh chấp lao động có thể làm đình trệ toàn bộ dự án.</p>
<h2>2. Nội dung báo cáo Due Diligence của Luật Vạn Ích</h2>
<ul>
  <li>Tư cách pháp lý và cơ cấu sở hữu vốn của các bên bán.</li>
  <li>Tình trạng sở hữu đất đai và giấy phép xây dựng nhà xưởng công nghiệp.</li>
  <li>Thực hiện nghĩa vụ thuế, bảo hiểm xã hội và tuân thủ quy chuẩn môi trường, PCCC.</li>
  <li>Rà soát các hợp đồng thương mại lớn và tranh chấp tố tụng đang diễn ra.</li>
  <li>Xây dựng cấu trúc giao dịch an toàn và soạn thảo Hợp đồng mua bán cổ phần (SPA).</li>
</ul>
        `.trim(),
        metaTitle: 'Thẩm định pháp lý M&A tại Việt Nam - Luật Vạn Ích',
        metaDescription: 'Báo cáo thẩm định rủi ro pháp lý Legal Due Diligence và soạn thảo hợp đồng M&A chuyên sâu.',
      },
      {
        languageCode: LangCode.ZH_CN,
        title: '越南企业并购与法律尽职调查 (Legal Due Diligence)',
        slug: 'vietnam-ma-legal-due-diligence',
        excerpt: '针对越南目标公司实施地块权属、厂房合法性、历史债务、诉讼纠纷及行政许可全方位法律穿透审查。',
        contentHtml: `
<h2>一、越南跨境并购的关键风险把控</h2>
<p>中资企业通过并购股权或资产方式进军越南，不仅能快速获取成熟厂房与生产配额，但也面临目标公司遗留的土地合规瑕疵、消防环评欠缺及隐性债务等重大风险。</p>
<h2>二、万益尽职调查与交易文本服务清单</h2>
<ul>
  <li><strong>主体资格审查：</strong>核验目标公司发起人实缴出资状况及历史股权变更合规性。</li>
  <li><strong>土地厂房资产核查：</strong>查验工业园区土地租期、土地出让金结清凭证及建设规划许可证。</li>
  <li><strong>许可资质穿透：</strong>核查环评批复（DTM）、消防验收（PCCC）及特许经营许可证效力。</li>
  <li><strong>起草交易文件：</strong>拟定股权转让意向书（LOI）、正式买卖合同（SPA）及交割监管账户安排。</li>
</ul>
        `.trim(),
        metaTitle: '越南并购重组与法律尽职调查 - 万益河内律所',
        metaDescription: '专业提供越南境内股权收购、资产收购法律尽职调查报告及并购合同谈判。',
      },
    ],
  },
  {
    code: 'SVC_LABOR_PERMIT',
    practiceAreaCode: 'LABOR',
    displayOrder: 3,
    status: ContentStatus.PUBLISHED,
    isFeatured: true,
    coverImageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
    translations: [
      {
        languageCode: LangCode.VI,
        title: 'Giấy phép lao động & Thẻ tạm trú cho chuyên gia nước ngoài',
        slug: 'giay-phep-lao-dong-the-tam-tru-chuyen-gia',
        excerpt: 'Thực hiện thủ tục giải trình nhu cầu sử dụng lao động nước ngoài, xin cấp Giấy phép lao động (Work Permit) và Thẻ tạm trú (TRC) từ 2 - 3 năm.',
        contentHtml: `
<h2>1. Quy định về lao động nước ngoài làm việc tại Việt Nam</h2>
<p>Theo Nghị định 152/2020/NĐ-CP và Nghị định 70/2023/NĐ-CP, doanh nghiệp phải hoàn thành việc giải trình nhu cầu sử dụng lao động nước ngoài trước khi nộp hồ sơ xin cấp Giấy phép lao động ít nhất 15 ngày.</p>
<h2>2. Dịch vụ của chúng tôi</h2>
<ol>
  <li>Tư vấn điều kiện đối với chức danh: Chuyên gia, Lao động kỹ thuật, Giám đốc điều hành.</li>
  <li>Hỗ trợ hợp pháp hóa lãnh sự bằng đại học, xác nhận kinh nghiệm từ nước ngoài.</li>
  <li>Thực hiện thủ tục báo cáo nhu cầu sử dụng lao động trực tuyến.</li>
  <li>Nộp và nhận kết quả Giấy phép lao động tại Sở Lao động - Thương binh và Xã hội.</li>
  <li>Xin cấp Thẻ tạm trú có thời hạn 02 - 03 năm tại Cục Quản lý Xuất nhập cảnh.</li>
</ol>
        `.trim(),
        metaTitle: 'Dịch vụ Giấy phép lao động & Thẻ tạm trú - Luật Vạn Ích',
        metaDescription: 'Làm giấy phép lao động cho người Trung Quốc tại Việt Nam, thẻ tạm trú 2-3 năm nhanh chóng, đúng luật.',
      },
      {
        languageCode: LangCode.ZH_CN,
        title: '中国籍专家工作许可证与居留暂住卡申办 (Work Permit & TRC)',
        slug: 'vietnam-work-permit-temporary-residence-card',
        excerpt: '精准匹配外籍用工岗位资质，专业申办外籍用工需求批文、工作许可证及2-3年期暂住卡（TRC）。',
        contentHtml: `
<h2>一、越南外籍劳务合规政策要点</h2>
<p>依据越南第152/2020号及第70/2023号议定，中资企业雇佣中国籍员工必须先向劳动部门报备《外籍用工需求方案》，获批后方可提交工作许可证申请。</p>
<h2>二、万益专业申办服务</h2>
<ul>
  <li><strong>用工岗位定性：</strong>精准对应“专家（Chuyên gia）”、“技术工人（Lao động kỹ thuật）”及“执行总裁（Giám đốc điều hành）”。</li>
  <li><strong>材料预审与双认证：</strong>高效指导中方学位证书、5年以上工作经验证明的双认证要点。</li>
  <li><strong>全流程代理申报：</strong>起草用工理由说明书，对接各省市劳动荣军社会厅办理批文与许可证。</li>
  <li><strong>申办暂住卡（TRC）：</strong>凭工作许可向出入境管理局申办2-3年期暂住卡，免除频繁续签烦恼。</li>
</ul>
        `.trim(),
        metaTitle: '越南工作许可证与暂住卡(TRC)代办 - 万益律所',
        metaDescription: '针对中资外派高管与工程师，专业代办越南劳动厅工作许可及出入境长期居留暂住卡。',
      },
    ],
  },
  {
    code: 'SVC_DISPUTE_ARBITRATION',
    practiceAreaCode: 'DISPUTE',
    displayOrder: 4,
    status: ContentStatus.PUBLISHED,
    isFeatured: true,
    coverImageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    translations: [
      {
        languageCode: LangCode.VI,
        title: 'Đại diện Giải quyết tranh chấp thương mại tại VIAC và Tòa án',
        slug: 'dai-dien-giai-quyet-tranh-chap-thuong-mai-viac-toa-an',
        excerpt: 'Bảo vệ quyền và lợi ích hợp pháp của doanh nghiệp trong các vụ tranh chấp hợp đồng mua bán quốc tế, hợp đồng xây dựng EPC và tranh chấp nội bộ cổ đông.',
        contentHtml: `
<h2>1. Ưu thế của Luật Vạn Ích trong tố tụng thương mại xuyên biên giới</h2>
<p>Với đội ngũ luật sư vừa am hiểu pháp luật Việt Nam, vừa có nền tảng ngôn ngữ và hiểu biết sâu sắc về văn hóa kinh doanh Trung Quốc, Luật Vạn Ích giúp khách hàng rút ngắn thời gian và tối ưu chi phí tố tụng.</p>
<h2>2. Các lĩnh vực tranh chấp tiêu biểu</h2>
<ul>
  <li>Tranh chấp hợp đồng mua bán hàng hóa quốc tế và thanh toán LC.</li>
  <li>Tranh chấp chất lượng công trình và tiến độ thi công hợp đồng tổng thầu EPC.</li>
  <li>Tranh chấp quyền biểu quyết và chuyển nhượng cổ phần giữa các nhóm cổ đông.</li>
  <li>Đại diện tại Trung tâm Trọng tài Quốc tế Việt Nam (VIAC) và Tòa án các cấp.</li>
</ul>
        `.trim(),
        metaTitle: 'Giải quyết Tranh chấp Thương mại tại VIAC - Luật Vạn Ích',
        metaDescription: 'Luật sư song ngữ đại diện tranh chấp kinh doanh thương mại, tranh chấp hợp đồng tại Tòa án và VIAC.',
      },
      {
        languageCode: LangCode.ZH_CN,
        title: '越南国际仲裁中心(VIAC)与司法诉讼代理',
        slug: 'viac-arbitration-commercial-litigation-vietnam',
        excerpt: '在国际货物买卖合同纠纷、工业工程款结算争议及中越合资合营股东纠纷中全力维护中资合法权益。',
        contentHtml: `
<h2>一、涉越国际商事仲裁与诉讼优势</h2>
<p>万益中越律师团队兼具中国法理功底与越南出庭实务经验，能直接使用中文与中国客户沟通案情要点，并使用越南语在越南司法机关及仲裁庭开展高效辩护。</p>
<h2>二、代理业务范围</h2>
<ul>
  <li><strong>国际买卖合同争议：</strong>交货迟延、货物品质不符、货款拒付及信用证结算欺诈。</li>
  <li><strong>建设工程总包合同：</strong>越南工业园区厂房EPC工期索赔、工程量变更追加及质保金扣押纠纷。</li>
  <li><strong>公司控制权纠纷：</strong>公司公章争夺、法定代表人越权侵占及分红争议诉讼。</li>
  <li><strong>仲裁全流程代理：</strong>选定仲裁员、起草仲裁申请书/答辩书、出庭辩论及申请财产保全。</li>
</ul>
        `.trim(),
        metaTitle: '越南国际商事仲裁(VIAC)及民商事诉讼代理 - 万益律所',
        metaDescription: '万益中越律师团队擅长涉越货物欠款追讨、工程结算违约及合资纠纷仲裁代理。',
      },
    ],
  },
];
