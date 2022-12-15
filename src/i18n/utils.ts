import { FallbackLngObjList } from "i18next";

import { AVAILABLE_LANGUAGES, ELanguages, FALLBACK_LNG } from "./constants";

import i18n from "./index";

export const getFallbackLng = (): FallbackLngObjList => {
  const lng = process.env.REACT_APP_LANGUAGE;
  if (lng && AVAILABLE_LANGUAGES.includes(lng as ELanguages)) {
    return { [lng]: [lng] };
  }
  return FALLBACK_LNG;
};

export const onChangeLanguageHandler = (lng: string): void => {
  i18n.changeLanguage(lng).finally(() => {
    window.location.reload();
  });
};

export const changeLanguageAuto = (): void => {
  const browserLanguage = navigator.language;
  const currentLanguage = i18n.language;

  if (currentLanguage === browserLanguage) return;
  if (browserLanguage.slice(0,2) === "ru" && currentLanguage.slice(0,2) === "ru") return;

  if (AVAILABLE_LANGUAGES.includes(browserLanguage as ELanguages) ) {
    onChangeLanguageHandler(browserLanguage);
  } else if (browserLanguage.slice(0,2) === "ru") {
    onChangeLanguageHandler(ELanguages.ruRU);
  } else if (currentLanguage !== ELanguages.enUS) {
    onChangeLanguageHandler(ELanguages.enUS);
  }
};

export const changeLanguageSelected = (selected: string): void => {
  const currentLanguage = i18n.language;
  if (AVAILABLE_LANGUAGES.includes(selected as ELanguages) && currentLanguage !== selected ) {
    onChangeLanguageHandler(selected);
  }
};