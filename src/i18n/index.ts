import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-chained-backend';
import HttpApi from 'i18next-http-backend'; // have a own http fallback
import LocalStorageBackend from "i18next-localstorage-backend";

import LanguageDetector from "./languageDetector";
import { getFallbackLng } from "./utils";
import { ELanguages } from "./constants";

const version = "1.72";
const NewHttpApi = new HttpApi(null, {
  queryStringParams: { v: version },
});

i18n
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // initImmediate: false,
    debug: false,
    fallbackLng: getFallbackLng(),
    load: "currentOnly",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      useSuspense: false,
    },
    detection: {
      order: ['customDetector', 'navigator', 'querystring', 'cookie', 'localStorage', 'htmlTag']
    },
    backend: {
      backends: [
        LocalStorageBackend,  // primary
        NewHttpApi  // fallback
      ],
      backendOptions: [
        {
          versions: {
            [ELanguages.enUS]: `v${version}`, [ELanguages.ruRU]: `v${version}}`
          },
        }
      ]
    }
  });

export default i18n;
