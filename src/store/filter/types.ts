import { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";

import { TNullable } from "config/types";

export enum ETransactionsFilterKeys {
  account='account',
  asset='asset',
  symbol='symbol',
  type='type',
  report_type='report_type',
  date_from='date_from',
  date_to='date_to',
}

export type TTransactionsFilterState = {
  [ETransactionsFilterKeys.account]?: TNullable<string>;
  [ETransactionsFilterKeys.asset]?: TNullable<string>;
  [ETransactionsFilterKeys.symbol]?: TNullable<string>;
  [ETransactionsFilterKeys.type]?: TNullable<string>;
  [ETransactionsFilterKeys.report_type]?: TNullable<string>;
  [ETransactionsFilterKeys.date_from]?: TNullable<string>;
  [ETransactionsFilterKeys.date_to]?: TNullable<string>;
};

export const defaultTransactionsFilter: TTransactionsFilterState = {
  [ETransactionsFilterKeys.account]: null,
  [ETransactionsFilterKeys.asset]: null,
  [ETransactionsFilterKeys.symbol]: null,
  [ETransactionsFilterKeys.type]: null,
  [ETransactionsFilterKeys.report_type]: null,
  [ETransactionsFilterKeys.date_from]: null,
  [ETransactionsFilterKeys.date_to]: null,
};

export type TSelectedDate = RangeValue<Moment>;

export type TFilterStoreState = {
  transactionsFilterState: TTransactionsFilterState;
  transactionsFilterAction: boolean;
  selectedDates: TSelectedDate;
};
