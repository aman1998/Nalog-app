import moment from "moment";

import { EAssetsDashboardValueHistoryOptions } from "store/assets/types";

import { setDateTimeLocale } from "utils/dateHelpers";

import { EFilterTubs, TLocalState } from "../../types";

export const formPayload = (localState: TLocalState): EAssetsDashboardValueHistoryOptions => {
  setDateTimeLocale();

  let payload: EAssetsDashboardValueHistoryOptions = {};
  if (localState.dateRange) {
    if (localState.dateRange[0]) {
      payload.date_from = moment(localState.dateRange[0]).format("DD.MM.YYYY");
    }
    if (localState.dateRange[1]) {
      payload.date_to = moment(localState.dateRange[1]).format("DD.MM.YYYY");
    }
  }

  const formDayDateRange = (days: number) => {
    const to = new Date();
    const from = new Date(to.getTime() - (days * 24 * 60 * 60 * 1000));
    return {
      date_from:  moment(from).format("DD.MM.YYYY"),
      date_to: moment(to).format("DD.MM.YYYY")
    };
  };

  const formYearDateRange = (year: number) => {
    const from = new Date(year, 0, 1, 0,0,0);
    const to = new Date(year, 11, 31, 24, 0,0);
    return {
      date_from:  moment(from).format("DD.MM.YYYY"),
      date_to: moment(to).format("DD.MM.YYYY")
    };
  };

  if (localState.fixedDate) {
    switch (localState.fixedDate) {
    case EFilterTubs.sevenDays:
      payload = formDayDateRange(7);
      break;
    case EFilterTubs.thirtyDays:
      payload = formDayDateRange(30);
      break;
    case EFilterTubs.twoZeroTwentyTwo:
      payload = formYearDateRange(2022);
      break;
    case EFilterTubs.twoZeroTwentyOne:
      payload = formYearDateRange(2021);
      break;
    }
  }
  return payload;
};