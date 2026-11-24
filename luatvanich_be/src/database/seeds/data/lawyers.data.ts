import { LangCode } from '../../../common/enums/lang.enum';
import { ContentStatus } from '../../../common/enums/content-status.enum';
import { LawyerTeamGroup } from '../../../modules/lawyers/enums/lawyer-team-group.enum';
import { CredentialKind } from '../../../modules/lawyers/enums/credential-kind.enum';

export interface LawyerSeedItem {
  slugKey: string;
  officeCode: string;
  teamGroup: LawyerTeamGroup;
  avatarUrl?: string;
  licenseNumber?: string;
  barAssociation?: string;
  email?: string;
  mobilePhone?: string;
  wechatId?: string;
  practiceStartDate?: string;
  displayOrder: number;
  isFeatured: boolean;
  status: ContentStatus;
  practiceAreaCodes: string[];
  languages: {
    languageCode: string;
    isNative: boolean;
  }[];
  credentials: {
    kind: CredentialKind;
    yearStart?: number;
    yearEnd?: number;
    displayOrder: number;
    translations: {
      languageCode: LangCode;
      title: string;
      institution?: string;
      description?: string;
    }[];
  }[];
  translations: {
    languageCode: LangCode;
    fullName: string;
    latinName?: string;
    slug: string;
    title?: string;
    secondaryTitle?: string;
    academicTitle?: string;
    affiliatedOrganization?: string;
    bio?: string;
    metaTitle?: string;
    metaDescription?: string;
  }[];
}

