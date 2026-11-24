import { DEFAULT_LANG, LangCode } from '../../../common/enums/lang.enum';

export function selectTranslation<T extends { languageCode: LangCode }>(
  translations: T[] | undefined,
  lang: LangCode,
): T | undefined {
  return translations?.find((item) => item.languageCode === lang)
    ?? translations?.find((item) => item.languageCode === DEFAULT_LANG)
    ?? translations?.[0];
}
