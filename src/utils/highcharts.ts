import { LangOptions } from "highcharts";

import { ELanguages } from "../i18n/constants";

export const formLangOptions = (lang: string): LangOptions => {
  if (lang === ELanguages.ruRU) {
    return {
      shortMonths: ["Янв", "Фев", "Мрт", "Апр", "Мая", "Июнь", "Июль", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    };
  }
  return {
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  };
};