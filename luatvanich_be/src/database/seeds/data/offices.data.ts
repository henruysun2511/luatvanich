import { LangCode } from '../../../common/enums/lang.enum';

export interface OfficeSeedItem {
  code: string;
  phone?: string;
  fax?: string;
  email?: string;
  wechatId?: string;
  wechatQrUrl?: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  mapEmbedUrl?: string;
  isHeadquarters: boolean;
  displayOrder: number;
  translations: {
    languageCode: LangCode;
    name: string;
    address: string;
    workingHours?: string;
    description?: string;
  }[];
}

export const OFFICES_SEED_DATA: OfficeSeedItem[] = [
  {
    code: 'hanoi_hq',
    phone: '+84 24 3789 6868',
    fax: '+84 24 3789 6869',
    email: 'hanoi@luatvanich.vn',
    wechatId: 'WanYi_Hanoi_Law',
    wechatQrUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    latitude: 21.0538,
    longitude: 105.7824,
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.6339798031267!2d105.78021!3d21.0538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDAzJzEzLjciTiAxMDXCsDQ2JzU2LjYiRQ!5e0!3m2!1svi!2svn!4v1600000000000',
    isHeadquarters: true,
    displayOrder: 1,
    translations: [
      {
        languageCode: LangCode.VI,
        name: 'Văn phòng Hà Nội (Trụ sở chính tại Việt Nam)',
        address: 'Số 17, Đường 23, Khu Biệt thự liền kề KĐT Thành phố Giao Lưu, Phường Cổ Nhuế 1, Quận Bắc Từ Liêm, TP. Hà Nội (Gần Bộ Công An, rẽ phải từ đường Phạm Văn Đồng)',
        workingHours: 'Thứ 2 - Thứ 6: 08:30 - 17:30 (Trực hotline & WeChat hỗ trợ khẩn cấp 24/7)',
        description: 'Văn phòng đại diện chính của Công ty Luật Vạn Ích (Quảng Tây) tại Việt Nam, được Bộ Tư pháp Việt Nam cấp phép. Chuyên sâu tư vấn đầu tư FDI, M&A và giải quyết tranh chấp thương mại xuyên biên giới Việt - Trung.',
      },
      {
        languageCode: LangCode.ZH_CN,
        name: '广西万益(河内)律师事务所 (越南总所)',
        address: '河内市北慈廉郡古芮1坊交流城都市区联排别墅区23路17号（公安部附近，从范文同大道右转进入）',
        workingHours: '周一至周五: 08:30 - 17:30 (微信及紧急联络热线提供24小时全天候响应)',
        description: '万益河内办公室经越南司法部批准设立，系广西万益在海外设立的重点涉外分所。依托地缘优势与专业中越双语律师团队，为中资企业赴越投资提供全周期、高品质的一站式跨境法律服务。',
      },
    ],
  },
  {
    code: 'bacninh_branch',
    phone: '+84 222 388 9988',
    email: 'bacninh@luatvanich.vn',
    wechatId: 'WanYi_BacNinh',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    latitude: 21.1861,
    longitude: 106.0763,
    isHeadquarters: false,
    displayOrder: 2,
    translations: [
      {
        languageCode: LangCode.VI,
        name: 'Văn phòng Bắc Ninh (Hỗ trợ KCN)',
        address: 'Đường Lý Thái Tổ, Phường Ninh Xá, Thành phố Bắc Ninh, Tỉnh Bắc Ninh',
        workingHours: 'Thứ 2 - Thứ 6: 08:30 - 17:30',
        description: 'Văn phòng trực tiếp phục vụ các doanh nghiệp sản xuất FDI, hỗ trợ pháp lý nhà xưởng, đất đai công nghiệp và quan hệ lao động tại các KCN trọng điểm: Quế Võ, Yên Phong, VSIP Bắc Ninh.',
      },
      {
        languageCode: LangCode.ZH_CN,
        name: '万益越南北宁办公室',
        address: '越南北宁省北宁市宁舍坊李太祖路',
        workingHours: '周一至周五: 08:30 - 17:30',
        description: '紧邻桂武、安丰及VSIP等重点工业园区，专注为中资制造业企业提供土地租赁、环评立项、厂房建设、外籍用工及劳资合规法律服务。',
      },
    ],
  },
  {
    code: 'nanning_hq',
    phone: '+86 771 588 8888',
    fax: '+86 771 588 8889',
    email: 'nanning@wanyimail.com',
    wechatId: 'WanYi_China',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80',
    latitude: 22.817,
    longitude: 108.366,
    isHeadquarters: false,
    displayOrder: 3,
    translations: [
      {
        languageCode: LangCode.VI,
        name: 'Tổng bộ Nam Ninh (Trung Quốc)',
        address: 'Tầng 27 Tòa nhà Cửu Châu Quốc Tế, Số 9 đường Trung Tân, Quận Thanh Tú, TP. Nam Ninh, Khu tự trị Quảng Tây, Trung Quốc',
        workingHours: 'Thứ 2 - Thứ 6: 09:00 - 18:00 (Giờ Bắc Kinh)',
        description: 'Trụ sở chính của Hãng luật Vạn Ích với hơn 300 luật sư, quy mô 9000m² văn phòng, là trung tâm điều phối các dịch vụ pháp lý xuyên biên giới giữa Trung Quốc và các nước ASEAN.',
      },
      {
        languageCode: LangCode.ZH_CN,
        name: '广西万益律师事务所 (南宁总所)',
        address: '中国广西南宁市青秀区中新路9号九洲国际27层',
        workingHours: '周一至周五: 09:00 - 18:00 (北京时间)',
        description: '万益总所创立于1996年，系全国优秀律师事务所，拥有300余名专业人员及9000余平米现代办公空间，为中国企业出海东盟提供坚实的境内外一体化法律支撑。',
      },
    ],
  },
  {
    code: 'beijing_branch',
    phone: '+86 10 6588 6688',
    email: 'beijing@wanyimail.com',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1200&q=80',
    latitude: 39.9042,
    longitude: 116.4074,
    isHeadquarters: false,
    displayOrder: 4,
    translations: [
      {
        languageCode: LangCode.VI,
        name: 'Văn phòng Bắc Kinh (Trung Quốc)',
        address: 'Quận Triều Dương, Thủ đô Bắc Kinh, Trung Quốc',
        workingHours: 'Thứ 2 - Thứ 6: 09:00 - 18:00 (Giờ Bắc Kinh)',
        description: 'Văn phòng cầu nối chính sách và các tập đoàn nhà nước, doanh nghiệp lớn tại Bắc Kinh đầu tư sang Việt Nam.',
      },
      {
        languageCode: LangCode.ZH_CN,
        name: '广西万益(北京)律师事务所',
        address: '中国北京市朝阳区核心商务区',
        workingHours: '周一至周五: 09:00 - 18:00 (北京时间)',
        description: '万益在首都北京的重要窗口，重点服务央国企及头部大型民营企业的对外投资审批及涉外争议解决业务。',
      },
    ],
  },
];
