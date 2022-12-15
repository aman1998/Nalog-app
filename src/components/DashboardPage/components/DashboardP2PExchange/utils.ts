import moment from "moment";

import { TNullable } from "config/types";

import { EAssetsDashboardValueHistoryOptions } from "store/assets/types";

import { setDateTimeLocale } from "utils/dateHelpers";

import { EFilterTubs } from "./types";

export const formPayload = (value: TNullable<EFilterTubs>): EAssetsDashboardValueHistoryOptions => {
  setDateTimeLocale();
  let payload: EAssetsDashboardValueHistoryOptions = {};

  const formDayDateRange = (days: number) => {
    const to = new Date();
    const from = new Date(to.getTime() - (days * 24 * 60 * 60 * 1000));
    return {
      date_from:  moment(from).format("DD.MM.YYYY"),
      date_to: moment(to).format("DD.MM.YYYY")
    };
  };

  if (value) {
    switch (value) {
    case EFilterTubs.today:
      payload = {
        date_from:  moment().format("DD.MM.YYYY"),
        date_to: moment().format("DD.MM.YYYY")
      };
      break;
    case EFilterTubs.sevenDays:
      payload = formDayDateRange(7);
      break;
    case EFilterTubs.fourteenDays:
      payload = formDayDateRange(14);
      break;
    case EFilterTubs.thirtyDays:
      payload = formDayDateRange(30);
      break;
    }
  }
  return payload;
};
