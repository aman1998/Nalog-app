import { EReportTransactionType, EReportTransactionTypeRu } from "store/reports/types";

export const reportTransactionTypesOperation = [
  { value: EReportTransactionType.all, label: EReportTransactionTypeRu.all },
  { value: EReportTransactionType.income, label: EReportTransactionTypeRu.income },
  { value: EReportTransactionType.outcome, label: EReportTransactionTypeRu.outcome },
];