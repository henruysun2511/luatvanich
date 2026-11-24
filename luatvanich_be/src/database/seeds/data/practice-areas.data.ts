import { LangCode } from '../../../common/enums/lang.enum';
import { ContentStatus } from '../../../common/enums/content-status.enum';

export interface PracticeAreaSeedItem {
  code: string;
  iconUrl?: string;
  displayOrder: number;
  status: ContentStatus;
  isFeatured: boolean;
  translations: {
    languageCode: LangCode;
    name: string;
    slug: string;
    description: string;
    metaTitle?: string;
    metaDescription?: string;
  }[];
}

export const PRACTICE_AREAS_SEED_DATA: PracticeAreaSeedItem[] = [
  {
    code: 'FDI',
    iconUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    displayOrder: 1,
    status: ContentStatus.PUBLISHED,
    isFeatured: true,
    translations: [
      {
        languageCode: LangCode.VI,
        name: 'Đầu tư trực tiếp nước ngoài (FDI)',
        slug: 'dau-tu-truc-tiep-nuoc-ngoai-fdi',
        description: 'Tư vấn pháp lý toàn diện từ khảo sát địa điểm, xin cấp Giấy chứng nhận đăng ký đầu tư (IRC), thành lập doanh nghiệp (ERC) đến hoàn thiện các điều kiện kinh doanh chuyên ngành tại Việt Nam.',
        metaTitle: 'Tư vấn Đầu tư FDI tại Việt Nam - Luật Vạn Ích',
        metaDescription: 'Dịch vụ tư vấn pháp lý chuyên sâu về đầu tư nước ngoài FDI, thành lập công ty vốn Trung Quốc tại Việt Nam.',
      },
      {
        languageCode: LangCode.ZH_CN,
        name: '外商直接投资与FDI企业法律服务',
        slug: 'fdi-foreign-direct-investment',
        description: '为中资赴越投资提供从项目选址、投资架构设计、投资许可证（IRC）申办、企业设立（ERC）到行业前置许可审批的全流程合规支持。',
        metaTitle: '越南外商直接投资(FDI)法律服务 - 万益河内律所',
        metaDescription: '万益河内律师事务所专注中资企业赴越直接投资，提供投资架构设计、牌照申领及公司设立全流程法律服务。',
      },
    ],
  },
  {
    code: 'MA',
    iconUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
    displayOrder: 2,
    status: ContentStatus.PUBLISHED,
    isFeatured: true,
    translations: [
      {
        languageCode: LangCode.VI,
        name: 'Mua bán & Sáp nhập Doanh nghiệp (M&A)',
        slug: 'mua-ban-sap-nhap-doanh-nghiep-ma',
        description: 'Thẩm định pháp lý chuyên sâu (Legal Due Diligence), cấu trúc giao dịch chuyển nhượng vốn/cổ phần, soạn thảo hợp đồng mua bán và hỗ trợ đàm phán giải quyết rủi ro pháp lý.',
        metaTitle: 'Tư vấn Mua bán & Sáp nhập M&A tại Việt Nam - Luật Vạn Ích',
        metaDescription: 'Chuyên gia tư vấn giao dịch M&A xuyên biên giới, mua lại dự án và nhà xưởng công nghiệp tại Việt Nam.',
      },
      {
        languageCode: LangCode.ZH_CN,
        name: '企业跨境投资并购重组 (M&A)',
        slug: 'cross-border-mergers-acquisitions',
        description: '深度法律尽职调查（Legal Due Diligence）、跨境并购交易架构设计、股权转让协议起草、商务谈判协助及资产交割全流程法律护航。',
        metaTitle: '中越跨境投资并购(M&A)重组法律服务 - 万益律所',
        metaDescription: '为中企收购越南本土企业、在越厂房资产及合资合营项目提供专业尽职调查与交易文本谈判支持。',
      },
    ],
  },
  {
    code: 'TRADE',
    iconUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
    displayOrder: 3,
    status: ContentStatus.PUBLISHED,
    isFeatured: true,
    translations: [
      {
        languageCode: LangCode.VI,
        name: 'Thương mại quốc tế & Xuất nhập khẩu',
        slug: 'thuong-mai-quoc-te-xuat-nhap-khau',
        description: 'Tư vấn pháp luật hợp đồng mua bán hàng hóa quốc tế, thủ tục hải quan, phòng vệ thương mại (chống bán phá giá, chống trợ cấp) và xử lý rủi ro giao nhận thanh toán quốc tế.',
        metaTitle: 'Thương mại quốc tế & Phòng vệ thương mại - Luật Vạn Ích',
        metaDescription: 'Tư vấn xuất nhập khẩu, ứng phó điều tra chống bán phá giá và hợp đồng mua bán quốc tế Việt - Trung.',
      },
      {
        languageCode: LangCode.ZH_CN,
        name: '国际贸易与海关合规',
        slug: 'international-trade-customs',
        description: '跨国货物买卖合同审查、国际物流争议处理、海关进出口合规、反倾销反补贴（双反）调查应诉及产地来源证合规咨询。',
        metaTitle: '中越国际贸易与海关反倾销法律服务 - 万益律所',
        metaDescription: '专业协助中企应对国际贸易摩擦、涉越原产地认证、海关稽查及反倾销贸易救济调查。',
      },
    ],
  },
  {
    code: 'DISPUTE',
    iconUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    displayOrder: 4,
    status: ContentStatus.PUBLISHED,
    isFeatured: true,
    translations: [
      {
        languageCode: LangCode.VI,
        name: 'Giải quyết Tranh chấp & Trọng tài Quốc tế',
        slug: 'giai-quyet-tranh-chap-trong-tai-quoc-te',
        description: 'Đại diện tố tụng tại Tòa án các cấp tại Việt Nam, Trung tâm Trọng tài Quốc tế Việt Nam (VIAC), SIAC và công nhận/cho thi hành bản án, phán quyết trọng tài nước ngoài tại Việt Nam.',
        metaTitle: 'Giải quyết Tranh chấp & Trọng tài VIAC - Luật Vạn Ích',
        metaDescription: 'Đội ngũ luật sư song ngữ đại diện tranh chấp kinh doanh thương mại tại Tòa án và Trọng tài quốc tế.',
      },
      {
        languageCode: LangCode.ZH_CN,
        name: '涉外民商事争议解决与商事仲裁',
        slug: 'cross-border-dispute-resolution',
        description: '代表客户出席越南各级人民法院、越南国际仲裁中心（VIAC）、新加坡国际仲裁中心（SIAC）的庭审程序，以及境外判决与仲裁裁决在越承认与执行。',
        metaTitle: '越南跨国民商事诉讼与仲裁(VIAC)代理 - 万益河内',
        metaDescription: '由具备中越两国执业资格与背景的资深律师代理国际贸易纠纷、合同违约索赔及越南仲裁与司法诉讼。',
      },
    ],
  },
  {
    code: 'REALESTATE',
    iconUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    displayOrder: 5,
    status: ContentStatus.PUBLISHED,
    isFeatured: false,
    translations: [
      {
        languageCode: LangCode.VI,
        name: 'Đất đai, Nhà xưởng & Xây dựng Công nghiệp',
        slug: 'dat-dai-nha-xuong-xay-dung-cong-nghiep',
        description: 'Tư vấn thuê đất, chuyển nhượng quyền sử dụng đất trong Khu công nghiệp, thẩm định quy hoạch, giấy phép xây dựng, hợp đồng tổng thầu EPC và giải quyết tranh chấp xây dựng.',
        metaTitle: 'Pháp lý Đất đai KCN & Xây dựng Nhà xưởng - Luật Vạn Ích',
        metaDescription: 'Tư vấn thuê đất KCN, hợp đồng EPC và thẩm định pháp lý dự án xây dựng công nghiệp tại Việt Nam.',
      },
      {
        languageCode: LangCode.ZH_CN,
        name: '工业园区土地与厂房建设工程',
        slug: 'industrial-land-construction',
        description: '工业园区土地转租与二级转让合规、建设用地规划核查、环评及消防许可审批、EPC工程总承包合同起草与工程结算纠纷化解。',
        metaTitle: '越南工业土地与厂房工程建设合规服务 - 万益律所',
        metaDescription: '中资制造业出海落地必备：越南工业地块尽调、厂房租赁租赁协议审查及建设工程全阶段法律服务。',
      },
    ],
  },
  {
    code: 'LABOR',
    iconUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80',
    displayOrder: 6,
    status: ContentStatus.PUBLISHED,
    isFeatured: false,
    translations: [
      {
        languageCode: LangCode.VI,
        name: 'Lao động, Nhân sự & Giấy phép Chuyên gia',
        slug: 'lao-dong-nhan-su-giay-phep-chuyen-gia',
        description: 'Soạn thảo nội quy lao động, thỏa ước lao động tập thể, tư vấn xử lý kỷ luật lao động, giải quyết tranh chấp tiền lương và xin cấp Giấy phép lao động (Work Permit), Thẻ tạm trú cho người nước ngoài.',
        metaTitle: 'Tư vấn Pháp luật Lao động & Giấy phép Chuyên gia - Luật Vạn Ích',
        metaDescription: 'Dịch vụ soạn thảo nội quy lao động, xin giấy phép lao động và giải quyết tranh chấp nhân sự tại Việt Nam.',
      },
      {
        languageCode: LangCode.ZH_CN,
        name: '劳动人事合规与外籍用工许可',
        slug: 'labor-expatriate-employment-compliance',
        description: '越南劳动法典合规辅导、中越双语员工手册与劳动合同拟定、工会事务协调、中方高管及技术人员越南工作许可证（Work Permit）及暂住卡（TRC）一站式申办。',
        metaTitle: '越南劳动用工合规与工作签证/暂住证办理 - 万益律所',
        metaDescription: '解决中资企业在越南本土化用工的劳资风险，专业申办中国专家赴越工作许可证及3年居留卡。',
      },
    ],
  },
  {
    code: 'TAX',
    iconUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    displayOrder: 7,
    status: ContentStatus.PUBLISHED,
    isFeatured: false,
    translations: [
      {
        languageCode: LangCode.VI,
        name: 'Thuế, Tài chính & Chuyển lợi nhuận ra nước ngoài',
        slug: 'thue-tai-chinh-chuyen-loi-nhuan-ra-nuoc-ngoai',
        description: 'Tư vấn ưu đãi thuế TNDN cho dự án FDI, tuân thủ giá chuyển nhượng (giao dịch liên kết), mở tài khoản vốn đầu tư (DICA) và thủ tục hợp pháp chuyển lợi nhuận về nước mẹ.',
        metaTitle: 'Pháp luật Thuế & Chuyển lợi nhuận FDI - Luật Vạn Ích',
        metaDescription: 'Tư vấn chính sách ưu đãi thuế, tài khoản vốn đầu tư DICA và quy trình chuyển lợi nhuận hợp pháp về nước.',
      },
      {
        languageCode: LangCode.ZH_CN,
        name: '跨境财税合规与资金进出利润汇出',
        slug: 'taxation-capital-profit-remittance',
        description: '外资企业企业所得税（CIT）两免四减半政策适用、关联交易转让定价合规、直接投资资本账户（DICA）开设及完税后合法利润汇回母国法律指导。',
        metaTitle: '越南外企税收优惠与境外利润合法合规汇出 - 万益律所',
        metaDescription: '为中资在越企业把控跨境资金链风险，确保注册资本合规注入与经营利润安全有序结汇回国。',
      },
    ],
  },
  {
    code: 'IP',
    iconUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    displayOrder: 8,
    status: ContentStatus.PUBLISHED,
    isFeatured: false,
    translations: [
      {
        languageCode: LangCode.VI,
        name: 'Sở hữu trí tuệ & Chuyển giao công nghệ',
        slug: 'so-huu-tri-tue-chuyen-giao-cong-nghe',
        description: 'Tra cứu và đăng ký bảo hộ nhãn hiệu, kiểu dáng công nghiệp, sáng chế tại Cục Sở hữu trí tuệ Việt Nam, xử lý hàng giả, hàng nhái và vi phạm quyền sở hữu trí tuệ.',
        metaTitle: 'Bảo hộ Sở hữu Trí tuệ tại Việt Nam - Luật Vạn Ích',
        metaDescription: 'Dịch vụ đăng ký nhãn hiệu, bảo hộ thương hiệu Trung Quốc tại Việt Nam và giải quyết tranh chấp vi phạm SHTT.',
      },
      {
        languageCode: LangCode.ZH_CN,
        name: '知识产权海外保护与商标防抢注',
        slug: 'intellectual-property-brand-protection',
        description: '中资品牌在越商标抢先布局检索与申请、专利及工业外观设计海外保护、技术转让协议备案审查及假冒侵权行政查处维权。',
        metaTitle: '中国品牌越南商标注册与知识产权维权保护 - 万益律所',
        metaDescription: '护航中国品牌出海：越南商标抢注防范、海关知产保护备案及侵权打假法律行动。',
      },
    ],
  },
];
