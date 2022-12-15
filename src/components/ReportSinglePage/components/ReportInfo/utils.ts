import { TNullable } from "config/types";

import { TGetReportsFormedData } from "store/reports/types";

import i18n from "../../../../i18n";

import { EReportFormedCalculations } from "./types";

export type GetCalculationsProps = (data: TNullable<TGetReportsFormedData>) =>
  { title: string; count: number; type: string; tooltip: string }[];

export const getCalculations: GetCalculationsProps = data => [
  {
    type: EReportFormedCalculations.income,
    title: i18n.t('reportInfo.income'),
    count: data?.income || 0,
    tooltip: i18n.t('reportInfo.incomeTooltip'),
  },
  {
    type: EReportFormedCalculations.total_expenses,
    title: i18n.t('reportInfo.expenses'),
    count: data?.total_expenses || 0,
    tooltip: i18n.t('reportInfo.expensesTooltip'),
  },
  {
    type: EReportFormedCalculations.tax_base,
    title: i18n.t('reportInfo.taxBase'),
    count: data?.tax_base || 0,
    tooltip: i18n.t('reportInfo.taxBaseTooltip'),
  },
  {
    type: EReportFormedCalculations.tax_amount,
    title: i18n.t('reportInfo.taxAmount'),
    count: data?.tax_amount || 0,
    tooltip: i18n.t('reportInfo.taxAmountTooltip'),
  },
];
