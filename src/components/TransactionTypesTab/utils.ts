import { EReportTransactionType, EReportTransactionTypeRu } from "store/reports/types";

import i18n from "../../i18n";

export const getTabName = (tabType: string): string => {
  switch (tabType) {
  case EReportTransactionType.all:
    return i18n.t(EReportTransactionTypeRu.all);
  case EReportTransactionType.income:
    return i18n.t(EReportTransactionTypeRu.income);
  case EReportTransactionType.outcome:
    return i18n.t(EReportTransactionTypeRu.outcome);
  case EReportTransactionType.manual:
    return i18n.t(EReportTransactionTypeRu.manual);
  case EReportTransactionType.detailsRequired:
    return i18n.t(EReportTransactionTypeRu.detailsRequired);
  case EReportTransactionType.filter:
    return i18n.t(EReportTransactionTypeRu.filter);
  default:
    return "";
  }
};
