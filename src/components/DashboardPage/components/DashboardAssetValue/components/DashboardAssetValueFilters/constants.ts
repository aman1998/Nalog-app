import { TFunction } from "i18next";

import { EFilterTubs } from "../../types";

import { TFilterTub } from "./types";


export const getFilterTubs = (t: TFunction): TFilterTub[] => ([
  {
    title: t("naming.daysNumber", { count: 7 }),
    value: EFilterTubs.sevenDays
  },
  {
    title: t("naming.daysNumber", { count: 30 }),
    value: EFilterTubs.thirtyDays
  },
  {
    title: '2022',
    value: EFilterTubs.twoZeroTwentyTwo
  },
  {
    title: '2021',
    value: EFilterTubs.twoZeroTwentyOne
  },
]);
