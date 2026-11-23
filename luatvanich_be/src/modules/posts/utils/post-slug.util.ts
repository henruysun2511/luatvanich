import { DEFAULT_LANG, LangCode } from '../../../common/enums/lang.enum';
import { generateViSlug, generateZhSlug } from '../../../common/utils/slug.util';

export function generatePostSlug(label: string, lang: LangCode, maxLength: number, id: string): string {
  const localized = lang === LangCode.ZH_CN && /\p{Script=Han}/u.test(label)
    ? label.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '')
    : (lang === DEFAULT_LANG ? generateViSlug(label) : generateZhSlug(label));
  return Array.from(localized).slice(0, maxLength).join('').replace(/-+$/, '') || id;
}

export function normalizePostSlug(slug: string): string {
  return slug.normalize('NFC').toLowerCase();
}
