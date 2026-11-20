export enum LangCode {
  VI = 'vi',
  ZH_CN = 'zh-CN',
}

export const SUPPORTED_LANGS = [LangCode.VI, LangCode.ZH_CN] as const;
export const DEFAULT_LANG = LangCode.VI;
