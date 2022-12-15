import LanguageDetector from "i18next-browser-languagedetector";

import { AVAILABLE_LANGUAGES, ELanguages } from "./constants";

const lngDetector = new LanguageDetector();

lngDetector.addDetector({
  name: 'customDetector',
  lookup: options => {
    let found: string|undefined = (ELanguages.enUS as string);

    if (process.env.REACT_APP_LANGUAGE && AVAILABLE_LANGUAGES.includes(process.env.REACT_APP_LANGUAGE as ELanguages)) {
      found = process.env.REACT_APP_LANGUAGE;
    } else if (options?.lookupLocalStorage && window.localStorage.getItem(options?.lookupLocalStorage) !== null) {
      const storageLng = window.localStorage.getItem(options?.lookupLocalStorage);
      found = (storageLng && AVAILABLE_LANGUAGES.includes(storageLng as ELanguages)) ? storageLng : undefined;
    } else if (AVAILABLE_LANGUAGES.includes(navigator.language as ELanguages)) {
      found = navigator.language;
    } else if (process.env.REACT_APP_LANGUAGE_DEFAULT
        && AVAILABLE_LANGUAGES.includes(process.env.REACT_APP_LANGUAGE_DEFAULT as ELanguages)) {
      found = process.env.REACT_APP_LANGUAGE_DEFAULT;
    }
    return found;
  },
});

export default lngDetector;