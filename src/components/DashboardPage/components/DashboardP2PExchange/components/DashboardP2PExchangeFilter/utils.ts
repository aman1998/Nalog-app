import { TFunction } from "i18next";

import { EFilterTubs } from "../../types";

export const getFilterTubs = (t: TFunction): {title:string,value:EFilterTubs}[] => ([
  {
    title: t("naming.today"),
    value: EFilterTubs.today
  },
  {
    title: t("naming.daysNumber", { count: 7 }),
    value: EFilterTubs.sevenDays
  },
  {
    title: t("naming.daysNumber", { count: 14 }),
    value: EFilterTubs.fourteenDays
  },
  {
    title: t("naming.daysNumber", { count: 30 }),
    value: EFilterTubs.thirtyDays
  },
]);
