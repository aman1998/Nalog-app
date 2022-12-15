export enum ELanguages {
  enUS = "en-US",
  ruRU = "ru-RU"
}

export const AVAILABLE_LANGUAGES = [ELanguages.enUS, ELanguages.ruRU];

export const LANGUAGES: Record<string, Record<string, string>> = {
  [ELanguages.ruRU]: { nativeName: 'Руский' },
  [ELanguages.enUS]: { nativeName: 'English' },
};

export const FALLBACK_LNG: Record<string, [string]> = {
  [ELanguages.ruRU]: [ELanguages.ruRU],
  [ELanguages.enUS]: [ELanguages.enUS]
};

