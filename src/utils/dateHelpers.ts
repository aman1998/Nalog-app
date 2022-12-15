import moment from "moment";
import "moment/locale/ru";

import i18n from "../i18n";

export const getRelativeTime = (value?: string | null): string => {
  if (!value) return "";
  setDateTimeLocale();
  return moment(value).fromNow();
};

export const onlyDate = (value?: string | number | null ): number => {
  if (!value) return  0;
  return new Date(value).setHours(0,0,0,0);
};

export const setDateTimeLocale = (val?: string): void => {
  moment.locale(val || i18n.language);
};
