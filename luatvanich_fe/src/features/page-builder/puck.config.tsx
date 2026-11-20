import React from "react";
import type { Config } from "@measured/puck";
import { Scale, Users, ShieldCheck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export type PageBuilderProps = {
  HeroBanner: {
    badgeText: string;
    title: string;
    highlightWord: string;
    description: string;
    ctaButtonText: string;
    ctaButtonLink: string;
  };
  StatsCounter: {
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
    stat4Number: string;
    stat4Label: string;
  };
  CoreValues: {
    heading: string;
    subheading: string;
  };
  ConsultationFormBlock: {
    title: string;
    description: string;
  };
};

export const puckConfig: Config<PageBuilderProps> = {
  components: {
    HeroBanner: {
      fields: {
        badgeText: { type: "text", label: "Huy hiệu nhỏ" },
        title: { type: "text", label: "Tiêu đề chính" },
        highlightWord: { type: "text", label: "Từ nhấn mạnh (màu vàng gold)" },
        description: { type: "textarea", label: "Đoạn văn miêu tả" },
        ctaButtonText: { type: "text", label: "Chữ trên nút CTA" },
        ctaButtonLink: { type: "text", label: "Đường dẫn nút CTA" },
      },
      defaultProps: {
        badgeText: "Hãng Luật Song Ngữ Việt - Trung",
        title: "Giải Pháp Pháp Lý Vững Chắc Cho Doanh Nghiệp FDI",
        highlightWord: "Doanh Nghiệp FDI",
        description:
          "Luật Vạn Ích đồng hành cùng doanh nghiệp trong suốt quá trình đầu tư, cấp phép, tuân thủ thuế và giải quyết tranh chấp tại Việt Nam.",
        ctaButtonText: "Đặt lịch tư vấn",
        ctaButtonLink: "/contact",
      },
      render: ({ badgeText, title, description, ctaButtonText, ctaButtonLink }) => (
        <section className="bg-primary text-primary-foreground py-16 px-4">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-semibold">
              <Scale className="size-3.5" /> {badgeText}
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-gray-200 max-w-2xl mx-auto">
              {description}
            </p>
            <div className="pt-2">
              <Button variant="accent" size="lg" asChild>
                <a href={ctaButtonLink}>{ctaButtonText}</a>
              </Button>
            </div>
          </div>
        </section>
      ),
    },

    StatsCounter: {
      fields: {
        stat1Number: { type: "text", label: "Số liệu 1" },
        stat1Label: { type: "text", label: "Nhãn 1" },
        stat2Number: { type: "text", label: "Số liệu 2" },
        stat2Label: { type: "text", label: "Nhãn 2" },
        stat3Number: { type: "text", label: "Số liệu 3" },
        stat3Label: { type: "text", label: "Nhãn 3" },
        stat4Number: { type: "text", label: "Số liệu 4" },
        stat4Label: { type: "text", label: "Nhãn 4" },
      },
      defaultProps: {
        stat1Number: "15+",
        stat1Label: "Năm kinh nghiệm",
        stat2Number: "500+",
        stat2Label: "Doanh nghiệp FDI đồng hành",
        stat3Number: "98%",
        stat3Label: "Vụ việc thành công",
        stat4Number: "24/7",
        stat4Label: "Hỗ trợ song ngữ",
      },
      render: (props) => (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-card border p-6 rounded-md shadow-sm">
              <div className="font-serif text-3xl font-bold text-primary">{props.stat1Number}</div>
              <div className="text-xs text-muted-foreground mt-1">{props.stat1Label}</div>
            </div>
            <div className="bg-card border p-6 rounded-md shadow-sm">
              <div className="font-serif text-3xl font-bold text-accent">{props.stat2Number}</div>
              <div className="text-xs text-muted-foreground mt-1">{props.stat2Label}</div>
            </div>
            <div className="bg-card border p-6 rounded-md shadow-sm">
              <div className="font-serif text-3xl font-bold text-primary">{props.stat3Number}</div>
              <div className="text-xs text-muted-foreground mt-1">{props.stat3Label}</div>
            </div>
            <div className="bg-card border p-6 rounded-md shadow-sm">
              <div className="font-serif text-3xl font-bold text-accent">{props.stat4Number}</div>
              <div className="text-xs text-muted-foreground mt-1">{props.stat4Label}</div>
            </div>
          </div>
        </section>
      ),
    },

    CoreValues: {
      fields: {
        heading: { type: "text", label: "Tiêu đề" },
        subheading: { type: "text", label: "Mô tả phụ" },
      },
      defaultProps: {
        heading: "Giá Trị Cốt Lõi Của Luật Vạn Ích",
        subheading: "Nền tảng vững chắc tạo nên uy tín và sự tin cậy lâu dài.",
      },
      render: ({ heading, subheading }) => (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center space-y-2 mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">{heading}</h2>
            <p className="text-xs text-muted-foreground">{subheading}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border bg-card p-6 rounded-md text-center space-y-2">
              <ShieldCheck className="size-8 mx-auto text-primary" />
              <h3 className="font-bold text-base">Bảo mật tuyệt đối</h3>
              <p className="text-xs text-muted-foreground">Mọi hồ sơ và dữ liệu kinh doanh được cam kết bảo mật theo tiêu chuẩn quốc tế.</p>
            </div>
            <div className="border bg-card p-6 rounded-md text-center space-y-2">
              <Scale className="size-8 mx-auto text-accent" />
              <h3 className="font-bold text-base">Chuyên nghiệp & Tận tâm</h3>
              <p className="text-xs text-muted-foreground">Quy trình xử lý hồ sơ minh bạch, báo cáo tiến độ định kỳ cho khách hàng.</p>
            </div>
            <div className="border bg-card p-6 rounded-md text-center space-y-2">
              <Award className="size-8 mx-auto text-primary" />
              <h3 className="font-bold text-base">Hiệu quả pháp lý</h3>
              <p className="text-xs text-muted-foreground">Đưa ra phương án tối ưu về chi phí và thời gian cho doanh nghiệp.</p>
            </div>
          </div>
        </section>
      ),
    },

    ConsultationFormBlock: {
      fields: {
        title: { type: "text", label: "Tiêu đề form" },
        description: { type: "textarea", label: "Mô tả" },
      },
      defaultProps: {
        title: "Đặt Lịch Tư Vấn Pháp Lý Ngay Hôm Nay",
        description: "Để lại thông tin, luật sư chuyên trách của chúng tôi sẽ liên hệ trong 24 giờ làm việc.",
      },
      render: ({ title, description }) => (
        <section className="bg-primary text-primary-foreground py-12 px-4 rounded-lg max-w-7xl mx-auto my-8">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h2 className="font-serif text-2xl font-bold">{title}</h2>
            <p className="text-xs text-gray-300">{description}</p>
            <Button variant="accent" size="lg" asChild>
              <a href="/contact">Đi đến form tư vấn</a>
            </Button>
          </div>
        </section>
      ),
    },
  },
};
