import i18n from "../../../../i18n";

import { EDateFilter } from "../../types";

export const checkIsDate = (value: string): string => {
  if (value === EDateFilter.date_from) return i18n.t("naming.from");
  if (value === EDateFilter.date_to) return i18n.t("naming.to");
  else return "";
};
