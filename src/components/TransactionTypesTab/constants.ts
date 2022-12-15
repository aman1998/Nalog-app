import { EReportTransactionType } from "store/reports/types";

export const defaultTabs: string[] = [
  EReportTransactionType.all,
  EReportTransactionType.income,
  EReportTransactionType.outcome,
  EReportTransactionType.manual
];
