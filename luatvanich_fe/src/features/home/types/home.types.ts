export interface PracticeAreaTabItem {
  hanzi: string;
  title: string;
  desc: string;
  points: string[];
  time: string;
  fee: string;
}

export interface FeaturedServiceItem {
  hz: string;
  title: string;
  desc: string;
  tabIndex: number;
}

export interface GlossaryTermItem {
  vi: string;
  zh: string;
  pinyin: string;
  note: string;
}

export interface HomeLawyerItem {
  name: string;
  role: string;
  langs: string[];
  field: string;
  hairIndex: number;
  isMale: number;
}

export interface LegalInsightItem {
  hz: string;
  tag: string;
  title: string;
  desc: string;
  bg1: string;
  bg2: string;
}

export interface PartnerLogoItem {
  hz: string;
  name: string;
}

export interface StatItem {
  num: string;
  hz: string;
  label: string;
}

export interface WorkflowStepItem {
  time: string;
  tag: string;
  title: string;
  desc: string;
}