export const LAWYERS_SEED_DATA: LawyerSeedItem[] = [
  {
    slugKey: 'ling-chen',
    officeCode: 'hanoi_hq',
    teamGroup: LawyerTeamGroup.CORE_LEADERSHIP,
    avatarUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80',
    licenseNumber: 'LS-VN-2026-0889',
    barAssociation: 'Đoàn Luật sư Thành phố Hà Nội & Hiệp hội Luật sư Trung Quốc',
    email: 'lingchen@wanyimail.com',
    mobilePhone: '+84 912 345 678',
    wechatId: 'lingchen_lawyer',
    practiceStartDate: '2012-05-01',
    displayOrder: 1,
    isFeatured: true,
    status: ContentStatus.PUBLISHED,
    practiceAreaCodes: ['FDI', 'MA', 'DISPUTE', 'REALESTATE'],
    languages: [
      { languageCode: 'zh-CN', isNative: true },
      { languageCode: 'vi', isNative: false },
    ],
    credentials: [
      {
        kind: CredentialKind.EDUCATION,
        yearStart: 2008,
        yearEnd: 2012,
        displayOrder: 1,
        translations: [
          {
            languageCode: LangCode.VI,
            title: 'Cử nhân Luật học',
            institution: 'Đại học Quảng Tây',
            description: 'Tốt nghiệp chuyên ngành Pháp luật Dân sự và Thương mại quốc tế',
          },
          {
            languageCode: LangCode.ZH_CN,
            title: '法学学士学位',
            institution: '广西大学',
            description: '民商法及国际涉外经济法专业',
          },
        ],
      },
      {
        kind: CredentialKind.AWARD,
        yearStart: 2017,
        displayOrder: 2,
        translations: [
          {
            languageCode: LangCode.VI,
            title: 'Luật sư xuất sắc thành phố Sùng Tả',
            institution: 'Hiệp hội Luật sư thành phố Sùng Tả',
            description: 'Vinh danh luật sư có thành tích xuất sắc trong tư vấn pháp lý và giải quyết tranh chấp',
          },
          {
            languageCode: LangCode.ZH_CN,
            title: '崇左市优秀律师称号',
            institution: '崇左市律师行业协会',
            description: '2012-2016年度崇左市优秀律师荣誉表彰',
          },
        ],
      },
    ],
    translations: [
      {
        languageCode: LangCode.VI,
        fullName: 'Lăng Thần',
        latinName: 'Ling Chen',
        slug: 'luat-su-lang-than',
        title: 'Giám đốc Điều hành Văn phòng Hà Nội | Luật sư Thành viên Cấp cao',
        secondaryTitle: 'Chủ nhiệm Văn phòng Sùng Tả',
        academicTitle: 'Cử nhân Luật học',
        affiliatedOrganization: 'Công ty Luật Vạn Ích (Quảng Tây)',
        bio: 'Luật sư Trung Quốc được Bộ Tư pháp Việt Nam cấp phép hành nghề hợp pháp tại Việt Nam. Chuyên gia hàng đầu về đầu tư xuyên biên giới Việt - Trung, mua bán sáp nhập (M&A), pháp lý đất đai khu công nghiệp và đại diện giải quyết tranh chấp kinh doanh thương mại. Đã dẫn dắt tư vấn thành công nhiều dự án FDI trọng điểm của các tập đoàn niêm yết tại Bắc Ninh, Hải Phòng, Bình Dương.',
        metaTitle: 'Luật sư Lăng Thần - Giám đốc Điều hành Luật Vạn Ích Hà Nội',
        metaDescription: 'Hồ sơ năng lực Luật sư Lăng Thần: Cố vấn cấp cao về đầu tư FDI, M&A và tranh chấp thương mại Việt - Trung.',
      },
      {
        languageCode: LangCode.ZH_CN,
        fullName: '凌晨',
        latinName: 'Ling Chen',
        slug: 'lawyer-ling-chen',
        title: '万益河内、崇左办公室主任 | 高级合伙人',
        secondaryTitle: '高级涉外投资顾问',
        academicTitle: '法学学士',
        affiliatedOrganization: '广西万益律师事务所',
        bio: '拥有越南司法部执业许可的中越跨境法律领军律师。长期专注中企赴越直接投资（FDI）、跨境企业并购重组、工业园区土地合规及跨国民商事重大争议解决。曾为宁波摩克斯越南大同工业园投资项目、香港豪泰纺织品在越投资、湖南长沙毛氏酒业并购谅山母山酒业等重大跨境项目提供全程法律护航。',
        metaTitle: '凌晨律师 - 广西万益(河内)律师事务所主任',
        metaDescription: '万益河内办公室主任凌晨律师个人简介：专注中越跨境投资并购、涉越诉讼与仲裁代理。',
      },
    ],
  },
  {
    slugKey: 'liu-ai',
    officeCode: 'hanoi_hq',
    teamGroup: LawyerTeamGroup.CHINESE_TEAM,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    licenseNumber: 'LS-VN-2026-0912',
    barAssociation: 'Đoàn Luật sư Thành phố Hà Nội & Hiệp hội Luật sư Trung Quốc',
    email: 'liuai@wanyimail.com',
    mobilePhone: '+84 912 888 666',
    wechatId: 'liuai_lawyer',
    practiceStartDate: '2015-09-01',
    displayOrder: 2,
    isFeatured: true,
    status: ContentStatus.PUBLISHED,
    practiceAreaCodes: ['FDI', 'MA', 'DISPUTE'],
    languages: [
      { languageCode: 'zh-CN', isNative: true },
      { languageCode: 'vi', isNative: false },
    ],
    credentials: [
      {
        kind: CredentialKind.EDUCATION,
        yearStart: 2011,
        yearEnd: 2015,
        displayOrder: 1,
        translations: [
          {
            languageCode: LangCode.VI,
            title: 'Cử nhân Luật học',
            institution: 'Đại học Chính pháp Tây Nam',
            description: 'Chuyên ngành Luật Thương mại quốc tế',
          },
          {
            languageCode: LangCode.ZH_CN,
            title: '法学学士学位',
            institution: '西南政法大学',
            description: '国际经济与贸易法专业',
          },
        ],
      },
    ],
    translations: [
      {
        languageCode: LangCode.VI,
        fullName: 'Liễu Ái',
        latinName: 'Liu Ai',
        slug: 'luat-su-lieu-ai',
        title: 'Luật sư Chuyên trách Văn phòng Hà Nội',
        academicTitle: 'Cử nhân Luật học',
        affiliatedOrganization: 'Công ty Luật Vạn Ích (Hà Nội)',
        bio: 'Luật sư thường trú tại Hà Nội, có giấy phép hành nghề tại Việt Nam. Chuyên sâu về giải quyết tranh chấp dân sự thương mại, thẩm định pháp lý (Due Diligence) phục vụ các thương vụ M&A và tái cấu trúc doanh nghiệp có vốn Trung Quốc tại Việt Nam.',
        metaTitle: 'Luật sư Liễu Ái - Chuyên gia M&A và Tranh chấp Thương mại',
        metaDescription: 'Luật sư Liễu Ái chuyên trách tư vấn M&A, tranh chấp thương mại xuyên biên giới tại Văn phòng Hà Nội.',
      },
      {
        languageCode: LangCode.ZH_CN,
        fullName: '柳爱',
        latinName: 'Liu Ai',
        slug: 'lawyer-liu-ai',
        title: '万益河内办公室专职律师',
        academicTitle: '法学学士',
        affiliatedOrganization: '广西万益(河内)律师事务所',
        bio: '拥有越南执业许可的中方专职涉外律师，长驻越南河内。长期致力于涉越跨国民商事争议化解、涉越投资并购尽职调查与交易架构规划，以严谨细致的法律作风深受客户信赖。',
        metaTitle: '柳爱律师 - 万益河内办公室专职涉外律师',
        metaDescription: '万益河内专职律师柳爱个人简介：专注民商事争议解决、涉越投资并购与企业合规。',
      },
    ],
  },
  {
    slugKey: 'jiang-nvzhen',
    officeCode: 'beijing_branch',
    teamGroup: LawyerTeamGroup.CORE_LEADERSHIP,
    avatarUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80',
    licenseNumber: 'LS-CN-11012015',
    barAssociation: 'Hiệp hội Luật sư Thành phố Bắc Kinh',
    email: 'jiangnvzhen@wanyimail.com',
    mobilePhone: '+86 152 7702 0681',
    wechatId: 'jiangnvzhen_law',
    practiceStartDate: '2014-06-01',
    displayOrder: 3,
    isFeatured: true,
    status: ContentStatus.PUBLISHED,
    practiceAreaCodes: ['FDI', 'MA', 'TRADE', 'DISPUTE'],
    languages: [
      { languageCode: 'zh-CN', isNative: true },
      { languageCode: 'vi', isNative: false },
    ],
    credentials: [
      {
        kind: CredentialKind.EDUCATION,
        yearStart: 2010,
        yearEnd: 2014,
        displayOrder: 1,
        translations: [
          {
            languageCode: LangCode.VI,
            title: 'Cử nhân Luật học & Ngôn ngữ Tiếng Việt',
            institution: 'Đại học Dân tộc Quảng Tây',
            description: 'Tốt nghiệp xuất sắc hệ đào tạo song ngữ Trung - Việt',
          },
          {
            languageCode: LangCode.ZH_CN,
            title: '法学与越语双学士学位',
            institution: '广西民族大学',
            description: '中越双语法律涉外卓越人才培养计划',
          },
        ],
      },
    ],
    translations: [
      {
        languageCode: LangCode.VI,
        fullName: 'Tưởng Nữ Trinh',
        latinName: 'Jiang Nüzhen',
        slug: 'luat-su-tuong-nu-trinh',
        title: 'Luật sư Chuyên trách Cấp cao (Bắc Kinh - Hà Nội)',
        academicTitle: 'Cử nhân Luật học',
        affiliatedOrganization: 'Công ty Luật Vạn Ích (Bắc Kinh & Hà Nội)',
        bio: 'Luật sư song ngữ Trung - Việt xuất sắc, đầu mối điều phối các dự án đầu tư ra nước ngoài của doanh nghiệp khu vực phía Bắc Trung Quốc vào Việt Nam. Chuyên sâu tư vấn đầu tư FDI, cố vấn pháp lý doanh nghiệp thường xuyên, tranh tụng trọng tài thương mại và bào chữa hình sự kinh tế.',
        metaTitle: 'Luật sư Tưởng Nữ Trinh - Cố vấn Pháp lý Cấp cao Vạn Ích',
        metaDescription: 'Luật sư song ngữ Trung - Việt Tưởng Nữ Trinh chuyên gia tư vấn đầu tư FDI, hợp đồng thương mại.',
      },
      {
        languageCode: LangCode.ZH_CN,
        fullName: '蒋女贞',
        latinName: 'Jiang Nüzhen',
        slug: 'lawyer-jiang-nvzhen',
        title: '万益北京办公室专职律师 | 中越双语涉外骨干',
        academicTitle: '法学学士',
        affiliatedOrganization: '广西万益(北京)律师事务所',
        bio: '精通中越双语的资深涉外律师。专注中国企业涉外投资专项咨询、跨境常年法律顾问、涉越民商事诉讼与商事仲裁代理。深度参与万益越南河内办公室设立筹建，为两国客户搭建顺畅高效的法律沟通桥梁。',
        metaTitle: '蒋女贞律师 - 万益中越双语涉外专业律师',
        metaDescription: '蒋女贞律师简介：中越双语涉外资深律师，专注涉外投资咨询、常年法律顾问及商事仲裁。',
      },
    ],
  },
  {
    slugKey: 'tan-kaiyi',
    officeCode: 'nanning_hq',
    teamGroup: LawyerTeamGroup.CHINESE_TEAM,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    licenseNumber: 'LS-CN-45012018',
    barAssociation: 'Hiệp hội Luật sư Khu tự trị Quảng Tây',
    email: 'tankaiyi@wanyimail.com',
    mobilePhone: '+86 771 588 6677',
    practiceStartDate: '2018-07-01',
    displayOrder: 4,
    isFeatured: false,
    status: ContentStatus.PUBLISHED,
    practiceAreaCodes: ['TRADE', 'TAX', 'IP'],
    languages: [
      { languageCode: 'zh-CN', isNative: true },
      { languageCode: 'en', isNative: false },
    ],
    credentials: [
      {
        kind: CredentialKind.EDUCATION,
        yearStart: 2015,
        yearEnd: 2018,
        displayOrder: 1,
        translations: [
          {
            languageCode: LangCode.VI,
            title: 'Thạc sĩ Luật học (LL.M.)',
            institution: 'Đại học Trung Nam',
            description: 'Chuyên ngành Luật Quốc tế và Thương mại đa phương',
          },
          {
            languageCode: LangCode.ZH_CN,
            title: '法学硕士研究生 (LL.M.)',
            institution: '中南财经政法大学',
            description: '国际法学、世界贸易组织（WTO）规则方向',
          },
        ],
      },
    ],
    translations: [
      {
        languageCode: LangCode.VI,
        fullName: 'Đàm Khải Dật',
        latinName: 'Tan Kaiyi',
        slug: 'luat-su-dam-khai-dat',
        title: 'Luật sư Chuyên trách (Văn phòng Nam Ninh)',
        academicTitle: 'Thạc sĩ Luật học',
        affiliatedOrganization: 'Công ty Luật Vạn Ích (Nam Ninh)',
        bio: 'Luật sư song ngữ Trung - Anh, thạc sĩ luật học. Chuyên gia tư vấn thương mại quốc tế, đầu tư thành lập công ty xuyên biên giới, ứng phó điều tra chống bán phá giá (AD) và chống trợ cấp (CVD), giải quyết tranh chấp hôn nhân gia đình có yếu tố nước ngoài.',
        metaTitle: 'Luật sư Đàm Khải Dật - Chuyên gia Thương mại Quốc tế',
        metaDescription: 'Thạc sĩ Luật sư Đàm Khải Dật chuyên sâu về chống bán phá giá và thương mại quốc tế.',
      },
      {
        languageCode: LangCode.ZH_CN,
        fullName: '覃恺逸',
        latinName: 'Tan Kaiyi',
        slug: 'lawyer-tan-kaiyi',
        title: '万益南宁办公室专职律师 | 国际贸易与反倾销专家',
        academicTitle: '法学硕士',
        affiliatedOrganization: '广西万益律师事务所',
        bio: '中英双语国际贸易律师。专注国际货物贸易摩擦化解、反倾销与反补贴行政调查应诉、境内外商事主体跨境投资设厂及涉外民商事争议化解。',
        metaTitle: '覃恺逸律师 - 国际贸易与跨境反倾销专业律师',
        metaDescription: '覃恺逸律师简介：专注国际贸易摩擦应对、反倾销调查应诉与跨境投资设立。',
      },
    ],
  },
  {
    slugKey: 'le-chi-chinh',
    officeCode: 'hanoi_hq',
    teamGroup: LawyerTeamGroup.VIETNAMESE_TEAM,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    licenseNumber: 'LS-HN-2016-1234',
    barAssociation: 'Đoàn Luật sư Thành phố Hà Nội',
    email: 'chinh.le@luatvanich.vn',
    mobilePhone: '+84 904 555 789',
    practiceStartDate: '2016-03-01',
    displayOrder: 5,
    isFeatured: true,
    status: ContentStatus.PUBLISHED,
    practiceAreaCodes: ['FDI', 'LABOR', 'REALESTATE', 'DISPUTE'],
    languages: [
      { languageCode: 'vi', isNative: true },
      { languageCode: 'zh-CN', isNative: false },
    ],
    credentials: [
      {
        kind: CredentialKind.EDUCATION,
        yearStart: 2013,
        yearEnd: 2016,
        displayOrder: 1,
        translations: [
          {
            languageCode: LangCode.VI,
            title: 'Thạc sĩ Luật Kinh tế',
            institution: 'Khoa Luật - Đại học Quốc gia Hà Nội',
            description: 'Nghiên cứu chuyên sâu về Pháp luật Đầu tư nước ngoài tại Việt Nam',
          },
          {
            languageCode: LangCode.ZH_CN,
            title: '经济法学硕士',
            institution: '河内国家大学法学院',
            description: '越南外商直接投资法规方向研究生',
          },
        ],
      },
    ],
    translations: [
      {
        languageCode: LangCode.VI,
        fullName: 'Lê Chí Chinh',
        latinName: 'Le Chi Chinh',
        slug: 'luat-su-le-chi-chinh',
        title: 'Luật sư Đối tác Việt Nam | Trưởng nhóm Pháp lý Nội địa',
        academicTitle: 'Thạc sĩ Luật Kinh tế',
        affiliatedOrganization: 'Công ty Luật Vạn Ích (Hà Nội)',
        bio: 'Luật sư Việt Nam có hơn 10 năm kinh nghiệm thực chiến tại các cơ quan ban ngành và Tòa án Việt Nam. Thành thạo tiếng Trung, chuyên trách thủ tục cấp phép đầu tư, cấp phép xây dựng, tranh chấp hợp đồng lao động và đại diện tố tụng bảo vệ nhà đầu tư nước ngoài tại Tòa án các cấp.',
        metaTitle: 'Luật sư Lê Chí Chinh - Trưởng nhóm Pháp lý Việt Nam',
        metaDescription: 'Luật sư Lê Chí Chinh đại diện tố tụng, tư vấn cấp phép đầu tư và lao động cho doanh nghiệp nước ngoài.',
      },
      {
        languageCode: LangCode.ZH_CN,
        fullName: '黎志征',
        latinName: 'Le Chi Chinh',
        slug: 'lawyer-le-chi-chinh',
        title: '万益合作越南执业律师 | 越方法律事务部主管',
        academicTitle: '法学硕士',
        affiliatedOrganization: '广西万益(河内)律师事务所',
        bio: '越南本土资深执业律师，精通中越双语。在越南行政机关申报、工业土地报批、重大劳资集体纠纷平息及越南人民法院民事商事诉讼出庭代理领域具备丰富实务胜诉经验。',
        metaTitle: '黎志征律师 - 万益越南本土执业律师',
        metaDescription: '黎志征律师简介：越南出庭诉讼与官方牌照审批主管，专注涉越商业争议与官方沟通。',
      },
    ],
  },
];
